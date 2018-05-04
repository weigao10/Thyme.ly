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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./react-client/src/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./react-client/src/index.jsx":
/*!************************************!*\
  !*** ./react-client/src/index.jsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: SyntaxError: /Users/brianlee/productivity-manager/.babelrc: Error while parsing JSON - Bad identifier as unquoted key at line 2 column 1 of the JSON5 data. Still to read: \\\"<<<<<<< HEAD\\\\n“preset\\\"\\n    at error (/Users/brianlee/productivity-manager/node_modules/json5/lib/json5.js:56:25)\\n    at identifier (/Users/brianlee/productivity-manager/node_modules/json5/lib/json5.js:112:17)\\n    at object (/Users/brianlee/productivity-manager/node_modules/json5/lib/json5.js:454:31)\\n    at value (/Users/brianlee/productivity-manager/node_modules/json5/lib/json5.js:482:20)\\n    at Object.parse (/Users/brianlee/productivity-manager/node_modules/json5/lib/json5.js:508:18)\\n    at ConfigChainBuilder.addConfig (/Users/brianlee/productivity-manager/node_modules/babel-core/lib/transformation/file/options/build-config-chain.js:150:65)\\n    at ConfigChainBuilder.findConfigs (/Users/brianlee/productivity-manager/node_modules/babel-core/lib/transformation/file/options/build-config-chain.js:96:16)\\n    at buildConfigChain (/Users/brianlee/productivity-manager/node_modules/babel-core/lib/transformation/file/options/build-config-chain.js:61:13)\\n    at OptionManager.init (/Users/brianlee/productivity-manager/node_modules/babel-core/lib/transformation/file/options/option-manager.js:354:58)\\n    at File.initOptions (/Users/brianlee/productivity-manager/node_modules/babel-core/lib/transformation/file/index.js:212:65)\\n    at new File (/Users/brianlee/productivity-manager/node_modules/babel-core/lib/transformation/file/index.js:135:24)\\n    at Pipeline.transform (/Users/brianlee/productivity-manager/node_modules/babel-core/lib/transformation/pipeline.js:46:16)\\n    at transpile (/Users/brianlee/productivity-manager/node_modules/babel-loader/lib/index.js:50:20)\\n    at Object.module.exports (/Users/brianlee/productivity-manager/node_modules/babel-loader/lib/index.js:173:20)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWFjdC1jbGllbnQvc3JjL2luZGV4LmpzeC5qcyIsInNvdXJjZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./react-client/src/index.jsx\n");

/***/ })

/******/ });