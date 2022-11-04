#include "Caff.h"

void Caff::ParseCaffBlock(char id, std::vector<char> data){
    switch (id){
        case 1:
            caff_header.ParseCaffHeader(std::move(data));
            break;
        case 2:
            caff_credits.ParseCaffCredits(std::move(data));
            break;
        case 3:
            caff_animations.push_back(CaffAnimation());
            caff_animations.back().ParseCaffAnimation(std::move(data));
            break;
        default:
            throw std::runtime_error("Invalid ID in Caff block: " + std::to_string(id));
            break;
    }
}

void Caff::CheckCaffBlocks(){
    if(!caff_header.IsParsed())
        throw std::runtime_error("The CAFF file does not contain the CAFF HEADER block");
    if(!caff_credits.IsParsed())
        throw std::runtime_error("The CAFF file does not contain the CAFF CREDITS block");
    if(caff_header.GetNumAnim() != caff_animations.size())
        throw std::runtime_error("The num_anim value in the CAFF HEADER does not match the number of CAFF ANIMATION blocks");
    //TODO check ciff sizes (must be equal?)
}

void Caff::LogCaff() {
    std::cout << std::endl << "********" << std::endl << "CAFF LOG" << std::endl << "********" << std::endl << std::endl;
    caff_header.LogCaffHeader();
    caff_credits.LogCaffCredits();
    for(int i = 0; i < caff_animations.size(); i++)
        caff_animations[i].LogCaffAnimation();
}