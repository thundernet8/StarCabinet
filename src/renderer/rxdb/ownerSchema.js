const ownerSchema = {
  'title': 'owner schema',
  'description': 'describes a single repository owner',
  'version': 0,
  'type': 'object',
  'properties': {
    'id': {
      'type': 'number'
      // 'primary': true
    },
    'login': {
      'type': 'string',
      'primary': true
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
      'type': 'number'
    }
  },
  'required': ['id']
}

export default ownerSchema
