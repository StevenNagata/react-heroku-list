import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
export default class AddTodo extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    const newTodo = {
      task: event.target.addtodo.value,
      isCompleted: false
    }
    this.props.add(newTodo)
    event.target.reset()
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="addtodo"
            label="New Todo"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rowsMax="4"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit">
            Add
          </Button>
        </form>
      </div >
    )
  }
}
