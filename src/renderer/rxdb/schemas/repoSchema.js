const repoSchema = {
  'title': 'repository schema',
  'description': 'describes a single repository',
  'version': 0,
  'type': 'object',
  'properties': {
      'key': {
        'type': 'string',
        'primary': true // juse string of id
      },
      'id': {
        'type': 'integer',
        'index': true
      },
      'name': {
        'type': 'string'
      },
      'fullName': {
        'type': 'string'
      },
      'owner': {
        'type': 'integer'
      },
      'private': {
        'type': 'boolean'
      },
      'htmlUrl': {
        'type': 'string'
      },
      'description': {
        'type': 'string'
      },
      'fork': {
        'type': 'boolean'
      },
      'url': {
        'type': 'string'
      },
      'forksUrl': {
        'type': 'string'
      },
      'keysUrl': {
        'type': 'string'
      },
      'collaboratorsUrl': {
        'type': 'string'
      },
      'teamsUrl': {
        'type': 'string'
      },
      'hooksUrl': {
        'type': 'string'
      },
      'issueEventsUrl': {
        'type': 'string'
      },
      'eventsUrl': {
        'type': 'string'
      },
      'assigneesUrl': {
        'type': 'string'
      },
      'branchesUrl': {
        'type': 'string'
      },
      'tagsUrl': {
        'type': 'string'
      },
      'blobsUrl': {
        'type': 'string'
      },
      'gitTagsUrl': {
        'type': 'string'
      },
      'gitRefsUrl': {
        'type': 'string'
      },
      'treesUrl': {
        'type': 'string'
      },
      'statusesUrl': {
        'type': 'string'
      },
      'languagesUrl': {
        'type': 'string'
      },
      'stargazersUrl': {
        'type': 'string'
      },
      'contributorsUrl': {
        'type': 'string'
      },
      'subscribersUrl': {
        'type': 'string'
      },
      'subscriptionUrl': {
        'type': 'string'
      },
      'commitsUrl': {
        'type': 'string'
      },
      'gitCommitsUrl': {
        'type': 'string'
      },
      'commentsUrl': {
        'type': 'string'
      },
      'issueCommentUrl': {
        'type': 'string'
      },
      'contentsUrl': {
        'type': 'string'
      },
      'compareUrl': {
        'type': 'string'
      },
      'mergesUrl': {
        'type': 'string'
      },
      'archiveUrl': {
        'type': 'string'
      },
      'downloadsUrl': {
        'type': 'string'
      },
      'issuesUrl': {
        'type': 'string'
      },
      'pullsUrl': {
        'type': 'string'
      },
      'milestonesUrl': {
        'type': 'string'
      },
      'notificationsUrl': {
        'type': 'string'
      },
      'labelsUrl': {
        'type': 'string'
      },
      'releasesUrl': {
        'type': 'string'
      },
      'deploymentsUrl': {
        'type': 'string'
      },
      'createdAt': {
        'type': 'string'
      },
      'createdTime': {
        'type': 'integer',
        'index': true
      },
      'updatedAt': {
        'type': 'string'
      },
      'updatedTime': {
        'type': 'integer',
        'index': true
      },
      'pushedAt': {
        'type': 'string'
      },
      'pushedTime': {
        'type': 'integer',
        'index': true
      },
      'gitUrl': {
        'type': 'string'
      },
      'sshUrl': {
        'type': 'string'
      },
      'cloneUrl': {
        'type': 'string'
      },
      'svnUrl': {
        'type': 'string'
      },
      'homePage': {
        'type': 'string'
      },
      'size': {
        'type': 'integer',
        'index': true
      },
      'stargazersCount': {
        'type': 'integer'
      },
      'stars': {
        'type': 'integer',
        'index': true
      },
      'watchersCount': {
        'type': 'integer'
      },
      'lang': {
        'type': 'string'
      },
      'hasIssues': {
        'type': 'boolean'
      },
      'hasDownloads': {
        'type': 'boolean'
      },
      'hasWiki': {
        'type': 'boolean'
      },
      'hasPages': {
        'type': 'boolean'
      },
      'forksCount': {
        'type': 'integer'
      },
      'mirrorUrl': {
        'type': 'string'
      },
      'openIssuesCount': {
        'type': 'integer'
      },
      'forks': {
        'type': 'integer',
        'index': true
      },
      'openIssues': {
        'type': 'integer',
        'index': true
      },
      'watchers': {
        'type': 'integer',
        'index': true
      },
      'defaultBranch': {
        'type': 'string'
      },
      'permissions': {
        'type': 'object',
        'properties': {
          'admin': {
            'type': 'boolean'
          },
          'push': {
            'type': 'boolean'
          },
          'pull': {
            'type': 'boolean'
          }
        }
      },
      'score': {
          'type': 'integer', // 0~5
          'index': true
      },
      'flag': {
          'type': 'boolean'
      },
      'read': {
          'type': 'boolean'
      },
      'note': {
          'type': 'string'
      },
      'defaultOrder': {
          'type': 'integer',
          'index': true
      },
      'readme': {
          'type': 'string'
      },
      'rxChange': { // when update one field with a reference obj, rxdb doc's save method will deepEqual new doc and old one, but not works well, so we need this field with a absolute new value to speed up `doc.save()`
          'type': 'integer'
      }
  },
  'required': ['id', 'name', 'owner', 'htmlUrl', 'createdAt', 'createdTime', 'updatedAt', 'updatedTime', 'pushedAt', 'pushedTime', 'forks', 'watchers', 'stars', 'defaultBranch', 'openIssues']
}

export default repoSchema
