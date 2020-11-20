export default class Exchange {
  static async exchangeMoney(currencyType) {
    return fetch (`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currencyType}`)
      .then(function(response) {
        if(!response.ok) {
          throw Error(response);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error);
      });
  }
}