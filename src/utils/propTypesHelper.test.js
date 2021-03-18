import { nullComponent } from './propTypesHelper';

describe('nullComponent', () => {
  it('deve essere una funzione (componente)', () => {
    const obj = nullComponent;

    expect(typeof obj).toEqual('function');
  });

  it('deve restituire null', () => {
    const obj = nullComponent;

    const result = obj();

    expect(result).toEqual(null);
  });
});
