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
      defaultValue: 'free',
      choices: [{
        label: 'Free',
        amount: 0,
        value: 'free'
      }, {
        label: 'Premium',
        amount: 50,
        value: 'premium'
      }]
    }, {
      type: 'select',
      label: 'color',
      defaultValue: 'red',
      choices: [{
        label: 'Red',
        amount: 10,
        value: 'red'
      }, {
        label: 'Green',
        amount: 20,
        value: 'green'
      }, {
        label: 'Blue',
        amount: 30,
        value: 'blue'
      }]
    }, {
      type: 'checkbox',
      label: 'animals',
      choices: [{
        label: 'Bird',
        value: 'bird'
      }, {
        label: 'Cat',
        value: 'cat'
      }, {
        label: 'Dog',
        value: 'dog'
      }]
    }]
  }

  isMultipleChoices (type) {
    return ['radio', 'select', 'checkbox'].indexOf(type) >= 0
  }

  isMultipleValues (type) {
    return ['checkbox'].indexOf(type) >= 0
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

  updateField (base, key, field, value) {
    return base.database().ref().update({
      [`forms/${key}/${field}`]: value
    })
  }
}

const formService = new FormService()

export default formService
