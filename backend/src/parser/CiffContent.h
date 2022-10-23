#ifndef CIFF_CONTENT_H
#define CIFF_CONTENT_H

#include <vector>
#include "RGB.h"
#include "VectorHandler.h"

class CiffContent{
private:
    bool parsed = false;
    std::vector<RGB> pixels{};
public:
    CiffContent() = default;
    void ParseCiffContent(uint64_t content_size, std::vector<char> data);
    ~CiffContent() = default;
};

#endif //CIFF_CONTENT_H