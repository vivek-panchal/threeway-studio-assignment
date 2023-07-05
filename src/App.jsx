import React, { useState } from 'react';
import './App.css';


function App() {
  const [inputArray, setInputArray] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!inputArray.startsWith('[') || !inputArray.endsWith(']')) {
      setOutput('Array should be entered with square brackets.');
      return;
    }

    // Remove brackets and whitespace, and split the array string into individual numbers
    const arrayValues = inputArray.slice(1, -1).split(',').map(Number);

    // Check if any of the values in the array are NaN
    if (arrayValues.some(isNaN)) {
      setOutput('Invalid numbers in the array.');
      return;
    }

    // Call the 4Sum function
    const result = fourSum(arrayValues, Number(targetValue));

    // Update the output
    if (result.length === 0) {
      setOutput('No answer');
    } else {
      const outputString = `Input Array: [${arrayValues.join(', ')}],\n\n Target Value: ${targetValue},\n\n Output: ${JSON.stringify(result)}`;
      setOutput(outputString);
    }
  };

  
  var fourSum = function (nums, target) {
      if (nums.length < 4) {
          return [];
      }

      nums.sort((a, b) => a - b);

      const res = [];

      for (let i = 0; i < nums.length - 3; i++) {
          if (i > 0 && nums[i] === nums[i - 1]) {
              continue;
          }

          if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
              break;
          }

          for (let j = i + 1; j < nums.length - 2; j++) {
              if (j > i + 1 && nums[j] === nums[j - 1]) {
                  continue;   
              }
              
              let left = j + 1,
                  right = nums.length - 1;
              while (left < right) {
                  const sum = nums[i] + nums[j] + nums[left] + nums[right];
                  if (sum === target) {
                      res.push([nums[i], nums[j], nums[left], nums[right]]);
                  }
                  if (sum <= target) {
                      while (nums[left] === nums[++left]);   
                  } else {
                      while (nums[right] === nums[--right]);  
                  }
              }
          }   
      }
    return res;
  };

  return (
    <div className="container">
      
      <form onSubmit={handleSubmit}>
         <h1> Four Sum Solution</h1>
        <label>
          Input Array:
          <input
            type="text"
            value={inputArray}
            onChange={(e) => setInputArray(e.target.value)}
          />
        </label>
        <br />
        <label>
          Target Value:
          <input
            type="text"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Compute</button>
      </form>
      <div className="output">{output}</div>
    </div>
  );
  
}

export default App;
