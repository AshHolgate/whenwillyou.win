export interface Draw {
	numbersDrawn: number[];
	winnings: number | null;
}

export enum IsSimulating {
	nothing = 0,
	lotto = 1,
	euromillions = 2
}