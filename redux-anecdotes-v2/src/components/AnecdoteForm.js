import React from 'react'
import { actionForAnecdote } from './../reducers/anecdoteReducer'
import { actionForNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    this.props.anecdoteCreation(newAnecdote)
    clearTimeout(this.props.notification.timeout)
    this.props.notificationSet(
      `You added '${newAnecdote.content}'`,
      setTimeout(() => {
        this.props.notificationUnset()
      }, 5000)
    )
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
    notification: state.notification,
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  anecdoteCreation: actionForAnecdote.anecdoteCreation,
  notificationSet: actionForNotification.notificationSet,
  notificationUnset: actionForNotification.notificationUnset
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default ConnectedAnecdoteForm
