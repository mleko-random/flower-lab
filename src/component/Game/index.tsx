import * as React from "react";

import {replace} from "typescript-array-utils";
import {shallowMerge} from "typescript-object-utils";

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
		const newFlower: Flower = {color: "white"};
		this.setState({flowers: this.state.flowers.concat(newFlower)});
	}

	private selectStorageSlot = (id: number) => {
		this.setState({selectedStorageSlot: id});
	}

	private incubatorSlotClick = (i: number, slot: slotName) => {
		let state = this.state;
		if (state.selectedStorageSlot != null && state.flowers[state.selectedStorageSlot]) {
			const flower = state.flowers[state.selectedStorageSlot];
			const incubators = state.incubators;
			let mergedIncubator = shallowMerge(incubators[i], {slots: shallowMerge(incubators[i].slots, {[slot]: flower})});
			this.setState({incubators: replace(incubators, i, mergedIncubator)});
		}
	}
}

interface State {
	incubators?: Incubator[];

	flowers?: Flower[];
	storageSize?: number;
	selectedStorageSlot?: number;
}
