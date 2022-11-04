#ifndef VECTOR_HANDLER_H
#define VECTOR_HANDLER_H

#include <vector>
#include <string>
#include <stdexcept>

std::vector<char> cutFromVector(std::vector<char>& data, unsigned int begin, unsigned int size, std::string field_name);

uint8_t vectorToInt8(std::vector<char> data);

uint16_t vectorToInt16(std::vector<char> data);

uint64_t vectorToInt64(std::vector<char> data);

std::string vectorToString(std::vector<char> data);

#endif //VECTOR_HANDLER_H
