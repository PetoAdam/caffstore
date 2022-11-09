#include "acutest.h"
#include <iostream>

#include "VectorHandler.h"

void test_vectorToInt8(){
    std::vector<char> charArray{'4'};
    std::cout << "Expected result is: " << 52 << std::endl;
    TEST_CHECK_(vectorToInt8(charArray) == 52, "vectorToInt8({'4'}) == 52");

    charArray = {'4', '5'};
    std::cout << "Exception should be thrown" << std::endl;
    TEST_EXCEPTION(vectorToInt8(charArray), std::exception);

    charArray = {};
    std::cout << "Exception should be thrown" << std::endl;
    TEST_EXCEPTION(vectorToInt8(charArray), std::exception);

    charArray = {'a'};
    std::cout << "Expected result is: " << vectorToInt8(charArray) << std::endl;
    TEST_CHECK_(vectorToInt8(charArray) == 97, "vectorToInt8({'a'}) == 97");
}

void test_vectorToInt64(){
    std::vector<char> charArray{'4', '2', '2', '6', '4', '2', '2', '6'};
    std::cout << "Expected result is: " << 3905239026712588852 << std::endl;
    TEST_CHECK_(vectorToInt64(charArray) == 3905239026712588852, "vectorToInt64({'4', '2', '2', '6', '4', '2', '2', '6'}) == 3905239026712588852");
}

void test_vectorToString(){
    TEST_CHECK_(vectorToString({'4', 'x', 'c'}) == "4xc", "vectorToString({'4', 'x', 'c'}) == \"4xc\"");
}


TEST_LIST = {
    {"uint8_t vectorToInt8(std::vector<char>);", test_vectorToInt8} ,
    {"std::vector vectorToString(std::vector<char>);", test_vectorToString} ,
    {"std::vector vectorToToInt64(std::vector<char>);", test_vectorToInt64} ,
    {0}
};