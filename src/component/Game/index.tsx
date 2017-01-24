import * as React from "react";
import {Storage} from "../Storage/index";
import {Flower} from "../../model/Flower/index";

export class Game extends React.Component<Props, State> {

	constructor(props: Props, context: any) {
		super(props, context);
		this.state = {
			flowers: [],
			storageSize: 6
		};
	}

	public render(): JSX.Element {
		return (
			<div>
				<Storage size={this.state.storageSize} flowers={this.state.flowers}/>
				<button onClick={this.addFlower}>Add flower</button>
			</div>
		);
	}

	private addFlower = () => {
		if (this.state.storageSize <= this.state.flowers.length)return;
		const newFlower: Flower = {color: "blue"};
		this.setState({flowers: this.state.flowers.concat(newFlower)});
	}
}

interface Props {

}
interface State {
	flowers?: Flower[];
	storageSize?: number;
}
