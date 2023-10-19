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

export const sortResources = (resources) => {
  const resourceNameArr = [];
  const sortedResourceArr = [];
  resources.forEach((resource) => resourceNameArr.push(resource.resourceName));
  resourceNameArr.sort();
  for (let i = 0; i < resources.length; i++) {
    for (let j = 0; j < resources.length; j++) {
      if (resources[j].resourceName === resourceNameArr[i]) {
        sortedResourceArr.push(resources[j]);
      }
    }
  }
  return sortedResourceArr;
};

export const sortSheets = (sheets) => {
  const sheetNameArr = [];
  const beginnerArr = [];
  const easyArr = [];
  const mediumArr = [];
  const advancedArr = [];
  const expertArr = [];
  sheets.forEach((sheet) => sheetNameArr.push(sheet.sheetName));
  sheets.forEach((sheet) => {
    if (sheet.difficulty.toLowerCase() === "beginner") beginnerArr.push(sheet);
    if (sheet.difficulty.toLowerCase() === "easy") easyArr.push(sheet);
    if (sheet.difficulty.toLowerCase() === "medium") mediumArr.push(sheet);
    if (sheet.difficulty.toLowerCase() === "advanced") advancedArr.push(sheet);
    if (sheet.difficulty.toLowerCase() === "expert") expertArr.push(sheet);
  });

  beginnerArr.sort();
  easyArr.sort();
  mediumArr.sort();
  advancedArr.sort();
  expertArr.sort();

  const sortedSheetArr = beginnerArr.concat(
    easyArr,
    mediumArr,
    advancedArr,
    expertArr
  );
  return sortedSheetArr;
};
