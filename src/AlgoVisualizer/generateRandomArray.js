import React from 'react';

export class GenerateRandomArray extends React.Component {

  render() {
    return (<button type="button" className="btn btn-primary" onClick={this.props.onClick}>Restart</button>);
  }
}
