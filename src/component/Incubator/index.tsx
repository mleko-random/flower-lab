import * as React from "react";
import {FlowerSlot} from "../FlowerSlot";

import {Incubator as IncubatorModel} from "./../../model/Incubator";

export class Incubator extends React.Component<Props, State> {
	public render(): JSX.Element {
		return (
			<div style={{border: "1px green solid", padding: 2, display: "inline-block", margin: 2}}>
				<FlowerSlot flower={this.props.incubator.slotA}/>
				<FlowerSlot flower={this.props.incubator.slotB}/>
			</div>
		);
	}
}

interface Props {
	incubator: IncubatorModel;
}
interface State {

}
