export class TFNode {
	public childOne: TFNode | undefined = undefined;
	public childTwo: TFNode | undefined = undefined;
	public selector: string | undefined = undefined;
	public positionX: number = 0;
	public positionY: number = 0;

	constructor(public name: string | undefined = undefined,
				public type: string | undefined = undefined,
        public data: Number | undefined = undefined) {}
	code() {}
}
