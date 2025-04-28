  ;to compile - use the folowing command:
  ; nasm -f win32 dbg.asm -o dbg.obj
  ;to link with MyLink - use the following command:
  ;   GoLink /entry main /console dbg.obj msvcrt.dll kernel32.dll
  %include "utils.asm"


section .data
  
     string db "01234567890000000000000000000000000000000000000000000000000", 0
     multimedia0 db 01h, 02h, 03h, 04h, 05h, 06h, 07h, 08h, 09h, 0ah, 0bh, 0ch, 0dh, 0eh, 0fh,10h 

section .text
  global main
  extern printf, scanf, ExitProcess
 
main:
  mov eax, 00000001h
  mov ebx, 00000002h
  mov ecx, 00000003h
  mov edx, 00000004h
  test eax, 1
 
  mov eax, 0x7fffffff 
  mov ebx, 0x00000001
  sub eax, ebx

  mov eax, 0x0000000
  mov ebx, 0x0000000

  pushfd
  pushad
  call printGpioRegs
  popad
  popfd

 ;--test begin
  mov al, 0xff
  add al, 1
  ;--test end

  pushfd
  pushad
  call printGpioRegs
  popad
  popfd



  jmp finally

  pushfd
  pushad
  push 32
  push multimedia0
  call  printMemorySlice
  add esp, 8
  popad
  popfd

;1)push length of a block, 
;2)push address
;---------------

  pushfd
  pushad
  call printGpioRegs
  popad
  popfd

finally:
  mov eax, 0
  push eax
  call ExitProcess
  ret


