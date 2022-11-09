// This file is contains the unit tests for the parser.                             //
//                                                                                  //
// Enter one of the following commands to run the tests:                            //
//                                                                                  //
// $ ./build_test/parser                # Runs all tests in the suite               //
// $ ./build_test/parser test1 test2    # Runs only tests specified                 //
// $ ./build_test/parser --skip test3   # Runs all tests but those specified        //
// $ ./build_test/parser -v             # Provides more information about the tests //
//                                                                                  //            
//////////////////////////////////////////////////////////////////////////////////////

#include "acutest.h"
#include <iostream>

#include "VectorHandler.h"

void test_vectorToInt8(){
    std::cout << std::endl;

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
    std::cout << "Expected result is: " << 97 << std::endl;
    TEST_CHECK_(vectorToInt8(charArray) == 97, "vectorToInt8({'a'}) == 97");
}

void test_vectorToInt16(){
    std::cout << std::endl;

    std::vector<char> charArray{'4'};
    std::cout << "Exception should be thrown" << std::endl;
    TEST_EXCEPTION(vectorToInt16(charArray), std::exception);

    charArray = {'4', '5'};
    std::cout << "Expected result is: " << 13620 << std::endl;
    TEST_CHECK_(vectorToInt16(charArray) == 13620, "vectorToInt16({'4', 5}) == 13620");

    charArray = {'a', '3'};
    std::cout << "Expected result is: " << 13153 << std::endl;
    TEST_CHECK_(vectorToInt16(charArray) == 13153, "vectorToInt16({'a', 3}) == 13153");

    charArray = {'a', 'b', '7'};
    std::cout << "Exception should be thrown" << std::endl;
    TEST_EXCEPTION(vectorToInt16(charArray), std::exception);
    
}

void test_vectorToInt64(){
    std::cout << std::endl;

    std::vector<char> charArray{'4'};
    std::cout << "Exception should be thrown" << std::endl;
    TEST_EXCEPTION(vectorToInt16(charArray), std::exception);

    charArray = {'4', '2', '2', '6', '4', '2', '2', '6'};
    std::cout << "Expected result is: " << 3905239026712588852 << std::endl;
    TEST_CHECK_(vectorToInt64(charArray) == 3905239026712588852, "vectorToInt64({'4', '2', '2', '6', '4', '2', '2', '6'}) == 3905239026712588852");

    charArray = {'4', '2', '2', '6', '4', '2', '2', '6', '2'};
    std::cout << "Exception should be thrown" << std::endl;
    TEST_EXCEPTION(vectorToInt16(charArray), std::exception);
}

void test_vectorToString(){
    std::cout << std::endl;

    std::cout << "Expected result is: " << "\"4xc\"" << std::endl;
    TEST_CHECK_(vectorToString({'4', 'x', 'c'}) == "4xc", "vectorToString({'4', 'x', 'c'}) == \"4xc\"");

    std::cout << "Expected result is: " << "\"xc\"" << std::endl;
    TEST_CHECK_(vectorToString({4, 'x', 'c'}) != "4xc", "vectorToString({'4', 'x', 'c'}) != \"4xc\"");
    TEST_CHECK_(vectorToString({4, 'x', 'c'}) != "4xc", "vectorToString({'4', 'x', 'c'}) == \"xc\"");

    std::cout << "Expected result is: " << vectorToString({'4', '\n', 'c'}) << std::endl;
    TEST_CHECK_(vectorToString({'4', '\n', 'c'}) == "4\nc", "vectorToString({'4', '\n', 'c'}) == \"4\nc\"");
}


TEST_LIST = {
    {"vectorToInt8", test_vectorToInt8} ,
    {"vectorToInt16", test_vectorToInt16} ,
    {"vectorToInt64", test_vectorToInt64} ,
    {"vectorToString", test_vectorToString} ,
    {0}
};