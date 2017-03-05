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
            'type': 'number'
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
            'type': 'number'
        },
        'publicGists': {
            'type': 'number'
        },
        'followers': {
            'type': 'number'
        },
        'following': {
            'type': 'number'
        },
        'createdAt': {
            'type': 'string'
        },
        'createdTime': {
            'type': 'number'
        },
        'updatedAt': {
            'type': 'string'
        },
        'updatedTime': {
            'type': 'number'
        },
        'privateGists': {
            'type': 'number'
        },
        'totalPrivateRepos': {
            'type': 'number'
        },
        'ownedPrivateRepos': {
            'type': 'number'
        },
        'diskUsage': {
            'type': 'number'
        },
        'collaborators': {
            'type': 'number'
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
                    'type': 'number'
                },
                'collaborators': {
                    'type': 'number'
                },
                'privateRepos': {
                    'type': 'number'
                }
            }
        }
    },
    'required': ['id']
}

export default meSchema
