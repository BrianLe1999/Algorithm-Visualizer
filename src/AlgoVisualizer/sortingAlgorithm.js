export function getBubbleSortAnimation(array) {
  var animationSteps = [];
  var swap;
  var temp;
  do {
    swap = false;
    for (let i = 0; i < array.length - 1; ++i) {
      // swapping two array elements
      if (array[i] > array[i + 1])
      {
        // push the index of the one selected which will be used to set it to red
        animationSteps.push([i]);
        // push the indices of the two elements being swapped
        animationSteps.push([i, i + 1]);
        // push the indices of the two elements being swapped and their height
        animationSteps.push([i, i + 1, array[i + 1], array[i]]);
        // push the indices of the two elements being swapped to set their colors back to light blue
        animationSteps.push([i, i + 1]);
        temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swap = true;
      }
      else {
        animationSteps.push([i]);
        animationSteps.push([-1]);
        animationSteps.push([-1]);
        animationSteps.push([i, -1]);
      }
    }
    animationSteps.push([array.length - 1]);
    animationSteps.push([-1]);
    animationSteps.push([-1]);
    animationSteps.push([array.length - 1, -1]);
  } while (swap);
  return{
    animationSteps: animationSteps,
    sortedArray: array
  };
}


// function to get selection sort animations
export function getSelectionSortAnimation(array) {
  let animationSteps = [];
  let startScan, minIndex, minValue;
  for (startScan = 0; startScan < array.length - 1; ++startScan) {
    minIndex = startScan;
    minValue = array[startScan];
    for (let index = startScan + 1; index < array.length; index++) {
      if (array[index] < minValue) {
        minValue = array[index];
        minIndex = index;
      }
      }
      animationSteps.push([startScan]);
      animationSteps.push([startScan, minIndex]);
      animationSteps.push([startScan, minIndex, minValue, array[startScan]]);
      animationSteps.push([startScan, minIndex]);
      array[minIndex] = array[startScan];
      array[startScan] = minValue;
    }
    return  {
      animationSteps: animationSteps,
      sortedArray: array
    };
  }


  // function to get merge sort animations
  export function getMergeSortAnimation(array) {
    if (array.length <= 1) {
      return {
        animationSteps: array,
        sortedArray: array
      }
    }
    const animationSteps = [];
    const tempArray = array.slice();
    mergeSort(array, 0, array.length - 1, tempArray, animationSteps);
    return {
      animationSteps: animationSteps,
      sortedArray: array
    }
  }


  function mergeSort(array, startIndex, endIndex, tempArray, animationSteps) {
    if (startIndex === endIndex) {
      return;
    }
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSort(tempArray, startIndex, middleIndex, array, animationSteps);
    mergeSort(tempArray, middleIndex + 1, endIndex, array, animationSteps);
    merge(array, startIndex, middleIndex, endIndex, tempArray, animationSteps);

  }

  function merge(array, startIndex, middleIndex, endIndex, tempArray, animationSteps) {
    let k = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;
    while (i <= middleIndex && j <= endIndex) {
      if (tempArray[i])
      animationSteps.push([i,j]);
      animationSteps.push([i,j]);
      if (tempArray[i] <= tempArray[j]) {
        animationSteps.push([k, tempArray[i]]);
        array[k++] = tempArray[i++];
      }
      else {
        animationSteps.push([k, tempArray[j]]);
        array[k++] = tempArray[j++];
      }
    }
    while (i <= middleIndex) {
      animationSteps.push([i, i]);
      animationSteps.push([i, i]);
      animationSteps.push([k, tempArray[i]]);
      array[k++] = tempArray[i++];
    }
    while (j <= endIndex) {
      animationSteps.push([j, j]);
      animationSteps.push([j, j]);
      animationSteps.push([k, tempArray[j]]);
      array[k++] = tempArray[j++];
    }

  }



export function getQuickSortAnimation(array) {
    const animationSteps = [];
    quickSort(array, 0, array.length - 1, animationSteps);
    return {
      animationSteps: animationSteps,
      sortedArray: array
    };

  }
  function partition(array, startIndex, endIndex, animationSteps) {
      // get the pivotIndex
      var pivotIndex = getPivotIndex(array, startIndex, endIndex);
      // pivotIndex will be set to dark blue when sorting
      animationSteps.push([pivotIndex, -1]);
      animationSteps.push([-1]);
      animationSteps.push([-1]);
      var pivot   = array[pivotIndex];
      var too_big_index = startIndex;
      var too_small_index = endIndex;
      while (too_big_index <= too_small_index) {
        while(array[too_big_index] < pivot) {
          ++too_big_index;
        }
        while(array[too_small_index] > pivot) {
          --too_small_index;
        }
        if (too_big_index <= too_small_index) {
          // swap the two array elemtns at too_big_index and too_small_index
          swap(array, too_big_index, too_small_index);
          // the two array elements being swapped will be set to red, green and back to light blue
          animationSteps.push([too_big_index, too_small_index]);
          animationSteps.push([too_big_index, too_small_index, array[too_big_index], array[too_small_index]]);
          animationSteps.push([too_big_index, too_small_index]);
          too_big_index++;
          too_small_index--;
        }
      }
      // set the pivotIndex back to light blue
      animationSteps.push([-1]);
      animationSteps.push([-1]);
      animationSteps.push([pivotIndex, -1]);
      // return the new pivotIndex
      return too_big_index;

    }

  function swap(items, i, j) {
      var temp = items[i];
      items[i] = items[j];
      items[j] = temp;
  }

  function quickSort(array, startIndex, endIndex, animationSteps) {
      var newPivotIndex;
      if (array.length > 1) {
        // partition arrays about the pivotIndex
        newPivotIndex = partition(array, startIndex, endIndex, animationSteps);
        if (startIndex < newPivotIndex - 1)
        {
          // recursively sort the part in front of pivotIndex
          quickSort(array, startIndex, newPivotIndex - 1, animationSteps);
        }
        if (newPivotIndex < endIndex) {
          // recursively sort the part after the pivotIndex
          quickSort(array, newPivotIndex, endIndex, animationSteps);
       }
      }
      return array;
    }


    // helper function of quickSort to get pivot index by finding the median of the three
    // randomly choosen array elements
    function getPivotIndex(array, minIndex, maxIndex) {
      let firstIndex = getRandomNumberInAnInterval(minIndex, maxIndex);
      let firstValue = array[firstIndex];
      let secondIndex = getRandomNumberInAnInterval(minIndex, maxIndex);
      let secondValue = array[secondIndex];
      let thirdIndex = getRandomNumberInAnInterval(minIndex, maxIndex);
      let thirdValue = array[thirdIndex];
      let valueArray = [firstValue, secondValue, thirdValue];
      valueArray.sort((a,b) => {return a-b;});
      if (valueArray[1] === firstValue) {
        return firstIndex;
      }
      else if (valueArray[1] === secondValue) {
        return secondIndex;
      }
      else {
        return thirdIndex;
      }
    }

    function getRandomNumberInAnInterval(lower, upper) {
      return Math.floor(Math.random() * upper) % (upper - lower) + lower;
    }
