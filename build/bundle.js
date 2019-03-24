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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/express-http-proxy/app/steps/buildProxyReq.js":
/*!********************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/buildProxyReq.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var debug = __webpack_require__(/*! debug */ "debug")('express-http-proxy');

var requestOptions = __webpack_require__(/*! ../../lib/requestOptions */ "./node_modules/express-http-proxy/lib/requestOptions.js");

function buildProxyReq(Container) {
  var req = Container.user.req;
  var res = Container.user.res;
  var options = Container.options;
  var host = Container.proxy.host;
  var parseBody = !options.parseReqBody ? Promise.resolve(null) : requestOptions.bodyContent(req, res, options);
  var createReqOptions = requestOptions.create(req, res, options, host);
  return Promise.all([parseBody, createReqOptions]).then(function (responseArray) {
    Container.proxy.bodyContent = responseArray[0];
    Container.proxy.reqBuilder = responseArray[1];
    debug('proxy request options:', Container.proxy.reqBuilder);
    return Container;
  });
}

module.exports = buildProxyReq;

/***/ }),

/***/ "./node_modules/express-http-proxy/app/steps/copyProxyResHeadersToUserRes.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/copyProxyResHeadersToUserRes.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function copyProxyResHeadersToUserRes(container) {
  return new Promise(function (resolve) {
    var res = container.user.res;
    var rsp = container.proxy.res;

    if (!res.headersSent) {
      res.status(rsp.statusCode);
      Object.keys(rsp.headers).filter(function (item) {
        return item !== 'transfer-encoding';
      }).forEach(function (item) {
        res.set(item, rsp.headers[item]);
      });
    }

    resolve(container);
  });
}

module.exports = copyProxyResHeadersToUserRes;

/***/ }),

/***/ "./node_modules/express-http-proxy/app/steps/decorateProxyReqBody.js":
/*!***************************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/decorateProxyReqBody.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var debug = __webpack_require__(/*! debug */ "debug")('express-http-proxy');

function defaultDecorator(proxyReqOptBody
/*, userReq */
) {
  return proxyReqOptBody;
}

function decorateProxyReqBody(container) {
  var userDecorator = container.options.proxyReqBodyDecorator;
  var resolverFn = userDecorator || defaultDecorator;

  if (userDecorator) {
    debug('using custom proxyReqBodyDecorator');
  }

  return Promise.resolve(resolverFn(container.proxy.bodyContent, container.user.req)).then(function (bodyContent) {
    container.proxy.bodyContent = bodyContent;
    return Promise.resolve(container);
  });
}

module.exports = decorateProxyReqBody;

/***/ }),

/***/ "./node_modules/express-http-proxy/app/steps/decorateProxyReqOpts.js":
/*!***************************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/decorateProxyReqOpts.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var debug = __webpack_require__(/*! debug */ "debug")('express-http-proxy');

function defaultDecorator(proxyReqOptBuilder
/*, userReq */
) {
  return proxyReqOptBuilder;
}

function decorateProxyReqOpt(container) {
  var resolverFn = container.options.proxyReqOptDecorator || defaultDecorator;
  return Promise.resolve(resolverFn(container.proxy.reqBuilder, container.user.req)).then(function (processedReqOpts) {
    delete processedReqOpts.params;
    container.proxy.reqBuilder = processedReqOpts;
    debug('Request options (after processing): %o', processedReqOpts);
    return Promise.resolve(container);
  });
}

module.exports = decorateProxyReqOpt;

/***/ }),

/***/ "./node_modules/express-http-proxy/app/steps/decorateUserRes.js":
/*!**********************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/decorateUserRes.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var as = __webpack_require__(/*! ../../lib/as.js */ "./node_modules/express-http-proxy/lib/as.js");

var debug = __webpack_require__(/*! debug */ "debug")('express-http-proxy');

var zlib = __webpack_require__(/*! zlib */ "zlib");

function isResGzipped(res) {
  return res.headers['content-encoding'] === 'gzip';
}

function zipOrUnzip(method) {
  return function (rspData, res) {
    return isResGzipped(res) && rspData.length ? zlib[method](rspData) : rspData;
  };
}

var maybeUnzipResponse = zipOrUnzip('gunzipSync');
var maybeZipResponse = zipOrUnzip('gzipSync');

function verifyBuffer(rspd, reject) {
  if (!Buffer.isBuffer(rspd)) {
    return reject(new Error('userResDecorator should return string or buffer as data'));
  }
}

