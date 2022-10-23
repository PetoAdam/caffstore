#ifndef CIFF_HEADER_H
#define CIFF_HEADER_H

#include <string>
#include <vector>
#include "VectorHandler.h"

class CiffHeader{
private:
    bool parsed = false;
    std::string magic;
    uint64_t header_size{};
    uint64_t content_size{};
    uint64_t width{};
    uint64_t height{};
    std::string caption;
    std::vector<std::string> tags{};
public:
    CiffHeader() = default;
    void ParseCiffHeader(std::vector<char> data);
    void SetHeaderSize(uint64_t hs){header_size = hs;}
    uint64_t GetContentSize(){return content_size;}
    ~CiffHeader() = default;
};

#endif //CIFF_HEADER_H