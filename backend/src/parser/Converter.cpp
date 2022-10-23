#include "Converter.h"

void Converter::convert(){
    // Read file
    std::vector<char> data = readFile(input_file);

    // Parsing
    while(data.size() > 0){
        char id = cutFromVector(data, 0, 1)[0];
        uint64_t length = vectorToInt64(cutFromVector(data, 0, 8));
        std::vector<char> block = cutFromVector(data, 0, length);
        caff.ParseCaffBlock(id, std::move(block));
    }

    // Checking Blocks
    caff.CheckCaffBlocks();
}