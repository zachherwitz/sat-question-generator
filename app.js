class NewQuestion extends React.Component {
  render = () => {
    return <div className="home">
      <h1> New Question Test </h1>
    </div>
  }
}

class EditButton extends React.Component {
  render = () => {
    return <button>EDIT</button>
  }
}

class AllQuestions extends React.Component {
  render = () => {
    return <div className="home">
      <h1> All Questions Test </h1>
      <div>
        {this.props.questions.map((question, index) => {
          return <div key={index}>
            <p>{question.question}</p><br/>
            <EditButton question={question}/>
            <button id={question.id} onClick={this.props.deleteQuestion}>DELETE</button>
          </div>
        })}
      </div>
    </div>
  }
}

class Home extends React.Component {
  render = () => {
    return <div className="home">
      <h1> Home Page Test </h1>
    </div>
  }
}
class Nav extends React.Component {
  render = () => {
    const {changedisplay, loadQuestions} = this.props;
    return <nav>
      <ul>
        <li><a onClick={changedisplay} id="home">Home</a></li>
        <li><a onClick={changedisplay} id="new-question">New Question</a></li>
        <li><a onClick={loadQuestions} id="all-questions">View All Questions</a></li>
      </ul>
    </nav>
  }
}

class App extends React.Component {
  state = {
    questions: [],
    display: 'home'
  }

  // READ //
  getQuestions = () => {
    axios.get('/sat').then(
      (response) => {
        console.log(response.data);
        this.setState({
          questions:response.data
        })
      }
    )
  }

  // DELETE //
  deleteQuestion = (event) => {
    axios.delete('/sat/' + event.target.getAttribute('id')).then(
      (response) => {
        this.setState({
          questions:response.data
        })
    })
  }

  //function that changes page view based on nav link
  changeDisplay = (event) => {
    this.setState({
      display: event.target.getAttribute('id')
    }, () => {
      console.log(this.state.display);

    })
  }

  loadQuestions = (event) => {
    this.changeDisplay(event);
    this.getQuestions();
  }

  render = () => {
    return <div className="container">
      <Nav getQuestions={this.getQuestions} loadQuestions={this.loadQuestions} changedisplay={this.changeDisplay}/>
      {/* ternary statement determines what goes here */}
      {(this.state.display === 'home') ?
        <Home /> : (this.state.display === 'new-question') ?
          <NewQuestion /> : <AllQuestions deleteQuestion={this.deleteQuestion} questions={this.state.questions} />
      }
    </div>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('main')
)
