#ifndef CIFF_CONTENT_H
#define CIFF_CONTENT_H

#include <iostream>
#include <vector>
#include "RGB.h"
#include "VectorHandler.h"

class CiffContent{
private:
    bool parsed = false;
    std::vector<RGB> pixels{};
    void ParsePixels(const std::vector<char>& data);
public:
    CiffContent() = default;
    void ParseCiffContent(uint64_t content_size, std::vector<char> data);
    std::vector<RGB> GetPixels(){return pixels;}
    ~CiffContent() = default;
};

#endif //CIFF_CONTENT_H