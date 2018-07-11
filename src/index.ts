interface IURLQueryBuilder {
    set(name: string|object, value: string): this,
    get(): string,
    getClearUrl(): string,
    delete(name: string): this,
    reset(queries: string|object): this,
    has(name: string): boolean
}

const clearUrl = (url: string): string => {
    let clearedUrl: string = '';

    if(typeof url === 'string') {
        [clearedUrl] = url.split("?");
    } else {
        throw new Error(
            `Param 'url' in method 'clearUrl' must be a string got ${url}`
        );
    }

    return clearedUrl;
}

const parseQueries = (queries: any = {}): any => {
    let parsedQueries: object = {};
    const typeOfQueries: string = typeof queries;

    if(typeOfQueries === "string") {
        let queriesArray: string[] = queries.split("&");
        for(let i = 0; i < queriesArray.length; i++) {
            let [prop, value]: any = queriesArray[i].split("=");
            parsedQueries[prop] = value;
        }
    } else if(typeOfQueries === "object" && queries !== null) {
        parsedQueries = queries;
    }

    return parsedQueries;
}

const parseQueriesFromUrl = (url: string): any => {
    let queries: any = {};

    if(typeof url === 'string') {
        [,queries] = url.split("?");
        queries = parseQueries(queries);
    } else {
        throw new Error(
            `Param 'url' in method 'parseQueriesFromUrl' must be a string got ${url}`
        );
    }

    return queries;
}

export default class URLQueryBuilder implements IURLQueryBuilder {
    private url: string;
    private queries: object;

    constructor(url: string = '', queries: object = {}) {
        this.url = clearUrl(url);
        this.queries = (<any>Object).assign(
            parseQueriesFromUrl(url),
            parseQueries(queries)
        );
    }
    
    get() {
        const {url, queries} = this;
        let queriesStr: string = '';
        for(let prop in queries) {
            const value: string = queries[prop];
            if(value !== undefined && value !== null) {
	            queriesStr += `${prop}=${value}&`;
            };
        }
     
        // delete last unnecessary &
        queriesStr = queriesStr.slice(0, -1);
        return `${url}?${queriesStr}`;
    };
    getClearUrl() {
    	return this.url;
    };
    delete(name) {
        delete this.queries[name];
        
        return this;
    };
    set(name, value) {
        if(typeof name === "string") {
            this.queries[name] = value;
        } else if(typeof name === "object" && name !== null) {
            const queries: object = name;
            for(let i in queries) {
                this.set(i, queries[i]);
            }
        } else {
            throw new Error(`Param 'name' must be a string or an object, got ${name}`);
        }

        return this;
    };
    reset(queries= '') {
		this.queries = parseQueries(queries);

        return this;
    };
    has(name) {
    	return this.queries.hasOwnProperty(name);
    };
}