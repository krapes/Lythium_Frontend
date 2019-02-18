import React, { Component } from 'react'
import { Form } from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import moment from 'moment';

export default class DateTimeForm extends Component {
    constructor(props) {
      super(props);
   
      this.state = {
        datesRange: ''
      };
    }
   
    handleChange = (event, {name, value}) => {
      if (this.state.hasOwnProperty(name)) {
          console.log(this.state.datesRange)
        this.setState({ [name]: value });
      }
    }
   
    render() {
      return (
        <Form>
          <DatesRangeInput
            popupPosition="bottom center"
            initialDate={moment().startOf('month')}
            name="datesRange"
            placeholder="From - To"
            value={this.state.datesRange}
            iconPosition="left"
            onChange={this.handleChange}
          />
        </Form>
      );
    }
  }