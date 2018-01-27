const authorSchema = {
    title: "author schema",
    description: "describes a single repository owner/other contributors",
    version: 0,
    type: "object",
    properties: {
        key: {
            type: "string",
            primary: true
        },
        id: {
            type: "integer",
            index: true
        },
        login: {
            type: "string",
            index: true
        },
        isOwner: {
            type: "boolean" // owner / other contributor
        },
        repoId: {
            type: "integer"
        },
        avatarUrl: {
            type: "string"
        },
        gravatarId: {
            type: "string"
        },
        url: {
            type: "string"
        },
        htmlUrl: {
            type: "string"
        },
        followersUrl: {
            type: "string"
        },
        followingUrl: {
            type: "string"
        },
        gistsUrl: {
            type: "string"
        },
        starredUrl: {
            type: "string"
        },
        subscriptionsUrl: {
            type: "string"
        },
        organizationsUrl: {
            type: "string"
        },
        reposUrl: {
            type: "string"
        },
        eventsUrl: {
            type: "string"
        },
        receivedEventsUrl: {
            type: "string"
        },
        type: {
            type: "string"
        },
        siteAdmin: {
            type: "boolean"
        }
    },
    required: ["id", "login"]
};

export default authorSchema;
