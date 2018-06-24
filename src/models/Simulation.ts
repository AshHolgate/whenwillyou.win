export interface Draw {
	numbersDrawn: number[];
	winnings: number;
}

export enum IsSimulating {
	nothing = 0,
	lotto = 1,
	euromillions = 2
}