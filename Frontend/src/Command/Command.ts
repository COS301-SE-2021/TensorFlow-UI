import {Store} from "@ngxs/store";

export abstract class Command {

  protected constructor(protected store: Store) {
  }

  public abstract execute();

  public abstract undo();
}

