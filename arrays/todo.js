const todo = ['Todo1', 'Todo2', 'Todo3', 'Todo4', 'Todo5']

todo.splice(2 ,1)
console.log(todo)
todo.push('New to do')
console.log(todo)
todo.shift()
console.log(todo)


console.log(`You have ${todo.length} todos`)
console.log(todo[0])
console.log(todo[todo.length-2])

todo.forEach(function (item, index) { // print a nice to do list
    console.log(`${index + 1}. ${item}`)
})

for (let i = 0; i < todo.length; i++) {
    console.log(`${i+1}. ${todo[i]}`)
}