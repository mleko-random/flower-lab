import {GameRules, randomGene} from "../GameRules/index";
import {Specimen} from "../Specimen/index";

const geneLength = 1;
const mutationChance = 0.1;

export class FlowerEvolutionRule implements GameRules {
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
		const gene = Array.from({length: geneLength}, () => 0);
		return {gene};
	}

	public reproduce(a: Specimen, b: Specimen): Specimen {
		const crossMap = randomGene(geneLength);
		const gene = [];
		for (let i = 0; i < geneLength; i++) {
			// tslint:disable:no-bitwise
			let aPart = (a.gene[i] & crossMap[i]);
			let bPart = (b.gene[i] & (~crossMap[i]));
			gene.push(aPart | bPart);
			// tslint:enable:no-bitwise
		}
		return this.mutate({gene});
	}

	private mutate(a: Specimen): Specimen {
		if (Math.random() > mutationChance) {
			return a;
		}
		// tslint:disable-next-line:no-bitwise
		const mutationMap = 0x01 << (Math.ceil(Math.random() * 4));
		// tslint:disable-next-line:no-bitwise
		return {gene: [a.gene[0] ^ mutationMap]};
	}

}
