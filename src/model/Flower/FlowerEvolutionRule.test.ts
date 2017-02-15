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

tape("test flower value", (t) => {
	const rule = new FlowerEvolutionRule();

	t.equals(rule.value({gene: [0x00, 0x00]}), 1);
	t.equals(rule.value({gene: [0x01, 0x00]}), 2);
	t.equals(rule.value({gene: [0x02, 0x00]}), 2);
	t.equals(rule.value({gene: [0x03, 0x00]}), 3);
	t.equals(rule.value({gene: [0x00, 0x01]}), 4);
	t.equals(rule.value({gene: [0x01, 0x01]}), 5);
	t.equals(rule.value({gene: [0x00, 0x02]}), 16);
	t.equals(rule.value({gene: [0x01, 0x02]}), 19);

	t.end();
});
