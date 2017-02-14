import * as React from "react";
import {Incubator, slotName} from "../../model/Incubator";
import {Specimen} from "../../model/Specimen";
import {Incubators} from "../Incubators";
import {Storage} from "../Storage";

export class Game extends React.Component<Props & ActionProps, void> {

	public render(): JSX.Element {
		const p = this.props;
		return (
			<div>
				<Incubators
					incubators={p.incubators}
					onIncubatorSlotClick={p.onIncubatorSlotClick}
				/>
				<Storage
					size={p.storageSize}
					specimens={p.specimens}
					selectedSlot={p.selectedStorageSlot}
					onSelectSlot={p.onSelectStorageSlot}
				/>
				<button onClick={p.onAddNewFlower}>Add flower</button>
				<button onClick={p.onBreed}>Breed</button>
				<button onClick={p.onSellSelected}>Sell selected</button>
				<button onClick={p.onSellAll}>Sell all</button>
				<div>
					<button onClick={p.onBuyStorageSlot} disabled={p.nextSlotPrice > p.money}>
						Buy storage slot [{p.nextSlotPrice}]
					</button>
					<button onClick={p.onBuyIncubator} disabled={p.nextIncubatorPrice > p.money}>
						Buy incubator [{p.nextIncubatorPrice}]
					</button>
				</div>
				<div>Money: {p.money}</div>
			</div>
		);
	}

}

interface Props {
	incubators: Incubator[];

	specimens: Specimen[];
	storageSize: number;
	selectedStorageSlot: number;

	money: number;

	nextSlotPrice: number;
	nextIncubatorPrice: number;
}

interface ActionProps {
	onAddNewFlower: () => void;
	onBreed: () => void;
	onSellSelected: () => void;
	onSellAll: () => void;
	onBuyStorageSlot: () => void;
	onBuyIncubator: () => void;

	onIncubatorSlotClick: (i: number, slot: slotName) => void;
	onSelectStorageSlot: (id: number) => void;
}
