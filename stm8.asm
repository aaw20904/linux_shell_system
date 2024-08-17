;----STM8S003F3 peripherial define file
;--Registers of the MCU:
	
	;---CLK-----
	#define CLK_ICKR 			$50C0;
	#define CLK_ECKR 			$50C1;
	#define CLK_CMSR 			$50C3;
	#define CLK_SWR  			$50C4;
	#define CLK_SWCR  		$50C5;
	#define CLK_CKDIVR  	$50C6;
	#define CLK_PCKENR1  	$50C7;
	#define CLK_CSSR     	$50C8;
	#define CLK_CCOR     	$50C9;
	#define CLK_PCKENR2  	$50CA;
	
	#define HSERDY 	#$02
	#define HSEEN 	#$01
	
	#define SWIF    #$08 
	#define SWIEN 	#$04
  #define SWEN	  #$02
	#define SWBSY   #$01
	
	#define HSIDIV_1 #$00
	#define HSIDIV_2 #$08
	#define HSIDIV_4 #$10
	#define HSIDIV_8 #$18
	
	#define CPUDIV_1 #$00
	#define CPUDIV_2 #$01
	#define CPUDIV_4 #$02
	#define CPUDIV_8 #$03
	#define CPUDIV_16 #$04
	#define CPUDIV_32 #$05
	#define CPUDIV_64 #$06
	#define CPUDIV_128 #$07
	;-------ITC------
	#define EXTI_CR1 			$50A0;
	#define EXTI_CR2  		$50A1;
	;----FLASH-------
	#define	FLASH_CR1 		$505A;
	#define	FLASH_CR2			$505B;
	#define	LASH_NCR2 		$505C;
	#define	FLASH_FPR			$505D;
	#define	FLASH _NFPR		$505E; 	
	#define	FLASH _IAPSR	$505F;
	;--------PORT A-----
	
	#define PA_ODR 	$5000;
	#define	PA_IDR 	$5001;
	#define	PA_DDR 	$5002;
	#define	PA_CR1	$5003;
	#define	PA_CR2  $5004;
	
	;--------PORT B------
	#define	PB_ODR 	$5005;
	#define	PB_IDR	$5006;
	#define	PB_DDR	$5007;
	#define	PB_CR1	$5008;
	#define	PB_CR2	$5009;
	
	;---------PORT  C-----
	#define	PC_ODR	$500A;
	#define	PC_IDR 	$500B;
	#define	PC_DDR 	$500C;
	#define	PC_CR1	$500D;
	#define	PC_CR2	$500E;
	
	;----PORT D-------
	#define	PD_ODR	$500F;
	#define	PD_IDR 	$5010;
	#define	PD_DDR 	$5011;
	#define	PD_CR1	$5012;
	#define	PD_CR2	$5013;
	;--------PORT E-------
	#define	PE_ODR	$5014;
	#define	PE_IDR 	$5015;
	#define	PE_DDR 	$5016;
	#define	PE_CR1	$5017;
	#define	PE_CR2	$5018;
	
	;---------PORT F------
	#define	PF_ODR	$5019;
	#define	PF_IDR 	$501A;
	#define	PF_DDR 	$501B;
	#define	PF_CR1	$501C;
	#define	PF_CR2	$501D;
	
	;------ITC---------
	
	#define	EXTI_CR1 $50A0;
	#define EXTI_CR2 $50A1;
	
	;--------TIM 1----------
	#define	TIM1_CR1 	$5250;
	#define	TIM1_CR2  $5251;
	#define	TIM1_SMCR $5252;
	#define	TIM1_ETR  $5253;
	#define	TIM1_IER 	$5254;
	#define	TIM1_SR1 	$5255;
	#define	TIM1_SR2 	$5256;
	#define	TIM1_EGR  $5257;
	#define	TIM1_CCMR1 $5258;
	#define	TIM1_CCMR2	$5259;
	#define	TIM1_CCMR3	$525A;
	#define	TIM1_CCMR4 	$525B;
	#define	TIM1_CCER1	$525C;
	#define	TIM1_CCER2	$525D;
	#define	TIM1_CNTRH	$525E;
	#define	TIM1_CNTRL 	$255f;
	#define	TIM1_PSCRH 	$5260;
	#define	TIM1_PSCRL	$5261;
	#define	TIM1_ARRH		$5262;
	#define	TIM1_ARRL		$5263;
	#define	TIM1_RCR		$5264;
	#define	TIM1_CCR1H 	$5265;
	#define	TIM1_CCR1L	$5266;
	#define	TIM1_CCR2H 	$5267;
	#define	TIM1_CCR2L	$5268;
	#define	TIM1_CCR3H	$5269;
	#define	TIM1_CCR3L	$526A;
	#define	TIM1_CCR4H 	$526B;
	#define	TIM1_CCR4L 	$526C;
	#define	TIM1_BKR		$526D;
	#define	TIM1_DTR		$526E;
	#define	TIM1_OISR		$526F;
	
	#define TIM_CR1_CENTER_ALINGN_1 #$20
	#define TIM_CR1_CENTER_ALINGN_2 #$40
	#define TIM_CR1_CENTER_ALINGN_3 #$60
  #define TIM_CR1_COUNTS_UP #$00
	#define TIM_CR1_COUNTS_DOWN #$10
	#define TIM_CR1_PRELOAD #$80
	
	#define TIM_CCMR_ACTIVE_ON_MATCH #$10
	#define TIM_CCMR_INACTIVE_ON_MATCH #$20
	#define TIM_CCMR_TOGGLE   #$30
	#define TIM_CCMR_FORCE_INACTIVE #$40 
	#define TIM_CCMR_FORCE_ACTIVE   #$50
	
	
	;-------------SPI----------

	#define SPI_CR1  $5200;
	#define	SPI_CR2 $5201;
	#define	SPI_ICR  $5202;
	#define	SPI_SR	$5203;
	#define	SPI_DR	$5204;
	#define	SPI_CRCPR	$5205;
	#define	SPI_RXCRCR	$5206;
	#define	SPI_TXCRCR	$5207;
	;---------------I2C----------
	
	#define	I2C_CR1		$5210;
	#define	I2C_CR2 	$5211;
	#define	I2C_FREQR	$5212;
	#define	I2C_OARL 	$5213;
	#define	I2C_OARH	$5214;
	#define	I2C_DR 		$5216;
	#define	I2C_SR1		$5217;
	#define	I2C_SR2 	$5218;
	#define	I2C_SR3		$5219;
	#define	I2C_ITR		$521A;
	#define	I2C_CCRL 	$521B;
	#define	I2C_CCRH	$521C;
	#define	I2C_TRISER	$521D;
	#define	I2C_PECR	$521E;
	;------------UART--------------
	#define	UART1_SR	$5230;
	#define	UART1_DR 	$5231;
	#define	UART1_BRR1	$5232;
	#define	UART1_BRR2	$5233;
	#define	UART1_CR1	$5234;
	#define	UART1_CR2	$5235;
	#define	UART1_CR3	$5236;
	#define	UART1_CR4	$5237;
	#define	UART1_CR5	$5238;
	#define	UART1_GTR	$5239;
	#define	UART1_PSCR	$523A;
	;----------TIM4----------------
	#define	TIM4_CR1	$5340;
	#define	TIM4_IER	$5343;
	#define	TIM4_SR		$5344;
	#define	TIM4_EGR	$5345;
	#define	TIM4_CNTR	$5346;
	#define	TIM4_PSCR	$5347;
	#define	TIM4_ARR 	$5348;
	;---------ADC1-----------------
	
	#define ADC _CSR 	$5400;
	#define	ADC_CR1		$5401;
	#define	ADC_CR2		$5402;
	#define	ADC_CR3		$5403;
	#define	ADC_DRH		$5404;
	#define	ADC_DRL		$5405;
	#define	ADC_TDRH	$5406;
	#define	ADC_TDRL	$5407;
	#define	ADC_HTRH	$5408;
	#define	ADC_HTRL	$5409;
	#define	ADC_LTRH	$540A;
	#define	ADC_LTRL	$540B;
	#define	ADC_AWSRH 	$540C;
	#define	ADC_AWSRL	$540D;
	#define	ADC_AWCRH	$540E;
	#define	ADC_AWCRL 	$540F;
	;----------TIM2----------
	#define	TIM2_CR1 	$5300;
	#define	TIM2_IER	$5303;
	#define	TIM2_SR1 	$5304;
	#define	TIM2_SR2	$5305;
	#define	TIM2_EGR	$5306;
	#define	TIM2_CCMR1	$5307;
	#define	TIM2_CCMR2	$5308;
	#define	TIM2_CCMR3	$5309;
	#define	TIM2_CCER1	$530A;
	#define	TIM2_CCER2	$530B;
	#define	TIM2_CNTRH 	$530C;
	#define	TIM2_CNTRL  $530D;
	#define	TIM2_PSCR	$530E;
	#define	TIM2_ARRH	$530F;
	#define	TIM2_ARRL	$5310;
	#define	TIM2_CCR1H	$5311;
	#define	TIM2_CCR1L	$5312;
	#define	TIM2_CCR2H  $5313;
	#define	TIM2_CCR2L	$5314;
	#define	TIM2_CCR3H	$5315;
	#define	TIM2_CCR3L	$5316;



