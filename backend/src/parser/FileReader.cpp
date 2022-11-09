#include "FileReader.h"

std::vector<char> readFile(std::string input_file){
    //Open the file
    std::ifstream file;
    file.open(input_file, std::ios::binary);
    if(!file.is_open())
        throw std::runtime_error("Cannot open input file: " + input_file);

    // Stop eating new lines in binary mode
    file.unsetf(std::ios::skipws);

    //Get file size
    file.seekg(0, std::ios::end);
    std::streampos file_size = file.tellg();
    file.seekg(0, std::ios::beg);

    //Read the data
    std::vector<char> data(file_size);
    data.insert(data.begin(),
            std::istream_iterator<char>(file),
            std::istream_iterator<char>());

    file.close();
    return data;
}