function updateHeaders(res, rspdBefore, rspdAfter, reject) {
  if (!res.headersSent) {
    res.set('content-length', rspdAfter.length);
  } else if (rspdAfter.length !== rspdBefore.length) {
    var error = '"Content-Length" is already sent,' + 'the length of response data can not be changed';
    return reject(new Error(error));
  }
}

function decorateProxyResBody(container) {
  var resolverFn = container.options.userResDecorator;

  if (!resolverFn) {
    return Promise.resolve(container);
  }

  var proxyResData = maybeUnzipResponse(container.proxy.resData, container.proxy.res);
  var proxyRes = container.proxy.res;
  var req = container.user.req;
  var res = container.user.res;

  if (res.statusCode === 304) {
    debug('Skipping userResDecorator on response 304');
    return Promise.resolve(container);
  }

  return Promise.resolve(resolverFn(proxyRes, proxyResData, req, res)).then(function (modifiedResData) {
    return new Promise(function (resolve, reject) {
      var rspd = as.buffer(modifiedResData, container.options);
      verifyBuffer(rspd, reject);
      updateHeaders(res, proxyResData, rspd, reject);
      container.proxy.resData = maybeZipResponse(rspd, container.proxy.res);
      resolve(container);
    });
  });
}

module.exports = decorateProxyResBody;

/***/ }),

/***/ "./node_modules/express-http-proxy/app/steps/decorateUserResHeaders.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/decorateUserResHeaders.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function decorateUserResHeaders(container) {
  var resolverFn = container.options.userResHeaderDecorator;
  var headers = container.user.res._headers;

  if (!resolverFn) {
    return Promise.resolve(container);
  }

  return Promise.resolve(resolverFn(headers, container.user.req, container.user.res, container.proxy.req, container.proxy.res)).then(function (headers) {
    return new Promise(function (resolve) {
      container.user.res.set(headers);
      resolve(container);
    });
  });
}

module.exports = decorateUserResHeaders;

/***/ }),

/***/ "./node_modules/express-http-proxy/app/steps/filterUserRequest.js":
/*!************************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/filterUserRequest.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // No-op version of filter.  Allows everything!

function defaultFilter(proxyReqOptBuilder, userReq) {
  // eslint-disable-line
  return true;
}

function filterUserRequest(container) {
  var resolverFn = container.options.filter || defaultFilter;
  return Promise.resolve(resolverFn(container.user.req, container.user.res)).then(function (shouldIContinue) {
    if (shouldIContinue) {
      return Promise.resolve(container);
    } else {
      return Promise.reject(); // reject with no args should simply call next()
    }
  });
}

module.exports = filterUserRequest;

/***/ }),

/***/ "./node_modules/express-http-proxy/app/steps/handleProxyErrors.js":
/*!************************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/handleProxyErrors.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var debug = __webpack_require__(/*! debug */ "debug")('express-http-proxy');

function connectionResetHandler(err, res) {
  if (err && err.code === 'ECONNRESET') {
    debug('Error: Connection reset due to timeout.');
    res.setHeader('X-Timeout-Reason', 'express-http-proxy reset the request.');
    res.writeHead(504, {
      'Content-Type': 'text/plain'
    });
    res.end();
  }
}

function handleProxyErrors(err, res, next) {
  switch (err && err.code) {
    case 'ECONNRESET':
      {
        return connectionResetHandler(err, res, next);
      }

    default:
      {
        next(err);
      }
  }
}

module.exports = handleProxyErrors;

/***/ }),

/***/ "./node_modules/express-http-proxy/app/steps/maybeSkipToNextHandler.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/maybeSkipToNextHandler.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function defaultSkipFilter()
/* res */
{
  return false;
}

function maybeSkipToNextHandler(container) {
  var resolverFn = container.options.skipToNextHandlerFilter || defaultSkipFilter;
  return Promise.resolve(resolverFn(container.proxy.res)).then(function (shouldSkipToNext) {
    if (shouldSkipToNext) {
      container.user.res.expressHttpProxy = container.proxy;
      return Promise.reject(container.user.next());
    } else {
      return Promise.resolve(container);
    }
  });
}

module.exports = maybeSkipToNextHandler;

/***/ }),

/***/ "./node_modules/express-http-proxy/app/steps/prepareProxyReq.js":
/*!**********************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/prepareProxyReq.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var as = __webpack_require__(/*! ../../lib/as */ "./node_modules/express-http-proxy/lib/as.js");

