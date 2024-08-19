import { useState } from 'react'

function DeleteButton({ todo, onDeleteTodo }) {
    return (
        <button 
            onClick={ () => onDeleteTodo(todo.id) } 
            className="delete-btn">
                Delete
        </button>

    )
}

function EditButton({ toggleEditTodoForm  }) {
    return <button onClick={ () => toggleEditTodoForm() } className="edit-btn">Edit</button>
}


function EditTodoForm({ toggleEditButton }) {
    return (
        <div>
            <input type="text" id="edit-input" placeholder="Edit ToDo name" />
            <button onClick={ toggleEditButton } className="done-btn">Done</button>
            <button onClick={ toggleEditButton } className="cancel-btn">Cancel</button>
        </div>
    )
}

function EditToggle({ onEdit, toggleEditButton, toggleEditTodoForm }) {
    
    if (onEdit) {
        return <EditTodoForm toggleEditButton={ toggleEditButton } />
    }

    return <EditButton toggleEditTodoForm={ toggleEditTodoForm } />

}

export default function ListItem({ todo, onToggleTodo, onDeleteTodo }) {
    const [onEdit, setOnEdit] = useState(false)

    function handleEditButton() {
        setOnEdit(false)
    }

    function handleEditTodoForm() {
        setOnEdit(true)
    }

    return (
        <li>
            <label>
                <input 
                    type="checkbox" 
                    checked={ todo.checked } 
                    onChange={ (evt) => onToggleTodo(todo.id, evt.target.checked) } />

                { todo.todoName }
            </label>

            <EditToggle 
                onEdit={ onEdit } 
                toggleEditButton={ handleEditButton } 
                toggleEditTodoForm={ handleEditTodoForm } />
            <DeleteButton todo={ todo } onDeleteTodo={ onDeleteTodo } />
        </li>
    )
}