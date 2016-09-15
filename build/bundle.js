/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "3dcce2daf4082f2d913f"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/pong/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _Game = __webpack_require__(1);\n\nvar _Game2 = _interopRequireDefault(_Game);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar css = __webpack_require__(7);\n\n\n//calling the game class\nvar game = new _Game2.default();\n\nvar fps = 30;\n\nfunction gameLoop() {\n\tsetTimeout(window.requestAnimationFrame(gameLoop), fps);\n\tgame.render();\n}\n\ngameLoop();//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBOzs7Ozs7QUFEQSxJQUFNLE1BQU0sb0JBQVEsQ0FBUixDQUFaOzs7QUFHQTtBQUNBLElBQU0sT0FBTyxvQkFBYjs7QUFFQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxTQUFTLFFBQVQsR0FBb0I7QUFDbkIsWUFBVyxPQUFPLHFCQUFQLENBQTZCLFFBQTdCLENBQVgsRUFBbUQsR0FBbkQ7QUFDQSxNQUFLLE1BQUw7QUFDQTs7QUFFRCIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY3NzID0gcmVxdWlyZSgnLi9nYW1lLmNzcycpO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcblxuLy9jYWxsaW5nIHRoZSBnYW1lIGNsYXNzXG5jb25zdCBnYW1lID0gbmV3IEdhbWUoKTtcblxuY29uc3QgZnBzID0gMzA7XG5cbmZ1bmN0aW9uIGdhbWVMb29wKCkge1xuXHRzZXRUaW1lb3V0KHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApLCBmcHMpO1xuXHRnYW1lLnJlbmRlcigpO1xufVxuXG5nYW1lTG9vcCgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n//Import classes from other files\n\n\nvar _Paddle = __webpack_require__(2);\n\nvar _Paddle2 = _interopRequireDefault(_Paddle);\n\nvar _Board = __webpack_require__(3);\n\nvar _Board2 = _interopRequireDefault(_Board);\n\nvar _Ball = __webpack_require__(4);\n\nvar _Ball2 = _interopRequireDefault(_Ball);\n\nvar _ScoreBoard = __webpack_require__(5);\n\nvar _ScoreBoard2 = _interopRequireDefault(_ScoreBoard);\n\nvar _Settings = __webpack_require__(6);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Game = function () {\n\tfunction Game() {\n\t\t_classCallCheck(this, Game);\n\n\t\tvar canvas = document.getElementById('game');\n\t\t//setting the canvas structure\n\t\tthis.width = canvas.width;\n\t\tthis.height = canvas.height;\n\t\tthis.ctx = canvas.getContext('2d');\n\t\tthis.ctx.fillStyle = 'white';\n\t\t//game objects\n\t\tthis.board = new _Board2.default(this.width, this.height);\n\t\tthis.player1 = new _Paddle2.default(this.height, _Settings.gap, _Settings.p1Keys);\n\t\tthis.player2 = new _Paddle2.default(this.height, this.width - 5 - _Settings.gap, _Settings.p2Keys);\n\t\tthis.ball1 = new _Ball2.default(this.height, this.width, _Settings.start, this);\n\t\tthis.leftScore = new _ScoreBoard2.default(this.width / 4 + 20, 30, 0);\n\t\tthis.rightScore = new _ScoreBoard2.default(this.width / 4 + 120, 30, 0);\n\t}\n\n\t_createClass(Game, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tthis.board.render(this.ctx);\n\t\t\tthis.player1.render(this.ctx);\n\t\t\tthis.player2.render(this.ctx);\n\t\t\tthis.ball1.render(this.ctx, this.player1, this.player2);\n\t\t\tthis.leftScore.render(this.ctx);\n\t\t\tthis.rightScore.render(this.ctx);\n\t\t}\n\t}]);\n\n\treturn Game;\n}();\n\nexports.default = Game;\n;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvR2FtZS5qcz82ZjI0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBR3NCLEk7QUFDckIsaUJBQWM7QUFBQTs7QUFDYixNQUFNLFNBQVMsU0FBUyxjQUFULENBQXdCLE1BQXhCLENBQWY7QUFDQTtBQUNBLE9BQUssS0FBTCxHQUFhLE9BQU8sS0FBcEI7QUFDQSxPQUFLLE1BQUwsR0FBYyxPQUFPLE1BQXJCO0FBQ0EsT0FBSyxHQUFMLEdBQVcsT0FBTyxVQUFQLENBQWtCLElBQWxCLENBQVg7QUFDQSxPQUFLLEdBQUwsQ0FBUyxTQUFULEdBQXFCLE9BQXJCO0FBQ0E7QUFDQSxPQUFLLEtBQUwsR0FBYSxvQkFBVSxLQUFLLEtBQWYsRUFBc0IsS0FBSyxNQUEzQixDQUFiO0FBQ0EsT0FBSyxPQUFMLEdBQWUscUJBQVcsS0FBSyxNQUFoQixrQ0FBZjtBQUNBLE9BQUssT0FBTCxHQUFlLHFCQUFXLEtBQUssTUFBaEIsRUFBd0IsS0FBSyxLQUFMLEdBQWEsQ0FBYixnQkFBeEIsbUJBQWY7QUFDQSxPQUFLLEtBQUwsR0FBYSxtQkFBUyxLQUFLLE1BQWQsRUFBc0IsS0FBSyxLQUEzQixtQkFBeUMsSUFBekMsQ0FBYjtBQUNBLE9BQUssU0FBTCxHQUFpQix5QkFBZSxLQUFLLEtBQUwsR0FBVyxDQUFYLEdBQWUsRUFBOUIsRUFBbUMsRUFBbkMsRUFBdUMsQ0FBdkMsQ0FBakI7QUFDQSxPQUFLLFVBQUwsR0FBa0IseUJBQWUsS0FBSyxLQUFMLEdBQVcsQ0FBWCxHQUFlLEdBQTlCLEVBQW1DLEVBQW5DLEVBQXVDLENBQXZDLENBQWxCO0FBQ0E7Ozs7MkJBQ1M7QUFDUCxRQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQUssR0FBdkI7QUFDQSxRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQUssR0FBekI7QUFDQSxRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQUssR0FBekI7QUFDQSxRQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQUssR0FBdkIsRUFBNEIsS0FBSyxPQUFqQyxFQUEwQyxLQUFLLE9BQS9DO0FBQ0EsUUFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixLQUFLLEdBQTNCO0FBQ0EsUUFBSyxVQUFMLENBQWdCLE1BQWhCLENBQXVCLEtBQUssR0FBNUI7QUFDQTs7Ozs7O2tCQXZCa0IsSTtBQXdCckIiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcbi8vSW1wb3J0IGNsYXNzZXMgZnJvbSBvdGhlciBmaWxlc1xuaW1wb3J0IFBhZGRsZSBmcm9tICcuL1BhZGRsZSc7XG5pbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZCc7XG5pbXBvcnQgQmFsbCBmcm9tICcuL0JhbGwnO1xuaW1wb3J0IFNjb3JlQm9hcmQgZnJvbSAnLi9TY29yZUJvYXJkJztcbmltcG9ydCB7IGdhcCwgcDFLZXlzLCBwMktleXMsIHN0YXJ0fSBmcm9tICcuL1NldHRpbmdzJztcblxuXG4gZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyk7XG5cdFx0Ly9zZXR0aW5nIHRoZSBjYW52YXMgc3RydWN0dXJlXG5cdFx0dGhpcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcblx0XHR0aGlzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG5cdFx0dGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuXHRcdC8vZ2FtZSBvYmplY3RzXG5cdFx0dGhpcy5ib2FyZCA9IG5ldyBCb2FyZCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cdFx0dGhpcy5wbGF5ZXIxID0gbmV3IFBhZGRsZSh0aGlzLmhlaWdodCwgZ2FwLCBwMUtleXMpO1xuXHRcdHRoaXMucGxheWVyMiA9IG5ldyBQYWRkbGUodGhpcy5oZWlnaHQsIHRoaXMud2lkdGggLSA1IC0gZ2FwLCBwMktleXMpO1xuXHRcdHRoaXMuYmFsbDEgPSBuZXcgQmFsbCh0aGlzLmhlaWdodCwgdGhpcy53aWR0aCwgc3RhcnQsIHRoaXMpO1xuXHRcdHRoaXMubGVmdFNjb3JlID0gbmV3IFNjb3JlQm9hcmQodGhpcy53aWR0aC80ICsgMjAsICAzMCwgMCk7XG5cdFx0dGhpcy5yaWdodFNjb3JlID0gbmV3IFNjb3JlQm9hcmQodGhpcy53aWR0aC80ICsgMTIwLCAzMCwgMCk7XG5cdH1cbiAgIHJlbmRlcigpe1xuICAgXHR0aGlzLmJvYXJkLnJlbmRlcih0aGlzLmN0eCk7XG4gICBcdHRoaXMucGxheWVyMS5yZW5kZXIodGhpcy5jdHgpO1xuICAgXHR0aGlzLnBsYXllcjIucmVuZGVyKHRoaXMuY3R4KTtcbiAgIFx0dGhpcy5iYWxsMS5yZW5kZXIodGhpcy5jdHgsIHRoaXMucGxheWVyMSwgdGhpcy5wbGF5ZXIyKTtcbiAgIFx0dGhpcy5sZWZ0U2NvcmUucmVuZGVyKHRoaXMuY3R4KTtcbiAgIFx0dGhpcy5yaWdodFNjb3JlLnJlbmRlcih0aGlzLmN0eCk7XG4gICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0dhbWUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Paddle = function () {\n\t// Paddle properties defines it's width, height, the max height it can go too, a speed, and positioning\n\tfunction Paddle(height, x, controls) {\n\t\tvar _this = this;\n\n\t\t_classCallCheck(this, Paddle);\n\n\t\tthis.height = 40;\n\t\tthis.maxHeight = height;\n\t\tthis.width = 5;\n\t\tthis.x = x;\n\t\tthis.y = height / 2 - this.height / 2;\n\t\tthis.speed = 10;\n\t\t//this property listens for the keydown event, controls calls the controll argument \n\t\t//which is set by passing an object through it with up & down being a key for that object\n\t\tdocument.addEventListener('keydown', function (event) {\n\t\t\tswitch (event.keyCode) {\n\t\t\t\tcase controls.up:\n\t\t\t\t\t_this.y = Math.max(0, _this.y - _this.speed);\n\t\t\t\t\tconsole.log('up');\n\t\t\t\t\tbreak;\n\t\t\t\tcase controls.down:\n\t\t\t\t\t_this.y = Math.min(_this.maxHeight - _this.height, _this.y + _this.speed);\n\t\t\t\t\tconsole.log('down');\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t});\n\t}\n\t//this draws the paddle and renders it.\n\n\n\t_createClass(Paddle, [{\n\t\tkey: 'render',\n\t\tvalue: function render(ctx) {\n\t\t\tctx.fillStyle = 'pink';\n\t\t\tctx.fillRect(this.x, this.y, this.width, this.height);\n\t\t}\n\t}]);\n\n\treturn Paddle;\n}();\n\nexports.default = Paddle;\n;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUGFkZGxlLmpzP2ZkYmQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUNxQixNO0FBQ3BCO0FBQ0EsaUJBQVksTUFBWixFQUFvQixDQUFwQixFQUF1QixRQUF2QixFQUFnQztBQUFBOztBQUFBOztBQUMvQixPQUFLLE1BQUwsR0FBYyxFQUFkO0FBQ0EsT0FBSyxTQUFMLEdBQWlCLE1BQWpCO0FBQ0EsT0FBSyxLQUFMLEdBQWEsQ0FBYjtBQUNBLE9BQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxPQUFLLENBQUwsR0FBVSxTQUFTLENBQVYsR0FBZ0IsS0FBSyxNQUFMLEdBQWMsQ0FBdkM7QUFDQSxPQUFLLEtBQUwsR0FBYSxFQUFiO0FBQ0Q7QUFDQTtBQUNDLFdBQVMsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUMsaUJBQVM7QUFDN0MsV0FBTyxNQUFNLE9BQWI7QUFDQyxTQUFLLFNBQVMsRUFBZDtBQUNDLFdBQUssQ0FBTCxHQUFTLEtBQUssR0FBTCxDQUFTLENBQVQsRUFBWSxNQUFLLENBQUwsR0FBUyxNQUFLLEtBQTFCLENBQVQ7QUFDQSxhQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0E7QUFDRCxTQUFLLFNBQVMsSUFBZDtBQUNDLFdBQUssQ0FBTCxHQUFTLEtBQUssR0FBTCxDQUFTLE1BQUssU0FBTCxHQUFpQixNQUFLLE1BQS9CLEVBQXVDLE1BQUssQ0FBTCxHQUFTLE1BQUssS0FBckQsQ0FBVDtBQUNBLGFBQVEsR0FBUixDQUFZLE1BQVo7QUFDQTtBQVJGO0FBVUEsR0FYRDtBQVlBO0FBQ0Q7Ozs7O3lCQUNPLEcsRUFBSTtBQUNWLE9BQUksU0FBSixHQUFnQixNQUFoQjtBQUNBLE9BQUksUUFBSixDQUNDLEtBQUssQ0FETixFQUNTLEtBQUssQ0FEZCxFQUVDLEtBQUssS0FGTixFQUVhLEtBQUssTUFGbEI7QUFJQTs7Ozs7O2tCQS9CbUIsTTtBQWlDcEIiLCJmaWxlIjoiMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFkZGxlIHtcblx0Ly8gUGFkZGxlIHByb3BlcnRpZXMgZGVmaW5lcyBpdCdzIHdpZHRoLCBoZWlnaHQsIHRoZSBtYXggaGVpZ2h0IGl0IGNhbiBnbyB0b28sIGEgc3BlZWQsIGFuZCBwb3NpdGlvbmluZ1xuXHRjb25zdHJ1Y3RvcihoZWlnaHQsIHgsIGNvbnRyb2xzKXtcblx0XHR0aGlzLmhlaWdodCA9IDQwO1xuXHRcdHRoaXMubWF4SGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSA1O1xuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0gKGhlaWdodCAvIDIpIC0gKHRoaXMuaGVpZ2h0IC8gMik7XG5cdFx0dGhpcy5zcGVlZCA9IDEwO1xuXHQvL3RoaXMgcHJvcGVydHkgbGlzdGVucyBmb3IgdGhlIGtleWRvd24gZXZlbnQsIGNvbnRyb2xzIGNhbGxzIHRoZSBjb250cm9sbCBhcmd1bWVudCBcblx0Ly93aGljaCBpcyBzZXQgYnkgcGFzc2luZyBhbiBvYmplY3QgdGhyb3VnaCBpdCB3aXRoIHVwICYgZG93biBiZWluZyBhIGtleSBmb3IgdGhhdCBvYmplY3Rcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4ge1xuXHRcdFx0c3dpdGNoKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdFx0Y2FzZSBjb250cm9scy51cDpcblx0XHRcdFx0XHR0aGlzLnkgPSBNYXRoLm1heCgwLCB0aGlzLnkgLSB0aGlzLnNwZWVkKTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygndXAnKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBjb250cm9scy5kb3duOlxuXHRcdFx0XHRcdHRoaXMueSA9IE1hdGgubWluKHRoaXMubWF4SGVpZ2h0IC0gdGhpcy5oZWlnaHQsIHRoaXMueSArIHRoaXMuc3BlZWQpO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdkb3duJyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSk7XHRcblx0fVxuXHQvL3RoaXMgZHJhd3MgdGhlIHBhZGRsZSBhbmQgcmVuZGVycyBpdC5cblx0cmVuZGVyKGN0eCl7XG5cdFx0Y3R4LmZpbGxTdHlsZSA9ICdwaW5rJztcblx0XHRjdHguZmlsbFJlY3QoXG5cdFx0XHR0aGlzLngsIHRoaXMueSwgXG5cdFx0XHR0aGlzLndpZHRoLCB0aGlzLmhlaWdodFxuXHRcdFx0KTtcblx0fVxuXHRcbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1BhZGRsZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Board.js\nvar Board = function () {\n    // board properties\n    function Board(width, height) {\n        _classCallCheck(this, Board);\n\n        this.width = width;\n        this.height = height;\n    }\n    //draws the center line\n\n\n    _createClass(Board, [{\n        key: \"drawLine\",\n        value: function drawLine(ctx) {\n            ctx.setLineDash([10, 10]);\n            ctx.beginPath();\n            ctx.moveTo(this.width / 2, 0);\n            ctx.lineTo(this.width / 2, this.height);\n            ctx.strokeStyle = \"white\";\n            ctx.stroke();\n        }\n        // renders the center line by calling the this.drawLine() method\n\n    }, {\n        key: \"render\",\n        value: function render(ctx) {\n            ctx.clearRect(0, 0, this.width, this.height);\n            this.drawLine(ctx);\n        }\n    }]);\n\n    return Board;\n}();\n\nexports.default = Board;\n;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQm9hcmQuanM/OWQ5NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUM7SUFDb0IsSztBQUNqQjtBQUNBLG1CQUFZLEtBQVosRUFBbUIsTUFBbkIsRUFBMkI7QUFBQTs7QUFDdkIsYUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGFBQUssTUFBTCxHQUFjLE1BQWQ7QUFDSDtBQUNEOzs7OztpQ0FDUyxHLEVBQUs7QUFDVixnQkFBSSxXQUFKLENBQWdCLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBaEI7QUFDQSxnQkFBSSxTQUFKO0FBQ0EsZ0JBQUksTUFBSixDQUFXLEtBQUssS0FBTCxHQUFhLENBQXhCLEVBQTJCLENBQTNCO0FBQ0EsZ0JBQUksTUFBSixDQUFXLEtBQUssS0FBTCxHQUFhLENBQXhCLEVBQTJCLEtBQUssTUFBaEM7QUFDQSxnQkFBSSxXQUFKLEdBQWtCLE9BQWxCO0FBQ0EsZ0JBQUksTUFBSjtBQUNIO0FBQ0Q7Ozs7K0JBQ08sRyxFQUFLO0FBQ1osZ0JBQUksU0FBSixDQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsS0FBSyxLQUF6QixFQUFnQyxLQUFLLE1BQXJDO0FBQ0MsaUJBQUssUUFBTCxDQUFjLEdBQWQ7QUFFQTs7Ozs7O2tCQXBCZ0IsSztBQXFCcEIiLCJmaWxlIjoiMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiAvLyBCb2FyZC5qc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICAgIC8vIGJvYXJkIHByb3BlcnRpZXNcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuICAgIC8vZHJhd3MgdGhlIGNlbnRlciBsaW5lXG4gICAgZHJhd0xpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5zZXRMaW5lRGFzaChbMTAsIDEwXSk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLndpZHRoIC8gMiwgMCk7XG4gICAgICAgIGN0eC5saW5lVG8odGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuICAgIC8vIHJlbmRlcnMgdGhlIGNlbnRlciBsaW5lIGJ5IGNhbGxpbmcgdGhlIHRoaXMuZHJhd0xpbmUoKSBtZXRob2RcbiAgICByZW5kZXIoY3R4KSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgXHR0aGlzLmRyYXdMaW5lKGN0eCk7XG5cbiAgICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQm9hcmQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar radius = 5;\n\nvar Ball = function () {\n\t// Ball Properties\n\tfunction Ball(height, width, controls, game) {\n\t\t_classCallCheck(this, Ball);\n\n\t\tthis.x = width / 2; // sets starting x position\n\t\tthis.y = height / 2; //sets starting y position\n\t\tthis.vy = 0;\n\t\tthis.vx = 0;\n\t\tthis.maxHeight = height;\n\t\tthis.height = height;\n\t\tthis.width = width;\n\t\t// this.speed = speed; <- can use later for new balls!\n\t\tthis.radius = radius;\n\t\tthis.game = game;\n\t\tthis.startListener(controls);\n\t\tthis.ballBounceSound = new Audio('../sounds/pong-01.wav');\n\t\tthis.ballPCSound = new Audio('../sounds/pong-02.wav');\n\t\tthis.ballGoalSound = new Audio('../sounds/pong-03.wav');\n\t}\n\t//Ball Methods\n\n\n\t_createClass(Ball, [{\n\t\tkey: 'draw',\n\t\tvalue: function draw(ctx) {\n\t\t\tctx.beginPath();\n\t\t\tctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n\t\t\tctx.fillStyle = \"white\";\n\t\t\tctx.fill();\n\t\t}\n\t\t//this sets the starting velocities after the space key is pressed\n\t\t// space key value can be found in settings!\n\n\t}, {\n\t\tkey: 'startListener',\n\t\tvalue: function startListener(controls) {\n\t\t\tvar _this = this;\n\n\t\t\tdocument.addEventListener('keydown', function (event) {\n\t\t\t\tif (_this.vx === 0 && _this.vy === 0 && event.keyCode === controls.start) {\n\t\t\t\t\t(function () {\n\t\t\t\t\t\tvar generateSpeed = function generateSpeed() {\n\t\t\t\t\t\t\t_this.vy = Math.floor(Math.random() * 8 - 4);\n\t\t\t\t\t\t\t_this.vx = Math.floor(Math.random() * 8 - 4);\n\t\t\t\t\t\t\t//stops x & y from being at 0\n\t\t\t\t\t\t\tif (_this.vx === 0 || _this.vy === 0) {\n\t\t\t\t\t\t\t\tgenerateSpeed();\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t};\n\t\t\t\t\t\tgenerateSpeed();\n\t\t\t\t\t})();\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\t\t//creating the bounce effect\n\n\t}, {\n\t\tkey: 'wallBounce',\n\t\tvalue: function wallBounce() {\n\t\t\tvar hitTop = this.y + this.radius < 5;\n\t\t\tvar hitBottom = this.y >= this.height - 5;\n\t\t\t//Change y direction when hits top and bottom\n\t\t\tif (hitTop || hitBottom) {\n\t\t\t\tthis.vy = -this.vy;\n\t\t\t\tthis.ballBounceSound.play();\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'paddleCollision',\n\t\tvalue: function paddleCollision(player1, player2) {\n\t\t\tif (this.vx > 0) {\n\t\t\t\tvar inRightEnd = player2.x <= this.x + this.radius && player2.x > this.x - this.vx + this.radius;\n\t\t\t\tif (inRightEnd) {\n\t\t\t\t\tvar collisionDiff = this.x + this.radius - player2.x;\n\t\t\t\t\tvar k = collisionDiff / this.vx;\n\t\t\t\t\tvar y = this.vy * k + (this.y - this.vy);\n\t\t\t\t\tvar hitRightPaddle = y >= player2.y && y + this.radius <= player2.y + player2.height;\n\t\t\t\t\tif (hitRightPaddle) {\n\t\t\t\t\t\tthis.x = player2.x - this.radius;\n\t\t\t\t\t\tthis.y = Math.floor(this.y - this.vy + this.vy * k);\n\t\t\t\t\t\tthis.vx = -this.vx;\n\t\t\t\t\t\tthis.ballPCSound.play();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tvar inLeftEnd = player1.x + player1.width >= this.x;\n\t\t\t\tif (inLeftEnd) {\n\t\t\t\t\tvar _collisionDiff = player1.x + player1.width - this.x;\n\t\t\t\t\tvar _k = _collisionDiff / -this.vx;\n\t\t\t\t\tvar _y = this.vy * _k + (this.y - this.vy);\n\t\t\t\t\tvar hitLeftPaddle = _y >= player1.y && _y + this.radius <= player1.y + player1.height;\n\t\t\t\t\tif (hitLeftPaddle) {\n\t\t\t\t\t\tthis.x = player1.x + player1.width;\n\t\t\t\t\t\tthis.y = Math.floor(this.y - this.vy + this.vy * _k);\n\t\t\t\t\t\tthis.vx = -this.vx;\n\t\t\t\t\t\tthis.ballPCSound.play();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'goal',\n\t\tvalue: function goal() {\n\t\t\tvar outOnRight = this.x >= this.width;\n\t\t\tvar outOnLeft = this.x + this.radius <= 0;\n\n\t\t\tif (outOnRight) {\n\t\t\t\tthis.game.leftScore.score++;\n\t\t\t\tthis.reset();\n\t\t\t} else if (outOnLeft) {\n\t\t\t\tthis.game.rightScore.score++;\n\t\t\t\tthis.reset();\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'reset',\n\t\tvalue: function reset() {\n\t\t\tthis.x = this.width / 2;\n\t\t\tthis.y = this.height / 2;\n\t\t\tthis.vx = 0;\n\t\t\tthis.vy = 0;\n\t\t\tthis.ballGoalSound.play();\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render(ctx, player1, player2) {\n\t\t\tthis.x += this.vx; // this rendering keeps the ball moving!\n\t\t\tthis.y += this.vy;\n\t\t\tthis.draw(ctx);\n\t\t\tthis.wallBounce();\n\t\t\tthis.paddleCollision(player1, player2);\n\t\t\tthis.goal(this.width, this.height);\n\t\t}\n\t}]);\n\n\treturn Ball;\n}();\n\nexports.default = Ball;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmFsbC5qcz9iODFhIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLFNBQVMsQ0FBZjs7SUFFcUIsSTtBQUNwQjtBQUNBLGVBQVksTUFBWixFQUFvQixLQUFwQixFQUEyQixRQUEzQixFQUFxQyxJQUFyQyxFQUEwQztBQUFBOztBQUN6QyxPQUFLLENBQUwsR0FBUyxRQUFNLENBQWYsQ0FEeUMsQ0FDdkI7QUFDbEIsT0FBSyxDQUFMLEdBQVMsU0FBTyxDQUFoQixDQUZ5QyxDQUV0QjtBQUNuQixPQUFLLEVBQUwsR0FBVSxDQUFWO0FBQ0EsT0FBSyxFQUFMLEdBQVUsQ0FBVjtBQUNBLE9BQUssU0FBTCxHQUFpQixNQUFqQjtBQUNBLE9BQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxPQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0E7QUFDQSxPQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsT0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUssYUFBTCxDQUFtQixRQUFuQjtBQUNBLE9BQUssZUFBTCxHQUF1QixJQUFJLEtBQUosQ0FBVSx1QkFBVixDQUF2QjtBQUNBLE9BQUssV0FBTCxHQUFtQixJQUFJLEtBQUosQ0FBVSx1QkFBVixDQUFuQjtBQUNBLE9BQUssYUFBTCxHQUFxQixJQUFJLEtBQUosQ0FBVSx1QkFBVixDQUFyQjtBQUNBO0FBQ0Q7Ozs7O3VCQUNLLEcsRUFBSTtBQUNSLE9BQUksU0FBSjtBQUNBLE9BQUksR0FBSixDQUFRLEtBQUssQ0FBYixFQUFnQixLQUFLLENBQXJCLEVBQXdCLEtBQUssTUFBN0IsRUFBcUMsQ0FBckMsRUFBd0MsS0FBSyxFQUFMLEdBQVEsQ0FBaEQ7QUFDQSxPQUFJLFNBQUosR0FBZ0IsT0FBaEI7QUFDQSxPQUFJLElBQUo7QUFDQTtBQUNEO0FBQ0E7Ozs7Z0NBQ2MsUSxFQUFTO0FBQUE7O0FBQ3RCLFlBQVMsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUMsaUJBQVM7QUFDN0MsUUFBSSxNQUFLLEVBQUwsS0FBWSxDQUFaLElBQWlCLE1BQUssRUFBTCxLQUFZLENBQTdCLElBQWtDLE1BQU0sT0FBTixLQUFrQixTQUFTLEtBQWpFLEVBQXVFO0FBQUE7QUFDdEUsVUFBTSxnQkFBZ0IsU0FBaEIsYUFBZ0IsR0FBTTtBQUMzQixhQUFLLEVBQUwsR0FBVSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsQ0FBaEIsR0FBb0IsQ0FBL0IsQ0FBVjtBQUNBLGFBQUssRUFBTCxHQUFVLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixDQUFoQixHQUFvQixDQUEvQixDQUFWO0FBQ0E7QUFDQSxXQUFJLE1BQUssRUFBTCxLQUFZLENBQVosSUFBaUIsTUFBSyxFQUFMLEtBQVksQ0FBakMsRUFBcUM7QUFDcEM7QUFDQTtBQUNELE9BUEQ7QUFRQTtBQVRzRTtBQVV0RTtBQUNELElBWkQ7QUFhQTtBQUNEOzs7OytCQUNZO0FBQ1gsT0FBTSxTQUFTLEtBQUssQ0FBTCxHQUFTLEtBQUssTUFBZCxHQUF1QixDQUF0QztBQUNBLE9BQU0sWUFBWSxLQUFLLENBQUwsSUFBVSxLQUFLLE1BQUwsR0FBYyxDQUExQztBQUNBO0FBQ0EsT0FBSSxVQUFVLFNBQWQsRUFBd0I7QUFDdkIsU0FBSyxFQUFMLEdBQVUsQ0FBQyxLQUFLLEVBQWhCO0FBQ0EsU0FBSyxlQUFMLENBQXFCLElBQXJCO0FBQ0E7QUFDRDs7O2tDQUNlLE8sRUFBUyxPLEVBQVM7QUFDakMsT0FBSSxLQUFLLEVBQUwsR0FBVSxDQUFkLEVBQWlCO0FBQ2hCLFFBQU0sYUFDTixRQUFRLENBQVIsSUFBYSxLQUFLLENBQUwsR0FBUyxLQUFLLE1BQTNCLElBQ0EsUUFBUSxDQUFSLEdBQVksS0FBSyxDQUFMLEdBQVMsS0FBSyxFQUFkLEdBQW1CLEtBQUssTUFGcEM7QUFHQSxRQUFJLFVBQUosRUFBZ0I7QUFDZixTQUFNLGdCQUFnQixLQUFLLENBQUwsR0FBUyxLQUFLLE1BQWQsR0FBdUIsUUFBUSxDQUFyRDtBQUNBLFNBQU0sSUFBSSxnQkFBZ0IsS0FBSyxFQUEvQjtBQUNBLFNBQU0sSUFBSSxLQUFLLEVBQUwsR0FBVSxDQUFWLElBQWUsS0FBSyxDQUFMLEdBQVMsS0FBSyxFQUE3QixDQUFWO0FBQ0EsU0FBTSxpQkFBaUIsS0FBSyxRQUFRLENBQWIsSUFBa0IsSUFBSSxLQUFLLE1BQVQsSUFBbUIsUUFBUSxDQUFSLEdBQVksUUFBUSxNQUFoRjtBQUNBLFNBQUksY0FBSixFQUFvQjtBQUNuQixXQUFLLENBQUwsR0FBUyxRQUFRLENBQVIsR0FBWSxLQUFLLE1BQTFCO0FBQ0EsV0FBSyxDQUFMLEdBQVMsS0FBSyxLQUFMLENBQVcsS0FBSyxDQUFMLEdBQVMsS0FBSyxFQUFkLEdBQW1CLEtBQUssRUFBTCxHQUFVLENBQXhDLENBQVQ7QUFDQSxXQUFLLEVBQUwsR0FBVSxDQUFDLEtBQUssRUFBaEI7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsSUFBakI7QUFDQTtBQUNEO0FBQ0QsSUFoQkQsTUFnQk87QUFDTixRQUFNLFlBQVksUUFBUSxDQUFSLEdBQVksUUFBUSxLQUFwQixJQUE2QixLQUFLLENBQXBEO0FBQ0EsUUFBSSxTQUFKLEVBQWU7QUFDZCxTQUFNLGlCQUFnQixRQUFRLENBQVIsR0FBWSxRQUFRLEtBQXBCLEdBQTRCLEtBQUssQ0FBdkQ7QUFDQSxTQUFNLEtBQUksaUJBQWdCLENBQUMsS0FBSyxFQUFoQztBQUNBLFNBQU0sS0FBSSxLQUFLLEVBQUwsR0FBVSxFQUFWLElBQWUsS0FBSyxDQUFMLEdBQVMsS0FBSyxFQUE3QixDQUFWO0FBQ0EsU0FBTSxnQkFBZ0IsTUFBSyxRQUFRLENBQWIsSUFBa0IsS0FBSSxLQUFLLE1BQVQsSUFDeEMsUUFBUSxDQUFSLEdBQVksUUFBUSxNQURwQjtBQUVBLFNBQUksYUFBSixFQUFtQjtBQUNsQixXQUFLLENBQUwsR0FBUyxRQUFRLENBQVIsR0FBWSxRQUFRLEtBQTdCO0FBQ0EsV0FBSyxDQUFMLEdBQVMsS0FBSyxLQUFMLENBQVcsS0FBSyxDQUFMLEdBQVMsS0FBSyxFQUFkLEdBQW1CLEtBQUssRUFBTCxHQUFVLEVBQXhDLENBQVQ7QUFDQSxXQUFLLEVBQUwsR0FBVSxDQUFDLEtBQUssRUFBaEI7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsSUFBakI7QUFDQTtBQUNEO0FBQ0Q7QUFDRzs7O3lCQUNLO0FBQ0wsT0FBTSxhQUFhLEtBQUssQ0FBTCxJQUFVLEtBQUssS0FBbEM7QUFDQSxPQUFNLFlBQVksS0FBSyxDQUFMLEdBQVMsS0FBSyxNQUFkLElBQXdCLENBQTFDOztBQUVBLE9BQUksVUFBSixFQUFlO0FBQ2QsU0FBSyxJQUFMLENBQVUsU0FBVixDQUFvQixLQUFwQjtBQUNBLFNBQUssS0FBTDtBQUNBLElBSEQsTUFHTSxJQUFHLFNBQUgsRUFBYTtBQUNsQixTQUFLLElBQUwsQ0FBVSxVQUFWLENBQXFCLEtBQXJCO0FBQ0EsU0FBSyxLQUFMO0FBQ0E7QUFDRDs7OzBCQUNNO0FBQ04sUUFBSyxDQUFMLEdBQVMsS0FBSyxLQUFMLEdBQVcsQ0FBcEI7QUFDQSxRQUFLLENBQUwsR0FBUyxLQUFLLE1BQUwsR0FBWSxDQUFyQjtBQUNBLFFBQUssRUFBTCxHQUFVLENBQVY7QUFDQSxRQUFLLEVBQUwsR0FBVSxDQUFWO0FBQ0EsUUFBSyxhQUFMLENBQW1CLElBQW5CO0FBQ0E7Ozt5QkFDTSxHLEVBQUssTyxFQUFTLE8sRUFBUTtBQUMvQixRQUFLLENBQUwsSUFBVSxLQUFLLEVBQWYsQ0FEK0IsQ0FDYjtBQUNsQixRQUFLLENBQUwsSUFBVSxLQUFLLEVBQWY7QUFDQSxRQUFLLElBQUwsQ0FBVSxHQUFWO0FBQ0EsUUFBSyxVQUFMO0FBQ0EsUUFBSyxlQUFMLENBQXFCLE9BQXJCLEVBQThCLE9BQTlCO0FBQ0EsUUFBSyxJQUFMLENBQVUsS0FBSyxLQUFmLEVBQXNCLEtBQUssTUFBM0I7QUFFQTs7Ozs7O2tCQWpIa0IsSSIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcmFkaXVzID0gNTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFsbCB7XG5cdC8vIEJhbGwgUHJvcGVydGllc1xuXHRjb25zdHJ1Y3RvcihoZWlnaHQsIHdpZHRoLCBjb250cm9scywgZ2FtZSl7XG5cdFx0dGhpcy54ID0gd2lkdGgvMjsgLy8gc2V0cyBzdGFydGluZyB4IHBvc2l0aW9uXG5cdFx0dGhpcy55ID0gaGVpZ2h0LzI7IC8vc2V0cyBzdGFydGluZyB5IHBvc2l0aW9uXG5cdFx0dGhpcy52eSA9IDA7XG5cdFx0dGhpcy52eCA9IDA7XG5cdFx0dGhpcy5tYXhIZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHRcdC8vIHRoaXMuc3BlZWQgPSBzcGVlZDsgPC0gY2FuIHVzZSBsYXRlciBmb3IgbmV3IGJhbGxzIVxuXHRcdHRoaXMucmFkaXVzID0gcmFkaXVzO1xuXHRcdHRoaXMuZ2FtZSA9IGdhbWU7XG5cdFx0dGhpcy5zdGFydExpc3RlbmVyKGNvbnRyb2xzKTtcblx0XHR0aGlzLmJhbGxCb3VuY2VTb3VuZCA9IG5ldyBBdWRpbygnLi4vc291bmRzL3BvbmctMDEud2F2Jyk7XHRcblx0XHR0aGlzLmJhbGxQQ1NvdW5kID0gbmV3IEF1ZGlvKCcuLi9zb3VuZHMvcG9uZy0wMi53YXYnKTtcdFxuXHRcdHRoaXMuYmFsbEdvYWxTb3VuZCA9IG5ldyBBdWRpbygnLi4vc291bmRzL3BvbmctMDMud2F2Jyk7XHRcblx0fVxuXHQvL0JhbGwgTWV0aG9kc1xuXHRkcmF3KGN0eCl7XG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJKjIpO1xuXHRcdGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG5cdFx0Y3R4LmZpbGwoKTtcblx0fVxuXHQvL3RoaXMgc2V0cyB0aGUgc3RhcnRpbmcgdmVsb2NpdGllcyBhZnRlciB0aGUgc3BhY2Uga2V5IGlzIHByZXNzZWRcblx0Ly8gc3BhY2Uga2V5IHZhbHVlIGNhbiBiZSBmb3VuZCBpbiBzZXR0aW5ncyFcblx0c3RhcnRMaXN0ZW5lcihjb250cm9scyl7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHtcblx0XHRcdGlmICh0aGlzLnZ4ID09PSAwICYmIHRoaXMudnkgPT09IDAgJiYgZXZlbnQua2V5Q29kZSA9PT0gY29udHJvbHMuc3RhcnQpe1xuXHRcdFx0XHRjb25zdCBnZW5lcmF0ZVNwZWVkID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMudnkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4IC0gNCk7XG5cdFx0XHRcdFx0dGhpcy52eCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDggLSA0KTtcdFxuXHRcdFx0XHRcdC8vc3RvcHMgeCAmIHkgZnJvbSBiZWluZyBhdCAwXG5cdFx0XHRcdFx0aWYgKHRoaXMudnggPT09IDAgfHwgdGhpcy52eSA9PT0gMCApIHtcblx0XHRcdFx0XHRcdGdlbmVyYXRlU3BlZWQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Z2VuZXJhdGVTcGVlZCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdC8vY3JlYXRpbmcgdGhlIGJvdW5jZSBlZmZlY3Rcblx0d2FsbEJvdW5jZSgpe1xuXHRcdGNvbnN0IGhpdFRvcCA9IHRoaXMueSArIHRoaXMucmFkaXVzIDwgNTtcblx0XHRjb25zdCBoaXRCb3R0b20gPSB0aGlzLnkgPj0gdGhpcy5oZWlnaHQgLSA1O1xuXHRcdC8vQ2hhbmdlIHkgZGlyZWN0aW9uIHdoZW4gaGl0cyB0b3AgYW5kIGJvdHRvbVxuXHRcdGlmIChoaXRUb3AgfHwgaGl0Qm90dG9tKXtcblx0XHRcdHRoaXMudnkgPSAtdGhpcy52eTtcblx0XHRcdHRoaXMuYmFsbEJvdW5jZVNvdW5kLnBsYXkoKTtcblx0XHR9XG5cdH1cblx0cGFkZGxlQ29sbGlzaW9uKHBsYXllcjEsIHBsYXllcjIpIHtcblx0XHRpZiAodGhpcy52eCA+IDApIHtcblx0XHRcdGNvbnN0IGluUmlnaHRFbmQgPSBcblx0XHRcdHBsYXllcjIueCA8PSB0aGlzLnggKyB0aGlzLnJhZGl1cyAmJlxuXHRcdFx0cGxheWVyMi54ID4gdGhpcy54IC0gdGhpcy52eCArIHRoaXMucmFkaXVzO1xuXHRcdFx0aWYgKGluUmlnaHRFbmQpIHtcblx0XHRcdFx0Y29uc3QgY29sbGlzaW9uRGlmZiA9IHRoaXMueCArIHRoaXMucmFkaXVzIC0gcGxheWVyMi54O1xuXHRcdFx0XHRjb25zdCBrID0gY29sbGlzaW9uRGlmZiAvIHRoaXMudng7XG5cdFx0XHRcdGNvbnN0IHkgPSB0aGlzLnZ5ICogayArICh0aGlzLnkgLSB0aGlzLnZ5KTtcblx0XHRcdFx0Y29uc3QgaGl0UmlnaHRQYWRkbGUgPSB5ID49IHBsYXllcjIueSAmJiB5ICsgdGhpcy5yYWRpdXMgPD0gcGxheWVyMi55ICsgcGxheWVyMi5oZWlnaHQ7XG5cdFx0XHRcdGlmIChoaXRSaWdodFBhZGRsZSkge1xuXHRcdFx0XHRcdHRoaXMueCA9IHBsYXllcjIueCAtIHRoaXMucmFkaXVzO1xuXHRcdFx0XHRcdHRoaXMueSA9IE1hdGguZmxvb3IodGhpcy55IC0gdGhpcy52eSArIHRoaXMudnkgKiBrKTtcblx0XHRcdFx0XHR0aGlzLnZ4ID0gLXRoaXMudng7XG5cdFx0XHRcdFx0dGhpcy5iYWxsUENTb3VuZC5wbGF5KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgaW5MZWZ0RW5kID0gcGxheWVyMS54ICsgcGxheWVyMS53aWR0aCA+PSB0aGlzLng7XG5cdFx0XHRpZiAoaW5MZWZ0RW5kKSB7XG5cdFx0XHRcdGNvbnN0IGNvbGxpc2lvbkRpZmYgPSBwbGF5ZXIxLnggKyBwbGF5ZXIxLndpZHRoIC0gdGhpcy54O1xuXHRcdFx0XHRjb25zdCBrID0gY29sbGlzaW9uRGlmZiAvIC10aGlzLnZ4O1xuXHRcdFx0XHRjb25zdCB5ID0gdGhpcy52eSAqIGsgKyAodGhpcy55IC0gdGhpcy52eSk7XG5cdFx0XHRcdGNvbnN0IGhpdExlZnRQYWRkbGUgPSB5ID49IHBsYXllcjEueSAmJiB5ICsgdGhpcy5yYWRpdXMgPD1cblx0XHRcdFx0cGxheWVyMS55ICsgcGxheWVyMS5oZWlnaHQ7XG5cdFx0XHRcdGlmIChoaXRMZWZ0UGFkZGxlKSB7XG5cdFx0XHRcdFx0dGhpcy54ID0gcGxheWVyMS54ICsgcGxheWVyMS53aWR0aDtcblx0XHRcdFx0XHR0aGlzLnkgPSBNYXRoLmZsb29yKHRoaXMueSAtIHRoaXMudnkgKyB0aGlzLnZ5ICogayk7XG5cdFx0XHRcdFx0dGhpcy52eCA9IC10aGlzLnZ4O1xuXHRcdFx0XHRcdHRoaXMuYmFsbFBDU291bmQucGxheSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuICAgICB9XG4gICAgIGdvYWwoKXtcbiAgICAgXHRjb25zdCBvdXRPblJpZ2h0ID0gdGhpcy54ID49IHRoaXMud2lkdGg7XG4gICAgIFx0Y29uc3Qgb3V0T25MZWZ0ID0gdGhpcy54ICsgdGhpcy5yYWRpdXMgPD0gMDtcblxuICAgICBcdGlmIChvdXRPblJpZ2h0KXtcbiAgICAgXHRcdHRoaXMuZ2FtZS5sZWZ0U2NvcmUuc2NvcmUrKztcbiAgICAgXHRcdHRoaXMucmVzZXQoKTtcbiAgICAgXHR9ZWxzZSBpZihvdXRPbkxlZnQpe1xuICAgICBcdFx0dGhpcy5nYW1lLnJpZ2h0U2NvcmUuc2NvcmUrKztcbiAgICAgXHRcdHRoaXMucmVzZXQoKTtcbiAgICAgXHR9XG4gICAgIH1cbiAgICAgcmVzZXQoKXtcbiAgICAgXHR0aGlzLnggPSB0aGlzLndpZHRoLzI7XG4gICAgIFx0dGhpcy55ID0gdGhpcy5oZWlnaHQvMjtcbiAgICAgXHR0aGlzLnZ4ID0gMDtcbiAgICAgXHR0aGlzLnZ5ID0gMDtcbiAgICAgXHR0aGlzLmJhbGxHb2FsU291bmQucGxheSgpO1xuICAgICB9XG4gICAgIHJlbmRlcihjdHgsIHBsYXllcjEsIHBsYXllcjIpe1xuXHRcdFx0dGhpcy54ICs9IHRoaXMudng7Ly8gdGhpcyByZW5kZXJpbmcga2VlcHMgdGhlIGJhbGwgbW92aW5nIVxuXHRcdFx0dGhpcy55ICs9IHRoaXMudnk7XG5cdFx0XHR0aGlzLmRyYXcoY3R4KTtcblx0XHRcdHRoaXMud2FsbEJvdW5jZSgpO1xuXHRcdFx0dGhpcy5wYWRkbGVDb2xsaXNpb24ocGxheWVyMSwgcGxheWVyMik7XG5cdFx0XHR0aGlzLmdvYWwodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXHRcdFx0XG5cdFx0fVxuXHR9XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQmFsbC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ScoreBoard = function () {\n\tfunction ScoreBoard(x, y, score) {\n\t\t_classCallCheck(this, ScoreBoard);\n\n\t\tthis.x = x;\n\t\tthis.y = y;\n\t\tthis.score = score;\n\t}\n\n\t_createClass(ScoreBoard, [{\n\t\tkey: \"draw\",\n\t\tvalue: function draw(ctx) {\n\t\t\tctx.font = \" 30px Helvetica\";\n\t\t\tctx.fillText(this.score, this.x, this.y);\n\t\t}\n\t}, {\n\t\tkey: \"render\",\n\t\tvalue: function render(ctx) {\n\t\t\tthis.draw(ctx);\n\t\t}\n\t}]);\n\n\treturn ScoreBoard;\n}();\n\nexports.default = ScoreBoard;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2NvcmVCb2FyZC5qcz8zZjUxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBcUIsVTtBQUNwQixxQkFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLEtBQW5CLEVBQXlCO0FBQUE7O0FBQ3hCLE9BQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxPQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsT0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBOzs7O3VCQUNJLEcsRUFBSTtBQUNSLE9BQUksSUFBSixHQUFXLGlCQUFYO0FBQ0EsT0FBSSxRQUFKLENBQWEsS0FBSyxLQUFsQixFQUF5QixLQUFLLENBQTlCLEVBQWlDLEtBQUssQ0FBdEM7QUFDQTs7O3lCQUNNLEcsRUFBSTtBQUNWLFFBQUssSUFBTCxDQUFVLEdBQVY7QUFDQTs7Ozs7O2tCQVptQixVIiwiZmlsZSI6IjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZUJvYXJkIHtcblx0Y29uc3RydWN0b3IgKHgsIHksIHNjb3JlKXtcblx0XHR0aGlzLnggPSB4O1xuXHRcdHRoaXMueSA9IHk7XG5cdFx0dGhpcy5zY29yZSA9IHNjb3JlO1xuXHR9XG5cdGRyYXcoY3R4KXtcblx0XHRjdHguZm9udCA9IFwiIDMwcHggSGVsdmV0aWNhXCI7XG5cdFx0Y3R4LmZpbGxUZXh0KHRoaXMuc2NvcmUsIHRoaXMueCwgdGhpcy55KTtcblx0fVxuXHRyZW5kZXIoY3R4KXtcblx0XHR0aGlzLmRyYXcoY3R4KTtcblx0fVxufSBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9TY29yZUJvYXJkLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n// this is used for the x value of the paddles away from outer wall\nvar gap = exports.gap = 10;\n// objects made to set the up and down values to be used by the keydown switch statement\nvar p1Keys = exports.p1Keys = { up: 65, down: 90 };\nvar p2Keys = exports.p2Keys = { up: 38, down: 40 };\n// game start keyboard key\nvar start = exports.start = { start: 32 };//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2V0dGluZ3MuanM/YjA1MyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ08sSUFBTSxvQkFBTSxFQUFaO0FBQ1A7QUFDTyxJQUFNLDBCQUFTLEVBQUMsSUFBSSxFQUFMLEVBQVMsTUFBTSxFQUFmLEVBQWY7QUFDQSxJQUFNLDBCQUFTLEVBQUMsSUFBSSxFQUFMLEVBQVMsTUFBTSxFQUFmLEVBQWY7QUFDUDtBQUNPLElBQU0sd0JBQVEsRUFBQyxPQUFPLEVBQVIsRUFBZCIsImZpbGUiOiI2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdGhpcyBpcyB1c2VkIGZvciB0aGUgeCB2YWx1ZSBvZiB0aGUgcGFkZGxlcyBhd2F5IGZyb20gb3V0ZXIgd2FsbFxuZXhwb3J0IGNvbnN0IGdhcCA9IDEwO1xuLy8gb2JqZWN0cyBtYWRlIHRvIHNldCB0aGUgdXAgYW5kIGRvd24gdmFsdWVzIHRvIGJlIHVzZWQgYnkgdGhlIGtleWRvd24gc3dpdGNoIHN0YXRlbWVudFxuZXhwb3J0IGNvbnN0IHAxS2V5cyA9IHt1cDogNjUsIGRvd246IDkwfTtcbmV4cG9ydCBjb25zdCBwMktleXMgPSB7dXA6IDM4LCBkb3duOiA0MH07XG4vLyBnYW1lIHN0YXJ0IGtleWJvYXJkIGtleVxuZXhwb3J0IGNvbnN0IHN0YXJ0ID0ge3N0YXJ0OiAzMn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9TZXR0aW5ncy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(8);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(19)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(true) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(8, function() {\n\t\t\tvar newContent = __webpack_require__(8);\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5jc3M/YmM3YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMiLCJmaWxlIjoiNy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9nYW1lLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9nYW1lLmNzc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(9)();\n// imports\nexports.i(__webpack_require__(10), \"\");\nexports.i(__webpack_require__(11), \"\");\nexports.i(__webpack_require__(18), \"\");\n\n// module\nexports.push([module.id, \"/* Game Styles */\\n\\n\\n\\n\\n\\n\", \"\"]);\n\n// exports\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5jc3M/NDMxMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiOC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuZXhwb3J0cy5pKHJlcXVpcmUoXCItIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9jc3MvcmVzZXQuY3NzXCIpLCBcIlwiKTtcbmV4cG9ydHMuaShyZXF1aXJlKFwiLSEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vY3NzL2NvbnRlbnQuY3NzXCIpLCBcIlwiKTtcbmV4cG9ydHMuaShyZXF1aXJlKFwiLSEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vY3NzL2NhbnZhcy5jc3NcIiksIFwiXCIpO1xuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIEdhbWUgU3R5bGVzICovXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL3NyYy9nYW1lLmNzc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 9 */
/***/ function(module, exports) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\n// css base code, injected by the css-loader\r\nmodule.exports = function() {\r\n\tvar list = [];\r\n\r\n\t// return the list of modules as css string\r\n\tlist.toString = function toString() {\r\n\t\tvar result = [];\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar item = this[i];\r\n\t\t\tif(item[2]) {\r\n\t\t\t\tresult.push(\"@media \" + item[2] + \"{\" + item[1] + \"}\");\r\n\t\t\t} else {\r\n\t\t\t\tresult.push(item[1]);\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn result.join(\"\");\r\n\t};\r\n\r\n\t// import a list of modules into the list\r\n\tlist.i = function(modules, mediaQuery) {\r\n\t\tif(typeof modules === \"string\")\r\n\t\t\tmodules = [[null, modules, \"\"]];\r\n\t\tvar alreadyImportedModules = {};\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar id = this[i][0];\r\n\t\t\tif(typeof id === \"number\")\r\n\t\t\t\talreadyImportedModules[id] = true;\r\n\t\t}\r\n\t\tfor(i = 0; i < modules.length; i++) {\r\n\t\t\tvar item = modules[i];\r\n\t\t\t// skip already imported module\r\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\r\n\t\t\t//  when a module is imported multiple times with different media queries.\r\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\r\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\r\n\t\t\t\tif(mediaQuery && !item[2]) {\r\n\t\t\t\t\titem[2] = mediaQuery;\r\n\t\t\t\t} else if(mediaQuery) {\r\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\r\n\t\t\t\t}\r\n\t\t\t\tlist.push(item);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\treturn list;\r\n};\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzP2RhMDQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0Esd0NBQXdDLGdCQUFnQjtBQUN4RCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiI5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(9)();\n// imports\n\n\n// module\nexports.push([module.id, \" /* http://meyerweb.com/eric/tools/css/reset/\\n   v2.0 | 20110126\\n   License: none (public domain)\\n*/\\n\\nhtml, body, div, span, applet, object, iframe,\\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\\na, abbr, acronym, address, big, cite, code,\\ndel, dfn, em, img, ins, kbd, q, s, samp,\\nsmall, strike, strong, sub, sup, tt, var,\\nb, u, i, center,\\ndl, dt, dd, ol, ul, li,\\nfieldset, form, label, legend,\\ntable, caption, tbody, tfoot, thead, tr, th, td,\\narticle, aside, canvas, details, embed,\\nfigure, figcaption, footer, header, hgroup,\\nmenu, nav, output, ruby, section, summary,\\ntime, mark, audio, video {\\n   margin: 0;\\n   padding: 0;\\n   border: 0;\\n   font-size: 100%;\\n   font: inherit;\\n   vertical-align: baseline;\\n}\\n/* HTML5 display-role reset for older browsers */\\narticle, aside, details, figcaption, figure,\\nfooter, header, hgroup, menu, nav, section {\\n   display: block;\\n}\\nbody {\\n   line-height: 1;\\n}\\nol, ul {\\n   list-style: none;\\n}\\nblockquote, q {\\n   quotes: none;\\n}\\nblockquote:before, blockquote:after,\\nq:before, q:after {\\n   content: '';\\n   content: none;\\n}\\ntable {\\n   border-collapse: collapse;\\n   border-spacing: 0;\\n}\", \"\"]);\n\n// exports\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY3NzL3Jlc2V0LmNzcz9jN2IyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7OztBQUdBO0FBQ0EsNm5CQUE2bkIsZUFBZSxnQkFBZ0IsZUFBZSxxQkFBcUIsbUJBQW1CLDhCQUE4QixHQUFHLCtJQUErSSxvQkFBb0IsR0FBRyxRQUFRLG9CQUFvQixHQUFHLFVBQVUsc0JBQXNCLEdBQUcsaUJBQWlCLGtCQUFrQixHQUFHLDJEQUEyRCxpQkFBaUIsbUJBQW1CLEdBQUcsU0FBUywrQkFBK0IsdUJBQXVCLEdBQUc7O0FBRXRxQyIsImZpbGUiOiIxMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiIC8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcbiAgIG1hcmdpbjogMDtcXG4gICBwYWRkaW5nOiAwO1xcbiAgIGJvcmRlcjogMDtcXG4gICBmb250LXNpemU6IDEwMCU7XFxuICAgZm9udDogaW5oZXJpdDtcXG4gICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICAgZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcbiAgIGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcbiAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcbiAgIHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcbiAgIGNvbnRlbnQ6ICcnO1xcbiAgIGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG4gICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vc3JjL2Nzcy9yZXNldC5jc3NcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(9)();\n// imports\nexports.i(__webpack_require__(12), \"\");\n\n// module\nexports.push([module.id, \"body {\\n   font-family: 'PressStart2P Web', monospace;\\n   margin: 0 auto;\\n   text-align: center;\\n}\\nh1 {\\n   margin-top: 20px;\\n}\\n.players {\\n   display: inline-flex;\\n   justify-content: space-between;\\n   text-align: center;\\n   width: 512px;\\n}\\n\", \"\"]);\n\n// exports\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY3NzL2NvbnRlbnQuY3NzPzU5YTQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDLGdEQUFnRCxvQkFBb0Isd0JBQXdCLEdBQUcsTUFBTSxzQkFBc0IsR0FBRyxZQUFZLDBCQUEwQixvQ0FBb0Msd0JBQXdCLGtCQUFrQixHQUFHOztBQUVyUiIsImZpbGUiOiIxMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuZXhwb3J0cy5pKHJlcXVpcmUoXCItIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9mb250cy5jc3NcIiksIFwiXCIpO1xuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgIGZvbnQtZmFtaWx5OiAnUHJlc3NTdGFydDJQIFdlYicsIG1vbm9zcGFjZTtcXG4gICBtYXJnaW46IDAgYXV0bztcXG4gICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbmgxIHtcXG4gICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG4ucGxheWVycyB7XFxuICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICB3aWR0aDogNTEycHg7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9zcmMvY3NzL2NvbnRlbnQuY3NzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(9)();\n// imports\n\n\n// module\nexports.push([module.id, \" @font-face {\\n    font-family: 'PressStart2P Web';\\n    src: url(\" + __webpack_require__(13) + \");\\n    src: url(\" + __webpack_require__(13) + \"?#iefix) format('embedded-opentype'),\\n         url(\" + __webpack_require__(14) + \") format('woff2'),\\n         url(\" + __webpack_require__(15) + \") format('woff'),\\n         url(\" + __webpack_require__(16) + \") format('truetype'),\\n         url(\" + __webpack_require__(17) + \"#press_start_2pregular) format('svg');\\n    font-weight: normal;\\n    font-style: normal;\\n}\", \"\"]);\n\n// exports\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY3NzL2ZvbnRzLmNzcz85YWU2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7OztBQUdBO0FBQ0EsdUNBQXVDLHNDQUFzQyxnREFBd0UseVdBQW9lLDBCQUEwQix5QkFBeUIsR0FBRzs7QUFFL3FCIiwiZmlsZSI6IjEyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIgQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnUHJlc3NTdGFydDJQIFdlYic7XFxuICAgIHNyYzogdXJsKFwiICsgcmVxdWlyZShcIi4uLy4uL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LmVvdFwiKSArIFwiKTtcXG4gICAgc3JjOiB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQuZW90XCIpICsgXCI/I2llZml4KSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXFxuICAgICAgICAgdXJsKFwiICsgcmVxdWlyZShcIi4uLy4uL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LndvZmYyXCIpICsgXCIpIGZvcm1hdCgnd29mZjInKSxcXG4gICAgICAgICB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZlwiKSArIFwiKSBmb3JtYXQoJ3dvZmYnKSxcXG4gICAgICAgICB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQudHRmXCIpICsgXCIpIGZvcm1hdCgndHJ1ZXR5cGUnKSxcXG4gICAgICAgICB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQuc3ZnXCIpICsgXCIjcHJlc3Nfc3RhcnRfMnByZWd1bGFyKSBmb3JtYXQoJ3N2ZycpO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9zcmMvY3NzL2ZvbnRzLmNzc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.eot\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3Q/MWUwYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIxMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3RcIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQuZW90XG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.woff2\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmMj9kOTUwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjE0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LndvZmYyXCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LndvZmYyXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.woff\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmPzEyMGMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiMTUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIvZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZlwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.ttf\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC50dGY/NTYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIxNi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC50dGZcIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQudHRmXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.svg\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5zdmc/ZjRjYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIxNy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5zdmdcIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQuc3ZnXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(9)();\n// imports\n\n\n// module\nexports.push([module.id, \" #game {\\n   background-color: black;\\n   display: block;\\n   height: 256px;\\n   margin: 20px auto;\\n   width: 512px;\\n}\", \"\"]);\n\n// exports\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY3NzL2NhbnZhcy5jc3M/ODcyNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOzs7QUFHQTtBQUNBLGtDQUFrQyw2QkFBNkIsb0JBQW9CLG1CQUFtQix1QkFBdUIsa0JBQWtCLEdBQUc7O0FBRWxKIiwiZmlsZSI6IjE4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIgI2dhbWUge1xcbiAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgIGhlaWdodDogMjU2cHg7XFxuICAgbWFyZ2luOiAyMHB4IGF1dG87XFxuICAgd2lkdGg6IDUxMnB4O1xcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vc3JjL2Nzcy9jYW52YXMuY3NzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\nvar stylesInDom = {},\r\n\tmemoize = function(fn) {\r\n\t\tvar memo;\r\n\t\treturn function () {\r\n\t\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\r\n\t\t\treturn memo;\r\n\t\t};\r\n\t},\r\n\tisOldIE = memoize(function() {\r\n\t\treturn /msie [6-9]\\b/.test(window.navigator.userAgent.toLowerCase());\r\n\t}),\r\n\tgetHeadElement = memoize(function () {\r\n\t\treturn document.head || document.getElementsByTagName(\"head\")[0];\r\n\t}),\r\n\tsingletonElement = null,\r\n\tsingletonCounter = 0,\r\n\tstyleElementsInsertedAtTop = [];\r\n\r\nmodule.exports = function(list, options) {\r\n\tif(false) {\r\n\t\tif(typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\r\n\t}\r\n\r\n\toptions = options || {};\r\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\r\n\t// tags it will allow on a page\r\n\tif (typeof options.singleton === \"undefined\") options.singleton = isOldIE();\r\n\r\n\t// By default, add <style> tags to the bottom of <head>.\r\n\tif (typeof options.insertAt === \"undefined\") options.insertAt = \"bottom\";\r\n\r\n\tvar styles = listToStyles(list);\r\n\taddStylesToDom(styles, options);\r\n\r\n\treturn function update(newList) {\r\n\t\tvar mayRemove = [];\r\n\t\tfor(var i = 0; i < styles.length; i++) {\r\n\t\t\tvar item = styles[i];\r\n\t\t\tvar domStyle = stylesInDom[item.id];\r\n\t\t\tdomStyle.refs--;\r\n\t\t\tmayRemove.push(domStyle);\r\n\t\t}\r\n\t\tif(newList) {\r\n\t\t\tvar newStyles = listToStyles(newList);\r\n\t\t\taddStylesToDom(newStyles, options);\r\n\t\t}\r\n\t\tfor(var i = 0; i < mayRemove.length; i++) {\r\n\t\t\tvar domStyle = mayRemove[i];\r\n\t\t\tif(domStyle.refs === 0) {\r\n\t\t\t\tfor(var j = 0; j < domStyle.parts.length; j++)\r\n\t\t\t\t\tdomStyle.parts[j]();\r\n\t\t\t\tdelete stylesInDom[domStyle.id];\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n}\r\n\r\nfunction addStylesToDom(styles, options) {\r\n\tfor(var i = 0; i < styles.length; i++) {\r\n\t\tvar item = styles[i];\r\n\t\tvar domStyle = stylesInDom[item.id];\r\n\t\tif(domStyle) {\r\n\t\t\tdomStyle.refs++;\r\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\r\n\t\t\t}\r\n\t\t\tfor(; j < item.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tvar parts = [];\r\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\r\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction listToStyles(list) {\r\n\tvar styles = [];\r\n\tvar newStyles = {};\r\n\tfor(var i = 0; i < list.length; i++) {\r\n\t\tvar item = list[i];\r\n\t\tvar id = item[0];\r\n\t\tvar css = item[1];\r\n\t\tvar media = item[2];\r\n\t\tvar sourceMap = item[3];\r\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\r\n\t\tif(!newStyles[id])\r\n\t\t\tstyles.push(newStyles[id] = {id: id, parts: [part]});\r\n\t\telse\r\n\t\t\tnewStyles[id].parts.push(part);\r\n\t}\r\n\treturn styles;\r\n}\r\n\r\nfunction insertStyleElement(options, styleElement) {\r\n\tvar head = getHeadElement();\r\n\tvar lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];\r\n\tif (options.insertAt === \"top\") {\r\n\t\tif(!lastStyleElementInsertedAtTop) {\r\n\t\t\thead.insertBefore(styleElement, head.firstChild);\r\n\t\t} else if(lastStyleElementInsertedAtTop.nextSibling) {\r\n\t\t\thead.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);\r\n\t\t} else {\r\n\t\t\thead.appendChild(styleElement);\r\n\t\t}\r\n\t\tstyleElementsInsertedAtTop.push(styleElement);\r\n\t} else if (options.insertAt === \"bottom\") {\r\n\t\thead.appendChild(styleElement);\r\n\t} else {\r\n\t\tthrow new Error(\"Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.\");\r\n\t}\r\n}\r\n\r\nfunction removeStyleElement(styleElement) {\r\n\tstyleElement.parentNode.removeChild(styleElement);\r\n\tvar idx = styleElementsInsertedAtTop.indexOf(styleElement);\r\n\tif(idx >= 0) {\r\n\t\tstyleElementsInsertedAtTop.splice(idx, 1);\r\n\t}\r\n}\r\n\r\nfunction createStyleElement(options) {\r\n\tvar styleElement = document.createElement(\"style\");\r\n\tstyleElement.type = \"text/css\";\r\n\tinsertStyleElement(options, styleElement);\r\n\treturn styleElement;\r\n}\r\n\r\nfunction createLinkElement(options) {\r\n\tvar linkElement = document.createElement(\"link\");\r\n\tlinkElement.rel = \"stylesheet\";\r\n\tinsertStyleElement(options, linkElement);\r\n\treturn linkElement;\r\n}\r\n\r\nfunction addStyle(obj, options) {\r\n\tvar styleElement, update, remove;\r\n\r\n\tif (options.singleton) {\r\n\t\tvar styleIndex = singletonCounter++;\r\n\t\tstyleElement = singletonElement || (singletonElement = createStyleElement(options));\r\n\t\tupdate = applyToSingletonTag.bind(null, styleElement, styleIndex, false);\r\n\t\tremove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);\r\n\t} else if(obj.sourceMap &&\r\n\t\ttypeof URL === \"function\" &&\r\n\t\ttypeof URL.createObjectURL === \"function\" &&\r\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\r\n\t\ttypeof Blob === \"function\" &&\r\n\t\ttypeof btoa === \"function\") {\r\n\t\tstyleElement = createLinkElement(options);\r\n\t\tupdate = updateLink.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t\tif(styleElement.href)\r\n\t\t\t\tURL.revokeObjectURL(styleElement.href);\r\n\t\t};\r\n\t} else {\r\n\t\tstyleElement = createStyleElement(options);\r\n\t\tupdate = applyToTag.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t};\r\n\t}\r\n\r\n\tupdate(obj);\r\n\r\n\treturn function updateStyle(newObj) {\r\n\t\tif(newObj) {\r\n\t\t\tif(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)\r\n\t\t\t\treturn;\r\n\t\t\tupdate(obj = newObj);\r\n\t\t} else {\r\n\t\t\tremove();\r\n\t\t}\r\n\t};\r\n}\r\n\r\nvar replaceText = (function () {\r\n\tvar textStore = [];\r\n\r\n\treturn function (index, replacement) {\r\n\t\ttextStore[index] = replacement;\r\n\t\treturn textStore.filter(Boolean).join('\\n');\r\n\t};\r\n})();\r\n\r\nfunction applyToSingletonTag(styleElement, index, remove, obj) {\r\n\tvar css = remove ? \"\" : obj.css;\r\n\r\n\tif (styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = replaceText(index, css);\r\n\t} else {\r\n\t\tvar cssNode = document.createTextNode(css);\r\n\t\tvar childNodes = styleElement.childNodes;\r\n\t\tif (childNodes[index]) styleElement.removeChild(childNodes[index]);\r\n\t\tif (childNodes.length) {\r\n\t\t\tstyleElement.insertBefore(cssNode, childNodes[index]);\r\n\t\t} else {\r\n\t\t\tstyleElement.appendChild(cssNode);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction applyToTag(styleElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar media = obj.media;\r\n\r\n\tif(media) {\r\n\t\tstyleElement.setAttribute(\"media\", media)\r\n\t}\r\n\r\n\tif(styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = css;\r\n\t} else {\r\n\t\twhile(styleElement.firstChild) {\r\n\t\t\tstyleElement.removeChild(styleElement.firstChild);\r\n\t\t}\r\n\t\tstyleElement.appendChild(document.createTextNode(css));\r\n\t}\r\n}\r\n\r\nfunction updateLink(linkElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar sourceMap = obj.sourceMap;\r\n\r\n\tif(sourceMap) {\r\n\t\t// http://stackoverflow.com/a/26603875\r\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\r\n\t}\r\n\r\n\tvar blob = new Blob([css], { type: \"text/css\" });\r\n\r\n\tvar oldSrc = linkElement.href;\r\n\r\n\tlinkElement.href = URL.createObjectURL(blob);\r\n\r\n\tif(oldSrc)\r\n\t\tURL.revokeObjectURL(oldSrc);\r\n}\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanM/Yjk4MCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNCQUFzQjtBQUN0QztBQUNBO0FBQ0Esa0JBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBLFFBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxnQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6IjE5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXHJcblx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcblxyXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiA8aGVhZD4uXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XHJcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcclxuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XHJcblx0XHR9IGVsc2UgaWYobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHZhciBpZHggPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlRWxlbWVudCk7XHJcblx0aWYoaWR4ID49IDApIHtcclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHRsaW5rRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xyXG5cdHJldHVybiBsaW5rRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXHJcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xyXG5cdFx0fTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCkge1xyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcclxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcclxuXHR9XHJcblxyXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xyXG5cclxuXHR2YXIgb2xkU3JjID0gbGlua0VsZW1lbnQuaHJlZjtcclxuXHJcblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG5cdGlmKG9sZFNyYylcclxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);