class RegistrationService {
  create (base, registration) {
    const registrationKey = base.database().ref('registrations').push().key
    const user = base.auth().currentUser.uid

    return base.database().ref().update({
      [`registrations/${registrationKey}`]: Object.assign(registration, {
        user
      }),
      [`users/${user}/registrations/${registrationKey}`]: true
    }).then((data) => Promise.resolve(registrationKey))
  }
}

const registrationService = new RegistrationService()

export default registrationService
