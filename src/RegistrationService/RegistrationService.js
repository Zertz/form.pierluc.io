class RegistrationService {
  create (base, registration) {
    const registrationKey = base.database().ref('registrations').push().key
    const user = base.auth().currentUser ? base.auth().currentUser.uid : undefined

    const update = user ? base.database().ref().update({
      [`registrations/${registrationKey}`]: Object.assign(registration, {
        user
      }),
      [`users/${user}/registrations/${registrationKey}`]: true
    }) : base.database().ref().update({
      [`registrations/${registrationKey}`]: registration
    })

    return update.then((data) => Promise.resolve(registrationKey))
  }
}

const registrationService = new RegistrationService()

export default registrationService
