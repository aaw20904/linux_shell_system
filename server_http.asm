;===P R O C E D U R E
;@M1_16, @M2_16 RETURNS 32bit, stack frame below:
;[ RES | S1 | S2 | S3 | S4  | CC | A |  Y  |  X   | RET | M1  | M2  ]
; 0   3|4  7|8  b|c  f|10 13| 14 | 15|16 17|18  19|1a 1c|1d 1e|1F 20|
Mul16
  PUSHW Y
	PUSHW X
	PUSH A
	PUSH CC
	;--allocate stack memory
	SUBW SP,#$14
	; (1) M2_L * M1_L
	LD A,($1E,SP)
	LD  XL, A
	LD A, ($20,SP)
	MUL X, A
	;--store to S1_L
	LDW ($06,SP), X
	;(2) M2L * M1H
	LD A,($1D,SP)
	LD  XL, A
	LD A, ($20,SP)
	MUL X, A	
	;--store to S2_L and shift << 8
	LDW ($09,SP), X
  ; (3) M2_H * M1_L
	LD A,($1F,SP)
	LD  XL, A
	LD A, ($1E,SP)
	MUL X, A
	;--store to S3_L and shift
	LDW ($0D,SP), X
 ; (4) M2_H * M1_H
	LD A,($1D,SP)
	LD XL, A
	LD A, ($1F,SP)
	MUL X, A
	;--store to S4_L and shift << 16
	LDW ($10,SP), X	
 ; ____  _       ____  _      ____ ____  
 ;/ ___|/ |_____/ ___|/ |  _ / ___|___ \ 
 ;\___ \| |_____\___ \| |_| |\___ \ __) |
 ; ___) | |_____|___) | |_   _|__) / __/ 
 ;|____/|_|     |____/|_| |_||____/_____|
                                        
	;--low 16bit:
	LDW X, ($06,SP)
	ADDW X, ($0A,SP)
	;---high 16bit
	LDW Y, ($4,SP)
	;--when carry - increment
	JRNC Mul16_S1_S2_No_Carry_L
  INCW Y
Mul16_S1_S2_No_Carry_L	
	ADDW Y, ($8,SP)
	;--store low 16bit to S1
	LDW ($6,SP), X
	;---and hihg 16bit
	LDW ($4,SP), Y
;  ____  _       ____  _      ____ _____ 
; / ___|/ |_____/ ___|/ |  _ / ___|___ / 
; \___ \| |_____\___ \| |_| |\___ \ |_ \ 
;  ___) | |_____|___) | |_   _|__) |__) |
; |____/|_|     |____/|_| |_||____/____/
;--low 16bit:
	LDW X, ($06,SP)
	ADDW X, ($0e,SP)
	;---high 16bit
	LDW Y, ($4,SP)
	;--when carry - increment
	JRNC Mul16_S1_S3_No_Carry_L
  INCW Y
Mul16_S1_S3_No_Carry_L	
	ADDW Y, ($C,SP)
	;--store low 16bit to S1
	LDW ($6,SP), X
	;---and hihg 16bit
	LDW ($4,SP), Y
;  ____  _       ____  _      ____  _  _   
; / ___|/ |_____/ ___|/ |  _ / ___|| || |  
; \___ \| |_____\___ \| |_| |\___ \| || |_ 
;  ___) | |_____|___) | |_   _|__) |__   _|
; |____/|_|     |____/|_| |_||____/   |_|  
                                        	
;--low 16bit:
	LDW X, ($06,SP)
	ADDW X, ($12,SP)
	;---high 16bit
	LDW Y, ($4,SP)
	;--when carry - increment
	JRNC Mul16_S1_S4_No_Carry_L
  INCW Y
Mul16_S1_S4_No_Carry_L	
	ADDW Y, ($10,SP)
	;--store low 16bit to S1
	LDW ($6,SP), X
	;---and hihg 16bit
	LDW ($4,SP), Y
	;--write result
	LDW ($1D,SP),Y
	LDW ($1F,SP),X
	;---free memory
	ADDW SP,#$14
	;---restore regs
	POP CC
	POPW Y
	POPW X
	POP A
	RET
