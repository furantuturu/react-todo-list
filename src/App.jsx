import { useState } from 'react'
import Add from './Add'
import Search from'./Search'
import ListItem from './ListItem'

export default function App() {
  const [todos, setTodos] = useState([])
  const [todoName, setTodoName] = useState("")
  const [searchTodoName, setSearchTodoName] = useState("")
  const [filteredTodo, setFilteredTodo] = useState([])

  function handleForm(evt){
    evt.preventDefault()
    evt.stopPropagation()    
  }

  function handleAddTodo(todoName) {
    if (todoName == "") return

    setTodos(currentTodo => {
      return [
        ...currentTodo,
        { id:  Math.trunc(Math.random() * 100), todoName, checked: false }
      ]
    })

    setTodoName("")
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

  function handleEditTodo() {

  }

  function handleSearchTodo(searchTodoName) {
    if (todos.length <= 0) return

    const copyTodos = todos.slice(0)
    const searchedTodo = copyTodos.filter(copyTodo => copyTodo.todoName == searchTodoName)

    console.log(searchedTodo)

    setFilteredTodo(currentFilteredTodos => {
      return [
        ...searchedTodo
      ]
    })
  }

  return (
    <>
      <div className="container">
        <h1>ToDo App</h1>
        <form onSubmit={ (evt) => handleForm(evt) }>
          <div className="form-group">
            <Search 
              searchTodoName={ searchTodoName } 
              setSearchTodoName={ setSearchTodoName }
              onSearchTodo={ handleSearchTodo } />
          </div>
          <div className="form-group">
            <Add 
              todoName={ todoName } 
              setTodoName={ setTodoName } 
              onAddTodo={ handleAddTodo }  />
          </div>
          <div className="todo-list-container">
            <h3>List of ToDo Activities</h3>
            <ul className="todo-list">
              { todos.length == 0 && "No ToDos" }
              { todos.map(todo => {
                return <ListItem 
                          key={ todo.id } 
                          todo={ todo } 
                          onToggleTodo={ handleToggleTodo } 
                          onDeleteTodo={ handleDeleteTodo } />
              }) }
            </ul>
          </div>
        </form>
      </div>
    </>
  )

}