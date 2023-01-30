import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/items";

export default function TaskCard({ task, deleteTask, setTasks, tasks }) {
  //   Use drag function
  const [{ isDragging }, drag] = useDrag({
    item: {
      id: task.id,
    },
    type: ItemTypes.CARD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const changeColor = (color, id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, color: color };
        } else return task;
      })
    );
  };

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? ".2" : "1" }}
      className="task"
      id={task.color}
    >
      <div className="task_top">
        <p className="content">{task.content}</p>
        <div className="images">
          <img
            className="icon task_icon"
            src="../../images/yellow.png"
            alt="..."
            onClick={() => changeColor("yellow", task.id)}
          />
          <img
            className="icon task_icon"
            src="../../images/green.png"
            alt="..."
            onClick={() => changeColor("green", task.id)}
          />
          <img
            className="icon del_icon"
            src="../../images/delete.png"
            alt=""
            onClick={() => deleteTask(task.id)}
          />
        </div>
      </div>
      <small>
        Added on:{" "}
        {new Date(task.date).toLocaleDateString("en", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </small>
    </div>
  );
}
