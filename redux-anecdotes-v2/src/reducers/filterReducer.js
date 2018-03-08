const filterReducer = (store = '', action) => {
  if (action.type === 'SET_FILTER') {
    return action.filter
  }

  return store
}

export const actionForFilter = {
  filterSet(filter) {
    return {
      type: 'SET_FILTER',
      filter
    }
  }
}

export default filterReducer