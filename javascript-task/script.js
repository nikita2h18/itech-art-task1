const arraysProcessing = {
    arraysContainer: [
        {v: [-1, 2, 5, 0, 3, -1, 4], expectedResult: 13},
        {v: [1, -2, 3, 1, -9, 6], expectedResult: 6},
        {v: [5, 11, -9, 20, 13], expectedResult: 40},
    ],

    findBiggestSubSum(container) {
        container.forEach(
            element => {
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
                let copy = Object.assign([], element.v);
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

                copy.sort(function (a, b) {
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

let stringToDateFormatter = {
    str: '31102012',
    month: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'Jule',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],

    strToDate() {
        let day = this.str.slice(0, 2);
        let month = this.str.slice(2, 4);
        let year = this.str.slice(4, 8);

        return [day, month, year];
    },

    showSimpleDate(date) {
        console.log(date[0] + "-" + date[1] + "-" + date[2]);
    },

    showDate(date) {
        console.log(date[0] + " " + this.month[date[1] - 1] + " " + date[2]);
    },
}

let stringCalculator = {
    result: 0,

    plus(b) {
        this.result = Number(this.result) + Number(b);
    },

    minus(b) {
        this.result = Number(this.result) - Number(b);
    },

    multiply(b) {
        this.result = Number(this.result) * Number(b);
    },

    division(b) {
        this.result = Number(this.result) / Number(b);
    },

    showResult() {
        console.log(this.result)
        this.plus('12');
        console.log(this.result)
        this.minus('5.5');
        console.log(this.result)
        this.multiply('2');
        console.log(this.result)
        this.division('13');
        console.log(this.result)
    }
}

let arraySorter = {
    arr: [8, 5, 3, 7, 8, 9, 10, 11, 5, 21, 16, 24],

    bubbleSort() {
        let sortArray = Object.assign([], this.arr);
        let changed = true;
        while (changed === true) {
            changed = false;
            for (let i = 0; i < sortArray.length - 1; i++) {
                if (sortArray[i] > sortArray[i + 1]) {
                    let copy = sortArray[i + 1];
                    sortArray[i + 1] = sortArray[i];
                    sortArray[i] = copy;
                    changed = true;
                }
            }
        }

        console.log(sortArray);
    },

    shellSort() {
        let sortArray = Object.assign([], this.arr);
        let i = Math.floor(sortArray.length / 2);
        while (i > 0) {
            for (let j = 0; j < sortArray.length; j++) {
                let k = j;
                let t = sortArray[j];
                while (k >= i && sortArray[k - i] > t) {
                    sortArray[k] = sortArray[k - i];
                    k -= i;
                }
                sortArray[k] = t;
            }
            i = (i === 2) ? 1 : Math.floor(i * 5 / 11);
        }

        console.log(sortArray);
    },

    insertSort() {
        let sortArray = Object.assign([], this.arr);

        for (let i = 0; i < sortArray.length; i++) {
            let v = sortArray[i], j = i - 1;
            while (j >= 0 && sortArray[j] > v) {
                sortArray[j + 1] = sortArray[j];
                j--;
            }
            sortArray[j + 1] = v;
        }

        console.log(sortArray);
    },

    selectionSort() {
        let sortArray = Object.assign([], this.arr);

        for (let i = 0; i < sortArray.length - 1; i++) {
            let min = i;
            for (let j = i + 1; j < sortArray.length; j++) {
                if (sortArray[j] < sortArray[min]) min = j;
            }
            const copy = sortArray[min];
            sortArray[min] = sortArray[i];
            sortArray[i] = copy;
        }

        console.log(sortArray);
    },

    showResult() {
        console.log('bubble sort: ');
        this.bubbleSort();
        console.log('Shell Sort: ');
        this.shellSort();
        console.log('Insert sort: ');
        this.insertSort();
        console.log('Selection sort: ');
        this.selectionSort();
    }
}

binaryConverter = {
    binaryNumber: '10011100',
    numb: 289,

    binToDec() {
        let dec = 0;
        for (let i = 0; i < this.binaryNumber.length; i++) {
            if (this.binaryNumber[this.binaryNumber.length - (i + 1)] === '1') {
                dec += 2 ** i;
            }
        }
        console.log(dec);
    },

    // decToBin() {
    //     const str = "23";
    //     const bin = (+str).toString(2);
    //     console.log(bin)
    // }

    decToBin() {
        let binary = '';

        while (this.numb > 0) {
            if (this.numb % 2 === 0) {
                binary = "0" + binary;
            } else {
                binary = "1" + binary;
            }

            this.numb = Math.floor(this.numb / 2);
        }

        console.log(binary);
    },

    showResult() {
        console.log('Decimal to binary');
        this.decToBin();
        console.log('Binary to decimal');
        this.binToDec();
    }
}