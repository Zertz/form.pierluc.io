class AppService {
  isProduction () {
    return process.env.NODE_ENV === 'production'
  }
}

const appService = new AppService()

export default appService
