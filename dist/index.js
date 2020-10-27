/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.ts":
/*!**********************!*\
  !*** ./src/board.ts ***!
  \**********************/
/*! exports provided: Board */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Board\", function() { return Board; });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nclass Board {\n    constructor() {\n        this.unselectAll = () => miro.board.selection.clear();\n        this.showNotification = (message) => miro.showNotification(message);\n        this.zoomTo = (widget) => miro.board.viewport.zoomToObject(widget.id, true);\n        // static async captureSingleItemSelections(widgets, succeed, fail) {\n        //     // miro.board.widgets.sel\n        // }\n    }\n    openModal(modalAddress) {\n        miro.board.ui.openModal(modalAddress, { width: 50, height: 50 });\n        throw new Error(\"Method not implemented.\");\n    }\n    // eslint-disable-next-line no-unused-vars\n    interceptPossibleTextEdit(updateText) {\n        const select = (selections) => __awaiter(this, void 0, void 0, function* () {\n            var widgets = selections.data;\n            if (!this.previouslySelectedWidgets) {\n                this.previouslySelectedWidgets = widgets;\n            }\n            this.previouslySelectedWidgets.forEach((item) => __awaiter(this, void 0, void 0, function* () {\n                var widget = (yield miro.board.widgets.get({ id: item.id }))[0];\n                const originalWidgetText = getWidgetText(widget);\n                if (typeof originalWidgetText != 'boolean') {\n                    const newText = yield updateText(widget.id, originalWidgetText);\n                    if (newText != originalWidgetText && setWidgetText(widget, newText))\n                        yield miro.board.widgets.update([widget]);\n                }\n            }));\n            this.previouslySelectedWidgets = widgets;\n        });\n        miro.addListener(\"SELECTION_UPDATED\", select);\n    }\n    // eslint-disable-next-line no-unused-vars\n    onNextSingleSelection(succeed) {\n        //TODO: Guard \n        console.log(\"Waiting for the next single selection!\");\n        const select = (selections) => __awaiter(this, void 0, void 0, function* () {\n            var widgets = selections.data;\n            if (widgets.length == 0)\n                return;\n            console.log(\"Selected.\");\n            if (widgets.length > 1) {\n                console.log(`${widgets.length} items are selected. Only a single one can be selected.`);\n                return;\n            }\n            console.log(\"Getting the widget.\");\n            var widget = (yield miro.board.widgets.get({ id: widgets[0].id }))[0];\n            console.log(\"Converting the widget\");\n            const dto = convertToDto(widget);\n            if (typeof dto == 'string')\n                console.log(dto);\n            else {\n                console.log(dto);\n                succeed(dto);\n                miro.removeListener(\"SELECTION_UPDATED\", select);\n            }\n        });\n        return miro.addListener(\"SELECTION_UPDATED\", select);\n    }\n}\nfunction convertToDto(widget) {\n    var dto = {\n        id: widget.id,\n        type: widget.type,\n    };\n    console.log('Selection dto initiated.', dto);\n    //TODO: Refactor this:\n    if (\"x\" in widget && \"y\" in widget) {\n        dto.x = widget[\"x\"];\n        dto.y = widget[\"y\"];\n    }\n    else\n        return 'The widget ' + JSON.stringify(widget) + ' is does not have x, and y.';\n    dto.style = {};\n    if (widget[\"style\"] && widget[\"style\"][\"backgroundColor\"]) {\n        console.log('Setting style:', widget[\"style\"][\"backgroundColor\"]);\n        dto.style.backgroundColor = widget[\"style\"][\"backgroundColor\"];\n    }\n    else if (widget[\"style\"] && widget[\"style\"][\"stickerBackgroundColor\"]) {\n        console.log('Setting style:', widget[\"style\"][\"stickerBackgroundColor\"]);\n        dto.style.backgroundColor = widget[\"style\"][\"stickerBackgroundColor\"];\n    }\n    // if (\"plainText\" in widget)\n    //     dto.text = widget[\"plainText\"]\n    // else \n    const widgetText = getWidgetText(widget);\n    if (typeof widgetText == 'boolean') {\n        if (!widgetText)\n            return 'The widget ' + JSON.stringify(widget) + ' does not have any text.';\n    }\n    else\n        dto.text = widgetText;\n    dto.text = dto.text\n        .split('</p><p>').join('\\n')\n        .replace('<p>', '')\n        .replace('</p>', '')\n        .replace('&#43;', '+');\n    console.log('Widget text converted by board.:', dto.text);\n    return dto;\n}\nfunction getWidgetText(widget) {\n    if (\"text\" in widget)\n        return widget[\"text\"];\n    else if (\"captions\" in widget)\n        return widget[\"captions\"][0][\"text\"];\n    else\n        return false;\n}\nfunction setWidgetText(widget, text) {\n    const anyWidget = widget;\n    if (\"text\" in widget)\n        anyWidget[\"text\"] = text;\n    else if (\"captions\" in widget)\n        anyWidget[\"captions\"][0][\"text\"] = text;\n    else\n        return false;\n    return anyWidget;\n}\n\n\n//# sourceURL=webpack:///./src/board.ts?");

