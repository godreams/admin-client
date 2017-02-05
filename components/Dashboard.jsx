import React from 'react'
import App from 'grommet/components/App'
import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import {observer, inject} from 'mobx-react'
import UserService from 'UserService'
import {observable} from 'mobx'
import Sidebar from 'grommet/components/Sidebar'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Footer from 'grommet/components/Footer'
import Split from 'grommet/components/Split'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import LogoutIcon from 'grommet/components/icons/base/Logout'
import Heading from 'grommet/components/Heading'

@inject('appState') @observer
export default class Dashboard extends React.Component {
  @observable userName = 'Loading...'

  constructor (props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  componentDidMount () {
    let userService = new UserService(this.props.appState.authorization.token)
    let that = this

    userService.fetch().then(function (response) {
      that.userName = response.name
    })
  }

  logout () {
    window.localStorage.removeItem('authorizationToken')
    this.props.router.push('/')
  }

  render () {
    return (
      <App centered={false}>
        <Split flex='right'>
          <Sidebar colorIndex='neutral-1'>
            <Box pad={ {horizontal: 'medium'} }>
              <Header>
                <Title>
                  National Finance Head
                </Title>
              </Header>

              <Menu size="small">
                <Header align='end'>
                  <Heading tag='h4' strong={ true }>Donations</Heading>
                </Header>

                <Anchor href='#' className='active'>Pending</Anchor>
                <Anchor href='#'>Approved</Anchor>


                <Header align='end'>
                  <Heading tag='h4' strong={ true }>Users</Heading>
                </Header>

                <Anchor href='#'>Volunteers</Anchor>
                <Anchor href='#'>Coaches</Anchor>
                <Anchor href='#'>Fellows</Anchor>
              </Menu>

              <Footer pad={ {vertical: 'medium'} }>
                <Button icon={<LogoutIcon />} label='Logout' onClick={ this.logout } plain={true} />
              </Footer>
            </Box>
          </Sidebar>

          <Box colorIndex='neutral-2' justify='center' align='center' pad='medium'>
            <Header direction='row' justify='between' pad={{horizontal: 'medium'}}>
              <Title>GoDreams Admin Interface</Title>
            </Header>

            Logged in user's name is: { this.userName }
          </Box>
        </Split>
      </App>
    )
  }
}
