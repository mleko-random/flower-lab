import * as React from "react";
import {StorageSlot} from "../StorageSlot/index";

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
		for (let i = 0; i < this.props.storageSize; i++) {
			slots.push(<StorageSlot/>);
		}
		return slots;
	}
}

interface Props {
	storageSize: number;
}
interface State {

}
