# URL Query Builder


## Usage
```js
// nodejs style
var URLQueryBuilder = require("url-query-builder");

// es6 way
import URLQueryBuilder from "url-query-builder";

// create instance
var q = new URLQueryBuilder("example.com");

// with query in url
var q1 = new URLQueryBuilder("example.com?name=value"); // => example.com?name=value&

// with initial query, can be string
var q2 = new URLQueryBuilder("example.com", "name=value"); // => example.com?name=value&

// or object
var q3 = new URLQueryBuilder("example.com", {
	"name": "value", 
	"name2": "value2"
}); // => example.com?name=value&name2=value2&


q.add("num1", 100) // => example.com?num1=100
	.add("num2", 200) // => example.com?num1=100&num2=200&
	.change("num1", 150) // => example.com?num1=150&num2=200&
	.delete("num2") // => example.com?num1=100&
	.add("num3", "300"); // => example.com?num1=100&num3=300&
	.getUrl(); // => example.com?num1=100&num3=300&

// reset queries
q.reset().getUrl(); // => example.com?

// or reset with new queries
q.reset({name: 100}); // => example.com?name=100&
```

## Install
```
npm i url-query-builder
```

## Test
- *mocha.js* 
- *should.js*
```
npm run test
```