stm8/

	#include "mapping.inc"
	#include "stm8s003f3.inc"
	 
	
	#define RED_LED #$20
	
 
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
 
	;---set divider-------
	PUSH HSIDIV_1
	CALL clkSetHsiDivider
	ADDW SP, #1
	PUSH CPUDIV_1
	CALL clkSetCpuDivider
	ADDW SP, #1
	
  ;---turn on HSE
	CALL clkSwitchToCrystal
 	LD A, #$ff;$80
	PUSH A
	CALL clkBusPeripherial1 ; turn on TIM1 clock bus
	ADDW SP, #$01
	
	;--set port PC3
	LD A, #$08
	LD PC_DDR, A ;output
	LD PC_CR1, A ;push-pull

	
	LDW X, #$0000;prescaler
	PUSHW X
	LDW X, #$FFFE;period
	PUSHW X
	LDW X, #$0F02;comparand
	PUSHW X
	LD A , TIM_CCMR_TOGGLE ;toogle pin on match
	PUSH A
	LD A, #$00 ; polarity high
	PUSH A
	LD A, #$00 ; additional parameters
	PUSH A
	CALL tim1OutputCompareCh3Setup
	;CALL tim1BaseInterrupt
	ADDW SP, #$0A


infinite_loop.l

 
;	wfi
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
                                  
