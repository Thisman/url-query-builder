/**
*   TODO
*   deep parse object/arrays
*/

export default class URLQueryBuilder {
    /**
     *   @constructor
     *   @param {string} url
     *   @param {string|object|undefined} queries
     */
    constructor(url = '', queries = {}) {
        this.url = URLQueryBuilder.getClearUrl(url);
        this.queries = Object.assign(
            URLQueryBuilder.parseQueriesFromUrl(url),
            URLQueryBuilder.parseQueries(queries)
        );
    }

    /**
     *  Get a clear url without query
     *	@param {string} url
     *	@return {string} url without query string
     */
    static getClearUrl(url) {
        let clearedUrl = '';

        if(typeof url === 'string') {
            [clearedUrl] = url.split("?");
        } else {
            throw new Error(
                `Param 'url' in method 'getClearUrl' must be a string got ${url}`
            );
        }

        return clearedUrl;
    }

    /**
     *	Parse queries from inital url string
     *	@param {string} url
     */
    static parseQueriesFromUrl(url) {
        let queries = {};

        if(typeof url === 'string') {
            [,queries] = url.split("?");
            queries = URLQueryBuilder.parseQueries(queries);
        } else {
            throw new Error(
                `Param 'url' in method 'parseQueriesFromUrl' must be a string got ${url}`
            );
        }

        return queries;
    }

    /**
     *   Parse queries
     *   @param {Object|string} queries
     *   @return {Object} parsed queries
     */
    static parseQueries(queries = {}) {
        let parsedQueries = {};
        const typeOfQueries = typeof queries;

        if(typeOfQueries === "string") {
            let queriesArray = queries.split("&");
            for(let i = 0; i < queriesArray.length; i++) {
                let [prop, value] = queriesArray[i].split("=");
                parsedQueries[prop] = value;
            }
        } else if(typeOfQueries === "object" && queries !== null) {
            parsedQueries = queries;
        }

        return parsedQueries;
    }
    
    /**
     *	Get a current url with queries
     */
    getUrl() {
        const {url, queries} = this;
        let queriesStr = '';
        for(let prop in queries) {
            const value = queries[prop];
            if(value !== undefined && value !== null) {
	            queriesStr += `${prop}=${value}&`;
            };
        }
     
        // delete last unnecessary &
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
    add(name = '', value) {
        if(typeof name === "string") {
            this.queries[name] = value;
        } else if(typeof name === "object" && name !== null) {
            const queries = name;
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
    reset(queries = '') {
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