import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: new Array(props.anecdotes.length).fill(0)
    }
  }

  vote = () => this.setState({
    votes: this.state.votes.map((item, index) => {
      if(index === this.state.selected) {
        return item+1;
      } else {
        return item;
      }
    })
  })

  randomizeState = () => this.setState({
    selected: Math.floor((Math.random() * this.props.anecdotes.length) )
  })

  mostVotes = function() {
    var max = 0;
    var maxindex = 0
    this.state.votes.forEach((item, index) => {
      if(item > max) {
        maxindex = index;
        max = item
      }
    })
    return maxindex;
  }  

  render() {
    return (
      <div>
        <div>
          {this.props.anecdotes[this.state.selected]}
        </div>
        <Votes votes={this.state.votes[this.state.selected]} />
        <div>
          <Button text="Next anecdote" handleClick={this.randomizeState} />
          <Button text="Vote" handleClick={this.vote} />
        </div>
        <MostVoted anecdote={this.props.anecdotes[this.mostVotes()]} votes={this.state.votes[this.mostVotes()]}/>
      </div>
    )
  }
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const Votes = ({ votes }) => (
  <div>
    Has {votes} votes.
  </div>
)

const MostVoted = ({ anecdote, votes }) => {
  if(votes == 0) {
    return (
      <div>
        No votes yet.
      </div>
    )
  }
  return (
    <div>
      <h4>
        Anecdote with most votes:
      </h4>
      <div>
        {anecdote}
      </div>
      <div>
        Has {votes} votes.
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
