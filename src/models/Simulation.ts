export interface Draw {
	drawNumber: number | null;
	numbersDrawn: number[];
	winnings: number | null;
}

export interface SimulationHistory {
	draws: number;
	year: number;
	month: number;
	day: number;
	currentDrawDate: Date;
	dayCycleCount: number;
	spent: number;
	won: number;
}

export enum SimulationStatus {
	notSimulating = 0,
	lotto = 1,
	euromillions = 2
}