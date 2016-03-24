## URL Query Builder


## Usage
```
var url = 'example.com';
var queryBuilder = new QueryBuilder(url);

/** Add query */
queryBuilder.add("queryName", "value");
queryBuilder.getUrl(); // => example.com?queryName=value&

/** Change query */
queryBuilder.change("queryName", "newValue");
queryBuilder.getUrl(); // => example.com?queryName=newValue&

/** Delete query */
queryBuilder.delete("queryName");
queryBuilder.getUrl(); // => example.com?
```