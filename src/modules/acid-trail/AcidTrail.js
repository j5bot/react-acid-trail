/*
Original NTC (name that color) code copyright (c) 2013 Chirag Mehta
Licensed under the MIT License by special permission.

Modifications copyright (c) 2013 Jonathan Cook
Licensed under the MIT License
*/
/* globals CryptoJS */
import ntc from './NTC';

export class AcidTrail {

  pad (hash) {
    return `${hash}${
      hash % 6 ?
        new Array(6 - hash.length + 1).join('8') :
        ''
    }`;
  }

  hash ({
    string,
    algorithm = 'SHA1'
  }) {

    if (!(CryptoJS && CryptoJS[algorithm])) {
      throw new Error(`Cannot hash without CryptoJS and CryptoJS.${algorithm}`);
    }

    return CryptoJS[algorithm](string).toString();

  }

  colors (hash) {
    let color;
    const colors = new Array(hash.length / 6);

    for (let i; i < colors.length; i++) {
      color = hash.substr(i * 6, 6);
      colors[i] = {
        hex:   `#${color}`,
        match: ntc.match(color)
      };
    }

    return colors;
  }

  trail (hash) {
    hash = this.pad(hash);
    return new Trail(this.colors(hash));
  }

}

export class Trail {
  constructor (colors) {
    this.hashColors = colors;
    this.colors = this.makeSet(
      'colorSet',
      (color) => color.hex()
    );
    this.matchcolors = this.makeSet(
      'matchColorSet',
      (color) => color.match.color()
    );
    this.matchnames = this.makeSet(
      'matchColorNameSet',
      (color) => color.match.name()
    );
  }

  makeSet (set, getter) {
    return ({ length, callback }) => {
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

// export const OldAcidTrail = (function () {
//
//   var acidDefaultOptions = { algorithm: "SHA1" };
//
//   function acid(options) {
//
//     if (!CryptoJS) {
//       throw new Error("CryptoJS is required to use acid-trail.");
//     }
//
//     this.options = acidDefaultOptions;
//
//     for (var p in options) {
//       if (options.hasOwnProperty(p)) {
//         this.options[p] = options[p];
//       }
//     }
//
//   }
//   acid.prototype = {
//     trail: function (o) {
//       var hash;
//
//       hash = CryptoJS[this.options.algorithm](o).toString();
//
//       if (hash.length % 6 > 0) {
//         // we'll pad the hash with 8 which is a neutral color value
//         // we get the length as 6 (length of color) less the number of characters we can take from the hash
//         // +1 length array join with the fill character gives us a padding string
//         hash += new Array(6 - (hash.length % 6) + 1).join("8");
//       }
//
//       return new trail(this.colors(hash));
//     },
//
//     colors: function (hash) {
//       var colors = new Array(Math.ceil(hash.length / 6));
//       for (var i = 0, l = colors.length; i < l; i++) {
//           colors[i] = { hex: "#" + hash.substr(i * 6, 6) };
//           colors[i].match = ntc.name(colors[i].hex);
//       }
//       return colors;
//     }
//   };
//
//   function trail(colors) {
//     this._colors = colors;
//     this.length = colors.length;
//   }
//   trail.prototype = {
//     colors: function (length, func) {
//       if (!this._colorSet) {
//         this._colorSet = this._colors.map(function (v,i,a) {
//           return v.hex.toLowerCase();
//         });
//       }
//       if (func) {
//         return func.call(this._colorSet.slice(0,length || this._colors.length));
//       } else {
//         return this._colorSet.slice(0,length || this._colors.length);
//       }
//     },
//     matchcolors: function (length) {
//       if (!this._matchColors) {
//         this._matchColors = this._colors.map(function (v,i,a) {
//           return v.match.color.toLowerCase();
//         });
//       }
//       return this._matchColors.slice(0, length || this._matchColors.length);
//     },
//     colorString: function (length, separator) {
//       return this.matchcolors(length).join(separator || " ");
//     },
//     name: function (length, separator) {
//       if (!this.names) {
//         this.names = this._colors.map(function (v,i,a) {
//           return v.match.name;
//         });
//       }
//       return this.names.slice(0, length || this.names.length).join(separator || "-");
//     }
//   };
//
//   ntc = new NTC();
//
//   return acid;
//
// })();
