/* globals forcem, Neah */
import React, { Component } from 'react';
import Script from 'react-load-script';
import { Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './IpsumSalt.css';

const ipsums = [
  {
    ipsum:    'select',
    name:     'Select Ipsum Generator ...'
  },
  {
    ipsum:    'forcem',
    name:     'Forcem Ipsum',
    url:      '//cdn.jsdelivr.net/npm/forcem-ipsum@1.7.3/forcem.min.js',
    callback: () => forcem().join('\n\n')
  },
  {
    ipsum:    'neah',
    name:     'Ahnuld',
    url:      '//cdn.jsdelivr.net/npm/neah@1.0.2/neah.min.js',
    callback: () => (new Neah())
      .paragraphs(5)
  }
  // {
  //   ipsum:    'shakespeare-data',
  //   name:     'The Bard',
  //   url:      '//cdn.jsdelivr.net/npm/shakespeare-data@3.0.0/lib/shakespeare.js',
  //   callback: () => Shakespeare.sonnets.random()
  // },
  // {
  //   ipsum:    'samuel-l',
  //   name:     'Samuel L. Ipsum',
  //   url:      '//cdn.jsdelivr.net/npm/samuel-ipsum@1.0.10/dist/samuel-ipsum.min.js',
  //   callback: () =>
  // }
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
