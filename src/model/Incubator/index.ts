import {Flower} from "../Flower";
export interface Incubator {
	slots: {
		A?: Flower;
		B?: Flower;
	};
}

export type slotName = "A"|"B";
