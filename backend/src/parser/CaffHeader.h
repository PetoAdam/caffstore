#ifndef CAFF_HEADER_H
#define CAFF_HEADER_H

#include <iostream>
#include <string>
#include <vector>
#include "VectorHandler.h"

class CaffHeader{
private:
    bool parsed = false;
    std::string magic;
    uint64_t header_size{};
    uint64_t num_anim{};
public:
    CaffHeader() = default;
    void ParseCaffHeader(std::vector<char> data);
    void LogCaffHeader();
    bool IsParsed(){return parsed;}
    void SetParsed(bool p){parsed = p;}
    uint64_t GetNumAnim(){return num_anim;}
    ~CaffHeader() = default;
};

#endif //CAFF_HEADER_H