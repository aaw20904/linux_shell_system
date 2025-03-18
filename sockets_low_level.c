/****MICROSOFT WINDOWS environment***
 #    # # #    # #####   ####  #    #  ####  
 #    # # ##   # #    # #    # #    # #      
 #    # # # #  # #    # #    # #    #  ####  
 # ## # # #  # # #    # #    # # ## #      # 
 ##  ## # #   ## #    # #    # ##  ## #    # 
 #    # # #    # #####   ####  #    #  #### 
FLOWCAHRT
1. Winsock Initialization:  WSAStartup()
2. Creating a Socket:   socket()
3. Binding the Socket:  bind()
4. Listening for Connections (it allows incoming conections):  listen()
5. Accepting a Connection (incoming client`s connection):  accept()
6. Sending & Receiving Data with functions:  send() and recv()
7. Closing Sockets:  closesocket(clientSocket); closesocket(serverSocket);
8.Clean up WSA: WSACleanup();
*/
#include <stdio.h>
#include <winsock2.h>

#pragma comment(lib, "ws2_32.lib")  // Link Winsock library

int main() {
    WSADATA wsa;
    SOCKET serverSocket, clientSocket;
    struct sockaddr_in serverAddr, clientAddr;
    int clientAddrSize = sizeof(clientAddr);
    char buffer[1024] = {0};

    // 1. Initialize Winsock
    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
        printf("WSAStartup failed. Error Code: %d\n", WSAGetLastError());
        return 1;
    }

    // 2. Create Socket
    serverSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (serverSocket == INVALID_SOCKET) {
        printf("Socket creation failed. Error: %d\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }

    // 3. Bind Socket
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_addr.s_addr = INADDR_ANY;
    serverAddr.sin_port = htons(8080);

    if (bind(serverSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
        printf("Bind failed. Error: %d\n", WSAGetLastError());
        closesocket(serverSocket);
        WSACleanup();
        return 1;
    }

    // 4. Listen for Connections
    if (listen(serverSocket, 5) == SOCKET_ERROR) {
        printf("Listen failed. Error: %d\n", WSAGetLastError());
        closesocket(serverSocket);
        WSACleanup();
        return 1;
    }
    printf("Listening on port 8080...\n");

    // 5. Accept Client Connection
    clientSocket = accept(serverSocket, (struct sockaddr*)&clientAddr, &clientAddrSize);
    if (clientSocket == INVALID_SOCKET) {
        printf("Accept failed. Error: %d\n", WSAGetLastError());
        closesocket(serverSocket);
        WSACleanup();
        return 1;
    }
    printf("Client connected.\n");

    // 6. Receive Data 
   /*this funtion blocking thread.This function waits (freeze thread of execution) until appears new data from a client.
   */
    int bytesReceived = recv(clientSocket, buffer, sizeof(buffer), 0);
    if (bytesReceived > 0) {
        printf("Received message: %s\n", buffer);
        send(clientSocket, "Hello from server", 17, 0);
    }

    // 7. Close Connections
    closesocket(clientSocket);
    closesocket(serverSocket);
    WSACleanup();
    
    return 0;
}
