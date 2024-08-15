stm8/

	#include "mapping.inc"
	#include "stm8s003f3.inc"
	#include "stm8s003.asm"
	
	#define RED_LED #$20
	
	;---user difined heap
	#define HEAP_START #$0000
	#define HEAP_END   #$0080
 
;----------------------------
;--!--STACK from $200 to $3FF
;----first 128 bytes used for the 'Heap'
; Define user variables and data 
 ;-----Define word space in object code, i.e VARIABLES
 segment byte at 0080 'RAM'
int16_temp1 DS.W
 

;------R O M--------
	segment 'rom'


main.l
	; initialize SP
	ldw X,#stack_end
	ldw SP,X

	#ifdef RAM0	
	; clear RAM0
ram0_start.b EQU $ram0_segment_start
ram0_end.b EQU $ram0_segment_end
	ldw X,#ram0_start
clear_ram0.l
	clr (X)
	incw X
	cpw X,#ram0_end	
	jrule clear_ram0
	#endif

	#ifdef RAM1
	; clear RAM1
ram1_start.w EQU $ram1_segment_start
ram1_end.w EQU $ram1_segment_end	
	ldw X,#ram1_start
clear_ram1.l
	clr (X)
	incw X
	cpw X,#ram1_end	
	jrule clear_ram1
	#endif

	; clear stack
stack_start.w EQU $stack_segment_start
stack_end.w EQU $stack_segment_end
	ldw X,#stack_start
clear_stack.l
	clr (X)
	incw X
	cpw X,#stack_end	
	jrule clear_stack
                                        
; /$$   /$$  /$$$$$$$  /$$$$$$   /$$$$$$ 
;| $$  | $$ /$$_____/ /$$__  $$ /$$__  $$
;| $$  | $$|  $$$$$$ | $$$$$$$$| $$  \__/
;| $$  | $$ \____  $$| $$_____/| $$      
;|  $$$$$$/ /$$$$$$$/|  $$$$$$$| $$      
; \______/ |_______/  \_______/|__/
	LD A, #2
	LD $0000, A
	LD A, #2
	SUB A, $00
	;---set divider-------
	PUSH HSIDIV_1
	CALL clkSetHsiDivider
	ADDW SP, #1
	PUSH CPUDIV_1
	CALL clkSetCpuDivider
	ADDW SP, #1
	
  ;---turn on HSE
	CALL clkSwitchToCrystal
	MOV PB_CR1, RED_LED; push-pull mode
	MOV PB_DDR, RED_LED; digital output
	MOV PB_ODR, RED_LED;;turn on/off the Led on a board 	 
	LD A, #$80
	PUSH A
	CALL clkBusPeripherial1
	ADDW SP, #$01
	LDW X, #$0F01
	PUSHW X
	LDW X, #$000A
	PUSHW X
	CALL tim1BaseInterrupt
	ADDW SP, #$04


infinite_loop.l

 
	wfi
	; turn off  the Led on a board
  ;MOV PB_ODR, RED_LED
 
	 
	jra infinite_loop
	
; /$$       /$$$$$$ /$$$$$$$ 
;| $$      |_  $$_/| $$__  $$
;| $$        | $$  | $$  \ $$
;| $$        | $$  | $$$$$$$ 
;| $$        | $$  | $$__  $$
;| $$        | $$  | $$  \ $$
;| $$$$$$$$ /$$$$$$| $$$$$$$/
;|________/|______/|_______/ 
                                  
