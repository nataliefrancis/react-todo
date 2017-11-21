import React, {Component} from 'react'
import TodoModel from '../models/Todo'
import TodoList from '../components/TodoList'
import CreateTodoForm from '../components/CreateTodoForm'
import EditTodoForm from '../components/EditTodoForm'

class TodosContainer extends Component {
    constructor(){
    super()
    this.state = {
      todos: []
    }
  }
  componentDidMount(){
    this.fetchData()
  }
  fetchData(){
    TodoModel.all().then( (res) => {
      this.setState ({
        todos: res.todos
      })
    })
  }
 createTodo(newBody) {
  let newTodo = {
    body: newBody,
    completed: false
  }
  TodoModel.create(newTodo).then((res) => {
    console.log('created todo', res)
    let todos = this.state.todos
    let newTodos = todos.push(res)
    this.setState({newTodos})
  })
}
deleteTodo(todo) {
  console.log('deleting todo', todo)
  TodoModel.delete(todo).then((res) => {
      let todos = this.state.todos.filter(function(todo) {
        return todo._id !== res._id
      });
      this.setState({todos})
  })
}
updateTodo(updatedTodo) {
	console.log('updating todo', updatedTodo)
	TodoModel.update(updatedTodo).then((res) => {
	    let updateTodo = this.state.todos.filter(function(todo) {
	      return updatedTodo._id !== res._id
	    });
	    this.setState({updateTodo})
	})
}
render(){
  return (
    <div className='todosContainer'>
      <CreateTodoForm
      createTodo={this.createTodo.bind(this)} />
      <EditTodoForm
      updateTodo={this.updateTodo.bind(this)} />
      <TodoList
        todos={this.state.todos}
        onDeleteTodo={this.deleteTodo.bind(this)} />
    </div>
  )
}
}

export default TodosContainer