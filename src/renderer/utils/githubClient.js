import GitHubApi from "github-api";
import Constant from "../constants";
import Promise from "bluebird";

export default class GithubClient {
    constructor(credentials) {
        this.client = new GitHubApi({
            username: credentials.username,
            token: credentials.password
        });
        this.me = this.client.getUser();
    }

    _getRepoInstance = fullName => {
        const namePieces = fullName.split("/");
        return this.client.getRepo(namePieces[0], namePieces[1]);
    };

    getMyProfile = () => {
        return this.me.getProfile().then(ret => ret.data);
    };

    getStarredRepos = () => {
        // return this.me.listStarredRepos() // this method only fetch repos sorted by 'updated', but we need the order of starred time desc

        // ugly hack
        const user = this.me;
        let requestOptions = user._getOptionsWithDefaults({ sort: "created" });
        return user._requestAllPages(
            user.__getScopedUrl("starred"),
            requestOptions,
            null
        );
    };

    starStarCabinet = () => {
        const repo = this.client.getRepo("thundernet8", "StarCabinet");
        return repo.star();
    };

    getRepoReadMe = (fullName, defaultBranch = "master") => {
        const repo = this._getRepoInstance(fullName);
        return repo.getReadme(defaultBranch, true).then(ret => ret.data);
    };

    getRepoContributors = fullName => {
        const repo = this._getRepoInstance(fullName);
        return repo.getContributors().then(ret => ret.data);
    };
}
