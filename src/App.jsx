import { useState } from 'react'

function Search(){

  return(
    <>
      <input className="search-input" type="text" id="search-todo" placeholder="Search a ToDo activity" />
      <button className="search-btn">Search</button>
    </>
  )

}

function Add() {
  return(
    <>
      <input className="add-input" type="text" id="add-todo" placeholder="Add a ToDo activity" />
      <button className="add-btn">Add</button>
    </>
  )
}

export default function App() {

  function handleForm(evt){
    evt.preventDefault()
    evt.stopPropagation()
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
            <Add />
          </div>
          <div className="todo-list-container">
            <h3>List of ToDo Activities</h3>
            <ul className="todo-list">
              <li>
                <input type="checkbox" id="todo-item1" />
                <label for="todo-item1">ToDo 1</label>
                <button>Edit</button>
                <button>Delete</button>
              </li>
              <li>
                <input type="checkbox" id="todo-item2" />
                <label for="todo-item2">ToDo 2</label>
                <button>Edit</button>
                <button>Delete</button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </>
  )

}