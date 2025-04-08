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


