import MD5                  from 'blueimp-md5'

export default function getDBName (username) {
    return `scdb4${MD5(username)}` // database name include username to differentiate
}
