import React, {Component, PropTypes} from 'react'
import {defineMessages, injectIntl} from 'react-intl'

import './Modal.css'

import Button from '../Button'

const messages = defineMessages({
  cancel: {
    id: 'Dialog.Cancel',
    defaultMessage: 'Cancel'
  }
})

class Modal extends Component {
  render () {
    const {
      intl,
      title,
      content,
      actionButton,
      onCancelClicked,
      onOverlayClicked
    } = this.props

    return (
      <div className='Modal'>
        <div className='ModalOverlay' onClick={onOverlayClicked} />
        <div className='ModalWindow'>
          <div className='ModalWindowHeader'>{title}</div>
          <div className='ModalWindowContent'>{content}</div>
          <div className='ModalWindowFooter'>
            <Button classnames='Cancel' text={intl.formatMessage(messages['cancel'])} onClick={onCancelClicked} />
            {actionButton}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
  actionButton: PropTypes.element.isRequired,
  onCancelClicked: PropTypes.func.isRequired,
  onOverlayClicked: PropTypes.func
}

export default injectIntl(Modal)
