const notificationReducer = (state = {text: '', style: ''}, action) => {
    switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
    }
  }
  
  export const notificationCreation = (text, style, time) => {
    return async (dispatch) => {
  
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: {text, style}
      })
      setTimeout(() => {
        dispatch({
          type: 'SET_NOTIFICATION',
          notification: {text: '', style: ''}
        })
      }, time * 1000)
    }
  }
  
  export default notificationReducer