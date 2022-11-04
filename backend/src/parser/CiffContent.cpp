#include "CiffContent.h"

void CiffContent::ParseCiffContent(uint64_t content_size, std::vector<char> data){
    if(content_size != data.size())
        throw std::runtime_error("The number of pixels in CIFF CONTENT is not valid");

    ParsePixels(std::move(data));
};

void CiffContent::ParsePixels(const std::vector<char>& data){
    int i = 0;
    while(i+2 < data.size()){
        uint8_t r = data[i];
        uint8_t g = data[i+1];
        uint8_t b = data[i+2];
        pixels.push_back(RGB(r,g,b));
        i+=3;
    }
}