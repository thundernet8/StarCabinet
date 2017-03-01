const repoSchema = {
  'title': 'repository schema',
  'description': 'describes a single repository',
  'version': 0,
  'type': 'object',
  'properties': {
      'id': {
        'type': 'number'
        // 'primary': true
      },
      'name': {
        'type': 'string',
        'primary': true
      },
      'fullName': {
        'type': 'string'
      },
      'owner': {
        'type': 'number'
      },
      'private': {
        'type': 'number'
      },
      'htmlUrl': {
        'type': 'string'
      },
      'description': {
        'type': 'string'
      },
      'fork': {
        'type': 'number'
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
        'type': 'number'
      },
      'updatedAt': {
        'type': 'string'
      },
      'updatedTime': {
        'type': 'number'
      },
      'pushedAt': {
        'type': 'string'
      },
      'pushedTime': {
        'type': 'number'
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
        'type': 'number'
      },
      'stargazersCount': {
        'type': 'number'
      },
      'stars': {
        'type': 'number'
      },
      'watchersCount': {
        'type': 'number'
      },
      'lang': {
        'type': 'string'
      },
      'hasIssues': {
        'type': 'number'
      },
      'hasDownloads': {
        'type': 'number'
      },
      'hasWiki': {
        'type': 'number'
      },
      'hasPages': {
        'type': 'number'
      },
      'forksCount': {
        'type': 'number'
      },
      'mirrorUrl': {
        'type': 'string'
      },
      'openIssuesCount': {
        'type': 'number'
      },
      'forks': {
        'type': 'number'
      },
      'openIssues': {
        'type': 'number'
      },
      'watchers': {
        'type': 'number'
      },
      'defaultBranch': {
        'type': 'string'
      },
      'permissions': {
        'type': 'object',
        'properties': {
          'admin': {
            'type': 'number'
          },
          'push': {
            'type': 'number'
          },
          'pull': {
            'type': 'number'
          }
        }
      },
      'SCTags': {
        'type': 'array',
        'maxItems': 100,
        'uniqueItems': true,
        'item': 'number'
      },
      'SCCategories': {
        'type': 'array',
        'maxItems': 10,
        'uniqueItems': true,
        'item': 'number'
      }
  },
  'required': ['id', 'owner', 'htmlUrl', 'createdAt', 'createdTime', 'updatedAt', 'updatedTime', 'pushedAt', 'pushedTime', 'forks', 'watchers', 'stars', 'defaultBranch', 'openIssues']
}

export default repoSchema
