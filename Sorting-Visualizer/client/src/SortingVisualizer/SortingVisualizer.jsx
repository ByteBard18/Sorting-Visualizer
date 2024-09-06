// SortingVisualizer.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 1;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

function SortingVisualizer() {
  const [array, setArray] = useState([]);

  const generateArray = () => {
    const newArray = Array.from({ length: 100 }, () => Math.floor(Math.random() * 300) + 5);
    setArray(newArray);
  };

  const mergeSort = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/merge-sort', { array }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const animations = response.data.animations;
      if (!animations || animations.length === 0) {
        console.error('No animations received from server.');
        return;
      }
      await animateSort(animations);
    } catch (error) {
      console.error('Error sorting array:', error);
    }
  };

  const bubbleSort = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/bubble-sort', { array }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const animations = response.data.animations;
      if (!animations || animations.length === 0) {
        console.error('No animations received from server.');
        return;
      }
      await animateBubbleSort(animations);
    } catch (error) {
      console.error('Error sorting array:', error);
    }
  };

  const animateSort = async (animations) => {
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          if(arrayBars[barTwoIdx]!=null) {
            arrayBars[barTwoIdx].style.backgroundColor = color;
          }
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const newHeight = barTwoIdx;
          arrayBars[barOneIdx].style.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const animateBubbleSort = async (animations) => {
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, check] = animations[i];
      const arrayBars = document.getElementsByClassName('array-bar');
      if (check!=null) {
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          if(arrayBars[barTwoIdx]!=null) {
            arrayBars[barTwoIdx].style.backgroundColor = color;
          }
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const newHeight = barTwoIdx;
          arrayBars[barOneIdx].style.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  return (
    <div className="sorting-visualizer">
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
              backgroundColor: PRIMARY_COLOR,
            }}
          ></div>
        ))}
      </div>
      <div className="controls">
        <button onClick={generateArray}>Generate Array</button>
        <button onClick={mergeSort}>Merge Sort</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
      </div>
      <div className="info-container">
        <h2>Sorting Algorithms</h2>
        <div className="algorithm-info">
          <h3>Merge Sort</h3>
          <p>
            Merge sort is a divide and conquer algorithm that divides the input array into two halves, 
            recursively sorts each half, and then merges the sorted halves to produce the final sorted array.
          </p>
        </div>
        <div className="algorithm-info">
          <h3>Bubble Sort</h3>
          <p>
            Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares 
            adjacent elements and swaps them if they are in the wrong order. The pass through the list 
            is repeated until the list is sorted.
          </p>
        </div>
        <div className="algorithm-info">
          <h3>Differences</h3>
          <ul>
            <li>Merge sort is a divide and conquer algorithm, while bubble sort is a simple comparison-based algorithm.</li>
            <li>Merge sort has a time complexity of O(n log n), whereas bubble sort has a time complexity of O(n^2).</li>
            <li>Merge sort requires additional memory space for the merging process, while bubble sort operates in-place.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SortingVisualizer;
