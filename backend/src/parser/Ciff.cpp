#include "Ciff.h"

void Ciff::ParseCiff(std::vector<char> data){
    uint64_t header_size = vectorToInt64(cutFromVector(data, 4, 8, "CIFF HEADER -> header_size"));
    if(header_size <= 36)
        throw std::runtime_error("The header_size field in CIFF HEADER is not valid");
    ciff_header.SetHeaderSize(header_size);

    ciff_header.ParseCiffHeader(cutFromVector(data, 0, header_size-8, "CIFF HEADER"));
    
    ciff_content.ParseCiffContent(ciff_header.GetContentSize(), data);
}

void Ciff::LogCiff() {
    ciff_header.LogCiffHeader();
}