/*

█▀█ █▀█ █▀ █ ▀▄▀
█▀▀ █▄█ ▄█ █ █░█
 (Portable Operating System Interface) 
 
open()	    Opens a device or file (/dev/ttyAMA0)
close()	    Closes the file descriptor
read()	    Reads data from UART (or a file)
write()	    Sends data to UART (or a file)
tcgetattr()	Gets UART port settings (baud rate, parity, etc.)
tcsetattr()	Sets UART port settings
tcflush()	  Clears the UART buffer
**/

/*** the pool() function**/
/*
To monitoring asyncronous events ( TCP,UDP, UART)
there is the usefull function pool().
It`s puts execution thread into sleep - until timeout period or an event.
For example - there are two events: socket incoming data ready, UART incoming data ready.
So, when any of these events happens - the pool() wakes up an execution thread and 
set type of the event in a special variable-structure.
*/
#include <stdio.h>
#include <stdlib.h>
#include <poll.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define UART_BUFFER_SIZE 256
#define TCP_BUFFER_SIZE 512

int main() {
    int uart_fd = open("/dev/ttyAMA0", O_RDWR | O_NOCTTY | O_NDELAY);
    int tcp_fd = socket(AF_INET, SOCK_STREAM, 0);
    // Assume tcp_fd is connected to a remote server

    struct pollfd fds[2];
    fds[0].fd = uart_fd;
    fds[0].events = POLLIN;  // Watch for UART incoming data

    fds[1].fd = tcp_fd;
    fds[1].events = POLLIN;  // Watch for TCP incoming data

    char uart_buffer[UART_BUFFER_SIZE];
    char tcp_buffer[TCP_BUFFER_SIZE];

    while (1) {
        int ret = poll(fds, 2, 5000); // Wait for events, timeout after 5 sec

        if (ret > 0) {
            // UART Data Ready
            if (fds[0].revents & POLLIN) {
                int bytes_read = read(uart_fd, uart_buffer, UART_BUFFER_SIZE);
                if (bytes_read > 0) {
                    printf("UART Received: %.*s\n", bytes_read, uart_buffer);
                    // Forward to TCP
                    send(tcp_fd, uart_buffer, bytes_read, 0);
                }
            }

            // TCP Data Ready
            if (fds[1].revents & POLLIN) {
                int bytes_read = recv(tcp_fd, tcp_buffer, TCP_BUFFER_SIZE, 0);
                if (bytes_read > 0) {
                    printf("TCP Received: %.*s\n", bytes_read, tcp_buffer);
                    // Forward to UART
                    write(uart_fd, tcp_buffer, bytes_read);
                }
            }
        }
    }

    close(uart_fd);
    close(tcp_fd);
    return 0;
}

