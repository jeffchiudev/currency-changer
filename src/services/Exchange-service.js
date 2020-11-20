export default class Exchange {
  static async exchangeMoney(currency) {
    return fetch (`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
      .then(function(response) {
        if(!response.ok) {
          throw Error(response.error-type)
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error)
      })
  }
}