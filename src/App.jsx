import { useState } from 'react'
import Add from './Add'
import Search from './Search'
import ListItem from './ListItem'

function TodoLists({ todos, filteredTodos, onToggleTodo, onDeleteTodo }) {
  if (filteredTodos.length > 0) {
    return filteredTodos.map(filteredTodo => {
      return (
        <ListItem 
          key={ filteredTodo.id } 
          todo={ filteredTodo } 
          onToggleTodo={ onToggleTodo } 
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
        onToggleTodo={ onToggleTodo } 
        onDeleteTodo={ onDeleteTodo } 
        />
    )
  }) 
}

export default function App() {
  const [todos, setTodos] = useState([])
  const [filteredTodos, setFilteredTodos] = useState([])

  function handleForm(evt){
    evt.preventDefault()
    evt.stopPropagation()    
  }

  function handleAddTodo(todoName, setTodoName) {
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


  function handleSearchTodo(searchTodoName) {
    if (todos.length <= 0) return

    const copyTodos = todos.slice(0)
    const searchedTodo = copyTodos.filter(copyTodo => copyTodo.todoName.indexOf(searchTodoName) != -1)

    setFilteredTodos(currentFilteredTodos => {
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
                onToggleTodo={ handleToggleTodo }
                onDeleteTodo={ handleDeleteTodo }
              />
            </ul>
          </div>
        </form>
      </div>
    </>
  )

}