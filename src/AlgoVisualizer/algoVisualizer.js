import React from 'react';
import './algoVisualizer.css'; //stylesheet
import {GenerateRandomArray} from './generateRandomArray'; //component for restart button
import {SelectArraySize} from './selectArraySize'; // component for selecting array size
import {SelectSortingSpeed} from './selectSortingSpeed'; // component for selecting sorting speed
import {SelectSortingType} from './selectSortingType'; // component for selecting sorting algorithm
import {SortArray} from './sortArray'; // component for sort button
import {getBubbleSortAnimation} from './sortingAlgorithm'; // function to get animation array for bubble sort
import {getSelectionSortAnimation} from './sortingAlgorithm'; // function to get animation array for selection sort
import {getMergeSortAnimation} from './sortingAlgorithm'; // function to get animation array for merge sort
import {getQuickSortAnimation} from './sortingAlgorithm'; // function to get animation array for quick sort
import 'bootstrap/dist/css/bootstrap.css'; // import bootstrap

const MAIN_COLOR = "#add8e6"; // main_color is light blue
const CHANGING_COLOR = 'green';
const PREPARING_COLOR = 'red';
const TRAVERSE_COLOR = 'blue';



export default class AlgoVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {array: [],
                arraySize: 50,
                sortingSpeed: 5,
                sortingAlgorithm: "Bubble",
                width: 1000,
                height: 800};
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.restoreOldArray = this.restoreOldArray.bind(this);
    this.changeArraySize = this.changeArraySize.bind(this);
    this.createRandomArray = this.createRandomArray.bind(this);
    this.changeSortingSpeed = this.changeSortingSpeed.bind(this);
    this.changeSortingType = this.changeSortingType.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.selectionSort = this.selectionSort.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.selectSortingAlgoritm = this.selectSortingAlgoritm.bind(this);

  }

  // when the app is rendered the first time
  componentDidMount() {
    this.createRandomArray();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions(); // update width and height in this.state
    testSortingAlgorithm(getBubbleSortAnimation);  // test the correctness of each algorithm
    testSortingAlgorithm(getSelectionSortAnimation);
    testSortingAlgorithm(getMergeSortAnimation);
    testSortingAlgorithm(getQuickSortAnimation);

  }
  // function to update the width and height to ensure responsiveness
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);

  }

  // function to restore the original array after each turn
  restoreOldArray() {
    let newArray = this.state.array;
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; ++i) {
      let newHeight = newArray[i];
      arrayBars[i].style.height = `${newHeight}px`;;
    }
  }

  // function to create a random array at the beginning of each session
  createRandomArray() {
    let randomArray = [];
    const LOWER_LIMIT = 5;
    const UPPER_LIMIT = Math.floor(this.state.height * 0.5); // upper_limit is half of the device height
    for (let index = 0; index < this.state.arraySize; ++index){
      randomArray.push(getRandomNumberInAnInterval(LOWER_LIMIT, UPPER_LIMIT));
    }
    this.setState({array: randomArray});
  }

  async changeArraySize(newSize){
    await this.setState({arraySize: newSize});
    // when changing array size, create a new array and enable the sort button
    this.createRandomArray();
    this.enableSortButtonAfterSorting();
  }
  async changeSortingSpeed(newSortingSpeed) {
    await this.setState({sortingSpeed: newSortingSpeed});
    // when changing the sorting speed, restore the original array and enable the sort button
    this.restoreOldArray();
    this.enableSortButtonAfterSorting();
  }

  async changeSortingType(newSortingAlgorithm) {
    await this.setState({sortingAlgorithm: newSortingAlgorithm});
    // when changing the sorting algorithm, restore the original array and enable the sort button
    this.restoreOldArray();
    this.enableSortButtonAfterSorting();
  }

  // function to select sorting algorithm based on the one selected
  selectSortingAlgoritm() {
    switch(this.state.sortingAlgorithm){
      case "Bubble":
        return this.bubbleSort;
      case "Selection":
        return this.selectionSort;
      case "Merge":
        return this.mergeSort;
      case "Quick":
        return this.quickSort;
      default:
        console.log("sortingAlgorithm was not selected!");
    }
  }

  // prevent users from clicking sort button multiple times
  disableSelectionsWhileSorting() {
    document.getElementById('sort-btn').disabled = true;
  }

  // allow users to sort again after completing the sorting turn successfully
  enableSortButtonAfterSorting() {
    document.getElementById('sort-btn').disabled = false;
  }
  // function to refresh the app when users click on restart
  refreshPage() {
    window.location.reload(true);
  }


  // function to do bubbleSort
  bubbleSort() {
    // disable the sort button
    this.disableSelectionsWhileSorting();
    // get the animation array for animation steps
    const animationSteps = getBubbleSortAnimation(this.state.array.slice()).animationSteps;
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animationSteps.length; ++i){
      if (animationSteps[i][0] === -1) {
        continue;
      }
      let stage = i %  4;
      let speed = i * this.state.sortingSpeed;
      let barOneStyle, barTwoStyle;
      switch(stage) {
        // set the bar selected to dark blue
        case 0:
          const [bar1Idx] = animationSteps[i];
          barOneStyle = arrayBars[bar1Idx].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = TRAVERSE_COLOR;
          }, speed);
          break;
        // set the two bars out of order to red
        case 1:
          const [barOneIndex, barTwoIndex] = animationSteps[i];
          barOneStyle = arrayBars[barOneIndex].style;
          barTwoStyle = arrayBars[barTwoIndex].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = PREPARING_COLOR;
            barTwoStyle.backgroundColor = PREPARING_COLOR;
          }, speed);
          break;
        // switch them and set them to green
        case 2:
          const [bar1Index, bar2Index, newHeight1, newHeight2] = animationSteps[i];
          barOneStyle = arrayBars[bar1Index].style;
          barTwoStyle = arrayBars[bar2Index].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = CHANGING_COLOR;
            barTwoStyle.backgroundColor = CHANGING_COLOR;
            barOneStyle.height = `${newHeight1}px`;
            barTwoStyle.height = `${newHeight2}px`;
          }, speed);
          break;
        // set their colors back to light blue
        case 3:
          const [bar1, bar2] = animationSteps[i];
          barOneStyle = arrayBars[bar1].style;
          barTwoStyle  = barOneStyle;
          if (bar2 !== -1){
            barTwoStyle = arrayBars[bar2].style;
          }
          setTimeout(() => {
          barOneStyle.backgroundColor = MAIN_COLOR;
          if (bar2 !== -1)
          {
            barTwoStyle.backgroundColor = MAIN_COLOR;
          }
        }, speed);
          break;
        default:
          console.log("Something wrong!");
      }
    }




  }

  // function to do selectionSort
  selectionSort() {
    // disable the sort button
    this.disableSelectionsWhileSorting();
    // get the animation steps for selection sorting
    const animationSteps = getSelectionSortAnimation(this.state.array.slice()).animationSteps;
    for (let i = 0; i < animationSteps.length; ++i){
      const arrayBars = document.getElementsByClassName('array-bar');
      let stage = i %  4;
      let speed = i * this.state.sortingSpeed;
      let barStyle1, barStyle2;
      switch(stage) {
        // set the bar selected to dark blue
        case 0:
          const [barOne] = animationSteps[i];
          barStyle1 = arrayBars[barOne].style;
          setTimeout(() => {
            barStyle1.backgroundColor = TRAVERSE_COLOR;
          }, speed);
          break;
        case 1:
        // set the two bars which are about to be switched to red
          const [bar1Idx, bar2Idx] = animationSteps[i];
          barStyle1 = arrayBars[bar1Idx].style;
          barStyle2 = arrayBars[bar2Idx].style;
          setTimeout(() => {
            barStyle1.backgroundColor = PREPARING_COLOR;
            barStyle2.backgroundColor = PREPARING_COLOR;
          }, speed);
          break;
        case 2:
        // switch their heights and change to green
          const [barOneIndex, barTwoIndex, newHeight1, newHeight2] = animationSteps[i];
          barStyle1 = arrayBars[barOneIndex].style;
          barStyle2 = arrayBars[barTwoIndex].style;
          setTimeout(() => {
              barStyle1.backgroundColor = CHANGING_COLOR;
              barStyle2.backgroundColor = CHANGING_COLOR;
              barStyle1.height = `${newHeight1}px`;
              barStyle2.height = `${newHeight2}px`;
            }, speed);
          break;
        case 3:
        // set their colors back to light blue
          const [bar1, bar2] = animationSteps[i];
          barStyle1 = arrayBars[bar1].style;
          barStyle2 = arrayBars[bar2].style;
          setTimeout(() => {
            barStyle1.backgroundColor = MAIN_COLOR;
            barStyle2.backgroundColor = MAIN_COLOR;
          }, speed);
          break;
        default:
          console.log("Something is wrong!");
        }}
  }


  //function to do merge sort
  mergeSort() {
    // disable the sort button
    this.disableSelectionsWhileSorting();
    const animationSteps = getMergeSortAnimation(this.state.array.slice()).animationSteps;
    for (let i = 0; i < animationSteps.length; ++i){
      const arrayBars = document.getElementsByClassName('array-bar');
      let stage = i %  3;
      let speed = i * this.state.sortingSpeed;
      let barStyle1, barStyle2;
      switch(stage) {
        case 0:
          const [barOne, barTwo] = animationSteps[i];
          barStyle1 = arrayBars[barOne].style;
          barStyle2 = arrayBars[barTwo].style;
          setTimeout(() => {
            barStyle1.backgroundColor = PREPARING_COLOR;
            barStyle2.backgroundColor = PREPARING_COLOR;
          }, speed);
          break;
        case 1:
          const [bar1Idx, bar2Idx] = animationSteps[i];
          barStyle1 = arrayBars[bar1Idx].style;
          barStyle2 = arrayBars[bar2Idx].style;
          setTimeout(() => {
            barStyle1.backgroundColor = MAIN_COLOR;
            barStyle2.backgroundColor = MAIN_COLOR;
          }, speed);
          break;
        case 2:
          const [barOneIndex, newHeight] = animationSteps[i];
          barStyle1 = arrayBars[barOneIndex].style;
          setTimeout(() => {
              barStyle1.height = `${newHeight}px`;
            }, speed);
          break;
        default:
          console.log("Something is wrong!");
        }}
  }

  // function to do quick sort
  quickSort() {
    // disable the sort button
    this.disableSelectionsWhileSorting();
    const animationSteps = getQuickSortAnimation(this.state.array.slice()).animationSteps;
    for (let i = 0; i < animationSteps.length; ++i){
      if (animationSteps[i].length === 1) {
        continue;
      }
      const arrayBars = document.getElementsByClassName('array-bar');
      let stage = i %  3;
      let speed = i * this.state.sortingSpeed;
      let barStyle1, barStyle2;
      switch(stage) {
        case 0:
          const [barOne, barTwo] = animationSteps[i];
          barStyle1 = arrayBars[barOne].style;
          if (barTwo === -1) {
            setTimeout(() => {
              barStyle1.backgroundColor = TRAVERSE_COLOR;
          }, speed);
          }
          else {
            barStyle2 = arrayBars[barTwo].style;
            setTimeout(() => {
              barStyle1.backgroundColor = PREPARING_COLOR;
              barStyle2.backgroundColor = PREPARING_COLOR;
            }, speed);
          }
          break;
        case 1:
          const [bar1Idx, bar2Idx, newHeight1, newHeight2] = animationSteps[i];
          barStyle1 = arrayBars[bar1Idx].style;
          barStyle2 = arrayBars[bar2Idx].style;
          setTimeout(() => {
            barStyle1.backgroundColor = CHANGING_COLOR;
            barStyle2.backgroundColor = CHANGING_COLOR;
            barStyle1.height = `${newHeight1}px`;
            barStyle2.height = `${newHeight2}px`;
          }, speed);
          break;
        case 2:
          const [barOneIndex, barTwoIndex] = animationSteps[i];
          barStyle1 = arrayBars[barOneIndex].style;
          if (barTwoIndex === -1) {
            setTimeout(() => {
              barStyle1.backgroundColor = MAIN_COLOR;
            }, speed);
          }
          else {
            barStyle2 = arrayBars[barTwoIndex].style;
            setTimeout(() => {
                barStyle1.backgroundColor = MAIN_COLOR;
                barStyle2.backgroundColor = MAIN_COLOR;
              }, speed);
          }
          break;
        default:
          console.log("Something is wrong!");
        }}

  }



  render() {

    // get the array being sorted
    let array = this.state.array;
    // get the sorting algorithm selected
    let sortingAlgorithm = this.selectSortingAlgoritm();
    // get the width of each rectangular bar
    let bar_width = Math.floor(this.state.width * 0.65 / this.state.arraySize);
    // the value of each element in the array will be the height of each array bar
    return (
      <div className="page">
        <h1 className="title">Welcome to Algorithm Visualizer!</h1>
        <div className="array-graph">
          {array.map((element, index) => (
            <div className="array-bar"
                 key={index}
                 style={{height: `${element}px`, width: `${bar_width}px`}}>
            </div>
          ))}
        </div>

        <div className="selections">
          <div className="selection">
            <SelectArraySize onChange={this.changeArraySize}/>
          </div>
          <div className="selection">
            <SelectSortingSpeed onChange={this.changeSortingSpeed}/>
          </div>
          <div className="selection" id="algorithm-selection">
            <SelectSortingType onChange= {this.changeSortingType}/>
          </div>
          <div className="buttons">
            <div className="btn">
              <GenerateRandomArray onClick={this.refreshPage}/>
            </div>
            <div className="btn">
              <SortArray onClick={sortingAlgorithm}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// function to test the sorting algorithm
function testSortingAlgorithm(sortFunction) {
  // get a random length for the two arrays being compared
  const randomLength = getRandomNumberInAnInterval(0, 300);
  let array = [];
  // get a random array by pushing random numbers between 0 and 1000
  for (let i = 0; i < randomLength; ++i) {
    array.push(getRandomNumberInAnInterval(0, 1000));
  }
  // use built-in javaScript function to sort the array
  let jsSortedArrray = array.slice().sort((a, b) => {return a-b;});
  // use our algorithms to sort the array
  let sortArray = sortFunction(array.slice()).sortedArray;
  // compare the two sorted array
  console.log("The two arrays are equal? " + areTwoArraysEqual(jsSortedArrray, sortArray));
}

// function to compare two arrays
function areTwoArraysEqual(array1, array2) {
  // the two arrays are not equal if they have different sizes
  if (array1.length !== array2.length) {
    return false;
  }
  // compare corresponding elements of the two arrays
  else {
    for (let i = 0; i < array1.length; ++i) {
      if (array1[i] !== array2[i]){
        return false;
      }
    }
    return true;
  }
}

// function to get a random nummber in an intervals
function getRandomNumberInAnInterval(lower, upper) {
  return Math.floor(Math.random() * upper) % (upper - lower) + lower;
}
