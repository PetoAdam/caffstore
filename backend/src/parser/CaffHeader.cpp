#include "CaffHeader.h"

void CaffHeader::ParseCaffHeader(std::vector<char> data){
    if(parsed)
        throw std::runtime_error("The CAFF file contains more than one CAFF HEADER");

    magic = vectorToString(cutFromVector(data, 0, 4, "CAFF HEADER -> magic"));
    if(magic != "CAFF")
        throw std::runtime_error("The magic field in CAFF HEADER is not valid");

    header_size = vectorToInt64(cutFromVector(data, 0, 8, "CAFF HEADER -> header_size"));
    if(header_size != 20)
        throw std::runtime_error("The header_size field in CAFF HEADER is not valid");
    
    num_anim = vectorToInt64(cutFromVector(data, 0, 8, "CAFF HEADER -> num_anim"));
    if(num_anim == 0)
        throw std::runtime_error("The num_anim field in CAFF HEADER is not valid");

    if(data.size() > 0)
        throw std::runtime_error("Too much data int the CAFF HEADER");
        
    parsed = true;
}

void CaffHeader::LogCaffHeader() {
    std::cout << "CAFF HEADER" << std::endl;
    std::cout << "- magic: " << magic << std::endl;
    std::cout << "- header_size: " << header_size << std::endl;
    std::cout << "- num_anim: " << num_anim << std::endl;
    std::cout << std::endl;
}