;(function(namespace) {

    'use strict';

    var q = require('q');
    var mix = require('mix');
    var looksLike = require('looks-like');

    var defaultOptions;

    /**
     * Responsibility: promisify synchronous or 
     * asychronous functions that have been 
     * implemented using the callback style.
     */
    function promisify(fn, options) {
        var deferred, argumentsToPropagate, action;

        if (typeof fn !== 'function') {
            throw 'fn not a function';
        }

        validate(options = mix({}, defaultOptions, options));

        deferred = q.defer();
        argumentsToPropagate = [arguments[0], deferred.promise, done, deferred.reject];
        action = options.isAsyncFn(fn) ? async : sync;

        action.apply(null, argumentsToPropagate);

        /**
         * Some libraries do funny things
         * with argumetns and need 
         * manipulation to play fair with q.
         */
        function done() {
            deferred.resolve.apply(deferred, options.argsTransform.apply(null, arguments));
        }
    }

    /**
     * Returns a function that when invoked will 
     * invoke the wrapped function with the last 
     * two arguments being done and fail 
     * respectively.
     */
    function async(fn, promise, done, fail) {
        return function() {
            var argumentsToUse = [].slice.call(arguments).concat([done, fail]);
            try {
                fn.apply(this, argumentsToUse);
            } catch (err) {
                fail.call(this, err);
            } finally {
                return promise;
            }
        };
    }

    function sync(fn, promise, done, fail) {
        return function() {
            try {
                done.call(this, fn.apply(this, arguments));
            } catch (err) {
                fail.call(this, err);
            } finally {
                return promise;
            }
        };
    }

    function isAsync(fn) {
        return fn.length === 3;
    }

    function argumentsIdentity() {
        return arguments;
    }

    defaultOptions = {
        isAsyncFn: isAsync,
        argsTransform: argumentsIdentity
    };

    function validate(options) {
        var result = looksLike(options, defaultOptions);

        if (!result.value) {
            throw 'invalid options (' + result.key + ').';
        }
    }

    namespace.promisify = promisify;

}(namespace));