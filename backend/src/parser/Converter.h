#ifndef CONVERTER_H
#define CONVERTER_H

#include "Caff.h"
#include "FileReader.h"
#include "GifCreator.h"
#include "VectorHandler.h"

class Converter{
private:
    std::string input_file;
    std::string output_file;
    Caff caff{};
public:
    Converter(std::string input, std::string output): input_file(input), output_file(output){}
    void convert();
    ~Converter() = default;
};

#endif //CONVERTER_H