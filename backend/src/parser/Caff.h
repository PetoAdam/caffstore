#ifndef CAFF_H
#define CAFF_H

#include <iostream> // TODO delete after testing
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
    void LogCaff();
    ~Caff() = default;
};

#endif //CAFF_H