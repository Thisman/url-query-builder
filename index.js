/**
*	Merge two objects
*/
function mergeObj(obj1, obj2) {
	var result = {};
	for(var i in obj1) result[i] = obj1[i];
	for(var j in obj2) result[j] = obj2[j];

	return result;
}
/**
*   Parse queries
*   @param {Object|string} queries
*   @return {Object} parsed queries
*/
function parseQueries (queries) {
    var parsedQueries = {};

    if(typeof queries === "string") {
        var queriesArray = queries.split("&");
        for(var i = 0; i < queriesArray.length; i++) {
            var query = queriesArray[i].split("=");
            // check to valud data
            if(query.length == 2)
                parsedQueries[query[0]] = query[1];
        }       
    } else if(typeof (queries === "object") && queries) { // typeof null/undefined === "object"
        parsedQueries = queries; 
    }

    return parsedQueries;
}
/**
*	Parse queries from inital url string
*	@param {string} url
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
*	@param {string} url
*	@return {string} url without query string
*/
function getClearUrl(url) {
	var clearedUrl = '';

	if(typeof url === 'string')
		clearedUrl = url.split("?")[0];

    return clearedUrl;
}


/**
*   check is certain value is null
*   @param {any} value
*   return {boolean} true if value is null
*/



/**
*   @constructor
*   @param {string} url
*   @param {string|object|undefined} queries
*/

/**
*   TODO
*   deep parse object/arrays
*   es6 syntax
*/
module.exports =  function URLQueryBuilder (url, queries) {
    this.url = getClearUrl(url);
    this.queries = parseQueriesFromUrl(url);

    var queriesFromParam = parseQueries(queries);
    this.queries = mergeObj(this.queries, queriesFromParam);

    
    /**
     *	Get a current url with queries
     */
    URLQueryBuilder.prototype.getUrl = function() {
        var url = this.url;
        var queries = '?';
        for(var name in this.queries) {
            var query = this.queries[name]
            if(
                query == undefined||
                query == null
            ) continue;

            queries += (name + "=" + query + "&");
        }
     
        return url + queries;
    };
    

    /**
     *	Get clear url without queries
     */
    URLQueryBuilder.prototype.getClearUrl = function() {

    	return this.url;
    };

    /**
     *	Delete query by name
     *	@param {string} name, query that will be deleted
     */
    URLQueryBuilder.prototype.delete = function(name) {
        delete this.queries[name];
        
        return this;
    };

    /**
     *	Change query by name
     *	@param {string} name, query what will be changed
     *	@param {string|number} value, new value for query
     */
    URLQueryBuilder.prototype.change = function(name, value) {
        this.queries[name] = value;

        return this;
    };

    /**
     * 	Add new query
     * 	@param {string} name, name of new query
     * 	@param {string|number} value, value for new query
     */
    URLQueryBuilder.prototype.add = function(name, value) {
        if(typeof name === "string") {
            this.queries[name] = value;
        } else if(typeof name === "object" && name) {
            var queries = name;
            for(var i in queries) 
                this.add(i, queries[i]);
        } else {
            throw new Error("Param 'name' must be a string or an object");
        }

        return this;
    };


    /**
     * 	Clear query string
     * 	@param {string|object} queries
     */
    URLQueryBuilder.prototype.reset = function(queries) {
		this.queries = parseQueries(queries);

        return this;
    };


    /**
     * 	Check if queries has specific query
     * 	@return {boolean} true if has, false if not
     */
    URLQueryBuilder.prototype.has = function(name) {

    	return (name in this.queries);
    };
}
