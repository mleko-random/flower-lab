import * as React from "react";
import {Incubator as IncubatorModel, slotName} from "../../model/Incubator";
import {Incubator} from "../Incubator";

export class Incubators extends React.Component<Props, State> {

	private incubatorClickHandlers = [];

	public render(): JSX.Element {
		return (
			<div style={{border: "1px blue solid", padding: 2}}>
				{this.renderIncubators()}
			</div>
		);
	}

	private renderIncubators() {
		const incubators = [];
		for (let i = 0; i < this.props.incubators.length; i++) {
			incubators.push(
				<Incubator
					key={i}
					incubator={this.props.incubators[i]}
					onSlotClick={this.slotClickHandler(i)}
				/>);
		}
		return incubators;
	}

	private slotClickHandler = (i: number) => {
		if (!(i in this.incubatorClickHandlers)) {
			this.incubatorClickHandlers[i] = (slot: slotName) => {
				this.incubatorClick(i, slot);
			};
		}
		return this.incubatorClickHandlers[i];
	};

	private incubatorClick = (i: number, slot: slotName) => {
		if (this.props.onIncubatorSlotClick) this.props.onIncubatorSlotClick(i, slot);
	}
}

interface Props {
	incubators: IncubatorModel[];

	onIncubatorSlotClick?: (i: number, slot: slotName) => void;
}
interface State {

}
