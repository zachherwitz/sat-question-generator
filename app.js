class NewQuestion extends React.Component {
  render = () => {
    return <div className="home">
      <h1> New Question Test </h1>
    </div>
  }
}

class EditForm extends React.Component {
  test = (event) => {
    event.preventDefault();
    this.setState({
      updateQuestion: {
        updatedQueston: this.updatedQuestion.value,
        updatedAnswer1: this.updatedAnswer1.value,
        updatedAnswer2: this.updatedAnswer2.value,
        updatedAnswer3: this.updatedAnswer3.value,
        updatedAnswer4: this.updatedAnswer4.value,
        updatedCorrectAnswer: this.updatedCorrectAnswer.value,
        updatedTags: this.updatedTags.value
      }
    }, () => {
      console.log(this.state);
    })
  }

  render = () => {
    const { question } = this.props;
    return <form className="edit-form" id={question.id} onSubmit={this.test}>
      <h2>Edit Question</h2>
      <textarea ref={input => this.updatedQuestion = input} defaultValue={question.question}></textarea>
      <textarea ref={input => this.updatedAnswer1 = input} defaultValue={question.answer1}></textarea>
      <textarea ref={input => this.updatedAnswer2 = input} defaultValue={question.answer2}></textarea>
      <textarea ref={input => this.updatedAnswer3 = input} defaultValue={question.answer3}></textarea>
      <textarea ref={input => this.updatedAnswer4 = input} defaultValue={question.answer4}></textarea>
      <input ref={input => this.updatedCorrectAnswer = input} type="text" defaultValue={question.correctanswer} />
      <input ref={input => this.updatedTags = input} type="text" defaultValue={question.tags} />
      <input type="submit" value="Change Question" />
      <a onClick={this.toggle}>Go Back</a>
    </form>
  }
}

class EditButton extends React.Component {
  state = {
    display: 'button'
  }

  toggle = () => {
    (this.state.display === 'button') ?
      this.setState({ display: 'form' }) :
      this.setState({display: 'button'})
  }

  render = () => {
    const { question } = this.props;
    return (
      (this.state.display === 'button') ? <button onClick={this.toggle}>EDIT</button>
        : <EditForm question = {question} />
    )
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

  //UPDATE //
  updateQuestion = (event) => {
    axios.put('/sat/' + event.target.getAttribute('id')).then(
      (response) => {
        this.setState({
          questions: response.data
        })
      })
  }

  updateValues = () => {

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
