/**
*   TODO
*   deep parse object/arrays
*/

/**
*   @constructor
*   @param {string} url
*   @param {string|object|undefined} queries
*/
export default class URLQueryBuilder {
	constructor(url, queries) {
	    this.url = URLQueryBuilder.getClearUrl(url);
	    this.queries = Object.assign(
	    	URLQueryBuilder.parseQueriesFromUrl(url),
	    	URLQueryBuilder.parseQueries(queries)
	    );
	}
    
    /**
     *	Get a current url with queries
     */
    getUrl() {
        let {url, queries} = this;
        let queriesStr = '';
        for(let prop in queries) {
            let value = queries[prop];
            if(
                value != undefined ||
                value != null
            ) {
	            queriesStr += `${prop}=${value}&`;
            };
        }
     
        // delete last unnessesary &
        queriesStr = queriesStr.slice(0, -1);
        return `${url}?${queriesStr}`;
    };

    /**
     *	Get clear url without queries
     */
    getClearUrl() {

    	return this.url;
    };

    /**
     *	Delete query by name
     *	@param {string} name, query that will be deleted
     */
    delete(name) {
        delete this.queries[name];
        
        return this;
    };

    /**
     *	Change query by name
     *	@param {string} name, query what will be changed
     *	@param {string|number} value, new value for query
     */
    change(name, value) {
        this.queries[name] = value;

        return this;
    };

    /**
     * 	Add new query
     * 	@param {string} name, name of new query
     * 	@param {string|number} value, value for new query
     */
    add(name = {}, value) {
        if(typeof name === "string") {
            this.queries[name] = value;
        } else if(
        	typeof name === "object" &&
        	name != null
        ) {
            let queries = name;
            for(let i in queries) {
                this.add(i, queries[i]);
            }
        } else {
            throw new Error("Param 'name' must be a string or an object");
        }

        return this;
    };

    /**
     * 	Clear query string
     * 	@param {string|object} queries
     */
    reset(queries) {
		this.queries = URLQueryBuilder.parseQueries(queries);

        return this;
    };

    /**
     * 	Check if queries has specific query
     * 	@return {boolean} true if has, false if not
     */
    has(name) {
    	return (name in this.queries);
    };
}
/**
*   get a clear url without query
*	@param {string} url
*	@return {string} url without query string
*/
URLQueryBuilder.getClearUrl = function(url) {
	let clearedUrl = '';

	if(typeof url === 'string') {
		[clearedUrl] = url.split("?");
	}

    return clearedUrl;
}
/**
*	Parse queries from inital url string
*	@param {string} url
*/
URLQueryBuilder.parseQueriesFromUrl = function(url) {
	let queries = {};

	if(typeof url === 'string') {
		[,queries] = url.split("?");
		queries = URLQueryBuilder.parseQueries(queries);
	}

    return queries;
}
/**
*   Parse queries
*   @param {Object|string} queries
*   @return {Object} parsed queries
*/
URLQueryBuilder.parseQueries = function(queries = {}) {
    let parsedQueries = {};
    let typeOfQueries = typeof queries;

    if(typeOfQueries === "string") {
        let queriesArray = queries.split("&");
        for(let i = 0; i < queriesArray.length; i++) {
        	let [prop, value] = queriesArray[i].split("=");
            parsedQueries[prop] = value;
        }       
    } else if(
    	typeOfQueries === "object" && 
    	queries != null
    ) {
        parsedQueries = queries; 
    }

    return parsedQueries;
}