import * as Database                from './database'
import * as CONSTANTS               from '../constants'
import Promise                      from 'bluebird'

export default class DBHandler {
    constructor (dbOrName) {
        if (typeof dbOrName === 'string') {
            this.dbName = dbOrName
        } else {
            this.RxDB = dbOrName
        }
    }

    checkInstance = () => {
        if (!this.RxDB) {
            throw new Error('You must call `initDB()` first')
        }
    }

    initDB = async () => {
        if (!this.RxDB) {
            this.RxDB = await Database.get(this.dbName, null)
        }

        return this
    }

    upsertProfile = async (profile) => {
        this.checkInstance()

        let meCollection = this.RxDB.me
        const doc = await meCollection.upsert({
            key: profile.id.toString(),
            id: profile.id,
            login: profile.login,
            avatarUrl: profile.avatar_url,
            gravatarId: profile.gravatar_id,
            url: profile.url,
            htmlUrl: profile.html_url,
            followersUrl: profile.followers_url,
            followingUrl: profile.following_url,
            gistsUrl: profile.gists_url,
            starredUrl: profile.starred_url,
            subscriptionsUrl: profile.subscriptions_url,
            organizationsUrl: profile.organizations_url,
            reposUrl: profile.repos_url,
            eventsUrl: profile.events_url,
            receivedEventsUrl: profile.receivedEvents_url,
            type: profile.type,
            siteAdmin: profile.site_admin,
            name: profile.name,
            company: profile.company,
            blog: profile.blog,
            location: profile.location,
            hireable: profile.hireable,
            publicRepos: profile.public_repos,
            publicGists: profile.public_gists,
            followers: profile.followers,
            following: profile.following,
            createdAt: profile.created_at,
            createdTime: parseInt((new Date(profile.created_at)) / 1000),
            updatedAt: profile.updated_at,
            updatedTime: parseInt((new Date(profile.updated_at)) / 1000),
            privateGists: profile.private_gists,
            totalPrivateRepos: profile.total_private_repos,
            ownedPrivateRepos: profile.owned_private_repos,
            diskUsage: profile.disk_usage,
            collaborators: profile.collaborators,
            twoFactorAuthentication: profile.two_factor_authentication,
            plan: {
                name: profile.plan.name,
                space: profile.plan.space,
                collaborators: profile.plan.collaborators,
                privateRepos: profile.plan.private_repos
            }
        })

        return doc
    }

    getProfile = async (username = '') => {
        this.checkInstance()

        let meCollection = this.RxDB.me
        let query = meCollection.findOne()
        if (username) {
            query = query.where('login').eq(username)
        }

        let doc = await query.exec()
        return doc.toJSON()
    }

    upsertRepos = async (repos) => {
        this.checkInstance()

        let reposCollection = this.RxDB.repos
        let inserts = []
        repos.forEach((repo) => {
            inserts.push(reposCollection.upsert({
                key: repo.id.toString(),
                id: repo.id,
                name: repo.name,
                fullName: repo.full_name,
                owner: repo.owner.id,
                private: repo.private,
                htmlUrl: repo.html_url,
                description: repo.description || '',
                fork: repo.fork,
                url: repo.url,
                forksUrl: repo.forks_url,
                keysUrl: repo.keys_url,
                collaboratorsUrl: repo.collaborators_url,
                teamsUrl: repo.teams_url,
                hooksUrl: repo.hooks_url,
                issueEventsUrl: repo.issue_events_url,
                eventsUrl: repo.events_url,
                assigneesUrl: repo.assignees_url,
                branchesUrl: repo.branches_url,
                tagsUrl: repo.tags_url,
                blobsUrl: repo.blobs_url,
                gitTagsUrl: repo.git_tags_url,
                gitRefsUrl: repo.git_refs_url,
                treesUrl: repo.trees_url,
                statusesUrl: repo.statuses_url,
                languagesUrl: repo.languages_url,
                stargazersUrl: repo.stargazers_url,
                contributorsUrl: repo.contributors_url,
                subscribersUrl: repo.subscribers_url,
                subscriptionUrl: repo.subscription_url,
                commitsUrl: repo.commits_url,
                gitCommitsUrl: repo.git_commits_url,
                commentsUrl: repo.comments_url,
                issueCommentUrl: repo.issue_comment_url,
                contentsUrl: repo.contents_url,
                compareUrl: repo.compare_url,
                mergesUrl: repo.merges_url,
                archiveUrl: repo.archive_url,
                downloadsUrl: repo.downloads_url,
                issuesUrl: repo.issues_url,
                pullsUrl: repo.pulls_url,
                milestonesUrl: repo.milestones_url,
                notificationsUrl: repo.notifications_url,
                labelsUrl: repo.labels_url,
                releasesUrl: repo.releases_url,
                deploymentsUrl: repo.deployments_url,
                createdAt: repo.created_at,
                createdTime: parseInt((new Date(repo.created_at)) / 1000),
                updatedAt: repo.updated_at,
                updatedTime: parseInt((new Date(repo.updated_at)) / 1000),
                pushedAt: repo.pushed_at,
                pushedTime: parseInt((new Date(repo.pushed_at)) / 1000),
                gitUrl: repo.git_url,
                sshUrl: repo.ssh_url,
                cloneUrl: repo.clone_url,
                svnUrl: repo.svn_url,
                homePage: repo.homepage || '',
                size: repo.size,
                stargazersCount: repo.stargazers_count,
                stars: repo.stargazers_count,
                watchersCount: repo.watchers_count,
                lang: repo.language || 'Unknown',
                hasIssues: repo.has_issues,
                hasDownloads: repo.has_downloads,
                hasWiki: repo.has_wiki,
                hasPages: repo.has_pages,
                forksCount: repo.forks_count,
                // mirrorUrl: repo.mirror_url,
                openIssuesCount: repo.open_issues_count,
                forks: repo.forks,
                openIssues: repo.open_issues,
                watchers: repo.watchers,
                defaultBranch: repo.default_branch,
                permissions: repo.permissions
                // SCTags: [], // add them in a update method
                // SCCategories: [],
                // score: 0,
                // flag: false,
                // read: false,
                // remark: ''
            }))
        })

        return Promise.all(inserts)
    }

    upsertLanguages = async (repos) => {
        this.checkInstance()

        let langsCollection = this.RxDB.languages

        await langsCollection.find().remove() // clean the collection

        let langs = {
            _Unknown: []
        }
        repos.forEach((repo) => {
            if (!repo.language) {
                langs['_Unknown'].push(repo.id)
            } else {
                langs['_' + repo.language] ? langs['_' + repo.language].push(repo.id) : langs['_' + repo.language] = [repo.id]
            }
        })

        let inserts = []
        let index = 1
        for (let key in langs) {
            inserts.push(langsCollection.upsert({
                key: key.substr(1).toLowerCase(),
                id: index,
                name: key.substr(1),
                repos: langs[key]
            }))
            index++
        }

        return Promise.all(inserts)
    }

    getLanguages = async () => {
        this.checkInstance()

        let langsCollection = this.RxDB.languages

        let query = langsCollection.find()

        let docs = await query.exec()

        let languages = []

        docs.forEach((doc) => {
            let language = doc.toJSON()
            language.reposCount = doc.countRepos()
            languages.push(language)
        })

        return languages
    }
}
