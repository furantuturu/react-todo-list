import { useState } from 'react'

function AddButton({ todoName, setTodoName, onAddTodo }) {
    return (
        <button 
            type="submit" 
            onClick={ () => onAddTodo(todoName, setTodoName) } 
            className="add-btn">
                Add
        </button>
    )
}

export default function Add({ onAddTodo }) {
    const [todoName, setTodoName] = useState("")

    return (
        <>
            <input 
                onChange={ (evt) => setTodoName(evt.target.value) } 
                value={ todoName } 
                onKeyDown={ (evt) => { if (evt.key == "Enter") { onAddTodo(todoName, setTodoName) } } }
                type="text" 
                id="add-todo" 
                placeholder="Add a ToDo activity" 
                />

            <AddButton 
                todoName={ todoName } 
                setTodoName={ setTodoName }
                onAddTodo={ onAddTodo } 
                />
        </>
        )
}