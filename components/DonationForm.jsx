import React from 'react'
import {observer, inject} from 'mobx-react'
import {observable} from 'mobx'
import Layer from 'grommet/components/Layer'
import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import NumberInput from 'grommet/components/NumberInput'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'
import ApiService from 'ApiService'

@inject('appState') @observer
export default class DonationForm extends React.Component {
  @observable donationDetails = {
    name: null,
    email: null,
    phone: null,
    amount: null,
    date: null,
    pan: null,
    address: null
  }

  constructor (props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.updateDetail = this.updateDetail.bind(this)
    this.onChange = this.onChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  handleClose () {
    this.props.closeLayerCB()
  }

  updateDetail (key, value) {
    this.donationDetails[key] = value
  }

  onChange (event) {
    this.updateDetail(event.target.name, event.target.value)
  }

  submit () {
    let form = new FormData()
    Object.keys(this.donationDetails).forEach(key => form.append(key, this.donationDetails[key]));

    let apiService = new ApiService(this.props.appState.authorization.token)
    apiService.post('donations', form).then(response => {
      // TODO: Handle response
      console.log(response)
    })
  }

  render () {
    return (
    <Layer closer={true} onClose={this.handleClose}>
        <Form pad='medium'>
          <Header>
            <Heading>
              Donor Details
            </Heading>
          </Header>
          <FormField label='Name'>
            <TextInput name='name' onDOMChange={ this.onChange }/>
          </FormField>
          <FormField label='Email'>
            <TextInput name='email' onDOMChange={ this.onChange }/>
          </FormField>
          <FormField label='Phone'>
            <TextInput name='phone' onDOMChange={ this.onChange }/>
          </FormField>
          <FormField label='Amount'>
            <NumberInput name='amount' onChange={ this.onChange }/>
          </FormField>
          <FormField label='PAN'>
            <TextInput name='pan' onDOMChange={ this.onChange }/>
          </FormField>
          <FormField label='Address'>
            <TextInput name='address' onDOMChange={ this.onChange }/>
          </FormField>
          <Footer pad={{'vertical': 'medium'}}>
            <Button label='Add' type='submit' onClick={this.submit}/>
          </Footer>
        </Form>
    </Layer>
    )
  }
}

DonationForm.propTypes = {
  closeLayerCB: React.PropTypes.func
};
