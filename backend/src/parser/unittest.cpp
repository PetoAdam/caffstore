#include "acutest.h"
#include <iostream>

#include "VectorHandler.h"

void test_vectorToInt8(){
    std::vector<char> charArray{'4'};
    std::cout << "Expected result is: " << 52 << std::endl;
    TEST_CHECK_(vectorToInt8(charArray) == 52, "vectorToInt8(charArray) == uint8_t((unsigned char)('4'))");

    charArray = {'4', '5'};
    std::cout << "Exception should be thrown" << std::endl;
    TEST_EXCEPTION(vectorToInt8(charArray), std::exception);

    charArray = {'a'};
    std::cout << "Expected result is: " << vectorToInt8(charArray) << std::endl;
    TEST_CHECK_(vectorToInt8(charArray) == uint8_t((unsigned char)('a')), "vectorToInt8(charArray) == uint8_t((unsigned char)('a'))");
}

void test_vectorToString(){
    TEST_CHECK_(vectorToString({'4', 'x', 'c'}) == "4xc", "vectorToString({'4', 'x', 'c'}) == \"4xc\"");
}


void test_vectorToInt64(){
    std::vector<char> charArray{'4', '2', '2', '6', '4', '2', '2', '6'};
    std::cout << "Expected result is: " << vectorToInt64(charArray) << std::endl;
    TEST_CHECK_(vectorToInt64(charArray) == uint64_t(42264226), "vectorToInt64(charArray)");
}

TEST_LIST = {
    {"uint8_t vectorToInt8(std::vector<char>);", test_vectorToInt8} ,
    {"std::vector vectorToString(std::vector<char>);", test_vectorToString} ,
    {"std::vector vectorToToInt64(std::vector<char>);", test_vectorToInt64} ,
    {0}
};