import React from 'react'
import { actionForAnecdote } from '../reducers/anecdoteReducer'
import { actionForNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Filter from './Filter'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {

  onClickVote = (anecdote) => async () => {
    const updatedAnecdote = await anecdoteService.updateOne(anecdote)

    this.props.anecdoteVoting(updatedAnecdote.id)
    clearTimeout(this.props.notification.timeout)
    this.props.notificationSet(
      `You voted '${updatedAnecdote.content}'`,
      setTimeout(() => {
        this.props.notificationUnset()
      }, 5000)
    )
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.onClickVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const filterAnecdotes = (anecdotes, filter) => {
  return anecdotes
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: filterAnecdotes(state.anecdotes, state.filter),
    notification: state.notification
  }
}

const mapDispatchToProps = {
  anecdoteVoting: actionForAnecdote.anecdoteVoting,
  notificationSet: actionForNotification.notificationSet,
  notificationUnset: actionForNotification.notificationUnset
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default ConnectedAnecdoteList
