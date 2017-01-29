import * as React from "react";

interface FlowerProps {
	petalCount?: number;
	style?: any;
	color?: string;
}

export class FlowerSVG extends React.Component<FlowerProps, State> {
	protected static defaultProps: FlowerProps = {
		petalCount: 5
	};

	constructor(props: FlowerProps, context: any) {
		super(props, context);
		this.state = {
			debug: false
		};
	}

	public render(): JSX.Element {
		return (
			<svg style={this.props.style} viewBox="0 0 240 240">
				<g transform="translate(120, 120)">
					{this.renderHelperElements()}
					<g style={{stroke: "black", strokeWidth: 2, fill: "none"}}>
						{this.renderPetals()}
					</g>
					<circle cx="0" cy="0" r="20" style={{fill: "yellow"}}/>
				</g>
			</svg>
		);
	}

	private renderPetals() {
		let petals = [];
		let path = this.petalPath();
		for (let i = 0; i < this.props.petalCount; i++) {
			const turn = i / this.props.petalCount;
			let petalStyle = {
				fill: this.props.color,
				transform: "rotate(" + turn + "turn)"
			};
			petals.push(<path key={i} d={path} style={petalStyle}/>);
		}
		return <g>{petals}</g>;
	}

	private calculatePoints = () => {
		return {
			center: {x: 0, y: 0},
			p0_16_mi: this.radialPoint(0, 60),
			p0_16: this.radialPoint(0),
			p1_16: this.radialPoint(1 / 16),
			p2_16: this.radialPoint(1 / 8),
			p3_16: this.radialPoint(1 / 16 * 3),
			p4_16: this.radialPoint(1 / 4),
			p4_16_mo: this.radialPoint(1 / 4, 110),
			p5_16: this.radialPoint(5 / 16),
			p6_16: this.radialPoint(3 / 8),
			p7_16: this.radialPoint(7 / 16),
			p8_16: this.radialPoint(1 / 2),
			p8_16_mi: this.radialPoint(1 / 2, 60)
		};
	};

	private petalPath() {
		const P = this.calculatePoints();
		const p = (n) => `${P[n].x} ${P[n].y}`;

		return `
		M ${p("center")} 
		L ${p("p0_16_mi")} 
		C ${p("p0_16")} ${p("p1_16")} ${p("p2_16")}
		C ${p("p3_16")} ${p("p4_16")} ${p("p4_16_mo")}
		C ${p("p4_16")} ${p("p5_16")} ${p("p6_16")}
		C ${p("p7_16")} ${p("p8_16")} ${p("p8_16_mi")}
		L ${p("center")}`;
	}

	private renderHelperElements() {
		if(!this.state.debug) return null;
		const P = this.calculatePoints();
		return (
			<g>
				<g style={{strokeWidth: 1, stroke: "green", fill: "none"}}>
					<circle cx={P.center.x} cy={P.center.y} r={100}/>
					<path d="M -100 -100 L 100 100"/>
					<path d="M 0 -100 L 0 100"/>
					<path d="M -100 0 L 100 0"/>
				</g>
				<g style={{strokeWidth: 2, stroke: "red", fill: "none"}}>
					{this.renderPoints()}
				</g>
			</g>
		);
	}

	private renderPoints(): JSX.Element[] {
		let points = [];
		let petalPoints = this.calculatePoints();
		for (let p in petalPoints) {
			if (petalPoints.hasOwnProperty(p)) {
				points.push(<circle cx={petalPoints[p].x} cy={petalPoints[p].y} r={1} key={p}/>);
			}
		}
		return points;
	}

	private radialPoint(part, radius = 100) {
		const rad = Math.PI * part * 4 / this.props.petalCount;
		return {x: radius * Math.sin(rad), y: radius * Math.cos(rad)};
	}
}

interface State {
	debug?: boolean;
}
