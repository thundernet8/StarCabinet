const LanguageSchema = {
    'title': 'SC Language schema',
    'description': 'describes a single language',
    'version': 0,
    'type': 'object',
    'properties': {
        'key': {
            'type': 'string',
            'primary': true // just string of id
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
        'repos': {
            'type': 'array',
            'uniqueItems': true,
            'item': 'number'
        }
    },
    'required': ['id', 'name']
}

export default LanguageSchema
