#include "FileReader.h"

std::vector<char> readFile(std::string input_file){
    //Open the file
    std::ifstream file(input_file, std::ios::binary);

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

    return data;
}