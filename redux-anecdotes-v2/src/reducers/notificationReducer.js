const getId = () => (100000*Math.random()).toFixed(0)

const notificationReducer = (store = { message: '', set: false }, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return { message: action.content, timeout: action.timeout }
  case 'UNSET_NOTIFICATION':
    if(action.timeout === store.timeout) {
      return { message: '', timeout: null }
    }
    return store
  default:
    return store
  }
}

export const actionForNotification = {
  notificationSet(content, seconds) {
    return async (dispatch) => {
      const timeout = getId()
      dispatch({
        type: 'SET_NOTIFICATION',
        content,
        timeout
      })
      setTimeout(() => {
        dispatch({
          type: 'UNSET_NOTIFICATION',
          timeout
        })
      }, 1000*seconds)
    }
  }
}

export default notificationReducer