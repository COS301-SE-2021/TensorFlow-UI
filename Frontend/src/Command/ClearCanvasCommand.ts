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
import {ReloadFromStoreCommand} from "./ReloadFromStoreCommand";

export class ClearCanvasCommand extends Command {

	constructor(store: Store, private navbar: NavbarComponent) {
		super(store);
	}

	execute() {
    this.backup = this.store.snapshot();

		const clearDialog = this.navbar.dialog.open(NavbarDialogsComponent);

		clearDialog.afterClosed().subscribe(() => {
			const clearCanvasBoolean = clearDialog.disableClose;

			//Only clear canvas if reset button is clicked on dialog
			if (clearCanvasBoolean) {
				this.store.dispatch(new ClearCanvas());
        const rootNode = this.store.selectSnapshot(WorkspaceState).rootNode;
				for(let line of this.store.selectSnapshot(WorkspaceState).links){
					this.store.dispatch(new RemoveLineFromStorage(line));
				}
				for(let node of this.store.selectSnapshot(WorkspaceState).TFNode){
					this.store.dispatch(new RemoveTFNode(node));
				}
				this.navbar.graph.clear();
				this.navbar.TFNodeList = [];

        this.navbar.lines = this.navbar.graph.list_of_graphcanvas[0].graph.links;

        let tensorRoot = this.navbar.rootNode==null ? new TFRootNode() : this.navbar.rootNode;
        tensorRoot.name = "RootNode";

				const liteGraphNode = this.navbar.createLiteNode("RootNode", true, rootNode);
				this.navbar.createRootNodeHelper(rootNode, liteGraphNode);
			}
		})
    return true;
	}

	undo() {
    this.store.reset(this.backup)
    this.store.dispatch(new ResetStore(this.backup))
    let c = new ReloadFromStoreCommand(this.store,this.navbar);
    c.execute();
    }
}
