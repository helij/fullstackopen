const filterReducer = (state = '', action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'SET_FILTER':
    return action.text
  default:
    return state
  }
}

export const filter = (text) => {
  return {
    type: 'SET_FILTER',
    text
  }
}

export default filterReducer