function getContentLength(body) {
  var result;

  if (Buffer.isBuffer(body)) {
    // Buffer
    result = body.length;
  } else if (typeof body === 'string') {
    result = Buffer.byteLength(body);
  }

  return result;
}

function prepareProxyReq(container) {
  return new Promise(function (resolve) {
    var bodyContent = container.proxy.bodyContent;
    var reqOpt = container.proxy.reqBuilder;

    if (bodyContent) {
      bodyContent = container.options.reqAsBuffer ? as.buffer(bodyContent, container.options) : as.bufferOrString(bodyContent);
      reqOpt.headers['content-length'] = getContentLength(bodyContent);

      if (container.options.reqBodyEncoding) {
        reqOpt.headers['Accept-Charset'] = container.options.reqBodyEncoding;
      }
    }

    container.proxy.bodyContent = bodyContent;
    resolve(container);
  });
}

module.exports = prepareProxyReq;

/***/ }),

/***/ "./node_modules/express-http-proxy/app/steps/resolveProxyHost.js":
/*!***********************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/resolveProxyHost.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requestOptions = __webpack_require__(/*! ../../lib/requestOptions */ "./node_modules/express-http-proxy/lib/requestOptions.js");

function resolveProxyHost(container) {
  var parsedHost;

  if (container.options.memoizeHost && container.options.memoizedHost) {
    parsedHost = container.options.memoizedHost;
  } else {
    parsedHost = requestOptions.parseHost(container);
  }

  container.proxy.reqBuilder.host = parsedHost.host;
  container.proxy.reqBuilder.port = container.options.port || parsedHost.port;
  container.proxy.requestModule = parsedHost.module;
  return Promise.resolve(container);
}

module.exports = resolveProxyHost;

/***/ }),

/***/ "./node_modules/express-http-proxy/app/steps/resolveProxyReqPath.js":
/*!**************************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/resolveProxyReqPath.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var url = __webpack_require__(/*! url */ "url");

var debug = __webpack_require__(/*! debug */ "debug")('express-http-proxy');

function defaultProxyReqPathResolver(req) {
  return url.parse(req.url).path;
}

function resolveProxyReqPath(container) {
  var resolverFn = container.options.proxyReqPathResolver || defaultProxyReqPathResolver;
  return Promise.resolve(resolverFn(container.user.req)).then(function (resolvedPath) {
    container.proxy.reqBuilder.path = resolvedPath;
    debug('resolved proxy path:', resolvedPath);
    return Promise.resolve(container);
  });
}

module.exports = resolveProxyReqPath;

/***/ }),

/***/ "./node_modules/express-http-proxy/app/steps/sendProxyRequest.js":
/*!***********************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/sendProxyRequest.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var chunkLength = __webpack_require__(/*! ../../lib/chunkLength */ "./node_modules/express-http-proxy/lib/chunkLength.js");

function sendProxyRequest(Container) {
  var req = Container.user.req;
  var bodyContent = Container.proxy.bodyContent;
  var reqOpt = Container.proxy.reqBuilder;
  var options = Container.options;
  return new Promise(function (resolve, reject) {
    var protocol = Container.proxy.requestModule;
    var proxyReq = Container.proxy.req = protocol.request(reqOpt, function (rsp) {
      if (options.stream) {
        Container.proxy.res = rsp;
        return resolve(Container);
      }

      var chunks = [];
      rsp.on('data', function (chunk) {
        chunks.push(chunk);
      });
      rsp.on('end', function () {
        Container.proxy.res = rsp;
        Container.proxy.resData = Buffer.concat(chunks, chunkLength(chunks));
        resolve(Container);
      });
      rsp.on('error', reject);
    });
    proxyReq.on('socket', function (socket) {
      if (options.timeout) {
        socket.setTimeout(options.timeout, function () {
          proxyReq.abort();
        });
      }
    });
    proxyReq.on('error', reject); // this guy should go elsewhere, down the chain

    if (options.parseReqBody) {
      // We are parsing the body ourselves so we need to write the body content
      // and then manually end the request.
      //if (bodyContent instanceof Object) {
      //throw new Error
      //debugger;
      //bodyContent = JSON.stringify(bodyContent);
      //}
      if (bodyContent.length) {
        var body = bodyContent;
        var contentType = proxyReq.getHeader('Content-Type');

        if (contentType === 'x-www-form-urlencoded' || contentType === 'application/x-www-form-urlencoded') {
          try {
            var params = JSON.parse(body);
            body = Object.keys(params).map(function (k) {
              return k + '=' + params[k];
            }).join('&');
          } catch (e) {// bodyContent is not json-format
          }
        }

        proxyReq.setHeader('Content-Length', Buffer.byteLength(body));
        proxyReq.write(body);
      }

      proxyReq.end();
    } else {
      // Pipe will call end when it has completely read from the request.
      req.pipe(proxyReq);
    }

    req.on('aborted', function () {
      // reject?
      proxyReq.abort();
    });
  });
}

