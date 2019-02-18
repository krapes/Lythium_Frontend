import React, { Component } from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

export default class SidebarExampleVisible extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return(
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} animation='push' icon='labeled' inverted vertical visible width='thin'>
          <Menu.Item 
            as='a'
            name='Francisco'
            active={activeItem === 'Francisco'}
            onClick={this.handleItemClick}
          >
            <Icon name='microchip' /> Francisco
          </Menu.Item>
        </Sidebar>
    
        <Sidebar.Pusher>
          <Segment basic>
            <Header as='h3'>Application Content</Header>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}
