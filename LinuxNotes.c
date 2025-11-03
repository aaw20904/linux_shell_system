
/*
Create  an executable file in Ubuntu:
1) compile
   gcc myprogram.c -o myprogram.o
2) link and build
   gcc myprogram.o myprogram
3) Change privileges and mode (enable execute)
  sudo chmod 777 myprogram
4)run
  ./myprogram
**/

/*******create shared library .SO (like .DLL in Windows)

  1)Compile it as position-independent code. -fPIC → generates position-independent code, 
  which can be loaded at any memory address (required for .so).
gcc -fPIC -c mymath.c
  2)Create the shared library
  gcc -shared -o libmymath.so mymath.o
3)

*****/