module.exports = sendProxyRequest;

/***/ }),

/***/ "./node_modules/express-http-proxy/app/steps/sendUserRes.js":
/*!******************************************************************!*\
  !*** ./node_modules/express-http-proxy/app/steps/sendUserRes.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function sendUserRes(Container) {
  if (!Container.user.res.headersSent) {
    if (Container.options.stream) {
      Container.proxy.res.pipe(Container.user.res);
    } else {
      Container.user.res.send(Container.proxy.resData);
    }
  }

  return Promise.resolve(Container);
}

module.exports = sendUserRes;

/***/ }),

/***/ "./node_modules/express-http-proxy/index.js":
/*!**************************************************!*\
  !*** ./node_modules/express-http-proxy/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // * Breaks proxying into a series of discrete steps, many of which can be swapped out by authors.
// * Uses Promises to support async.
// * Uses a quasi-Global called Container to tidy up the argument passing between the major work-flow steps.

var ScopeContainer = __webpack_require__(/*! ./lib/scopeContainer */ "./node_modules/express-http-proxy/lib/scopeContainer.js");

var assert = __webpack_require__(/*! assert */ "assert");

var debug = __webpack_require__(/*! debug */ "debug")('express-http-proxy');

var buildProxyReq = __webpack_require__(/*! ./app/steps/buildProxyReq */ "./node_modules/express-http-proxy/app/steps/buildProxyReq.js");

var copyProxyResHeadersToUserRes = __webpack_require__(/*! ./app/steps/copyProxyResHeadersToUserRes */ "./node_modules/express-http-proxy/app/steps/copyProxyResHeadersToUserRes.js");

var decorateProxyReqBody = __webpack_require__(/*! ./app/steps/decorateProxyReqBody */ "./node_modules/express-http-proxy/app/steps/decorateProxyReqBody.js");

var decorateProxyReqOpts = __webpack_require__(/*! ./app/steps/decorateProxyReqOpts */ "./node_modules/express-http-proxy/app/steps/decorateProxyReqOpts.js");

var decorateUserRes = __webpack_require__(/*! ./app/steps/decorateUserRes */ "./node_modules/express-http-proxy/app/steps/decorateUserRes.js");

var decorateUserResHeaders = __webpack_require__(/*! ./app/steps/decorateUserResHeaders */ "./node_modules/express-http-proxy/app/steps/decorateUserResHeaders.js");

var filterUserRequest = __webpack_require__(/*! ./app/steps/filterUserRequest */ "./node_modules/express-http-proxy/app/steps/filterUserRequest.js");

var handleProxyErrors = __webpack_require__(/*! ./app/steps/handleProxyErrors */ "./node_modules/express-http-proxy/app/steps/handleProxyErrors.js");

var maybeSkipToNextHandler = __webpack_require__(/*! ./app/steps/maybeSkipToNextHandler */ "./node_modules/express-http-proxy/app/steps/maybeSkipToNextHandler.js");

var prepareProxyReq = __webpack_require__(/*! ./app/steps/prepareProxyReq */ "./node_modules/express-http-proxy/app/steps/prepareProxyReq.js");

var resolveProxyHost = __webpack_require__(/*! ./app/steps/resolveProxyHost */ "./node_modules/express-http-proxy/app/steps/resolveProxyHost.js");

var resolveProxyReqPath = __webpack_require__(/*! ./app/steps/resolveProxyReqPath */ "./node_modules/express-http-proxy/app/steps/resolveProxyReqPath.js");

var sendProxyRequest = __webpack_require__(/*! ./app/steps/sendProxyRequest */ "./node_modules/express-http-proxy/app/steps/sendProxyRequest.js");

var sendUserRes = __webpack_require__(/*! ./app/steps/sendUserRes */ "./node_modules/express-http-proxy/app/steps/sendUserRes.js");

