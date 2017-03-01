import * as CONSTANTS                from '../constants'

export const networkStatusChange = (offline) => {
  if (offline) {
      return {
          type: CONSTANTS.APP_OFFLINE
      }
  }
  return {
      type: CONSTANTS.APP_ONLINE
  }
}

let _updateNetworkStatus = (dispatch) => {
    let offline = !navigator.onLine

    if (offline) {
        document.body.classList.add('offline')
    } else {
        document.body.classList.remove('offline')
    }

    dispatch(networkStatusChange(offline))
}

export const listenNetworkChange = () => {
    return (dispatch) => {
        window.addEventListener('online', _updateNetworkStatus.bind(null, dispatch))
        window.addEventListener('offline', _updateNetworkStatus.bind(null, dispatch))
    }
}

export const diListenNetworkChange = () => {
    return (dispatch) => {
        window.removeEventListener('online', _updateNetworkStatus)
        window.removeEventListener('offline', _updateNetworkStatus)
    }
}
