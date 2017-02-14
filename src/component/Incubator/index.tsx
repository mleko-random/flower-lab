import * as React from "react";
import {FlowerSlot} from "../FlowerSlot";
import {Incubator as IncubatorModel, slotName} from "./../../model/Incubator";

export class Incubator extends React.Component<Props, State> {
	public render(): JSX.Element {
		let progress = this.props.incubator.progress;
		return (
			<div style={{border: "1px green solid", padding: 2, display: "inline-block", margin: 2}}>
				<div>
					<FlowerSlot
						flower={this.props.incubator.slots.A}
						onClick={this.slotAClick}
					/>
					<FlowerSlot
						flower={this.props.incubator.slots.B}
						onClick={this.slotBClick}
					/>
				</div>
				<progress style={{width: "100%"}} value={progress} max={1}/>
			</div>
		);
	}

	private slotAClick = () => {
		this.slotClick("A");
	};
	private slotBClick = () => {
		this.slotClick("B");
	};

	private slotClick(slot: slotName) {
		if (this.props.onSlotClick) this.props.onSlotClick(slot);
	}
}

interface Props {
	incubator: IncubatorModel;

	onSlotClick?: (slot: slotName) => void;
}
interface State {

}
