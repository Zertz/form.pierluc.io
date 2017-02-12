import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import classnames from 'classnames'

import './Dialog.css'

import Button from '../Button'

class Dialog extends Component {
  render () {
    const {
      isVisible,
      actionMessage,
      onActionClicked,
      onCancelClicked,
      onOverlayClicked
    } = this.props

    return (
      <div className={classnames('Dialog', typeof isVisible === 'undefined' ? null : isVisible ? 'DialogVisible' : 'DialogHidden')}>
        <div className='DialogOverlay' onClick={onOverlayClicked} />
        <div className='DialogWindow'>
          <div className='DialogWindowContent'>{this.props.children}</div>
          <div className='DialogWindowButtons'>
            <Button cancel onClick={onCancelClicked}>
              <FormattedMessage id='Dialog.Cancel' defaultMessage='Cancel' />
            </Button>
            <Button onClick={onActionClicked}>{actionMessage}</Button>
          </div>
        </div>
      </div>
    )
  }
}

Dialog.propTypes = {
  isVisible: PropTypes.bool,
  actionMessage: PropTypes.element.isRequired,
  onActionClicked: PropTypes.func.isRequired,
  onCancelClicked: PropTypes.func.isRequired,
  onOverlayClicked: PropTypes.func
}

export default Dialog
