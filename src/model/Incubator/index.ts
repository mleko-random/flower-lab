import {Specimen} from "../Specimen/index";
export interface Incubator {
	slots: {
		A?: Specimen;
		B?: Specimen;
	};
	progress: number;
}

export type slotName = "A"|"B";
