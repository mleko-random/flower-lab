import * as tape from "tape";
import {DiceRandom} from "../Random/DiceRandom";
import {FlowerEvolutionRule} from "./FlowerEvolutionRule";

tape("test cross-over", (t) => {
	const random = new DiceRandom(3);
	const rule = new FlowerEvolutionRule(random);
	const cross = rule.crossOver.bind(rule);
	t.deepEquals(
		cross(
			{gene: [0b00001110, 0x01]},
			{gene: [0b00000111, 0x01]},
			[0b00000011]
		),
		{gene: [0b00000110, 0x01]}
	);

	t.end();
});

tape("test mutation", (t) => {
	const random = new DiceRandom(3);
	const rule = new FlowerEvolutionRule(random);
	const mutate = rule.mutate.bind(rule);
	t.deepEquals(mutate({gene: [0x00, 0x00]}), {gene: [0x08, 0x00]});

	random.dice = 0;
	t.deepEquals(mutate({gene: [0x00, 0x00]}), {gene: [0x01, 0x00]});
	t.deepEquals(mutate({gene: [0x01, 0x00]}), {gene: [0x00, 0x00]});

	random.dice = 11;
	t.deepEquals(mutate({gene: [0x00, 0x00]}), {gene: [0x00, 0x00]});

	t.end();
});
