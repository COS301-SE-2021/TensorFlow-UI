import {Command} from "./Command";
import {Store} from "@ngxs/store";
import {TFNode} from "../app/tf";

export class AddNodeCommand extends Command{

  constructor(store: Store) {
    super(store);
  }

  execute() {
  }

  undo() {
  }
}
