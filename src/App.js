import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';
import { Header, Icon, Menu, Segment, Sidebar, Grid, Form } from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import moment from 'moment';

// const base_url = 'https://5twx0yd5ih.execute-api.us-west-2.amazonaws.com/test'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeItem: '',
      devices: [],
      datesRange: '',
    }
  }

  handleItemClick = (e, { name }) => {
    if(name !== this.state.name) {
      this.setState({ activeItem: name })
    }
  }

  handleDateChange = (e, {value}) => {
    console.log(value)

    this.setState({ datesRange: value })
  }

  fetchDevices = () => {
    let devices = ['francisco']
    // CORS hasn't been enabled for this endpoint
    //fetch(`${base_url}/names`).then(r => {
    //  let devices = r.json().names
    //  this.setState({ 
    //    devices: devices,
    //    activeItem: devices[0]
    //  })
    //})
    this.setState({ 
      devices: devices,
      activeItem: devices[0]
    })
  }

  setDatesRange = (demo = false) => {
    let start, end;
    if (demo) {
      start = moment('2018-12-01').format('DD-MM-YYYY')
      end = moment('2018-12-31').format('DD-MM-YYYY')
    } else {
      start = moment().subtract(1, 'months').startOf('month').format('DD-MM-YYYY')
      end = moment().subtract(1, 'months').endOf('month').format('DD-MM-YYYY')
    }

    this.setState({ datesRange: `${start} - ${end}` });
  }

  componentDidMount = () => {
    this.fetchDevices()
    this.setDatesRange(true)
  }

  render() {
    const { activeItem, devices } = this.state
    const [start, end] = this.state.datesRange.split(' - ')
    const chart = (activeItem && start && end) ? <Chart device={activeItem} datesRange={this.state.datesRange} /> : ''

    return (
      <div className="App">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' icon='labeled' inverted vertical visible width='thin'>
            <Menu.Item>
              <Header inverted>Devices</Header>
            </Menu.Item>
            {devices.map((device) => {
              return (
                <Menu.Item 
                  as='a'
                  name={device}
                  key={device}
                  active={activeItem === device}
                  onClick={this.handleItemClick}
                >
                <Icon name='microchip' /> {device}
                </Menu.Item>
              )
            })}
          </Sidebar>
      
          <Sidebar.Pusher>
            <Grid padded centered columns={1}>
              <Grid.Row>
                <Form>
                  <DatesRangeInput
                    popupPosition="bottom center"
                    name="datesRange"
                    placeholder="From - To"
                    closeOnMouseLeave={false}
                    clearable={true}
                    value={this.state.datesRange}
                    iconPosition="left"
                    onChange={this.handleDateChange}
                  />
                </Form>
              </Grid.Row>
              <Grid.Row>
                {chart}
              </Grid.Row>
            </Grid>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;
