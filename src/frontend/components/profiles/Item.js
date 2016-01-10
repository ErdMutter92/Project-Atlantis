import React from 'react';
import {OverlayTrigger, Popover, Image} from 'react-bootstrap';

var Item = React.createClass({
  render: function () {
    return (
      <OverlayTrigger trigger="click" placement="top" overlay={<Popover id='slot0' title="Popover bottom"><strong></strong> Check this info.</Popover>}>
        <Image src={"../../resources/icons/"+this.props.id+".png"} />
      </OverlayTrigger>
    );
  }
});

export default Item;
