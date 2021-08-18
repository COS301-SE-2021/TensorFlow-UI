export class TFNode {
	public childOne: TFNode | undefined = undefined;
	public childTwo: TFNode | undefined = undefined;
	public selector: string | undefined = undefined;

	constructor(public name: string | undefined = undefined,
				public type: string | undefined = undefined) {}
	code() {}
}
