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
    ~CaffAnimation() = default;
};

#endif //CAFF_ANIMATION_H