
;utils for dumping memory and 64 bytes of data on a screen
;Before calling these procedures save context with PUSHAD and restore after return with POPAD
section .text

    global printGpioRegs, print64BytesOfMemory, printMemorySlice, printSSE, showFpuStatus
    extern printf, scanf, ExitProcess
;==================================================
printGpioRegs:
  ;--IMPORTANT: flags firstly,   regs secondly  must be stored inside stack by
  ;pushad,  and restore regs firstly, flags secondly  after return by popad instructions
  ;EXAMPLE 
  ;  pushfd  ;1)push EFLAGS
  ;  pushad  ;2)push REGS
  ; CALL printGpioRegs
  ;  popad   ;4)pop REGS
  ;  popfd   ;5)pop EFLAG
  ;---stack frame----------
  ;ESI          0
  ;EIP(return) +4
  ;EDI         +8      
  ;ESI         +12
  ;EBP         +16
  ;ESP         +20
  ;EBX         +24
  ;EDX         +28
  ;ECX         +32
  ;EAX         +36
  ;EFLAGS      +40
  ;---CONVENTIONS---:
  ; ESI pointer, 
  ; EDX-counter
  mov edx, 8
  push esi
  mov esi, esp
  ;-------
  add esi, 8
loop002:
  mov eax, [esi]
  push eax
  add esi, 4
  dec edx
  jnz loop002
  mov eax, fmt_132727_regs1
  push eax
  call printf
  add esp, 36   ;free stack after call
  ;-------plot--flags------
  mov ebx, esi  ;ebx is ptr
  sub ebx, 0   ;flags is already here
  mov eax, [ebx]  ;load flags
  ;--load pointer to a string
  mov ebx, fmt_13227_cpu_flags
  mov ecx, 00000001h ; comparand
  mov edx, 21 ;counter
  ;----switch-constuction
flags_132727_loop:  
  test eax, ecx
  jz to_bit2_132727
    pushad
    push ebx
    call printf
    add esp, 4
    popad
to_bit2_132727:
  shl ecx, 1
  add ebx, 7
  dec edx
  jnz flags_132727_loop
  ;------------
  pop esi  ;restore stack
  ret
;====================================================================
printSSE:
  ;---before call please save and restore flags and registers:
  ;1)pushfd 2)pushad  _call_ 3)popad 4)popfd
  ;stack---
  ; var128  -32  
  ; esi     0
  ; return  +4 
  %define var128 [esi-16]
  push esi
  mov esi, esp
  sub esp, 16
  ; copy xmm
  mov ebx, esi
  sub ebx, 16
  ;-----{
  movups [ebx], xmm0 ;here is the bug, program working without this string
  ;print
  push dword [ebx]
  push dword [ebx+4]
  push dword [ebx+8]
  push dword [ebx+12]
  push fmt_13227_xmm0
  call printf
  add esp, 20
  ;---}
    ;-----{
  movups [ebx], xmm1 ;here is the bug, program working without this string
  ;print
  push dword [ebx]
  push dword [ebx+4]
  push dword [ebx+8]
  push dword [ebx+12]
   push fmt_13227_xmm1
  call printf
  add esp, 20
  ;---}
    ;-----{
  movups [ebx], xmm2 ;here is the bug, program working without this string
  ;print
  push dword [ebx]
  push dword [ebx+4]
  push dword [ebx+8]
  push dword [ebx+12]
   push fmt_13227_xmm3
  call printf
  add esp, 20
  ;---}
    ;-----{
  movups [ebx], xmm4 ;here is the bug, program working without this string
  ;print
  push dword [ebx]
  push dword [ebx+4]
  push dword [ebx+8]
  push dword [ebx+12]
   push fmt_13227_xmm4
  call printf
  add esp, 20
  ;---}
    ;-----{
  movups [ebx], xmm5 ;here is the bug, program working without this string
  ;print
  push dword [ebx]
  push dword [ebx+4]
  push dword [ebx+8]
  push dword [ebx+12]
   push fmt_13227_xmm5
  call printf
  add esp, 20
  ;---}
    ;-----{
  movups [ebx], xmm6 ;here is the bug, program working without this string
  ;print
  push dword [ebx]
  push dword [ebx+4]
  push dword [ebx+8]
  push dword [ebx+12]
   push fmt_13227_xmm6
  call printf
  add esp, 20
  ;---}
    ;-----{
  movups [ebx], xmm7 ;here is the bug, program working without this string
  ;print
  push dword [ebx]
  push dword [ebx+4]
  push dword [ebx+8]
  push dword [ebx+12]
   push fmt_13227_xmm7
  call printf
  add esp, 20
  ;---}
 ;free memory
 add esp, 16
 pop esi
  ret

