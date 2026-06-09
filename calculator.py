print("\n--- Calculator ---")
print("1. Addition")
print("2. Subtraction")
print("3. Multiplication")
print("4. Division")

choice = input("Enter your choice (1-4): ")
num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))
if choice == "1":
    sum = num1 + num2
    print("Result =", sum)

elif choice == "2":
    difference = num1 - num2
    print("Result =", difference)

elif choice == "3":
    product = num1 * num2
    print("Result =", product)

elif choice == "4":

    if num2 != 0:
        quotient = num1 / num2
        print("Result =", quotient)

    else:
        print("Error! Division by zero is not allowed.")

else:
        print("Invalid Choice")