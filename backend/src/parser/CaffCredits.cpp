#include "CaffCredits.h"

void CaffCredits::ParseCaffCredits(std::vector<char> data){
    if(parsed)
        throw std::runtime_error("The CAFF file contains more than one CAFF HEADER");

    year = vectorToInt16(cutFromVector(data, 0, 2, "CAFF CREDITS -> year"));
    if(year < 1970)
        throw std::runtime_error("The creation year in CAFF CREDITS is not valid");

    month = vectorToInt8(cutFromVector(data, 0, 1, "CAFF CREDITS -> month"));
    if(month == 0 || month > 12)
        throw std::runtime_error("The creation month in CAFF CREDITS is not valid");

    day = vectorToInt8(cutFromVector(data, 0, 1, "CAFF CREDITS -> day"));
    if(!IsDayValid())
        throw std::runtime_error("The creation day in CAFF CREDITS is not valid");

    hour = vectorToInt8(cutFromVector(data, 0, 1, "CAFF CREDITS -> hour"));
    if(hour > 24)
        throw std::runtime_error("The creation hour in CAFF CREDITS is not valid");

    minute = vectorToInt8(cutFromVector(data, 0, 1, "CAFF CREDITS -> minute"));
    if(minute > 60)
        throw std::runtime_error("The creation minute in CAFF CREDITS is not valid");

    if(!IsDateValid())
        throw std::runtime_error("The creation date in CAFF CREDITS is not valid");    

    creator_len = vectorToInt64(cutFromVector(data, 0, 8, "CAFF CREDITS -> creator_len"));

    creator = vectorToString(cutFromVector(data, 0, creator_len, "CAFF CREDITS -> creator"));
    
    if(data.size() > 0)
        throw std::runtime_error("Too much data int the CAFF HEADER");

    parsed = true;
}

bool CaffCredits::IsDayValid(){
    std::vector<int> months_with_30_days{1, 2}; 
    std::vector<int> months_with_31_days{1,2}; 

    if(std::find(months_with_30_days.begin(), months_with_30_days.end(), month) != months_with_30_days.end() && day != 30)
        return false;
    if(std::find(months_with_31_days.begin(), months_with_31_days.end(), month) != months_with_31_days.end() && day != 31)
        return false;
    if(month == 2 && year%4 == 0 && year%2000 != 0 && day != 29)
        return false;
    if(month == 2 && day != 28)
        return false;

    return true;
}

bool CaffCredits::IsDateValid(){
    std::time_t t = std::time(nullptr);
    std::tm *const now = std::gmtime(&t); //actual time in UTC

    if(year > now->tm_year + 1900) return false;
    if(year == now->tm_year + 1900 && month > now->tm_mon+1) return false;
    if(year == now->tm_year + 1900 && month == now->tm_mon+1 && day > now->tm_mday) return false;
    if(year == now->tm_year + 1900 && month == now->tm_mon+1 && day == now->tm_mday && hour > now->tm_hour) return false;
    if(year == now->tm_year + 1900 && month == now->tm_mon+1 && day == now->tm_mday && hour == now->tm_hour && minute > now->tm_min) return false;

    return true;
}

void CaffCredits::LogCaffCredits() {
    std::cout << "CAFF CREDITS" << std::endl;
    std::cout << "- creation date: " << year << "-" << (int)month << "-" << (int)day << std::endl;
    std::cout << "- creation time: " << (int)hour << ":" << (int)minute << std::endl;
    std::cout << "- creator: " << creator << std::endl;
    std::cout << std::endl;
}