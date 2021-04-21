const task1 = {
    arraysContainer: [
        {v: [-1, 2, 5, 0, 3, -1, 4], expectedResult: 10},
        {v: [1, -2, 3, 1, -9, 6], expectedResult: 6},
        {v: [5, 11, -9, 20, 13], expectedResult: 33},
    ],

    findBiggestSubSum() {
        this.arraysContainer.forEach(
            element => {
                let biggestSum = 0;
                let result = 0;
                let sum = 0;
                element.v.forEach(
                    res => {
                        sum += res;

                        if (sum < result) {
                            sum = 0;
                        }

                        result = sum;

                        if (biggestSum < result) {
                            biggestSum = result;
                        }
                    }
                );

                biggestSum === element.expectedResult ? console.log(biggestSum) : console.log("My algorithm wrong:(");
            }
        )
    }
}
