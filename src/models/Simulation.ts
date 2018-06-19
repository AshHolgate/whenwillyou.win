export default interface SimulationData {
	numbersChosen: (number|null)[];
	draws: Draw[];
	keyFacts: string[];
}

export interface Draw {
	numbersDrawn: number[];
	winnings: number;
}