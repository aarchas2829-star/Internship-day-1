from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from enum import Enum
import models
from models import Task
from database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
#from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware

class StatusEnum(str, Enum):
    todo = "todo"
    in_progress = "in_progress"
    completed = "completed"
class PriorityEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class TaskCreate(BaseModel):
    title: str
    status: StatusEnum
    priority: PriorityEnum
    due_date: str
load_dotenv()

#print("API KEY FOUND:", os.getenv("OPENAI_API_KEY"))

#client = OpenAI(
 #   api_key=os.getenv("OPENAI_API_KEY")
#)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:4173",
        ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskUpdate(BaseModel):
    title: str
    status: StatusEnum
    priority: PriorityEnum
    due_date: str
tasks = [
    {
        "id": 1,
        "title": "Complete Internship Report",
        "status": "pending",
        "priority": "high",
        "due_date": ""
    },
    {
        "id": 2,
        "title": "Learn FastAPI",
        "status": "completed",
        "priority": "medium",
        "due_date": ""
    },
    {
    "id": 3,
    "title": "Learn Django",
    "status": "todo",
    "priority": "low",
    "due_date": ""
    
  }
]

class TaskUpdate(BaseModel):
    title: str
    status: StatusEnum
    priority: PriorityEnum
    due_date: str

class PriorityRequest(BaseModel):
    title: str

@app.get("/tasks")
def get_tasks():

    db = SessionLocal()

    all_tasks = db.query(Task).all()

    return all_tasks
@app.post("/tasks")
def add_task(task_data: TaskCreate):

    db = SessionLocal()

    new_task = Task(
       title=task_data.title,
       description="",
       priority=task_data.priority,
       status=task_data.status,
       due_date=task_data.due_date
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    db.close()

    return {
    "message": "Task Added Successfully",
    "id": new_task.id,
    "title": new_task.title,
    "status": new_task.status,
    "priority": new_task.priority
  }
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):

    db = SessionLocal()

    task = db.query(Task).filter(Task.id == task_id).first()

    if task is None:
      raise HTTPException(status_code=404, detail="Task Not Found")

    db.delete(task)
    db.commit()
    db.close()

    return {
        "message": "Task Deleted Successfully"
    }
@app.put("/tasks/{task_id}")
def update_task(task_id: int, task_data: TaskUpdate):

    db = SessionLocal()

    task = db.query(Task).filter(Task.id == task_id).first()

    if task is None:
      raise HTTPException(status_code=404, detail="Task Not Found")

    task.title = task_data.title
    task.status = task_data.status
    task.priority = task_data.priority
    task.due_date = task_data.due_date

    db.commit()
    db.refresh(task)
    db.close()
    return {
        "message": "Task Updated Successfully",
        "id": task.id,
        "title": task.title,
        "status": task.status,
        "priority": task.priority,
        "due_date": task.due_date
    }
@app.post("/suggest-priority")
def suggest_priority(data: PriorityRequest):

    title = data.title.lower()

    if (
        "report" in title or
        "exam" in title or
        "interview" in title or
        "tomorrow" in title or
        "urgent" in title
    ):
        priority = "high"

    elif (
        "learn" in title or
        "practice" in title or
        "study" in title
    ):
        priority = "medium"

    else:
        priority = "low"

    return {
        "priority": priority
    }
