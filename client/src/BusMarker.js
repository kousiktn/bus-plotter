import React, {PureComponent} from 'react';


export default class BusMarker extends PureComponent {

  render() {
    const {size = 20, onClick, direction} = this.props;

    return (
      <svg height={size} width={size}
        onClick={onClick} >
          {direction === 'E' &&
            <path d={"M0,0 L0," + size + " L" + size / 2 + "," + size / 2 + " z"} fill="#000" />
          }
          {
            direction === 'N' &&
            <path d={"M0," + size + " L" + size + "," + size + " L " + size / 2 + "," + size / 2 + " z"} fill="#000" />
          }
          {
            direction === 'S' &&
            <path d={"M0,0 L" + size + ",0 L" + size / 2 + "," + size / 2 + " z" } fill="#000" />
          }
          {
            direction === 'W' &&
            <path d={"M" + size + ",0 L" + size + "," + size + " L" + size/2 + "," + size/2 + " z"} fill="#000" />
          }
      </svg>
    );
  }
}
