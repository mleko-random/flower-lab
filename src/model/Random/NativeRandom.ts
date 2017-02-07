import {Random} from "./index";
export class NativeRandom implements Random {
	public nextInt(max: number): number {
		return Math.floor(Math.random() * max);
	}
}

export const nativeRandom = new NativeRandom();
