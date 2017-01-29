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

  isMultipleChoices (type) {
    return ['radio', 'select', 'checkbox'].indexOf(type) >= 0
  }

  create (base, form) {
    const formKey = base.database().ref('forms').push().key
    const user = base.auth().currentUser.uid

    return base.database().ref().update({
      [`forms/${formKey}`]: Object.assign(form, {
        user
      }),
      [`users/${user}/forms/${formKey}`]: true
    }).then((data) => Promise.resolve(formKey))
  }

  update (base, key, form) {
    return base.database().ref().update({
      [`forms/${key}`]: form
    })
  }
}

const formService = new FormService()

export default formService
