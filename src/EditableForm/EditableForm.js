import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'

import './EditableForm.css'

import AppService from '../AppService'
import FormService from '../FormService'

import Button from '../Button'
import Dialog from '../Dialog'
import EditableFieldList from '../EditableFieldList'
import EditableTitle from '../EditableTitle'
import Loading from '../Loading'
import Modal from '../Modal'
import ModalFieldEditor from '../ModalFieldEditor'
import Text from '../Text'
import Uploader from '../Uploader'

class Form extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      isAddingField: undefined,
      isFieldEditorModalVisible: undefined,
      isEditingField: undefined,
      isRemovingField: undefined,
      isUploadingCoverImage: undefined
    }

    this.onCoverImageClicked = this.onCoverImageClicked.bind(this)
    this.onCoverImageUploaded = this.onCoverImageUploaded.bind(this)
    this.onCoverImageModalSaveClicked = this.onCoverImageModalSaveClicked.bind(this)
    this.onCoverImageModalCancelClicked = this.onCoverImageModalCancelClicked.bind(this)
    this.onCoverImageModalOverlayClicked = this.onCoverImageModalOverlayClicked.bind(this)

    this.onAddFieldClicked = this.onAddFieldClicked.bind(this)

    this.onEditFieldClicked = this.onEditFieldClicked.bind(this)
    this.onModalFieldEditorSave = this.onModalFieldEditorSave.bind(this)
    this.onModalFieldEditorClose = this.onModalFieldEditorClose.bind(this)

    this.onRemoveFieldClicked = this.onRemoveFieldClicked.bind(this)
    this.onRemoveFieldDialogConfirmClicked = this.onRemoveFieldDialogConfirmClicked.bind(this)
    this.onRemoveFieldDialogCancelClicked = this.onRemoveFieldDialogCancelClicked.bind(this)
    this.onRemoveFieldDialogOverlayClicked = this.onRemoveFieldDialogOverlayClicked.bind(this)

    this.onTitleSaved = this.onTitleSaved.bind(this)

    this.onFieldOrderChanged = this.onFieldOrderChanged.bind(this)

    this.getNextFieldOrder = this.getNextFieldOrder.bind(this)
    this.updateFieldOrder = this.updateFieldOrder.bind(this)
  }

  async componentDidMount () {
    const { base, routeParams } = this.props

    this.ref = base.listenTo(`forms/${routeParams.form}`, {
      context: this,
      then (form) {
        const state = { form }
        let callback

        if (this.state.form) {
          state.isLoading = false
        } else {
          callback = () => {
            this.updateFieldOrder()
          }
        }

        this.setState(state, callback)
      },
      onFailure (error) {
        console.error(error)
      }
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const {
      isAddingField,
      isEditingField
    } = this.state

    if (isAddingField && isAddingField !== isEditingField) {
      this.setState({
        isEditingField: isAddingField
      })
    }
  }

  componentWillUnmount () {
    const { base } = this.props

    base.removeBinding(this.ref)
  }

  onCoverImageClicked () {
    this.setState({
      isUploadingCoverImage: true
    })
  }

  onCoverImageUploaded (coverImage) {
    this.setState({
      isUploadingCoverImage: coverImage
    })
  }

  async onCoverImageModalSaveClicked () {
    const { base, routeParams } = this.props
    const { isUploadingCoverImage, form } = this.state

    if (form.coverImage === isUploadingCoverImage) {
      return
    }

    this.setState({
      isLoading: true,
      isUploadingCoverImage: false
    })

    try {
      if (isUploadingCoverImage) {
        await base.database().ref().update({
          [`forms/${routeParams.form}/coverImage`]: isUploadingCoverImage
        })
      } else {
        await base.database().ref(`forms/${routeParams.form}/coverImage`).remove()
      }
    } catch (error) {
      console.error(error)
    }
  }

  onCoverImageModalCancelClicked () {
    this.setState({
      isUploadingCoverImage: false
    })
  }

  onCoverImageModalOverlayClicked () {
    this.setState({
      isUploadingCoverImage: false
    })
  }

  onAddFieldClicked () {
    const { form } = this.state
    const key = AppService.getRandomId()

    this.setState({
      isAddingField: key,
      form: update(form, {
        fields: {
          [key]: {
            $set: {
              type: 'text',
              label: '',
              order: this.getNextFieldOrder()
            }
          }
        }
      })
    }, () => {
      this.onEditFieldClicked(key)()
    })
  }

  onEditFieldClicked (key) {
    return () => {
      this.setState({
        isFieldEditorModalVisible: true,
        isEditingField: key
      })
    }
  }

  async onModalFieldEditorSave (e, field) {
    const { base, routeParams } = this.props
    const { isEditingField, form } = this.state

    if (form.fields[isEditingField] === field) {
      return
    }

    this.setState({
      isLoading: true,
      isEditingField: false
    })

    try {
      await base.database().ref().update({
        [`forms/${routeParams.form}/fields/${isEditingField}`]: field
      })
    } catch (error) {
      console.error(error)
    }
  }

  onModalFieldEditorClose () {
    const { form, isAddingField } = this.state

    if (isAddingField) {
      this.setState({
        form: update(form, {
          fields: { $unset: [isAddingField] }
        }),
        isAddingField: false,
        isFieldEditorModalVisible: false
      })
    } else {
      this.setState({
        isFieldEditorModalVisible: false
      })
    }
  }

  onRemoveFieldClicked (key) {
    return (e) => {
      this.setState({
        isRemovingField: key
      })
    }
  }

  onRemoveFieldDialogConfirmClicked (key) {
    return async () => {
      const { base, routeParams } = this.props
      const { form } = this.state

      this.setState({
        isLoading: true
      })

      try {
        await base.database().ref(`forms/${routeParams.form}/fields/${key}`).remove()
      } catch (error) {
        console.error(error)
      }

      this.setState({
        form: update(form, {
          fields: { $unset: [key] }
        }),
        isRemovingField: false
      })
    }
  }

  onRemoveFieldDialogCancelClicked () {
    this.setState({
      isRemovingField: false
    })
  }

  onRemoveFieldDialogOverlayClicked () {
    this.setState({
      isRemovingField: false
    })
  }

  async onTitleSaved (title) {
    const { base, routeParams } = this.props
    const { form } = this.state

    if (form.title === title) {
      return
    }

    this.setState({
      isLoading: true
    })

    try {
      await base.database().ref().update({
        [`forms/${routeParams.form}/title`]: title
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onFieldOrderChanged (dragField, dropField) {
    const { base, routeParams } = this.props
    const { form } = this.state

    if (dragField === dropField) {
      return
    }

    this.setState({
      isLoading: true
    })

    try {
      await base.database().ref().update({
        [`forms/${routeParams.form}/fields/${dragField}/order`]: form.fields[dropField].order,
        [`forms/${routeParams.form}/fields/${dropField}/order`]: form.fields[dragField].order
      })
    } catch (error) {
      console.error(error)
    }
  }

  getNextFieldOrder () {
    const { form } = this.state

    return Object.keys(form.fields).reduce((order, key) => {
      const field = form.fields[key]
      const choices = FormService.isMultipleValues(field.type) && field.choices ? Object.keys(field.choices).length : 1
      const nextOrder = field.order + choices

      return nextOrder > order ? nextOrder : order
    }, 0)
  }

  async updateFieldOrder () {
    const { base, routeParams } = this.props
    const { form } = this.state

    const sortedFields = Object.keys(form.fields).sort((a, b) => {
      return form.fields[a].order > form.fields[b].order
    })

    const fieldsUpdate = {}
    let order = 0

    sortedFields.forEach((key, index) => {
      if (index > 0) {
        const isMultipleValues = FormService.isMultipleValues(form.fields[sortedFields[index - 1]].type)
        const choices = form.fields[sortedFields[index - 1]].choices

        if (isMultipleValues && choices && Object.keys(choices).length > 0) {
          order += Object.keys(choices).length
        } else {
          order++
        }
      }

      if (form.fields[key].order !== order) {
        fieldsUpdate[`forms/${routeParams.form}/fields/${key}/order`] = order
      }
    })

    if (Object.keys(fieldsUpdate).length === 0) {
      return this.setState({
        isLoading: false
      })
    }

    try {
      await base.database().ref().update(fieldsUpdate)
    } catch (error) {
      console.error(error)
    }
  }

  getHeaderStyle (form) {
    return form.coverImage ? {
      backgroundImage: `url('${form.coverImage}')`
    } : {}
  }

  render () {
    const { base } = this.props

    const {
      isLoading,
      isUploadingCoverImage,
      isFieldEditorModalVisible,
      isEditingField,
      isRemovingField,
      form
    } = this.state

    return isLoading ? <Loading /> : (
      <div className='EditableForm'>
        <div className='EditableFormHeader' style={this.getHeaderStyle(form)}>
          <Button onClick={this.onCoverImageClicked}>
            {form.coverImage ? (
              <FormattedMessage id='Form.ChangeImage' defaultMessage='Change image' />
            ) : (
              <FormattedMessage id='Form.AddImage' defaultMessage='Add image' />
            )}
          </Button>
        </div>
        <div className='EditableFormContent'>
          <EditableTitle onSave={this.onTitleSaved}>{form.title || ''}</EditableTitle>
          <Button onClick={this.onAddFieldClicked}>
            <FormattedMessage id='Form.AddField' defaultMessage='Add field' />
          </Button>
          <EditableFieldList
            fields={form.fields || {}}
            onEditClicked={this.onEditFieldClicked}
            onRemoveClicked={this.onRemoveFieldClicked}
            onOrderChanged={this.onFieldOrderChanged} />
        </div>
        {typeof form.fields[isEditingField] !== 'undefined' ? (
          <ModalFieldEditor
            isVisible={isFieldEditorModalVisible}
            field={form.fields[isEditingField]}
            onSave={this.onModalFieldEditorSave}
            onClose={this.onModalFieldEditorClose} />
        ) : null}
        {typeof isRemovingField !== 'undefined' ? (
          <Dialog
            isVisible={isRemovingField === false ? isRemovingField : true}
            actionMessage={<FormattedMessage id='Form.Remove' defaultMessage='Remove' />}
            onActionClicked={this.onRemoveFieldDialogConfirmClicked(isRemovingField)}
            onCancelClicked={this.onRemoveFieldDialogCancelClicked}
            onOverlayClicked={this.onRemoveFieldDialogOverlayClicked}>
            <Text>
              <FormattedMessage id='Form.ConfirmRemove' defaultMessage='Are you sure you want to remove this field?' />
            </Text>
          </Dialog>
        ) : null}
        {typeof isUploadingCoverImage !== 'undefined' ? (
          <Modal
            isVisible={!!isUploadingCoverImage}
            actionMessage={<FormattedMessage id='Form.Save' defaultMessage='Save' />}
            onActionClicked={this.onCoverImageModalSaveClicked}
            onCancelClicked={this.onCoverImageModalCancelClicked}
            onOverlayClicked={this.onCoverImageModalOverlayClicked}>
            <Uploader base={base} onFileUploaded={this.onCoverImageUploaded} />
          </Modal>
        ) : null}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Form)
