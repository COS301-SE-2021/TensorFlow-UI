import {Store} from "@ngxs/store";
import {CommandHistory} from "./CommandHistory";

export abstract class Command {
  protected history: CommandHistory

  protected constructor(protected store: Store) {
  }

  public abstract execute();

  public abstract undo();
}