;=====P R O C E D U R E=='tim1BaseModeSetup'=
;===initializing TIM1 in base mode
; @prescaler16, @base16, @mode8
; After return: SP-5
;-modes can (TIM1_CR1) be ;
;-TIM_EDGE_ALIGNED ($00)
;- TIM_CENTER_ALINGN_1,
;- TIM_CENTER_ALINGN_2,
;- TIM_CENTER_ALINGN_3,
;count mode can be:
;- TIM_COUNTS_UP ($00)
;- TIM_COUNTS_DOWN
;--stack frame:
;   0 1   2 3   4  5  6    8  9   A   B  C    D
 ;[CC|  Y  |  X  | A |  RET |mode| base | presc| 

tim1BaseModeSetup
	;--store registers
	PUSH A
	PUSHW X
	PUSHW Y
	PUSH CC
	#define _000_presH $0c ;prescaler
	#define _000_presL $0d
	#define _000_baseH $0a ;base ,counter
	#define _000_baseL $0b
	#define _000_mode $09  ; parameters
	;load prescaler HI firstly:
	LD A,(_000_presH,SP)
	LD TIM1_PSCRH, A
	LD A,(_000_presL,SP)
	LD TIM1_PSCRL, A
	;load base, HI first:
	LD A, (_000_baseH,SP)
	LD TIM1_ARRH, A
	LD A, (_000_baseL,SP)
	LD TIM1_ARRL, A
  ;load mod in TIM1_CR1 (p.188 ref manual)
  LD A, (_000_mode,SP)
  LD TIM1_CR1, A
	;--start timer and GO! 
	LD A, TIM1_CR1
	OR A, #$01
	LD TIM1_CR1, A
	;--restore registers
	POP CC
	POPW Y
	POPW X
	POP A
	RET
	
;=====P R O C E D U R E=='tim1BaseModeSetupIt'=
;===initializing TIM1 in base mode with interrupts
; @prescaler16, @base16, @mode8
; After return: SP-5
;-modes can (TIM1_CR1) be ;
;-TIM_CR1_EDGE_ALIGNED ($00)
;- TIM_CR1_CENTER_ALINGN_1,
;- TIM_CR1_CENTER_ALINGN_2,
;- TIM_CR1_CENTER_ALINGN_3,
;count mode can be:
;- TIM_CR1_COUNTS_UP ($00)
;- TIM_CR1_COUNTS_DOWN
;--stack frame:
;   0 1   2 3   4  5  6    8  9   A   B  C    D
 ;[CC|  Y  |  X  | A |  RET |mode| base | presc| 

tim1BaseModeSetupIt
	;--store registers
	PUSH A
	PUSHW X
	PUSHW Y
	PUSH CC
	#define _001_presH $0c ;prescaler
	#define _001_presL $0d
	#define _001_baseH $0a ;base ,counter
	#define _001_baseL $0b
	#define _000_mode $09  ; parameters
	;load prescaler HI firstly:
	LD A,(_001_presH,SP)
	LD TIM1_PSCRH, A
	LD A,(_001_presL,SP)
	LD TIM1_PSCRL, A
	;load base, HI first:
	LD A, (_001_baseH,SP)
	LD TIM1_ARRH, A
	LD A, (_001_baseL,SP)
	LD TIM1_ARRL, A
	;--write interrupts (p.194):
	LD A, #$01
	LD TIM1_IER, A
	;--start timer and GO! 
	LD A, TIM1_CR1
	OR A, #$01
	LD TIM1_CR1, A
	;--restore registers
	POP CC
	POPW Y
	POPW X
	POP A
	RET
	;===PROCEDURE 'tim1OutputCompareCh3Setup'
	;@presc16,
	;@base16,
	;@comp16,
	;@mode8
	;@polarity8
	;@preload8
	
	;stack frame:
	;[v16a|return|prel|pol|mode|comp|base|presc]
tim1OutputCompareCh3Setup
	PUSH A
	;-variables
	#define _003_prel $04
	#define _003_pol $05
	#define _003_mode $06
	#define _003_compH $07
	#define _003_compL $08
	#define _003_baseH $09
	#define _003_baseL $0A
	#define _003_prescH $0b
	#define _003_prescL $0c
	;--load comparand, Hi firstly
	LD A, (_003_compH,SP)
	LD TIM1_CCR3H, A
	LD A, (_003_compL,SP)
	LD TIM1_CCR3L, A
		;--prescaler
	LD A, (_003_prescH,SP)
	LD TIM1_PSCRH, A
	LD A, (_003_prescL,SP)
	LD TIM1_PSCRL, A		
	;--load base, high byte first
	LD A, (_003_baseH,SP)
	LD TIM1_CNTRH, A
	LD A, (_003_baseL,SP)
	LD TIM1_CNTRL, A
	;--load CCMR3
	LD A, (_003_mode,SP)
	LD TIM1_CCMR3, A
	;--polarity
	LD A, (_003_pol,SP)
	OR A, #$01; turn on channel 3
	LD TIM1_CCER2, A
	;--CR1
	LD A, (_003_prel,SP)
	LD TIM1_CR1, A
	OR A, #$01;
	LD TIM1_CR1, A
	POP A
	RET 

;===PROCEDURE=='tim1OutputCompareSetup
;--setup TIM1  in output compare mode
;@prescaler16, 
;@period16,
;@compare16,
;@channel8 - channel number, must be 1-4,
;@mode8 - TIM_CCMR_ACTIVE_ON_MATCH, 
					;TIM_CCMR_INACTIVE_ON_MATCH,
					;TIM_CCMR_TOGGLE,
					;TIM_CCMR_FORCE_INACTIVE , 
					;TIM_CCMR_FORCE_ACTIVE,
;@polarity   $00-HIGH, $02-LOW,
;@add_par    additionalparameters for TIM1_CR1 (preload), can be empty
;STACK frame map:
;  0   1  2   3  4  5  6   7   8 9  A  B  C D E  
;[v8b|v8a|v16b | p16A| CC |  Y  |  X | A | RET |

;    F    10     11     12      13 14  15 16 17 18
; addit| polar| mode| channel | comp | per | pres]
tim1OutputCompareSetup
	;--store registers
	PUSH A
	PUSHW X
	PUSHW Y
	PUSH CC
	
	#define _002_presH $17 ;prescaler
	#define _002_presL $18
	#define _002_baseH $15 ;base ,counter
	#define _002_baseL $16
  #define _002_compH $13 ;compare
	#define _002_compL $14
	#define _002_channel $12
	#define _002_mode $11
	#define _002_pol $10
	#define _002_addP $0f
	
	#define _002_p16a $04
	#define _002_v16b $02
	#define _002_v16bL $03
	#define _002_v8a $01
	#define _002_v8b $00
	
  ;-allocate variables
	SUBW SP, #$06
	;clear it
	LD A, #$06; num of cells of memory
	LDW X, SP
tim1OutputCompareSetup_clr_m	
	CLR (X)
	INCW X
	DEC A
	JRNE tim1OutputCompareSetup_clr_m
	
	;--load prescaler, Most byte firstly:
	LD A,(_002_presH,SP)
	LD TIM1_PSCRH, A
	LD A,(_002_presL,SP)
	LD TIM1_PSCRL, A
		;load base, HI first:
	LD A, (_002_baseH,SP)
	LD TIM1_ARRH, A
	LD A, (_002_baseL,SP)
	LD TIM1_ARRL, A;
	;--load CCRx compare registers
	;--load 'comp'in X
	LDW X, #TIM1_CCR1H;
	LDW (_002_p16a,SP),X
	;--load channel number
	LD A, (_002_channel,SP)
	DEC A
	;--multiply by 2 - because there are CCRxH and CCRxL registers 
	SLL A
	;-- ! clear X
	CLRW X
	LD XL, A
	;X = CCR1H_Addr + ((cnannel-1) * 2)
	ADDW X, (_002_p16a,SP)
	;store to p16a
	LDW (_002_p16a,SP),X
	
	;load compare regs CCRxH,CCRxL, high byte firstly
	LD A,(_002_compH,SP)
	LDW X, (_002_p16a,SP)
	LD (X), A
	INCW X
	LD A,(_002_compL,SP)
	LD (X), A
	;load CCMRx mode register
	;load number of channel to p16A
	LDW X, #TIM1_CCMR1
	LDW (_002_p16a,SP), X
	;load channel number to v16b Low
	LD A, (_002_channel,SP)
	LD (_002_v16bL,SP), A
	;--decrement 1 to convinency
	DEC (_002_v16bL,SP)
	;--It means: p16A CCMR1_addres + (channel_number-1)
	LDW X, (_002_v16b,SP)
	ADDW X,(_002_p16a,SP)
	LDW (_002_p16a,SP),X
	;So, now in p16A pointer (SP+$4) adress CCMR of a given  channel
	;--Loading 'mode' the CCMR:
	LD A, (_002_mode,SP)
	LDW X, (_002_p16a,SP)
	LD (X),A
 ;--loading 'polarity' in CCERx:
	
	;-what is a number of the channel?
	;--load a channel and compare:
	LD A,(_002_channel,SP)
	SUB A, #$1
	JREQ tim1OutputCompareSetup_ch_1
	LD A,(_002_channel,SP)
	SUB A, #$2
	JREQ tim1OutputCompareSetup_ch_2
	LD A,(_002_channel,SP)
	SUB A, #$3
	JREQ tim1OutputCompareSetup_ch_3
	LD A, (_002_channel,SP)
	SUB A, #$4
	JREQ tim1OutputCompareSetup_ch_4
	;---load 'mode'
	LD A, (_002_mode,SP)
tim1OutputCompareSetup_ch_1
  ;--when channel 1
	;poiarity
	LD A, (_002_pol,SP)
	;turn on channel
	OR A, #$01
	LD TIM1_CCER1, A
	JP tim1OutputCompareSetup_ccmr_end
tim1OutputCompareSetup_ch_2
  ;--when channel 2
	;poiarity
	LD A, (_002_pol,SP)
	;turn on channel
	OR A, #$01
	; left shift << 4 
	SLL A
	SLL A
	SLL A
	SLL A
	LD TIM1_CCER1, A	
	JP tim1OutputCompareSetup_ccmr_end
tim1OutputCompareSetup_ch_3
  ;--when channel 3
	;poiarity
	LD A, (_002_pol,SP)
	;turn on channel
	OR A, #$01
	LD TIM1_CCER2, A	
	JP tim1OutputCompareSetup_ccmr_end
tim1OutputCompareSetup_ch_4
  ;--when channel 4
	;poiarity
	LD A, (_002_pol,SP)
	;turn on channel
	OR A, #$01
	; left shift << 4
	SLL A 
	SLL A
	SLL A
	SLL A
	LD TIM1_CCER2, A
	JP tim1OutputCompareSetup_ccmr_end
	;--end point of TIM1_CCMRx initialization
tim1OutputCompareSetup_ccmr_end
	;set up CR1 register finally
	LD A, (_002_addP,SP)
	LD TIM1_CR1, A
	;turn on timer
	OR A, #$01
	LD TIM1_CR1, A
	;-free memory
	ADDW SP, #$06
	;restore regs:
	POP CC
	POPW Y
	POPW X
	POP A
	RET
	

	
	
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
