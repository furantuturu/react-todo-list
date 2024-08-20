import { useState } from "react"

function SearchButton({ searchTodoName, onSearchTodo }) {
    return (
        <button 
            type="button"
            onClick={ () => onSearchTodo(searchTodoName) } 
            className="search-btn">
                Search
        </button>
    )
}

export default function Search({ onSearchTodo }){
    const [searchTodoName, setSearchTodoName] = useState("")

    return (
        <>
            <input 
                onChange={ (evt) => setSearchTodoName(evt.target.value) } 
                value={ searchTodoName } 
                onKeyDown={ (evt) => { if (evt.key == "Enter") { onSearchTodo(searchTodoName) } } }
                type="text" 
                id="search-todo" 
                placeholder="Search a ToDo activity" 
                /> 
            
            <SearchButton 
                searchTodoName={ searchTodoName } 
                onSearchTodo={ onSearchTodo } 
                />
        </>
    )

}