# Monthly Task Planner

tasks = []

month = int(input("Enter month (1-12): "))

number = int(input("Enter number of tasks: "))

# Taking task details

for i in range(number):

    print(f"\nTask {i + 1}")

    task_name = input("Enter task name: ")
    due_day = int(input("Enter due date (day): "))
    status = input("Enter status (completed/pending/todo): ").lower()

    # PRIORITY LOGIC ADDED
    if due_day <= 10:
        priority = "High"
    elif due_day <= 20:
        priority = "Medium"
    else:
        priority = "Low"

    task = {
        "name": task_name,
        "day": due_day,
        "status": status,
        "priority": priority
    }

    tasks.append(task)

# Sorting tasks according to due date (WITHOUT lambda)

for i in range(len(tasks)):
    for j in range(0, len(tasks) - i - 1):
        if tasks[j]["day"] > tasks[j + 1]["day"]:
            tasks[j], tasks[j + 1] = tasks[j + 1], tasks[j]

# Displaying tasks

print("\n========== TASKS FOR MONTH", month, "==========")

# GROUPING TASKS
completed = []
pending = []
todo = []

for task in tasks:
    if task["status"] == "completed":
        completed.append(task)
    elif task["status"] == "pending":
        pending.append(task)
    else:
        todo.append(task)

print("\n--- COMPLETED TASKS ---")
for task in completed:
    print("Day:", task["day"], "| Task:", task["name"], "| Priority:", task["priority"])

print("\n--- PENDING TASKS ---")
for task in pending:
    print("Day:", task["day"], "| Task:", task["name"], "| Priority:", task["priority"])

print("\n--- TODO TASKS ---")
for task in todo:
    print("Day:", task["day"], "| Task:", task["name"], "| Priority:", task["priority"])