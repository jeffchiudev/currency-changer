import Exchange from '../src/services/exchange-service';

describe('Exchange', () => {
  let exchange1;
  beforeEach(() => {
    exchange1 = new Exchange();
  });

  test('Should correctly make API call to ExchangeRate-API', () => {
    expect(exchange1.response).toEqual('success');
  })
})