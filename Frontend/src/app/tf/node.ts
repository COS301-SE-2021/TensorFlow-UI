export class TFNode {

	constructor(public name: String | undefined = undefined,
              public childOne: TFNode | undefined = undefined,
              public childTwo: TFNode | undefined = undefined
  ) {}

	code() {}
}
