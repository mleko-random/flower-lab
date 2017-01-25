import * as React from "react";
import {Flower} from "../../model/Flower";
import {Flower as FlowerComponent} from "./../Flower";

export class FlowerSlot extends React.Component<Props, State> {
	public render(): JSX.Element {
		return (
			<div
				style={{height: 60, width: 60, margin: 3, backgroundColor: "grey", display: "inline-block"}}
				onClick={this.click}
			>
				{this.props.flower ? (<FlowerComponent flower={this.props.flower}/>) : null}
			</div>
		);
	}

	private click = () => {
		if (this.props.onClick) this.props.onClick();
	}
}

interface Props {
	flower?: Flower;

	onClick?: () => void;
}
interface State {

}
