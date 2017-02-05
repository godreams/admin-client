export default class AppStateService {
  static load (that) {
    let authorizationToken = window.localStorage.authorizationToken

    if (typeof(authorizationToken) === 'string') {
      that.props.appState.authorization.token = authorizationToken
    }
  }
}
