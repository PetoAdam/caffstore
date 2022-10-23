#ifndef CAFF_H
#define CAFF_H

#include "CaffHeader.h"
#include "CaffCredits.h"
#include "CaffAnimation.h"

class Caff{
private:
    CaffHeader caff_header{};
    CaffCredits caff_credits{};
    std::vector<CaffAnimation> caff_animations{};
public:
    Caff() = default;
    void ParseCaffBlock(char id, std::vector<char> data);
    void CheckCaffBlocks();
    ~Caff() = default;
};

#endif //CAFF_H