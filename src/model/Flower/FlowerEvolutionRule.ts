import {GameRules, randomGene} from "../GameRules/index";
import {Random} from "../Random";
import {nativeRandom} from "../Random/NativeRandom";
import {Specimen} from "../Specimen";

const geneLength = 1;
const mutationChance = 0.1;

export class FlowerEvolutionRule implements GameRules {

	private static tierUp(a: Specimen): Specimen {
		const g = a.gene[0];
		// tslint:disable-next-line:no-bitwise
		if (!((g & 0x0f) ^ 0x0f) && a.gene[1] < 3) {
			return {gene: [0x00, a.gene[1] + 1]};
		}
		return a;
	}

	public constructor(private random: Random = nativeRandom) {
	}

	public value(a: Specimen): number {
		let value = 0;
		const tierValue = Math.pow(4, a.gene[1]);
		for (let i = 0; i < 4; i++) {
			// tslint:disable-next-line:no-bitwise
			if (a.gene[0] & (0x01 << i)) {
				value += Math.ceil(tierValue / 7);
			}
		}
		return tierValue + value;
	}

	public newSpecimen(): Specimen {
		const gene = Array.from({length: geneLength}, () => 0).concat(0);
		return {gene};
	}

	public reproduce(a: Specimen, b: Specimen): Specimen {
		let child = FlowerEvolutionRule.tierUp(this.crossOver(a, b));
		return FlowerEvolutionRule.tierUp(this.mutate(child));
	}

	public crossOver(a: Specimen, b: Specimen): Specimen {
		const crossMap = randomGene(geneLength, this.random);
		const gene = [];
		for (let i = 0; i < geneLength; i++) {
			// tslint:disable:no-bitwise
			let aPart = ((a.gene[1] > b.gene[1] ? 0x0f : a.gene[i]) & crossMap[i]);
			let bPart = ((b.gene[1] > a.gene[1] ? 0x0f : b.gene[i]) & (~crossMap[i]));
			gene.push(aPart | bPart);
			// tslint:enable:no-bitwise
			gene.push(Math.min(a.gene[1], b.gene[1]));
		}
		return {gene};
	}

	public mutate(a: Specimen): Specimen {
		if (this.random.nextInt(100) / 100 > mutationChance) {
			return a;
		}
		// tslint:disable-next-line:no-bitwise
		const mutationMap = 0x01 << this.random.nextInt(4);
		// tslint:disable-next-line:no-bitwise
		return {gene: [a.gene[0] ^ mutationMap, a.gene[1]]};
	}

	public nextStorageSlotPrice = (storageSize: number) => {
		return Math.round(4 * Math.pow(5, storageSize - 8));
	};

	public nextIncubatorPrice = (incubatorCount: number) => {
		return Math.round(25 + 15 * Math.pow(15, incubatorCount - 1));
	};
}
