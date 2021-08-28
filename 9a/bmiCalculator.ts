//bmi calculation
//height: cm , weight: kg
//mass / height in m^2

// below 18.5 – you're in the underweight range
// between 18.5 and 24.9 – you're in the healthy weight range
// between 25 and 29.9 – you're in the overweight range
// between 30 and 39.9 – you're in the obese range

interface MultiplyValues {
    value1: number;
    value2: number;
  }
  

const parseArgumentsBmi = (args: Array<string>): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  

const calculateBmi = (height: number, weight: number) : string => {
    const index = weight / ((height/100)**2);
    if (index < 18.5){
        return "underweight range";
    } 
    else if (index < 25) {
        return "healthy weight range";
    }
    else if (index < 30) {
        return "overweight range";
    }
    else if (index < 40) {
        return "obese range";
    }
    else {
        return "extremely obese";
    }
};

try {
    const { value1, value2 } = parseArgumentsBmi(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message);
  }

export default calculateBmi;