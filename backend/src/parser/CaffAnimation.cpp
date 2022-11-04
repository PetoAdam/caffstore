#include "CaffAnimation.h"

void CaffAnimation::ParseCaffAnimation(std::vector<char> data){
    duration = vectorToInt64(cutFromVector(data, 0, 8, "CAFF ANIMATION -> duration"));
    if(duration == 0)
        throw std::runtime_error("The duration field in CAFF ANIMATION is not valid");

    ciff.ParseCiff(std::move(data));
}

void CaffAnimation::LogCaffAnimation() {
    std::cout << "CAFF ANIMATION (CIFF)" << std::endl;
    std::cout << "- duration: " << duration << std::endl;
    ciff.LogCiff();
}