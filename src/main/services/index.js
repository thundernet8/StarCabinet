import windowLifeCycle          from './windowLifeCycle'
import handleCredentialsEvents  from './credentials'
import {
    exportDataHandle,
    importDataHandle
}                               from './data'

const register = (globalWin) => {
  windowLifeCycle(globalWin)
  handleCredentialsEvents()
  exportDataHandle()
  importDataHandle()
}

exports.register = register