module.exports = function proxy(host, userOptions) {
  assert(host, 'Host should not be empty');
  return function handleProxy(req, res, next) {
    debug('[start proxy] ' + req.path);
    var container = new ScopeContainer(req, res, next, host, userOptions);
    filterUserRequest(container).then(buildProxyReq).then(resolveProxyHost).then(decorateProxyReqOpts).then(resolveProxyReqPath).then(decorateProxyReqBody).then(prepareProxyReq).then(sendProxyRequest).then(maybeSkipToNextHandler).then(copyProxyResHeadersToUserRes).then(decorateUserResHeaders).then(decorateUserRes).then(sendUserRes).catch(function (err) {
      // I sometimes reject without an error to shortcircuit the remaining
      // steps and return control to the host application.
      if (err) {
        var resolver = container.options.proxyErrorHandler ? container.options.proxyErrorHandler : handleProxyErrors;
        resolver(err, res, next);
      } else {
        next();
      }
    });
  };
};

/***/ }),

/***/ "./node_modules/express-http-proxy/lib/as.js":
/*!***************************************************!*\
  !*** ./node_modules/express-http-proxy/lib/as.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Trivial convenience methods for parsing Buffers
 */

function asBuffer(body, options) {
  var ret;

  if (Buffer.isBuffer(body)) {
    ret = body;
  } else if (typeof body === 'object') {
    ret = new Buffer(JSON.stringify(body), options.reqBodyEncoding);
  } else if (typeof body === 'string') {
    ret = new Buffer(body, options.reqBodyEncodeing);
  }

  return ret;
}

function asBufferOrString(body) {
  var ret;

  if (Buffer.isBuffer(body)) {
    ret = body;
  } else if (typeof body === 'object') {
    ret = JSON.stringify(body);
  } else if (typeof body === 'string') {
    ret = body;
  }

  return ret;
}

module.exports = {
  buffer: asBuffer,
  bufferOrString: asBufferOrString
};

/***/ }),

/***/ "./node_modules/express-http-proxy/lib/chunkLength.js":
/*!************************************************************!*\
  !*** ./node_modules/express-http-proxy/lib/chunkLength.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function chunkLength(chunks) {
  return chunks.reduce(function (len, buf) {
    return len + buf.length;
  }, 0);
}

module.exports = chunkLength;

/***/ }),

/***/ "./node_modules/express-http-proxy/lib/isUnset.js":
/*!********************************************************!*\
  !*** ./node_modules/express-http-proxy/lib/isUnset.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (val) {
  return typeof val === 'undefined' || val === '' || val === null;
};

/***/ }),

/***/ "./node_modules/express-http-proxy/lib/requestOptions.js":
/*!***************************************************************!*\
  !*** ./node_modules/express-http-proxy/lib/requestOptions.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var http = __webpack_require__(/*! http */ "http");

var https = __webpack_require__(/*! https */ "https");

var url = __webpack_require__(/*! url */ "url");

var getRawBody = __webpack_require__(/*! raw-body */ "raw-body");

var isUnset = __webpack_require__(/*! ./isUnset */ "./node_modules/express-http-proxy/lib/isUnset.js");

function extend(obj, source, skips) {
  if (!source) {
    return obj;
  }

  for (var prop in source) {
    if (!skips || skips.indexOf(prop) === -1) {
      obj[prop] = source[prop];
    }
  }

  return obj;
}

function parseHost(Container) {
  var host = Container.params.host;
  var req = Container.user.req;
  var options = Container.options;
  host = typeof host === 'function' ? host(req) : host.toString();

  if (!host) {
    return new Error('Empty host parameter');
  }

  if (!/http(s)?:\/\//.test(host)) {
    host = 'http://' + host;
  }

  var parsed = url.parse(host);

  if (!parsed.hostname) {
    return new Error('Unable to parse hostname, possibly missing protocol://?');
  }

  var ishttps = options.https || parsed.protocol === 'https:';
  return {
    host: parsed.hostname,
    port: parsed.port || (ishttps ? 443 : 80),
    module: ishttps ? https : http
  };
}

function reqHeaders(req, options) {
  var headers = options.headers || {};
  var skipHdrs = ['connection', 'content-length'];

  if (!options.preserveHostHdr) {
    skipHdrs.push('host');
  }

  var hds = extend(headers, req.headers, skipHdrs);
  hds.connection = 'close';
  return hds;
}

