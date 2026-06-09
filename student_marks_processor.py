

students = int(input("Enter number of students: "))

for i in range(students):

    print("\n---Enter details of Student", i + 1, "---")

    name = input("Enter student name: ")

    mark1 = float(input("Enter mark for Subject 1: "))
    mark2 = float(input("Enter mark for Subject 2: "))
    mark3 = float(input("Enter mark for Subject 3: "))

    total = mark1 + mark2 + mark3
    average = total / 3

    print("\n--- Result ---")
    print("Student Name:", name)
    print("Total Marks:", total)
    print("Average Marks:", average)

    if average >= 90:
        print("Grade: A+")
        print("!!CONGRATULATIONS",name.upper(),"!!")

    elif average >= 75:
        print("Grade: A")

    elif average >= 60:
        print("Grade: B")

    elif average >= 50:
        print("Grade: C")

    else:
        print("Grade: Fail")

    if average >= 50:
        print("Status: Pass")

    else:
        print("Status: Fail")