import React from 'react';
import axios from 'axios';
import {Panel, Table} from 'react-bootstrap';

var Stats = React.createClass({
  getInitialState: function () {
    return {
      health: '',
      hunger: '',
      level: '',
      percent_level: ''
    };
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.player.length > 0) {
      axios.get('http://api.bleauweb.net/player/'+nextProps.player).then(function (promise) {
        this.state.health = promise.data.value.Health.value / 2;
        this.state.hunger = promise.data.value.foodLevel.value / 2;
        this.state.level = promise.data.value.XpLevel.value;
        this.state.percent_level = Math.floor(promise.data.value.XpP.value * 100);
        this.setState(this.state);
      }.bind(this));
    }
  },
  render: function () {
    return (
      <Panel header={'Stats'}>
        <Table>
          <tbody>
            <tr width="100%">
              <td width="90%">Health</td>
              <td width="10%">
                {this.state.health}
              </td>
            </tr>
            <tr width="100%">
              <td width="90%">Hunger</td>
              <td width="10%">
                {this.state.hunger}
              </td>
            </tr>
            <tr width="100%">
              <td width="90%">Level</td>
              <td width="10%">
                {this.state.level}
              </td>
            </tr>
            <tr width="100%">
              <td width="90%">Level Progress</td>
              <td width="10%">
                {this.state.percent_level}%
              </td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
});

export default Stats;
