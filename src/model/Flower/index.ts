import {Specimen} from "../Specimen/index";
export interface Flower {
	readonly colors: string[];
}

const colors = [
	"white", "blue", "red", "yellow", "green"
];

export function getFlower(specimen: Specimen): Flower {
	let petals = [];
	for (let i = 0; i < 4; i++) {
		// tslint:disable-next-line:no-bitwise
		let color = +(!!(specimen.gene[0] & (0x01 << i)));
		petals[i] = colors[color];
	}
	return {colors: petals};
}