function createRequestOptions(req, res, options) {
  // prepare proxyRequest
  var reqOpt = {
    headers: reqHeaders(req, options),
    method: req.method,
    path: req.path,
    params: req.params
  };

  if (options.preserveReqSession) {
    reqOpt.session = req.session;
  }

  return Promise.resolve(reqOpt);
} // extract to bodyContent object


function bodyContent(req, res, options) {
  var parseReqBody = isUnset(options.parseReqBody) ? true : options.parseReqBody;

  function maybeParseBody(req, limit) {
    if (req.body) {
      return Promise.resolve(req.body);
    } else {
      // Returns a promise if no callback specified and global Promise exists.
      return getRawBody(req, {
        length: req.headers['content-length'],
        limit: limit
      });
    }
  }

  if (parseReqBody) {
    return maybeParseBody(req, options.limit);
  }
}

module.exports = {
  create: createRequestOptions,
  bodyContent: bodyContent,
  parseHost: parseHost
};

/***/ }),

/***/ "./node_modules/express-http-proxy/lib/resolveOptions.js":
/*!***************************************************************!*\
  !*** ./node_modules/express-http-proxy/lib/resolveOptions.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var debug = __webpack_require__(/*! debug */ "debug")('express-http-proxy');

var isUnset = __webpack_require__(/*! ../lib/isUnset */ "./node_modules/express-http-proxy/lib/isUnset.js");

function resolveBodyEncoding(reqBodyEncoding) {
  /* For reqBodyEncoding, these is a meaningful difference between null and
    * undefined.  null should be passed forward as the value of reqBodyEncoding,
    * and undefined should result in utf-8.
    */
  return reqBodyEncoding !== undefined ? reqBodyEncoding : 'utf-8';
} // parse client arguments


function resolveOptions(options) {
  options = options || {};
  var resolved;

  if (options.decorateRequest) {
    throw new Error('decorateRequest is REMOVED; use proxyReqOptDecorator and' + 'proxyReqBodyDecorator instead.  see README.md');
  }

  if (options.forwardPath || options.forwardPathAsync) {
    console.warn('forwardPath and forwardPathAsync are DEPRECATED' + 'and should be replaced with proxyReqPathResolver');
  }

  if (options.intercept) {
    console.warn('DEPRECATED: intercept. Use decorateUseRes instead.' + ' Please see README for more information.');
  }

  resolved = {
    limit: options.limit || '1mb',
    proxyReqPathResolver: options.proxyReqPathResolver || options.forwardPathAsync || options.forwardPath,
    proxyReqOptDecorator: options.proxyReqOptDecorator,
    proxyReqBodyDecorator: options.proxyReqBodyDecorator,
    userResDecorator: options.userResDecorator || options.intercept,
    userResHeaderDecorator: options.userResHeaderDecorator,
    proxyErrorHandler: options.proxyErrorHandler,
    filter: options.filter,
    // For backwards compatability, we default to legacy behavior for newly added settings.
    parseReqBody: isUnset(options.parseReqBody) ? true : options.parseReqBody,
    preserveHostHdr: options.preserveHostHdr,
    memoizeHost: isUnset(options.memoizeHost) ? true : options.memoizeHost,
    reqBodyEncoding: resolveBodyEncoding(options.reqBodyEncoding),
    skipToNextHandlerFilter: options.skipToNextHandlerFilter,
    headers: options.headers,
    preserveReqSession: options.preserveReqSession,
    https: options.https,
    port: options.port,
    reqAsBuffer: options.reqAsBuffer,
    timeout: options.timeout
  }; // automatically opt into stream mode if no response modifiers are specified

  resolved.stream = !resolved.skipToNextHandlerFilter && !resolved.userResDecorator && !resolved.userResHeaderDecorator;
  debug(resolved);
  return resolved;
}

module.exports = resolveOptions;

/***/ }),

/***/ "./node_modules/express-http-proxy/lib/scopeContainer.js":
/*!***************************************************************!*\
  !*** ./node_modules/express-http-proxy/lib/scopeContainer.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var resolveOptions = __webpack_require__(/*! ../lib/resolveOptions */ "./node_modules/express-http-proxy/lib/resolveOptions.js"); // The Container object is passed down the chain of Promises, with each one
// of them mutating and returning Container.  The goal is that (eventually)
// author using this library // could hook into/override any of these
// workflow steps with a Promise or simple function.
// Container for scoped arguments in a promise chain.  Each promise recieves
// this as its argument, and returns it.
//
// Do not expose the details of this to hooks/user functions.