testProcedure
	;--store registers A,X,Y,CC (1+2+2+1=6Bytes)
	;-for 'upper' procedure that called this procedure
	PUSH A
	PUSHW X
	PUSHW Y
	PUSH CC
	 ;-pointer to the parameters
	LDW X, SP
	LDW Y, SP
	 ;--shift to params - because return address at top
	ADDW X, #9; actual pointer to params
	SUBW Y, #2; actual pointer to local variables
	 ;--alloc space for two local variables
	SUBW SP, #$2
	 ;--load first
	LD A , (X)
	LD (Y), A
	 ;---load second
	LD A, ($01,X)
	LD ($1,Y), A
	 ;---load to acc to do operatoin
  LD A,($01,Y)
	ADD A, (Y)
	 ;---write result to the 1 parameter
	LD ($01,X), A
	 ;----resore SP (has been reserved for local variables)
	ADDW SP, #$2
	 ;--restore registers
	POP CC
	POPW Y
	POPW X
	POP A
	 ;---
	RET
	;----ATTENTION!-----
	;--after return the stack pointer MUST BE
	;incremented by size (in bytes) of input parameters
	;by the POP or DECW.Othervise - stack leak
	;-----L I B R A R Y----------
	;====P R O C E D U R E===turn on clk bus
	;@peripherial8
	;TIM1-$80,TIM3-$40,TIM2/5-$20,TIM4/6-$10,UART-see datasheet,
	;SPI-$2,I2C-1
clkBusPeripherial1
	PUSH A
	LD A, ($04,SP)
	LD CLK_PCKENR1, A
	POP A
	RET
	;====P R O C E D U R E===turn on clk bus
	;@peripherial8
	;CAN-$80, ADC-$08, AWU-$04
clkBusPeripherial2
	PUSH A
	LD A, ($04,SP)
	LD CLK_PCKENR2, A
	POP A
	RET	
	;===P R O C E D U R E=switch to Crystal
	;--NO PARAMS
clkSwitchToCrystal
	PUSH A
	;--tuurn on HSE oscillator
	LD A, HSEEN
	LD CLK_ECKR, A
clkSwitchToCrystal_hsi_rdy
	LD A, CLK_ECKR
	AND A, HSERDY
	TNZ A
	;--wait until crystal oscillator ready
	JREQ clkSwitchToCrystal_hsi_rdy
	;---Enable the switching mechanism
	LD A, CLK_SWCR
	OR A, SWEN
	LD CLK_SWCR, A
	;---select source clock
	;0xE1: HSI selected as master clock source (reset value)
	;0xD2: LSI selected as master clock source (only if LSI_EN
	;option bit is set)
	;0xB4: HSE selected as master clock source
	LD A, #$B4
	LD CLK_SWR, A
	;--OPTIONALLY (ISR required):
	;-turn on Clock security system (CSS)
	;-set CSSEN bit
	LD A, #1
	LD CLK_CSSR, A
	POP A
	RET
	
	
	;==P R O C E D U R E=="set HSI divider"
	;--@ char divider
clkSetHsiDivider
	;--store registers A,X,Y,CC (1+2+2+1=6Bytes)
	PUSH A
	;-read default value 
	LD A, CLK_CKDIVR
	;---clear all the hsi divider bits
	AND A, #$E7
	;--1st paprameter has offset 9 bytes
	; because A,X,Y,CC,SP has ben stored later 
	OR A, ($04,SP)
	;---update CLK_CKDIVR
	LD CLK_CKDIVR, A
	;--restore registers
	POP A
	RET
	
	;======P R O C e D U R E==="set CPU divider"
	;@ char divider 
clkSetCpuDivider
		;--store registers A,X,Y,CC (1+2+2+1=6Bytes)
	PUSH A
	;-read default value 
	LD A, CLK_CKDIVR
	;---clear all the hsi divider bits
	AND A, #$f8
	;--1st paprameter has offset 9 bytes
	; because A,X,Y,CC,SP has ben stored later
	OR A, ($04,SP)
	;---update CLK_CKDIVR
	LD CLK_CKDIVR, A
		;--restore registers
	POP A
	RET	
	;====P R O C E D U R E==Tim1BaseInterrupt
	;--@PERIOD16, @PRESC16;
	;NOTE: you must have WFI inside main program loop!
