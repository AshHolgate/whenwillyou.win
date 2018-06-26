export interface Draw {
	drawNumber: number | null;
	numbersDrawn: number[];
	winnings: number | null;
}

export interface SimulationHistory {
	draws: number;
	years: number;
	months: number;
	days: number;
	dayCycleCount: number;
	spent: number;
	won: number;
}

export enum SimulationStatus {
	notSimulating = 0,
	lotto = 1,
	euromillions = 2
}