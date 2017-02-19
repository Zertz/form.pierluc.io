import uuid from 'uuid'

class AppService {
  isProduction () {
    return process.env.NODE_ENV === 'production'
  }

  getApiUrl () {
    return this.isProduction() ? process.env.REACT_APP_API_URL_LIVE : process.env.REACT_APP_API_URL_TEST
  }

  getRandomId () {
    return uuid.v4()
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
