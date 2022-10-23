#ifndef CONVERTER_H
#define CONVERTER_H

#include "Caff.h"
#include "FileReader.h"
#include "VectorHandler.h"

class Converter{
private:
    std::string input_file;
    Caff caff{};
public:
    Converter(std::string input): input_file(input){}
    void convert();
    ~Converter() = default;
};

#endif //CONVERTER_H