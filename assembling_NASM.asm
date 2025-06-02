;-----------COMPILE--LINK--------------------------------
;to compile - use the folowing command:
;   D:\NASM>nasm -f win32 3.asm -o 3.obj
;to link with MyLink - use the following command:
;   D:\NASM>GoLink /entry main /console 3.obj msvcrt.dll kernel32.dll
section .data
    hello_msg db "Hello, World! %d %d %d %d", 0   ; Null-terminated string
    inp_var1 dd 1230
        align 16                      ; Ensure the data is 16-byte aligned
    array dd  65535, 3999, 2999, 1999   ; 16 bytes of data
   operand2 dd 1, 300, 300, 300  ; Add 1 to each byte
    test_array resb 32  ;to strore data

section .text
    global main
    extern printf, ExitProcess   ; Declare external function

main:
    ;-----enter data
    ; Load data into XMM registers
    movdqu xmm0, [array]     ; Load 16 bytes into xmm0
    movdqu xmm1, [operand2]  ; Load 16 bytes of "1"s into xmm1
    paddd xmm0, xmm1         ; Add 1 to each byte
    movdqu [test_array], xmm0 ; Store back to memory
    ;--------plot--------
    ;mov eax, [test_array]
    mov esi, test_array
    push dword [esi]
    add esi, 4
    push dword [esi]
    add esi, 4
    push dword [esi]
    add esi, 4
    push dword [esi]
    push hello_msg   ; Push string argument
    call printf      ; Call printf
    add esp, 8       ; Clean up the stack

    push 0
    call ExitProcess
;---multiplication----------------
section .data
    hello_msg db "Hello, World! %llu %llu", 0   ; Format string for 2 quadwords
    align 16  ; Ensure proper memory alignment
    array dq   32, 32    ; Two 64-bit (quadword) values
    operand2 dq 1, 4    ; Two 64-bit (quadword) values
    test_array resq 2    ; Space for result (2 quadwords)

section .text
    global main
    extern printf, ExitProcess   ; Declare external functions

main:
    ;----- Load data into XMM registers -----
    movdqu xmm0, [array]     ; Load 128-bit (2x64-bit) into xmm0
    movdqu xmm1, [operand2]  ; Load 128-bit (2x64-bit) into xmm1
    pmuludq xmm0, xmm1       ; Multiply lower 32-bits of each 64-bit value

    movdqu [test_array], xmm0 ; Store result in memory

    ;-------- Print results --------
    mov esi, test_array   ; Load base address of results
    push dword [esi+12]    ; Push second 32-bit result
    push dword [esi+8]      ; Push first 32-bit result
    push dword [esi+4]    ; Push second 32-bit result
    push dword [esi]      ; Push first 32-bit result
    push hello_msg        ; Push format string
    call printf           ; Call printf

    add esp, 20           ; Clean up 3 pushes (each push = 8 bytes except the format string)

    push 0
    call ExitProcess
;-------------multiplication of float-------
    movaps xmm0, [array1]  ; Load 4 packed floats
    movaps xmm1, [array2]  ; Load another 4 packed floats
    mulps xmm0, xmm1       ; Multiply all 4 pairs
;-------https://youtu.be/336BQT_o5qg
;-----4.04.25-----------------
section .data
    hello_msg db "Hello, World! %x %x %x %x", 0   ; Null-terminated string
    format_str_float32 db "floats-> %x, %x, %x, %x"
    inp_var1 dd 1230
        align 16                      ; Ensure the data is 16-byte aligned
    array dd  10, 20, 30, 40   ; 16 bytes of data
   operand2 dd 2, 3, 4, 5  ; Add 1 to each byte
   ;------------fLOAT------------
   align 16
    var1 dd -2.0, 0.6, 0.7, 4.0
    var2 dd 1.0, 4.5, 5.5, 1.0
   ;------------------------- 
    test_array resb 32  ;to strore data

section .text
    global main
    extern printf, ExitProcess   ; Declare external function

