import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import './app.css';


function TodoApp(){
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) :[];
  });

  const [filter, setFilter] = useState("uncompleted");
  const [newTask, setNewTask]= useState("");

  useEffect(()=> {
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }, [tasks]);



  const addTask = (e) => {
    e.preventDefault();
    const newTaskObj = {
      id: tasks.length ? tasks[tasks.length-1].id + 1 : 1,
      title: newTask,
      isCompleted:false,
    };
    setTasks(prevTasks => [newTaskObj, ...prevTasks]);
    setNewTask("");

  };
    const toggleTaskCompletion = (id) => {
      setTasks(prevTasks => prevTasks.map(task => task.id=== id ? {...task, isCompleted: !task.isCompleted}: task));
    };


    const deleteTask = (id)=> {
      if(window.confirm("Silmek istediğinize emin misiniz?")){
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      }
    };


    const updateTaskTitle = (id, newTitle) => {
      setTasks(prevTasks => prevTasks.map(task=> task.id === id ? {...task, title: newTitle}:task));
    };


    const filteredTasks = tasks.filter(task => filter === "completed" ? task.isCompleted: !task.isCompleted);


    return (
      <div>
        <h1>Todo List</h1>
        <div>
          <button onClick={()=> setFilter("uncompleted")} className={filter=== "uncompleted" ? "active" : ""}>Tamamlanmayanlar</button>
          <button onClick={()=> setFilter("completed")} className={filter === "completed" ? "active": ""}>Tamamlananlar</button>
        </div>

        <form onSubmit= {addTask}>
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Yeni görev ekle" />
          <button type="submit">Ekle</button>
        </form>

        <ul>
          {filteredTasks.length === 0 ? (
            <li>{filter === "completed" ? "Hiç tamamlanmış görev yok.": "Tamamlanmayan görev yok"}</li>
          ): (
            filteredTasks.map(task => (
              <li key={task.id} className="taskItem">
                <button
                  onClick={()=> toggleTaskCompletion(task.id)}
                  style={{backgroundColor: task.isCompleted ? "green": ""}}
                > <FontAwesomeIcon icon={faSquareCheck} className="mr-2" /></button>
                <span>{task.title}</span>
                <button onClick={() => deleteTask(task.id)}>🗑</button>
              </li>
              
            ))
          )}
        </ul>
      </div>
    );
  
}
 export default TodoApp;

