const notificationReducer = (store = { message: '', set: false }, action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return { message: action.content, timeout: action.timeout }
  }
  if (action.type === 'UNSET_NOTIFICATION') {
    return { message: '', timeout: null }
  }

  return store
}

export const actionForNotification = {
  notificationSet(content, timeout) {
    return {
      type: 'SET_NOTIFICATION',
      content,
      timeout
    }
  },
  notificationUnset() {
    return {
      type: 'UNSET_NOTIFICATION'
    }
  }
}

export default notificationReducer