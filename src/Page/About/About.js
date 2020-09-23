import React from 'react';
import {
  Container,
  Jumbotron,
  Input,
  Button,
  Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';

class About extends React.Component {
  state = {}

  render(){
    console.log(this.state)
    console.log(this.props, "PROPS")
    return(
      <React.Fragment>
        <Container>
          <Jumbotron>
            <h1>About</h1>
            <p>Tebak angka random dari 1 - 10, aplikasi akan memberitahu apakah angka tebakan anda tepat atau lebih rendah atau lebih tinggi.</p>
          </Jumbotron>
          <Link to="/">Home</Link>
        </Container>
      </React.Fragment>
    )
  }
}

export default About;