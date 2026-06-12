import axios from "axios";
import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import {
  getTasks,
  addTask as addTaskApi,
  deleteTask,
  updateTask
} from './api/taskAPI';

const BASE_URL = "https://internship-day-1-production.up.railway.app";

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAI, setShowAI] = useState(false);
  const [aiPriority, setAiPriority] = useState("");
  const [aiReason, setAiReason] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [showChart, setShowChart] = useState(false);
  
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const response = await getTasks();
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  }

  async function addTask() {
    if (
      task.trim() === "" ||
      status === ''||
      priority === ''
    )return;

    try {
      console.log("Sending:", {
       title: task,
       status: "todo",
       priority: "low",
       due_date: dueDate
      });
      console.log(Notification.permission);
      await addTaskApi(task, status, priority,dueDate);
      if (Notification.permission === "granted") {
        new Notification("✅ Task Added", {
        body: `${task} has been added successfully`
        });
      }

      await loadTasks();

      setTask('');
      setStatus('todo');
      setPriority('low');
    } catch (error) {
      console.log("Error adding task:", error);
    }
  }
  
  const completedCount = tasks.filter(
    (t) => t.status === "completed"
  ).length;

  const inProgressCount = tasks.filter(
    (t) => t.status === "in_progress"
  ).length;

  const todoCount = tasks.filter(
    (t) => t.status === "todo"
  ).length;

  const percentage =
  tasks.length > 0
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;
  const getTimeRemaining = (dueDate) => {
    if (!dueDate) return "";

    const now = new Date();
    const due = new Date(dueDate);

    const diff = due - now;

    if (diff < 0) {
      return "❗ OVERDUE ❗";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days >= 1) {
      return `⏰ ${days} day${days > 1 ? "s" : ""} left`;
    }

    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (diff % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    const seconds = Math.floor(
      (diff % (1000 * 60)) / 1000
    );

    return `⏰ ${hours}h ${minutes}m ${seconds}s left`;
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="header-row">

        <h1>Task Tracker</h1>
        <p className="today-date">
          📅 {new Date().toLocaleDateString()}
        </p>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

      </div>
      <p>Manage your daily tasks efficiently 🚀</p>
    
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
      <div className="task-row">
        <div className="task-input-container">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button
            type="button"
            className="ai-button"
            onClick={() => {
              const text = task.trim().toLowerCase();
              if(!text){
                setAiPriority("");
                setAiReason("Please enter a task first.");
                setShowAI(true);
                return;
              }
              if(
                text.includes("urgent") ||
                text.includes("important") ||
                text.includes("asap") ||
                text.includes("immediately")||
                text.includes("soon")||
                text.includes("tomorrow")||
                text.includes("high")||
                text.includes("exam")
              ){
                setAiPriority("HIGH");
                setAiReason(
                  "This task appears urgent because it contains deadline-related work or an important responsibility that should be completed as soon as possible."
                );
              }
              else if(
                text.includes("practice") ||
                text.includes("exercise") ||
                text.includes("review") ||
                text.includes("week")||
                text.includes("month")||
                text.includes("medium")||
                text.includes("project")
              ){
                setAiPriority("MEDIUM");
                setAiReason(
                  "This task is important but does not require immediate attention. It can be scheduled after urgent tasks are completed."
                );
              }
              else {
                setAiPriority("LOW");
                setAiReason(
                  "This task does not appear to be time-sensitive and can be completed later without affecting other important work."
                );
              }
              setShowAI(true);
            }}
          >
            ✦ Ask AI 
          </button>
        </div>
      </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Add Task</button>
      </form>
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "10px"
      }}
    >  
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "250px" }}
      />
       
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{ width: "140px" }}
      >
        <option value="">All Statuses</option>
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {showAI && (
          <div className="ai-panel">
            <div className="ai-header">
              <span>🤖 AI Suggestion</span>
 
              <button
                className="close-btn"
                onClick={() => setShowAI(false)}
              >
                ❌
              </button>
            </div>
 
            <hr />
 
            <h3>Suggested Priority</h3>
 
            <p className="priority-text">
              {aiPriority === "HIGH" && "🔴 HIGH"}
              {aiPriority === "MEDIUM" && "🟡 MEDIUM"}
              {aiPriority === "LOW" && "🟢 LOW"}
            </p>
 
            <h4>Reason:</h4>
 
            <p>{aiReason}</p>
          </div>
        )}
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>📋 Total</h3>
          <h2>{tasks.length}</h2>
        </div>

        <div className="dashboard-card">
          <h3>✅ Completed</h3>
          <h2>{completedCount}</h2>
        </div>

        <div className="dashboard-card">
          <h3>⏳ Progress</h3>
          <h2>{inProgressCount}</h2>
        </div>

        <div className="dashboard-card">
          <h3>📝 Todo</h3>
          <h2>{todoCount}</h2>
        </div>
      </div>
    </div>

   <div className="completion-wrapper">


      <div className="completion-card">


        <h3>🎯 Completion</h3>


        <h2>{percentage}%</h2>


        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${percentage}%`
            }}
          ></div>
        </div>
    


        <p>
          {completedCount} of {tasks.length} tasks completed
        </p>


      </div>
    </div>

      {tasks.length === 0 && (
        <div className="empty-state">
          🎉 No tasks available
          <br />
          Add your first task to get started.
        </div>
      )}
       
      <ul
      style={{
        listStyle: "none",
        padding: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
      >
        {tasks
          .filter((t) =>
            t.title.toLowerCase().includes(search.toLowerCase())
          )
          .filter((t) =>
            filterStatus === '' || t.status === filterStatus
          )

          .map((t, index) => (
          <div
            key={index}
            onClick={() =>
              setSelectedTask(
                selectedTask === t.id ? null : t.id
              )
            }
            style={{
              background: darkMode
                ? "#1e293b"
                : (
                    filterStatus === ""
                      ? "#ffffff"
                      : filterStatus === "completed"
                      ? "#d1fae5"
                      : filterStatus === "in_progress"
                      ? "#fff59d"
                      : "#fecaca"
                  ),
              padding: "12px",
              margin: "12px auto",
              width: "700px",
              borderRadius: "10px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div
              style={{
                width: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "15px"
              }}
            >

              {t.status === "todo" && (
                <button
                  onClick={async (e) => {
                    e.stopPropagation();

                    try {
                      await axios.put(
                        `${BASE_URL}/tasks/${t.id}`,
                        {
                          title: t.title,
                          status: "in_progress",
                          priority: t.priority,
                          due_date: t.due_date || ""
                        }
                      );

                    await loadTasks();
                  } catch (error) {
                    console.log(error);
                  }
                }}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "22px"
                }}
              >
                ⏳
              </button>
            )}

            {t.status === "in_progress" && (
              <button
                onClick={async (e) => {
                  e.stopPropagation();

                  try {
                    await axios.put(
                      `${BASE_URL}/tasks/${t.id}`,
                     {
                        title: t.title,
                        status: "completed",
                        priority: t.priority,
                        due_date: t.due_date || ""
                      }
                    );

                  await loadTasks();
                } catch (error) {
                  console.log(error);
                }
              }}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "22px"
              }}
            >
              ⬜
            </button>
          )}

          {t.status === "completed" && (
            <div
              style={{
                width: "30px",
                textAlign: "center",
                fontSize: "22px"
              }}
            >
              ☑
            </div>
          )}

        </div>
            <div
              style={{
                flex: 1,
                textAlign: "center"
              }}
            >
              <div
                style={{
                fontSize: "18px",
                fontWeight: "500"
              }}
            >
              {t.title}
            </div>
              {selectedTask === t.id && (
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "14px",
                    color: "#555"
                  }}
                >
                  <div>Status: {t.status}</div>

                  <div>Priority: {t.priority}</div>

                  {t.due_date && (
                    <>
                      <div>
                        📅 Due: {new Date(t.due_date).toLocaleString()}
                      </div>

                    <div
                      style={{
                        fontWeight: "bold",
                        color: getTimeRemaining(t.due_date).includes("OVERDUE")
                          ? "#dc2626"
                          : "#2563eb"
                      }}
                    >
                      {getTimeRemaining(t.due_date)}
                    </div>
                  </>
                )}
              </div>
            )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px"
              }}
            >
              {/* EDIT BUTTON */}
              <button
                onClick={async () => {

                  const newTitle = prompt(
                    "Edit title:",
                    t.title
                  );

                  if (!newTitle || newTitle.trim() === "") {
                    return;
                  }

                  const newStatus = prompt(
                    "Status (todo, in_progress, completed):",
                    t.status
                  );

                  if (!newStatus) return;

                  const newPriority = prompt(
                    "Priority (low, medium, high):",
                    t.priority
                  );

                  if (!newPriority) return;

                    const newDueDate = prompt(
                      "Due Date (YYYY-MM-DDTHH:MM):",
                      t.due_date || ""
                    );

                  try {

                    await updateTask(
                      t.id,
                      newTitle,
                      newStatus,
                      newPriority,
                      newDueDate
                    );

                    await loadTasks();

                  } catch (error) {
                    console.log("Error updating task:", error);
                  }

                }}
                style={{
                  background: "#1e3a8a",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 8px",
                  marginRight: "5px",
                  cursor: "pointer"
                }}
              >
                ✏️
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={async () => {
                  try {
                    await deleteTask(t.id);
                    await loadTasks();
                  } catch (error) {
                    console.log("Error deleting task:", error);
                  }
                  if (Notification.permission === "granted") {
                    new Notification("🗑️ Task Deleted", {
                      body: "Task deleted successfully"
                    });
                  }
                }}
                style={{
                  background: "#e11d48",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 8px",
                  cursor: "pointer"
                }}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </ul>
      <footer className="footer">
        Built with React + FastAPI 🚀
      </footer>
    </div>
  );  
}

export default App;
