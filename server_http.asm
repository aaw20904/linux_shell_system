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
int16_temp2 DS.W
delay_counter DS.W
char_1      DS.B
char_2      DS.B
char_3      DS.B
array_pointer DS.B

;------R O M--------
	segment 'rom'

  ;###########set dividers for  HSI
set_hsi_divider MACRO hsidiv8
	;-read default value 
	LD A, CLK_CKDIVR
	;---clear all the hsi divider bits
	AND A, #$E7
	OR A, hsidiv8
	;---update CLK_CKDIVR
	LD CLK_CKDIVR, A
	MEND
	
	  ;###########set dividers for CPU 
set_cpu_divider MACRO cpudiv8
	;-read default value 
	LD A, CLK_CKDIVR
	;---clear all the hsi divider bits
	AND A, #$f8
	OR A, cpudiv8
	;---update CLK_CKDIVR
	LD CLK_CKDIVR, A
	MEND
	
	;#######----making dummy delay-----------
	;@ parameter - pointer to uint16 in RAM 
p16delay MACRO ptr16time
	;load 16-bit variable by the 
	;`ptr16time` pointer into X
	LDW X, ptr16time
	LDW X, (X)
	LOCAL delay16_loop_1	
delay16_loop_1	
	DECW X
	;substract until zero
	JRNE delay16_loop_1
	MEND
	
	;######----making dummy delay--------
		;@ parameter - value for delay 
delay16 MACRO u16time
	;load 16-bit variable by the 
	;`ptr16time` pointer into X
	LDW X, u16time
	LOCAL delay16_loop_1	
delay16_loop_1	
	DECW X
	;substract until zero
	JRNE delay16_loop_1
	MEND
	
	;------making long dummy delay------------
		;@ parameter - times of 16bit delays of 1000 tacts 
thousand_delays16 MACRO times
  LDW Y, times
	LOCAL long_delay16_times
long_delay16_times
		;load constant
		LDW X, #$03e8
		LOCAL long_delay16_inner	
long_delay16_inner
			DECW X
			JRNE long_delay16_inner
	;-when inner loop finished - substract 1 from Y
	DECW Y
	JRNE long_delay16_times
	MEND


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
	;***********BEGIN  U S E R  P R O G R A M******************
	;---------------------------------------------
	;---set divider-------
	PUSH HSIDIV_1
	CALL clkSetHsiDivider
	ADDW SP, #1
	PUSH CPUDIV_4
	CALL clkSetCpuDivider
	ADDW SP, #1
	

	
	;set_cpu_divider CPUDIV_1
	 
	MOV CLK_PCKENR1, #$ff;
	MOV CLK_PCKENR2, #$ff;
	MOV PB_CR1, RED_LED; push-pull mode
	MOV PB_DDR, RED_LED; digital output
	MOV PB_ODR, RED_LED;;turn on/off the Led on a board 	 


infinite_loop.l

	PUSH #$05
	LDW X, #$FFFE
	PUSHW X
	CALL BigDelay
	ADDW SP,#3
	; turn off  the Led on a board
  MOV PB_ODR, RED_LED
	;--delay
	PUSH #$05
	LDW X, #$FFFE
	PUSHW X
	CALL BigDelay
	ADDW SP,#3
	;-----turn on
	MOV PB_ODR, $00
	 
	jra infinite_loop
	
 ;$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 ;-----user procedure libraries-----
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
	
	;==P R O C E D U R E=="set HSI divider"
	;--@ char divider
clkSetHsiDivider
	;--store registers A,X,Y,CC (1+2+2+1=6Bytes)
	PUSH A
	PUSHW X
	PUSHW Y
	PUSH CC
	;-read default value 
	LD A, CLK_CKDIVR
	;---clear all the hsi divider bits
	AND A, #$E7
	;--1st paprameter has offset 9 bytes
	; because A,X,Y,CC,SP has ben stored later 
	OR A, ($09,SP)
	;---update CLK_CKDIVR
	LD CLK_CKDIVR, A
	;--restore registers
	POP CC
	POPW Y
	POPW X
	POP A
	RET
	
	;======P R O C e D U R E==="set CPU divider"
	;@ char divider 
clkSetCpuDivider
		;--store registers A,X,Y,CC (1+2+2+1=6Bytes)
	PUSH A
	PUSHW X
	PUSHW Y
	PUSH CC
	;-read default value 
	LD A, CLK_CKDIVR
	;---clear all the hsi divider bits
	AND A, #$f8
	;--1st paprameter has offset 9 bytes
	; because A,X,Y,CC,SP has ben stored later
	OR A, ($09,SP)
	;---update CLK_CKDIVR
	LD CLK_CKDIVR, A
		;--restore registers
	POP CC
	POPW Y
	POPW X
	POP A
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
	dc.l {$82000000+NonHandledInterrupt}	; irq11
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
