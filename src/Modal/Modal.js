import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import classnames from 'classnames'

import './Modal.css'

import Button from '../Button'

class Modal extends Component {
  getWrappedComponentName (content) {
    if (!content || !content.type) {
      return ''
    }

    return content.type.WrappedComponent ? content.type.WrappedComponent.name : content.type.name
  }

  render () {
    const {
      isVisible,
      content,
      actionButton,
      onCancelClicked,
      onOverlayClicked
    } = this.props

    const componentName = this.getWrappedComponentName(content)

    return (
      <div className={classnames('Modal', `${componentName}Modal`, typeof isVisible === 'undefined' ? null : isVisible ? 'ModalVisible' : 'ModalHidden')}>
        <div className={`ModalOverlay ${componentName}ModalOverlay`} onClick={onOverlayClicked} />
        <div className={`ModalWindow ${componentName}ModalWindow`}>
          <div className={`ModalWindowContent ${componentName}ModalWindowContent`}>{content}</div>
          <div className={`ModalWindowButtons ${componentName}ModalWindowButtons`}>
            <Button cancel onClick={onCancelClicked}>
              <FormattedMessage id='Modal.Cancel' defaultMessage='Cancel' />
            </Button>
            {actionButton}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  isVisible: PropTypes.bool,
  content: PropTypes.element.isRequired,
  actionButton: PropTypes.element.isRequired,
  onCancelClicked: PropTypes.func.isRequired,
  onOverlayClicked: PropTypes.func
}

export default Modal
