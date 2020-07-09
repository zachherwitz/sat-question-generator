class NewQuestion extends React.Component {
  createNewQuestionObject = (event) => {
    event.preventDefault();
    this.setState({
      newQuestion: {
        question: this.newQuestion.value,
        answer1: this.newAnswer1.value,
        answer2: this.newAnswer2.value,
        answer3: this.newAnswer3.value,
        answer4: this.newAnswer4.value,
        correctanswer: this.newCorrectAnswer.value,
        tag: this.newTags.value
      }
    }, () => {
      console.log(this.state.newQuestion);
      this.props.newform(this.state.newQuestion);
      this.props.returnHome();
    })

  }
  render = () => {
    return <form className="new-form" onSubmit={this.createNewQuestionObject}>
      <fieldset>
        <legend>Question </legend>
        <label>Question: </label>
        <textarea ref={input => this.newQuestion = input} required></textarea>
        <label>What Subject Does This Fall Under?  </label>
        <input type="text" ref={input => this.newTags = input} placeholder="Please Select: Math, History, English, or Science" required />
      </fieldset>
      <fieldset>
        <legend>Answer </legend>
        <label>Option 1: </label>
        <textarea ref={input => this.newAnswer1 = input} required></textarea>
        <label>Option 2: </label>
        <textarea ref={input => this.newAnswer2 = input} required></textarea>
        <label>Option 3: </label>
        <textarea ref={input => this.newAnswer3 = input} required></textarea>
        <label>Option 4: </label>
        <textarea ref={input => this.newAnswer4 = input} required></textarea>
        <label>Which Option is Correct?  </label>
        <input type="text" ref={input => this.newCorrectAnswer = input} placeholder="Please Choose : 1, 2, 3, or 4" required />
      </fieldset>
      
      
      <input type="submit" value="Add Question" />
    </form>
  }
}

class EditForm extends React.Component {
  submitEdit = (event) => {
    event.preventDefault();
    this.setState({
      updateQuestion: {
        updatedQuestion: this.updatedQuestion.value,
        updatedAnswer1: this.updatedAnswer1.value,
        updatedAnswer2: this.updatedAnswer2.value,
        updatedAnswer3: this.updatedAnswer3.value,
        updatedAnswer4: this.updatedAnswer4.value,
        updatedCorrectAnswer: this.updatedCorrectAnswer.value,
        updatedTags: this.updatedTags.value
      }
    }, () => {
        console.log(this.state.updateQuestion);
        this.props.update(this.props.question.id, this.state.updateQuestion);
        this.props.toggle();
    })
  }

  render = () => {
    const { question, toggle } = this.props;
    return <form className="edit-form" id={question.id} onSubmit={this.submitEdit}>
      <fieldset>
        <legend>Question</legend>
        <label>Question: </label>
        <textarea ref={input => this.updatedQuestion = input} defaultValue={question.question}></textarea>
        <label>What Subject Does This Fall Under?  </label>
        <input ref={input => this.updatedTags = input} type="text" defaultValue={question.tags} />
      </fieldset>
      <fieldset>
        <legend>Answer</legend>
        <label>Option 1: </label>
        <textarea ref={input => this.updatedAnswer1 = input} defaultValue={question.answer1}></textarea>
        <label>Option 2: </label>
        <textarea ref={input => this.updatedAnswer2 = input} defaultValue={question.answer2}></textarea>
        <label>Option 3: </label>
        <textarea ref={input => this.updatedAnswer3 = input} defaultValue={question.answer3}></textarea>
        <label>Option 4: </label>
        <textarea ref={input => this.updatedAnswer4 = input} defaultValue={question.answer4}></textarea>
        <label>Correct Answer: </label>
        <input ref={input => this.updatedCorrectAnswer = input} type="text" defaultValue={question.correctanswer} />
      </fieldset>
      
      <input type="submit" value="Change Question" />
      <button onClick={toggle}>Go Back</button>
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
    const { question, update } = this.props;
    return (
      (this.state.display === 'button') ? <button onClick={this.toggle}>EDIT</button>
        : <EditForm update={update} question={question} toggle={this.toggle}/>
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
            <EditButton update={this.props.update} question={question}/>
            <button id={question.id} onClick={this.props.deleteQuestion}>DELETE</button>
          </div>
        })}
      </div>
    </div>
  }
}







