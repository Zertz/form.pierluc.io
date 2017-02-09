import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import './Uploader.css'

import Loading from '../Loading'
import Subtitle from '../Subtitle'
import Text from '../Text'

class Uploader extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isUploading: false
    }

    this.onFileChanged = this.onFileChanged.bind(this)
  }

  onFileChanged (e) {
    const { base, onFileUploaded } = this.props

    if (e.target.files && e.target.files.length !== 1) {
      return
    }

    const file = e.target.files[0]
    const uploadTask = base.storage().ref().child('images/' + file.name).put(file)

    uploadTask.on(base.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

      switch (snapshot.state) {
        case base.storage.TaskState.PAUSED:
          this.setState({
            isUploading: false
          })
          break
        case base.storage.TaskState.RUNNING:
          this.setState({
            isUploading: true,
            uploadedPercent: progress
          })
          break
        default:
          break
      }
    }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
            // User doesn't have permission to access the object
          break
        case 'storage/canceled':
            // User canceled the upload
          break
        case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
          break
        default:
          break
      }
    }, () => {
      const { downloadURL } = uploadTask.snapshot

      this.setState({
        isUploading: false,
        uploadedImage: downloadURL
      })

      onFileUploaded(downloadURL)
    })
  }

  render () {
    const {
      isUploading,
      uploadedPercent,
      uploadedImage
    } = this.state

    return (
      <div className='Uploader'>
        {isUploading ? (
          <Loading content={`${parseInt(uploadedPercent, 10)}%`} />
        ) : uploadedImage ? (
          <div className='UploaderImage' style={{backgroundImage: `url('${uploadedImage}')`}} />
        ) : (
          <label className='UploaderLabel'>
            <input type='file' onChange={this.onFileChanged} multiple={false} />
            <Subtitle>
              <FormattedMessage id='Uploader.UploadAnImage' defaultMessage='Upload an image' />
            </Subtitle>
            <Text>
              <FormattedMessage id='Uploader.ClickOrDrag' defaultMessage='Click to choose a file, or drag and drop.' />
            </Text>
          </label>
        )}
      </div>
    )
  }
}

export default Uploader
