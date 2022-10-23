#include <iostream>
#include "Converter.h"

int main(int argc, const char** argv) {
    if (argc < 2) {
        std::cout << "Input file not given" << std::endl;;
        return -1;
    }
    std::string input_file = argv[1];

    try {
        Converter converter(input_file);
        converter.convert();
    }
    catch (const std::exception& e) {
        std::cout << "Conversion faild with error: " << e.what() << std::endl;;
        return -1;
    }
    return 0;
}