# name = 'Tome'
# age = 3
# print(f"sss {name}, {age}岁")

# def add(x, *y):
#     print('x is {} and y is {}'.format(x, y))
#     (d, *z) = y
#     return x + d

# add(5, 6, 7)
y = 10


def create_addr(x):

    def addr(y):
        return x + y

    return addr


add_10 = create_addr(10)
# print(add_10(3))
# print(list(map(add_10, [1, 2, 3])))

# print((lambda x: x > 2)(3))
# print(list(map(max, [1, 23, 4], [2, 4, 56, 7])))
# print(list(filter(lambda x: x > 5, [1, 2, 3, 4, 5, 44])))
# print([add_10(i) for i in [1,2,3]])
# print([x for x in [1,2,3,4,5] if x > 3])
# print({ x for x in 'abcdefg' if x not in 'abc'})
# print({x: x**2 for x in range(5)})

# import math
# print(math.sqrt(16))
# from math import ceil, floor
# print(ceil(3.7))
# print(floor(3.7))
# import math as m
# print(m.sqrt(16))
import math
print(dir(math))