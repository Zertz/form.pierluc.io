import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import classnames from 'classnames'

import './Dialog.css'

import Button from '../Button'
import Text from '../Text'

class Dialog extends Component {
  render () {
    const {
      isVisible,
      content,
      actionButton,
      onCancelClicked,
      onOverlayClicked
    } = this.props

    return (
      <div className={classnames('Dialog', typeof isVisible === 'undefined' ? null : isVisible ? 'DialogVisible' : 'DialogHidden')}>
        <div className='DialogOverlay' onClick={onOverlayClicked} />
        <div className='DialogWindow'>
          <div className='DialogWindowContent'>
            <Text content={content} />
          </div>
          <div className='DialogWindowButtons'>
            <Button cancel onClick={onCancelClicked}>
              <FormattedMessage id='Dialog.Cancel' defaultMessage='Cancel' />
            </Button>
            {actionButton}
          </div>
        </div>
      </div>
    )
  }
}

Dialog.propTypes = {
  isVisible: PropTypes.bool,
  content: PropTypes.string.isRequired,
  actionButton: PropTypes.element.isRequired,
  onCancelClicked: PropTypes.func.isRequired,
  onOverlayClicked: PropTypes.func
}

export default Dialog
