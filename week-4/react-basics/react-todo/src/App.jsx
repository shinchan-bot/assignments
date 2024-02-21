import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodo] = useState([
    {
    title:"go to gym",
    description:"go to gym at 6pm",
    }
  ])

  let addTodo = () => {
    setTodo([...todos, 
      {
        title:"go to gym",
        description:"go to gym at 6pm",
      }
    ])
  }

  return (
    <div>
      {todos.map(todo => {
        return (<Todo title = {todo.title} description = {todo.description} />)
      })}
      <button onClick={addTodo} >Add todo</button>
    </div>
  )
}

let Todo = (props) => {
  return(
    <div>
      <div>{props.title} </div>
      <div>{props.description} </div>
    </div>
  )
}


export default App
