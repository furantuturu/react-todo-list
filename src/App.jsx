import { useState } from 'react'

function Search(){
  return(
    <>
      <input className="search-input" type="text" id="search-todo" placeholder="Search a ToDo activity" />
      <button className="search-btn">Search</button>
    </>
  )

}

function Add({ todoName, setTodoName, onAddTodo }) {
  return(
    <>
      <input onChange={ (evt) => setTodoName(evt.target.value) } value={ todoName } className="add-input" type="text" id="add-todo" placeholder="Add a ToDo activity" />
      <button onClick={ () => onAddTodo(todoName) } className="add-btn">Add</button>
    </>
  )
}

function ListItem({ todo, onToggleTodo, onDeleteTodo }) {
  return (
    <li>
        <label>
          <input type="checkbox" checked={ todo.checked } onChange={ (evt) => onToggleTodo(todo.id, evt.target.checked) } />
          { todo.todoName }
        </label>
        <button className="edit-btn">Edit</button>
        <button onClick={ () => onDeleteTodo(todo.id) } className="delete-btn">Delete</button>
    </li>
  )
}

export default function App() {
  const [todos, setTodos] = useState([])
  const [todoName, setTodoName] = useState("")

  function handleForm(evt){
    evt.preventDefault()
    evt.stopPropagation()
  }

  function handleAddTodo(todoName) {
    if (todoName == '') return

    setTodos(currentTodo => {
      return [
        ...currentTodo,
        { id:  Math.trunc(Math.random() * 100), todoName, checked: false }
      ]
    })
  }

  function handleToggleTodo(id, checked) {
    setTodos(currentTodo => {
      return currentTodo.map(todo => {
        if (todo.id == id) {
          return {
            ...todo, checked
          }
        }

        return todo
      })
    })
  }

  function handleDeleteTodo(id) {
    setTodos(currentTodo => {
      return currentTodo.filter(todo => todo.id != id)
    })
  }

  return (
    <>
      <div className="container">
        <h1>ToDo App</h1>
        <form onSubmit={ (evt) => handleForm(evt) }>
          <div className="form-group">
            <Search />
          </div>
          <div className="form-group">
            <Add todoName={ todoName } setTodoName={ setTodoName } onAddTodo={ handleAddTodo }  />
          </div>
          <div className="todo-list-container">
            <h3>List of ToDo Activities</h3>
            <ul className="todo-list">
              { todos.length == 0 && "No ToDos" }
              { todos.map(todo => {
                return <ListItem key={ todo.id } todo={ todo } onToggleTodo={ handleToggleTodo } onDeleteTodo={ handleDeleteTodo } />
              }) }
            </ul>
          </div>
        </form>
      </div>
    </>
  )

}