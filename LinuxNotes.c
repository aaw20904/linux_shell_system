
/*
Create  an executable file in Ubuntu:
1) compile
   gcc -c myprogram.c -o myprogram.o
2) link and build
   gcc myprogram.o -o myprogram
3) Change privileges and mode (enable execute)
  sudo chmod 777 myprogram
4)run
  ./myprogram
**/
/*OPTIONAL:  create assembly translation:
   gcc -O0 -m32 -fverbose-asm -S test.c -o test.s
*/

/*******create shared library .SO (like .DLL in Windows)
1)Compile it as position-independent code. -fPIC → generates position-independent code, 
  which can be loaded at any memory address (required for .so).
     gcc -fPIC -c mylib.c
2)Create the shared library
     gcc -shared -o libmymath.so mylib.o
3) You can create and open a shared library dynamically, like in this example below:
*****/

//for example, here is the shared library body, there are only functions, without any "main(){...}":

  int divBy2(int a) {
   return (a >> 1);
 }

///here is the example,  how to open the shared library:
#include <stdio.h>
#include <dlfcn.h>
 
int main(void){
   //1)open the library
  void* handle = dlopen("./mysharedlib.so", RTLD_LAZY);
    if (!handle) {
        printf("Error: %s\n", dlerror());
        return 1;
    }
   //2)get the address of the procedure:
   int (*divBy2)(int)= dlsym(handle,"divBy2");
    //3)call the library`s function:
 printf("Hello word %d \n", divBy2(16));
   //4)close the shared library
 dlclose(handle);
 return 0;
}
