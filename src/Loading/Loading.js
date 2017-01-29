import React, {Component, PropTypes} from 'react'

import './Loading.css'

class Loading extends Component {
  render() {
    const { percent, content } = this.props

    return (
      <div className="Loading">
        {typeof percent === 'number' ? (
          <div className="LoadingDeterminate"></div>
        ) : (
          <div className="LoadingIndeterminate"></div>
        )}
        {content ? (
          <Text content={content} />
        ) : null}
      </div>
    );
  }
}

Loading.propTypes = {
  percent: PropTypes.number,
  content: PropTypes.string
}

export default Loading
