; I`s a code of simple HTTP server: read a file from disc and respond to a client with it.
; The code has been generated by ChatGPT AI

format PE console
entry start

include 'win32a.inc'

section '.data' data readable writeable
    serverPort equ 8080 ; Change this to the desired port number
    bufferSize equ 4096 ; Change this to the desired buffer size

    serverMessage db 'HTTP/1.1 200 OK', 0
    notFoundMessage db 'HTTP/1.1 404 Not Found', 0

    ; Define the file name and its path
    fileName db 'index.html', 0
    filePath db 'C:\path\to\files\', 0 ; Change this to the desired file path

section '.text' code readable executable
start:
    ; Initialize Winsock
    call initWinsock

    ; Create a socket
    push AF_INET
    push SOCK_STREAM
    push IPPROTO_TCP
    call socket

    mov ebx, eax ; store the socket descriptor in ebx

    ; Prepare sockaddr_in structure
    mov eax, AF_INET
    mov word [esi], ax ; sin_family
    xor eax, eax
    mov word [esi + 2], ax ; sin_port
    mov eax, 0x0100007F ; 127.0.0.1
    mov [esi + 4], eax ; sin_addr

    ; Bind the socket
    push 16
    push esi
    push ebx
    call bind

    ; Listen for connections
    push SOMAXCONN
    push ebx
    call listen

    accept_loop:
        ; Accept a client connection
        push 0
        push 16
        push esi
        push ebx
        call accept

        mov edi, eax ; store the accepted socket descriptor in edi

        ; Receive the client's request
        push bufferSize
        push buffer
        push bufferSize
        push edi
        call recv

        ; Check if the request is empty
        test eax, eax
        jle close_connection

        ; Extract the requested file name from the request
        lea esi, [buffer + 4] ; Skip the request method ("GET ")
        lea edi, [fileName]
        mov ecx, 256 ; Maximum file name length

        extract_file_name:
            lodsb
            cmp al, ' '
            je file_name_extracted
            stosb
            loop extract_file_name

        file_name_extracted:

        ; Open the requested file
        push 0
        push 0
        push FILE_SHARE_READ
        push OPEN_EXISTING
        push 0
        push FILE_ATTRIBUTE_NORMAL
        push GENERIC_READ
        push filePath
        push edi
        call CreateFileA

        ; Check if the file was opened successfully
        cmp eax, INVALID_HANDLE_VALUE
        je file_not_found

        mov ebx, eax ; store the file handle in ebx

        ; Get the file size
        push ebx
        push 0
        call GetFileSize

        ; Prepare the response headers
        push eax
        push 0
        push serverMessage
        push eax
        push edi
        call wsprintfA

        ; Send the response headers
        push bufferSize
        push edi
        push bufferSize
        push ebx
        call send

        ; Send the file contents
        push bufferSize
        push buffer
        push bufferSize
        push ebx
        call ReadFile
        test eax, eax
        jle close_file

        push eax
        push buffer
        push eax
        push edi
        call send

        close_file:
            ; Close the file
            push ebx
            call CloseHandle

        close_connection:
            ; Close the client connection
            push edi
            call closesocket

        jmp accept_loop

    file_not_found:
        ; Prepare the 404 response headers
        push 0
        push 0
        push notFoundMessage
        push 0
        push edi
        call wsprintfA

        ; Send the 404 response headers
        push bufferSize
        push edi
        push bufferSize
        push edi
        call send

        jmp close_connection

initWinsock:
    push WS_VERSION_REQD
    push wsadata
    call WSAStartup
    test eax, eax
    jnz error_exit
    ret

error_exit:
    ; Display the error message and exit
    push eax
    call WSAGetLastError
    push 0
    call FormatMessageA
    push MB_OK
    push 0
    push 0
    push 0
    call MessageBoxA
    push -1
    call ExitProcess

section '.idata' import data readable writeable
    library ws2_32, 'ws2_32.dll',\
            kernel32, 'kernel32.dll'

    include 'api\kernel32.inc'
    include 'api\ws2_32.inc'

section '.rdata' data readable
    buffer rb bufferSize
    wsadata WSADATA

