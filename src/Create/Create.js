import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {browserHistory} from 'react-router'

import './Create.css'

import AppService from '../AppService'
import FormService from '../FormService'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Loading from '../Loading'
import Text from '../Text'
import Title from '../Title'

class Create extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false
    }

    this.createFormWithFields = this.createFormWithFields.bind(this)
    this.createForm = this.createForm.bind(this)
  }

  getDefaultFields () {
    return {
      [AppService.getRandomId()]: {
        type: 'text',
        label: 'firstname',
        order: 0
      },
      [AppService.getRandomId()]: {
        type: 'text',
        label: 'lastname',
        order: 1
      },
      [AppService.getRandomId()]: {
        type: 'email',
        label: 'email',
        order: 2
      }
    }
  }

  createFormWithFields (e) {
    const fields = this.getDefaultFields()

    this.createForm(e, fields)
  }

  async createForm (e, fields) {
    const { base } = this.props
    const form = fields ? {
      fields
    } : {}

    this.setState({
      isLoading: true
    })

    try {
      const key = await FormService.create(base, form)

      browserHistory.push(`/browse/${key}`)
    } catch (error) {
      console.error(error)

      this.setState({
        isLoading: false
      })
    }
  }

  render () {
    const { isLoading } = this.state

    return isLoading ? (
      <Loading>
        <FormattedMessage id='Create.SettingUpYourForm' defaultMessage='Setting up your form...' />
      </Loading>
    ) : (
      <div className='Create'>
        <Title>
          <FormattedMessage id='Create.CreateAForm' defaultMessage='Create a Form' />
        </Title>
        <Text>
          <FormattedMessage id='Create.GetStartedQuickly' defaultMessage="We can create a few common fields to help you get started started quickly, or you can do it all by yourself. Either way, you'll be able to tailor your Form according to your needs." />
        </Text>
        <ButtonGroup>
          <Button onClick={this.createFormWithFields}>
            <FormattedMessage id='Create.UseDefaultFields' defaultMessage='Add default fields' />
          </Button>
          <Button onClick={this.createForm}>
            <FormattedMessage id='Create.StartFromScratch' defaultMessage='Start from scratch' />
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}

Create.propTypes = {
}

export default Create
