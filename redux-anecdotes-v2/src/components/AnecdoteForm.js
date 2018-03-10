import React from 'react'
import { actionForAnecdote } from './../reducers/anecdoteReducer'
import { actionForNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.anecdoteCreation(content)
    e.target.anecdote.value = ''
    this.props.notificationSet(`You added '${content}'`, 5)
  }

  render() {

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  anecdoteCreation: actionForAnecdote.anecdoteCreation,
  notificationSet: actionForNotification.notificationSet
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default ConnectedAnecdoteForm
