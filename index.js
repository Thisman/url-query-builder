"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URLQueryBuilder = function () {
    function URLQueryBuilder(url, queries) {
        _classCallCheck(this, URLQueryBuilder);

        this.url = URLQueryBuilder.getClearUrl(url);
        this.queries = Object.assign(URLQueryBuilder.parseQueriesFromUrl(url), URLQueryBuilder.parseQueries(queries));
    }

    _createClass(URLQueryBuilder, [{
        key: "getUrl",
        value: function getUrl() {
            var url = this.url;
            var queries = this.queries;

            var queriesStr = '';
            for (var prop in queries) {
                var value = queries[prop];
                if (value != undefined || value != null) {
                    queriesStr += prop + "=" + value + "&";
                };
            }

            queriesStr = queriesStr.slice(0, -1);
            return url + "?" + queriesStr;
        }
    }, {
        key: "getClearUrl",
        value: function getClearUrl() {

            return this.url;
        }
    }, {
        key: "delete",
        value: function _delete(name) {
            delete this.queries[name];

            return this;
        }
    }, {
        key: "change",
        value: function change(name, value) {
            this.queries[name] = value;

            return this;
        }
    }, {
        key: "add",
        value: function add() {
            var name = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var value = arguments[1];

            if (typeof name === "string") {
                this.queries[name] = value;
            } else if ((typeof name === "undefined" ? "undefined" : _typeof(name)) === "object" && name != null) {
                var queries = name;
                for (var i in queries) {
                    this.add(i, queries[i]);
                }
            } else {
                throw new Error("Param 'name' must be a string or an object");
            }

            return this;
        }
    }, {
        key: "reset",
        value: function reset(queries) {
            this.queries = URLQueryBuilder.parseQueries(queries);

            return this;
        }
    }, {
        key: "has",
        value: function has(name) {
            return name in this.queries;
        }
    }]);

    return URLQueryBuilder;
}();

exports.default = URLQueryBuilder;

URLQueryBuilder.getClearUrl = function (url) {
    var clearedUrl = '';

    if (typeof url === 'string') {
        var _url$split = url.split("?");

        var _url$split2 = _slicedToArray(_url$split, 1);

        clearedUrl = _url$split2[0];
    }

    return clearedUrl;
};

URLQueryBuilder.parseQueriesFromUrl = function (url) {
    var queries = {};

    if (typeof url === 'string') {
        var _url$split3 = url.split("?");

        var _url$split4 = _slicedToArray(_url$split3, 2);

        queries = _url$split4[1];

        queries = URLQueryBuilder.parseQueries(queries);
    }

    return queries;
};

URLQueryBuilder.parseQueries = function () {
    var queries = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var parsedQueries = {};
    var typeOfQueries = typeof queries === "undefined" ? "undefined" : _typeof(queries);

    if (typeOfQueries === "string") {
        var queriesArray = queries.split("&");
        for (var i = 0; i < queriesArray.length; i++) {
            var _queriesArray$i$split = queriesArray[i].split("=");

            var _queriesArray$i$split2 = _slicedToArray(_queriesArray$i$split, 2);

            var prop = _queriesArray$i$split2[0];
            var value = _queriesArray$i$split2[1];

            parsedQueries[prop] = value;
        }
    } else if (typeOfQueries === "object" && queries != null) {
        parsedQueries = queries;
    }

    return parsedQueries;
};
