import { useState } from 'react'

function DeleteButton({ todo, onDeleteTodo }) {
    return (
        <button onClick={ () => onDeleteTodo(todo.id) } className="delete-btn">Delete</button>

    )
}

function EditButton({ toggleEditTodoForm  }) {
    return <button onClick={ () => toggleEditTodoForm() } className="edit-btn">Edit</button>
}


function EditTodoForm({ todo, newTodoName, setNewTodoName, toggleEditDoneButton, toggleEditCancelButton }) {
    return (
        <>
            <input 
                onChange={ (evt) => setNewTodoName(evt.target.value) } 
                value={ newTodoName } 
                type="text" 
                id="edit-todo" 
                placeholder="Edit ToDo name" 
                />

            <button onClick={ () => toggleEditDoneButton(todo, newTodoName) } className="done-btn">Done</button>
            <button onClick={ () => toggleEditCancelButton() } className="cancel-btn">Cancel</button>
        </>
    )
}

function EditToggle({ onEdit, toggleEditTodoForm, todo, newTodoName, setNewTodoName, toggleEditDoneButton, toggleEditCancelButton }) {
    
    if (onEdit) {
        return <EditTodoForm 
                    todo={ todo }
                    newTodoName={ newTodoName }
                    setNewTodoName={ setNewTodoName }
                    toggleEditDoneButton={ toggleEditDoneButton } 
                    toggleEditCancelButton={ toggleEditCancelButton } 
                    />
    }

    return <EditButton toggleEditTodoForm={ toggleEditTodoForm } />

}

export default function ListItem({ todo, onToggleTodo, onDeleteTodo }) {
    const [onEdit, setOnEdit] = useState(false)
    const [newTodoName, setNewTodoName] = useState("")

    
    function handleEditTodoForm() {
        setOnEdit(true)
    }

    function handleEditDoneButton(todo, newTodoName) {
        if (newTodoName == "") return

        todo.todoName = newTodoName

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
                    onChange={ (evt) => onToggleTodo(todo.id, evt.target.checked) } 
                    />

                { todo.todoName }
            </label>

            <EditToggle 
                onEdit={ onEdit } 
                toggleEditTodoForm={ handleEditTodoForm }
                todo={ todo }
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