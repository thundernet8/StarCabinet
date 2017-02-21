import GitHubApi         from 'github'
import Constant          from '../constants'
import Promise           from 'bluebird'

export default class GithubClient {
  constructor(credentials) {
    this.client = new GitHubApi({
      debug: Constant.DEBUG,
      protocol: "https",
      host: "api.github.com", // should be api.github.com for GitHub
      pathPrefix: "/api/v3", // for some GHEs; none for GitHub
      headers: {
          "user-agent": "StarCabinet" // GitHub is happy with a unique user agent
      },
      Promise: Promise,
      followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
      timeout: 5000
    })

    this.client.authenticate({
      type: "basic",
      username: credentials.username,
      password: credentials.password
    })
  }

  getStarredRepos(callback) {
    this.client.activity.getStarredRepos({sort: updated}, function(err, res) {
      callback(res)
      console.log(JSON.stringify(res))
    })
  }
}
