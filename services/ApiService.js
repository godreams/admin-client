import 'whatwg-fetch'

export default class ApiService {
  constructor (token) {
    this.token = token
    this.baseUrl = 'http://localhost:3001'
  }

  headers () {
    if (this.token) {
      return {Authorization: this.token}
    } else {
      return {}
    }
  }

  fetch (path) {
    console.log('Calling ' + this.fullUrl(path))
    return fetch(this.fullUrl(path), {
      headers: this.headers()
    }).then(function(response) {
      let parseResponse = response.json()

      if (response.ok) {
        return parseResponse
      } else {
        return parseResponse.then(parsedResponse => Promise.reject(parsedResponse))
      }
    })
  }

  fullUrl (path) {
    return [this.baseUrl, path].join('/')
  }
}
