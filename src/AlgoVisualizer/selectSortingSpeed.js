import React from 'react';

export class SelectSortingSpeed extends React.Component {

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(e) {
    const speedSelection = e.target.value;
    let speed;
    switch(speedSelection) {
      case "slow":
          speed = 100;
          break;
      case "medium":
          speed = 50;
          break;
      case "fast":
          speed = 5;
          break;
      default:
          alert("Please select the sorting speed!");
          speed = 10;
    }
    // send the speed selection back to AlgoVisualizer Component
    this.props.onChange(speed);
  }
  render() {
    return (
      <select className="custom-select mx-auto" id="speed-selection" onChange={this.handleOnChange}>
        <option selected>Select Sorting Speed</option>
        <option value="slow">Slow</option>
        <option value="medium">Medium</option>
        <option value="fast">Fast</option>
      </select> );
    }
}
