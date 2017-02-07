import {Specimen} from "../Specimen";
export interface Flower {
	readonly colors: string[];
}

const colors = [
	"white", "blue", "red", "yellow", "green"
];

export function getFlower(specimen: Specimen): Flower {
	let petals = [];
	const petalsGene = specimen.gene[0];
	const tier = specimen.gene[1];
	for (let i = 0; i < 4; i++) {
		// tslint:disable-next-line:no-bitwise
		let color = tier + +(!!(petalsGene & (0x01 << i)));
		petals[i] = colors[color];
	}
	return {colors: petals};
}
