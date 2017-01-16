import React, {Component} from 'react'

import './FieldEditor.css'

import FormService from '../FormService'
import FieldRenderer from '../FieldRenderer'

class FieldEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inputs: [{
        type: 'select',
        label: 'fieldType',
        value: props.input.type,
        choices: FormService.getFieldTypes().map((fieldType) => ({
          label: fieldType,
          value: fieldType
        }))
      }]
    }

    this.onFieldTypeChanged = this.onFieldTypeChanged.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onFieldTypeChanged () {
    // Stuff
  }

  onSubmit (e) {
    e.preventDefault()
  }

  render () {
    const { input } = this.props
    const { inputs } = this.state

    return (
      <div className='FieldEditor'>
        <form onSubmit={this.onSubmit}>
          {inputs.map((input, index) => <FieldRenderer key={index} input={input} />)}
        </form>
        <FieldRenderer input={input} />
      </div>
    )
  }
}

export default FieldEditor
