#ifndef CAFF_H
#define CAFF_H

#include <iostream>
#include "CaffHeader.h"
#include "CaffCredits.h"
#include "CaffAnimation.h"

class Caff{
private:
    CaffHeader caff_header{};
    CaffCredits caff_credits{};
    std::vector<CaffAnimation> caff_animations{};
    void CheckAnimNum();
    void CheckCiffSizes();
public:
    Caff() = default;
    void ParseCaffBlock(char id, std::vector<char> data);
    void CheckCaffBlocks();
    void LogCaff();
    std::vector<CaffAnimation> GetAnimations(){return caff_animations;}
    ~Caff() = default;
};

#endif //CAFF_H