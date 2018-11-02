import AcidTrail from '../../../modules/acid-trail/AcidTrail';
import expected from './AcidTrail.expected.json';

const expecteds = [
  {
    name:     'sha1',
    expected: expected.sha1
  },
  {
    name:     'sha256',
    expected: expected.sha256
  },
  {
    name:     'sha384',
    expected: expected.sha384
  },
  {
    name:     'md5',
    expected: expected.md5
  }
];

const testExpected = ({ expected, method, params, property, map, transform }) => {
  test(`${method} using ${JSON.stringify(params)}`, () => {
    let result = AcidTrail[method](params);

    if (map && result && result.map) {
      result = result && result.map(map);
    }

    if (transform) {
      result = transform(result);
    }

    expect(result).toEqual(expected.expected[property]);
  });
};

const testHash = (expected) => {
  return testExpected({
    expected,
    method: 'hash',
    params: {
      string:     'A',
      algorithm:  expected.name && expected.name.toUpperCase()
    },
    property: 'hash'
  });
};

const testPad = (expected) => {
  return testExpected({
    expected,
    method:   'pad',
    params:   expected.expected.hash,
    property: 'pad'
  });
};

const testColors = (expected) => {
  return testExpected({
    expected,
    method:   'colors',
    params:   expected.expected.pad,
    property: 'colors',
    map:      (color) => color.hex.substr(1)
  });
};

const testTrail = (expected) => {
  return testExpected({
    expected,
    method:     'trail',
    params:     expected.expected.hash,
    property:   'trail',
    transform:  (trail) => ({
      hashColors:  trail.hashColors,
      colors:      trail.colors(),
      matchcolors: trail.matchcolors(),
      matchnames:  trail.matchnames()
    })
  });
};

describe('AcidTrail', () => {

  describe('hash', () => {

    expecteds.forEach(
      (expected) => {
        return testHash(expected);
      }
    );

    testHash({
      expected: expected.sha1
    });

  });

  describe('pad', () => {

    expecteds.forEach(
      (expected) => testPad(expected)
    );

  });

  describe('colors', () => {

    expecteds.forEach(
      (expected) => testColors(expected)
    );

  });

  describe('trail', () => {

    expecteds.forEach(
      (expected) => testTrail(expected)
    );

    describe('makeSet', () => {
      const trail = AcidTrail.trail(
        expected.sha1.hash
      );

      const makeTestColorSet = trail.makeSet(
        'testColorSet',
        (color) => color.match.color
      ).bind(trail);

      test('callback and length', () => {
        const testColorSet = makeTestColorSet(
          {
            length:   3,
            callback: (colorSet) => {
              return colorSet.map(
                (color) => ({ color })
              );
            }
          }
        );

        expect(testColorSet).toEqual(expected.sha1.makeSet);
      });

      test('pre-existing set and length', () => {
        const testColorSetExists = makeTestColorSet(
          {
            length:   4
          }
        );

        expect(testColorSetExists).toEqual(
          expected.sha1.trail.matchcolors.slice(0, 4)
        );
      });

      test('pre-existing set, callback', () => {
        const testColorSetNoLength = makeTestColorSet(
          {
            callback: (colorSet) => colorSet.slice()
          }
        );

        expect(testColorSetNoLength).toEqual(
          expected.sha1.trail.matchcolors
        );
      });

    });

  });

});
