import React, {Component, PropTypes} from 'react'
import {defineMessages, injectIntl} from 'react-intl'

import './Dialog.css'

import Button from '../Button'

const messages = defineMessages({
  cancel: {
    id: 'Dialog.Cancel',
    defaultMessage: 'Cancel'
  }
})

class Dialog extends Component {
  render () {
    const {
      intl,
      content,
      actionButton,
      onCancelClicked,
      onOverlayClicked
    } = this.props

    return (
      <div className='Dialog'>
        <div className='DialogOverlay' onClick={onOverlayClicked} />
        <div className='DialogWindow'>
          <div className='DialogWindowContent'>{content}</div>
          <div className='DialogWindowButtons'>
            <Button classnames='Cancel' text={intl.formatMessage(messages['cancel'])} onClick={onCancelClicked} />
            {actionButton}
          </div>
        </div>
      </div>
    )
  }
}

Dialog.propTypes = {
  content: PropTypes.string.isRequired,
  actionButton: PropTypes.element.isRequired,
  onCancelClicked: PropTypes.func.isRequired,
  onOverlayClicked: PropTypes.func
}

export default injectIntl(Dialog)
