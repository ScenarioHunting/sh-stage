import { singletonBoard } from '../global-dependency-container';
import * as React from 'react';
import { Givens, IndexedStep } from './given-collection';
import { WhenStep as When } from './when-step';
import { ThenStep as Then } from './then-step';
import { navigate } from "@reach/router"
import { ExampleWidget, SelectedWidget } from 'board';
import { Save, LocalTestCreationResult } from './test-recorder-http-service';
import { singletonStepNavigator } from './local-dependency-container';
import { getTemplateRepository } from '../template-processing/template-repository';
import { useEffect, useState } from 'react';
import { SelectableText } from '../selectable-text/selectable-text';
import './test-recorder.less'
import { TestStepTurn } from './test-step-turn';
export type StepInfo = {
    type: string
    widget: ExampleWidget
}
export type ViewModel = {
    givens: StepInfo[]
    when: StepInfo
    then: StepInfo
    testName: string
    testContext: string
    sutName: string
}
export const createTestRecorder = (board = singletonBoard
    , stepNavigator = singletonStepNavigator
    , save = Save): React.FC<any> => () => {
        if (!board) {
            //TODO: Implement guard
        }

        const [givens, recordGiven] = useState<IndexedStep[]>([]);
        const [when, recordWhen] = useState<SelectedWidget>();
        const [then, recordThen] = useState<SelectedWidget>();
        const [scenario, recordScenario] = useState<string>("");
        const [context, recordContext] = useState<string>("");
        const [subject, recordSubject] = useState<string>("");
        const [selectedTemplateName, selectTemplateName] = useState<string>("no template");
        const [availableTemplateNames, setAvailableTemplateNames] = useState<string[]>([]);


        function getRequiredErrorsFor(str: string): string[] {
            if (str.trim() == "")
                return ["Required!"]
            return []
        }
        function getMaxLengthErrorsFor(str: string, maxLen: 50): string[] {
            if (str.length > maxLen)
                return ["Too long!"]
            return []
        }
        useEffect(() => {
            board.unselectAll()
                .then(stepNavigator.start);
            getTemplateRepository().then(repo => {
                repo.getAllTemplateNames().then(x => {
                    setAvailableTemplateNames(x)
                    selectTemplateName(x[0])
                }).catch(e => { throw e })
            })
        }, [])



        const notifyValidationError = (errorText: string) => {
            board.showNotification(errorText)
        }

        function validateContext(context: string): string[] {
            return [
                getRequiredErrorsFor(context),
                getMaxLengthErrorsFor(context, 50)
            ].flat()

        }
        function changeContext(context: string) {
            validateContext(context)
            recordContext(context)
        }



        function validateScenario(scenario: string): string[] {
            return [
                getRequiredErrorsFor(scenario),
                getMaxLengthErrorsFor(scenario, 50)
            ].flat()
        }
        function changeScenario(scenario: string) {
            validateScenario(scenario)
            recordScenario(scenario)
        }


        function validateSubject(subject: string): string[] {
            return [
                getRequiredErrorsFor(subject),
                getMaxLengthErrorsFor(subject, 50)
            ].flat()
        }
        function changeSubject(subject: string) {
            validateSubject(subject)
            recordSubject(subject)
        }


        function validateWhen(): boolean {
            if (!when) {
                notifyValidationError('No when selections. Please save the test after selecting the when step.')
                return false
            }
            return true
        }
        function validateThen(): boolean {
            if (!then) {
                notifyValidationError('No then selections. Please save the test after selecting the then step.')
                return true
            }
            return true
        }
        const forceUpdate = React.useReducer((bool) => !bool, true)[1];
        const saveAndRedirectToExplorer = async () => {
            var isFormValid = validateScenario(scenario)
                && validateContext(context)
                && validateSubject(subject)
                && validateThen()
                && validateWhen()
            forceUpdate()
            if (!isFormValid)
                return

            try {
                await save(selectedTemplateName, {
                    testContext: context,
                    testName: scenario,
                    sutName: subject,

                    givens,
                    when,
                    then
                } as LocalTestCreationResult)
                board.showNotification('Test created successfully.')
            } catch {
                board.showNotification('Test creation error try again later.\n')
            }

            const toViewModel = (step: SelectedWidget): StepInfo => {
                return {
                    type: step.widgetData.type,
                    widget: step.widgetSnapshot
                }
            }
            if (!when || !then) return
            var viewModel: ViewModel = {
                testContext: context
                , sutName: subject
                , testName: scenario
                , givens: givens.map(step => toViewModel(step.step))
                , when: toViewModel(when)
                , then: toViewModel(then)
            }

            await navigate('/test-explorer', { state: { newTest: viewModel } })
        };

        return (
            <div className="test-recorder">
                <Givens onStepSelectionChange={recordGiven} steps={givens} />
                <When onStepSelection={recordWhen} step={when} />
                <Then onStepSelection={recordThen} step={then} />
                {//when && then &&
                    <div className="test-form-details">

                        <SelectableText
                            turn={TestStepTurn.Subject}
                            title="Subject"
                            placeholder="Subject Under Test"

                            value={scenario}
                            className={"subject-input"}
                            onChange={x => changeSubject(x)}
                            validate={validateSubject}
                        />
                        <SelectableText
                            turn={TestStepTurn.Context}
                            title="Context"
                            placeholder="Context"

                            value={context}
                            className={"test-context-input"}
                            onChange={x => changeContext(x)}
                            validate={validateContext}
                        />
                        <SelectableText
                            turn={TestStepTurn.Scenario}
                            title="Scenario"
                            placeholder="Scenario"

                            value={scenario}
                            className={"scenario-input"}
                            onChange={x => changeScenario(x)}
                            validate={validateScenario}
                        />



                        <div className="full-width input-group miro-input-group miro-input-group--small">
                            <select className="miro-select miro-select--secondary-bordered miro-select--small" value={selectedTemplateName}
                                onChange={(e) => selectTemplateName(e.target.value)}>
                                {availableTemplateNames.map((templateName) => (
                                    <option key={templateName} value={templateName}>
                                        {templateName}
                                    </option>
                                ))}
                            </select>
                            <button
                                className='miro-btn miro-btn--primary miro-btn--small'
                                onClick={saveAndRedirectToExplorer}
                                // disabled={[errors].flat().length > 0}
                            >Save</button>
                        </div>
                    </div>
                }

            </div>
        );
    }


export let TestRecorder = createTestRecorder()