;====================================================
printMemorySlice:
;1)push length of a block, 
;2)push address
;----------------
  ;ESI      0  <- (ESI)
  ;PC      +4
  ;ptr     +8
  ;length  +12
  ;----------
  %define ptr_132727   [esi+8]
  %define lenght_132727 [esi+12]
  ;-EDX -counter
  ;-EBX -pointer to data
  push esi
  mov esi, esp
  ;-----title 1
  mov eax, ptr_132727
  push eax ;
  push fmt_132727_integer_title
  call printf
  add esp, 8
  ;load counter and pointer value
  mov edx, lenght_132727 
  mov ebx, ptr_132727
lab01_132727:
  ;save context
  push ebx ;save context
  push edx ;save context
  ;load data to print
  movzx eax, byte [ebx] 
  push eax
  push fmt_132727_hex8
  call printf
  add esp ,8
  ;restore context
  pop edx ;restore context
  pop ebx ;restoer context
  ;increment a pointer by one byte
  inc ebx
  ;iterate until zero in EDX
  dec edx
  jnz lab01_132727
  ;-and as asc2
  ;-next string
  ;title2
  push fmt_132727_asc2_title
  call printf
  add esp, 4
     ;load counter and pointer value
  mov edx, lenght_132727 
  mov ebx, ptr_132727
lab002_132727:
  ;save context
  push ebx ;save context
  push edx ;save context
  ;load data to print
  movzx eax, byte [ebx] 
  push eax
  push fmt_132727_asc2
  call printf
  add esp ,8
    ;restore context
  pop edx ;restore context
  pop ebx ;restoer context
    ;increment a pointer by one byte
  inc ebx
    ;iterate until zero in EDX
  dec edx
  jnz lab002_132727
    ;restore regs and quit
  pop esi
  ret 

  ;****
  ;====================================
print64BytesOfMemory:
  ;-------------------
  ;ESI      0  (ESI)
  ;PC      +4
  ;par1    +8
  ;----------
  %define par1    [esi+8]
  ;-EDX -counter
  ;-EBX -pointer to data
  push esi
  mov esi, esp
  ;-----title 1
  mov eax, par1
  push eax ;
  push fmt_132727_integer_title
  call printf
  add esp, 8
  ;load counter and pointer value
  mov edx, 64 
  mov ebx, par1
lab01:
  ;save context
  push ebx ;save context
  push edx ;save context
  ;load data to print
  movzx eax, byte [ebx] 
  push eax
  push fmt_132727_hex8

  call printf
  add esp ,8
  ;restore context
  pop edx ;restore context
  pop ebx ;restoer context
  ;increment a pointer by one byte
  inc ebx
  ;iterate until zero in EDX
  dec edx
  jnz lab01
  ;-and as asc2
  ;-next string
  ;title2
  push fmt_132727_asc2_title
  call printf
  add esp, 4
     ;load counter and pointer value
  mov edx, 64 
  mov ebx, par1
lab002:
  ;save context
  push ebx ;save context
  push edx ;save context
  ;load data to print
  movzx eax, byte [ebx] 
  push eax
  push fmt_132727_asc2
  call printf
  add esp ,8
  ;restore context
  pop edx ;restore context
  pop ebx ;restoer context
  ;increment a pointer by one byte
  inc ebx
  ;iterate until zero in EDX
  dec edx
  jnz lab002  

  ;restore regs and quit
  pop esi
  ret 
