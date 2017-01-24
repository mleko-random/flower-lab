import * as React from "react";

export class Counter extends React.Component<void, State> {

	public constructor(props) {
		super(props);
		this.state = {
			counter: 0
		};
	}

	public render(): JSX.Element {
		return (
			<div>
				<button onClick={this.click}>Increment counter</button>
				<span>{this.state.counter}</span>
			</div>
		);
	}

	private click = () => {
		this.setState({counter: (this.state.counter || 0) + 1});
	}
}

interface State {
	counter: number;
}
