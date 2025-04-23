
;utils for dumping memory and 64 bytes of data on a screen
;Before calling these procedures save context with PUSHAD and restore after return with POPAD
section .text

    global printGpioRegs, print64BytesOfMemory, printMemorySlice, printSSE
    extern printf, scanf, ExitProcess
 

printGpioRegs:
  ;--IMPORTANT: flags firstly,   regs secondly  must be stored inside stack by
  ;pushad,  and restore regs firstly, flags secondly  after return by popad instructions
  ;EXAMPLE 
  ;  pushfd  ;1)push EFLAGS
  ;  pushad  ;2)push REGS
  ; CALL printGpioRegs
  ;  popad   ;4)pop REGS
  ;  popfd   ;5)pop EFLAG
  ;
  ;
  ;---stack frame---
  ;ESI          0
  ;EIP(return) +4
  ;EDI   +8      
  ;ESI   +12
  ;EBP   +16
  ;ESP   +20
  ;EBX   +24
  ;EDX   +28
  ;ECX   +32
  ;EAX   +36
  ;EFLAGS +40
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
  mov edx, 16 ;counter
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
  movups [ebx], xmm0 ;here is the bug, program working without this string
  ;print
  push dword [ebx]
  push dword [ebx+4]
  push dword [ebx+8]
  push dword [ebx+12]
   push fmt_13227_xmm7
  call printf
  add esp, 20
 ;free memory
 add esp, 16
 pop esi
  ret


printMemorySlice:
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

print64BytesOfMemory:
  ;----------
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

section .data
    fmt_132727_regs1  db "EAX: %08x, ECX: %08x, EDX: %08x, EBX: %08x, ESP: %08x, EBP: %08x, ESI: %08x, EDI: %08x",10, 0, 0
     fmt_132727_asc2_title db  0ah , " In ASCII:" ,0ah ,0
     fmt_132727_integer_title db 10, " In HEX , address is [ %08X ] :" , 10, 0
     fmt_132727_hex8 db "%02X ",0,0,0
     fmt_132727_asc2 db "%c",0,0,0
     fmt_13227_cpu_flags db "CF    ",0,0," ... ",0,"PF    ",0,0," ... ",0,"AF    ",0,0," ... ",0," ZF   ",0," TF   ",0 ," IF   ",0," DF   ",0," OF   ",0,"IOPL0 ",0,"IOPL1 ",0," NT   ",0,0," ... ",0," RF   ",0," VM   ",0," AC   ",0," VIF  ",0," VIP  ",0," ID   ",0
     fmt_13227_xmm0 db "XMM0: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm1 db "XMM1: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm2 db "XMM2: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm3 db "XMM3: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm4 db "XMM4: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm5 db "XMM5: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm6 db "XMM6: %08x %08x %08x %08x ",10,0
     fmt_13227_xmm7 db "XMM7: %08x %08x %08x %08x ",10,0

