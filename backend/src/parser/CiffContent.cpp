#include "CiffContent.h"

void CiffContent::ParseCiffContent(uint64_t content_size, std::vector<char> data){
    if(content_size != data.size())
        throw std::runtime_error("The number of pixels in CIFF CONTENT is not valid");

    // TODO pixels
};