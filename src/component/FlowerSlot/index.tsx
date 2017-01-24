import * as React from "react";
import {Flower} from "../../model/Flower";
import {Flower as FlowerComponent} from "./../Flower";

export class FlowerSlot extends React.Component<Props, State> {
	public render(): JSX.Element {
		return (
			<div style={{height: 60, width: 60, margin: 3, backgroundColor: "grey", display: "inline-block"}}>
				{this.props.flower ? (<FlowerComponent flower={this.props.flower}/>) : null}
			</div>
		);
	}
}

interface Props {
	flower?: Flower;
}
interface State {

}
