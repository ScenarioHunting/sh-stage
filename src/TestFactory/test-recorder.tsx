import * as React from 'react';
// import { RouteComponentProps } from '@reach/router';
import { globalStepNavigator, Givens, IndexedStep } from './given';
import { WhenStep as When } from './when';
import { ThenStep as Then } from './then';
import { Step } from "./step";
import { navigate } from "@reach/router"
import { globalBoard } from '../global';
import { Widget, Board } from 'board';
import { Save, LocalTestCreationResult } from './server';

export type StepInfo = {
    type: string
    widget: Widget
}
export type ViewModel = {
    givens: StepInfo[]
    when: StepInfo
    then: StepInfo
    testName: string
    testContext: string
    sutName: string
}
type TestRecorderProps = {
    board: Board
    // eslint-disable-next-line no-unused-vars
    save: (test: LocalTestCreationResult, onSuccess, onError) => Promise<void>
}
const TestRecorder: React.FC<any> = ({ board = globalBoard
    , save = Save }: TestRecorderProps) => {
    if (!board) {
        //TODO: Implement guard
    }
    React.useEffect(() => {
        board.unselectAll()
            .then(globalStepNavigator.start);
    }, [board]);


    // React.useEffect(() =>
    //     recordTestName(testName == "" ?
    //         when?.data.type + '_' + then?.data.type
    //         : testName))


    const [givens, recordGiven] = React.useState<IndexedStep[]>([]);
    const [when, recordWhen] = React.useState<Step>();
    const [then, recordThen] = React.useState<Step>();
    const [testName, recordTestName] = React.useState<string>("");
    const [testContext, recordTestContext] = React.useState<string>("SampleService");
    const [sutName, recordSutName] = React.useState<string>("");

    const updateGivens = (givenResults: IndexedStep[]) => {
        recordGiven(givenResults);
    };
    const updateWhen = (when: Step) => {
        recordWhen(when);
    };
    const updateThen = (then: Step) => {
        recordThen(then);
    };
    const showValidationError = (errorText: string) => {
        board.showNotification(errorText)
    }

    const saveAndRedirectToExplorer = async () => {
        if (!when) {
            showValidationError('No when selections. Please save the test after selecting the when step.')
            return
        }
        if (!then) {
            showValidationError('No then selections. Please save the test after selecting the then step.')
            return
        }

        save({
            testContext,
            testName,
            sutName,

            givens,
            when,
            then
        } as LocalTestCreationResult
            , () => board.showNotification('Test created successfully.')
            , (statusText: string) => board.showNotification('Test creation error try again later.\n' + statusText)//TODO: provide more guidance to user
        );

        const toViewModel = (step: Step): StepInfo => {
            return {
                type: step.data.type,
                widget: step.metadata.widget
            }
        }
        var viewModel: ViewModel = {
            testContext
            , sutName
            , testName
            , givens: givens.map(step => toViewModel(step.step))
            , when: toViewModel(when)
            , then: toViewModel(then)
        }

        await navigate('/test-explorer', { state: { newTest: viewModel } })
        // console.log(response);
    };
    return (
        <div className="test-recorder">

            <div className="given">
                <Givens onStepSelectionChange={updateGivens} steps={givens} />
            </div >

            <div className="when">
                <When onStepSelection={updateWhen} step={when} />
            </div>

            <div className="then">
                <Then onStepSelection={updateThen} step={then} />
            </div>
            {then &&
                <div className="test-form-details">
                    <label className="test-context-label">Test Context:</label>
                    <input type='text' className="test-context-input" value={testContext} onChange={x => recordTestContext(x.target.value)} placeholder="Test Context" />

                    <label className="sut-label">SUT:</label>
                    <input type='text' className="sut-input" value={sutName} onChange={x => recordSutName(x.target.value)} placeholder="Sut Name" />

                    <button className='save-button' onClick={saveAndRedirectToExplorer}>Save</button>

                    <label className="test-name-label">Test Name:</label>
                    <input type='text' className="test-name-input" value={testName} onChange={x => recordTestName(x.target.value)} placeholder="Test Name" />
                </div>
            }

        </div>
    );
}

export default TestRecorder


//----------------------
