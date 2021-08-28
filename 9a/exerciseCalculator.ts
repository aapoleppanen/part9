// calculates the average time of daily exercise hours and compares it to the 
// target amount of daily hours and returns an object that includes the following values:

// the number of days
// the number of training days
// the original target value
// the calculated average time
// boolean value describing if the target was reached
// a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
// a text value explaining the rating

// [3, 0, 2, 4.5, 0, 3, 1] a week of training hours : sum 13.5 / target 2 = rating
// number 2 <- target of daily hours : 
// create interface for return object

interface trainingResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseArguments = (args: Array<string>): Array<number> => {
    const length = args.length;
    const returnArr : number[] = [];
    if (length < 4) { throw new Error('Not enough arguments'); }
    args.forEach((e,i) => {
        if(i < 2) { return; }
        if(isNaN(Number(e))){
            throw new Error(`Argument ${i} was not a number.`);
        } 
        returnArr.push(Number(e));
    });
    return returnArr;
};

const calculateExercises = (arr: Array<number>) : trainingResult => {
    console.log(arr);
    const hours = arr.slice(1, arr.length);
    const target = arr[0];
    const periodLength = hours.length;
    const trainingDays = hours.filter(e => e !== 0).length;
    const averageTime = (hours.reduce((a,b) => a + b))/periodLength;
    const reached = target > averageTime ? false : true;
    const ratingDescription = ["", "Not your best performance. Step it up for next week", "Getting there", "Good work. Keep it up!"];
    const ratingCalculate = (target: number, averageTime:number):number => {
        const ratingCalc = target - averageTime;
        if (ratingCalc < 0){
            return 3;
        }
        if (ratingCalc < 0.5){
            return 2;
        }
        else {
            return 1;
        }
    };
    const rating = ratingCalculate(target, averageTime);
    return {
        periodLength,
        trainingDays,
        success: reached,
        rating,
        ratingDescription: ratingDescription[rating],
        target,
        average: averageTime
    };
};

export default calculateExercises;

try {
    const args = parseArguments(process.argv);
    console.log(calculateExercises(args));
} catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(e.message);
}

//example output:
// { periodLength: 7,
//     trainingDays: 5,
//     success: false,
//     rating: 2,
//     ratingDescription: 'not too bad but could be better',
//     target: 2,
//     average: 1.9285714285714286 }