import anecdoteService from './../services/anecdotes'

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



export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.update(anecdote.id, { content: anecdote.content, id: anecdote.id, votes: anecdote.votes + 1 })
    const id = anecdote.id
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer