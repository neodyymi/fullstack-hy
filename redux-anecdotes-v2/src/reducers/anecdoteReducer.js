const anecdoteReducer = (store = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const old = store.filter(a => a.id !== action.id)
      const voted = store.find(a => a.id === action.id)

      return [...old, { ...voted, votes: voted.votes+1 } ]
    case 'CREATE':
      return [...store, { content: action.anecdote.content, id: action.anecdote.id, votes:action.anecdote.votes }]
    case 'INIT_ANECDOTES':
      return action.data
    default: return store
  }
}

export const actionForAnecdote = {
  anecdoteCreation(anecdote){
    return {
      type: 'CREATE',
      anecdote
    }
  },
  anecdoteVoting(id){
    return { type: 'VOTE', id: id }
  },
  anecdoteInitialization(data){
    return {
      type: 'INIT_ANECDOTES',
      data
    }
  }
}

export default anecdoteReducer