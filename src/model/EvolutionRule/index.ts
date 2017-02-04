import {Specimen} from "../Specimen";
export interface EvolutionRule {
	newSpecimen(): Specimen;
	reproduce(a: Specimen, b: Specimen): Specimen;
}

export function randomGene(geneLength: number = 1): number[] {
	const gene: number[] = [];
	for (let i = 0; i < geneLength; i++) {
		gene.push(Math.floor(Math.random() * Math.pow(2, 32)));
	}

	return gene;
}
