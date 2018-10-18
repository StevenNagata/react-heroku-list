import React from 'react'
import { get } from 'http'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete'
import ListItemText from '@material-ui/core/ListItemText'
import AddTodo from './list-add'
const styles = {
  delete: {
    display: 'block',
    margin: 0,
    right: '5%',
    position: 'absolute'
  }
}
export default class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
    this.toggleComplete = this.toggleComplete.bind(this)
    this.add = this.add.bind(this)
    this.delete = this.delete.bind(this)
  }
  componentDidMount() {
    fetch('/todos/', get)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ todos: data })
      })
      .catch(err => console.log(err))
  }
  toggleComplete(event) {
    const id = event.target.closest('div').id
    const currentTodo = this.state.todos.find((todo) => {
      return todo.id === parseInt(id)
    })
    const updatedTodo = Object.assign({}, { task: currentTodo.task, isCompleted: !(currentTodo.isCompleted) })
    const jsonTodo = JSON.stringify(updatedTodo)
    fetch(`/todos/${id}`,
      {
        method: 'put',
        headers: { 'content-type': 'application/json' },
        body: jsonTodo
      })
      .then(resp => resp.json())
      .then(data => {
        const updated = this.state.todos.map(todo => {
          if (data.id === todo.id) {
            return data
          }
          else {
            return todo
          }
        })
        return updated
      })
      .then(todos => {
        this.setState({ todos })
      })
  }
  add(todo) {
    const jsonTodo = JSON.stringify(todo)
    fetch('/todos/', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: jsonTodo
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ todos: [...this.state.todos, data] })
      })
      .catch(err => console.log(err))
  }
  delete(event) {
    const id = event.target.closest('div').id
    fetch(`/todos/${id}`, {
      method: 'delete'
    })
      .then(response => response.json())
      .then(() => {
        const updatedTodos = this.state.todos.filter(todo => todo.id !== parseInt(id, 10))
        this.setState({ todos: updatedTodos })
      })
      .catch(err => console.log(err))
  }
  render() {
    const reversed = this.state.todos.slice().reverse()
    return (
      <div style={styles.center}>
        <AddTodo
          add={this.add} />
        <List>
          {
            reversed.map(todo => {
              const strike = todo.isCompleted ? <s color="secondary">{todo.task}</s> : todo.task
              return (
                <div
                  key={todo.id}
                  id={todo.id.toString()}>
                  <ListItem dense>
                    <Checkbox
                      onClick={this.toggleComplete}
                      checked={todo.isCompleted}
                      color="primary" />
                    <ListItemText primary={strike} />
                    {todo.isCompleted &&
                      <DeleteIcon
                        onClick={this.delete}
                        style={styles.delete} />
                    }
                  </ListItem>
                </div>
              )
            })
          }
        </List>
      </div>
    )
  }
}
