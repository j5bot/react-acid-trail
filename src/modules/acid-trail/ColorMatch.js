import { shadergb } from './NTC';

/**
 * Create an object representation of a color match array
 * @type {Object}
 */
export class ColorMatch {
  /**
   * Instantiate a {@link ColorMatch} from the named color.
   * @param {Array} named   An array of named color match properties.
   * @param {Boolean} exact Whether or not the match is an exact one.
   * @param {Number} diff   The difference weight between the color and the
   *                        match
   */
  constructor (named, exact, diff) {
    /**
     * The closest named color's RGB hex value
     * @type {String}
     */
    this.color = `#${ named[0] }`;

    /**
     * The closest named color's name
     * @type {String}
     */
    this.name = named[1];

    /**
     * The RGB hex value of the closest named color's shade
     * @type {[type]}
     */
    this.shade = shadergb(named[2]);

    /**
     * The name of the closest named color's shade
     * @type {String}
     */
    this.shadeName = named[2];

    /**
     * True if the closest named color match IS the same color
     * @type {Boolean}
     */
    this.exact = exact;

    /**
     * The numerical difference weight between the color and this named color
     * match.
     * @type {Number}
     */
    this.diff = diff;
  }
}

export default ColorMatch;
