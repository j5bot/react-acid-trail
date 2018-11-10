/**
 * NTC (name that color) module implements Chirag Mehta's NTC code and Jonathan
 * Cook's extensions to that code in ES6.
 *
 * In a nutshell, NTC takes an RGB hex color value and matches it with the
 * closest named color in it's collection of named colors.
 *
 * @module NTC
 */
/*
Original NTC (name that color) code copyright (c) 2013 Chirag Mehta
Licensed under the MIT License by special permission.

Extended with new methods and adapted to ES6 by Jonathan Cook
*/
import colors from './colors';
import ColorMatch from './ColorMatch';

let { shades, names } = colors;

/**
 * Function which returns a {@link ColorMatch} containing properties
 * representing a named color which has most closely matched a given RGB hex
 * color which was provided to the {@link name} function.
 *
 * @param  {Array} name     An array containing properties of a named color
 * @param  {Boolean} exact  Boolean indicating whether the match is exact
 * @param  {Number} diff    The difference weight between the color and the
 *                          match
 * @return {ColorMatch}     A {@link ColorMatch} describing the named color
 *                          match.
 */
export const colormatch = (name, exact, diff) => {
  return new ColorMatch(name, exact, diff);
};

/**
 * Function which initializes a named color set represented as an array of
 * colors represented as arrays containing:
 * - Hex RGB color [0]
 * - Color name [1]
 * - Color shade name [2]

 * Colors are initialized by adding individual R,G,B and H,S,L values as needed.

 * @return {Array} An array of colors represented as arrays containing:
 * - Hex RGB color [0]
 * - Color name [1]
 * - Color shade name [2]
 * - Red value [3]
 * - Green value [4]
 * - Blue value [5]
 * - Hue value [6]
 * - Saturation value [7]
 * - Lightness value [8]
 */
export const init = (names) => {
  return names.map(
    (name) => {
      const color = name[0];

      // handle error cases
      if (name.length === 1) {
        name.push('NO COLOR NAME');
      }
      if (name.length === 2) {
        // console.log('color', color, '\n\n\n\n\n\n\n\n');
        name.push(
          matchShade(color)
            .shadeName
        );
      }
      // add rgb as needed
      if (name.length < 6) {
        name = name.slice(0, 3).concat(rgb(color));
      }
      // add hsl as needed
      if (name.length < 9) {
        name = name.slice(0, 6).concat(hsl(color));
      }

      return name;
    }
  );
};

/**
 * Copy and sort the provided 'names' array by RGB and HSL values
 * @return {Array} A copy of the provided 'names' sorted by RGB and HSL values
 */
export const sort = (names) => {
  const sorted = names.slice().sort(
    (aaa, bbb) => {
      for (let i = 3; i < 9; i++) {
        if (aaa[i] !== bbb[i]) {
          return aaa[i] - bbb[i];
        }
      }
      return 0;
    }
  );

  return sorted;
};

/**
 * Return the RGB values as decimal integers, given a string RGB hex value.
 *
 * @param  {String} color A String representation of an RGB hex color value.
 * @return {Array}        An array containing R,G,B values as decimal integers.
 */
export const rgb = (color) => {
  return [
    parseInt(color.substr(0, 2), 16),
    parseInt(color.substr(2, 2), 16),
    parseInt(color.substr(4, 2), 16)
  ];
};

/**
 * Return the HSL values as an array, given the RGB hex color.
 * taken from https://github.com/eligrey/color.js (MIT License)
 *
 * @param  {String} color String representation of an RGB hex color value.
 * @return {Array}        An array containing hue, saturation, and lightness
 *                        values as integers.
 */
