#ifndef CAFF_ANIMATION_H
#define CAFF_ANIMATION_H

#include "Ciff.h"

class CaffAnimation{
private:
    uint64_t duration{};
    Ciff ciff{};
public:
    CaffAnimation() = default;
    void ParseCaffAnimation(std::vector<char> data);
    uint64_t GetCiffSize(){return ciff.GetContentSize();}
    void LogCaffAnimation();
    Ciff GetCiff(){return ciff;}
    uint64_t GetDuration(){return duration;}
    ~CaffAnimation() = default;
};

#endif //CAFF_ANIMATION_H