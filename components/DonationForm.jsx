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
import DateTime from 'grommet/components/DateTime'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'

@inject('appState') @observer
export default class DonationForm extends React.Component {
  constructor (props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.submit = this.submit.bind(this)
  }

  handleClose () {
    this.props.closeLayerCB()
  }

  submit () {
    console.log('Submitted the new donation!')
  }

  render () {
    return (
    <Layer closer={true} onClose={this.handleClose}>
        <Form pad='medium'>
          <Header>
            <Heading>
              Donation Details
            </Heading>
          </Header>
          <FormField label='Name of Donor'>
            <TextInput />
          </FormField>
          <FormField label='Amount'>
            <NumberInput />
          </FormField>
          <FormField label='Date'>
            <DateTime />
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
