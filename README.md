# URL Query Builder

## Install
```
npm i url-query-builder --save
yarn add url-query-builder --save
```

## BREAKING CHANGES v3
- rename method `add` to `set`
- delete method `change`
- rename method `getUrl` to `get`
- rename static method `getClearUrl` to `clearUrl`

## Usage
```js
import URLQueryBuilder from 'url-query-builder'

// create instance
const q = new URLQueryBuilder('example.com') // => example.com?
// with query in url
const q1 = new URLQueryBuilder('example.com?a=b') // => example.com?a=b
// with query by param, can be string
const q2 = new URLQueryBuilder('example.com', 'a=b') // => example.com?a=b
// or object
const q3 = new URLQueryBuilder('example.com', {a: 'b'}) // => example.com?a=b

// add queries
// update queries
q.set('a', 'b') // => example.com?a=b
q.set({a: 'b'}) // => example.com?a=b

// delete queries
q.delete('a') // => example.com?

// reset queries
q.reset() // => example.com?
q.reset({a: 'b'}) // => example.com?a=b

// get queries
q.get(); // example.com?a=b
```
