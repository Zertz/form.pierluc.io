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
}

const formService = new FormService()

export default formService
