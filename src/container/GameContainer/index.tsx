import * as React from "react";
import {replace, without} from "typescript-array-utils";
import {merge, mergeDeep} from "typescript-object-utils";
//
import {Game} from "../../component/Game";
import {FlowerEvolutionRule} from "../../model/Flower/FlowerEvolutionRule";
import {GameRules} from "../../model/GameRules";
import {Incubator, slotName} from "../../model/Incubator";
import {Specimen} from "../../model/Specimen";

const rules: GameRules = new FlowerEvolutionRule();
const incubationTime = 5;

export class GameContainer extends React.Component<void, State> {

	constructor(props: void, context: any) {
		super(props, context);
		this.state = {
			specimens: [],
			storageSize: 10,
			selectedStorageSlot: null,
			incubators: [{slots: {}, progress: 0}, {slots: {}, progress: 0}],
			money: 0,
			time: Date.now()
		};
	}

	public render(): JSX.Element {
		const s = this.state;
		return (
			<Game
				incubators={s.incubators}
				specimens={s.specimens}
				storageSize={s.storageSize}
				selectedStorageSlot={s.selectedStorageSlot}
				money={s.money}

				nextSlotPrice={this.nextSlotPrice()}
				nextIncubatorPrice={this.nextIncubatorPrice()}

				onAddNewFlower={this.newFlower}
				onIncubatorSlotClick={this.incubatorSlotClick}
				onSelectStorageSlot={this.selectStorageSlot}
				onSellSelected={this.sellSelected}
				onSellAll={this.sellAll}
				onBreed={this.breed}
				onBuyIncubator={this.buyIncubator}
				onBuyStorageSlot={this.buyStorageSlot}
			/>
		);
	}

	public componentDidMount() {
		this.tick();
	}

	private tick = () => {
		const time = Date.now();
		const diff = time - this.state.time;
		const incubationProgress = diff / 1000 / incubationTime;
		const newSpecimens = [];

		let incubators = [];
		for (let incubator of this.state.incubators) {
			if (incubator.slots.A && incubator.slots.B) {
				if (incubator.progress + incubationProgress >= 1) {
					let newSpecimen = rules.reproduce(incubator.slots.A, incubator.slots.B);
					newSpecimens.push(newSpecimen);
				}
				incubators.push(merge(incubator, {progress: (incubator.progress + incubationProgress) % 1}));
			} else {
				incubators.push(incubator);
			}
		}
		const specimens = newSpecimens.length == 0 ? this.state.specimens : this.addSpecimens(newSpecimens);
		this.setState({incubators, time, specimens});
		requestAnimationFrame(this.tick);
	};

	private addSpecimens = (newSpecimen: Specimen[]): Specimen[] => {
		if (this.state.storageSize <= this.state.specimens.length)return this.state.specimens;
		return this.state.specimens.concat(newSpecimen.slice(0, this.state.storageSize - this.state.specimens.length));
	};

	private newFlower = () => {
		this.setState({specimens: this.addSpecimens([rules.newSpecimen()])});
	};

	private breed = () => {
		const newSpecimens = [];
		for (let incubator of this.state.incubators) {
			if (incubator.slots.A && incubator.slots.B) {
				let newSpecimen = rules.reproduce(incubator.slots.A, incubator.slots.B);
				newSpecimens.push(newSpecimen);
			}
		}
		this.setState({specimens: this.addSpecimens(newSpecimens)});
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
			const value = rules.value(selectedSpecimen);
			this.setState({
				specimens: updatedStorage,
				money: state.money + value
			});
		}
	};

	private sellAll = () => {
		this.setState({
			specimens: [],
			money: this.state.specimens.map((s) => rules.value(s)).reduce((p, c) => p + c, this.state.money)
		});
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
				incubators: this.state.incubators.concat({slots: [], progress: 0}),
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

	time?: number;
}
