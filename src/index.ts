import { readData } from "./reader/dataReader";

try {
  console.log("Start");
  console.log("Parse data file");
  console.log(readData());
  console.log("Compute election result");
} catch (error) {
  console.error(error);
}
