import {Command} from "./Command";
import {Store} from "@ngxs/store";

export class AddNodeCommand extends Command{

  constructor(store: Store) {
    super(store);
  }

  execute() {
    return true;
  }

  undo() {
  }
}
