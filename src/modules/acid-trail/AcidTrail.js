/**
 * AcidTrail module provides methods for creating various kinds of IDs using
 * color sequences, such as direct hash RGB colors, shade color names, closest
 * matching RGB colors, and closest matching color names.
 *
 * {@link module:NTC} is used for determining closest matching named colors.
 *
 * @module AcidTrail
 */
import NTC from './NTC';
import CryptoJS from 'crypto-js';

/**
 * AcidTrail exposes methods to create color sequences.
 */
export class AcidTrail {

  /**
   * Pad the given hash to be a multiple of 6 for later splitting into a
   * sequence of RGB hex colors.
   *
   * @param  {String} hash  A hexadecimal hash to pad to a length which is a
   *                        multiple of 6
   * @return {String}       Padded hash which has a length which is a multiple
   *                        of 6
   */
  static pad (hash) {
    return `${hash}${
      hash.length % 6 ?
        new Array(6 - (hash.length % 6) + 1).join('8') :
        ''
    }`;
  }

  /**
   * Generate a cryptographic hash of the given string using the given algorithm
   * (defaults to SHA1).
   *
   * @param  {String} string             The string to hash
   * @param  {String} [algorithm='SHA1'] The cryptographic hash algorithm to use
   * @return {String}                    A hexadecimal string representation of
   *                                     the hashed value of the input string
   */
  static hash ({
    string,
    algorithm = 'SHA1'
  }) {

    return CryptoJS[algorithm](string).toString();

  }

  /**
   * For the given padded cryptographic hash string, return an array of the
   * colors described by the hash and their closest matches in the named color
   * set.
   *
   * @param  {String} hash A padded cryptographic hash string see {@link pad}
   * @return {Array}       An array of objects representing the colors and
   *                       closest named color matches for each of the colors
   *                       described in the hash
   */
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

  /**
   * Create an object representing all of the color sequences for the given
   * cryptographic hash.
   *
   * @param  {String} hash  A cryptographic hash to be used to generate color
   *                        sequences.
   * @return {Trail}        An instance of {@link Trail} used to get various
   *                        kinds of color sequences for the given hash.
   */
  static trail (hash) {
    hash = this.pad(hash);
    return new Trail(this.colors(hash));
  }

}

/**
 * Trail exposes methods and properties to access AcidTrail color sequences.
 */
export class Trail {

  /**
   * Instantiate a new Trail instance, populate the colors property and generate
   * methods to access the direct colors, matched colors, and matched color
   * names sets/sequences.
   *
   * @param {Array} colors Array of colors and their color matches.
   */
  constructor (colors) {
    /**
     * The colors and color matches provided when instantiating the Trail object
     * @type {Array}
     */
    this.hashColors = colors;

    /**
     * A method to create the exact hex color sequence
     * @type {Function}
     */
    this.colors = this.makeSet(
      'colorSet',
      (color) => color.hex
    );

    /**
     * A method to create the matched color hex color sequence
     * @type {Function}
     */
    this.matchcolors = this.makeSet(
      'matchColorSet',
      (color) => color.match.color
    );

    /**
     * A method to create the matched color names sequence
     * @type {Function}
     */
    this.matchnames = this.makeSet(
      'matchColorNameSet',
      (color) => color.match.name
    );
  }

  /**
   * Utility method for generating color sequence accessors
   * @param  {String} set    Which color sequence/set to generate or get
   * @param  {String} getter A method which gets the values for the sequence
   * @return {Function}      A function which returns the sequence
   */
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
