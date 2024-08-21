import { useState } from 'react'

function DeleteButton({ todo, onDeleteTodo }) {
    return (
        <button onClick={ () => onDeleteTodo(todo.id) } className="delete-btn">Delete</button>

    )
}

function EditButton({ toggleEditTodoForm  }) {
    return <button onClick={ () => toggleEditTodoForm() } className="edit-btn">Edit</button>
}


function EditTodoForm({ todo, setTodos, newTodoName, setNewTodoName, toggleEditDoneButton, toggleEditCancelButton }) {
    return (
        <>
            <input 
                onChange={ (evt) => setNewTodoName(evt.target.value) } 
                value={ newTodoName } 
                type="text" 
                id="edit-todo" 
                placeholder="Edit ToDo name" 
                />

            <button onClick={ () => toggleEditDoneButton(todo.id, newTodoName, setTodos) } className="done-btn">Done</button>
            <button onClick={ () => toggleEditCancelButton() } className="cancel-btn">Cancel</button>
        </>
    )
}

function EditToggle({ onEdit, toggleEditTodoForm, todo, setTodos, newTodoName, setNewTodoName, toggleEditDoneButton, toggleEditCancelButton }) {
    
    if (onEdit) {
        return <EditTodoForm 
                    todo={ todo }
                    setTodos={ setTodos }
                    newTodoName={ newTodoName }
                    setNewTodoName={ setNewTodoName }
                    toggleEditDoneButton={ toggleEditDoneButton } 
                    toggleEditCancelButton={ toggleEditCancelButton } 
                    />
    }

    return <EditButton toggleEditTodoForm={ toggleEditTodoForm } />

}

export default function ListItem({ todo, setTodos, onDeleteTodo }) {
    const [onEdit, setOnEdit] = useState(false)
    const [newTodoName, setNewTodoName] = useState("")

    function handleToggleTodo(id, checked, setTodos) {
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

    function handleEditTodoForm() {
        setOnEdit(true)
    }

    function handleEditDoneButton(id, newTodoName, setTodos) {
        if (newTodoName == "") return

        setTodos(currentTodo => {
            return currentTodo.map(todo => {
                if (todo.id == id) {
                    return {
                    ...todo, todoName: newTodoName
                    }
                }

                return todo
            })
        })

        setNewTodoName("")
        setOnEdit(false)
    }

    function handleEditCancelButton() {
        setNewTodoName("")
        setOnEdit(false)
    }

    return (
        <li>
            <label>
                <input 
                    type="checkbox" 
                    checked={ todo.checked } 
                    onChange={ (evt) => handleToggleTodo(todo.id, evt.target.checked, setTodos) } 
                    />

                { todo.todoName }
            </label>

            <EditToggle 
                onEdit={ onEdit } 
                toggleEditTodoForm={ handleEditTodoForm }
                todo={ todo }
                setTodos={ setTodos }
                newTodoName={ newTodoName }
                setNewTodoName={ setNewTodoName }
                toggleEditDoneButton={ handleEditDoneButton } 
                toggleEditCancelButton={ handleEditCancelButton } 
                />

            <DeleteButton 
                todo={ todo } 
                onDeleteTodo={ onDeleteTodo } 
                />
        </li>
    )
}