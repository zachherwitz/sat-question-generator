class NewQuestion extends React.Component {
  render = () => {
    return <div className="home">
      <h1> New Question Test </h1>
    </div>
  }
}

class AllQuestions extends React.Component {
  render = () => {
    return <div className="home">
      <h1> All Questions Test </h1>
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
    const {changedisplay} = this.props;
    return <nav>
      <ul>
        <li><a onClick={changedisplay} id="home">Home</a></li>
        <li><a onClick={changedisplay} id="new-question">New Question</a></li>
        <li><a onClick={changedisplay} id="all-questions">View All Questions</a></li>
      </ul>
    </nav>
  }
}

class App extends React.Component {  
  state = {
    questions: [],
    display: 'home'
  }
  
  //function that changes page view based on nav link
  changeDisplay = (event) => {
    this.setState({
      display: event.target.getAttribute('id')
    }, () => {
      console.log(this.state.display);
      
    })
  }
  render = () => {
    return <div className="container">
      <Nav changedisplay={this.changeDisplay}/> 
      {/* ternary statement determines what goes here */}
      {(this.state.display === 'home') ? 
        <Home /> : (this.state.display === 'new-question') ?
          <NewQuestion /> : <AllQuestions />
      }
    </div>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('main')
)