def add(a, b):
    return a + b

def is_even(n):
    return n % 2 == 0

def find_max(lst):
    if not lst:
        return None
    max_value = lst[0]
    for num in lst:
        if num > max_value:
            max_value = num
    return max_value

def reverse_string(s):
    return s[::-1]

def main():
    while True:
        print("\nВыберите действие:")
        print("1. Сложить два числа")
        print("2. Проверить, является ли число четным")
        print("3. Найти максимальное значение в списке")
        print("4. Реверсировать строку")
        print("5. Выход")

        choice = input("Введите номер действия (1-5): ")

        if choice == '1':
            a = float(input("Введите первое число: "))
            b = float(input("Введите второе число: "))
            print("Сумма:", add(a, b))

        elif choice == '2':
            n = int(input("Введите число: "))
            if is_even(n):
                print(f"{n} является четным.")
            else:
                print(f"{n} является нечетным.")

        elif choice == '3':
            lst = list(map(float, input("Введите числа через пробел: ").split()))
            max_value = find_max(lst)
            if max_value is not None:
                print("Максимальное значение:", max_value)
            else:
                print("Список пуст.")

        elif choice == '4':
            s = input("Введите строку: ")
            print("Реверсированная строка:", reverse_string(s))

        elif choice == '5':
            print("Выход из программы.")
            break

        else:
            print("Неверный выбор. Пожалуйста, попробуйте снова.")

if __name__ == "__main__":
    main()