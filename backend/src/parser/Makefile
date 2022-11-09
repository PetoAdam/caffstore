# Normal build
BINARY_NAME := parser
SRCS := $(shell find ./ -name '*.cpp' ! -name unittest.cpp)
OBJS := $(SRCS:.cpp=.o)
COMPILER_FLAGS := -O0 -g3 -std=c++11 -c $(SRCS)
LINKER_FLAGS:= -o build/$(BINARY_NAME) $(OBJS)

# Run tests
TEST_SRCS := $(shell find ./ -name '*.cpp' ! -name main.cpp)
TEST_OBJS := $(TEST_SRCS:.cpp=.o)
TEST_COMPILER_FLAGS := -O0 -g3 -std=c++11 -c $(TEST_SRCS)
TEST_LINKER_FLAGS:= -o build_test/$(BINARY_NAME) $(TEST_OBJS)

SECURITY_FLAGS.= -pie -z noexecstack

all:
	mkdir -p build
	g++ $(COMPILER_FLAGS)
	g++ $(LINKER_FLAGS) $(SECURITY_FLAGS)
	rm -f $(OBJS)

	mkdir -p build_test
	g++ $(TEST_COMPILER_FLAGS)
	g++ $(TEST_LINKER_FLAGS) $(SECURITY_FLAGS)
	rm -f $(TEST_OBJS)