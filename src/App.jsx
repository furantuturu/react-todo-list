import { useState, useEffect } from 'react'
import Add from './Add'
import Search from './Search'
import ListItem from './ListItem'

function TodoLists({ todos, filteredTodos, setTodos, setFilteredTodos, onDeleteTodo }) {
  if (filteredTodos.length > 0) {
    return filteredTodos.map(filteredTodo => {
      return (
        <ListItem 
          key={ filteredTodo.id } 
          todo={ filteredTodo } 
          setTodos={ setFilteredTodos }
          onDeleteTodo={ onDeleteTodo }
        />
      )
    })
  }

  return todos.map(todo => {
    return (
      <ListItem 
        key={ todo.id } 
        todo={ todo } 
        setTodos={ setTodos }
        onDeleteTodo={ onDeleteTodo }
        />
    )
  }) 
}

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localTodos = localStorage.getItem("TODOS")
    if (localTodos == null) return []
    return JSON.parse(localTodos)
  })
  const [filteredTodos, setFilteredTodos] = useState([])

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const uniqueTodos = todos.slice(0)
    let filteredTodoCount = 0

    todos.forEach((todo, i) => {
      if (filteredTodoCount < filteredTodos.length) {
        if (todo.id == filteredTodos[filteredTodoCount].id) {
          uniqueTodos[i].checked = filteredTodos[filteredTodoCount].checked
          uniqueTodos[i].id = filteredTodos[filteredTodoCount].id
          uniqueTodos[i].todoName = filteredTodos[filteredTodoCount].todoName
          filteredTodoCount++
        } 
      }
    })

    setTodos(currentTodo => {
      return [
        ...uniqueTodos
      ]
    })
  }, [ filteredTodos ])
  

  function handleForm(evt){
    evt.preventDefault()
    evt.stopPropagation()    
  }

  function handleAddTodo(todoName, setTodoName) {
    if (todoName.trim() == "") return

    setTodos(currentTodo => {
      return [
        ...currentTodo,
        { id:  Math.trunc(Math.random() * 100), todoName: todoName.trim(), checked: false }
      ]
    })

    setTodoName("")
    setFilteredTodos([])
  }

  function handleSearchTodo(searchTodoName) {
    if (todos.length <= 0) return

    if (searchTodoName.trim() == "") {
      setFilteredTodos([])
      return
    }

    const copyTodos = todos.slice(0)
    const searchedTodo = copyTodos.filter(copyTodo => {
      return copyTodo.todoName.toLowerCase().includes(searchTodoName.toLowerCase().trim())
    })

    setFilteredTodos(currentFilteredTodos => {
      return [
        ...searchedTodo
      ]
    })
  }

  function handleDeleteTodo(id) {
    if (filteredTodos.length > 0) {   
      setFilteredTodos(currentFilteredTodo => currentFilteredTodo.filter(todo => todo.id != id))
    }

    setTodos(currentTodo => currentTodo.filter(todo => todo.id != id))
}

  return (
    <>
      <div className="container">
        <h1>ToDo App</h1>
        <form onSubmit={ (evt) => handleForm(evt) }>
          <div className="form-group">
            <Search 
                onSearchTodo={ handleSearchTodo } 
              />
          </div>
          <div className="form-group">
            <Add 
                onAddTodo={ handleAddTodo }  
              />
          </div>
          <div className="todo-list-container">
            <h3>List of ToDo Activities</h3>
            <ul className="todo-list">
              { todos.length == 0 && "No ToDos" }
              <TodoLists 
                todos={ todos }
                filteredTodos={ filteredTodos }
                setTodos={ setTodos }
                setFilteredTodos={ setFilteredTodos }
                onDeleteTodo={ handleDeleteTodo }
              />
            </ul>
          </div>
        </form>
      </div>
    </>
  )

}