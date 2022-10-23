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
    ~Ciff() = default;
};

#endif //CIFF_H