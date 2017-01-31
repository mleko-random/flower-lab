import * as React from "react";
import {replace, without} from "typescript-array-utils";
import {mergeDeep} from "typescript-object-utils";
import {Incubator, slotName} from "../../model/Incubator";
import {Specimen} from "../../model/Specimen/index";
import {Incubators} from "../Incubators";
import {Storage} from "../Storage";

export class Game extends React.Component<void, State> {

	private static newRandomSpecimen(geneLength: number = 1): Specimen {
		const gene: number[] = [];
		for (let i = 0; i < geneLength; i++) {
			gene.push(Math.floor(Math.random() * Math.pow(2, 32)));
		}

		return {gene};
	}

	constructor(props: void, context: any) {
		super(props, context);
		this.state = {
			specimens: [],
			storageSize: 6,
			selectedStorageSlot: null,
			incubators: [{slots: {}}, {slots: {}}]
		};
	}

	public render(): JSX.Element {
		return (
			<div>
				<Incubators
					incubators={this.state.incubators}
					onIncubatorSlotClick={this.incubatorSlotClick}
				/>
				<Storage
					size={this.state.storageSize}
					specimens={this.state.specimens}
					selectedSlot={this.state.selectedStorageSlot}
					onSelectSlot={this.selectStorageSlot}
				/>
				<button onClick={this.addFlower}>Add flower</button>
			</div>
		);
	}

	private addFlower = () => {
		if (this.state.storageSize <= this.state.specimens.length)return;

		const newSpecimen: Specimen = Game.newRandomSpecimen();
		this.setState({specimens: this.state.specimens.concat(newSpecimen)});
	};

	private selectStorageSlot = (id: number) => {
		this.setState({selectedStorageSlot: id});
	};

	private incubatorSlotClick = (incubatorId: number, slot: slotName) => {
		let state = this.state;
		let selectedStorageSlot = state.selectedStorageSlot;
		if (selectedStorageSlot != null && state.specimens[selectedStorageSlot]) {
			const flower = state.specimens[selectedStorageSlot];
			const incubators = state.incubators;

			let selectedIncubator = incubators[incubatorId];
			let flowerInSelectedSlot = selectedIncubator.slots[slot];

			let updatedStorage = without(state.specimens, selectedStorageSlot);
			if (flowerInSelectedSlot) {
				updatedStorage = updatedStorage.concat(flowerInSelectedSlot);
			}
			this.setState({
				incubators: replace(incubators, incubatorId, mergeDeep(selectedIncubator, {slots: {[slot]: flower}})),
				specimens: updatedStorage
			});
		}
	}
}

interface State {
	incubators?: Incubator[];

	specimens?: Specimen[];
	storageSize?: number;
	selectedStorageSlot?: number;
}
