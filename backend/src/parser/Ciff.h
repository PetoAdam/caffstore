#ifndef CIFF_H
#define CIFF_H

#include "CiffHeader.h"
#include "CiffContent.h"

class Ciff{
private:
    CiffHeader ciff_header{};
    CiffContent ciff_content{};
public:
    Ciff() = default;
    void ParseCiff(std::vector<char> data);
    uint64_t GetContentSize(){return ciff_header.GetContentSize();}
    uint64_t GetWidth(){return ciff_header.GetWidth();}
    uint64_t GetHeight(){return ciff_header.GetHeight();}
    CiffContent GetContent(){return ciff_content;}
    void LogCiff();
    ~Ciff() = default;
};

#endif //CIFF_H