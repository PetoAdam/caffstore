#include "CiffHeader.h"

void CiffHeader::ParseCiffHeader(std::vector<char> data){
    magic = vectorToString(cutFromVector(data, 0, 4, "CIFF HEADER -> magic"));
    if(magic != "CIFF")
        throw std::runtime_error("The magic field in CIFF HEADER is not valid");

    content_size = vectorToInt64(cutFromVector(data, 0, 8, "CIFF HEADER -> content_size"));
    width = vectorToInt64(cutFromVector(data, 0, 8, "CIFF HEADER -> width"));
    height = vectorToInt64(cutFromVector(data, 0, 8, "CIFF HEADER -> height"));

    if(content_size != width*height*3)
        throw std::runtime_error("The conent_size field in CIFF HEADER is not valid");

    ParseCaption(data);

    ParseTags(data);

    if(data.size() > 0)
        throw std::runtime_error("Too much data int the CIFF HEADER");
}

void CiffHeader::ParseCaption(std::vector<char>& data){
    char first = cutFromVector(data, 0, 1, "CIFF HEADER -> caption")[0];
    while(first != '\n'){
        caption.push_back(first);
        first = cutFromVector(data, 0, 1, "CIFF HEADER -> caption")[0];
    }
}

void CiffHeader::ParseTags(std::vector<char>& data){
    while(data.size() > 0){
        char first = cutFromVector(data, 0, 1, "CIFF HEADER -> tags")[0];
        std::string tag;
        while(first != '\0'){
            if(first == '\n')
                throw std::runtime_error("Tag can't be multiline in CIFF HEADER");
            tag.push_back(first);
            first = cutFromVector(data, 0, 1, "CIFF HEADER -> tags")[0];
        }
        tags.push_back(tag);
    }
}

void CiffHeader::LogCiffHeader() {
    std::cout << "- magic: " << magic << std::endl;
    std::cout << "- header_size: " << header_size << std::endl;
    std::cout << "- content_size: " << content_size << std::endl;
    std::cout << "- width: " << width << std::endl;
    std::cout << "- height: " << height << std::endl;
    std::cout << "- caption: " << caption << std::endl;
    std::cout << "- tags: " << std::endl;
    for(int i = 0; i < tags.size(); i++)
        std::cout << "--- " << tags[i] << std::endl;
    std::cout << std::endl;
}