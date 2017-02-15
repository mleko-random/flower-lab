import {Specimen} from "../Specimen";

import {Random} from "../Random";
import {NativeRandom} from "../Random/NativeRandom";

export interface GameRules {
	newSpecimen(): Specimen;
	reproduce(a: Specimen, b: Specimen): Specimen;
	value(a: Specimen): number;
	nextStorageSlotPrice(storageSize: number): number;
	nextIncubatorPrice(incubatorCount: number): number;
}

const twoPowThirtyTwo = Math.pow(2, 32);
const nativeRandom = new NativeRandom();

export function randomGene(geneLength: number = 1, random: Random = nativeRandom): number[] {
	const gene: number[] = [];
	for (let i = 0; i < geneLength; i++) {
		gene.push(random.nextInt(twoPowThirtyTwo));
	}

	return gene;
}
