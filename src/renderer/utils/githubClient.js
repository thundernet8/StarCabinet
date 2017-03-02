import GitHubApi         from 'github-api'
import Constant          from '../constants'
import Promise           from 'bluebird'

export default class GithubClient {
  constructor (credentials) {
    this.client = new GitHubApi({
      username: credentials.username,
      token: credentials.password
    })
    this.me = this.client.getUser()
  }

  getMyProfile () {
    return this.me.getProfile().then((ret) => ret.data)
  }

  getStarredRepos () {
    return this.me.listStarredRepos()
  }
}
