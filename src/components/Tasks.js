import Task from './Task'

const Tasks = ({ tasks, onToggle }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={index} task={task} onToggle={onToggle} />
      ))}
    </>
  )
}

export default Tasks