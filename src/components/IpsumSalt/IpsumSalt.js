/* globals */
import React, { Component } from 'react';
import Script from 'react-load-script';
import { Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../modules/ipsum-salt/loader';

import './IpsumSalt.css';

const randomInt = (min,max) => {
  return Math.ceil(Math.random() * (max - min)) + min;
};

const ipsums = [
  {
    ipsum:    'select',
    name:     'Select Ipsum Generator ...'
  },
  {
    ipsum:    'forcem',
    name:     'Forcem Ipsum',
    url:      '//cdn.jsdelivr.net/npm/forcem-ipsum@1.7.3/forcem.min.js',
    callback: () => window.forcem().join('\n\n')
  },
  {
    ipsum:    'neah',
    name:     'Ahnuld',
    url:      '//cdn.jsdelivr.net/npm/neah@1.0.2/neah.min.js',
    callback: () => (new window.Neah())
      .paragraphs(5)
  },
  {
    ipsum:    'synergipsum',
    name:     'Office Space',
    url:      './scripts/ipsum-salt/synergipsum/salt.js',
    callback: () => {
      const ipsum = [];
      let pars = 5;

      while (pars--) {
        ipsum.push(
          window.createSynergipsum(randomInt(2, 5)).generate()
        );
      }

      return ipsum.join('\n\n');
    }
  }
];

export class IpsumSalt extends Component {

  constructor () {
    super();
    this.state = {
      script:   '',
      callback: () => {},
      loaded:   false,
      loading:  false,
      error:    false
    };
  }

  loadScript (event) {
    const ipsum = ipsums[event.target.value];

    this.setState({
      script:   ipsum.url,
      loaded:   Boolean(Script.loadedScripts[ipsum.url]),
      callback: ipsum.callback
    });
  }

  onError (event) {
    console.log('error');
    this.setState({
      error: true
    });
  }

  onLoad (event) {
    console.log('loaded');
    this.setState({
      loaded: true
    });
  }

  render () {

    const { salt } = this.props;
    const { script, loaded, loading, error, callback } = this.state;

    // <p>{ String(script) }: { String(loaded) }</p>,

    return ([
      <div key="ipsum" className="ipsum-salt">
        <p>Ipsum</p>
        <Input type="select" onChange={ (event) => this.loadScript(event) }>
          {
            ipsums.map(
              (ipsum, index) => (<option
                key={ ipsum.ipsum }
                value={ index }>
                { ipsum.name }
              </option>)
            )
          }
        </Input>
        <span className="icon">
          { !loaded && loading && (
            <FontAwesomeIcon icon="spinner"/>
          )}
          { !loaded && error && (
            <FontAwesomeIcon icon="exclamation-triangle"/>
          )}
          {
            loaded && (
              <FontAwesomeIcon icon="thumbs-up"/>
            )
          }
        </span>
        <Button
          disabled={ !loaded }
          onClick={ () => salt(callback()) }>
          Fill with Ipsum
        </Button>
      </div>,
      <div key="script">
        { script && !loaded &&
          (<Script
            url={ script }
            onError={ (event) => this.onError(event) }
            onLoad={ (event) => this.onLoad(event) }
          />) }
      </div>
    ]);
  }

}

export default IpsumSalt;
