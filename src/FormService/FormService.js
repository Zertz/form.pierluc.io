import {defineMessages} from 'react-intl'

class FormService {
  constructor () {
    this.messages = defineMessages({
      text: {
        id: 'FormService.Text',
        defaultMessage: 'Text'
      },
      email: {
        id: 'FormService.Email',
        defaultMessage: 'Email'
      },
      radio: {
        id: 'FormService.Radio',
        defaultMessage: 'Radio (multiple choices, single answer)'
      },
      select: {
        id: 'FormService.Select',
        defaultMessage: 'Select (multiple choices, single answer)'
      },
      checkbox: {
        id: 'FormService.Checkbox',
        defaultMessage: 'Checkbox (multiple choices, multiple answers)'
      }
    })
  }

  getFieldTypes () {
    return [
      'text',
      'email',
      'radio',
      'select',
      'checkbox'
    ]
  }

  getFieldTypeLabel (intl, fieldType) {
    return intl.formatMessage(this.messages[fieldType])
  }

  getOrderedChoices (choices) {
    return Object.keys(choices).sort((a, b) => choices[a].order > choices[b].order)
  }

  isMultipleChoices (type) {
    return ['radio', 'select', 'checkbox'].indexOf(type) >= 0
  }

  isMultipleValues (type) {
    return ['checkbox'].indexOf(type) >= 0
  }

  isSelect (type) {
    return type === 'select'
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
