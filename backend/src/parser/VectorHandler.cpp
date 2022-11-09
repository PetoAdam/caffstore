#include "VectorHandler.h"

std::vector<char> cutFromVector(std::vector<char>& data, unsigned int begin, unsigned int size, std::string field_name){
    auto begin_iter = data.begin() + begin;
    auto end_iter = begin_iter + size;

    if(begin_iter > data.end() || end_iter > data.end()) 
        throw std::runtime_error("Not enough bytes in the input data for field: " + field_name);

    std::vector<char> result(begin_iter, end_iter);
    data.erase(begin_iter, end_iter);

    return result;
}

uint8_t vectorToInt8(std::vector<char> data){
    if(data.size() != 1)
        throw std::runtime_error("Invalid data for uint8_t conversion");
 
    return uint8_t((uint8_t)(unsigned char)(data[0]));
}

uint16_t vectorToInt16(std::vector<char> data){
    if(data.size() != 2)
        throw std::runtime_error("Invalid data for uint16_t conversion");

    return uint16_t((uint16_t)(unsigned char)(data[1]) << 8 |
                    (uint16_t)(unsigned char)(data[0]));
}

uint64_t vectorToInt64(std::vector<char> data){
    if(data.size() != 8)
        throw std::runtime_error("Invalid data for uint64_t conversion");

    return uint64_t((uint64_t)(unsigned char)(data[7]) << 56 |
                    (uint64_t)(unsigned char)(data[6]) << 48 |
                    (uint64_t)(unsigned char)(data[5]) << 40 |
                    (uint64_t)(unsigned char)(data[4]) << 32 |
                    (uint64_t)(unsigned char)(data[3]) << 24 |
                    (uint64_t)(unsigned char)(data[2]) << 16 |
                    (uint64_t)(unsigned char)(data[1]) << 8  |
                    (uint64_t)(unsigned char)(data[0]));
}

std::string vectorToString(std::vector<char> data){
    std::string result;
    for(int i = 0; i < data.size(); i++){
        result.push_back(data[i]);
    }
    return result;
}