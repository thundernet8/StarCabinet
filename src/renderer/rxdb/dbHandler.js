import * as Database                from './database'
import * as CONSTANTS               from '../constants'

export default class DBHandler {
    constructor (dbName) {
        this.dbName = dbName
        this.RxDB = null
    }

    initDB = async () => {
        this.RxDB = await Database.get(this.dbName, null)

        return this
    }

    upsertProfile = async (profile) => {
        if (!this.RxDB) {
            throw new Error('You must call `getDB()` first')
        }

        let meCollection = this.RxDB.me
        const doc = await meCollection.upsert({
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
}