function Container(req, res, next, host, userOptions) {
  return {
    user: {
      req: req,
      res: res,
      next: next
    },
    proxy: {
      req: undefined,
      res: undefined,
      resData: undefined,
      // from proxy res
      bodyContent: undefined,
      // for proxy req
      reqBuilder: {} // reqOpt, intended as first arg to http(s)?.request

    },
    options: resolveOptions(userOptions),
    params: {
      host: host,
      userOptions: userOptions
    }
  };
}

module.exports = Container;

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Header */ "./src/components/Header.js");
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-config */ "react-router-config");
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Header__WEBPACK_IMPORTED_MODULE_1__["default"], null), Object(react_router_config__WEBPACK_IMPORTED_MODULE_2__["renderRoutes"])(this.props.route.routes));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/Routers.js":
/*!************************!*\
  !*** ./src/Routers.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _containers_Home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./containers/Home */ "./src/containers/Home/index.js");
/* harmony import */ var _containers_Login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./containers/Login */ "./src/containers/Login/index.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App */ "./src/App.js");




/* harmony default export */ __webpack_exports__["default"] = ([{
  path: '/',
  component: _App__WEBPACK_IMPORTED_MODULE_3__["default"],
  routes: [{
    path: '/',
    key: 'home',
    component: _containers_Home__WEBPACK_IMPORTED_MODULE_1__["default"],
    exact: true,
    loadData: _containers_Home__WEBPACK_IMPORTED_MODULE_1__["default"].loadData
  }, {
    path: '/login',
    key: 'login',
    component: _containers_Login__WEBPACK_IMPORTED_MODULE_2__["default"],
    exact: true // loadData: Login.loadData()

  }]
}]);

/***/ }),

/***/ "./src/client/request.js":
/*!*******************************!*\
  !*** ./src/client/request.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var instance = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: '/'
});
/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./src/components/Header.js":
/*!**********************************!*\
  !*** ./src/components/Header.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Header; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Header =
/*#__PURE__*/
function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/"
      }, "Home"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/login"
      }, "Login"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null));
    }
  }]);

  return Header;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]); //31：53




/***/ }),

/***/ "./src/containers/Home/index.js":
/*!**************************************!*\
  !*** ./src/containers/Home/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store/actions */ "./src/containers/Home/store/actions.js");
var _dec, _class, _class2, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getHomeList: function getHomeList() {
      dispatch(Object(_store_actions__WEBPACK_IMPORTED_MODULE_2__["getHomeList"])());
    }
  };
};

var Home = (_dec = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(function (state) {
  return {
    list: state.home.newsList
  };
}, mapDispatchToProps), _dec(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Home);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Home)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.getList = function () {
      var list = _this.props.list;
      return list.map(function (item) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: item.id
        }, item.title);
      });
    };

    return _this;
  }

  _createClass(Home, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.list.length) {
        this.props.getHomeList();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.getList(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: function onClick() {
          alert('click');
        }
      }, "click"));
    }
  }]);

  return Home;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]), _class2.loadData = function (store) {
  return store.dispatch(Object(_store_actions__WEBPACK_IMPORTED_MODULE_2__["getHomeList"])());
}, _temp)) || _class);

var a = {
  success: true,
  'data': [{
    id: 1,
    title: 'ECMAScript 6简介'
  }, {
    id: 2,
    title: 'let 和 const 命令'
  }, {
    id: 3,
    title: '变量的解构赋值'
  }, {
    id: 4,
    title: '字符串的扩展'
  }, {
    id: 5,
    title: '正则的扩展'
  }]
};

/***/ }),

/***/ "./src/containers/Home/store/actions.js":
/*!**********************************************!*\
  !*** ./src/containers/Home/store/actions.js ***!
  \**********************************************/
/*! exports provided: getHomeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHomeList", function() { return getHomeList; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/containers/Home/store/constants.js");



var changeList = function changeList(list) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_1__["CHANGE_List"],
    list: list
  };
};

var getHomeList = function getHomeList() {
  return function (dispatch, getState, request) {
    return request.get('/api/news.json').then(function (res) {
      var list = res.data.data;
      dispatch(changeList(list));
    });
  };
};

/***/ }),

/***/ "./src/containers/Home/store/constants.js":
/*!************************************************!*\
  !*** ./src/containers/Home/store/constants.js ***!
  \************************************************/
/*! exports provided: CHANGE_List */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_List", function() { return CHANGE_List; });
var CHANGE_List = 'HOME/CHANGE_List';

/***/ }),

