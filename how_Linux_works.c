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

/*
█░█ ▄▀█ █▀█ ▀█▀
█▄█ █▀█ █▀▄ ░█░
*/
/**
     1.open port (non-console mode, blocking/non-blocking mode , etc)
       2. read exists parameters (attributes) into structure
         3.   modify structure (speed, parity)
          4. write updated attributes in system 
              5   write/read operations 
             close UART port when it no needs anymore
     
**/
/*** the pool() function**/
/*
To monitoring asyncronous events ( TCP,UDP, UART)
there is the usefull function pool().
It`s puts execution thread into sleep - until timeout period or an event happens.
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
 //1) open port
    int uart_fd = open("/dev/ttyAMA0", O_RDWR | O_NOCTTY | O_NDELAY);
         ///O_NOCTTY - not becomes a system termnal (console)
        /// O_RDWR - open for reading and writing
         //O_NDELAY - non blocking mode
    struct termios options;
 //2) read attributes
  tcgetattr(uart_fd, &options);
 //3)modify speed
  cfsetispeed(&options, B115200);
  cfsetospeed(&options, B115200);
//4)set UART parameters:
// Set 8 data bits, no parity, 1 stop bit
options.c_cflag &= ~PARENB; // No parity
options.c_cflag &= ~CSTOPB; // 1 stop bit
options.c_cflag &= ~CSIZE;  
options.c_cflag |= CS8; // 8-bit
options.c_cflag |= CREAD | CLOCAL; // Enable receiver, disable modem control
//5)Apply new params to UART
tcsetattr(uart_fd, TCSANOW, &options);
 
    int tcp_fd = socket(AF_INET, SOCK_STREAM, 0);
    // Assume tcp_fd is connected to a remote server
    /*
    structure pollfd description:
    struct pollfd {
                   int fd;        // File descriptor to monitor
                   short events;  // Events to watch for
                   short revents; // Events that occurred
                  };
    */
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

/*

▀█▀ █▀▀ █▀█   █▀ █▀█ █▀▀ █▄▀ █▀▀ ▀█▀
░█░ █▄▄ █▀▀   ▄█ █▄█ █▄▄ █░█ ██▄ ░█░
*/
/******SERVER
    1. create server socket (a descriptor)
    2.Bind the socket
    3.Listen
       |
       |-----------------------<---------------------| 
   4 accept (block until conn., get incom. socket)   |
       |                                             |
       |----------<---------------|                  |
   5 recv(blocking/non-blocking)  |                  |
       |                          |                  |
   6 send()                       |                  |  
       |-------->-----------------|                  |  
     7 close incoming socket                         |
       |----------------------->---------------------|
       |
       8.Close server socket (descriptor)
*/

/*****CLIENT
  1.Create socket
  2.Set parameters (IP, port, etc)
  3.Connect (blocking exec)
  4.Communication process: Send() & Recv(blocking/non-blocking) 
  5.Close
*/

/**********TCP Server*********/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080
int serverFd, newSocket;
struct sockaddr_in address;
char tcpBuffer[1024] = {0};
char *message = "Hello, Client!\n";
socklen_t addrlen = sizeof(address);


//1)Create a socket:
serverFd = socket(AF_INET, SOCK_STREAM, 0);
/*
 The first "domain" argument specifies a communication domain;
 this selects the protocol family which will be used for communication.
 AF_INET - IPv4 Internet protocols 

 The second parameter, "type" means socket has the indicated type,
 which specifies the communication semantics.
 SOCK_STREAM  Provides sequenced, reliable, two-way, connection-based
              byte streams.

  The thrid "protocol" specifies a particular protocol to be used with the
  socket.  Normally only a single protocol exists to support a
  particular socket type within a given protocol family, in which
  case protocol can be specified as 0.

 
*/
  if (serverFd == 0) {
   //when a socket can`t be created (error):
          perror("Socket failed");
          exit(EXIT_FAILURE);
  }
 // 2) Bind socket
   /*     
         struct sockaddr_in {
               sa_family_t    sin_family; // address family: AF_INET 
               in_port_t      sin_port;   // port in network byte order 
               struct in_addr sin_addr;   // internet address 
           };

           //--- Internet address
           struct in_addr {
               uint32_t       s_addr;     // address in network byte order 
           };
*/
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

 if (bind(serverFd, (struct sockaddr *)&address, sizeof(address)) < 0) {
      perror("Bind failed");
      exit(EXIT_FAILURE);
 }

// 3. Listen for connections
    if (listen(serverFd, 3) < 0) {
        perror("Listen failed");
        exit(EXIT_FAILURE);
    }
  printf("Server listening on port %d...\n", PORT);

// 4. Accept client connection
    newSocket = accept(serverFd, (struct sockaddr *)&address, (socklen_t *)&addrlen);
    if (newSocket < 0) {
        perror("Accept failed");
        exit(EXIT_FAILURE);
    }
 // 5. Send and receive data
    read(newSocket, tcpBuffer, 1024);
   printf("%.5s \n",tcpBuffer);
    send(newSocket, "HelloFromServer! \n", 18, 0);

 // 6. Close sockets
    close(newSocket);
    close(serverFd);

    return 0;

//---------------test code-------------29 03 25-----------
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>

struct sockaddr_in srvAddress;
struct sockaddr_in clientAddress;
int server_fd, new_socket;
char string[256]={0};
char tcpBuffer[1024] = {0};
char responseBuffer[1024] ={0};

int main (void) {
//create a socket firstly 
char *message = "Hello, Client!\n";
socklen_t addrlen = sizeof(srvAddress);
int closeSrvSwitch=1;
int closeClientSwitch=1;
//create a socket

server_fd= socket(AF_INET, SOCK_STREAM, 0);

if (server_fd == 0) {
    perror("Socket failed");
    return -1;
}

//fill a struct with data
srvAddress.sin_family = AF_INET;
srvAddress.sin_addr.s_addr = INADDR_ANY;
srvAddress.sin_port = htons(8080);
///bind a socket
if (bind(server_fd, (struct sockaddr *)&srvAddress, sizeof(srvAddress)) < 0) {
    perror("Bind failed");
    return -1;
}

//listen
if (listen(server_fd,3) < 0) {
    perror("Listen filed!");
    return -1;
}
printf("Server listen.. \n");
while(closeSrvSwitch) {
    //accept incoming message
    new_socket = accept(server_fd, (struct sockaddr *)&srvAddress, &addrlen);
    if (new_socket < 0) {
        perror("Accept failed");
       return-1;
    }
        while(closeClientSwitch) {
            //A)checking - is there a switch to exit?
            if (strchr(tcpBuffer,0x0040)) {  //@
                closeClientSwitch = 0;
            }
            //B)read client adress and print into a string
            if ( getpeername(new_socket, (struct sockaddr *)&clientAddress, &addrlen ) == 0) {
                //address
                sprintf(string, "addr: %s, port: %d", inet_ntoa(clientAddress.sin_addr), ntohs(clientAddress.sin_port));
            }
            //C)read incoming message
            read (new_socket, tcpBuffer, sizeof(tcpBuffer));
            printf("%25s \n",tcpBuffer);
            //D)respond with a string
            snprintf (responseBuffer, 64, "%s %s \n\0", string, tcpBuffer);
            write(new_socket, responseBuffer, strlen(responseBuffer));
        
        }

    close(new_socket);
    //checking - is there a switch to exit?
    if (strchr(tcpBuffer,0x0023)) { //#
        closeSrvSwitch = 0;
    }


}

close(server_fd);



}




   
