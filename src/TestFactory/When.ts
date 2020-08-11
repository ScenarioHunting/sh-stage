import { testStep, TestStepTurn } from "./testStep";
import { globalBoard, globalStepNavigator } from "./Given";

export const WhenStep = testStep({
	board: globalBoard,
	stepNavigator: globalStepNavigator,
	stepType: TestStepTurn.When,
	selectionWaitingMessage: 'Select the exercise you want to test.',
	turn: TestStepTurn.When,
	// onWidgetSelection: transit(TestStepTurn.When, TestStepTurn.Then)
})