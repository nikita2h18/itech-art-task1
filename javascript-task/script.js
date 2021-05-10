const arraysProcessing = {
  arraysContainer: [
    [-1, 2, 5, 0, 3, -1, 4],
    [1, -2, 3, 1, -9, 6],
    [5, 11, -9, 20, 13],
  ],

  findBiggestSubSum(container) {
    let sumContainer = [];
    container.forEach((arr) => {
      let biggestSum = 0;
      let partialSum = 0;
      arr.forEach((res) => {
        partialSum += res;

        if (partialSum > biggestSum) {
          biggestSum = partialSum;
        }

        if (partialSum < 0) {
          partialSum = 0;
        }
      });
      sumContainer.push(biggestSum);
    });
    return sumContainer;
  },

  getMaxSubSum(container) {
    let sumContainer = [];
    container.forEach((arr) => {
      let biggestSum = 0;
      for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        for (let j = i; j < arr.length; j++) {
          sum += arr[j];

          if (sum > biggestSum) {
            biggestSum = sum;
          }
        }
      }

      sumContainer.push(biggestSum);
    });
    return sumContainer;
  },

  search(container) {
    let values = [];
    container.forEach((arr) => {
      const temp = arr.slice();
      let max = 0;
      let min = temp[0];

      temp.forEach((arrayElement) => {
        if (max < arrayElement) {
          max = arrayElement;
        }

        if (min > arrayElement) {
          min = arrayElement;
        }
      });
      values.push(min, max);

      temp.sort(function (a, b) {
        return a - b;
      });

      const median = Math.floor(temp.length / 2);

      const isOdd = temp.length % 2;
      if (isOdd) {
        values.push(temp[median]);
      } else {
        values.push((temp[median - 1] + temp[median]) / 2);
      }
    });
    return values;
  },

  selection(container) {
    let selectionContainer = [];

    container.forEach((arr) => {
      let selection = [];
      let selectionResult = [];
      for (let i = 0; i < arr.length - 1; i++) {
        if (parseInt(arr[i]) < parseInt(arr[i + 1])) {
          selection.push(arr[i]);
        } else {
          selection.push(arr[i]);
          if (selectionResult.length < selection.length) {
            selectionResult = selection;
          }
          selection = [];
        }

        if (selectionResult.length < selection.length) {
          selectionResult = selection;
        }
      }

      selectionContainer.push(selectionResult);
    });
    return selectionContainer;
  },

  process() {
    console.log("Sub sum O(n)");
    console.log(this.findBiggestSubSum(this.arraysContainer));
    console.log("Sub sum O(n^2)");
    console.log(this.getMaxSubSum(this.arraysContainer));
    console.log("Search");
    console.log(this.search(this.arraysContainer));
    console.log("Selection");
    console.log(this.selection(this.arraysContainer));
  },
};

let stringToDateFormatter = {
  date: [],

  strToDate(date) {
    let day = date.slice(0, 2);
    let month = date.slice(2, 4);
    let year = date.slice(4, 8);

    this.date = [day, month, year];
  },

  searchToken(format, value) {
    let token = "";
    for (let i = 0; i < format.length; i++) {
      if (format[i] === value) {
        token += value;
      }
    }
    return token;
  },

  showDateByFormat(format) {
    let date = format;
    let yearToken = this.searchToken(format, "Y");
    let dayToken = this.searchToken(format, "D");
    let monthToken = this.searchToken(format, "M");

    date = date.replace(yearToken, this.date[2].slice(-yearToken.length));
    date = date.replace(dayToken, this.date[0].slice(-dayToken.length));
    date = date.replace(monthToken, this.date[1].slice(-monthToken.length));

    return date;
  },

  showResult(date) {
    this.strToDate(date);
    console.log(this.showDateByFormat("MM/DD/YY"));
    console.log(this.showDateByFormat("YYYY/MM/DD"));
  },
};

