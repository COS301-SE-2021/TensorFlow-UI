export class TFNode {
	public childOne: TFNode | undefined = undefined;
	public childTwo: TFNode | undefined = undefined;

	constructor(public name: string | undefined = undefined) {}

	code() {}
}
