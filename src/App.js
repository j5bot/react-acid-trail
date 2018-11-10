import React, { Component } from 'react';
import './App.css';
import './checkbox.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faExclamationTriangle,
  faFile,
  faFont,
  faHandPointer,
  faSpinner,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

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
  ClearButtonContainer,
  EnterStringContainer,
  FileChooserContainer,
  HashButtonContainer,
  IpsumSaltContainer
} from './containers';

library.add(
  faExclamationTriangle,
  faFile,
  faFont,
  faHandPointer,
  faSpinner,
  faThumbsUp
);

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
              <NavLink href="https://github.com/j5bot/react-acid-trail">Github</NavLink>
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
                  <div className="buttons-container">
                    <HashButtonContainer/>
                    <ClearButtonContainer/>
                  </div>
                </AcidTrailChartsContainer>
                <div className="data-container">
                  <EnterStringContainer/>
                  <FileChooserContainer/>
                </div>
                <IpsumSaltContainer />
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
