import React, {Component, PropTypes} from 'react'
import {defineMessages, injectIntl} from 'react-intl'

import './Modal.css'

import Button from '../Button'

const messages = defineMessages({
  cancel: {
    id: 'Modal.Cancel',
    defaultMessage: 'Cancel'
  }
})

class Modal extends Component {
  render () {
    const {
      intl,
      content,
      actionButton,
      onCancelClicked,
      onOverlayClicked
    } = this.props

    const componentName = content.type && content.type.name ? content.type.name : ''

    return (
      <div className={`Modal ${componentName}Modal`}>
        <div className={`ModalOverlay ${componentName}ModalOverlay`} onClick={onOverlayClicked} />
        <div className={`ModalWindow ${componentName}ModalWindow`}>
          <div className={`ModalWindowContent ${componentName}ModalWindowContent`}>{content}</div>
          <div className={`ModalWindowButtons ${componentName}ModalWindowButtons`}>
            <Button cancel text={intl.formatMessage(messages['cancel'])} onClick={onCancelClicked} />
            {actionButton}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  content: PropTypes.element.isRequired,
  actionButton: PropTypes.element.isRequired,
  onCancelClicked: PropTypes.func.isRequired,
  onOverlayClicked: PropTypes.func
}

export default injectIntl(Modal)
