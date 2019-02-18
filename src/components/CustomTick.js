import React, { Component } from 'react'
import moment from 'moment'

export default class CustomTick extends Component {
  render () {
    // const {x, y, stroke, payload} = this.props;
    const {x, y, payload} = this.props;
		
   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" transform="rotate(-10)">
          {moment(payload.value, "YYYYMMDDHHmmss").format("MMM DD")}
        </text>
      </g>
    );
  }
}