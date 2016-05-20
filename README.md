# URL Query Builder


## Usage
```js
// nodejs style
var URLQueryBuilder = require("url-query-builder").default;
// es6 way
import URLQueryBuilder from "url-query-builder";

// create instance
var q = new URLQueryBuilder("example.com"); // => example.com?
// with query in url
var q1 = new URLQueryBuilder("example.com?a=b"); // => example.com?a=b
// with query by param, can be string
var q2 = new URLQueryBuilder("example.com", "a=b"); // => example.com?a=b
// or object
var q3 = new URLQueryBuilder("example.com", {a: "b"}); // => example.com?a=b


// add queries
q.add("a", "b") // => example.com?a=b
q.add({a: "b"}) // => example.com?a=b

// change queries
q.change("a","c") // => example.com?a=c

// delete queries
q.delete("a") // => example.com?

// reset queries
q.reset(); // => example.com?
q.reset({a: "b"}); // => example.com?a=b
```

## Install
```
npm i url-query-builder --save
```
