import React, { Component } from 'react';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHandPointer, faFile } from '@fortawesome/free-solid-svg-icons';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron
} from 'reactstrap';

import {
  EnterStringContainer,
  FileChooserContainer,
  HashButtonContainer,
  HashesContainer
} from './containers';
import {
  AcidTrailChart
} from './components';

library.add(faHandPointer, faFile);

const chartState = {
  width:  960,
  height: 600,
  data:   [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02780 },
    { letter: 'D', frequency: 0.04253 },
    { letter: 'E', frequency: 0.12702 },
    { letter: 'F', frequency: 0.02288 },
    { letter: 'G', frequency: 0.02022 },
    { letter: 'H', frequency: 0.06094 },
    { letter: 'I', frequency: 0.06973 },
    { letter: 'J', frequency: 0.00153 },
    { letter: 'K', frequency: 0.00747 },
    { letter: 'L', frequency: 0.04025 },
    { letter: 'M', frequency: 0.02517 },
    { letter: 'N', frequency: 0.06749 },
    { letter: 'O', frequency: 0.07507 },
    { letter: 'P', frequency: 0.01929 },
    { letter: 'Q', frequency: 0.00098 },
    { letter: 'R', frequency: 0.05987 },
    { letter: 'S', frequency: 0.06333 },
    { letter: 'T', frequency: 0.09056 },
    { letter: 'U', frequency: 0.02758 },
    { letter: 'V', frequency: 0.01037 },
    { letter: 'W', frequency: 0.02465 },
    { letter: 'X', frequency: 0.00150 },
    { letter: 'Y', frequency: 0.01971 },
    { letter: 'Z', frequency: 0.00074 },
  ]
};

class App extends Component {
  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render () {
    return (
      <div>
        <Navbar color="inverse" light expand="md">
          <NavbarBrand href="/">ACID Trail</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1>Welcome to React</h1>
                <AcidTrailChart
                  width={ chartState.width }
                  height={ chartState.height }
                  data={ chartState.data }
                />
                <EnterStringContainer/>
                <FileChooserContainer/>
                <HashButtonContainer/>
                <HashesContainer/>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
