import React from 'react'
import { actionForAnecdote } from '../reducers/anecdoteReducer'
import { actionForNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Filter from './Filter'

class AnecdoteList extends React.Component {

  onClickVote = (anecdote) => async () => {
    this.props.anecdoteVoting(anecdote)
    this.props.notificationSet(`You voted '${anecdote.content}'`, 5)
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
    anecdotes: filterAnecdotes(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  anecdoteVoting: actionForAnecdote.anecdoteVoting,
  notificationSet: actionForNotification.notificationSet
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default ConnectedAnecdoteList
