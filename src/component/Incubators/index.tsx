import * as React from "react";
import {Incubator as IncubatorModel} from "../../model/Incubator";
import {Incubator} from "../Incubator";

export class Incubators extends React.Component<Props, State> {
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
			incubators.push(<Incubator key={i} incubator={this.props.incubators[i]}/>);
		}
		return incubators;
	}
}

interface Props {
	incubators: IncubatorModel[];
}
interface State {

}
