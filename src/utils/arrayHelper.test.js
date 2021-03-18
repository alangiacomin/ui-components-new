import '../../tests/container';
import { emptyArrayIfNull } from './arrayHelper';

describe('emptyArrayIfNull', () => {
  it('oggetto null', () => {
    const arr = null;

    const result = emptyArrayIfNull(arr);

    expect(result).toEqual([]);
  });

  it('oggetto vuoto', () => {
    const arr = [];

    const result = emptyArrayIfNull(arr);

    expect(result).toEqual([]);
  });

  it('oggetto pieno', () => {
    const arr = [1, 2, 3];

    const result = emptyArrayIfNull(arr);

    expect(result).toEqual([1, 2, 3]);
  });
});
