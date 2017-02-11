const assign = Object.assign || require('object.assign') // Polyfill if needed for browser support

export default function assignToEmpty (oldObject, newObject) {
  return assign({}, oldObject, newObject)
}
