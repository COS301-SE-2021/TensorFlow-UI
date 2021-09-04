import {Command} from "./Command";
import {NavbarDialogsComponent} from "../app/Components/navbar-dialogs/navbar-dialogs.component";
import {lineConnectors} from "../app/node-data";
import {AddRootNode, RemoveLineFromStorage, RemoveTFNode, WorkspaceState} from "../Storage/workspace";
import * as LeaderLine from "leader-line-new";
import {NavbarComponent} from "../app/Components/navbar/navbar.component";
import {Store} from "@ngxs/store";

export class ClearCanvasCommand extends Command{
  private nav: NavbarComponent

  constructor(store: Store, private navbar: NavbarComponent) {
    super(store);
    this.nav = navbar;
  }

  execute() {
    const clearDialog = this.nav.dialog.open(NavbarDialogsComponent);

    clearDialog.afterClosed().subscribe(result => {
      const clearCanvasBoolean = clearDialog.disableClose;

      if (clearCanvasBoolean) {
        const templine: lineConnectors[] = this.store.selectSnapshot(WorkspaceState).lines
        let lineObject: LeaderLine;
        for (let i = 0; i < templine.length; i++) {
          lineObject = templine[i]["line"];
          this.store.dispatch(new RemoveLineFromStorage(templine[i]));
          lineObject?.remove()
        }
        this.nav.linesList = [];

        let root = this.store.selectSnapshot(WorkspaceState).rootNode
        root.childOne = undefined;
        this.store.dispatch(new AddRootNode(root))

        this.nav.TFNodeList.forEach(element => this.store.dispatch(new RemoveTFNode(element)))
        this.nav.TFNodeList = [];
      }
    })
  }

  undo() { }
}
