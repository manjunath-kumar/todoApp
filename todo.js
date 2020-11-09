let todos = []


const filters = {
    searchText:'',
    hideCompleted: false
}

const todosJSON = localStorage.getItem('todos')

if(todosJSON !== null){
    todos = JSON.parse(todosJSON)
}

const renderTodos = function(todo, filters) {
    let filtertodos = todo.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    filtertodos = filtertodos.filter(function (todo) {
        //below one-liner for hide the completed todos
        //return !filters.hideCompleted || !todo.completed
        if(filters.hideCompleted) {
            return !todo.completed
        } else {
            return true
        }
    }) 

    const incompleteTodo = filtertodos.filter(function (todo) {
        return !todo.completed
    })
/* 
   filtertodos.forEach(function (todo) {
       const todoEl = document.createElement('p')
       todoEl.textContent = todo.text
       document.querySelector('#todo-filtered').appendChild(todoEl)
   }) */

    document.querySelector('#todo-filtered').innerHTML = ''

    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodo.length} todo left.`
    document.querySelector('#todo-filtered').appendChild(summary)


    filtertodos.forEach(function (todo) {
        const p = document.createElement('p')
        p.textContent = todo.text
        document.querySelector('#todo-filtered').appendChild(p)
    })

}

renderTodos(todos,filters)


/* document.querySelector('button#add-todo').addEventListener('click', function (e) {
    console.log("The Button click is enabled")
})

document.querySelector('#add-todo-text').addEventListener('input', function (e) {
    
    console.log(e.target.value)
   
}) */

//Event listner for Seach text
document.querySelector('#seach-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

//Event listner for form input submit
document.querySelector('#todo-form').addEventListener('submit', function (e) {
    e.preventDefault()
    todos.push({
        text: e.target.elements.enterTodo.value,
        completed: false
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    renderTodos(todos, filters)
    e.target.elements.enterTodo.value = ''
})

document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos,filters)
})