import React from 'react';
import Three from 'three';
import MinecraftSkin from 'minecraft-skin';
import axios from 'axios';
import Stats from './profiles/Stats';
import Item from './profiles/Item';
import InventoryManager from '../services/Inventory.js';
import {Panel, Table, Well, Image, PageHeader} from 'react-bootstrap';

var Profiles = React.createClass({
  getInitialState: function () {
    return {
      user: '',
      stats: {},
      _stats: [],
      armor: {
        head: 'unknown',
        chest: 'unknown',
        legs: 'unknown',
        feet: 'unknown'
      }
    }
  },
  componentWillReceiveProps: function (nextProps) {
    axios.get('http://api.bleauweb.net/player/'+this.props.params.user).then(function (promise) {
      var data = promise.data.value.Inventory.value.value;
      this.state.armor.head = data[36].id.value;
      this.state.armor.chest = data[35].id.value;
      this.state.armor.legs = data[34].id.value;
      this.state.armor.feet = data[33].id.value;
      this.setState(this.state);
    }.bind(this));
    axios.get('http://api.bleauweb.net/data/translations').then(function (promise) {
      console.log(this.state.armor);
      this.state.translations = promise.data;
      this.setState(this.state);
      axios.get('http://api.bleauweb.net/player/'+nextProps.params.user+'/stats').
      then(function (promise) {
        this.state.user = nextProps.params.user;
        this.state.stats = promise.data;
        var mapped = Object.keys(promise.data).map(function (item, key) {
          var translations = Object.keys(this.state.translations);
          if (translations.indexOf(item) !== -1) {
            if (typeof promise.data[item] === 'number') {
              return (
                <tr key={key} width="100%">
                  <td width="90%">{this.state.translations[item]}</td>
                  <td width="10%">
                    {promise.data[item]}
                  </td>
                </tr>
              );
            }
          }
        }.bind(this));
        this.state._stats = mapped;
        this.setState(this.state);
      }.bind(this));
    }.bind(this));
  },
  componentDidMount: function () {
    axios.get('http://api.bleauweb.net/player/'+this.props.params.user).then(function (promise) {
      var data = promise.data.value.Inventory.value.value;
      this.state.armor.head = data[36].id.value;
      this.state.armor.chest = data[35].id.value;
      this.state.armor.legs = data[34].id.value;
      this.state.armor.feet = data[33].id.value;
      this.setState(this.state);
    }.bind(this));
    axios.get('http://api.bleauweb.net/data/translations').then(function (promise) {
      this.state.translations = promise.data;
      this.setState(this.state);
      axios.get('http://api.bleauweb.net/player/'+this.props.params.user+'/stats').
      then(function (promise) {
        this.state.user = this.props.params.user;
        this.state.stats = promise.data;
        var mapped = Object.keys(promise.data).map(function (item, key) {
          var translations = Object.keys(this.state.translations);
          if (translations.indexOf(item) !== -1) {
            if (typeof promise.data[item] === 'number') {
              return (
                <tr key={key} width="100%">
                  <td width="90%">{this.state.translations[item]}</td>
                  <td width="10%">
                    {promise.data[item]}
                  </td>
                </tr>
              );
            }
          }
        }.bind(this));
        this.state._stats = mapped;
        this.setState(this.state);
      }.bind(this));
    }.bind(this));
  },
	render: function () {
		return (
      <div>
        <div className="col-md-7">
          <Panel header={this.state.user + '\'s Profile'}>
            <div className="col-md-2">
            </div>
            <div className="col-md-8">
              <center><Image width="128" height="256" src={'./data/skins/'+this.state.user+'.png'} /></center>
            </div>
            <div className="col-md-2"></div>
          </Panel>
        </div>
        <div className="col-md-5">
          <Stats player={this.state.user} />
        </div>
        <div className="col-md-12">
          <Panel header={'Achevements'}>
      			<Table className="table">
              <tbody>
                {this.state._stats}
              </tbody>
      			</Table>
          </Panel>
        </div>
      </div>
		);
	}
});

export default Profiles;