class Home extends React.Component {
  state = {
    guess: ''
  }

  checkAnswer = (event) => {
    event.preventDefault()
    if(this.state.guess === this.props.loadedQuestion.correctanswer) {
      console.log('CORRECT GUESS!');
      document.getElementById(this.state.guess + "-guess").setAttribute('class', 'green')
      setTimeout(() => {
        this.props.getQuestions()
        document.getElementById("1-guess").removeAttribute('class')
        document.getElementById("2-guess").removeAttribute('class')
        document.getElementById("3-guess").removeAttribute('class')
        document.getElementById("4-guess").removeAttribute('class')
      }, 3000)

    } else {
      document.getElementById(this.state.guess + "-guess").setAttribute('class', 'red')
    }
  }

  guess = (event) => {
    this.setState({
      guess:event.target.id
    })
  }

  render = () => {
    return <div className="home">
      <button onClick={this.props.getQuestions}>LOAD</button>
      <div className="home-category">{this.props.loadedQuestion ? "Category: " + this.props.loadedQuestion.tags.toUpperCase() : null}</div>
      {this.props.loadedQuestion
        ?
        <div className="home-question-container">
          <div className="home-question">{this.props.loadedQuestion.question}</div>
          <form onSubmit={this.checkAnswer}>
            <div className="home-answer-container">
              <div className="home-answer">
                <input onClick={this.guess} id="1" type="radio" name="answers" value="1"/>
                <label id="1-guess" for="1">{this.props.loadedQuestion.answer1}</label>
              </div>
              <div className="home-answer">
                <input onClick={this.guess} id="2" type="radio" name="answers" value="2"/>
                <label id="2-guess" for="2">{this.props.loadedQuestion.answer2}</label>
              </div>
              <div className="home-answer">
                <input onClick={this.guess} id="3" type="radio" name="answers" value="3"/>
                <label id="3-guess" for="3">{this.props.loadedQuestion.answer3}</label>
              </div>
              <div className="home-answer">
                <input onClick={this.guess} id="4" type="radio" name="answers" value="4"/>
                <label id="4-guess" for="4">{this.props.loadedQuestion.answer4}</label>
              </div>
              <input className="home-check-answer-button" type="submit" value="Check Answer"/>
            </div>
          </form>
        </div>
        :
        null}
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

  returnHome = (event) => {
    this.setState({
      display: 'home'
    })
  }

  // READ //
  getQuestions = () => {
    axios.get('/sat').then(
      (response) => {
        console.log(response.data);
        this.setState({
          questions:response.data,
          loadedQuestion: response.data[Math.floor(Math.random() * response.data.length)]
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
  updateQuestion = (id, body) => {
    event.preventDefault();
    console.log('updating...');
    console.log(id);
    console.log(body);
    axios.put('/sat/' + id, {
      question: body.updatedQuestion,
      answer1: body.updatedAnswer1,
      answer2: body.updatedAnswer2,
      answer3: body.updatedAnswer3,
      answer4: body.updatedAnswer4,
      tags: body.updatedTags,
      correctanswer: body.updatedCorrectAnswer
    }).then(
      (response) => {
        this.setState({
          questions: response.data
        })
      })
  }

  // NEW //
  newQuestion = (body) => {
    axios.post('/sat', {
      question: body.question,
      answer1: body.answer1,
      answer2: body.answer2,
      answer3: body.answer3,
      answer4: body.answer4,
      tags: body.tag,
      correctanswer: body.correctanswer
    }).then(
      (response) => {
        this.setState({
          questions: response.data
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
        <Home getQuestions={this.getQuestions} loadedQuestion={this.state.loadedQuestion} /> : (this.state.display === 'new-question') ?
          <NewQuestion returnHome={this.returnHome} newform = {this.newQuestion}/> : <AllQuestions returnHome={this.returnHome} deleteQuestion={this.deleteQuestion} questions={this.state.questions} update={this.updateQuestion}/>
      }
    </div>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('main')
)
