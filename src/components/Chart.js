import React, { Component } from 'react'
import { ComposedChart, XAxis, YAxis, Legend, Line, CartesianGrid, Label } from 'recharts';
import CustomTick from './CustomTick';
import moment from 'moment';
import { Loader, Segment, Header, Icon, Message } from 'semantic-ui-react'

const base_url = 'https://cceqzjbfdk.execute-api.us-west-2.amazonaws.com/test/dummy/consumption'

export default class Chart extends Component {

  constructor(props) {
    super(props);
    let [start, end] = props.datesRange.split(' - ')

    this.state = {
      loader: true,
      loaderContent: 'Loading..',
      errorMessage: false,
      mock: [],
      data: [],
      device: props.device,
      dateStart: start,
      dateEnd: end
    };
  }

  componentDidMount = () => {
    if(!this.state.device) return
    const lastMonthStart = moment(this.state.dateStart, 'DD-MM-YYYY').format('YYYYMMDDHHmmss')
    const lastMonthEnd = moment(this.state.dateEnd, 'DD-MM-YYYY').format('YYYYMMDDHHmmss')
    console.log('Calling endpoint..')
    fetch(`${base_url}?startDate=${lastMonthStart}&endDate=${lastMonthEnd}&IotId=${this.state.device}`).then(r => {
      console.log('fetch')
      r.json().then(data => {
        if(data.serverError || !data.liter){
          this.setState({errorMessage: true, loader: false})
        } else {
          this.setState({data: this.prepData(data), loader: false})
        }
      })
    })
  }
  
  prepData(data) {
    const isCharge = (timestamp, charge) => {
      if(timestamp >= charge.startDate && timestamp <= charge.endDate){
        return true
      }

      return false
    }

    return data.time.map((timestamp, i) => {
      let datapoint = {
        time: timestamp,
        liters: data.liter[i]
      }

      for (const charge of data.abnormalcharge) {
        if(isCharge(timestamp, charge)) {
          datapoint.abnormal = data.liter[i]
        }
      }

      for (const charge of data.discharge) {
        if(isCharge(timestamp, charge)) {
          datapoint.discharge = data.liter[i]
        }
      }

      for (const charge of data.recharge) {
        if(isCharge(timestamp, charge)) {
          datapoint.recharge = data.liter[i]
        }
      }

      return datapoint
    })
  }
  
  render() {
    const { data } = this.state
    return (
      <Segment>
        <Loader active={this.state.loader} content={this.state.loaderContent} />
        <ComposedChart width={1000} height={400} data={data}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <Label value="Pages of my website" offset={0} position="insideBottom" />
          <XAxis dataKey="time" tick={<CustomTick/>} />
          <YAxis dataKey="liters" label={{ value: "Liters", angle: -90, position: 'insideLeft', fontSize: 25 }} />
          <Legend verticalAlign="top" height={36}/>
          <CartesianGrid strokeDasharray="3 3" horizontalPoints={[100, 200, 300]} />
          <Line name="Liters" legendType="none" type='basis' dataKey='liters' strokeWidth={3} stroke='gray' fill='#7293a0' dot={false} />
          <Line name="Abnormal" legendType="diamond" type='basis' dataKey='abnormal' stroke='yellow' dot={false}/>
          <Line name="Recharge" legendType="diamond" type='basis' dataKey='recharge' stroke='green' dot={false}/>
          <Line name="Discharge" legendType="diamond" type='basis' dataKey='discharge' stroke='red' dot={false}/>
        </ComposedChart>
      </Segment>
    )
  }
}


