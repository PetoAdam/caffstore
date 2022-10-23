#ifndef CAFF_CREDITS_H
#define CAFF_CREDITS_H

#include <string>
#include <vector>
#include <algorithm>
#include <ctime>
#include "VectorHandler.h"

class CaffCredits{
private:
    bool parsed = false;
    uint16_t year{};
    uint8_t month{};
    uint8_t day{};
    uint8_t hour{};
    uint8_t minute{};
    uint64_t creator_len{};
    std::string creator{};
    bool IsDayValid();
    bool IsDateValid();
public:
    CaffCredits() = default;
    void ParseCaffCredits(std::vector<char> data);
    bool IsParsed(){return parsed;}
    void SetParsed(bool p){parsed = p;}
    ~CaffCredits() = default;
};

#endif //CAFF_CREDITS_H