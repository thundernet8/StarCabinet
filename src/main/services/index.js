import windowLifeCycle          from './windowLifeCycle'
import handleCredentialsEvents  from './credentials'

const register = () => {
  windowLifeCycle()
  handleCredentialsEvents()
}

exports.register = register
