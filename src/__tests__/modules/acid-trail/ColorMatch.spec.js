import NTC from '../../../modules/acid-trail/NTC';
import ColorMatch from '../../../modules/acid-trail/ColorMatch';

describe('ColorMatch', () => {

  test('colormatch', () => {

    const name = NTC.names[0];
    const match = new ColorMatch(name, true, 0);

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

    describe('color', () => {
      expect(match.color).toEqual(expected.color);
      expect(match.color).toEqual(expected.colorString);
    });

    describe('name', () => {
      expect(match.name).toEqual(expected.name);
      expect(match.name).toEqual(expected.nameString);
    });

    describe('shade', () => {
      expect(match.shade).toEqual(expected.shade);
      expect(match.shade).toEqual(expected.shadeString);
    });

    describe('shadeName', () => {
      expect(match.shadeName).toEqual(expected.shadeName);
      expect(match.shadeName).toEqual(expected.shadeNameString);
    });

    describe('exact', () => {
      expect(match.exact).toEqual(expected.exact);
    });

    describe('diff', () => {
      expect(match.diff).toEqual(expected.diff);
    });

  });

});
