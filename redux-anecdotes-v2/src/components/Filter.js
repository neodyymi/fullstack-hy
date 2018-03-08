import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actionForFilter } from '../reducers/filterReducer'


class Filter extends React.Component {
  handleChange = (event) => {
    this.props.filterSet(event.target.value)
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  filterSet: actionForFilter.filterSet
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

Filter.contextTypes = {
  store: PropTypes.object
}

export default ConnectedFilter