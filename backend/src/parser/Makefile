BINARY_NAME := parser

SRCS := $(shell find ./ -name '*.cpp')
OBJS := $(SRCS:.cpp=.o)

COMPILER_FLAGS := -O0 -g3 -std=c++11 -c $(SRCS)
LINKER_FLAGS:= -o build/$(BINARY_NAME) $(OBJS)
SECURITY_FLAGS.= -pie -z noexecstack

all:
	mkdir -p build
	g++ $(COMPILER_FLAGS)
	g++ $(LINKER_FLAGS) $(SECURITY_FLAGS)
	rm -f $(OBJS)