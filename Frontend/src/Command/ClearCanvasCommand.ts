import {Command} from "./Command";
import {NavbarDialogsComponent} from "../app/Components/navbar-dialogs/navbar-dialogs.component";
import {
	ClearCanvas,
	RemoveAllLineFromStorage,
	RemoveLineFromStorage,
	RemoveTFNode,
	WorkspaceState
} from "../Storage/workspace";
import {NavbarComponent} from "../app/Components/navbar/navbar.component";
import {Store} from "@ngxs/store";
import {NodeStore} from "../app/tf";
import {TFRootNode} from "../app/tf/rootNode/rootNode";

export class ClearCanvasCommand extends Command {
	private nav: NavbarComponent
  private backup;
	constructor(store: Store, private navbar: NavbarComponent) {
		super(store);
		this.nav = navbar;
	}

	execute() {
    this.backup = this.store.snapshot();
    //console.log(this.backup);
    //console.log("backup printed")

		const clearDialog = this.nav.dialog.open(NavbarDialogsComponent);

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
				this.nav.graph.clear();
				this.nav.TFNodeList = [];

				const rootNode = this.store.selectSnapshot(WorkspaceState).rootNode;
				let tensorRoot = new TFRootNode();
				tensorRoot.name = "RootNode";

				const liteGraphNode = this.nav.createLiteNode("RootNode", false, tensorRoot);
				this.nav.createRootNodeHelper(tensorRoot, liteGraphNode);
			}
		})
    return true;
	}

	undo() {
	  console.log("clear canvas undo")
	  return this.backup
	}
}
