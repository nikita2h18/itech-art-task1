const task1 = {
    arraysContainer: [
        {v: [-1, 2, 5, 0, 3, -1, 4], expectedResult: 13},
        {v: [1, -2, 3, 1, -9, 6], expectedResult: 6},
        {v: [5, 11, -9, 20, 13], expectedResult: 40},
    ],

    findBiggestSubSum() {
        this.arraysContainer.forEach(
            element => {
                let biggestSum = 0;
                let partialSum = 0;
                element.v.forEach(
                    res => {
                        partialSum += res;

                        if (partialSum > biggestSum) {
                            biggestSum = partialSum;
                        }

                        if (partialSum < 0) partialSum = 0;
                    }
                );

                biggestSum === element.expectedResult ? console.log(biggestSum) : console.log("My algorithm wrong:(");
            }
        )
    },
}


function getMaxSubSum(arr) {
    let sum = 0;
    let biggestSum = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let p = i; p < arr.length; p++) {
            sum += arr[p];
            if (sum > biggestSum) {
                biggestSum = sum;
            }
        }
        sum = 0;
    }
    return (biggestSum > 0) ? biggestSum : -1;
}

task1.arraysContainer.forEach(
    element => console.log(getMaxSubSum(element.v))
)