import * as React from "react";
import {replace, without} from "typescript-array-utils";
import {mergeNested} from "typescript-object-utils/src/mergeNested";

import {Flower} from "../../model/Flower";
import {Incubator, slotName} from "../../model/Incubator";
import {Incubators} from "../Incubators";
import {Storage} from "../Storage";

export class Game extends React.Component<void, State> {

	constructor(props: void, context: any) {
		super(props, context);
		this.state = {
			flowers: [],
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
					flowers={this.state.flowers}
					selectedSlot={this.state.selectedStorageSlot}
					onSelectSlot={this.selectStorageSlot}
				/>
				<button onClick={this.addFlower}>Add flower</button>
			</div>
		);
	}

	private addFlower = () => {
		if (this.state.storageSize <= this.state.flowers.length)return;

		const colors = [
			"white", "blue", "red", "yellow", "green"
		];

		const newFlower: Flower = {color: colors[Math.floor(Math.random() * colors.length)]};
		this.setState({flowers: this.state.flowers.concat(newFlower)});
	}

	private selectStorageSlot = (id: number) => {
		this.setState({selectedStorageSlot: id});
	}

	private incubatorSlotClick = (incubatorId: number, slot: slotName) => {
		let state = this.state;
		let selectedStorageSlot = state.selectedStorageSlot;
		if (selectedStorageSlot != null && state.flowers[selectedStorageSlot]) {
			const flower = state.flowers[selectedStorageSlot];
			const incubators = state.incubators;

			let selectedIncubator = incubators[incubatorId];
			let flowerInSelectedSlot = selectedIncubator.slots[slot];

			let updatedStorage = without(state.flowers, selectedStorageSlot);
			if (flowerInSelectedSlot) {
				updatedStorage = updatedStorage.concat(flowerInSelectedSlot);
			}
			this.setState({
				incubators: replace(incubators, incubatorId, mergeNested(selectedIncubator, {slots: {[slot]: flower}})),
				flowers: updatedStorage
			});
		}
	}
}

interface State {
	incubators?: Incubator[];

	flowers?: Flower[];
	storageSize?: number;
	selectedStorageSlot?: number;
}
