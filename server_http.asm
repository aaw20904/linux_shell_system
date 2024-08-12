;====PROCEDURE==Add32
;@A32, @B32  => returns 32 in STACK
;stack frame:|H L|H L
;[CC|A|X|Y|PC|B32|A32]

Add32 
	PUSHW Y
	PUSHW X
	PUSH A
	PUSH CC
	;---add first 16bit
	LDW X, ($0B,SP)
	ADDW X, ($0F,SP)
	LDW ($0B,SP), X
	;---add last 16bit
	LDW X, ($09,SP)
	JRNC  Add32_no_carry
	INCW X
Add32_no_carry	
	ADDW X, ($0D,SP)
	LDW ($09,SP), X
	;---restore regs
	POP CC
	POP A
	POPW X
	POPW Y
	RET
	

;==PROCEDURE Sub32
;---@A32, @B32
Sub32
	PUSHW Y
	PUSHW X
	PUSH A
	PUSH CC
	;---sub first 16bit
	LDW X, ($0B,SP)
	SUBW X, ($0F,SP)
	LDW ($0B,SP), X
	;---add last 16bit
	LDW X, ($09,SP)
	JRNC  Sub32_no_carry
	DECW X
Sub32_no_carry	
	SUBW X, ($0D,SP)
	LDW ($09,SP), X
	;---restore regs
	POP CC
	POP A
	POPW X
	POPW Y
	RET

; /$$$$$$  /$$$$$$  /$$$$$$$ 
;|_  $$_/ /$$__  $$| $$__  $$
;  | $$  | $$  \__/| $$  \ $$
;  | $$  |  $$$$$$ | $$$$$$$/
;  | $$   \____  $$| $$__  $$
;  | $$   /$$  \ $$| $$  \ $$
; /$$$$$$|  $$$$$$/| $$  | $$
;|______/ \______/ |__/  |__/
