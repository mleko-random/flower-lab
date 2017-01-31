import * as React from "react";
import {Flower as FlowerModel} from "../../model/Flower";
import {FlowerSVG} from "../FlowerSVG/index";

export class Flower extends React.Component<Props, State> {
	public render(): JSX.Element {
		let style = {
			height: "100%"
		};
		return (
			<FlowerSVG style={style} petalColors={this.props.flower.colors}/>
		);
	}
}

interface Props {
	flower: FlowerModel;
}
interface State {

}
