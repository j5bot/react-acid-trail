import React, { Component } from 'react';
import './App.css';
import './checkbox.css';

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
  AcidTrailChartsContainer,
  EnterStringContainer,
  FileChooserContainer,
  HashButtonContainer
} from './containers';

library.add(faHandPointer, faFile);

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
                <h1>ACID Trail</h1>
                <p>An ACID trail is an Associated Color ID for a file or other
                  arbitrary data.</p>
                <AcidTrailChartsContainer>
                  <HashButtonContainer/>
                </AcidTrailChartsContainer>
                <div className="data-container">
                  <EnterStringContainer/>
                  <FileChooserContainer/>
                </div>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
