import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actionForAnecdote } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

class App extends React.Component {

  componentDidMount = async () => {
    const anecdotes = await anecdoteService.getAll()
    this.props.anecdoteInitialization(anecdotes)
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

App.contextTypes = {
  store: PropTypes.object
}

export default connect(
  null,
  { anecdoteInitialization: actionForAnecdote.anecdoteInitialization }
)(App)