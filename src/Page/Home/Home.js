import React from 'react';
import {
  Container,
  Jumbotron,
  Input,
  Button,
  Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  // Logical Operator
  // &&
  // ||
  // !
  state = {
    correctGuess: false,
    errorMsg: "",
    life: 3,
    randomNumber: 0,
    guess: null,
    guessHistory: []
  }

  componentDidMount(){
    // Rumus Random Range
    // (Math.Random * (max-1)) + min
    let randomNumber = Math.floor((Math.random() * 9) + 1) // Range 1 - 10
    let history = window.localStorage.getItem("history")
    this.setState({ randomNumber, guessHistory: history ? history.split(",") : [] })
  }

  onChange = (e) => {
    let guess = Number(e.target.value)
    if(isNaN(guess)){ return; }
    else{ this.setState({ guess: guess }) }
  }

  onClick = (e) => {
    e.preventDefault()

    // Logic Life
    if(this.state.life === 0){
      return
    }else{
      this.setState({
        life: this.state.life - 1
      })
    }

    // Switch
    // Kalau guess = randomNumber -> correctGuess = true; errorMsg = ""
    // Kalau guess < randomNumber -> correctGuess = false; errorMsg = "Tebakan terlalu rendah"
    // Kalau guess > randomNumber -> correctGuess = false; errorMsg = "Tebakan terlalu tinggi"
    switch(true){
      case this.state.guess === this.state.randomNumber:
        this.setState({
          guess: null,
          correctGuess: true,
          errorMsg: ""
        })
        break;
      case this.state.guess < this.state.randomNumber:
        this.setState({
          guess: null,
          correctGuess: false,
          errorMsg: "Tebakan terlalu rendah",
          guessHistory: [...this.state.guessHistory, this.state.guess]
        })
        break;
      case this.state.guess > this.state.randomNumber:
        this.setState({
          guess: null,
          correctGuess: false,
          errorMsg: "Tebakan terlalu tinggi",
          guessHistory: [...this.state.guessHistory, this.state.guess]
        })
        break;  
      default:
        break;
    }  
  }

  onSaveHistory = (e) => {
    e.preventDefault();
    window.localStorage.setItem("history", this.state.guessHistory)
  }

  onClickAbout = (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/about",
      state: {
        guessHistory: this.state.guessHistory
      }
    })
  }

  render(){
    console.log(this.state)
    console.log(this.props, "PROPS")
    return(
      <React.Fragment>
        <Container>
          <Jumbotron>
            <h1>Tebak Angka</h1>
            <p>Tebak angka random dari 1 - 10, aplikasi akan memberitahu apakah angka tebakan anda tepat atau lebih rendah atau lebih tinggi.</p>
            <p><strong>History: </strong> {this.state.guessHistory.map(guess => guess + " | ")} </p>
            <p><strong>Life: </strong> {this.state.life} </p>
            <Input type="text" className="mb-2" onChange={this.onChange} value={this.state.guess}/>
            {this.state.correctGuess && <Alert color="success">Tebakan benar!</Alert>}
            {this.state.errorMsg && <Alert color="danger">{this.state.errorMsg}</Alert>}
            {this.state.life === 0 && <Alert color="danger">Nyawa habis!!!</Alert>}
            <Button color="success" className="mr-2" onClick={this.onClick}>Check</Button>
            <Button color="info" onClick={this.onSaveHistory}>Save History</Button>
          </Jumbotron>
          <Button color="link" onClick={this.onClickAbout}>About</Button>
        </Container>
      </React.Fragment>
    )
  }
}

export default Home;