export const hsl = (color) => {

  const colorRgb = rgb(color);
  let red = colorRgb[0],
      green = colorRgb[1],
      blue = colorRgb[2];

  red /= 255;
  green /= 255;
  blue /= 255;

  var max = Math.max(red, green, blue),
      min = Math.min(red, green, blue),
      hue,
      sat,
      light = (max + min) / 2;

  if (max === min) {
    hue = sat = 0; // achromatic
  } else {
    const diff = max - min;

    sat = light > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    switch (max) {
    default: break;
    case red: hue = (green - blue) / diff + (green < blue ? 6 : 0); break;
    case green: hue = (blue - red) / diff + 2; break;
    case blue: hue = (red - green) / diff + 4; break;
    }
    hue /= 6;
  }

  return [ hue * 255, sat * 255, light * 255 ];
};

/**
 * Given the color shade name as a string, such as 'Red', return the string RGB
 * hex color value in the format '#RRGGBB'.
 *
 * If no match is found, return '#000000' (black).
 *
 * @param  {String} shadename Descriptive name of the color shade.
 * @return {String}           String RGB hex color value in the format
 *                            '#RRGGBB'.
 */
export const shadergb = (shadename) => {
  // return the first matching shade's RGB value, or the default
  return shades
    // filter matching shades
    .filter(
      (shade) => shadename === shade[1]
    )
    // get only the RGB value of the matching shades
    .map(
      (shade) => `#${shade[0]}`
    )
    // add a default RGB value
    // and get the first value in the array
    .concat('#000000')[0];

};

/**
 * Clean up an RGB hex color value and make sure it is 6 and only 6 hex digits.
 *
 * @param  {String} color RGB hex color value to be cleaned.
 * @return {String}       Cleaned and normalized RGB hex color value or FALSE if
 *                        an invalid initial value was given.
 */
export const cleanColor = (color) => {
  if (typeof color !== 'string') {
    return false;
  }
  // take the first 1-6 hex characters and uppercase them,
  // discarding prefix, suffix, etc.
  color = color.replace(/.*?([0-9ABCDEF]{1,6}).*/ig, '$1').toUpperCase();

  // for color lengths less than 6, change RGB* to RRGGBB
  color = color.length === 6 ?
    color :
    (
      // for color lengths greater than or equal to 3, double up
      // the color digits, e.g. RGB becomes RRGGBB
      color.length >= 3 ?
        color.replace(/(.{1})(.{1})(.{1}).*/ig, '$1$1$2$2$3$3') :
        false
    );

  return color;
};

/**
 * Return an object representing an invalid color match
 *
 * @return {ColorMatch}
 */
const createInvalidMatch = () => {
  return colormatch(
    [ '000000', 'Invalid Color Name', 'Invalid' ]
  );
};

/**
 * Get the difference between the color and the named color as the combined
 * RGB or HSL difference.
 *
 * @param  {Array} color  Color value as three-part array
 * @param  {Array} name   Named color value as three-part array
 * @return {Integer}      The difference in value as the combined difference
 *                        of each part.
 */
const getColorDiff = (color, name) => {
  const getPartDiff = createGetPartDiff(color, name);

  // red + green + blue or hue + sat + light
  return getPartDiff(0) + getPartDiff(1) + getPartDiff(2);
};

/**
 * Create a function to get the difference between color and named color part
 *
 * @param  {Array} color    Color value as three-part array
 * @param  {Array} name     Named color value as three-part array
 * @return {Function}       A function which computes the square of the
 *                          difference between the parts
 */
const createGetPartDiff = (color, name) =>
  (part) => {
    return Math.pow(
      color[part] - name[part],
      2
    );
  };

/**
 * Return a named color 'colormatch' for the given RGB hex color value.

 * @param  {String} color       String RGB hex color value in either the format
 *                              of '#RRGGBB' or 'RRGGBB'
 * @param  {Array}  namedColors Named color list from which to match
 * @return {ColorMatch}         An object representing the closest named color
 */
