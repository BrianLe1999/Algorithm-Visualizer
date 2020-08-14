import React from 'react';

export class SelectArraySize extends React.Component {

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(e) {
    const sizeSelection = e.target.value;
    let size;
    switch(sizeSelection) {
      case "extra-small":
          size = 10;
          break;
      case "small":
          size = 30;
          break;
      case "medium":
          size = 50;
          break;
      case "large":
          size = 70;
          break;
      case "extra-large":
          size = 90;
          break;
      default:
          alert("Please select the array size!");
          size = 10;
    }
    // send the array size back to AlgoVisualizer Component
    this.props.onChange(size);
  }
  render() {
    return (
      <select className="custom-select" id="size-selection" onChange={this.handleOnChange}>
        <option selected>Select Array Size</option>
        <option value="extra-small">Extra Small</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="extra-large">Extra Large</option>
      </select> );
    }
}
