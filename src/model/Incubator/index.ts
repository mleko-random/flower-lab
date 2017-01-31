import {Specimen} from "../Specimen/index";
export interface Incubator {
	slots: {
		A?: Specimen;
		B?: Specimen;
	};
}

export type slotName = "A"|"B";
