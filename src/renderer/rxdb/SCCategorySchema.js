const SCCategorySchema = {
  'title': 'SC Category schema',
  'description': 'describes a single SC category',
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
    'description': {
      'type': 'string'
    },
    'order': {
      'type': 'number'
    },
    'reposCount': {
      'type': 'number'
    },
    'repos': {
      'type': 'array',
      'uniqueItems': true,
      'item': 'number'
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
    }
  },
  'required': ['id', 'order']
}

export default SCCategorySchema