main:
    ;-----enter data
    ; Load data into XMM registers
    movaps xmm0, [var1]     ; Load 16 bytes into xmm0
    movaps xmm1, [var2]  ; Load 16 bytes of "1"s into xmm1
    mulps xmm0, xmm1         ; Add 1 to each byte
    movaps [test_array], xmm0 ; Store back to memory
    ;--------plot--------
    ;mov eax, [test_array]
    mov esi, test_array
    push dword [esi]
    add esi, 4
    push dword [esi]
    add esi, 4
    push dword [esi]
    add esi, 4
    push dword [esi]
    push  format_str_float32; Push string argument
    call printf      ; Call printf
    add esp, 20       ; Clean up the stack

    push 0
    call ExitProcess

    ret              ; Return from main
; float numbers represetation https://youtu.be/PZRI1IfStY0

;----------C and assembly---------------------
;--https://www.stefanobordoni.cloud/howto-easily-use-nasm-into-windows-c-c-applications/
///main.c file
//OPTION: open in projectOptions->parameters->add library
#include <stdio.h>

extern int sum(int, int);

int main() {
    int result = sum(5, 7);
    printf("Result: %d\n", result);
    return 0;
}
;translated so:   nasm -f win32 5.asm -o 5.obj
;---library 5.asm file
global _sum

section .text
_sum:
    mov eax, [esp+4]
    add eax, [esp+8]
    ret
;===============08 04 25====
;-----------COMPILE--LINK--------------------------------
;to compile - use the folowing command:
;   D:\NASM>nasm -f win32 3.asm -o 3.obj
;to link with MyLink - use the following command:
;   D:\NASM>GoLink /entry main /console 3.obj msvcrt.dll kernel32.dll
section .data
    format_int db "-> %d",10,0
    hello_msg db "Hello, World! %x %x %x %x ",10, 0   ; Null-terminated string
    format_str_float32 db "floats-> %x, %x, %x, %x " ,10, 0
    format_scanf_f32 db "%f",0
    inp_var1 dd 1230
        align 16                      ; Ensure the data is 16-byte aligned
    array dd  10, 20, 30, 40   ; 16 bytes of data
   operand2 dd 2, 3, 4, 5  ; Add 1 to each byte
   ;------------fLOAT------------
        align 16
    var1 dd -1.0, 1.0, 1.0, 1.0
    var2 dd 1.0, 1.0, 1.0, 1.0
   ;------------------------- 
    test_array resb 32  ;to strore data

section .text
    global main
    extern printf,scanf, ExitProcess   ; Declare external function

;==========test function=====
float32ToString:
;-p1@int32, p2@int32
;----STACK----(address)---
; v1
; v2
; esi (old)     <-ESI
; returnAddr
; par1
; par2
;------------(address+24)---
  %define par1_001 8
  %define par2_001 12
  %define var1_001 -4
  %define var2_001 -8
  push esi ;store ESI
  mov esi, esp ;init with a new value
  sub esp, 8 ; allocate two 32bit variables 
  ;***********copy params to local variables
  mov eax, [esi + par1_001]
  mov ebx, [esi + par2_001]
  mov [esi + var1_001], eax
  mov [esi + var2_001], ebx
  ;clear regs
  xor eax, eax
  xor ebx, ebx
  ;load again
  mov eax, [esi+var1_001]
  ;sutract
  sub eax, [esi+var2_001]
  ; now the result is in eax 
 
  ;----restore registers and stack
  add esp, 8 ;free 
  pop esi ;restore ESI
  ret
main:
    ;-----enter data
     ;---scanf
    push var1
    push format_scanf_f32
    call scanf  
    add esp, 8
    ; Load data into XMM registers
    movaps xmm0, [var1]     ; Load 16 bytes into xmm0
    movaps xmm1, [var2]  ; Load 16 bytes of "1"s into xmm1
    mulps xmm0, xmm1         ; Add 1 to each byte
    movaps [test_array], xmm0 ; Store back to memory
    ;--------plot--------
    ;mov eax, [test_array]
    mov esi, test_array
    push dword [esi]
    add esi, 4
    push dword [esi]
    add esi, 4
    push dword [esi]
    add esi, 4
    push dword [esi]
    push  format_str_float32 ; Push string argument
    call printf             ; Call printf
    add esp, 20             ; restore stack
    ;---T E S T  begin--
    mov eax, 5  ;second
    push eax
    mov eax, 15  ;first
    push eax
    call float32ToString  ;call test function
    add esp, 8            ;restore stack
     ;print result
    push eax
    push format_int
    call printf
    add esp, 8             ;restore stack
    ;---T E S T  end----
 
    push 0
    call ExitProcess

    ret              ; Return from main

    ;https://www.youtube.com/playlist?list=PLBlnK6fEyqRgLLlzdgiTUKULKJPYc0A4q
