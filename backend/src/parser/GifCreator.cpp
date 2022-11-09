#include "GifCreator.h"

void writeGif(std::string filename, Caff& caff){

    GifWriter gifWriter;
    std::vector<CaffAnimation> animations = caff.GetAnimations();
    uint64_t width = animations[0].GetCiff().GetWidth();
    uint64_t height = animations[0].GetCiff().GetHeight();
    uint64_t duration = animations[0].GetDuration() / 10;

    const char* f = filename.c_str();
    GifBegin(&gifWriter, f, width, height, duration);


    for(int i = 0; i < animations.size(); i++){
        width = animations[i].GetCiff().GetWidth();
        height = animations[i].GetCiff().GetHeight();
        duration = animations[i].GetDuration() / 10;
        
        std::vector<RGB> pixels = animations[i].GetCiff().GetContent().GetPixels();
        std::vector<uint8_t> imageData;
        for(int j = 0; j < pixels.size(); j++){
                imageData.push_back(pixels[j].red);
                imageData.push_back(pixels[j].green);
                imageData.push_back(pixels[j].blue);
                imageData.push_back(uint8_t(255));
        }

        GifWriteFrame(&gifWriter, imageData.data(), width, height, duration);
    }

    GifEnd(&gifWriter);
}