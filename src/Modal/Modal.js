import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import classnames from 'classnames'

import './Modal.css'

import Button from '../Button'

class Modal extends Component {
  render () {
    const {
      isVisible,
      componentName,
      actionMessage,
      onActionClicked,
      onCancelClicked,
      onOverlayClicked
    } = this.props

    return (
      <div className={classnames('Modal', typeof isVisible === 'undefined' ? null : isVisible ? 'ModalVisible' : 'ModalHidden')}>
        <div className={`ModalOverlay`} onClick={onOverlayClicked} />
        <div className={`ModalWindow`}>
          <div className={classnames('ModalWindowContent', componentName ? `Modal${componentName}` : '')}>{this.props.children}</div>
          <div className={`ModalWindowButtons`}>
            <Button cancel onClick={onCancelClicked}>
              <FormattedMessage id='Modal.Cancel' defaultMessage='Cancel' />
            </Button>
            <Button onClick={onActionClicked}>{actionMessage}</Button>
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  isVisible: PropTypes.bool,
  componentName: PropTypes.string,
  actionMessage: PropTypes.element.isRequired,
  onActionClicked: PropTypes.func.isRequired,
  onCancelClicked: PropTypes.func.isRequired,
  onOverlayClicked: PropTypes.func
}

export default Modal
