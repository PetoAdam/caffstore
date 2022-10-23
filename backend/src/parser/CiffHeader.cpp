#include "CiffHeader.h"

void CiffHeader::ParseCiffHeader(std::vector<char> data){
    magic = vectorToString(cutFromVector(data, 0, 4));
    if(magic != "CIFF")
        throw std::runtime_error("The magic field in CIFF HEADER is not valid");

    content_size = vectorToInt64(cutFromVector(data, 0, 8));
    width = vectorToInt64(cutFromVector(data, 0, 8));
    height = vectorToInt64(cutFromVector(data, 0, 8));

    if(content_size != width*height*3)
        throw std::runtime_error("The conent_size field in CIFF HEADER is not valid");

    // TODO caption and tags
}