;================================
showFpuStatus:
  ;---stack
  ;            ebp-4
  ;old_ebp     ebp
  ;return_addr ebp+4
  enter 4, 0
  mov ecx, 11 ;counter 1
  mov ebx, fmt_13227_cpu_flags1 ;string addr
  mov eax, 0 ;clear eax
  fstsw ax ;copying flags to eax 
  ;-1) first 11 flags
fpu_11flags_loop1:
  test eax, 0x00000001
  jz no_flag01
    ;store regs
    push eax
    push ebx
    push ecx
    push edx
      ;plot sub string
      push ebx
      call printf
      add esp, 4 ;restore stack after call
      ;restore regs
    pop edx
    pop ecx
    pop ebx
    pop eax
no_flag01:
  shr eax, 1 ;shift flags of FPU
  add ebx, 5  ;shif to next sub-string
  loop fpu_11flags_loop1
  ;2)---top of stack pointer plot
  mov edx, eax
  and edx, 0x00000007
  ;--store regs
    push eax
    push ebx
    push ecx
    push edx
    ;pring top stack
    push edx
    push fmt_13227_cpu_flags2 
    call printf
    add esp, 8
  ;restore regs
    pop edx
    pop ecx
    pop ebx
    pop eax
    ;-shift flags
    shr eax, 3
    ;3)plot bits 14, 15  (C3,B)
    mov ebx, fmt_13227_cpu_flags3
    mov ecx, 2
flags_loop2:
    test eax, 0x00000001
    jz no_flags_02
        ;store regs
      push eax
      push ebx
      push ecx
      push edx
      ;plot sub string
      push ebx
      call printf
      add esp, 4 ;restore stack after call
      ;restore regs
      pop edx
      pop ecx
      pop ebx
      pop eax
no_flags_02:
      add ebx,4
      shr eax,1
  loop flags_loop2
  ;---plot CR LF
  push  fmt_13227_exit
  call printf
  add esp, 4

  leave
  ret

section .data
    fmt_132727_regs1  db 10,"EAX: %08x, ECX: %08x, EDX: %08x, EBX: %08x, ESP: %08x, EBP: %08x, ESI: %08x, EDI: %08x",10, 0, 0
     fmt_132727_asc2_title db  0ah , " In ASCII:" ,0ah ,0
     fmt_132727_integer_title db 10, " In HEX , address is [ %08X ] :" , 10, 0
     fmt_132727_hex8 db "%02X ",0,0,0
     fmt_132727_asc2 db "%c",0,0,0
     fmt_13227_cpu_flags db "CF    ",0,0," ... ",0,"PF    ",0,0," ... ",0,"AF    ",0,0," ... ",0," ZF   ",0," SF   ",0 ," TF   ",0," IF   ",0," DF   ",0," OF   ",0,"IOPL0 ",0,"IOPL1 ",0," NT   ",0,0," ... ",0," RF   ",0," VM   ",0," AC   ",0," VIF  ",0," VIP  ",0," ID   ",10,0,"    ",0,"    ",0,"    ",0,"    ",0,"    ",0,0,0
     fmt_13227_xmm0 db 10,"XMM0: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm1 db "XMM1: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm2 db "XMM2: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm3 db "XMM3: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm4 db "XMM4: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm5 db "XMM5: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm6 db "XMM6: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm7 db "XMM7: %08x %08x %08x %08x ",10,0
     fmt_13227_cpu_flags1 db 10,"Ie ",0," DE ",0," ZE ",0," OE ",0," UE ",0," PE ",0," SF ",0," ES ",0," C0 ",0," C1 ",0," C2 ",0,0,0,0,0,0,0,0
      fmt_13227_cpu_flags2 db "TOP:%X",0,0
      fmt_13227_cpu_flags3 db " C3",0,"  B",0
    fmt_13227_exit db 10,0
