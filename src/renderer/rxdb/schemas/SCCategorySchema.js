const SCCategorySchema = {
    'title': 'SC Category schema',
    'description': 'describes a single SC category',
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
        'name': {
            'type': 'string'
        },
        'description': {
            'type': 'string'
        },
        'order': {
            'type': 'number'
        },
        'type': {
            'type': 'string' // language or custom
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
