;-----------COMPILE--LINK--------------------------------
;to compile - use the folowing command:
;   D:\NASM>nasm -f win32 3.asm -o 3.obj
;to link with MyLink - use the following command:
;   D:\NASM>GoLink /entry main /console 3.obj msvcrt.dll kernel32.dll

section .data
    hello_msg db "Hello, World! %s", 0   ; Null-terminated string
    inp_var1 dd 1230
        align 16                      ; Ensure the data is 16-byte aligned
    array dq  "123456789ABCDEF", 0   ; 16 bytes of data
   operand2 db 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0  ; Add 1 to each byte
    test_array resb 32  ;to strore data

section .text
    global main
    extern printf    ; Declare external function

main:
    ;-----enter data
    ; Load data into XMM registers
    movdqu xmm0, [array]     ; Load 16 bytes into xmm0
    movdqu xmm1, [operand2]  ; Load 16 bytes of "1"s into xmm1
    paddb xmm0, xmm1         ; Add 1 to each byte
    movdqu [test_array], xmm0 ; Store back to memory
    ;--------plot--------
    ;mov eax, [test_array]
    push test_array
    push hello_msg   ; Push string argument
    call printf      ; Call printf
    add esp, 8       ; Clean up the stack

    ret              ; Return from main
