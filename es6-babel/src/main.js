import { increment, double } from "./math";
import { hello } from "./decorators";

@hello
class World {
  constructor() {
    console.log("World!");
  }
}

const w = new World();

console.log(2 |> increment |> double |> increment |> double);
