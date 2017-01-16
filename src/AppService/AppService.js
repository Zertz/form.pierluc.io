import uuid from 'uuid'

class AppService {
  isProduction () {
    return process.env.NODE_ENV === 'production'
  }

  getRandomId () {
    return uuid.v4()
  }
}

const appService = new AppService()

export default appService
