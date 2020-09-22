import { Board, IBoard } from "./board";
import { QueuingMachine } from "./TestFactory/queuing-machine";
import { TestStepTurn } from "./TestFactory/test-step-turn";

let defaultTestCreationTurnOrder = [TestStepTurn.When, TestStepTurn.Then, TestStepTurn.Given];

export let globalStepNavigator = new QueuingMachine(defaultTestCreationTurnOrder)

export let globalBoard: IBoard = new Board()