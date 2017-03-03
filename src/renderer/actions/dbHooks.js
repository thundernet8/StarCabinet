import * as CONSTANTS                from '../constants'
import { updateReposList }           from './repos'

// these action creators are called in db hooks triggered by collection observable

export const dbCollectionChange = (collectionName) => {
    switch (collectionName) {
        // repos list only care about changes of the repo collection
        case CONSTANTS.DB_COLLECTION_OF_REPO:
            return dispatch => dispatch(updateReposList())
        // category/group list on left pane only care about changes of the categories collection
        case CONSTANTS.DB_COLLECTION_OF_CATEGORY:
            // TODO
            return dispatch => dispatch()
        // TODO more
        default:
            return
    }
}

export const dbRepoDocumentChange = (repoId) => {
    // TODO
}
