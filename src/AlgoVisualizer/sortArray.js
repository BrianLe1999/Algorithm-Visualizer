import React from 'react';

export class SortArray extends React.Component {

  render() {
    return (<button type="button" className="btn btn-primary" id="sort-btn" onClick={this.props.onClick}>Sort</button>);
  }
}
