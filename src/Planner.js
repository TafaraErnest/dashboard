import { useEffect, useState } from "react";
import "./styles/planner.css";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./utils/items";
import Section from "./components/Section";
import { DataContext } from "./DataContext";

export default function Planner() {
  // Get tasks from local storage
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [todos, setTodos] = useState([]);
  const [wip, setWip] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    setTodos(tasks.filter((task) => task.section === "todo"));
    setWip(tasks.filter((task) => task.section === "wip"));
    setDone(tasks.filter((task) => task.section === "done"));
  }, [tasks]);

  //   Move item to new section
  const moveToNewSec = (section, id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, section: section };
        } else return task;
      })
    );
  };

  //   Drop item
  const [{ isOverTodo }, droptodo] = useDrop({
    accept: ItemTypes.CARD,
    drop: (task) => moveToNewSec("todo", task.id),
    collect: (monitor) => ({
      isOverTodo: !!monitor.isOver(),
    }),
  });

  //   Drop item on wip
  const [{ isOverWip }, dropwip] = useDrop({
    accept: ItemTypes.CARD,
    drop: (task) => moveToNewSec("wip", task.id),
    collect: (monitor) => ({
      isOverWip: !!monitor.isOver(),
    }),
  });

  //   Drop item on done
  const [{ isOverDone }, dropdone] = useDrop({
    accept: ItemTypes.CARD,
    drop: (task) => moveToNewSec("done", task.id),
    collect: (monitor) => ({
      isOverDone: !!monitor.isOver(),
    }),
  });

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <DataContext.Provider value={[deleteTask, tasks, setTasks]}>
      <header>Have fun using the planner!</header>
      <div className="apps">
        <section className="planner_page">
          <Section
            name="ToDo's"
            items={todos}
            moveToNewSec={moveToNewSec}
            drop={droptodo}
            isOver={isOverTodo}
            section="todo"
          />
          <Section
            name="In Progress"
            items={wip}
            moveToNewSec={moveToNewSec}
            drop={dropwip}
            isOver={isOverWip}
            deleteTask={deleteTask}
            section="wip"
          />
          <Section
            name="Completed"
            items={done}
            moveToNewSec={moveToNewSec}
            drop={dropdone}
            isOver={isOverDone}
            deleteTask={deleteTask}
            section="done"
          />
        </section>
      </div>
    </DataContext.Provider>
  );
}
