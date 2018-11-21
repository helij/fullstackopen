const reducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.data.id)
    const voted = store.find(a => a.id === action.data.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.data.content, id: action.data.id, votes: 0 }]
  }

  if (action.type === 'INIT_ANECDOTES') {

    return action.data
  }

  return store
}

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const anecdoteVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export default reducer