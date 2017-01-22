import AppService from '../AppService'

class PaymentService {
  isConnected (user) {
    return user && user.isStripeConnected === true
  }

  isDeferred (user) {
    return user && user.isStripeDeferred === true
  }

  getConnectLink () {
    return `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&scope=read_write`
  }

  connect (options) {
    const { Request, Headers, fetch } = window

    if (!options) {
      throw new Error('options must be specified')
    }

    const { code, userToken } = options

    if (typeof code !== 'string') {
      throw new Error('options.code must be a string')
    }

    if (typeof userToken !== 'string') {
      throw new Error('options.userToken must be a string')
    }

    const request = new Request(`${process.env.REACT_APP_PAYMENT_API_URL}/connect`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: new Headers({
        'Authorization': `Bearer ${userToken}`
      }),
      body: JSON.stringify({ code })
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

    const { formId, stripeToken, userToken } = options

    if (typeof formId !== 'string') {
      throw new Error('options.formId must be a string')
    }

    if (typeof stripeToken !== 'string') {
      throw new Error('options.stripeToken must be a string')
    }

    if (typeof userToken !== 'string') {
      throw new Error('options.userToken must be a string')
    }

    const request = new Request(`${process.env.REACT_APP_PAYMENT_API_URL}/charge`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: new Headers({
        'Authorization': `Bearer ${userToken}`
      }),
      body: JSON.stringify({ formId, stripeToken })
    })

    return fetch(request)
  }
}

const paymentService = new PaymentService()

export default paymentService
