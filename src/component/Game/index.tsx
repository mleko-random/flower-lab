import * as React from "react";
import {replace, without} from "typescript-array-utils";
import {mergeDeep} from "typescript-object-utils";
import {FlowerEvolutionRule} from "../../model/Flower/FlowerEvolutionRule";
import {GameRules} from "../../model/GameRules";
import {Incubator, slotName} from "../../model/Incubator";
import {Specimen} from "../../model/Specimen";
import {Incubators} from "../Incubators";
import {Storage} from "../Storage";

export class Game extends React.Component<void, State> {

	private rule: GameRules;

	constructor(props: void, context: any) {
		super(props, context);
		this.state = {
			specimens: [],
			storageSize: 10,
			selectedStorageSlot: null,
			incubators: [{slots: {}}, {slots: {}}],
			money: 0
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
				<button onClick={this.sellSelected}>Sell selected</button>
				<div>
					<button onClick={this.buyStorageSlot} disabled={this.nextSlotPrice() > this.state.money}>
						Buy storage slot [{this.nextSlotPrice()}]
					</button>
					<button onClick={this.buyIncubator} disabled={this.nextIncubatorPrice() > this.state.money}>
						Buy incubator [{this.nextIncubatorPrice()}]
					</button>
				</div>
				<div>Money: {this.state.money}</div>
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
	};

	private sellSelected = () => {
		let state = this.state;
		let selectedStorageSlot = state.selectedStorageSlot;
		if (selectedStorageSlot != null && state.specimens[selectedStorageSlot]) {
			const selectedSpecimen = state.specimens[selectedStorageSlot];
			const updatedStorage = without(state.specimens, selectedStorageSlot);
			const value = this.rule.value(selectedSpecimen);
			this.setState({
				specimens: updatedStorage,
				money: state.money + value
			});
		}
	};

	private buyStorageSlot = () => {
		let nextSlotPrice = this.nextSlotPrice();
		if (nextSlotPrice <= this.state.money) {
			this.setState({
				storageSize: this.state.storageSize + 1,
				money: this.state.money - nextSlotPrice
			});
		}
	};

	private nextSlotPrice = () => {
		return Math.round(19 + 5 * Math.pow(1.2, this.state.storageSize));
	};

	private buyIncubator = () => {
		let nextIncubatorPrice = this.nextIncubatorPrice();
		if (nextIncubatorPrice <= this.state.money) {
			this.setState({
				incubators: this.state.incubators.concat({slots: []}),
				money: this.state.money - nextIncubatorPrice
			});
		}
	};

	private nextIncubatorPrice = () => {
		return Math.round(44 + 25 * Math.pow(1.5, this.state.incubators.length));
	};
}

interface State {
	incubators?: Incubator[];

	specimens?: Specimen[];
	storageSize?: number;
	selectedStorageSlot?: number;

	money?: number;
}
