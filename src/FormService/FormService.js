class FormService {
  getFieldTypes () {
    return [
      'text',
      'email',
      'radio',
      'select',
      'checkbox'
    ]
  }

  getDefaultFields () {
    return [{
      type: 'text',
      label: 'firstname'
    }, {
      type: 'text',
      label: 'lastname'
    }, {
      type: 'email',
      label: 'email'
    }, {
      type: 'radio',
      subtype: 'payment',
      label: 'plan',
      choices: [{
        label: 'free',
        value: 0
      }, {
        label: 'premium',
        value: 10000
      }]
    }, {
      type: 'select',
      label: 'color',
      choices: [{
        label: 'red'
      }, {
        label: 'green'
      }, {
        label: 'blue'
      }]
    }, {
      type: 'checkbox',
      label: 'animals',
      choices: [{
        label: 'bird'
      }, {
        label: 'cat'
      }, {
        label: 'dog'
      }]
    }]
  }

  create (base, form) {
    const formsRef = base.database().ref('forms').push()

    return formsRef.set(Object.assign(form, {
      user: base.auth().currentUser.uid
    }))
  }
}

const formService = new FormService()

export default formService
