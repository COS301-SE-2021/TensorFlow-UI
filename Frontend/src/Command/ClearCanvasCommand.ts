import {Command} from "./Command";
import {NavbarDialogsComponent} from "../app/Components/navbar-dialogs/navbar-dialogs.component";
import {
  ClearCanvas,
  RemoveAllLineFromStorage,
  RemoveLineFromStorage,
  RemoveTFNode, ResetStore,
  WorkspaceState
} from "../Storage/workspace";
import {NavbarComponent} from "../app/Components/navbar/navbar.component";
import {Store} from "@ngxs/store";
import {NodeStore} from "../app/tf";
import {TFRootNode} from "../app/tf/rootNode/rootNode";

export class ClearCanvasCommand extends Command {
  private backup;
	constructor(store: Store, private navbar: NavbarComponent) {
		super(store);
	}

	execute() {
    this.backup = this.store.snapshot()
    console.log(this.backup);
    //console.log("backup printed")

		const clearDialog = this.navbar.dialog.open(NavbarDialogsComponent);

		clearDialog.afterClosed().subscribe(() => {
			const clearCanvasBoolean = clearDialog.disableClose;

			//Only clear canvas if reset button is clicked on dialog
			if (clearCanvasBoolean) {
				this.store.dispatch(new ClearCanvas());
				for(let line of this.store.selectSnapshot(WorkspaceState).links){
					this.store.dispatch(new RemoveLineFromStorage(line));
				}
				for(let node of this.store.selectSnapshot(WorkspaceState).TFNode){
					this.store.dispatch(new RemoveTFNode(node));
				}
				this.navbar.graph.clear();
				this.navbar.TFNodeList = [];

        this.navbar.lines = this.navbar.graph.list_of_graphcanvas[0].graph.links;
				const rootNode = this.store.selectSnapshot(WorkspaceState).rootNode;
				let tensorRoot = new TFRootNode();
				tensorRoot.name = "RootNode";

				const liteGraphNode = this.navbar.createLiteNode("RootNode", false, tensorRoot);
				this.navbar.createRootNodeHelper(tensorRoot, liteGraphNode);
			}
		})
    return true;
	}

	undo() {
	  //console.log("clear canvas undo")

    //console.log(this.backup);
    const s = this.store.snapshot()

    console.log(this.backup)
    this.store.reset(this.backup)
    this.store.dispatch(new ResetStore(this.backup))
    console.log("resetting")
    console.log(this.backup)
    console.log(this.store.snapshot())
	}
}
