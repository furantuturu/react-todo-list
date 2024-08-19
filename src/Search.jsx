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

export default function Search({ searchTodoName, setSearchTodoName, onSearchTodo }){
    return (
        <>
            <input 
                onChange={ (evt) => setSearchTodoName(evt.target.value) } 
                value={ searchTodoName } 
                onKeyDown={ (evt) => { if (evt.key == "Enter") { onSearchTodo(searchTodoName) } } }
                className="search-input" 
                type="text" 
                id="search-todo" 
                placeholder="Search a ToDo activity" />
            
            <SearchButton searchTodoName={ searchTodoName } onSearchTodo={ onSearchTodo } />
        </>
    )

}