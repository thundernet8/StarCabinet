import moment from "moment";
import * as Database from "./database";
import * as CONSTANTS from "../constants";
import IRepo from "../interface/IRepo";

export default class DBHandler {
    private dbName: string;
    private RxDB;

    constructor(dbOrName) {
        if (typeof dbOrName === "string") {
            this.dbName = dbOrName;
        } else {
            this.RxDB = dbOrName;
        }
    }

    checkInstance = () => {
        if (!this.RxDB) {
            throw new Error("You must call `initDB()` first");
        }
    };

    initDB = async () => {
        if (!this.RxDB) {
            this.RxDB = await Database.get(this.dbName, null);
        }

        return this;
    };

    upsertProfile = async profile => {
        this.checkInstance();

        let meCollection = this.RxDB.me;
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
            company: profile.company || "",
            blog: profile.blog,
            location: profile.location,
            hireable: !!profile.hireable,
            publicRepos: profile.public_repos,
            publicGists: profile.public_gists,
            followers: profile.followers,
            following: profile.following,
            createdAt: profile.created_at,
            createdTime: Math.floor(new Date(profile.created_at).getTime() / 1000),
            updatedAt: profile.updated_at,
            updatedTime: Math.floor(new Date(profile.updated_at).getTime() / 1000),
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
        });

        return doc;
    };

    getProfile = async (username = "") => {
        this.checkInstance();

        let meCollection = this.RxDB.me;
        let query = meCollection.findOne();
        if (username) {
            query = query.where("login").eq(username);
        }

        let doc = await query.exec();
        return doc.toJSON();
    };

    upsertRepos = async repos => {
        this.checkInstance();

        let reposCollection = this.RxDB.repos;
        let inserts: any[] = [];
        let index = 0;
        let repoIds: string[] = [];

        repos.reverse();
        repos.forEach(repo => {
            index++;
            repoIds.push(repo.id);
            inserts.push(
                reposCollection.upsertExcludeFields(
                    {
                        key: repo.id.toString(),
                        id: repo.id,
                        name: repo.name,
                        fullName: repo.full_name,
                        owner: repo.owner.id,
                        private: repo.private,
                        htmlUrl: repo.html_url,
                        description: repo.description || "",
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
                        createdTime: Math.floor(moment(repo.created_at).valueOf() / 1000),
                        updatedAt: repo.updated_at,
                        updatedTime: Math.floor(moment(repo.updated_at).valueOf() / 1000),
                        pushedAt: repo.pushed_at,
                        pushedTime: Math.floor(moment(repo.pushed_at).valueOf() / 1000),
                        gitUrl: repo.git_url,
                        sshUrl: repo.ssh_url,
                        cloneUrl: repo.clone_url,
                        svnUrl: repo.svn_url,
                        homePage: repo.homepage || "",
                        size: repo.size,
                        stargazersCount: repo.stargazers_count,
                        stars: repo.stargazers_count,
                        watchersCount: repo.watchers_count,
                        lang: repo.language || "Unknown",
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
                        flag: false,
                        read: false,
                        note: "",
                        readme: "",
                        defaultOrder: index
                    },
                    ["score", "indexedScore", "flag", "read", "note", "readme"]
                )
            );
        });

        // now remove some repos in db but not in fetched data(they were unstarred)
        await reposCollection.find({ id: { $nin: repoIds } }).remove();

        const results: any[] = await Promise.all(inserts);

        return results.map(result => result.toJSON());
    };

    getRepos = async conditions => {
        this.checkInstance();

        const reposCollection = this.RxDB.repos;

        let args: { [key: string]: any } = {};
        if (conditions.group) {
            const id = conditions.group.id; // string
            switch (conditions.group.type) {
                case CONSTANTS.GROUP_TYPE_LANGUAGE:
                    args = { lang: { $eq: id } };
                    // query = reposCollection.find(args)
                    break;
                case CONSTANTS.GROUP_TYPE_CATEGORY:
                    // we should go to category table to find the repos list
                    const catsCollection = this.RxDB.categories;
                    const category = await catsCollection.findOne({ key: { $eq: id } }).exec();
                    const repoIds = category.repos;
                    args = { id: { $in: repoIds } };
                    // query = reposCollection.find(args)
                    break;
                case CONSTANTS.GROUP_TYPE_UNKNOWN:
                    const catsCollection2 = this.RxDB.categories;
                    const categories = await catsCollection2.find().exec();
                    let nrepoIds = [];
                    categories.forEach(cat => {
                        nrepoIds.concat(cat.repos);
                    });
                    nrepoIds = Array.from(new Set(nrepoIds));
                    args = { id: { $nin: nrepoIds } };
                    // query = reposCollection.find(args)
                    break;
                default:
                // query = reposCollection.find()
            }
        }

        if (conditions.filter) {
            if (conditions.filter.hasFlag) {
                args.flag = { $eq: true };
            }
            if (conditions.filter.hasNote) {
                args.note = { $ne: "" };
            }
            if (conditions.filter.unread) {
                args.read = { $eq: false };
            }
        }

        if (conditions.search && conditions.search.key) {
            const key = conditions.search.key;
            switch (conditions.search.field) {
                case CONSTANTS.SEARCH_FIELD_REPO_NAME:
                    args.name = { $regex: new RegExp(key, "i") };
                    // query = query.find(searchArgs)
                    break;
                case CONSTANTS.SEARCH_FIELD_REPO_DESCRIPTION:
                    args.description = { $regex: new RegExp(key, "i") };
                    // query = query.find(searchArgs)
                    break;
                case CONSTANTS.SEARCH_FIELD_REPO_NOTE:
                    if (!args.note) {
                        args.note = { $regex: new RegExp(key, "i") };
                    } else {
                        args.note = Object.assign({}, args.note, {
                            $regex: new RegExp(key, "i")
                        });
                    }
                    // query = query.find(searchArgs)
                    break;
                case CONSTANTS.SEARCH_FIELD_REPO_TAGS:
                    const tag = await this.RxDB.tags
                        .findOne({
                            name: { $regex: new RegExp("^" + key + "$", "i") }
                        })
                        .exec();
                    const tagRepoIds = tag && tag.repos instanceof Array ? tag.repos : [];
                    if (args.id) {
                        const prevRepoIds = args.id.$in;
                        const postRepoIds = tagRepoIds.filter(
                            item => prevRepoIds.indexOf(item) > -1
                        );
                        args.id = { $in: postRepoIds };
                    } else {
                        args.id = { $in: tagRepoIds };
                    }
                    break;
                case CONSTANTS.SEARCH_FIELD_ALL: // currently not include tags
                default:
                    // query = query.find({$or: [{name: {$regex: new RegExp(key, 'i')}}, {description: {$regex: new RegExp(key, 'i')}}, {note: {$regex: new RegExp(key, 'i')}}]}) // TODO this does not work but no error

                    // so use the bad way
                    let tempRepoIds: string[] = [];
                    const nameSearchDocs = await reposCollection
                        .find(
                            Object.assign({}, args, {
                                name: { $regex: new RegExp(key, "i") }
                            })
                        )
                        .exec();
                    nameSearchDocs.forEach(nameSearchDoc => {
                        tempRepoIds.push(nameSearchDoc.id);
                    });

                    const introSearchDocs = await reposCollection
                        .find(
                            Object.assign({}, args, {
                                description: { $regex: new RegExp(key, "i") }
                            })
                        )
                        .exec();
                    introSearchDocs.forEach(introSearchDoc => {
                        tempRepoIds.push(introSearchDoc.id);
                    });

                    const noteSearchDocs = await reposCollection
                        .find(
                            Object.assign({}, args, {
                                note: { $regex: new RegExp(key, "i") }
                            })
                        )
                        .exec();
                    noteSearchDocs.forEach(noteSearchDoc => {
                        tempRepoIds.push(noteSearchDoc.id);
                    });

                    tempRepoIds = Array.from(new Set(tempRepoIds));
                    if (args.id) {
                        args.id.$in = Array.from(
                            new Set(new Array().concat(args.id.$in, tempRepoIds))
                        );
                    } else {
                        args.id = { $in: tempRepoIds };
                    }
                // query = reposCollection.find(searchArgs)
            }
        }

        let query = reposCollection.find(args);

        if (conditions.order) {
            const sc = conditions.order.desc ? -1 : 1;
            query = query.sort({ [conditions.order.by]: sc });
        }

        let docs = await query.exec();

        let repos: IRepo[] = [];

        docs.forEach(doc => {
            let repo = doc.toJSON();
            repos.push(repo);
        });

        return repos;
    };

    upsertOwners = async repos => {
        this.checkInstance();

        const authorsCollection = this.RxDB.authors;

        let owners = {};
        repos.forEach(repo => {
            // we need this step to remove duplicatives
            // otherwise it will cause Document update conflict
            repo.owner.repoId = repo.id;
            owners["_" + repo.owner.id] = repo.owner;
        });

        let ownerIds: string[] = [];
        let inserts: any[] = [];
        for (let key in owners) {
            if (!owners.hasOwnProperty(key)) {
                continue;
            }
            let owner = owners[key];
            ownerIds.push(owner.id);
            inserts.push(
                authorsCollection.upsert({
                    key: owner.repoId + "_" + owner.id,
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
                    siteAdmin: owner.site_admin,
                    isOwner: true,
                    repoId: owner.repoId
                })
            );
        }

        // now remove some owners in db but not in fetched data
        await authorsCollection.find({ isOwner: { $eq: true }, id: { $nin: ownerIds } }).remove();

        const results = await Promise.all(inserts);

        return results.map(result => result.toJSON());
    };

    upsertContributors = async (repoId, contributors) => {
        this.checkInstance();

        const repo = await this.RxDB.repos.findOne({ id: { $eq: repoId } }).exec();
        if (!repo) {
            return false;
        }

        const authorsCollection = this.RxDB.authors;

        let contributorIds: string[] = [];
        let inserts: any[] = [];
        contributors.forEach(contributor => {
            if (contributor.id !== repo.owner) {
                contributorIds.push(contributor.id);
                inserts.push(
                    authorsCollection.upsert({
                        key: repoId + "_" + contributor.id,
                        id: contributor.id,
                        login: contributor.login,
                        avatarUrl: contributor.avatar_url,
                        gravatarId: contributor.gravatar_id,
                        url: contributor.url,
                        htmlUrl: contributor.html_url,
                        followersUrl: contributor.followers_url,
                        followingUrl: contributor.following_url,
                        gistsUrl: contributor.gists_url,
                        starredUrl: contributor.starred_url,
                        subscriptionsUrl: contributor.subscriptions_url,
                        organizationsUrl: contributor.organizations_url,
                        reposUrl: contributor.repos_url,
                        eventsUrl: contributor.events_url,
                        receivedEventsUrl: contributor.received_events_url,
                        type: contributor.type,
                        siteAdmin: contributor.site_admin,
                        isOwner: false,
                        repoId
                        // contributions
                    })
                );
            }
        });

        // now remove some contributors in db but not in fetched data
        await authorsCollection
            .find({
                repoId: { $eq: repoId },
                isOwner: { $eq: false },
                id: { $nin: contributorIds }
            })
            .remove();

        await Promise.all(inserts);

        return await this.getRepoContributors(repoId);
    };

    getRepoContributors = async repoId => {
        this.checkInstance();

        const authorsCollection = this.RxDB.authors;
        const docs = await authorsCollection.find({ repoId: { $eq: repoId } }).exec();

        return docs.map(doc => doc.toJSON());
    };

    recordReposCount = async count => {
        this.checkInstance();

        const settingsCollection = this.RxDB.settings;
        const doc = await settingsCollection.findOne({ id: { $eq: "reposCount" } }).exec();
        const oldCount = doc ? parseInt(doc.value, 10) : 0;

        if (doc) {
            doc.value = count.toString();
            await doc.save();
        } else {
            settingsCollection.upsert({
                id: "reposCount",
                value: count.toString()
            });
        }

        return count - oldCount;
    };

    upsertLanguages = async repos => {
        this.checkInstance();

        let langsCollection = this.RxDB.languages;

        // await langsCollection.find().remove() // clean the collection

        let langs: { [key: string]: string[] } = {
            _Unknown: []
        };
        repos.forEach(repo => {
            if (!repo.language) {
                langs._Unknown.push(repo.id);
            } else {
                if (langs["_" + repo.language]) {
                    langs["_" + repo.language].push(repo.id);
                } else {
                    langs["_" + repo.language] = [repo.id];
                }
            }
        });

        let inserts: any[] = [];
        let index = 1;
        for (let key in langs) {
            if (langs.hasOwnProperty(key)) {
                inserts.push(
                    langsCollection.upsert({
                        key: key.substr(1).toLowerCase(),
                        id: index,
                        name: key.substr(1),
                        repos: langs[key]
                    })
                );
                index++;
            }
        }

        return Promise.all(inserts);
    };

    getLanguages = async () => {
        this.checkInstance();

        let langsCollection = this.RxDB.languages;

        let query = langsCollection.find();

        let docs = await query.exec();

        let languages: any[] = [];

        docs.forEach(doc => {
            let language = doc.toJSON();
            language.reposCount = doc.countRepos();
            languages.push(language);
        });

        return languages;
    };

    getCategories = async () => {
        this.checkInstance();

        let catsCollection = this.RxDB.categories;

        let query = catsCollection.find();

        let docs = await query.exec();

        let categories: any[] = [];

        docs.forEach(doc => {
            let category = doc.toJSON();
            category.reposCount = doc.countRepos();
            categories.push(category);
        });

        return categories;
    };

    upsertCategory = async name => {
        this.checkInstance();

        let catsCollection = this.RxDB.categories;

        // let exist = await catsCollection.findOne({name: {$eq: name}}).exec()

        const regKey = "^" + name + "$";
        let exist = await catsCollection
            .findOne({ name: { $regex: new RegExp(regKey, "i") } })
            .exec();

        if (exist) {
            throw new Error("Duplicative category name");
        }

        let docs = await catsCollection
            .find()
            .sort({ id: -1 })
            .limit(1)
            .exec();
        const start = docs instanceof Array && docs.length > 0 ? docs[0].id + 1 : 1;
        const date = new Date();

        const category = {
            key: start.toString(),
            id: start,
            name: name,
            repos: [],
            createdAt: date.toISOString(),
            createdTime: Math.floor(date.getTime() / 1000)
        };

        let upsert = await catsCollection.upsert(category);

        return upsert;
    };

    deleteCategory = async id => {
        this.checkInstance();

        let catsCollection = this.RxDB.categories;

        try {
            await catsCollection.find({ id: { $eq: id } }).remove();
            return id;
        } catch (err) {
            throw new Error(err);
        }
    };

    _upsertTag = async name => {
        // private, return RxDoc
        this.checkInstance();

        let tagsCollection = this.RxDB.tags;

        const regKey = "^" + name + "$";
        let exist = await tagsCollection
            .findOne({ name: { $regex: new RegExp(regKey, "i") } })
            .exec();

        if (exist) {
            return exist;
        }

        let docs = await tagsCollection
            .find()
            .sort({ id: -1 })
            .limit(1)
            .exec();
        const start = docs instanceof Array && docs.length > 0 ? docs[0].id + 1 : 1;
        const date = new Date();

        const tag = {
            key: start.toString(),
            id: start,
            name: name,
            repos: [],
            createdAt: date.toISOString(),
            createdTime: Math.floor(date.getTime() / 1000)
        };

        let upsert = await tagsCollection.upsert(tag);

        return upsert;
    };

    getTags = async tagIds => {
        this.checkInstance();

        const tagsCollection = this.RxDB.tags;
        const docs = await tagsCollection
            .find({ id: { $in: tagIds } })
            .sort({ id: 1 })
            .exec();
        return docs.map(doc => doc.toJSON());
    };

    getRepoTags = async repoId => {
        this.checkInstance();

        const tagsCollection = this.RxDB.tags;
        const docs = await tagsCollection
            .find({ repos: { $elemMatch: { $eq: repoId } } })
            .sort({ id: 1 })
            .exec();

        return docs.map(doc => doc.toJSON());
    };

    getRepoCategories = async repoId => {
        this.checkInstance();

        const catsCollection = this.RxDB.categories;
        const docs = await catsCollection
            .find({ repos: { $elemMatch: { $eq: repoId } } })
            .sort({ id: 1 })
            .exec();

        return docs.map(doc => doc.toJSON());
    };

    updateRepo = async obj => {
        this.checkInstance();

        if (!obj.id) {
            return false;
        }

        const reposCollection = this.RxDB.repos;
        const id = obj.id;
        let repo = await reposCollection.findOne({ id: { $eq: id } }).exec();
        if (!repo) {
            throw new Error("The specified repo is not exist");
        }

        for (let prop in obj) {
            if (prop !== "id" && obj.hasOwnProperty(prop)) {
                repo[prop] = obj[prop]; // TODO validate the prop existed in schema
            }
        }

        repo.rxChange = Math.floor(new Date().getTime() / 1000);
        await repo.save();

        return repo.toJSON();
    };

    updateRepoCategories = async (id, catIds) => {
        this.checkInstance();

        const catsCollection = this.RxDB.categories;
        const categoryDocs = await catsCollection
            .find({ id: { $in: catIds } })
            .sort({ id: 1 })
            .exec();

        let updates: any[] = [];
        let categories: any[] = [];
        categoryDocs.forEach(categoryDoc => {
            if (categoryDoc.repos.indexOf(id) < 0) {
                let repoIds = categoryDoc.repos;
                repoIds.push(id);
                categoryDoc.repos = repoIds;
                categoryDoc.updatedTime = Math.floor(new Date().getTime() / 1000);
                updates.push(categoryDoc.save());
            }
            categories.push(categoryDoc.toJSON());
        });

        await Promise.all(updates);
        const repo = await this.RxDB.repos.findOne({ id: { $eq: id } }).exec();

        let repoObj = repo.toJSON();
        repoObj._categories = categories;

        return repoObj;
    };

    addRepoTag = async (id, tagName) => {
        this.checkInstance();

        const reposCollection = this.RxDB.repos;
        let repo = await reposCollection.findOne({ id: { $eq: id } }).exec();
        if (!repo) {
            throw new Error("The specified repo is not exist");
        }

        // fisrt upsert this tag into tags collection
        let tag = await this._upsertTag(tagName);
        let repoIds = tag.repos;

        if (repoIds.indexOf(id) < 0) {
            repoIds.push(id);
        }

        tag.repos = repoIds;
        tag.updatedTime = Math.floor(new Date().getTime() / 1000);
        await tag.save();

        const repoTags = await this.getRepoTags(id);
        let repoObj = repo.toJSON();
        repoObj._tags = repoTags;

        return repoObj;
    };

    removeRepoTag = async (id, tagName) => {
        this.checkInstance();

        const reposCollection = this.RxDB.repos;
        let repo = await reposCollection.findOne({ id: { $eq: id } }).exec();
        if (!repo) {
            throw new Error("The specified repo is not exist");
        }

        // fisrt get the tag
        const tag = await this._upsertTag(tagName);
        let repoIds = tag.repos;
        if (repoIds instanceof Array) {
            const repoIdIndex = repoIds.indexOf(id);
            if (repoIdIndex > -1) {
                repoIds.splice(repoIdIndex, 1);
            }
        }
        tag.repos = repoIds;
        tag.updatedTime = Math.floor(new Date().getTime() / 1000);
        await tag.save();

        const repoTags = await this.getRepoTags(id);
        let repoObj = repo.toJSON();
        repoObj._tags = repoTags;

        return repoObj;
    };
}