/***/ }),

/***/ "./src/global-dependency-container.ts":
/*!********************************************!*\
  !*** ./src/global-dependency-container.ts ***!
  \********************************************/
/*! exports provided: singletonBoard, testResultReports */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"singletonBoard\", function() { return singletonBoard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"testResultReports\", function() { return testResultReports; });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.ts\");\n/* harmony import */ var _test_result_reports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test-result-reports */ \"./src/test-result-reports.ts\");\n\n\nlet singletonBoard = new _board__WEBPACK_IMPORTED_MODULE_0__[\"Board\"]();\nlet testResultReports = new _test_result_reports__WEBPACK_IMPORTED_MODULE_1__[\"TestResultReports\"]();\n\n\n//# sourceURL=webpack:///./src/global-dependency-container.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _global_dependency_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global-dependency-container */ \"./src/global-dependency-container.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n/* eslint-disable no-undef */\nconst icon24 = '<path fill=\"currentColor\" fill-rule=\"nonzero\" d=\"M20.156 7.762c-1.351-3.746-4.672-5.297-8.838-4.61-3.9.642-7.284 3.15-7.9 5.736-1.14 4.784-.015 7.031 2.627 8.09.61.244 1.28.412 2.002.518.277.041.549.072.844.097.138.012.576.045.659.053.109.01.198.02.291.035 1.609.263 2.664 1.334 3.146 2.715 7.24-2.435 9.4-6.453 7.17-12.634zm-18.684.662C3.18 1.256 18.297-3.284 22.038 7.084c2.806 7.78-.526 13.011-9.998 15.695-.266.076-.78.173-.759-.287.062-1.296-.47-2.626-1.762-2.837-1.009-.165-10.75.124-8.047-11.23zm9.427 4.113a6.853 6.853 0 0 0 1.787.172c.223.348.442.733.79 1.366.53.967.793 1.412 1.206 2a1 1 0 1 0 1.636-1.15c-.358-.51-.593-.908-1.09-1.812-.197-.36-.358-.649-.503-.899 1.16-.573 1.916-1.605 2.005-2.909.189-2.748-2.65-4.308-6.611-3.267-.443.117-.834.44-.886 1.408-.065 1.192-.12 2.028-.25 3.825-.129 1.808-.185 2.653-.25 3.86a1 1 0 0 0 1.997.108c.05-.913.093-1.617.17-2.702zm.144-2.026c.077-1.106.124-1.82.171-2.675 2.398-.483 3.595.257 3.521 1.332-.08 1.174-1.506 1.965-3.692 1.343z\"/>';\nconst underlineIcon = '<line x1=\"22\" y1=\"22\" x2=\"00\" y2=\"22\" stroke=\"currentColor\" stroke-width=\"2\"></line>';\nfunction underline(widgets) {\n    return __awaiter(this, void 0, void 0, function* () {\n        //let result = await miro.board.selection.get();\n        let result = widgets;\n        var textEdit = (yield miro.board.widgets.get({ id: result[0].id }))[0]['text'];\n        // if (textEdit.includes(\"<u>\")) {\n        textEdit = textEdit.replace(\"<u>\", \"\").replace(\"</u>\", \"\");\n        // } else {\n        // textEdit = textEdit \n        // textEdit = \"<input type='text' placeholder='\" + textEdit + \"'></input>\"\n        // }\n        miro.board.widgets.update({\n            id: result[0]['id'],\n            text: textEdit\n        });\n    });\n}\nmiro.onReady(() => __awaiter(void 0, void 0, void 0, function* () {\n    yield _global_dependency_container__WEBPACK_IMPORTED_MODULE_0__[\"singletonBoard\"].interceptPossibleTextEdit((widgetId, theOriginalText) => __awaiter(void 0, void 0, void 0, function* () {\n        var reportViewModel = yield _global_dependency_container__WEBPACK_IMPORTED_MODULE_0__[\"testResultReports\"].getTestSummeryForWidget(widgetId);\n        console.log(\"report: \", reportViewModel);\n        if (typeof reportViewModel == 'boolean')\n            return theOriginalText;\n        var reportComponent = \"<div id='test-summery'>\" +\n            \"<span style='background-color:red'>\" + reportViewModel.Failed + \"</span>\" +\n            \"<span style='background-color:green'>\" + reportViewModel.Passed + \"</span>\" +\n            \"<span style='background-color:yellow'>\" + reportViewModel.Skipped + \"</span>\" +\n            \"<span style='background-color:lightblue'>\" + reportViewModel.Pending + \"</span>\" +\n            \"</div>\";\n        var regex = new RegExp(\"<div id='test-summery'>(.*)</div>\");\n        const isAnyReportsAlreadyViewed = regex.test(theOriginalText);\n        if (isAnyReportsAlreadyViewed)\n            return theOriginalText.replace(regex, reportComponent);\n        return theOriginalText + reportComponent;\n    }));\n    // await miro.addListener(\"SELECTION_UPDATED\", async x => {\n    // \tif (!x\n    // \t\t|| !x.data\n    // \t\t|| x.data.length != 1\n    // \t\t|| !x.data[0]\n    // \t\t|| !x.data[0].metadata\n    // \t\t|| !x.data[0].metadata[\"3074457349056199734\"]\n    // \t\t|| !x.data[0].metadata[\"3074457349056199734\"].testSummery\n    // \t\t|| !(x.data[0].metadata[\"3074457349056199734\"].testSummery as WhenTestResultsSummeryViewModel))\n    // \t\treturn;\n    // \tconst vm = (x.data[0].metadata[\"3074457349056199734\"].testSummery as WhenTestResultsSummeryViewModel);\n    // \tconst widgetId = x.data[0].id\n    // \tconsole.log(\"x.data[0]: \", x.data[0])\n    // \tconst widget = (await miro.board.widgets.get({ id: widgetId }))[0] as any//TODO: map it\n    // \tconsole.log(\"widget: \", widget)\n    // \t//vm.metadata[\"3074457349056199734\"].testSummery.failed\n    // \tvar strReportSummery = \"<div id='test-summery'>\" +\n    // \t\t\"<span style='background-color:red'>\" + vm.Failed + \"</span>\" +\n    // \t\t\"<span style='background-color:green'>\" + vm.Passed + \"</span>\" +\n    // \t\t\"<span style='background-color:yellow'>\" + vm.Skipped + \"</span>\" +\n    // \t\t\"<span style='background-color:lightblue'>\" + vm.Pending + \"</span>\" +\n    // \t\t\"</div>\"\n    // \tvar regex = new RegExp(\"<div id='test-summery'>(.*)<\\/div>\")\n    // \t//TODO: map the widget into a local struct so that text vs plain text vs value,.. does not tie the app to the board\n    // \tif (regex.test(widget.text)) {\n    // \t\twidget.text = widget.text.replace(regex, strReportSummery)\n    // \t}\n    // \telse {\n    // \t\twidget.text += strReportSummery\n    // \t}\n    // \tdelete widget.metadata\n    // \tawait miro.board.widgets.update([widget])\n    // \t//\"<span style='background-color:red'> ccc </span>\"\n    // \t// \"<div id='test-summery'><span style='background-color:red'>1</span><span style='background-color:green'>1</span><span style='background-color:yellow'>1</span><span style='background-color:lightblue'>1</span></div>\".replace( new RegExp(\"<div id='test-summery'>(.*)<\\/div>\"),\"<div id='test-summery'><span style='background-color:red'>1</span><span style='background-color:green'>1</span><span style='background-color:yellow'>1</span><span style='background-color:lightblue'>9</span></div>\")\n    // \t// w.text = w.text.replace(\"<div id='test-summery'>.*<\\/div>\",\"<div id='test-summery'><span style='background-color:red'>1</span><span style='background-color:green'>1</span><span style='background-color:yellow'>2</span><span style='background-color:lightblue'>1</span></div>\")\n    // \t//new RegExp(\"<div id='test-summery'>(.*)<\\/div>\").exec(\"<div id='test-summery'><span style='background-color:red'>1</span><span style='background-color:green'>1</span><span style='background-color:yellow'>1</span><span style='background-color:lightblue'>9</span></div>\")[0]\n    // \t// \"<div id='test-summery'><span style='background-color:red'>1</span><span style='background-color:green'>1</span><span style='background-color:yellow'>1</span><span style='background-color:lightblue'>9</span></div>\"\n    // \t//delete vm.metadata\n    // \t// miro.board.widgets.update([vm])\n    // })\n    yield miro.initialize({\n        extensionPoints: {\n            getWidgetMenuItems: (widgets /*, editMode: boolean*/) => {\n                const supportedWidgetsInSelection = widgets;\n                // .filter((widget) => Config.supported_widgets[widget.type.toLowerCase()] \n                // \t\t\t\t\t\t\t\t\t!== undefined);\n                // All selected widgets have to be supported in order to show the menu\n                if (supportedWidgetsInSelection.length == widgets.length) {\n                    return Promise.resolve([{\n                            tooltip: 'Exercise SUT',\n                            svgIcon: underlineIcon,\n                            onClick: () => {\n                                // miro.board.ui.openLeftSidebar('sidebar.html')\n                                underline(widgets);\n                                // handleAuthAndOpenWindow(openEstimateModal, widgets);\n                            }\n                        }]);\n                }\n                // Not all selected widgets are supported, we won't show the menu\n                return Promise.resolve([{}]);\n            },\n            // exportMenu: {\n            // \ttitle: 'Boilerplate export',\n            // \tsvgIcon: icon24,\n            // \tonClick: () => {\n            // \t\t// Remember that 'modal.html' resolves relative to main.js file. So modal.html have to be in the /dist/ folder.\n            // \t\tmiro.board.ui.openModal('modal.html')\n            // \t}\n            // },\n            bottomBar: {\n                title: 'Boilerplate bottomBar',\n                svgIcon: icon24,\n                onClick: () => {\n                    miro.board.ui.openLeftSidebar('sidebar.html');\n                }\n            }\n        }\n    });\n}));\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/test-result-reports.ts":
/*!************************************!*\
  !*** ./src/test-result-reports.ts ***!
  \************************************/
/*! exports provided: TestResultReports */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TestResultReports\", function() { return TestResultReports; });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nclass TestResultReports {\n    constructor() {\n        this.getTestSummeryForWidget = (widgetId) => __awaiter(this, void 0, void 0, function* () {\n            const widget = (yield miro.board.widgets.get({ id: widgetId }))[0];\n            if (!widget\n                || !widget.metadata[\"3074457349056199734\"]\n                || !widget.metadata[\"3074457349056199734\"].testSummery\n                || !widget.metadata[\"3074457349056199734\"].testSummery) {\n                return false;\n            }\n            return widget.metadata[\"3074457349056199734\"].testSummery;\n        });\n    }\n}\n\n\n//# sourceURL=webpack:///./src/test-result-reports.ts?");

/***/ })

/******/ });