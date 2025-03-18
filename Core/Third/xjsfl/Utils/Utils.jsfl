// ------------------------------------------------------------------------------------------------------------------------
//
//  ██  ██  ██   ██ ██
//  ██  ██  ██      ██
//  ██  ██ █████ ██ ██ █████
//  ██  ██  ██   ██ ██ ██
//  ██  ██  ██   ██ ██ █████
//  ██  ██  ██   ██ ██    ██
//  ██████  ████ ██ ██ █████
//
// ------------------------------------------------------------------------------------------------------------------------
// Utils

/**
 * Utils
 * @overview    static library of utility functions
 * @instance    Utils
 */

define(function () {
    // xjsfl.init(this, ['Folder', 'JSON', 'SimpleTemplate', 'URI', 'XML']);

    // ---------------------------------------------------------------------------------------------------------------
    // class

    /**
     * Miscellaneous utility functions
     * @class Utils
     */
    Utils = {
        /**
         * Generic function to recurse a data structure, processing nodes and children with callbacks
         * @param    {Object}    rootElement        The root element to start processing on
         * @param    {Function}    fnChild            A callback function to call on child elements. Should be of the format "function process(value, index, depth){ ... }"
         * @param    {Function}    fnContents        An optional callback function of the format which should return an object which can be processed for its contents, i.e. folder.contents
         * @param    {Object}    scope            An optional Object on which to appy "this" scope to
         * @returns    {value}                        The result of the passed fnChild function
         */
        walk: function (rootElement, fnChild, fnContents, scope) {
            // processing function
            function process(element, index) {
                // process the element with the callback
                var result = fnChild.apply(scope, [element, index, depth]);

                // Now, depending on the result, we do one of three things:
                /*
                    - Boolean false		Skip processing of this element
                    - Boolean true		Stop processing and return this element
                    - no return value	Continue processing child elements
                */

                // if the result is a Boolean true, consider this element found, and return it
                if (result === true) {
                    return element;
                }

                // if false was not returned, process the current element
                else if (result !== false) {
                    // get the custom contents, or just use the object itself if no callback supplied
                    var contents = fnContents
                        ? fnContents.apply(scope, [element, index, depth])
                        : element;

                    // process contents
                    if (contents && !((typeof contents) in simpleTypes)) {
                        depth++;
                        if (contents instanceof Array) {
                            for (var i = 0; i < contents.length; i++) {
                                var result = process(contents[i], i);
                                if (result) {
                                    return result;
                                }
                            }
                        } else {
                            for (var name in contents) {
                                var result = process(contents[name], name);
                                if (result) {
                                    return result;
                                }
                            }
                        }
                        depth--;
                    }
                }

                // return null if everything is normal
                return null;
            }

            // variables
            var simpleTypes = {
                number: 1,
                string: 1,
                boolean: 1,
                xml: 1,
                function: 1,
                undefined: 1
            };

            // defaults
            scope = scope || window;
            var depth = 0;

            // process
            return process(rootElement, 0);
        },

        // ---------------------------------------------------------------------------------------------------------------
        // # OOP methods

        /**
         * A better typeof function
         * @param    {Object}    value    Any object or value
         * @returns    {String}            The type of the object
         * @see                            http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
         */
        getType: function (value) {
            // slight alteration here, otherwise null and undefined return 'window'
            if (value === null) return null;
            if (typeof value === 'undefined') return 'undefined';
            return Object.prototype.toString
                .call(value)
                .match(/\s([a-zA-Z]+)/)[1]
                .toLowerCase();
        },

        /**
         * Get the class of an object as a string
         *
         * @param    {value}        value        Any value
         * @returns    {String}                The class name of the value i.e. 'String', 'Date', 'CustomClass'
         */
        getClass: function (value) {
            // return null if the value is not an object
            if (value === null || typeof value === 'undefined') return null;

            // return the object's class if it's a native type
            if (typeof value !== 'object') {
                var $class = Object.prototype.toString
                    .call(value)
                    .match(/\s([a-zA-Z]+)/)[1];
                if ($class !== 'Object') {
                    return $class;
                }
            }

            // if the value has a proper toString() method, i.e. "[object ClassName]" and is not a native Object, parse that
            var matches = value.toString().match(/^\[\w+\s*(\w+)/);
            if (matches && matches[1] && matches[1] !== 'Object') {
                return matches[1];
            }

            // otherwise, attempt to parse the constructor source
            var matches = value.constructor
                .toSource()
                .match(/^function\s*(\w+)/);
            if (matches && matches.length == 2) {
                // fail if the return value is an anonymous / wrapped Function
                if (matches[1] != 'Function') {
                    return matches[1];
                }

                // attempt to grab value.toSource() result
                else {
                    matches = value.toSource().match(/^function\s*(\w+)/);
                    if (matches && matches[1]) {
                        return matches[1];
                    }
                }
            }

            // if we still can't get it, return 'Object'
            return 'Object';
        },

        /**
         * Gets the prototype chain of an object
         * @param    {Object}    obj                An instantiated object
         * @param    {Boolean}    includeSource    An optional Boolean to include the original object
         * @returns    {Array}                        An Array of the original instantation object
         */
        getPrototypeChain: function (obj, includeSource) {
            var chain = includeSource ? [obj] : [];
            while (obj.__proto__) {
                obj = obj.__proto__;
                chain.push(obj);
            }
            return chain;
        },

        // ---------------------------------------------------------------------------------------------------------------
        // # File and URI methods

        /**
         * Returns a list of URIs for a given glob path, folder reference and optional condition
         * @param    {String}    folder        An absolute or relative folder path or URI (wildcards allowed)
         * @param    {Folder}    folder        A valid Folder instance
         * @param    {URI}        folder        A valid URI instance
         * @param    {Number}    $depth        An optional max depth to search to
         * @param    {Boolean}    $filesOnly    An optional Boolean to get files only
         * @param    {RegExp}    $filter        A RegExp to match each URI
         * @returns    {Array}                    An Array of URIs
         */
        getURIs: function (folder, $depth, $filesOnly, $filter, $extensions) {
            //TODO - check this works for recursive URIs
            //TODO - Pass true to set max depth to infinite

            // get URI
            var uri =
                folder instanceof URI
                    ? folder.uri
                    : folder instanceof Folder
                      ? folder.uri
                      : typeof folder === 'string'
                        ? URI.toURI(folder, 1)
                        : null;

            // path or URI
            if (uri) {
                if (/\/\*$/.test(uri)) {
                    uri = uri.replace('*', '');
                    return Utils.walkFolder(uri, true);
                } else if (FLfile.exists(uri)) {
                    return new Folder(uri).uris;
                }
            }

            // error if not exists, or not a glob
            throw new Error(
                'Error in Utils.getURIs(): The folder reference "' +
                    folder +
                    '" is not a valid folder reference'
            );

            // folder URI: c:/temp/
            // folder URI: c:/temp/*
            // name: 'template', 'library'
            // Array: ['template', 'filesystem'], 'library'
        },

        /**
         * Recursively trawl a folder's contents, optionally calling a callback per element (note that $ arguments may passed in any order)
         * @param    {String}    folder            The path or uri to a valid folder
         * @param    {Folder}    folder            A valid Folder instance
         * @param    {URI}        folder            A valid URI instance
         * @param    {Function}    $callback        An optional callback of the format callback(element, index, depth, indent) to call on each element. Return false to skip processing of that element. Return true to cancel all iteration.
         * @param    {Number}    $maxDepth        An optional max depth to recurse to, defaults to 100
         * @param    {Boolean}    $returnURIs        An optional Boolean to return all parsed URIs
         * @returns    {String}                    The URI of the current element if the callback returns true
         * @returns    {Array}                        An array of URIs or paths if returnURIs is set as true
         */
        walkFolder: function (folder, $callback, $maxDepth, $returnURIs) {
            // ------------------------------------------------------------
            // functions

            var indent;

            function process(element, index) {
                // callback
                var state = callback
                    ? callback(element, index, depth, indent)
                    : null;

                // return immediately if the callback returned true
                if (state === true) {
                    return element;
                }

                // process if the callback didn't return false (false == skip element)
                if (state !== false) {
                    // return if callback passed back true (true == stop all processing)
                    if (state === true) {
                        return true;
                    }

                    // collect uri
                    uris.push(element.uri);

                    // children
                    if (element instanceof Folder && depth < maxDepth) {
                        // dow down a level
                        depth++;
                        indent += '	';

                        // iterate
                        var contents = element.contents;
                        for (var i = 0; i < contents.length; i++) {
                            // catch long URI errors
                            if (contents[i].uri.length > 260) {
                                URI.throwURILengthError(contents[i].uri);
                            }

                            // process content
                            var result = process(contents[i], i);
                            if (result) {
                                return result;
                            }
                        }

                        // go up a level
                        indent = indent.substring(1);
                        depth--;
                    }
                }
            }

            // ------------------------------------------------------------
            // code

            // defaults
            var maxDepth = 100;
            var callback = null;
            var returnURIs = false;

            // parameter shift
            // for each(var arg in[$callback, $maxDepth, $returnURIs])
            [$callback, $maxDepth, $returnURIs].forEach(function (arg) {
                if (typeof arg === 'number') maxDepth = arg;
                else if (typeof arg === 'function') callback = arg;
                else if (typeof arg === 'boolean') returnURIs = arg;
            });

            // variables
            var uris = [];
            var indent = '';
            var depth = 0;
            var uri =
                folder instanceof URI
                    ? folder.uri
                    : folder instanceof Folder
                      ? folder.uri
                      : typeof folder === 'string'
                        ? URI.toURI(folder, 1)
                        : null;

            // process
            if (uri) {
                if (FLfile.exists(uri)) {
                    var folder = new Folder(uri);
                    var result = process(folder, 0);
                    uris.shift();
                    return returnURIs ? uris : result;
                }
                throw new Error(
                    'Error in Utils.walkFolder(): The folder reference "' +
                        folder +
                        '" does not exist'
                );
            }

            // error
            throw new Error(
                'Error in Utils.walkFolder(): The folder reference "' +
                    folder +
                    '" is not a valid folder reference'
            );
        },

        /**
         * Returns a multiline string, showing the file/folder hierarchy of an input array of paths or URIs
         * @param    {String}        source        A path or URI
         * @param    {URI}            source        A URI instance
         * @param    {Folder}        source        A Folder instance
         * @param    {Array}            source        An array of paths or URIs
         * @returns    {String}                    The hierarchial representation
         */
        makeTree: function (source, includeRoot) {
            var uri, paths;
            if (typeof source === 'string') {
                uri = URI.toURI(source, 1);
            } else if (source instanceof URI) {
                uri = source;
            } else if (source instanceof Folder) {
                uri = source.uri;
            } else if (Utils.isArray(source)) {
                paths = source;
            } else {
                throw new TypeError(
                    'TypeError in Utils.makeTree(): the parameter source "' +
                        source +
                        '" is invalid'
                );
            }

            if (uri) {
                paths = Utils.glob(uri + '**', true, true);
            }

            if (paths && paths.length) {
                // parameters
                if (includeRoot && uri) {
                    paths.push(URI.toPath(uri));
                }
                paths = paths.sort();

                // variables
                var segments, name, indent;
                var path = paths[0].replace('file:///', '').replace(/\/*$/, '');
                var depth = path.split('/').length - 1;
                var tree = '';

                // process
                // for each(path in paths)
                // paths.forEach(function(path)
                for (var i = 0; i < paths.length; i++) {
                    var path = paths[i];

                    path = path.replace('file:///', '').replace(/\/*$/, '');
                    if (path == '') {
                        continue;
                    }
                    segments = path.split('/');
                    name = segments.pop();
                    indent = '\t'.repeat(segments.length - depth);
                    tree += indent + '/' + name + '\n';
                }

                // return
                return tree;
            }
        },

        /**
         * Convert a tabbed list of folder/ and file tokens to a list of paths - essentially the opposite of Utils.makeTree() (note that $dollar param can be passed in any order)
         * @param        {String}        tree                A tabbed list of folder/ and file tokens
         * @param        {String}        tree                A valid URI to a file containing a tabbed list of folder/ and file tokens
         * @param        {Function}        $fnFile                An optional callback function to call for each file
         * @param        {Function}        $fnFolder            An optional callback function to call for each folder
         * @param        {Boolean}        $returnObjects        An optional boolean to return Folder and File objects rather than a list of paths
         * @returns        {Array}                                An Array of paths or Folder and File objects
         */
        makePaths: function (tree, $fnFile, $fnFolder, $returnObjects) {
            // parameter shift
            var fnFile, fnFolder, returnObjects;
            // for each(var param in[$fnFile, $fnFolder, $returnObjects])
            [$fnFile, $fnFolder, $returnObjects].forEach(function (param) {
                if (typeof param === 'boolean') {
                    returnObjects = param;
                } else if (typeof param === 'function') {
                    if (!fnFile) {
                        fnFile = param;
                    } else {
                        fnFolder = param;
                    }
                }
            });

            inspect([tree, fnFile, fnFolder, returnObjects]);

            // variables
            var text = URI.isFile(tree) ? xjsfl.file.load(tree) : tree;
            var lines = text.split(/[\r\n]+/);

            // callbacks
            fnFile = fnFile || function () {};
            fnFolder = fnFolder || function () {};

            // variables
            var path;
            var depth = 0;
            var segment, folder;
            var stack = [];
            var elements = [];

            // process lines
            // for each(var line in lines)
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];

                // grab line
                var matches = line.match(/(\s*)(.+)/);

                // if there's a match, preocess it
                if (matches && matches[2].trim() !== '') {
                    // variables
                    depth = matches[1].length;
                    segment = matches[2];
                    folder = segment.indexOf('/') !== -1;

                    // folder (indicated by '/' at end of line)
                    if (folder) {
                        if (depth >= stack.length) {
                            stack.push(segment);
                        } else if (depth < stack.length) {
                            stack = stack.slice(0, depth);
                            stack.push(segment);
                        }
                        path = stack.join('');
                        elements.push(returnObjects ? new Folder(path) : path);
                    }

                    // file
                    else {
                        path = stack.join('') + segment;
                        elements.push(returnObjects ? new File(path) : path);
                    }

                    // callback
                    folder ? fnFolder(path) : fnFile(path);
                }
            }

            // return
            return elements;
        },

        // ---------------------------------------------------------------------------------------------------------------
        // # Framework methods

        /**
         * Returns the named SWF panel if it exists
         * @param    {String}    name        The panel name
         * @returns    {SWFPanel}                An SWFPanel object
         */
        getPanel: function (name) {
            if (name) {
                name = String(name).toLowerCase();
                for (var i = 0; i < fl.swfPanels.length; i++) {
                    if (fl.swfPanels[i].name.toLowerCase() === name) {
                        return fl.swfPanels[i];
                    }
                }
            }
            return null;
        },

        /**
         * Returns an array of the the currently executing files, paths, lines, and code (most-recent first)
         *
         * @param    {Error}        error        An optional error object
         * @param    {Boolean}    shorten        An optional Boolean to shorten any core paths with {xjsfl}
         * @returns    {Array}                    An array of the executing files, paths, lines and code
         */
        getStack: function (error, shorten) {
            // error
            var strStack = (
                error instanceof Error ? error : new Error('Stack trace')
            ).stack;

            // parse stack
            var rxParts = /^(.*)?@(.*?):(\d+)$/gm;
            var matches = strStack.match(rxParts);

            // remove the fake error
            if (!error) {
                matches = matches.slice(2);
            }

            // parse lines
            var stack = [];
            var rxFile = /(.+?)([^\\\/]*)$/;
            var parts, fileParts, path, file;

            for (var i = 0; i < matches.length; i++) {
                // error, file, line number
                rxParts.lastIndex = 0;
                parts = rxParts.exec(matches[i]);

                // file parts
                fileParts = (parts[2] || '').match(rxFile);
                path = fileParts ? fileParts[1] : '';
                file = fileParts ? fileParts[2] : '';

                // stack object
                stack[i] = {
                    line: parseInt(parts[3]) || '',
                    code: parts[1] || '',
                    file: file,
                    path: path.replace(/\\/g, '/'),
                    uri: FLfile.platformPathToURI(path + file)
                };
            }

            // return
            return stack;
        },

        // ---------------------------------------------------------------------------------------------------------------
        // Other

        toString: function () {
            return '[class Utils]';
        }
    };

    return Utils;
});
