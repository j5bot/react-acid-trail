import NTC, {
  cleanColor,
  colormatch,
  hsl,
  init,
  match,
  rgb,
  shadergb,
  sort
} from '../../../modules/acid-trail/NTC';

describe('NTC', () => {

  const colors = [
    '000000',
    '010101',
    '111111',
    '020202',
    '222222',
    '030303',
    '333333',
    '040404',
    '444444',
    '050505',
    '555555',
    '060606',
    '666666',
    '070707',
    '777777',
    '080808',
    '888888',
    '090909',
    '999999',
    '0A0A0A',
    'AAAAAA',
    '0B0B0B',
    'BBBBBB',
    '0C0C0C',
    'CCCCCC',
    '0D0D0D',
    'DDDDDD',
    '0E0E0E',
    'EEEEEE',
    '0F0F0F',
    'FFFFFF'
  ];

  /**
   * Test whether colormatch returns an object with the required properties.
   * Specifically the method should return something which implements the
   * ColorMatch class' interface.
   */
  describe('colormatch', () => {

    const name = NTC.names[0];
    const match = colormatch(
      name,
      true,
      0
    );

    const expected = {
      color:           `#${ name[0] }`,
      colorString:     '#000000',
      name:            name[1],
      nameString:      'Black',
      shade:           `#${ name[0] }`,
      shadeString:     '#000000',
      shadeName:       name[2],
      shadeNameString: 'Black',
      exact:           true,
      diff:            0
    };

    test('color', () => {
      expect(match.color).toEqual(expected.color);
      expect(match.color).toEqual(expected.colorString);
    });

    test('name', () => {
      expect(match.name).toEqual(expected.name);
      expect(match.name).toEqual(expected.nameString);
    });

    test('shade', () => {
      expect(match.shade).toEqual(expected.shade);
      expect(match.shade).toEqual(expected.shadeString);
    });

    test('shadeName', () => {
      expect(match.shadeName).toEqual(expected.shadeName);
      expect(match.shadeName).toEqual(expected.shadeNameString);
    });

    test('exact', () => {
      expect(match.exact).toEqual(expected.exact);
    });

    test('diff', () => {
      expect(match.diff).toEqual(expected.diff);
    });

  });

  /**
   * Test whether initializing named colors works and is able to expand any
   * color/name pair into an initialized named color.
   */
  describe('init', () => {

    // the expected length of a valid named color array
    const expectedLength = 9;

    // first color -- black
    const expectedName = NTC.names[0];
    // actual black
    const expected = [
      '000000',
      'Black',
      'Black',
      0, 0, 0,
      0, 0, 0
    ];
    const expectedNoName = [
      'FF0000',
      'NO COLOR NAME',
      'Red',
      255, 0, 0,
      0, 255, 127.5
    ];

    let noname = [
      'FF0000'
    ];

    // un-initialized black
    let name = [
      '000000',
      'Black',
      'Black'
    ];

    /**
     * Test whether initializing a named color without only a color results in
     * an otherwise complete value.
     */
    describe('unnamed color', () => {
      const initted = init([noname])[0];

      test('no color name length', () => {
        expect(initted).toHaveLength(expectedLength);
      });
      test('no color name values', () => {
        expect(initted).toEqual(expectedNoName);
      });
    });

    /**
     * Concat the concat parameter to the name, comparing the value after init,
     * and returning the expanded (concatted) version of the name.
     *
     * @param  {Array} name       An array representation of a color value
     * @param  {Any} add          A value to add to the color value array
     * @param  {Array} expected   The expected color value array
     * @return {Array}            The original array name with the add value
     *                            added
     */
    const concatAndExpectName = (name, add, expected) => {
      const initted = init([name])[0];

      test('initted length', () => {
        expect(initted).toHaveLength(expectedLength);
      });
      test('initted value', () => {
        expect(initted).toEqual(expectedName);
        expect(initted).toEqual(expected);
      });

      name = name.slice();
      name.push(add);
      return name;
    };

    const testInitName = () => {
      name = concatAndExpectName(name, 0, expected);
    };

    let timesTested = -1;

    while (timesTested++ < 6) {
      describe(`name.length === ${ timesTested + 3 }`, testInitName); // (name) => testInitName(name));
    }

  });

  /**
   * Test whether named color sorting works properly, including sorting all
   * variations of an ABC set into ABC and a set ABA with duplicates into AAB.
   */
  describe('sort', () => {

    // ABC
    const sorted = [
      [ '000000', 'Black', 'Black', 0, 0, 0, 0, 0 ],
      [ 'FF0000', 'Red', 'Red', 255, 0, 0, 0, 255, 127.5 ],
      [ 'FFFFFF', 'White', 'White', 255, 255, 255, 0, 0, 255 ]
    ];

    // ABC => ABC
    const ABC = sorted;

    // ABC => BAC, A >> 1
    const BAC = [ sorted[1], sorted[0], sorted[2] ];

    // ABC => BCA, A >> 2
    const BCA = [ sorted[1], sorted[2], sorted[0] ];

    // ABC => ACB, B >> 1
    const ACB = [ sorted[0], sorted[2], sorted[1] ];

    // ABC => CAB, B >> 1, A >> 1
    const CAB = [ sorted[2], sorted[0], sorted[1] ];

    // ABC => CBA, B >> 1, A >> 2
    const CBA = [ sorted[2], sorted[1], sorted[0] ];

    // DUPLICATES :)
    const AAB = [ sorted[0], sorted[0], sorted[1] ];
    const ABA = [ sorted[0], sorted[1], sorted[0] ];

    const orders = {
      ABC,
      BAC,
      BCA,
      ACB,
      CAB,
      CBA
    };

    let key;
    const keys = Object.keys(orders);

    const testSort = (key, toSortSorted) => {
      test(`${key} sorts to ABC`, () => {
        expect(toSortSorted).toEqual(sorted);
      });
    };

    while ((key = keys.pop())) {
      testSort(key, sort(orders[key]));
    }

    test('duplicates sort ABA to AAB', () => {
      expect(sort(ABA)).toEqual(AAB);
    });

  });

  /**
   * For our test color set, check whether the RGB values returned are as
   * expected.
   */
  describe('rgb', () => {

    const expected = [
      [ 0, 0, 0 ],
      [ 1, 1, 1 ],
      [ 17, 17, 17 ],
      [ 2, 2, 2 ],
      [ 34, 34, 34 ],
      [ 3, 3, 3 ],
      [ 51, 51, 51 ],
      [ 4, 4, 4 ],
      [ 68, 68, 68 ],
      [ 5, 5, 5 ],
      [ 85, 85, 85 ],
      [ 6, 6, 6 ],
      [ 102, 102, 102 ],
      [ 7, 7, 7 ],
      [ 119, 119, 119 ],
      [ 8, 8, 8 ],
      [ 136, 136, 136 ],
      [ 9, 9, 9 ],
      [ 153, 153, 153 ],
      [ 10, 10, 10 ],
      [ 170, 170, 170 ],
      [ 11, 11, 11 ],
      [ 187, 187, 187 ],
      [ 12, 12, 12 ],
      [ 204, 204, 204 ],
      [ 13, 13, 13 ],
      [ 221, 221, 221 ],
      [ 14, 14, 14 ],
      [ 238, 238, 238 ],
      [ 15, 15, 15 ],
      [ 255, 255, 255 ]
    ];

    let index = -1;
    const end = colors.length - 1;

    const testRGB = (index) => {
      test(`${colors[index]} is ${JSON.stringify(expected[index])}`, () => {
        expect(rgb(colors[index])).toEqual(expected[index]);
      });
    };

    while (index++ < end) {
      testRGB(index);
    }

  });

  /**
   * For our test color set, check whether hsl returns the expected values
   */
  describe('hsl', () => {

    const expected = [
      [ 0, 0, 0 ],
      [ 0, 0, 1 ],
      [ 0, 0, 17 ],
      [ 0, 0, 2 ],
      [ 0, 0, 34 ],
      [ 0, 0, 3 ],
      [ 0, 0, 51 ],
      [ 0, 0, 4 ],
      [ 0, 0, 68 ],
      [ 0, 0, 5 ],
      [ 0, 0, 85 ],
      [ 0, 0, 6 ],
      [ 0, 0, 102 ],
      [ 0, 0, 7 ],
      [ 0, 0, 119 ],
      [ 0, 0, 8 ],
      [ 0, 0, 136 ],
      [ 0, 0, 9 ],
      [ 0, 0, 153 ],
      [ 0, 0, 10 ],
      [ 0, 0, 170 ],
      [ 0, 0, 11 ],
      [ 0, 0, 187 ],
      [ 0, 0, 12 ],
      [ 0, 0, 204 ],
      [ 0, 0, 13 ],
      [ 0, 0, 221 ],
      [ 0, 0, 14 ],
      [ 0, 0, 238 ],
      [ 0, 0, 15 ],
      [ 0, 0, 255 ]
    ];

    let index = -1;
    const end = colors.length - 1;

    const testHSL = (index) => {
      test(`${colors[index]} is ${JSON.stringify(expected[index])}`, () => {
        expect(hsl(colors[index])).toEqual(expected[index]);
      });

    };

    while (index++ < end) {
      testHSL(index);
    }

  });

  /**
   * Test whether the RGB hex value for a given shade name is returned
   */
  describe('shadergb', () => {

    const shades = [
      'Red',
      'Blue',
      'Yellow',
      'Green',
      'Black',
      'White',
      'Grey',
      'Invalid'
    ];

    const expected = [
      '#FF0000',
      '#0000FF',
      '#FFFF00',
      '#008000',
      '#000000',
      '#FFFFFF',
      '#808080',
      '#000000'
    ];

    let index = -1;
    let end = shades.length - 1;

    const testShadeRgb = (index) => {

      test(`${shades[index]} is ${expected[index]}`, () => {
        expect(shadergb(shades[index])).toEqual(expected[index]);
      });

    };

    while (index++ < end) {
      testShadeRgb(index);
    }

  });

  /**
   * Test whether all relevant variations of string input return either false or
   * the RRGGBB value for a given color string.
   */
  describe('cleanColor', () => {

    const colors = [
      0,
      '0', // single
      '#0', // #single
      'ZZ0#?', // GIGO single
      '12', // double
      '#12', // #double
      '*@#%@#12IO{PPOU0SJJ*', // GIGO double
      '123', // triple
      '#123', // #triple
      '@#123OUI(*)', // GIGO? triple
      '456A', // quad
      '#456A', // #quad,
      '@#%#@POIUPIUP456A@#$#00#@#@#', // GIGO? quad
      '789AB', // five
      '#789AB', // #five
      '@#%#$@789ABOPUPOU', // GIGO? five
      '000000', // six
      '#000000', // #six
      '$@#RWRTWWQR000000WEORPWREW', // GIGO? six
      '000000A', // seven
      '#000000A', // #seven
      '$#$TWRWR000000AWPOWEI', // GIGO? seven
      '000000AB', // eight
      '#000000AB', // #eight
      '@#%#$@#$T000000AB#$#$TWET', // GIGO? eight
      '000000ABC', // nine
      '#000000ABC', // #nine
      'RTRTTW000000ABCPWUEPWUWP', // GIGO? nine
      '000000ABCD' // ten
    ];

    const expected = [
      false, // number
      false,
      false,
      false, // single
      false,
      false,
      false, // double
      '112233',
      '112233',
      '112233', // triple
      '445566',
      '445566',
      '445566', // quad
      '778899',
      '778899',
      '778899', // five
      '000000',
      '000000',
      '000000', // six
      '000000',
      '000000',
      '000000', // seven
      '000000',
      '000000',
      '000000', // eight
      '000000',
      '000000',
      '000000', // nine
      '000000' // ten
    ];

    let index = -1;
    const end = colors.length - 1;

    const testCleanColor = (index) => {
      test(`${colors[index]} is ${expected[index]}`, () => {
        expect(cleanColor(colors[index])).toEqual(expected[index]);
      });
    };

    while (index++ < end) {
      testCleanColor(index);
    }

  });

  describe('match', () => {

    describe('invalid match', () => {

      const invalid = match('Bob');
      const expected = {
        color:     '#000000',
        name:      'Invalid Color Name',
        shade:     '#000000',
        shadeName: 'Invalid'
      };

      test('color', () => {
        expect(invalid.color).toEqual(expected.color);
      });
      test('name', () => {
        expect(invalid.name).toEqual(expected.name);
      });
      test('shade', () => {
        expect(invalid.shade).toEqual(expected.shade);
      });
      test('shade name', () => {
        expect(invalid.shadeName).toEqual(expected.shadeName);
      });
    });

    describe('color matches', () => {

      const testMatched = (color, matched) => {
        describe(`color has match:
          ${color} matches ${matched.color} (${matched.name})
          with difference of ${matched.diff}`,
        () => {

          test('color name is not invalid', () => {
            expect(matched.name.indexOf('Invalid')).toEqual(-1);
          });
          test('color shade name is not invalid', () => {
            expect(matched.shadeName.indexOf('Invalid')).toEqual(-1);
          });

          describe('exactness', () => {
            if (color === cleanColor(matched.color)) {
              test('match is exact', () => {
                expect(matched.exact).toEqual(true);
              });
            } else {
              test('not an exact match', () => {
                expect(matched.exact).toEqual(false);
              });
            }
          });

        });
      };

      colors.concat(
        [
          // non-black colors!
          'F0F0F0',
          'E800F2'
        ]
      ).forEach(
        (color) => testMatched(color, match(color))
      );

    });

  });

});