/***/ "./src/containers/Home/store/index.js":
/*!********************************************!*\
  !*** ./src/containers/Home/store/index.js ***!
  \********************************************/
/*! exports provided: reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducer */ "./src/containers/Home/store/reducer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return _reducer__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/containers/Home/store/reducer.js":
/*!**********************************************!*\
  !*** ./src/containers/Home/store/reducer.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/containers/Home/store/constants.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var defaultState = {
  newsList: []
};
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["CHANGE_List"]:
      return _objectSpread({}, state, {
        newsList: action.list
      });

    default:
      return state;
  }
});

/***/ }),

/***/ "./src/containers/Login/index.js":
/*!***************************************!*\
  !*** ./src/containers/Login/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Login; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Login =
/*#__PURE__*/
function (_Component) {
  _inherits(Login, _Component);

  function Login() {
    _classCallCheck(this, Login);

    return _possibleConstructorReturn(this, _getPrototypeOf(Login).apply(this, arguments));
  }

  _createClass(Login, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, "Login");
    }
  }]);

  return Login;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express_http_proxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-http-proxy */ "./node_modules/express-http-proxy/index.js");
/* harmony import */ var express_http_proxy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_http_proxy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-config */ "react-router-config");
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/server/utils.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store */ "./src/store/index.js");
/* harmony import */ var _Routers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Routers */ "./src/Routers.js");






var app = express__WEBPACK_IMPORTED_MODULE_0___default()();
app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.static('public'));
app.use('/api', express_http_proxy__WEBPACK_IMPORTED_MODULE_1___default()('http://yapi.demo.qunar.com', {
  proxyReqPathResolver: function proxyReqPathResolver(req) {
    return "/mock/63165/ssr/api".concat(req.url);
  }
}));
app.get('*', function (req, res) {
  var store = Object(_store__WEBPACK_IMPORTED_MODULE_4__["getStore"])(); // 根据路由路径，在store中添加数据

  var matchedRoutes = Object(react_router_config__WEBPACK_IMPORTED_MODULE_2__["matchRoutes"])(_Routers__WEBPACK_IMPORTED_MODULE_5__["default"], req.path);
  var promises = [];
  matchedRoutes.forEach(function (item) {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store));
    }
  });
  Promise.all(promises).then(function () {
    res.send(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["render"])(store, _Routers__WEBPACK_IMPORTED_MODULE_5__["default"], req));
  });
});
var server = app.listen(3000, function () {
  console.log("server start at port 3000");
});

/***/ }),

/***/ "./src/server/request.js":
/*!*******************************!*\
  !*** ./src/server/request.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var instance = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: 'http://yapi.demo.qunar.com/mock/63165/ssr'
});
/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./src/server/utils.js":
/*!*****************************!*\
  !*** ./src/server/utils.js ***!
  \*****************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-config */ "react-router-config");
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);





var render = function render(store, routes, req) {
  var content = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_1__["renderToString"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_4__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["StaticRouter"], {
    location: req.path,
    context: {}
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(react_router_config__WEBPACK_IMPORTED_MODULE_3__["renderRoutes"])(routes)))));
  return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>ssr</title>\n</head>\n<body>\n    <div id=\"root\">".concat(content, "</div>\n    <script >\n    window.context={\n      state:").concat(JSON.stringify(store.getState()), "\n    }\n</script>\n    <script src=\"index.js\"></script>\n</body>\n</html>\n");
};

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: getStore, getClientStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStore", function() { return getStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClientStore", function() { return getClientStore; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ "redux-thunk");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _containers_Home_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../containers/Home/store */ "./src/containers/Home/store/index.js");
/* harmony import */ var _client_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../client/request */ "./src/client/request.js");
/* harmony import */ var _server_request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../server/request */ "./src/server/request.js");





var reducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  home: _containers_Home_store__WEBPACK_IMPORTED_MODULE_2__["reducer"]
});
var getStore = function getStore() {
  return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(reducer, Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1___default.a.withExtraArgument(_server_request__WEBPACK_IMPORTED_MODULE_4__["default"])));
};
var getClientStore = function getClientStore() {
  var defaultStore = window.context.state;
  return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(reducer, defaultStore, Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1___default.a.withExtraArgument(_client_request__WEBPACK_IMPORTED_MODULE_3__["default"])));
};

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "raw-body":
/*!***************************!*\
  !*** external "raw-body" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("raw-body");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router-config":
/*!**************************************!*\
  !*** external "react-router-config" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map