function textConverter(text, maxLength, formatType) {
  if (text.length > maxLength) {
    return "Your text is too long";
  }

  switch (formatType) {
    case "word": {
      return textFormat(text, " ");
    }
    case "symbol": {
      return textFormat(text, "");
    }
    case "sentence": {
      return textFormat(text, ".");
    }
    default: {
      return text;
    }
  }
}

function textFormat(text, splitSymbol) {
  return text.split(splitSymbol);
}

function showText() {
  console.log("word");
  console.log(
    textConverter("Hello John. Lets do some interesting things", 10000, "word")
  );
  console.log("symbol");
  console.log(
    textConverter(
      "Hello John. Lets do some interesting things",
      10000,
      "symbol"
    )
  );
  console.log("sentence");
  console.log(
    textConverter(
      "Hello John. Lets do some interesting things",
      10000,
      "sentence"
    )
  );
}

let stringCalculator = {
  result: 0,

  plus(value) {
    this.result += Number(value);
    return this;
  },

  minus(value) {
    this.result -= Number(value);
    return this;
  },

  multiply(value) {
    this.result *= Number(value);
    return this;
  },

  division(value) {
    this.result /= Number(value);
    return this;
  },

  showResult() {
    console.log(
      this.plus("2").minus("1.5").multiply("10").division("1.7").result
    );
    return this;
  },
};

let arraySorter = {
  arr: [8, 5, 3, 7, 8, 9, 10, 11, 5, 21, 16, 24],

  bubbleSort() {
    const temp = this.arr.slice();
    let changed = true;
    while (changed === true) {
      changed = false;
      for (let i = 0; i < temp.length - 1; i++) {
        if (temp[i] > temp[i + 1]) {
          let copy = temp[i + 1];
          temp[i + 1] = temp[i];
          temp[i] = copy;
          changed = true;
        }
      }
    }
    return temp;
  },

  shellSort() {
    const temp = this.arr.slice();
    let i = Math.floor(temp.length / 2);
    while (i > 0) {
      for (let j = 0; j < temp.length; j++) {
        let k = j;
        let t = temp[j];
        while (k >= i && temp[k - i] > t) {
          temp[k] = temp[k - i];
          k -= i;
        }
        temp[k] = t;
      }
      i = i === 2 ? 1 : Math.floor((i * 5) / 11);
    }
    return temp;
  },

  insertSort() {
    const temp = this.arr.slice();

    for (let i = 0; i < temp.length; i++) {
      let v = temp[i],
        j = i - 1;
      while (j >= 0 && temp[j] > v) {
        temp[j + 1] = temp[j];
        j--;
      }
      temp[j + 1] = v;
    }
    return temp;
  },

  selectionSort() {
    const temp = this.arr.slice();

    for (let i = 0; i < temp.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < temp.length; j++) {
        if (temp[j] < temp[min]) min = j;
      }
      const copy = temp[min];
      temp[min] = temp[i];
      temp[i] = copy;
    }
    return temp;
  },

  showResult() {
    console.log("bubble sort: ");
    console.log(this.bubbleSort());
    console.log("Shell Sort: ");
    console.log(this.shellSort());
    console.log("Insert sort: ");
    console.log(this.insertSort());
    console.log("Selection sort: ");
    console.log(this.selectionSort());
  },
};

let binaryConverter = {
  binary: "10011100",
  decimal: 289,

  binToDec() {
    let dec = 0;
    for (let i = 0; i < this.binary.length; i++) {
      if (this.binary[this.binary.length - (i + 1)] === "1") {
        dec += 2 ** i;
      }
    }
    return dec;
  },

  decToBin() {
    let binary = "";

    while (this.decimal > 0) {
      if (this.decimal % 2 === 0) {
        binary = "0" + binary;
      } else {
        binary = "1" + binary;
      }

      this.decimal = Math.floor(this.decimal / 2);
    }
    return binary;
  },

  showResult() {
    console.log("Decimal to binary");
    console.log(this.decToBin());
    console.log("Binary to decimal");
    console.log(this.binToDec());
  },
};
