import * as React from "react";
import {Flower} from "../../model/Flower";
import {Incubator} from "../../model/Incubator";
import {Incubators} from "../Incubators";
import {Storage} from "../Storage";

export class Game extends React.Component<void, State> {

	constructor(props: void, context: any) {
		super(props, context);
		this.state = {
			flowers: [],
			storageSize: 6,
			selectedStorageSlot: null,
			incubators: [{}, {}]
		};
	}

	public render(): JSX.Element {
		return (
			<div>
				<Incubators incubators={this.state.incubators}/>
				<Storage
					size={this.state.storageSize}
					flowers={this.state.flowers}
					selectedSlot={this.state.selectedStorageSlot}
					onSelectSlot={this.selectStorageSlot}
				/>
				<button onClick={this.addFlower}>Add flower</button>
			</div>
		);
	}

	private addFlower = () => {
		if (this.state.storageSize <= this.state.flowers.length)return;
		const newFlower: Flower = {color: "white"};
		this.setState({flowers: this.state.flowers.concat(newFlower)});
	}

	private selectStorageSlot = (id: number) => {
		this.setState({selectedStorageSlot: id});
	}
}

interface State {
	incubators?: Incubator[];

	flowers?: Flower[];
	storageSize?: number;
	selectedStorageSlot?: number;
}
