import { nanoid } from "nanoid";
import { useState } from "react";
import TaskCard from "./TaskCard";
import { useContext } from "react";
import { DataContext } from "../DataContext";

export default function Section({ name, items, drop, isOver, section }) {
  const [newTask, setNewTask] = useState({
    content: "",
  });

  const [deleteTask, tasks, setTasks] = useContext(DataContext);

  const onEditField = (value) => {
    setNewTask({
      content: value,
    });
  };

  const addNewTask = (e) => {
    if (e.key === "Enter") {
      if (newTask.content !== "") {
        setTasks([
          ...tasks,
          {
            id: nanoid(),
            content: newTask.content,
            date: Date.now(),
            section: section,
            color: "",
          },
        ]);
      }
    }
  };

  return (
    <div className="container" ref={drop}>
      <div className="heading">
        <h2>{name}</h2>
        <small>
          {items.length} {name}
        </small>
      </div>

      {items.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          setTasks={setTasks}
          tasks={tasks}
        />
      ))}

      <div id={isOver ? "empty" : "hidden"}>Release to drop</div>
      <div className="add_new_div">
        <input
          type="text"
          name=""
          id={"add_new"}
          placeholder="Type to add task, click enter to save..."
          value={newTask.content}
          onChange={(e) => onEditField(e.target.value)}
          onKeyDown={(e) => {
            addNewTask(e, section);
            newTask.content = "";
          }}
        />
      </div>
    </div>
  );
}
