import * as RxDB                    from 'rxdb'
import Logger                       from '../utils/logHelper'
import { dbCollectionChange }       from '../actions/dbHooks'

RxDB.plugin(require('pouchdb-adapter-idb'))

const collections = [
  {
    name: 'repos',
    schema: require('./schemas/repoSchema.js').default,
    sync: false
  },
  {
    name: 'owners',
    schema: require('./schemas/ownerSchema.js').default,
    sync: false
  },
  {
    name: 'me',
    schema: require('./schemas/meSchema.js').default,
    sync: false
  },
  {
    name: 'tags',
    schema: require('./schemas/SCTagSchema.js').default,
    methods: {
        countRepos () {
            return this.repos.length
        }
    },
    sync: false
  },
  {
    name: 'categories',
    schema: require('./schemas/SCCategorySchema.js').default,
    methods: {
        countRepos () {
            return this.repos.length
        }
    },
    sync: false
  },
  {
      name: 'settings',
      schema: require('./schemas/settingSchema.js').default,
      sync: false
  }
]

let dbPromise = null

const _create = async function(dbName, dispatch) {
    Logger(`DatabaseService: creating database ${dbName}..`)

    const db = await RxDB.create({name: dbName, adapter: 'idb', password: ''})

    Logger('DatabaseService: created database')
    // debug
    if (window._DEBUG_) {
      window['sc_db'] = db
      db.$.subscribe(changeEvent => Logger(changeEvent))
    }

    // create collections
    Logger('DatabaseService: create collections')

    await Promise.all(collections.map(colData => db.collection(colData)))

    // hooks
    Logger('DatabaseService: add hooks')

    // TODO

    // db.collections.repos.preInsert(function(docObj) {
    //     const color = docObj.color;
    //     return db.collections.heroes.findOne({color}).exec().then(has => {
    //         if (has != null) {
    //             alert('another hero already has the color ' + color);
    //             throw new Error('color already there')
    //         }
    //         return db
    //     })
    // })

    // sync
    // Logger('DatabaseService: sync')

    // collections.filter(col => col.sync).map(col => col.name).map(colName => db[colName].sync(syncURL + colName + '/'))

    return db
}

export function get (dbName, dispatch = null) {
    if (!dbPromise) {
      dbPromise = _create(dbName, dispatch)
    }
    return dbPromise
}
