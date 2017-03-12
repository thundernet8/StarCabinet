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
            receivedEventsUrl: profile.received_events_url,
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
        let index = 0
        let owners = []
        let repoIds = []

        repos.reverse()
        repos.forEach((repo) => {
            index++
            repoIds.push(repo.id)
            owners.push(repo.owner)
            inserts.push(reposCollection.upsertExcludeFields({
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
                permissions: repo.permissions,
                score: 0,
                SCCategories: [],
                SCTags: [],
                flag: false,
                read: false,
                remark: '',
                defaultOrder: index
            }, ['score', 'indexedScore', 'flag', 'read', 'remark', 'SCCategories', 'SCTags']))
        })

        // now remove some repos in db but not in fetched data(they were unstarred)
        await reposCollection.find({id: {$nin: repoIds}}).remove()

        return Promise.all(inserts)
    }

    getRepos = async (conditions) => {
        this.checkInstance()

        const reposCollection = this.RxDB.repos

        let args = {}
        if (conditions.group) {
            const id = conditions.group.id // string
            switch (conditions.group.type) {
                case CONSTANTS.GROUP_TYPE_LANGUAGE:
                    args = {lang: {$eq: id}}
                    // query = reposCollection.find(args)
                    break
                case CONSTANTS.GROUP_TYPE_CATEGORY:
                    // we should go to category table to find the repos list
                    const catsCollection = this.RxDB.categories
                    const category = await catsCollection.findOne({key: {$eq: id}}).exec()
                    const repoIds = category.repos
                    args = {id: {$in: repoIds}}
                    // query = reposCollection.find(args)
                    break
                case CONSTANTS.GROUP_TYPE_UNKNOWN:
                    args = {SCCategories: {$eq: []}}
                    // query = reposCollection.find(args)
                    break
                default:
                    // query = reposCollection.find()
            }
        }

        if (conditions.filter) {
            conditions.filter.hasFlag && (args.flag = {$eq: true})
            conditions.filter.hasRemark && (args.remark = {$ne: ''})
            conditions.filter.unread && (args.read = {$eq: false})
        }

        if (conditions.search && conditions.search.key) {
            const key = conditions.search.key
            switch (conditions.search.field) {
                case CONSTANTS.SEARCH_FIELD_REPO_NAME:
                    args.name = {$regex: new RegExp(key, 'i')}
                    // query = query.find(searchArgs)
                    break
                case CONSTANTS.SEARCH_FIELD_REPO_DESCRIPTION:
                    args.description = {$regex: new RegExp(key, 'i')}
                    // query = query.find(searchArgs)
                    break
                case CONSTANTS.SEARCH_FIELD_REPO_REMARK:
                    if (!args.remark) {
                        args.remark = {$regex: new RegExp(key, 'i')}
                    } else {
                        args.remark = Object.assign({}, args.remark, {$regex: new RegExp(key, 'i')})
                    }
                    // query = query.find(searchArgs)
                    break
                case CONSTANTS.SEARCH_FIELD_ALL:
                default:
                    // query = query.find({$or: [{name: {$regex: new RegExp(key, 'i')}}, {description: {$regex: new RegExp(key, 'i')}}, {remark: {$regex: new RegExp(key, 'i')}}]}) // TODO this does not work but no error

                    // so use the bad way
                    let tempRepoIds = []
                    const nameSearchDocs = await reposCollection.find(Object.assign({}, args, {name: {$regex: new RegExp(key, 'i')}})).exec()
                    nameSearchDocs.forEach((nameSearchDoc) => {
                        tempRepoIds.push(nameSearchDoc.id)
                    })

                    const introSearchDocs = await reposCollection.find(Object.assign({}, args, {description: {$regex: new RegExp(key, 'i')}})).exec()
                    introSearchDocs.forEach((introSearchDoc) => {
                        tempRepoIds.push(introSearchDoc.id)
                    })

                    const remarkSearchDocs = await reposCollection.find(Object.assign({}, args, {remark: {$regex: new RegExp(key, 'i')}})).exec()
                    remarkSearchDocs.forEach((remarkSearchDoc) => {
                        tempRepoIds.push(remarkSearchDoc.id)
                    })

                    tempRepoIds = Array.from(new Set(tempRepoIds))
                    if (args.id) {
                        args.id.$in = Array.from(new Set([].concat(args.id.$in, tempRepoIds)))
                    } else {
                        args.id = {$in: tempRepoIds}
                    }
                    // query = reposCollection.find(searchArgs)
            }
        }

        let query = reposCollection.find(args)

        if (conditions.order) {
            const sc = conditions.order.desc ? -1 : 1
            query = query.sort({[conditions.order.by]: sc})
        }

        let docs = await query.exec()

        let repos = []

        docs.forEach((doc) => {
            let repo = doc.toJSON()
            repos.push(repo)
        })

        return repos
    }

    upsertOwners = async (repos) => {
        this.checkInstance()

        const ownersCollection = this.RxDB.owners

        let owners = {}
        repos.forEach((repo) => {
            // we need this step to remove duplicatives
            // otherwise it will cause Document update conflict
            owners['_' + repo.owner.id] = repo.owner
        })
        let inserts = []
        for (let key in owners) {
            if (!owners.hasOwnProperty(key)) {
                continue
            }
            let owner = owners[key]
            inserts.push(ownersCollection.upsert({
                key: owner.id.toString(),
                id: owner.id,
                login: owner.login,
                avatarUrl: owner.avatar_url,
                gravatarId: owner.gravatar_id,
                url: owner.url,
                htmlUrl: owner.html_url,
                followersUrl: owner.followers_url,
                followingUrl: owner.following_url,
                gistsUrl: owner.gists_url,
                starredUrl: owner.starred_url,
                subscriptionsUrl: owner.subscriptions_url,
                organizationsUrl: owner.organizations_url,
                reposUrl: owner.repos_url,
                eventsUrl: owner.events_url,
                receivedEventsUrl: owner.received_events_url,
                type: owner.type,
                siteAdmin: owner.site_admin
            }))
        }

        return Promise.all(inserts)
    }

    recordReposCount = async (count) => {
        this.checkInstance()

        const settingsCollection = this.RxDB.settings
        const doc = await settingsCollection.findOne({id: {$eq: 'reposCount'}}).exec()
        const oldCount = doc ? parseInt(doc.value) : 0

        if (doc) {
            doc.value = count.toString()
            await doc.save()
        } else {
            settingsCollection.upsert({
                id: 'reposCount',
                value: count.toString()
            })
        }

        return count - oldCount
    }

    upsertLanguages = async (repos) => {
        this.checkInstance()

        let langsCollection = this.RxDB.languages

        // await langsCollection.find().remove() // clean the collection

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

    getCategories = async () => {
        this.checkInstance()

        let catsCollection = this.RxDB.categories

        let query = catsCollection.find()

        let docs = await query.exec()

        let categories = []

        docs.forEach((doc) => {
            let category = doc.toJSON()
            category.reposCount = doc.countRepos()
            categories.push(category)
        })

        return categories
    }

    upsertCategory = async (name) => {
        this.checkInstance()

        let catsCollection = this.RxDB.categories

        // let exist = await catsCollection.findOne({name: {$eq: name}}).exec()

        const regKey = '^' + name + '$'
        let exist = await catsCollection.findOne({name: {$regex: new RegExp(regKey, 'i')}}).exec()

        if (exist) {
            throw new Error('Duplicative category name')
        }

        let docs = await catsCollection.find().sort({id: -1}).limit(1).exec()
        const start = docs instanceof Array && docs.length > 0 ? docs[0].id + 1 : 1
        const date = new Date()

        const category = {
            key: start.toString(),
            id: start,
            name: name,
            repos: [],
            createdAt: date.toISOString(),
            createdTime: parseInt(date.getTime() / 1000)
        }

        let upsert = await catsCollection.upsert(category)

        return upsert
    }

    deleteCategory = async (id) => {
        this.checkInstance()

        let catsCollection = this.RxDB.categories

        try {
            await catsCollection.find({id: {$eq: id}}).remove()
            return id
        } catch (err) {
            throw new Error(err)
        }
    }

    _upsertTag = async (name) => { // private, return RxDoc
        this.checkInstance()

        let tagsCollection = this.RxDB.tags

        const regKey = '^' + name + '$'
        let exist = await tagsCollection.findOne({name: {$regex: new RegExp(regKey, 'i')}}).exec()

        if (exist) {
            return exist
        }

        let docs = await tagsCollection.find().sort({id: -1}).limit(1).exec()
        const start = docs instanceof Array && docs.length > 0 ? docs[0].id + 1 : 1
        const date = new Date()

        const tag = {
            key: start.toString(),
            id: start,
            name: name,
            repos: [],
            createdAt: date.toISOString(),
            createdTime: parseInt(date.getTime() / 1000)
        }

        let upsert = await tagsCollection.upsert(tag)

        return upsert
    }

    getTags = async (tagIds) => {
        this.checkInstance()

        const tagsCollection = this.RxDB.tags
        const docs = await tagsCollection.find({id: {$in: tagIds}}).sort({id: 1}).exec()
        return docs.map((doc) => doc.toJSON())
    }

    updateRepo = async (obj) => {
        this.checkInstance()

        const reposCollection = this.RxDB.repos
        const id = obj.id
        let repo = await reposCollection.findOne({id: {$eq: id}}).exec()
        if (!repo) {
            throw new Error('The specified repo is not exist')
        }

        for (let prop in obj) {
            if (prop !== 'id' && obj.hasOwnProperty(prop)) {
                repo[prop] = obj[prop] // TODO validate the prop existed in schema
            }
        }

        await repo.save()

        return repo.toJSON()
    }

    addRepoTag = async (id, tagName) => {
        this.checkInstance()

        const reposCollection = this.RxDB.repos
        let repo = await reposCollection.findOne({id: {$eq: id}}).exec()
        if (!repo) {
            throw new Error('The specified repo is not exist')
        }

        // fisrt upsert this tag into tags collection
        let tag = await this._upsertTag(tagName)
        let repoIds = tag.repos

        repoIds.indexOf(id) < 0 && repoIds.push(id)
        tag.repos = repoIds
        await tag.save()

        let tagIds = repo.SCTags
        if (tagIds.indexOf(tag.id) < 0) {
            tagIds.push(tag.id)
        }
        repo.SCTags = tagIds

        await repo.save()

        return repo.toJSON()
    }

    removeRepoTag = async (id, tagName) => {
        this.checkInstance()

        const reposCollection = this.RxDB.repos
        let repo = await reposCollection.findOne({id: {$eq: id}}).exec()
        if (!repo) {
            throw new Error('The specified repo is not exist')
        }

        // fisrt get the tag
        const tag = await this._upsertTag(tagName)
        let repoIds = tag.repos
        if (repoIds instanceof Array) {
            const repoIdIndex = repoIds.indexOf(id)
            repoIdIndex > -1 && repoIds.splice(repoIdIndex, 1)
        }
        tag.repos = repoIds
        await tag.save()

        let tagIds = repo.SCTags
        const tagIdIndex = tagIds.indexOf(tag.id)
        if (tagIdIndex > -1) {
            tagIds.splice(tagIdIndex, 1)
        }
        repo.SCTags = tagIds

        await repo.save()

        return repo.toJSON()
    }

}
