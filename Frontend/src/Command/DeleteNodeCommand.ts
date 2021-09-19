import {Command} from "./Command";
import {Store} from "@ngxs/store";
import {NavbarComponent} from "../app/Components/navbar/navbar.component";
import {TFTensor} from "../app/tf/tensor/tensor";
import {LGraphNode} from "litegraph.js";
import {RemoveTFNode, ResetStore} from "../Storage/workspace";
import {ReloadFromStoreCommand} from "./ReloadFromStoreCommand";

export class DeleteNodeCommand extends Command{
  private node: LGraphNode
  constructor(store: Store, private navbar: NavbarComponent) {
    super(store);
  }

  execute() {
  }
  undo() {
  }
}
