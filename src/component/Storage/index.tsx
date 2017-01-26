import * as React from "react";
import {Flower} from "../../model/Flower";
import {FlowerSlot} from "../FlowerSlot";

export class Storage extends React.Component<Props, State> {

	private slotClickHandlers = [];

	public render(): JSX.Element {
		return (
			<div style={{border: "1px black solid", padding: 2}}>
				{this.renderSlots()}
			</div>
		);
	}

	private renderSlots() {
		const slots = [];
		const flowers = this.props.flowers;
		for (let i = 0; i < this.props.size; i++) {
			slots.push(
				<div
					style={{border: this.props.selectedSlot === i ? "2px black dashed" : "2px transparent solid", display: "inline-block"}}
					key={i}
				>
					<FlowerSlot
						flower={flowers.length > i ? flowers[i] : null}
						onClick={this.slotClickHandler(i)}
					/>
				</div>
			);
		}
		return slots;
	}

	private slotClickHandler(i: number) {
		if (!(i in this.slotClickHandlers)) {
			this.slotClickHandlers[i] = () => {
				this.slotClick(i);
			};
		}
		return this.slotClickHandlers[i];
	}

	private slotClick = (id: number) => {
		if (this.props.onSelectSlot) {
			this.props.onSelectSlot(this.props.selectedSlot != id ? id : null);
		}
	}
}

interface Props {
	size: number;
	flowers: Flower[];
	selectedSlot?: number;

	onSelectSlot?: (id: number) => void;
}
interface State {

}
