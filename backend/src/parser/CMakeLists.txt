cmake_minimum_required(VERSION 3.10)

project(parser)

set(CMAKE_CXX_STANDARD 14)

add_executable(parser
    main.cpp
    Converter.h
    Converter.cpp
    FileReader.h
    FileReader.cpp 
    GifCreator.h
    GifCreator.cpp 
    VectorHandler.h
    VectorHandler.cpp
    Caff.h
    Caff.cpp
    CaffHeader.h
    CaffHeader.cpp
    CaffCredits.h 
    CaffCredits.cpp
    CaffAnimation.h 
    CaffAnimation.cpp
    Ciff.h 
    Ciff.cpp
    CiffHeader.h 
    CiffHeader.cpp
    CiffContent.h 
    CiffContent.cpp
    RGB.h)