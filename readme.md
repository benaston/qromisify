# qromisify

Promisifies callback-based functions using q.

File size: **xxx bytes**.<br/>
Supported platforms: **server and browser**.<br/>
Supported language versions: **ES5 and above**.

If you use this library in your software please tweet me @benastontweet.

## Installation

```npm install qromisify```

## Example

```javascript
var promisify = require('qromisify');

function asyncFn(options, done, fail) {
	setTimeout(done, 0);
}

promisify(asyncFn)(options)
  .then(function(result) {
    // invoked after completion of asyncFn
  });


function syncFn(options) {
	// Do something synchronous...
}

promisify(syncFn)(options)
  .then(function(result) {
    // invoked synchronously
  });

function asyncFn2(done, fail) {
	// Do something synchronous...
}

function isAsync(fn) {
	return fn.length === 2; // Default is 3!
}

promisify(asyncFn2, {isAsyncFn: isAsync})()
  .then(function(result) {
    // invoked after completion of asyncFn2
  });
```

## License & Copyright

This software is released under the MIT License. It is Copyright 2015, Ben Aston. I may be contacted at ben@bj.ma.

## How to Contribute

Pull requests including bug fixes, new features and improved test coverage are welcomed. Please do your best, where possible, to follow the style of code found in the existing codebase.