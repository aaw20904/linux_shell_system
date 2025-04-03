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