;13.040.25
;-----------COMPILE--LINK--------------------------------
; To compile:
;   D:\NASM>nasm -f win32 4.asm -o 4.obj
; To link with GoLink:
;   D:\NASM>GoLink /entry main /console 4.obj msvcrt.dll kernel32.dll

section .data
    hello_msg   db "Hello, World!", 10, 0
    format_str  db "Here is string: %s", 10, 0
    format_integer db "Int: %d",10,0
    test_array  resb 32  ; To store data

section .text
    global main
    extern printf, ExitProcess

int32ToString:
   ;-----stack frame
   ;charPtr         -12
   ;int32Value      -8
   ;remainder       -4
   ;esi (of caller) -<<---ESI is here
   ;RETURN_ADDRESS  +4
   ;par32Intefer    +8  (first input param)
   ;parPtoChar      +12  (second input param)
   ;-----------------
   %define charPtr      [esi - 12]
   %define int32Value   [esi - 8]
   %define remainder    [esi - 4]
   %define par32Integer [esi + 8]
   %define parPtoChar   [esi + 12]
   ;init regs and allocate memory
   push esi
   mov esi, esp
   sub esp, 12
  ;(1)init variables
   mov eax, par32Integer
   mov int32Value, eax
   mov eax, parPtoChar
   mov charPtr, eax
   ;(1.1) convert it o positive
    mov eax, int32Value
    test eax, eax
    jns skip_neg
    neg eax  
skip_neg:
    mov int32Value, eax
main_iter:
   ;(2) (3) divide the number by 10, update the number and save a remainder 
   mov eax, int32Value
   cdq                     ; sign-extend eax into edx
   mov ebx, 0ah  ;divided by 10 (0x0A)
   idiv ebx
   mov remainder, edx 
   mov int32Value, eax  ;quotient (result of dividion)
   ;(4) Print ascii character
    add edx, 30h   ;to ascii
    mov ebx, charPtr
    mov  [ebx], dl ;store to a string
    inc  ebx 
    mov charPtr, ebx  ;update a pointer

     ;(6) Is the result of division (quotient) greater that 0?
     mov eax, int32Value
    cmp eax, 0
    jg main_iter

    ;(8) Is the number negative?
    inc ebx
    mov eax, par32Integer
    test eax, eax
    jns l_num_pos
        mov ebx, charPtr
        mov byte [ebx],  2dh  ;dash
l_num_pos:
    ;(8) print end of a string
    inc ebx
    mov byte [ebx], 0
    ;restore regs, free memory
    add esp, 12
    pop esi
    ret
mirrorString:
  ;charBuffer    -20
  ;charDestPtr   -16
  ;charSrcPtr    -12
  ;int32Counter   -8
  ;int32StringLen -4 
  ;ESI (caller)  -<<-ESI
  ;--RET--    +4
  ;parCharPtr   +8
  ;-----------
  %define charBuffer [esi-20]
  %define charDestPtr [esi-16]
  %define charSrcPtr [esi-12]
  %define int32Counter [esi-8]
  %define int32StringLen [esi-4]
  %define parCharPtr [esi+8]
  ;allocate memory
  push esi
  mov esi, esp
  sub esp, 20
  ;(1) length of string
  mov ebx, parCharPtr
loop1:
   mov al, [ebx]  
   cmp al, 20h   
   inc ebx
   jns loop1  ;iterate until data less 20h
  mov ecx, parCharPtr 
  sub ecx, ebx    ;calculate length
  mov ecx, int32StringLen
  ;*test
  mov eax, ecx
  ;free memory
  add esp, 20
  pop esi
  ret

