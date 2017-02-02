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
import UserIcon from 'grommet/components/icons/base/User'

@inject('appState') @observer
export default class Dashboard extends React.Component {
  @observable userName = 'Loading...'

  componentDidMount () {
    let userService = new UserService(this.props.appState.authorization.token)
    let that = this

    userService.fetch().then(function (response) {
      that.userName = response.name
    })
  }

  render () {
    return (
      <App centered={false}>
        <Split flex='right'>
          <Sidebar colorIndex='neutral-1'>
            <Header pad='medium'
              justify='between'>
              <Title>
                Title
              </Title>
            </Header>
            <Box flex='grow'
              justify='start'>
              <Menu primary={true}>
                <Anchor href='#'
                  className='active'>
                  First
                </Anchor>
                <Anchor href='#'>
                  Second
                </Anchor>
                <Anchor href='#'>
                  Third
                </Anchor>
              </Menu>
            </Box>
            <Footer pad='medium'>
              <Button icon={<UserIcon />} />
            </Footer>
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
