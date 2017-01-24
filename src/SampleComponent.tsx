import * as React from "react";
import {Counter} from "./Counter";
export class SampleComponent extends React.Component<void, void> {

	public render(): JSX.Element {
		return (
			<div>
				<h1>Hello, TypeScript!</h1>
				<Counter/>
			</div>
		);
	}
}
