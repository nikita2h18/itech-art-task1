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

    getMaxSubSum() {
        this.arraysContainer.forEach(
            element => {
                let biggestSum = 0;
                for (let i = 0; i < element.v.length; i++) {
                    let sum = 0;
                    for (let j = i; j < element.v.length; j++) {
                        sum += element.v[j];

                        if (sum > biggestSum) {
                            biggestSum = sum;
                        }
                    }
                }

                console.log(biggestSum);
            }
        )
    },
}
