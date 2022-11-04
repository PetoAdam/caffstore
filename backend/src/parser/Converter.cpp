#include "Converter.h"

void Converter::convert(){
    // Read file
    std::vector<char> data = readFile(input_file);

    // Parsing
    while(!data.empty()){
        char id = cutFromVector(data, 0, 1, "block id")[0];
        if (id == 0) { // TODO it's ugly
            bool is_zero = true;
            for (int i = 0; i < data.size(); i++)
                if (data[i] != 0) is_zero = false;
            if (!is_zero) throw std::runtime_error("Too much data at the end of the file");
            else  data.clear();
        }
        else {
            uint64_t length = vectorToInt64(cutFromVector(data, 0, 8, "block length (id=" + std::to_string(id) + ")"));
            std::vector<char> block = cutFromVector(data, 0, length, "block data (id=" + std::to_string(id) + ", length=" + std::to_string(length) + ")");
            caff.ParseCaffBlock(id, std::move(block));
        }
    }

    // Checking Blocks
    caff.CheckCaffBlocks();

    // Log CAFF
    caff.LogCaff();

    // Write CAFF to GIF
    writeGif(output_file, caff);
}