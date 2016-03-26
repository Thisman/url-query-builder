/**
*   version for browser
*/


(function () {
    /**
    *   Parse queries
    *   @param {Object|string} queries
    *   @return {Object} parsed queries
    */
    function parseQueries (queries) {
        var parsedQueries = {};
        var paramType = typeof queries;

        switch(paramType) {
            case "object":
                parsedQueries = queries;
                break;
            case "string":
                var queriesArray = queries.split("&");
                for(var i = 0; i < queriesArray.length; i++) {
                    var query = queriesArray[i].split("=");
                    // check to valud data
                    if(query.length == 2)
                        parsedQueries[query[0]] = query[1];
                }
                break;

            default: break;
        }
        return parsedQueries;
    }
    /**
    *   Parse queries from inital url string
    *   @param {string} url
    */
    function parseQueriesFromUrl(url) {
        var queries = {};
        
        if(typeof url === 'string') {
            queries = url.split("?")[1];
            queries = parseQueries(queries);
        }

        return queries;
    }
    /**
    *   get a clear url without query
    *   @param {string} url
    *   @return {string} url without query string
    */
    function getClearUrl(url) {
        var clearedUrl = '';

        if(typeof url === 'string')
            clearedUrl = url.split("?")[0];

        return clearedUrl;
    }


    /**
    *   @constructor
    *   @param {string} url
    *   @param {string|object|undefined} queries
    */
    function URLQueryBuilder (url, queries) {
        this.url = getClearUrl(url);
        this.queries = parseQueriesFromUrl(url);

        var queriesFromParam = parseQueries(queries);
        for(var i in queriesFromParam)
            this.queries[i] = queriesFromParam[i];

        
        /**
         *  Get a current url with queries
         */
        URLQueryBuilder.prototype.getUrl = function() {
            var url = this.url;
            var queries = '?';
            for(var name in this.queries) {
                queries += (name + "=" + this.queries[name] + "&");
            }
         
            return url + queries;
        };
        

        /**
         *  Get clear url without queries
         */
        URLQueryBuilder.prototype.getClearUrl = function() {

            return this.url;
        };

        /**
         *  Delete query by name
         *  @param {string} name, query that will be deleted
         */
        URLQueryBuilder.prototype.delete = function(name) {
            delete this.queries[name];
            return this;
        };

        /**
         *  Change query by name
         *  @param {string} name, query what will be changed
         *  @param {string|number} value, new value for query
         */
        URLQueryBuilder.prototype.change = function(name, value) {
            this.queries[name] = value.toString();
            return this;
        };

        /**
         *  Add new query
         *  @param {string} name, name of new query
         *  @param {string|number} value, value for new query
         */
        URLQueryBuilder.prototype.add = function(name, value) {
            var paramType = typeof name;

            switch(paramType) {
                case "string":
                    this.queries[name] = value.toString();
                    break;
                case "object":
                    var queries = name;
                    for(var i in queries) this.add(i, queries[i]);
                    break;

                default:
                    throw new Error("Param name must be a string or an object");
            }

            return this;
        };


        /**
         *  Clear query string
         *  @param {string|object} queries
         */
        URLQueryBuilder.prototype.reset = function(queries) {
            this.queries = parseQueries(queries);

            return this;
        };


        /**
         *  Check if queries has specific query
         *  @return {boolean} true if has, false if not
         */
        URLQueryBuilder.prototype.has = function(name) {

            return (name in this.queries);
        };
    }

    window.URLQueryBuilder = URLQueryBuilder;

})(window);