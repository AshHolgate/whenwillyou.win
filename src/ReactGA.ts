import * as ReactGA from "react-ga";

export const initGA = () => {
	console.log("GA Init");
	ReactGA.initialize("UA-121894518-1");
};

export const logPageView = () => {
	ReactGA.set({ page: window.location.pathname});
	ReactGA.pageview(window.location.pathname);
};