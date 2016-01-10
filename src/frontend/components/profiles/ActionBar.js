import React from 'react';
import Item from './Item';
import {Well} from 'react-bootstrap';

var ActionBar = React.createClass({
  render: function () {
    return (
      <Well>
        <Item id={3730} slot={0} />
        <Item id={271} slot={1} />
        <Item id={3} slot={2} />
        <Item id={287} slot={3} />
        <Item id={3730} slot={4} />
        <Item id={271} slot={5} />
        <Item id={3} slot={6} />
        <Item id={287} slot={7} />
        <Item id={287} slot={8} />
      </Well>
    );
  }
});

export default ActionBar;
