// fetch existing todos from locatstorage
const getSavedTodos = function () {
    const todoJSON = localStorage.getItem('todo')

    if (todoJSON !== null) {
        return JSON.parse(todoJSON)
    } else {
        return []
    }
}

// save todos
const saveTodos = function (todo) {
    localStorage.setItem('todo', JSON.stringify(todo))
}

const removeTodo = function (id, todo) {
    const todoIndex = todo.findIndex(function (e) {
        return e.id === id
    })
    if (todoIndex > -1) {
        todo.splice(todoIndex, 1)
    }
}

// render application todos based on filters
const renderSearch = function (toDos, filter) {
    const filteredToDos = toDos.filter(function (todo) {
        let show = !filter.hideCompleted || !todo.completed
        const matchedToDo = todo.text.toLowerCase().includes(filter.searchText.toLowerCase())
        return matchedToDo && show
    })

    document.querySelector('#todos').innerHTML = ''

    filteredToDos.forEach(function (item, index) {
        const toDoSearch = getDomElem(item, toDos, filter)
        document.querySelector('#todos').appendChild(toDoSearch)
    })
}

// generate the dom elements for individual todos
const getDomElem = function (item, todo, filter) {
    const todoItem = document.createElement('div')
    const checkbox = document.createElement('input')
    const text = document.createElement('span')
    const removeItem = document.createElement('button')

    checkbox.setAttribute('type', 'checkbox')
    todoItem.appendChild(checkbox)

    text.textContent = item.text
    todoItem.appendChild(text)

    removeItem.textContent = 'x'
    removeItem.addEventListener('click', function (e) {
        removeTodo(item.id, todo)
        saveTodos(todo)
        document.querySelector('h4').replaceWith(countTodos(todo))
        renderSearch(todo, filter)
    })
    todoItem.appendChild(removeItem)

    return todoItem
}

// count remaining todos and return summary
const countTodos = function (todo) {
    let remainingCount = 0
    todo.forEach(function (item, index) {
        if (!item.completed) {
            remainingCount += 1
        }
    })
    const remaining = document.createElement('h4')
    remaining.textContent = `You have ${remainingCount} todo's to complete`
    return remaining
}

