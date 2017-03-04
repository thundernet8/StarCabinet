const settingSchema = {
  'title': 'setting schema',
  'description': 'describes a app setting',
  'version': 0,
  'type': 'object',
  'properties': {
    'id': {
      'type': 'string',
      'primary': true
    },
    'value': {
      'type': 'string'
    }
  },
  'required': ['value']
}

export default settingSchema
