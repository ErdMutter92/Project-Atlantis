import React from 'react';
import Three from 'three';
import MinecraftSkin from 'minecraft-skin';
import axios from 'axios';
import Stats from './profiles/Stats';
import {Panel, Table, Well} from 'react-bootstrap';

var Profiles = React.createClass({
  getInitialState: function () {
    return {
      user: '',
      stats: {},
      _stats: []
    }
  },
  componentWillReceiveProps: function (nextProps) {
    axios.get('http://api.bleauweb.net/data/translations').then(function (promise) {
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
        <div className="col-md-8"></div>
        <div className="col-md-4">
          <Stats player={this.state.user} />
        </div>
        <div className="col-md-12">
          <Panel header={this.state.user + '\'s Achevements'}>
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
