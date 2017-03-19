import Rebase from 're-base'
import uuid from 'uuid'

class AppService {
  isProduction () {
    return process.env.NODE_ENV === 'production'
  }

  initializeFirebase () {
    return Rebase.createClass(this.isProduction() ? {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY_LIVE,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_LIVE,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_LIVE,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_LIVE,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID_LIVE
    } : {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY_TEST,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_TEST,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_TEST,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_TEST,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID_TEST
    })
  }

  getApiUrl () {
    return this.isProduction() ? process.env.REACT_APP_API_URL_LIVE : process.env.REACT_APP_API_URL_TEST
  }

  getRandomId () {
    return uuid.v4()
  }

  getRequestHeaders (options = {}) {
    const { Headers } = window

    if (!options) {
      throw new Error('options must be specified')
    }

    const { token } = options

    if (token && typeof token !== 'string') {
      throw new Error('options.token must be a string')
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    })

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }

  getRequestOptions () {
    return {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit'
    }
  }

  getUserLocation () {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const queryParams = {
        username: 'form_pierluc_io',
        type: 'json',
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      const queryString = Object.keys(queryParams).map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
      }).join('&')

      const request = new window.Request(`http://ws.geonames.org/countryCode?${queryString}`, {
        method: 'post',
        mode: 'cors',
        credentials: 'omit'
      })

      try {
        const response = await window.fetch(request)
        const json = await response.json()

        console.info(json)
      } catch (error) {
        console.error(error)
      }
    })
  }
}

const appService = new AppService()

export default appService
