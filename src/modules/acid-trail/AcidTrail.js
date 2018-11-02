/*
Original NTC (name that color) code copyright (c) 2013 Chirag Mehta
Licensed under the MIT License by special permission.

Modifications copyright (c) 2013 Jonathan Cook
Licensed under the MIT License
*/
import NTC from './NTC';
import CryptoJS from '../../../public/scripts/vendor/crypto-js/crypto-js';

export class AcidTrail {

  static pad (hash) {
    return `${hash}${
      hash.length % 6 ?
        new Array(6 - (hash.length % 6) + 1).join('8') :
        ''
    }`;
  }

  static hash ({
    string,
    algorithm = 'SHA1'
  }) {

    return CryptoJS[algorithm](string).toString();

  }

  static colors (hash) {
    let color;
    const colors = new Array(Math.ceil(hash.length / 6));

    for (let i = 0; i < colors.length; i++) {
      color = hash.substr(i * 6, 6);
      colors[i] = {
        hex:   `#${color}`,
        match: NTC.match(color)
      };
    }

    return colors;
  }

  static trail (hash) {
    hash = this.pad(hash);
    return new Trail(this.colors(hash));
  }

}

export class Trail {
  constructor (colors) {
    this.hashColors = colors;
    this.colors = this.makeSet(
      'colorSet',
      (color) => color.hex
    );
    this.matchcolors = this.makeSet(
      'matchColorSet',
      (color) => color.match.color
    );
    this.matchnames = this.makeSet(
      'matchColorNameSet',
      (color) => color.match.name
    );
  }

  makeSet (set, getter) {
    return ({ length, callback } = {}) => {
      if (!this[set]) {
        this[set] = this.hashColors.map(
          (hashColor) => {
            return getter(hashColor);
          }
        );
      }
      return callback ?
        callback(
          this[set].slice(0, length || undefined)
        ) : this[set].slice(0, length || undefined);
    };
  }

}

export default AcidTrail;
