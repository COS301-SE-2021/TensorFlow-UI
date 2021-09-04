import {Command} from "./Command";
import {Store} from "@ngxs/store";

export class GenerateCodeCommand extends Command{

  constructor(store: Store) {
    super(store);
  }

  execute() {
  }

  undo() {
  }
}
