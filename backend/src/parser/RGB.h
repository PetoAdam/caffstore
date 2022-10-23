#ifndef RGB_H
#define RGB_H

#include <stdint.h>

struct RGB{
    uint8_t red;
    uint8_t green;
    uint8_t blue;

    RGB(uint8_t r, uint8_t g, uint8_t b): red(r), green(g), blue(b){}
};

#endif //RGB_H