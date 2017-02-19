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

  connect (options) {
    const { Request, Headers, fetch } = window

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

    const request = new Request(`${AppService.getApiUrl()}/stripeConnect`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        code
      })
    })

    return fetch(request)
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

  charge (options) {
    const { Request, Headers, fetch } = window

    if (!options) {
      throw new Error('options must be specified')
    }

    const { form, source, token } = options

    if (typeof form !== 'string') {
      throw new Error('options.form must be a string')
    }

    if (typeof source !== 'string') {
      throw new Error('options.source must be a string')
    }

    if (token && typeof token !== 'string') {
      throw new Error('options.token must be a string')
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    })

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    const request = new Request(`${AppService.getApiUrl()}/stripeCharge`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers,
      body: JSON.stringify({
        form,
        source
      })
    })

    return fetch(request)
  }
}

const paymentService = new PaymentService()

export default paymentService