;===========================
; main entry point
;===========================
main:
  

    ; Optional hello message
   
    ;mov eax, -4096
    ; push test_array
    ; push eax
    ;call int32ToString
    ;add esp, 8
    push hello_msg
    call mirrorString
    add esp, 4

    ;push eax
    ;push format_integer
    ;call printf
    ;add esp, 8

    ; Exit
    push 0
    call ExitProcess
;https://youtu.be/oeo-hKxsAMo
;---copying arrays-----------------------
  ;---copy

  push ESI ;//save original
  push EDI
   
   mov esi, store1  ;//load source,
   mov edi, store2  ;and destination addresses
   mov ecx, 6 ;//repeat 6 times 
   
   rep movsb  ;copy byte from one place in RAM to another


  pop EDI ;//restore regs
  pop ESI
;--------------------------------------
;---iteration by ecx
  mov ecx , 4
t8767657:
  add eax, 4  
  loopnz t8767657
;-------------allocate/free stack for variablles:
myCode:
  %define local_var [ebp-4] ;our local var
  %define param [ebp+8]     ;paramter from a caller
  enter 4, 0
  mov eax, param
  mov ebx, 1
  mov local_var, ebx
  mov ecx, local_var
  add eax, ecx
  push eax
  push fmtInt
  call printf
  add esp, 8 
  leave
  ret
;----F P U-----------------------------F P U---------
;FPU has it`s own stack that consist from registers
;FPU convering from 32 to 64 bit automatically on fly
;You only need to tell assembler amount of data store to
;32->64 example---
  fld dword [f32var1]  ;load 32 bit float, now FPU has variable converted t 64 bit
  fstp qword [f64var1] ;store data fom FPU stack into DRAM
;64->32 example--
  fld qword [f64var1]
  fstp dword [f32var1]
;
;-----to MIROR data (or change order of bytes ) use 
  PSHUFB 
;------------------------------digital signal processing instructions and floating point
;██████╗░░██████╗██████╗░  ░██████╗░██████╗███████╗░░██╗██╗░░░░░███╗░░
;██╔══██╗██╔════╝██╔══██╗  ██╔════╝██╔════╝██╔════╝░██╔╝██║░░░░████║░░
;██║░░██║╚█████╗░██████╔╝  ╚█████╗░╚█████╗░█████╗░░██╔╝░██║░░░██╔██║░░
;██║░░██║░╚═══██╗██╔═══╝░  ░╚═══██╗░╚═══██╗██╔══╝░░███████║░░░╚═╝██║░░
;██████╔╝██████╔╝██║░░░░░  ██████╔╝██████╔╝███████╗╚════██║██╗███████╗
;╚═════╝░╚═════╝░╚═╝░░░░░  ╚═════╝░╚═════╝░╚══════╝░░░░░╚═╝╚═╝╚══════╝
;--to multiply and sum 4 operands , use the DPPS instruction
;for example:
;xmm1 = [a0 a1 a2 a3]
;xmm2 = [b0 b1 b2 b3]
;dot = a0*b0 + a1*b1 + a2*b2 + a3*b3
;xmm1 = [dot, 0.0, 0.0, 0.0]
;--the command is the next:
   DPPS xmm1, xmm2, 0xF1
;---explanation:
;high nibble (0xF) = 1111b: use all 4 elements in the dot product
;low nibble (0x1) = 0001b: store the result only in element 0 of xmm1, other elements set to 0.0
;-------------------load/store-----XMM---regs------------------
     lddqu xmm0, [f32array1] 
     movups [f32array1], xmm0
;---load --integer --data into FPU stack (ebx has address of the variable):
     FILD dword [ebx]
;------------load float data into FPU register stack------
    FLD dword [ebx]
;-----popo data from FPU register stack into memory
    FSTP qword [ebx]
;--rounding float values:
ROUNDPS xmm1 , xmm2, 0
;--move one (order defined by thrid parameter) float 32 number from xmm to RAM:
 EXTRACTPS [f32var] , xmm2, 0
;---move one float32 from RAM to XMM:
INSERTPS xmm2, [f32array2], 0
;---compare two pairs 64bit words.When equal, value 0xffffffffffffffff placed in destination xmm reg:
PCMPEQQ xmm1, xmm2
