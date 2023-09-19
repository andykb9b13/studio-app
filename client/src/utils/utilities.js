// basic bubble sort function for the Leaderboard
export const sortArray = (array) => {
  const n = array.length;
  const sortedArray = [...array]; // Create a new array to hold the sorted elements

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      // Correct the condition to compare total points
      if (
        sortedArray[j].totalCompletedPoints + sortedArray[j].totalSheetPoints >
        sortedArray[j + 1].totalCompletedPoints +
          sortedArray[j + 1].totalSheetPoints
      ) {
        // Swap elements if needed in the new array
        const temp = sortedArray[j];
        sortedArray[j] = sortedArray[j + 1];
        sortedArray[j + 1] = temp;
      }
    }
  }

  return sortedArray.reverse(); // Return the sorted array
};
