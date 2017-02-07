import {Random} from "./index";

// https://xkcd.com/221/
export class DiceRandom implements Random {
	public dice: number;

	public constructor(dice: number = 4) {
		this.dice = dice;
	}

	nextInt(max: number): number {
		return this.dice % max;
	}

}
