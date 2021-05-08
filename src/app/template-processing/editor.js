/* eslint-disable no-undef */
import { ExternalServices } from '../../external-services'
import { getLanguageForExtension } from './monaco-languages'
import { defaultTestSpec } from './default-test-spec'
import { applyIntellisense } from './intellisense'
window.setupEditor = async () => {
    window.MonacoEnvironment = { getWorkerUrl: () => proxy };
    let proxy = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
        baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min'
    };
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/base/worker/workerMain.min.js');
`], { type: 'text/javascript' }));

    window.closeModal = ExternalServices.boardService.closeModal


    function showNotification(message) {
        ExternalServices.boardService.showNotification(message)
    }

    // let templateContent = ""
    let editor//: monaco.editor.IStandaloneCodeEditor
    let previewEditor
    const originalTemplateName = getParameterByName("templateName")
    document.getElementById("templateName").value = originalTemplateName





    window.save = async function () {
        const template = {
            templateName: document.getElementById("templateName").value,
            contentTemplate: editor.getValue(),
            fileNameTemplate: document.getElementById('fileNameTemplate').value,
            fileExtension: document.getElementById('fileExtension').value,
        }
        await ExternalServices.templateRepository
            .createOrReplaceTemplate(originalTemplateName, template)
        await showNotification(`${template.templateName} saved.`)
        window.closeModal()
    }

    // var repository=require("templateRepository").getTemplateRepository()
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }



    function createEditor(editorElement, templateContent) {

        return monaco.editor.create(editorElement, {
            value: templateContent,
            language: 'handlebars',
            // theme: 'vs-dark',
            // theme: 'monokai',
            lineHeight: 20,
            fontSize: 14,
            // wordWrap: "bounded",
            automaticLayout: true,
            wrappingIndent: 'indent',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            formatOnType: true//!important
        });
        // editor.trigger(A string to insert into the editor, 'editor.action.formatDocument'); 
    }
    function createPreviewEditor(editorElement) {
        return monaco.editor.createDiffEditor(editorElement, {
            enableSplitViewResizing: true,
            renderSideBySide: true,
            // value: templateContent,
            language: 'handlebars',
            // theme: 'vs-dark',
            // theme: 'monokai',
            lineHeight: 20,
            fontSize: 14,
            // wordWrap: "bounded",
            automaticLayout: true,
            // wrappingIndent: 'indent',
            // minimap: { enabled: false },
            scrollBeyondLastLine: false,
            // overviewRulerLanes: 0,
            formatOnType: true//!important
        });
    }

    function showError(err, position) {

        const newMarker = {
            startLineNumber: err.startLineNumber ?? position.lineNumber,
            endLineNumber: err.endLineNumber ?? position.lineNumber + 1,
            startColumn: err.startColumn,
            endColumn: err.endColumn,
            message: err.message,
            severity: monaco.MarkerSeverity.Error
        }
        monaco.editor.setModelMarkers(editorModel, null, [newMarker]);
    }
    function clearErrors() {
        monaco.editor.setModelMarkers(editorModel, null, [])
    }

    //Preview:

    // let preview
    // (async function () {
    let sampleTestSpec = await ExternalServices.tempSharedStorage.getItem('sample-test-spec')
    await ExternalServices.tempSharedStorage.removeItem('sample-test-spec')
    if (!sampleTestSpec)
        sampleTestSpec = defaultTestSpec
    let preview = async function (fileExtension, editorModel) {

        const template = editor.getValue()
        const language = getLanguageForExtension(fileExtension)
        const expectedCodeModel = monaco.editor.createModel(previewEditor.getModifiedEditor().getValue(), language);
        let compiledCode = ""

        try {
            compiledCode = ExternalServices.templateCompiler.compileTemplate(template, sampleTestSpec)
            clearErrors()
        }
        catch (err) {
            showError(err, editor.getPosition())
        }
        const compiledCodeModel = monaco.editor.createModel(compiledCode, language);
        previewEditor.setModel({ original: compiledCodeModel, modified: expectedCodeModel });
        applyIntellisense(language)

    }
    // })()

    //Preview pane visibility:
    function showPreview() {
        document.getElementById('preview-editor').style.display = 'block'
        document.getElementById('monaco-editor').style.width = '40%'
        document.getElementById('preview-button').textContent = 'Hide Preview'
    }
    function hidePreview() {
        document.getElementById('preview-editor').style.display = 'none'
        document.getElementById('monaco-editor').style.width = '100%'
        document.getElementById('preview-button').textContent = 'Show Preview'

    }
    window.togglePreview = function () {
        let isPreviewOpen = document.getElementById('preview-button').textContent == 'Hide Preview'
        if (isPreviewOpen) {
            hidePreview()
        } else {
            showPreview()
        }
    }
    showPreview()
    //eof preview

    window.editorMain = async function () {
        let templateContent = undefined;
        if (originalTemplateName) {
            const template = await ExternalServices.templateRepository
                .getTemplateByName(originalTemplateName)
            document.getElementById('fileNameTemplate').value = template.fileNameTemplate
            document.getElementById('fileExtension').value = template.fileExtension
            templateContent = template.contentTemplate
        }

        editor = createEditor(document.getElementById('monaco-editor'), templateContent)
        previewEditor = createPreviewEditor(document.getElementById('preview-editor'))

        await detectLanguageForExtension()
        editor.onDidChangeModelContent(async function () {
            await preview(document.getElementById("fileExtension").value, editorModel)
        })

        // monaco.languages.typescript.typescriptDefaults.addExtraLib(
        //     'export declare function add(a: number, b: number): number', 
        //     'file:///monaco.d.ts');
        toggleTheme()
    }

    var editorModel
    //Language:
    async function detectLanguageForExtension() {
        const language = getLanguageForExtension(document.getElementById("fileExtension").value)
        const template = editor.getValue()
        editorModel = monaco.editor.createModel(template, language)
        editor.setModel(editorModel)
        await preview(document.getElementById("fileExtension").value, editorModel)
    }
    window.detectLanguageForExtension = detectLanguageForExtension




    //Theme:
    function toggleTheme() {
        const wasDark = document.getElementsByTagName('body')[0]
            .classList.contains('dark-body')

        if (wasDark) {
            monaco.editor.setTheme('monokai')
            document.getElementById('theme-button').textContent = 'Darken'
        } else {
            monaco.editor.setTheme('vs-dark')
            document.getElementById('theme-button').textContent = 'Lighten'
        }
        const oldClassPrefix = wasDark ? 'dark' : 'light';
        const newClassPrefix = wasDark ? 'light' : 'dark';

        function changeClass(
            {
                elements,
                classPostfix
            }) {
            const getClassName = (prefix, postfix) => `${prefix}-${postfix}`;

            const oldClassName = getClassName(oldClassPrefix, classPostfix)
                , newClassName = getClassName(newClassPrefix, classPostfix);

            for (var i = elements.length - 1; i > -1; i--) {
                const element = elements[i];

                element.classList.remove(oldClassName)
                element.classList.add(newClassName)

            }
        }

        changeClass({
            elements: document.getElementsByTagName('body'),
            classPostfix: 'body'
        })
        changeClass({
            elements: document.getElementsByTagName('input'),
            classPostfix: 'text-input'
        })
        changeClass({
            elements: document.getElementsByTagName('button'),
            classPostfix: 'button'
        })
    }
    window.toggleTheme = toggleTheme



}