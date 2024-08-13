import { useState } from "react"

const TodoList = ({}) => {
    const [tasks, setTasks] = useState(["Wake Up Early", "Go for the Walk", "Take a Shower"]);
    const [newTask, setNewTasks] = useState("");
    function handleInputChange(event) {
        setNewTasks(event.target.value)
    }
    function addTask() {
        if(newTask.trim() !== "") {
            // here t is previous state of tasks
            setTasks(t => [ ...t, newTask ]);
            setNewTasks("")
        }
    }
    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);   //first parameter is 'elements', which can be ignored, so replace it with _
        setTasks(updatedTasks);
    }

    return (
        <div className="to-do-list">
            <h1>To Do List</h1>
            <div>
                <input type="text"
                    placeholder="Enter a task ..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button
                    className="add-button"
                    onClick={addTask}
                >
                    Add
                </button>
            </div>
            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}
                        >
                            Delete
                        </button>
                    </li>
                )}
            </ol>
        </div>
    )
}

export default TodoList