#include <stdio.h>
#include <time.h>

int main() {
  time_t currentTime;
  time(&currentTime); 
  printf("Hello ASL!");
  printf("Current time: %s", ctime(&currentTime)); 

  return 0;
}