export const match = (color, namedColors) => {
  namedColors = namedColors || names;
  // trim before first occurence of # and use upper case
  color = cleanColor(color);

  if (!color) {
    return createInvalidMatch();
  }

  let newDiff,
      exact = false,
      closest = namedColors[0], // assume that black is the closest, maybe?
      diff = Number.POSITIVE_INFINITY; // really big difference, right?

  exact = !namedColors.every(
    (named) => {
      // if the match is exact, return immediately and don't check more
      if (color === named[0]) {
        closest = named;
        diff = 0;
        return false;
      }
      // rgb + hsl difference score
      newDiff = getColorDiff(
        rgb(color),
        named.slice(3, 6)
      ) + getColorDiff(
        hsl(color),
        named.slice(6, 9)
      ) * 2;

      // if this is closer, change the closest color
      if (newDiff < diff) {
        diff = newDiff;
        closest = named;
      }
      return true;
    }
  );

  return colormatch(closest, exact, diff);
};

/**
 * Return a {@link ColorMatch} representing the closest shade for the color
 *
 * @param  {String} color An RGB hex color value
 * @return {ColorMatch}   An object representing the closest matching shade
 */
export const matchShade = (color) => {
  // initialize and sort shades so they have RGB and HSL values
  const shadeColors = sort(
    init(
      shades.map(
        // shade's color and shade are the same, yo.
        (shade) => {
          const newShade = shade.slice();

          newShade.push(shade[1]);
          return newShade;
        }
      )
    )
  );

  return match(color, shadeColors);
};

/**
 * Return a colormatch representing whether black or white would be the better
 * text color to contrast with the given color.
 *
 * @param  {String}      color RGB hex color value
 * @return {ColorMatch}  colormatch for opposite text color
 */
export const textColor = (color) => {
  const textColors = sort(
    init(
      [ '000000', 'Black', 'Black' ],
      [ 'FFFFFF', 'White', 'White' ]
    )
  );

  const opposite = match(color, textColors);

  return colormatch(
    textColors.filter(
      (color) => {
        return color[0] !== opposite.color;
      }
    )[0]
  );
};

/**
 * Add a single color to the list of named colors.
 *
 * @param {Object} color       An object with `hex` and `name` properties to add
 *                             to the list of named colors.
 * @param {Array} [namedColors] The list of named colors to modify.
 *                              Defaults to the main named color list.
 * @returns {Array}             An array representing the named color added.
 */
export const addColor = (color, namedColors) => {
  return addColors([color], namedColors).colors[0];
};

/**
 * Create a new color and add it to the named color list without sorting.
 *
 * @param {Object} color        An object with `hex` and `name` properties.
 * @param {Array} [namedColors] List of named colors to add the new color to.
 *                              Defaults to the main named color list.
 * @returns {Object}            An object containing the new color list and the
 *                              named color that was added.
 */
const addNewColor = (color, namedColors) => {
  const { hex, name } = color;
  const shadeColor = matchShade(hex);

  const newColor = init([
    [
      cleanColor(hex),
      name,
      shadeColor.name
    ]
  ])[0];

  namedColors.push(newColor);
  return newColor;
};

/**
 * Add new named colors to the list of named colors and sort the updated list.
 * If the named color list to be updated is the main named color list, update it
 * in place.
 *
 * @param {Array} colors        An array of new colors containing `hex` and
 *                              `name` properties.
 * @param {Array} [namedColors] Named color list to add new colors to.
 *                              Defaults to the main named color list.
 * @returns {Object}            An object containing the new colors added and
 *                              the updated named color list.
 */
export const addColors = (colors, namedColors) => {
  namedColors = namedColors || names;
  const isMain = namedColors === names;

  colors = colors.map(
    (color) => addNewColor(color, namedColors)
  );

  namedColors = sort(namedColors);

  if (isMain) {
    names = namedColors;
  }

  return {
    colors,
    namedColors
  };
};

/**
 * Return a JSON representation of the main shade and named color lists
 *
 * @return {Object} Object with `shades` and `names`.
 */
export const dumpShadesAndNames = () => {
  return JSON.stringify(
    {
      shades,
      names
    },
    null,
    2
  );
};

export default {
  shades,
  names,
  init,
  sort,
  match,
  matchShade,
  addColor,
  addNewColor,
  addColors,
  dumpShadesAndNames
};
