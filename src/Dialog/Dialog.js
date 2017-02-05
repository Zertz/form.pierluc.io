import React, {Component, PropTypes} from 'react'
import {defineMessages, injectIntl} from 'react-intl'
import classnames from 'classnames'

import './Dialog.css'

import Button from '../Button'
import Text from '../Text'

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
            <Button cancel text={intl.formatMessage(messages['cancel'])} onClick={onCancelClicked} />
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

export default injectIntl(Dialog)
