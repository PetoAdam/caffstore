#include <iostream>
#include "Converter.h"

int main(int argc, const char** argv) {
    if (argc < 2) {
        std::cout << "Input file not given" << std::endl;
        return -1;
    }
    if (argc < 3) {
        std::cout << "Output file name not given" << std::endl;
        return -1;
    }
    std::string input_file = argv[1];
    if(input_file.substr(input_file.find_last_of(".") + 1) != "caff") {
        std::cout << "Input file must have .caff extension" << std::endl;
        return -1;
    }
    std::string output_file = argv[2];

    try {
        Converter converter(input_file, output_file);
        converter.convert();
    }
    catch (const std::exception& e) {
        std::cout << "Conversion faild with error: " << e.what() << std::endl;
        return -1;
    }
    return 0;
}