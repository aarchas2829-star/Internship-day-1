# Variables Example Program

# Storing different types of data in variables

name = "Aarcha"
age = 17
height = 152.5
is_student = True

# Printing the values

print("Student Name:", name)
print("Age:", age)
print("Height:", height)
print("Student Status:", is_student)
# Function to display student details

def student_details():
    
    name = input("Enter your name: ")
    age = input("Enter your age: ")
    course = input("Enter your course: ")

    print("\n--- Student Details ---")
    print("Name:", name)
    print("Age:", age)
    print("Course:", course)

# Calling the function

student_details()