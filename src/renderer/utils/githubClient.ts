import GitHubApi         from 'github-api'
import Constant          from '../constants'
// import Promise           from 'bluebird'

export default class GithubClient {
  constructor (credentials) {
    this.client = new GitHubApi({
      username: credentials.username,
      token: credentials.password
    })
    this.me = this.client.getUser()
  }

  verifyLoginStatus (callback) {
    this.me.getProfile(function (err, res) {
      callback(err, res)
    })
  }

  getStarredRepos (callback) {
    this.me.listStarredRepos(function (err, res) {
      callback(err, res)
    })
  }
}
