import { emptyObjectIfNull } from './objectHelper';

describe('emptyObjectIfNull', () => {
  it('oggetto null', () => {
    const obj = null;

    const result = emptyObjectIfNull(obj);

    expect(result).toEqual({});
  });

  it('oggetto vuoto', () => {
    const obj = {};

    const result = emptyObjectIfNull(obj);

    expect(result).toEqual({});
  });

  it('oggetto pieno', () => {
    const obj = { a: 1 };

    const result = emptyObjectIfNull(obj);

    expect(result).toEqual({ a: 1 });
  });
});
