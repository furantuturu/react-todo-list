function AddButton({ todoName, onAddTodo }) {
    return (
        <button 
            type="submit" 
            onClick={ () => onAddTodo(todoName) } 
            className="add-btn">
                Add
        </button>
    )
}

export default function Add({ todoName, setTodoName, onAddTodo }) {
    return (
    <>
        <input 
            onChange={ (evt) => setTodoName(evt.target.value) } 
            value={ todoName } 
            onKeyDown={ (evt) => { if (evt.key == "Enter") { onAddTodo(todoName) } } }
            className="add-input" 
            type="text" 
            id="add-todo" 
            placeholder="Add a ToDo activity" />

        <AddButton todoName={ todoName } onAddTodo={ onAddTodo } />
    </>
    )
}