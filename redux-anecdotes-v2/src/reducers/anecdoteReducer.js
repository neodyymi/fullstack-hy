import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  switch(action.type) {
  case 'VOTE': {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  case 'CREATE':
    return [...store, { content: action.anecdote.content, id: action.anecdote.id, votes:action.anecdote.votes }]
  case 'INIT_ANECDOTES':
    return action.data
  default: return store
  }
}

export const actionForAnecdote = {
  anecdoteCreation(content){
    return async (dispatch) => {
      const anecdote = await anecdoteService.createNew(content)
      dispatch({
        type: 'CREATE',
        anecdote
      })
    }
  },
  anecdoteVoting(anecdote){
    return async (dispatch) => {
      const updatedAnecdote = await anecdoteService.updateOne(anecdote)
      dispatch({
        type: 'VOTE',
        id: updatedAnecdote.id
      })
    }
  },
  anecdoteInitialization(){
    return async (dispatch) => {
      const data = await anecdoteService.getAll()
      dispatch({
        type: 'INIT_ANECDOTES',
        data
      })
    }
  }
}

export default anecdoteReducer