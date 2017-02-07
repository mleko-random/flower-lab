import {GameRules, randomGene} from "../GameRules/index";
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

	public value(a: Specimen): number {
		let value = 1;
		for (let i = 0; i < 4; i++) {
			// tslint:disable-next-line:no-bitwise
			if (a.gene[0] & (0x01 << i)) {
				value++;
			}
		}
		return value;
	}

	public newSpecimen(): Specimen {
		const gene = Array.from({length: geneLength}, () => 0).concat(0);
		return {gene};
	}

	public reproduce(a: Specimen, b: Specimen): Specimen {
		let child = FlowerEvolutionRule.tierUp(this.crossOver(a, b));
		return FlowerEvolutionRule.tierUp(this.mutate(child));
	}

	private crossOver(a: Specimen, b: Specimen): Specimen {
		const crossMap = randomGene(geneLength);
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

	private mutate(a: Specimen): Specimen {
		if (Math.random() > mutationChance) {
			return a;
		}
		// tslint:disable-next-line:no-bitwise
		const mutationMap = 0x01 << (Math.floor(Math.random() * 4));
		// tslint:disable-next-line:no-bitwise
		return {gene: [a.gene[0] ^ mutationMap, a.gene[1]]};
	}

}
