import * as React from "react";
import {replace, without} from "typescript-array-utils";
import {mergeDeep} from "typescript-object-utils";
import {EvolutionRule} from "../../model/EvolutionRule";
import {FlowerEvolutionRule} from "../../model/Flower/FlowerEvolutionRule";
import {Incubator, slotName} from "../../model/Incubator";
import {Specimen} from "../../model/Specimen";
import {Incubators} from "../Incubators";
import {Storage} from "../Storage";

export class Game extends React.Component<void, State> {

	private rule: EvolutionRule;

	constructor(props: void, context: any) {
		super(props, context);
		this.state = {
			specimens: [],
			storageSize: 20,
			selectedStorageSlot: null,
			incubators: [{slots: {}}, {slots: {}}]
		};
		this.rule = new FlowerEvolutionRule();
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
				<button onClick={this.newFlower}>Add flower</button>
				<button onClick={this.breed}>Breed</button>
			</div>
		);
	}

	private addSpecimens = (newSpecimen: Specimen[]) => {
		if (this.state.storageSize <= this.state.specimens.length)return;
		this.setState({specimens: this.state.specimens.concat(newSpecimen.slice(0, this.state.storageSize - this.state.specimens.length))});
	};

	private newFlower = () => {
		this.addSpecimens([this.rule.newSpecimen()]);
	};

	private breed = () => {
		const newSpecimens = [];
		for (let incubator of this.state.incubators) {
			if (incubator.slots.A && incubator.slots.B) {
				let newSpecimen = this.rule.reproduce(incubator.slots.A, incubator.slots.B);
				newSpecimens.push(newSpecimen);
			}
		}
		this.addSpecimens(newSpecimens);
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