tim1BaseInterrupt
	PUSH A
	;--prescaler, high byte first!
	LD A,($04,SP)
	LD TIM1_PSCRH, A
	LD A,($05,SP)
	LD TIM1_PSCRH, A
	;--period, high byte first!
	LD A,($06,SP)
	LD TIM1_ARRH, A
	LD A,($07,SP)
	LD TIM1_ARRL, A
	;-IRQ 11, interrupt update p.194 (RM0016)
	LD A, #$01
	LD TIM1_IER, A
	;--auto preload, direction count up p.188
	LD A, #$80
	LD TIM1_CR1, A
	;--TIMER GO!
	LD A, TIM1_CR1
	OR A, #$01
	LD TIM1_CR1, A
	POP A
	;SP must be  +4 after return
	RET
	
	
	;=======P R O C E D U R E=="delayMicro"
	;--@ uint16_Delay
delayMicro
	;--store registers A,X,Y,CC (1+2+2+1=6Bytes)
	PUSH A
	PUSHW X
	PUSHW Y
	PUSH CC
	;--parameter is on 9 bytesdistance - 
		;because A,X,Y,SP has been stored
	LDW X, ($09,SP)
delay_micro_01
		DECW X
		JRNE delay_micro_01
	;--restore regs
	POP CC
	POPW Y
	POPW X
	POP A
	RET

	;=======P R O C E D U R E=="BigDelay"
	; @ uint8Times @uint16DelayBase
	;runs delay with 'delayBase" of  'uint8Times'  times
BigDelay
	;--store registers A,X,Y,CC (1+2+2+1=6Bytes)
	PUSH A
	PUSHW X
	PUSHW Y
	PUSH CC
	;--times (mulrtiplier)
	LD A, (11,SP)	
bigDelay_times
	;-load-base
	LDW X,(9,SP)
bigDelay_base
	  ;inner loop
		DECW X
		JRNE bigDelay_base
	DEC A
	JRNE bigDelay_times
	;--when finish restore
	POP CC
	POPW Y
	POPW X
	POP A
	RET	
;====P R O C  E D U R E 	
	
tim1UpdateISR
  inc A
	iret
	
	
	interrupt NonHandledInterrupt
NonHandledInterrupt.l
	iret

	segment 'vectit'
	dc.l {$82000000+main}									; reset
	dc.l {$82000000+NonHandledInterrupt}	; trap
	dc.l {$82000000+NonHandledInterrupt}	; irq0
	dc.l {$82000000+NonHandledInterrupt}	; irq1
	dc.l {$82000000+NonHandledInterrupt}	; irq2
	dc.l {$82000000+NonHandledInterrupt}	; irq3
	dc.l {$82000000+NonHandledInterrupt}	; irq4
	dc.l {$82000000+NonHandledInterrupt}	; irq5
	dc.l {$82000000+NonHandledInterrupt}	; irq6
	dc.l {$82000000+NonHandledInterrupt}	; irq7
	dc.l {$82000000+NonHandledInterrupt}	; irq8
	dc.l {$82000000+NonHandledInterrupt}	; irq9
	dc.l {$82000000+NonHandledInterrupt}	; irq10
	dc.l {$82000000+tim1UpdateISR}	; irq11
	dc.l {$82000000+NonHandledInterrupt}	; irq12
	dc.l {$82000000+NonHandledInterrupt}	; irq13
	dc.l {$82000000+NonHandledInterrupt}	; irq14
	dc.l {$82000000+NonHandledInterrupt}	; irq15
	dc.l {$82000000+NonHandledInterrupt}	; irq16
	dc.l {$82000000+NonHandledInterrupt}	; irq17
	dc.l {$82000000+NonHandledInterrupt}	; irq18
	dc.l {$82000000+NonHandledInterrupt}	; irq19
	dc.l {$82000000+NonHandledInterrupt}	; irq20
	dc.l {$82000000+NonHandledInterrupt}	; irq21
	dc.l {$82000000+NonHandledInterrupt}	; irq22
	dc.l {$82000000+NonHandledInterrupt}	; irq23
	dc.l {$82000000+NonHandledInterrupt}	; irq24
	dc.l {$82000000+NonHandledInterrupt}	; irq25
	dc.l {$82000000+NonHandledInterrupt}	; irq26
	dc.l {$82000000+NonHandledInterrupt}	; irq27
	dc.l {$82000000+NonHandledInterrupt}	; irq28
	dc.l {$82000000+NonHandledInterrupt}	; irq29

	end

