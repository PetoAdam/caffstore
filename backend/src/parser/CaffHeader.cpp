#include "CaffHeader.h"

void CaffHeader::ParseCaffHeader(std::vector<char> data){
    if(parsed)
        throw std::runtime_error("The CAFF file contains more than one CAFF HEADER");

    magic = vectorToString(cutFromVector(data, 0, 4));
    if(magic != "CAFF")
        throw std::runtime_error("The magic field in CAFF HEADER is not valid");

    header_size = vectorToInt8(cutFromVector(data, 0, 8));
    if(header_size != 29)
        throw std::runtime_error("The header_size field in CAFF HEADER is not valid");
    
    num_anim = vectorToInt8(cutFromVector(data, 0, 8));
    if(num_anim == 0)
        throw std::runtime_error("The num_anim field in CAFF HEADER is not valid");

    if(data.size() > 0)
        throw std::runtime_error("Too much data int the CAFF HEADER");
        
    parsed = true;
}