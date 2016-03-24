module.exports =  function URLQueryBuilder (url) {
    this.url = url || "";
    this.query = {};

    /**
     * Get a current url with queries
     */
    URLQueryBuilder.prototype.getUrl = function() {
        var url = this.url + "?";
        for(var name in this.query) {
            url += name + "=" + this.query[name] + "&";
        }
     
        return url;
    };

    /**
     * Delete query by name
     * @param {string} name, query that will be deleted
     */
    URLQueryBuilder.prototype.delete = function(name) {
        if(!this.query[name])
             throw new Error("Can't delete. Query: '" + name + "' not exists");
     
        delete this.query[name];
        return this;
    };

    /**
     * Change query by name
     * @param {string} name, query what will be changed
     * @param {string|number} value, new value for query
     */
    URLQueryBuilder.prototype.change = function(name, value) {
        if(!this.query[name])
            throw new Error("Can't change. Query: '" + name + "' not exists");
     
        this.query[name] = value.toString();
        return this;
    };

    /**
     * Add new query
     * @param {string} name, name of new query
     * @param {string|number} value, value for new query
     */
    URLQueryBuilder.prototype.add = function(name, value) {
        if(this.query[name])
            throw new Error("Can't add. Query: '" + name + "' already exists");
     
        this.query[name] = value.toString();
        return this;
    };

};