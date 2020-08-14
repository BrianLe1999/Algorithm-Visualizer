import React from 'react';
import './algoVisualizer.css';

export class SelectSortingType extends React.Component {

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  // function to handle changes in the form
  handleOnChange(e) {
    // get the sorting type selection
    const sortingTypeSelection = e.target.value;
    let type;
    switch(sortingTypeSelection) {
      case "bubble":
          type = "Bubble";
          break;
      case "selection":
          type = "Selection";
          break;
      case "merge":
          type = "Merge";
          break;
      case "quick":
          type = "Quick";
          break;
      default:
          type = "Bubble";
    }
    // send the algorithm type selection back to AlgoVisualizer Component
    this.props.onChange(type);
  }
  render() {
    return (
      <div className="form-check form-check-inline type-selections">
        <div className="col-3">
          <input className="form-check-input" type="radio" name="sortingAlgorithm" value="buble" onChange={this.handleOnChange}/>
          <label className="form-check-label" >
              Bubble Sort
          </label>
        </div>
        <div className="col-3" >
          <input className="form-check-input" type="radio" name="sortingAlgorithm" value="selection" onChange={this.handleOnChange}/>
          <label className="form-check-label">
              Selection Sort
            </label>
        </div>
        <div className="col-3" >
          <input className="form-check-input" type="radio" name="sortingAlgorithm" value="merge" onChange={this.handleOnChange}/>
          <label className="form-check-label" >
              Merge Sort
            </label>
        </div>
        <div className="col-3">
          <input className="form-check-input" type="radio" name="sortingAlgorithm" value="quick" onChange={this.handleOnChange}/>
          <label className="form-check-label">
              Quick Sort
            </label>
        </div>
      </div> );
    }
}
