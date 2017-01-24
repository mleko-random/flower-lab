import * as React from "react";
import {StorageSlot} from "../StorageSlot/index";
import {Flower} from "../../model/Flower/index";

export class Storage extends React.Component<Props, State> {
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
			slots.push(<StorageSlot flower={flowers.length > i ? flowers[i] : null}/>);
		}
		return slots;
	}
}

interface Props {
	size: number;
	flowers: Flower[];
}
interface State {

}
