import * as React from "react";
import {getFlower} from "../../model/Flower";
import {Specimen} from "../../model/Specimen";
import {Flower as FlowerComponent} from "./../Flower";

export class FlowerSlot extends React.Component<Props, State> {
	public render(): JSX.Element {
		const flower = this.props.flower ? getFlower(this.props.flower) : null;

		return (
			<div
				style={{height: 60, width: 60, margin: 3, backgroundColor: "grey", display: "inline-block", overflow: "hidden"}}
				onClick={this.click}
			>
				{this.props.flower ? (<FlowerComponent flower={flower}/>) : null}
			</div>
		);
	}

	private click = () => {
		if (this.props.onClick) this.props.onClick();
	}
}

interface Props {
	flower?: Specimen;

	onClick?: () => void;
}
interface State {

}
