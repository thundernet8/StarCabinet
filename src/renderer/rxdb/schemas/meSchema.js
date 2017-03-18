const meSchema = {
    'title': 'me schema',
    'description': 'describes me (current logged user)',
    'version': 0,
    'type': 'object',
    'properties': {
        'key': {
            'type': 'string',
            'primary': true // juse string of id
        },
        'id': {
            'type': 'integer'
        },
        'login': {
            'type': 'string'
        },
        'avatarUrl': {
            'type': 'string'
        },
        'gravatarId': {
            'type': 'string'
        },
        'url': {
            'type': 'string'
        },
        'htmlUrl': {
            'type': 'string'
        },
        'followersUrl': {
            'type': 'string'
        },
        'followingUrl': {
            'type': 'string'
        },
        'gistsUrl': {
            'type': 'string'
        },
        'starredUrl': {
            'type': 'string'
        },
        'subscriptionsUrl': {
            'type': 'string'
        },
        'organizationsUrl': {
            'type': 'string'
        },
        'reposUrl': {
            'type': 'string'
        },
        'eventsUrl': {
            'type': 'string'
        },
        'receivedEventsUrl': {
            'type': 'string'
        },
        'type': {
            'type': 'string'
        },
        'siteAdmin': {
            'type': 'boolen'
        },
        'name': {
            'type': 'string'
        },
        'company': {
            'type': 'string'
        },
        'blog': {
            'type': 'string'
        },
        'location': {
            'type': 'string'
        },
        'hireable': {
            'type': 'boolen'
        },
        'publicRepos': {
            'type': 'integer'
        },
        'publicGists': {
            'type': 'integer'
        },
        'followers': {
            'type': 'integer'
        },
        'following': {
            'type': 'integer'
        },
        'createdAt': {
            'type': 'string'
        },
        'createdTime': {
            'type': 'integer'
        },
        'updatedAt': {
            'type': 'string'
        },
        'updatedTime': {
            'type': 'integer'
        },
        'privateGists': {
            'type': 'integer'
        },
        'totalPrivateRepos': {
            'type': 'integer'
        },
        'ownedPrivateRepos': {
            'type': 'integer'
        },
        'diskUsage': {
            'type': 'integer'
        },
        'collaborators': {
            'type': 'integer'
        },
        'twoFactorAuthentication': {
            'type': 'boolen'
        },
        'plan': {
            'type': 'object',
            'properties': {
                'name': {
                    'type': 'string'
                },
                'space': {
                    'type': 'integer'
                },
                'collaborators': {
                    'type': 'integer'
                },
                'privateRepos': {
                    'type': 'integer'
                }
            }
        }
    },
    'required': ['id']
}

export default meSchema
