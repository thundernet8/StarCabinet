const SCTagSchema = {
    'title': 'SC Tag schema',
    'description': 'describes a single SC tag',
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
        'description': {
            'type': 'string'
        },
        'repos': {
            'type': 'array',
            'uniqueItems': true,
            'item': 'integer'
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
        }
    },
    'required': ['id']
}

export default SCTagSchema
