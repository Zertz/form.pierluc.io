import React, {Component, PropTypes} from 'react'

import './Loading.css'

import Text from '../Text'

class Loading extends Component {
  render () {
    const { percent, children } = this.props

    return (
      <div className='Loading'>
        {typeof percent === 'number' ? (
          <div className='LoadingDeterminate' />
        ) : (
          <div className='LoadingIndeterminate' />
        )}
        {children ? (
          <Text>{children}</Text>
        ) : null}
      </div>
    )
  }
}

Loading.propTypes = {
  percent: PropTypes.number,
  content: PropTypes.string
}

export default Loading
