import AppService from '../AppService'

class PaymentService {
  isConnected (user) {
    return user && user.isStripeConnected === true
  }

  isDeferred (user) {
    return user && user.isStripeDeferred === true
  }

  getClientId () {
    return AppService.isProduction() ? process.env.REACT_APP_STRIPE_CLIENT_ID_LIVE : process.env.REACT_APP_STRIPE_CLIENT_ID_TEST
  }

  getConnectLink () {
    return `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${this.getClientId()}&scope=read_write`
  }

  getCentsAsCurrency (intl, cents) {
    return intl.formatNumber(parseInt(cents, 10) / 100, {
      style: 'currency',
      currency: 'USD'
    })
  }

  async connect (options) {
    const { Request, fetch } = window

    if (!options) {
      throw new Error('options must be specified')
    }

    const { code, token } = options

    if (typeof code !== 'string') {
      throw new Error('options.code must be a string')
    }

    if (typeof token !== 'string') {
      throw new Error('options.token must be a string')
    }

    const headers = AppService.getRequestHeaders({
      token
    })

    const request = new Request(`${AppService.getApiUrl()}/stripeConnect`, Object.assign(AppService.getRequestOptions(), {
      method: 'post',
      headers,
      body: JSON.stringify({
        code
      })
    }))

    const response = await fetch(request)

    return response.json()
  }

  initialize (options) {
    const { StripeCheckout } = window

    if (!options) {
      throw new Error('options must be specified')
    }

    if (typeof options.checkoutCallback !== 'function') {
      throw new Error('options.checkoutCallback must be a function')
    }

    return StripeCheckout.configure({
      key: AppService.isProduction() && options.isLive ? process.env.REACT_APP_STRIPE_PUBLIC_KEY_LIVE : process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: options.checkoutCallback
    })
  }

  async amount (options) {
    const { Request, fetch } = window

    if (!options) {
      throw new Error('options must be specified')
    }

    const { registrationId, token } = options

    if (typeof registrationId !== 'string') {
      throw new Error('options.registrationId must be a string')
    }

    const headers = AppService.getRequestHeaders({
      token
    })

    const request = new Request(`${AppService.getApiUrl()}/registrationAmount`, Object.assign(AppService.getRequestOptions(), {
      method: 'post',
      headers,
      body: JSON.stringify({
        registrationId
      })
    }))

    const response = await fetch(request)

    return response.json()
  }

  async charge (options) {
    const { Request, fetch } = window

    if (!options) {
      throw new Error('options must be specified')
    }

    const { registrationId, source, token } = options

    if (typeof registrationId !== 'string') {
      throw new Error('options.registrationId must be a string')
    }

    if (typeof source !== 'string') {
      throw new Error('options.source must be a string')
    }

    const headers = AppService.getRequestHeaders({
      token
    })

    const request = new Request(`${AppService.getApiUrl()}/stripeCharge`, Object.assign(AppService.getRequestOptions(), {
      method: 'post',
      headers,
      body: JSON.stringify({
        registrationId,
        source
      })
    }))

    const response = await fetch(request)

    return response.json()
  }
}

const paymentService = new PaymentService()

export default paymentService
