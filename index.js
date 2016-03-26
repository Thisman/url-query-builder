/**
*   Parse queries
*   @param {Object|string} queries
*   @return {Object} parsed queries
*/
function parseQueries (queries) {
    var parsedQueries = {};
    var paramType = typeof queries;

    switch(paramType) {
    	case "undefined": break; // should not throw error
    	case "object":
	        parsedQueries = queries;
    		break;
    	case "string":
	        var queriesArray = queries.split("&");
	        for(var i = 0; i < queriesArray.length; i++) {
	        	if(queriesArray[i].indexOf("=") < 0) 
	        		continue;

	            var query = queriesArray[i].split("=");
		        parsedQueries[query[0]] = query[1];
	        }
    		break;

    	default: 
    		throw new Error("param queries must have a string or an object type");
    }
    return parsedQueries;
}
/**
*	Parse queries from inital url string
*	@param {string} url
*/
function parseQueriesFromUrl(url) {
	var paramType = typeof url;
	var queries = {};

	switch(paramType) {
		case "undefined": break;
		case "string":
		    var queries = url.split("?")[1];
		    queries = parseQueries(queries);
			break;
		default:
	        throw new Error("param url must be a string or undefined");
	}

    return queries;
}
/**
*   get a clear url without query
*	@param {string} url
*	@return {string} url without query string
*/
function getClearUrl(url) {
	var paramType = typeof url;
	var clearedUrl = '';

	switch(paramType) {
		case "undefined": break;
		case "string":
			clearedUrl = url.split("?")[0];
			break;
		default:
	        throw new Error("param url must be a string or undefined");
	}

    return clearedUrl;
}


/**
*   @constructor
*   @param {string} url
*   @param {string|object|undefined} queries
*/
module.exports =  function URLQueryBuilder (url, queries) {
    this.url = getClearUrl(url);
    this.queries = parseQueriesFromUrl(url);

    var queriesFromParam = parseQueries(queries);
    for(var i in queriesFromParam)
        this.queries[i] = queriesFromParam[i];

    
    /**
     *	Get a current url with queries
     */
    URLQueryBuilder.prototype.getUrl = function() {
        var url = this.url + "?";
        for(var name in this.queries) {
            url += name + "=" + this.queries[name] + "&";
        }
     
        return url;
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
        if(!this.queries[name])
             throw new Error("Can't delete. Query: '" + name + "' not exists");
     
        delete this.queries[name];
        return this;
    };

    /**
     *	Change query by name
     *	@param {string} name, query what will be changed
     *	@param {string|number} value, new value for query
     */
    URLQueryBuilder.prototype.change = function(name, value) {
        if(!this.queries[name])
            throw new Error("Can't change. Query: '" + name + "' not exists");
     
        this.queries[name] = value.toString();
        return this;
    };

    /**
     * 	Add new query
     * 	@param {string} name, name of new query
     * 	@param {string|number} value, value for new query
     */
    URLQueryBuilder.prototype.add = function(name, value) {
    	var paramType = typeof name;

    	switch(paramType) {
    		case "string":
	            if(this.queries[name])
	                throw new Error("Can't add. Query: '" + name + "' already exists");
	         
	            this.queries[name] = value.toString();
    			break;
    		case "object":
	            var queries = name;
	            for(var i in queries) 
	            	this.add(i, queries[i]);
    			break;

    		default:
    			throw new Error("Unknow type of param name. Type must be a string or an object")
    	}

        return this;
    };


    /**
     * 	Clear query string
     * 	@param {string|object} queries
     */
    URLQueryBuilder.prototype.reset = function(queries) {
    	this.queries = {};
    	if(typeof queries != 'undefined') {
    		var queriesFromParam = parseQueries(queries);
    		this.add(queriesFromParam);
    	}

        return this;
    };
}