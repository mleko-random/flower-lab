import * as React from "react";
import {Specimen} from "../../model/Specimen";
import {FlowerSlot} from "../FlowerSlot";

export class Storage extends React.PureComponent<Props, void> {

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
		const specimen = this.props.specimens;
		for (let i = 0; i < this.props.size; i++) {
			slots.push(
				<div
					style={{border: this.props.selectedSlot === i ? "2px black dashed" : "2px transparent solid", display: "inline-block"}}
					key={i}
				>
					<FlowerSlot
						flower={specimen.length > i ? specimen[i] : null}
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
	specimens: Specimen[];
	selectedSlot?: number;

	onSelectSlot?: (id: number) => void;
}
