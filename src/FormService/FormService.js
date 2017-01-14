class FormService {
  getDefault () {
    return [{
      type: 'text',
      label: 'firstname'
    }, {
      type: 'text',
      label: 'lastname'
    }, {
      type: 'email',
      label: 'email'
    }]
  }

  create (base, form) {
    const formRef = base.database().ref('forms').push()

    return formRef.set(form)
  }
}

const formService = new FormService()

export default formService
