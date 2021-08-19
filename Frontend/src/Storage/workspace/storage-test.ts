import {WorkspaceState, WorkspaceStateModel} from "./workspace.state";
import {TestBed} from "@angular/core/testing";
import {TFNode} from "../../app/tf";
import {AddNodeToStorage, AddTFNode} from "./workspace.actions";
import {Store} from "@ngxs/store";

describe('Workspace Storage', () => {
  let state : WorkspaceState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    state = TestBed.inject(WorkspaceState);
  });
});
