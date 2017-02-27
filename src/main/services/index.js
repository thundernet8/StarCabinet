import windowLifeCycle          from './windowLifeCycle'
import handleCredentialsEvents  from './credentials'

const register = (globalWin) => {
  windowLifeCycle(globalWin)
  handleCredentialsEvents()
}

exports.register = register
