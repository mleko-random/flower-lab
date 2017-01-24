import * as React from "react";
import {Flower as FlowerModel} from "../../model/Flower/index";

export class Flower extends React.Component<Props, State> {
	public render(): JSX.Element {
		let style = {
			backgroundColor: this.props.flower.color,
			borderRadius: "50%",
			height: "100%"
		};
		return (
			<div style={style}/>
		);
	}
}

interface Props {
	flower: FlowerModel;
}
interface State {

}
