const arraysProcessing = {
    arraysContainer: [
        {v: [-1, 2, 5, 0, 3, -1, 4], expectedResult: 13},
        {v: [1, -2, 3, 1, -9, 6], expectedResult: 6},
        {v: [5, 11, -9, 20, 13], expectedResult: 40},
    ],

    findBiggestSubSum(container) {
        container.forEach(
            element => {
                console.log(element.v)

                let copy = element.v;
                let biggestSum = 0;
                let partialSum = 0;
                copy.forEach(
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

    getMaxSubSum(container) {
        container.forEach(
            element => {
                console.log(element.v)
                let copy = element.v;
                let biggestSum = 0;
                for (let i = 0; i < copy.length; i++) {
                    let sum = 0;
                    for (let j = i; j < copy.length; j++) {
                        sum += copy[j];

                        if (sum > biggestSum) {
                            biggestSum = sum;
                        }
                    }
                }

                console.log(biggestSum);
            }
        )
    },

    search(container) {
        container.forEach(
            element => {
                let copy = element.v;
                let max = 0;
                let min = copy[0];

                copy.forEach(
                    arrayElement => {
                        if (max < arrayElement) {
                            max = arrayElement
                        }

                        if (min > arrayElement) {
                            min = arrayElement
                        }
                    }
                )
                console.log("max: " + max);
                console.log("min: " + min);

                copy.sort((a, b) => {
                    return a - b;
                });

                let median = Math.floor(copy.length / 2);

                if (copy.length % 2) {
                    console.log("median: " + copy[median]);
                } else {
                    console.log("median: " + (copy[median - 1] + copy[median]) / 2.0);
                }
            }
        )
    },

    selection(container) {
        container.forEach(
            element => {
                console.log(element.v)

                let selection = [];
                let selectionResult = [];
                for (let i = 0; i < element.v.length - 1; i++) {
                    if (parseInt(element.v[i]) < parseInt(element.v[i + 1])) {
                        selection.push(element.v[i]);
                    } else {
                        selection.push(element.v[i]);
                        if (selectionResult.length < selection.length) {
                            selectionResult = selection;
                        }
                        selection = [];
                    }

                    if (selectionResult.length < selection.length) {
                        selectionResult = selection;
                    }
                }

                console.log(selectionResult);
            }
        )
    },

    process() {
        console.log("Sub sum O(n)");
        this.findBiggestSubSum(this.arraysContainer);
        console.log("Sub sum O(n^2)");
        this.getMaxSubSum(this.arraysContainer);
        console.log("Search");
        this.search(this.arraysContainer);
        console.log("Selection");
        this.selection(this.arraysContainer);
    }
}
