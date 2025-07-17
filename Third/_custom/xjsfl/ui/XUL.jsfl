define(function(){


var Utils=(function(){

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
	 * @overview	static library of utility functions
	 * @instance	Utils
	 */

	// xjsfl.init(this, ['Folder', 'JSON', 'SimpleTemplate', 'URI', 'XML']);
	// xjsfl.init(this, ['Folder',   'URI']);

	// ---------------------------------------------------------------------------------------------------------------
	// class

		/**
		 * Miscellaneous utility functions
		 * @class Utils
		 */
		Utils =
		{
			// ---------------------------------------------------------------------------------------------------------------
			// #1 Object methods

				/**
				 * Checks if the object is a true Object or not
				 * @param	{Object}	obj			Any object that needs to be checked if it's a true Object
				 * @returns	{Boolean}				True or false
				 */
				isObject:function(value)
				{
					return Object.prototype.toString.call(value) === '[object Object]';
				},

				/**
				 * Get an object's keys, or all the keys from an Array of Objects
				 *
				 * @param	{Object}	obj			Any object with iterable properties
				 * @param	{Array}		obj			An Array of objects with iterable properties
				 * @returns	{Array}					An array of key names
				 */
				getKeys:function(obj)
				{
					var keys	= [];
					var arr		= obj.constructor === Array ? obj : [obj];
					for(var i = 0; i < arr.length; i++)
					{
						for(var key in arr[i])
						{
							if(keys.indexOf(key) == -1)
							{
								keys.push(key);
							}
						}
					}
					return keys;
				},

				/**
				 * Creates a new object from a reference and parameters
				 * @param		{Object}		class		A class reference
				 * @param		{String}		class		A class reference name or package (this can be fully qualified)
				 * @param		{Array}			params		An optional Array of constructor parameters
				 * @returns		{Object}					The new instance
				 */
				create:function (class, params)
				{
					// params
						class = typeof class === 'string' ? Utils.getDeepValue(window, class) : class;
						params = params || [];

					// create
						trace('>' + class);
						trace('>' + params);
						var instance = new class();
						//return class.apply(null, params);

					// return
						return instance;
				},

				/**
				 * Clones an object
				 * @param	{Object}	obj		The object reference
				 * @returns	{Object}			The cloned object
				 */
				clone:function(obj)
				{
					if(obj == null || typeof(obj) != 'object')
					{
						return obj;
					}

					if(obj.constructor)
					{
						var temp = obj.constructor() || {}; // changed
						for(var key in obj)
						{
							temp[key] = Utils.clone(obj[key]);
						}
						return temp;
					}
					return null;
				},


				/**
				 * Extends an object or array with more properties or elements
				 *
				 * @param	{Object}	obj			A source Object to be extended
				 * @param	{Object}	source		The properties to be added
				 * @returns	{Object}				The modified object
				 *
				 * @param	{Array}		obj			A source Array to be extended
				 * @param	{Array}		source		The elements to be added
				 * @returns	{Array}					The modified array
				 */
				extend:function(obj, source)
				{
					// variables
						var prop;

					// throw error if obj is null
						if(obj == undefined)
						{
							throw new Error('Error in Utils.extend(): obj is undefined');
						}

					// extend array
						if(Utils.isArray(obj) && Utils.isArray(source))
						{
							for(var i = 0; i < source.length; i++)
							{
								obj.push(source[i]);
							}
						}

					// extend object
						else if (typeof source === "object")
						{
							for ( var name in source )
							{
								// getters / setters
									var getter = source.__lookupGetter__(name);
									var setter = source.__lookupSetter__(name);
									if ( getter || setter )
									{
										if ( getter ) obj.__defineGetter__(name, getter);
										if ( setter ) obj.__defineSetter__(name, setter);
									}

								// normal property
									else
									{
										obj[name] = source[name];
									}
							}
						}

					// return
						return obj;
				},

				/**
				 * Combines keys and values to make a new populated Object
				 * @param	{Array}		keys		An array of key names
				 * @param	{String}	keys		A string of key names which will be split on commas
				 * @param	{Array}		values		An array of values
				 * @returns	{Object}				An Object containing the values assigned to keys
				 */
				combine:function(keys, values)
				{
					if(typeof keys === 'string')
					{
						keys = Utils.toArray(keys.trim(), /\s*,\s*/g);
					}
					if(keys)
					{
						var obj = {};
						for (var i = 0; i < keys.length; i++)
						{
							if(keys[i] !== '')
							{
								obj[keys[i]] = values[i];
							}
						}
						return obj;
					}
				},

				/**
				 * Makes a Hash object from a source value
				 * @param	{String}	obj				An anything delimited string of words
				 * @param	{Array}		obj				An array of words
				 * @param	{Object}	obj				Any iterable object or instance
				 * @param	{Value}		defaultValue	An optional default value for the hash's keys. Defaults to false
				 * @returns	{Object}					An Object of name:true pairs
				 */
				makeHash:function(obj, defaultValue)
				{
					// variables
						var keys;
						var hash		= {};
						defaultValue	= typeof defaultValue === 'undefined' ? false : defaultValue;

					// get keys
						if(typeof obj === 'string')
						{
							keys = Utils.toArray(obj);
						}
						else if(obj instanceof Array)
						{
							keys = obj;
						}
						else
						{
							keys = Utils.getKeys(obj);
						}

					// make hash
						for each(var key in keys)
						{
							hash[key] = defaultValue;
						}
						return hash;
				},

				/**
				 * Generic function to recurse a data structure, processing nodes and children with callbacks
				 * @param	{Object}	rootElement		The root element to start processing on
				 * @param	{Function}	fnChild			A callback function to call on child elements. Should be of the format "function process(value, index, depth){ ... }"
				 * @param	{Function}	fnContents		An optional callback function of the format which should return an object which can be processed for its contents, i.e. folder.contents
				 * @param	{Object}	scope			An optional Object on which to appy "this" scope to
				 * @returns	{value}						The result of the passed fnChild function
				 */
				walk:function(rootElement, fnChild, fnContents, scope)
				{
					// processing function
						function process(element, index)
						{
							// process the element with the callback
								var result = fnChild.apply(scope, [element, index, depth]);

							// Now, depending on the result, we do one of three things:
								/*
									- Boolean false		Skip processing of this element
									- Boolean true		Stop processing and return this element
									- no return value	Continue processing child elements
								*/

							// if the result is a Boolean true, consider this element found, and return it
								if(result === true)
								{
									return element;
								}

							// if false was not returned, process the current element
								else if(result !== false)
								{
									// get the custom contents, or just use the object itself if no callback supplied
										var contents = fnContents ? fnContents.apply(scope, [element, index, depth]) : element;

									// process contents
										if( contents && ! ((typeof contents) in simpleTypes) )
										{
											depth ++;
											if(contents instanceof Array)
											{
												for (var i = 0; i < contents.length; i++)
												{
													var result = process(contents[i], i);
													if( result )
													{
														return result;
													}
												}
											}
											else
											{
												for(var name in contents)
												{
													var result = process(contents[name], name);
													if( result )
													{
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
						var simpleTypes =
						{
							'number'	:1,
							'string'	:1,
							'boolean'	:1,
							'xml'		:1,
							'function'	:1,
							'undefined'	:1
						}

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
				 * @param	{Object}	value	Any object or value
				 * @returns	{String}			The type of the object
				 * @see							http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
				 */
				getType:function(value)
				{
					// slight alteration here, otherwise null and undefined return 'window'
					if(value === null) return null;
					if(typeof value === 'undefined') return 'undefined';
					return Object.prototype.toString.call(value).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
				},

				/**
				 * Get the class of an object as a string
				 *
				 * @param	{value}		value		Any value
				 * @returns	{String}				The class name of the value i.e. 'String', 'Date', 'CustomClass'
				 */
				getClass:function(value)
				{
					// return null if the value is not an object
						if(value === null || typeof value === 'undefined') return null;

					// return the object's class if it's a native type
						if(typeof value !== 'object')
						{
							var class = Object.prototype.toString.call(value).match(/\s([a-zA-Z]+)/)[1];
							if(class !== 'Object')
							{
								return class;
							}
						}

					// if the value has a proper toString() method, i.e. "[object ClassName]" and is not a native Object, parse that
						var matches = value.toString().match(/^\[\w+\s*(\w+)/);
						if(matches && matches[1] && matches[1] !== 'Object')
						{
							return matches[1];
						}

					// otherwise, attempt to parse the constructor source
						var matches = value.constructor.toSource().match(/^function\s*(\w+)/);
						if (matches && matches.length == 2)
						{
							// fail if the return value is an anonymous / wrapped Function
								if(matches[1] != 'Function')
								{
									return matches[1];
								}

							// attempt to grab value.toSource() result
								else
								{
									matches = value.toSource().match(/^function\s*(\w+)/);
									if(matches && matches[1])
									{
										return matches[1];
									}
								}
						}

					// if we still can't get it, return 'Object'
						return 'Object';
				},

				/**
				 * Gets the prototype chain of an object
				 * @param	{Object}	obj				An instantiated object
				 * @param	{Boolean}	includeSource	An optional Boolean to include the original object
				 * @returns	{Array}						An Array of the original instantation object
				 */
				getPrototypeChain:function(obj, includeSource)
				{
					var chain = includeSource ? [obj] : [];
					while(obj.__proto__)
					{
						obj = obj.__proto__;
						chain.push(obj);
					}
					return chain;
				},

				/**
				 * Get the arguments of a function as an Array
				 * @param	{Arguments}	args		An arguments object
				 * @param	{Number}	startIndex	Optional index of the argument from which to start from
				 * @param	{Number}	endIndex	Optional index of the argument at which to end
				 * @returns	{Array}					An Array of parameters
				 */
				getArguments:function(args, startIndex, endIndex)
				{
					return params = Array.slice.apply(this, [args, startIndex || 0, endIndex || args.length]);
				},

				/**
				 * Get the arguments of a function as an Object
				 * @param	{Function}	fn		A function
				 * @param	{Arguments}	args	The function instance's arguments
				 * @returns	{Object}			An object containing the named function arguments
				 */
				getParams:function(fn, args)
				{
					var source		= Utils.parseFunction(fn);
					var args		= Utils.getArguments(args);
					return Utils.combine(source.params, args);
				},

				/**
				 * Subclasses an class from a parent class (note that $ arguments can be passed in any order)
				 * @param	{Function}	child			The child class
				 * @param	{Function}	$parent			The parent class
				 * @param	{Object}	$properties		Properties to add to the chlid class
				 */
				makeClass:function(child, $parent, $properties)
				{
					// variables
						var parent, properties;

					// grab correct arguments
						for each(var arg in [$parent, $properties])
						{
							if(typeof arg === 'function')
								parent = arg;
							else if(typeof arg === 'child')
								properties = arg;
						}

					// extend child from a parent
						if(parent)
						{
							// set up the inheritance chain
								function Inheritance()
								{
									//this.superConstructor		= parent;
									//this.superClass				= parent.prototype;
								}
								Inheritance.prototype			= parent.prototype;
								child.prototype					= new Inheritance();
								child.prototype.constructor		= child;

							// create references to parent
								child.superConstructor			= parent;
								child.superClass				= parent.prototype;

							// create super methods
								// can this be done?
						}

					// add properties to child
						if(properties)
						{
							for(var name in properties)
							{
								// check for accessors
									var getter = properties.__lookupGetter__(name)
									var setter = properties.__lookupSetter__(name);

								// assign accessors
									if (getter || setter)
									{
										if (getter)
										{
											child.prototype.__defineGetter__(name, getter);
										}
										if (setter)
										{
											child.prototype.__defineSetter__(name, setter);
										}
									}

								// assign vanilla properties
									else
									{
										child.prototype[name] = properties[name];
									}
							}
						}

				},

				/**
				 * Parses a function source into an object
				 * @param	{Function}	fn		A reference to a function
				 * @param	{String}	name	An optional name for anonymous functions
				 * @returns	{Object}			An Object with name and params properties
				 */
				parseFunction:function(fn, name)
				{
					var matches		= fn.toSource().match(/function\s*((\w*)\s*\(([^\)]*)\))/);
					if(matches)
					{
						var params = matches[3].match(/([$\w]+)/g);
						return {signature:matches[0].replace(/function (\w+)/, '$1'), name:matches[2] || name, params:params};
					}
					return {name:null, params:[], signature:''};
				},


			// ---------------------------------------------------------------------------------------------------------------
			// # Array methods

				/**
				 * Checks if the object is a true Array or not
				 * @param	{Object}	obj			Any object that needs to be checked if it's a true Array
				 * @returns	{Boolean}				True or false
				 */
				isArray:function (obj)
				{
					return Object.prototype.toString.call(obj) === "[object Array]";
				},


				/**
				 * Turns a single string of tokens into an array of trimmed tokens, by splitting at non-word characters, or a supplied delimiter
				 *
				 * It either returns an existing array, splits a string at delimiters, or wraps the single value in an array
				 *
				 * @param	{String}	value		A string
				 * @param	{RegExp}	delim		An optional RegExp with which to split the input string, defaults to any non-word character
				 * @param	{String}	delim		An optional character with which to split the string
				 * @returns	{Array}					A new Array
				 */
				toArray:function(value, delim)
				{
					// if delimiter is not supplied, default to any non-word character
						delim = delim || /\W+/;

					// if the value is already an array, return
						if(Utils.isArray(value))
						{
							return value;
						}

					// if the value is a string, start splitting
						else if(typeof value === 'string')
						{
							// trim
								value = value.trim();

							// variables

							// if RegExp, split
								if(delim instanceof RegExp)
								{
									delim.global = true;
									return value.split(delim);
								}

							// else if String split
								else
								{
									delim		= delim.replace(/([\\\|\*\+])/g, '\\$1')
									var rxTrim	= new RegExp('^[\\s' +delim+ ']+|[\\s' +delim+ ']+$', 'g');
									var rxSplit	= new RegExp('\\s*' +delim+ '+\\s*', 'g');
									return value.replace(rxTrim, '').split(rxSplit);
								}

						}
						else
						{
							throw new TypeError('Utils.toArray() expects a string');
						}
						return [value];
				},

				/**
				 * Returns a unique array without any duplicate items
				 *
				 * @param	{Array}		arr			Any array
				 * @param	{String}	prop		An optional property (if an Array of Objects is passed) to compare against
				 * @returns	{Array}					A unique array
				 */
				toUniqueArray:function(arr, prop)
				{
					// throw an arror if an array is not passed
						if( ! (arr instanceof Array) )
						{
							throw new TypeError('Utils.toUniqueArray expects an Array as its first parameter');
						}

					// variables
						var arrOut	= [];
						var i = -1;

					// extract values from Objects
						if(prop)
						{
							var props = [];
							var value;
							while(i++ < arr.length - 1)
							{
								value = arr[i][prop];
								if(props.indexOf(value) === -1)
								{
									props.push(value);
									arrOut.push(arr[i]);
								}
							}
						}

					// extract values from Array
						else
						{
							var i = -1;
							while(i++ < arr.length - 1)
							{
								if(arrOut.indexOf(arr[i]) === -1)
								{
									arrOut.push(arr[i]);
								}
							}
						}

					// return
						return arrOut;
				},

				/**
				 * Basic numeric Array sort function (native sort() sorts by string)
				 * @param	{Array}		arr					An array to sort
				 * @param	{Boolean}	reverse				An optional flag to sort in reverse (descending) order
				 * @param	{Boolean}	caseInsensitive		An optional flag to sort case insensitively
				 * @returns	{Array}							The sorted Array
				 */
				sort:function(arr, reverse, caseInsensitive)
				{
					function asc(a, b)  { return a - b; }
					function desc(a, b) { return b - a; }
					function asci(a, b)  { return String(a).toLowerCase().localeCompare(String(b).toLowerCase()); }
					function desci(a, b) { return String(b).toLowerCase().localeCompare(String(a).toLowerCase()); }
					return caseInsensitive ? arr.sort(reverse ? desci : asci) : arr.sort(reverse == true ? desc : asc);
				},

				/**
				 * Optimized Array sortOn method, for sorting Arrays by child property. This function modifies the input Array
				 * @param	{Array}		arr			An Array of Objects
				 * @param	{String}	prop		A property name to sort on; defaults to 'name'
				 * @param	{Boolean}	alpha		An optional flag to sort alphabetically
				 * @returns	{Array}					The sorted Array)
				 */
				sortOn:function(arr, prop, alpha)
				{
					function swap(arr, a, b)
					{
						var tmp = arr[a];
						arr[a] = arr[b];
						arr[b] = tmp;
					}

					function partition(array, begin, end, pivot)
					{
						var piv = alpha ? String(array[pivot][prop]).toLowerCase() : array[pivot][prop];
						swap(array, pivot, end - 1);
						var store = begin;
						var ix;
						for(ix = begin; ix < end - 1; ++ix)
						{
							if((alpha ? String(array[ix][prop]).toLowerCase() : array[ix][prop]) <= piv)
							{
								swap(array, store, ix);
								++store;
							}
						}
						swap(array, end - 1, store);

						return store;
					}

					function qsort(array, begin, end)
					{
						if(end - 1 > begin)
						{
							var pivot	= begin + Math.floor(Math.random() * (end - begin));
							pivot		= partition(array, begin, end, pivot);
							qsort(array, begin, pivot);
							qsort(array, pivot + 1, end);
						}
					}

					prop = prop || 'name';
					qsort(arr, 0, arr.length);
					return arr;
				},

				/**
				 * Returns the difference between two arrays
				 * @param		{Array}		arr1		The first Array
				 * @param		{Array}		arr2		The second Array
				 * @param		{Number}	type		An optional index to change the returned elements: -1 for array 1 elements not found in array 2, 0 for those found in both, and 1 for those in array 2 not found in array 1; defaults to -1
				 * @returns		{Array}					The resulting Array
				 */
				diff:function(arr1, arr2, type)
				{
					// parameters
						if(typeof type === 'undefined')
						{
							type = -1;
						}
						else if(type === 1)
						{
							var temp = arr2;
							arr2 = arr1;
							arr1 = temp;
						}

					// variables
						var element;
						var arrIn	= [];
						var arrOut	= [];

					// do the difference
						for (var i = 0; i < arr1.length; i++)
						{
							element = arr1[i];
							if(arr2.indexOf(element) > -1)
							{
								arrIn.push(element);
							}
							else
							{
								arrOut.push(element);
							}
						}

					// return
						return type == 0 ? arrIn : arrOut;
				},

				/**
				 * Run each element of an array through a callback function
				 *
				 * Used to call functions in a loop without writing loop code or forEach closure
				 * or checking that original argument is an array
				 *
				 * @param	{Array}		arr			An array of elements to be passed to the callback
				 * @param	{Function}	func		The function to call
				 * @param	{Array}		params		An opptional array of arguments to be passed
				 * @param	{Number}	argIndex	An optional argument index in which the original array element should be passed
				 */
				applyEach:function(arr, func, params, argIndex)
				{
					// defaults
						params 		= params || [];
						argIndex	= argIndex || 0;

					// if only a single element is passed, wrap it in an array
						if( ! Utils.isArray(arr))
						{
							arr = [arr];
						}

					// for each element, call the function with the parameters
						arr.forEach
						(
							function(element, index, elements)
							{
								var args = [].concat(params);
								args.splice(argIndex, 0, element);
								func.apply(this, args);
							}
						)

					// return
						return this;
				},


			// ---------------------------------------------------------------------------------------------------------------
			// # Value methods

				/**
				 * Get an Array of values from an Object, or an Array of Arrays/Objects from an Array of Objects
				 *
				 * @param	{Array}		input		An Object or an array of Objects
				 * @param	{String}	prop		The name of a property to collect
				 * @param	{Function}	prop		A callback function of the format function propertyName(element){ return element.property }
				 * @param	{Array}		prop		The names of properties to collect
				 * @param	{Boolean}	prop		A Boolean indicates you want to collect ALL properties
				 * @param	{Boolean}	option		If passing and returning a single object, pass true to make it unique. If returning a 2D array, pass true to return Objects
				 * @returns	{Array}					A new 1D or 2D Array
				 */
				getValues:function(input, prop, option)
				{
					// variables
						var output	= [];
						var i		= -1;
						var single	= false;
						prop		= prop || true;

					// convert input to array if just a single object
						if( ! Utils.isArray(input))
						{
							input	= [input];
							single	= true;
						}

					// collect all values?
						if(prop === true)
						{
							prop = Utils.getKeys(input[0]);
						}

					// double loop for multiple properties
						if(Utils.isArray(prop))
						{
							// variables
								var propName;
								var props			= prop;
								var functionNames	= [];
								var output			= new Array(input.length);

							// check if any of the property names are actually functions, and if so, grab the function name in advance
								for(var f = 0; f < props.length; f++)
								{
									if(typeof props[f] === 'function')
									{
										functionNames[f] = Utils.parseFunction(props[f]).name;
									}
								}

							// return objects
								if(option)
								{
									while(i++ < input.length - 1)
									{
										output[i] = {};
										for(var j = 0; j < props.length; j++)
										{
											propName = functionNames[j] || props[j];
											output[i][propName] = functionNames[j] ? props[j](input[i]) : input[i][propName];
										}
									}
								}

							// return arrays
								else
								{
									while(i++ < input.length - 1)
									{
										output[i] = new Array(props.length);
										for(var j = 0; j < props.length; j++)
										{
											output[i][j] = functionNames[j] ? props[j](input[i]) : input[i][props[j]];
										}
									}
								}
						}

					// single loop for collecting only a single property
						else
						{
							while(i++ < input.length - 1)
							{
								if(input[i] != undefined)
								{
									if( ! option || (option && output.indexOf(input[i][prop]) === -1) )
									{
										output.push(typeof prop === 'function' ? prop(input[i]) : input[i][prop]);
									}
								}
							}
						}

					// return
						return single ? output[0] : output;
				},

				/**
				 * Gets the nearest value to a target value from an array of values
				 * @param	{Array}		values		An Array of values
				 * @param	{Number}	value		A single numeric value
				 * @param	{Number}	returnIndex	An optional Boolean to return the index rather than the value
				 * @returns	{Number}				A value or index
				 */
				getNearestValue:function(values, value, returnIndex)
				{
					var lower = values[0];
					var upper = values[values.length - 1];
					if(value <= lower)
					{
						return lower;
					}
					else if(value >= upper)
					{
						return upper;
					}
					else
					{
						var index = 1;
						while(values[index] <= value && index < values.length - 1)
						{
							index++;
						}
						lower = values[index - 1];
						upper = values[index];
						if(returnIndex)
						{
							return value - lower < upper - value ? index - 1 : index;
						}
						else
						{
							return value - lower < upper - value ? lower : upper;
						}
					}
				},

				/**
				 * Comparison function to get a max or min value within an array of objects
				 * @param	{Array}		elements		An Array of objects with named properties
				 * @param	{String}	prop			The property to test
				 * @param	{Boolean}	returnElements	An optional flag to return the element, rather than the value
				 * @returns	{Array}						A 2-element Array containing the min and max values, or min and max elements
				 */
				getExtremeValues:function(elements, prop, returnElement)
				{
					// variables
						var minElement,
							maxElement,
							minValue,
							maxValue;

					// comparison function
						function test(element, index, elements)
						{
							var value = element[prop];
							if(value > maxValue)
							{
								maxValue	= value;
								maxElement	= element;
							}
							else if(value < minValue)
							{
								minValue	= value;
								minElement	= element;
							}
						}

					// catch empty array
						if( ! elements || ! Utils.isArray(elements) || elements.length < 1)
						{
							return {min:undefined, max:undefined};
						}

					// variables
						minElement		= elements[0];
						maxElement		= elements[0];
						minValue		= elements[0][prop];
						maxValue		= elements[0][prop];

					// test
						elements.forEach(test);

					// return
						return returnElement ? [minElement, maxElement] : [minValue, maxValue];
				},

				/**
				 * Gets properties from an object's namespace via a dot.syntax.path String
				 * @param	{Object}	obj			The root object from which to extract the deep value
				 * @param	{String}	path		The dot-path to an existing object property
				 * @returns	{Value}					The value of the property, if it exists
				 */
				getDeepValue:function(obj, path)
				{
					path = String(path);
					if(path.indexOf('.') == -1)
					{
						return obj[path];
					}
					else
					{
						var key;
						var keys = path.split('.');
						while(keys.length > 1)
						{
							key = keys.shift();
							if(key in obj)
							{
								obj = obj[key];
							}
							else
							{
								return;
							}
						}
						return obj[keys[0]];
					}
				},

				/**
				 * Add nested properties to an object's namespace via a dot.syntax.path String
				 * @param	{Object}	obj			The root object on which to create the deep value
				 * @param	{String}	path		A dot-syntax path to a new object property
				 * @param	{Object}	properties	An object or value to add to the new namespace
				 */
				setDeepValue:function(obj, path, properties)
				{
					path		= String(path);
					var keys	= path.split('.');
					do
					{
						// get the next key
							var key = keys.shift();

						// extend
							if(keys.length > 0)
							{
								if( ! (key in obj) )
								{
									obj[key] = {};
								}
								obj = obj[key];
							}

						// assign
							else
							{
								//trace(key)
								//trace(obj)
								if( ! (key in obj) )
								{
									//trace('assigning')
									obj[key] = properties;
								}
								else
								{
									//trace('extending')
									Utils.extend(obj[key], properties);
								}

							}
					}
					while(keys.length);
				},

				/**
				 * Randomnly modify a seed value with a secondary modifier component
				 * @param	{Number}	value		A value to modify
				 * @param	{Number}	modifier	An optional modifier component with which to modify the original value
				 * @param	{String}	modifier	An optional modifier component with which to modify the original value, with optional leading +,-,* or a trailing %
				 * @returns	{Number}				The modified value
				 */
				randomizeValue:function(value, modifier)
				{
					// value is a number
						if(typeof value === 'number')
						{
							// if a modifier is supplied,
								if(modifier != undefined)
								{
									// if a string is supplied,
										if(typeof modifier == 'string')
										{
											// value
												var matches = modifier.match(/([+-\/*])?(\d+(.\d+)?)(%)?/);
												if(matches)
												{
													// variables
														var modified;

													// components
														var sign	= matches[1];
														var offset	= parseFloat(matches[2]);
														var percent	= matches[4];

													// offset
														if(percent)
														{
															if(sign === '+' || sign === '-')
															{
																offset	= value * (offset / 100)
															}
															else if(sign === '*' || sign === '/')
															{
																offset	= (offset / 100);
															}
														}

													// modify value
														switch(sign)
														{
															case '+':
																modified = value + offset * Math.random();
															break;

															case '-':
																modified = value - offset * Math.random();
															break;

															case '*':
																modified = value * offset * Math.random();
															break;

															case '/':
																modified = value / offset * Math.random();
															break;

															default: // either side
																modified = value + (offset * Math.random()) - (offset / 2);
																//modified = value + (offset * 2 * Math.random()) - offset;

														}

														return modified;
												}
												else
												{
													return value;
												}

										}

									// otherwise, update according to the number
										else
										{
											return value + modifier * Math.random();
										}
								}

							// if a number is supplied, just randomize it
								else
								{
									return value * Math.random();
								}
						}

					// if value is an array, simply return a value between the two numbers
						else if(value instanceof Array)
						{
							return Utils.randomValue(value[0], value[1]);
						}

					// return
						return value;
				},

				/**
				 * Get a random value between 2 numbers
				 * @param	{Array}		a			A 2-element array defining the lower and upper limits
				 * @param	{Number}	a			The lower limit of the range
				 * @param	{Number}	b			The lower limit of the range
				 * @param	{Number}	round		An optional Boolean to round to the nearest integer value
				 * @returns	{Number}				A number between a and b
				 */
				randomValue:function(a, b, round)
				{
					if(a instanceof Array)
					{
						round = b;
						b = a[1];
						a = a[0];
					}
					var value = a + (b - a) * Math.random();
					return round ? Math.round(value) : value;
				},


			// ---------------------------------------------------------------------------------------------------------------
			// # String methods

				/**
				 * Pads a value to a certain length with a specific character
				 * @param	{Value}		value		Any value
				 * @param	{Number}	length		An optional length, defaults to 6
				 * @param	{String}	chr			An optional padding character, defaults to 0
				 * @param	{Boolean}	right		An optional flag to pad to the right, rather than the left
				 * @returns	{String}				The padded value
				 */
				pad:function(value, length, chr, right)
				{
					value	= String(value || '');
					chr		= typeof chr === 'undefined' ? '0' : chr;
					length	= typeof length === 'undefined' ? 6 : length;
					while(value.length < length)
					{
						right ? value += chr : value = chr + value;
					}
					return value;
				},

				/**
				 * Converts a delimited block of text to tab-separated columns
				 * @param		{String}		text			The block of text to tabify
				 * @param		{Number}		padding			An optional amount of tabs to pad each column by. Defaults to 0
				 * @param		{String}		delimiter		An optional delimiter (can also be a RegExp) to split the columns on. Defaults to '\t'
				 * @param		{Boolean}		useSpaces		An optional Boolean to use spaces instead of tabs. Defaults to false
				 * @param		{Number}		tabWidth		An optional system tab width. Defaults to 4
				 * @returns		{String}						The columnized output
				 */
				columnizeText:function(text, padding, delimiter, useSpaces, tabWidth)
				{
					// parameters
						padding			= padding === undefined ? 0 : padding;
						delimiter		= delimiter || '\t';
						tabWidth		= tabWidth || 4;

					// variables
						var tab			= useSpaces ? ' '.repeat(tabWidth) : '\t';
						var lines		= String(text).split('\n');
						var widths		= [];

					// functions
						function roundUp(width)
						{
							return Math.ceil(width / tabWidth) * tabWidth;
						}

						function pad(str, maxWidth)
						{
							// output string
								var output		= '';

							// virtual width of the string (with tabs expanded)
								var strWidth	= str.length;

							// pad initial text to the next column & update strWidth
								var mod			= strWidth % tabWidth;
								if(mod !== 0)
								{
									var offset	= tabWidth - mod;
									strWidth	+= offset;
									output		+= useSpaces ? ' '.repeat(offset) : tab;
								}

							// while the string width is smaller than the max maxWidth, pad to fit
								while(strWidth <= maxWidth) //  + (padding * tabWidth)
								{
									output		+= tab;
									strWidth	+= tabWidth;
								}

							// add any extra gutters between columns
								if(padding > 0)
								{
									output += tab.repeat(padding);
								}

							// return
								return str + output;
						}

					// get max widths
						for (var i = 0; i < lines.length; i++)
						{
							// variables
								var line		= lines[i].trim();
								var segments	= line.trim().split(delimiter);
								lines[i]		= segments;

							// loop over segments
								for (var j = 0; j < segments.length; j++)
								{
									var segment		= segments[j];
									var width		= segment.length;
									if(widths[j] == undefined || widths[j] < width)
									{
										widths[j] = width;//roundUp(width); // add one on so we always get some space
									}
								}
						}

					// if any of the widths are a multiple of tabWidth, we need to lengthen them by 1, so columns don't touch
						for (var i = 0; i < widths.length; i++)
						{
							if(widths[i] % tabWidth === 0)
							{
								 widths[i]++;
							}
						}

					// debug
						//format('\n> {widths} ---------------------------------------------', widths.join(':'));

					// update lines
						for (var i = 0; i < lines.length; i++)
						{
							for (var j = 0; j < lines[i].length; j++)
							{
								var segment = lines[i][j];
								if(j < widths.length - 1)
								{
									segment = pad(segment, widths[j] - 1);
								}
								lines[i][j] = segment;
							}
							lines[i] = lines[i].join('');
						}

					// return
						return lines.join('\n');
				},

				/**
				 * Parse any string into a real datatype. Supports Number, Boolean, hex (0x or #), XML, XMLList, Array notation, Object notation, JSON, Date, undefined, null
				 * @param	{String}	value		An input string
				 * @param	{Boolean}	trim		An optional flag to trim the string, on by default
				 * @returns	{Mixed}					The parsed value of the original value
				 */
				parseValue:function(value, trim)
				{
					// trim
						value = trim !== false ? String(value).trim() : String(value);

					// undefined
						if(value === 'undefined')
							return undefined;

					// null - note that empty strings will be returned as null
						if(value === 'null' || value === '')
							return null;

					// Number
						if(/^(\d+|\d+\.\d+|\.\d+)$/.test(value))
							return parseFloat(value);

					// Boolean
						if(/^true|false$/i.test(value))
							return value.toLowerCase() === 'true' ? true : false;

					// Hexadecimal String / Number
						if(/^(#|0x)[0-9A-F]{6}$/i.test(value))
							return parseInt(value[0] === '#' ? value.substr(1) : value, 16);

					// XML
						if(/^<(\w+)\b[\s\S]*(<\/\1>|\/>)$/.test(value))
						{
							try { var xml = new XML(value); } // attempt to create XML
							catch(err)
							{
								try { var xml = new XMLList(value); } // fall back to XMLList
								catch(err) { var xml = value; } // fall back to text
							};
							return xml
						}

					// Array notation
						if(/^\[.+\]$/.test(value))
							return eval(value);

					// Object notation
						if(/^{[a-z]\w*:.+}$/i.test(value))
							return eval('(' + value + ')');

					// JSON
						if(/^{"[a-z]\w*":.+}$/i.test(value))
							return JSON.parse(value);

					// Date
						if( ! isNaN(Date.parse(value)))
							return new Date(value);

					// String
						return value;
				},

				/**
				 * Parses a compound CSS (or CSS-like) expression into single elements, respecting :nested(:tokens, [like=these,ones])
				 * @param		{String}		expression		A CSS or otherwise comma-delimited string
				 * @param		{String}		delimiter		An optional delimiter character(s) to split the string on. Defaults to ","
				 * @param		{String}		nestStart		An optional opening character(s) to start ignoring splits, i.e. "(". Defaults to "([{"
				 * @param		{String}		nestEnd			An optional closing character(s) to stop ignoring splits, i.e. ")". Defaults to "}])"
				 * @returns		{Array}							An Array of String elements
				 * @example										var selectors = Utils.parseExpression(':not(body[attr=hello]),hello,[dave=1,ian=2]');
				 * @example										var controls  = Utils.parseExpression('title:Create Bitmap definitions,columns:[120,200],dropdown:Options={one:1,two:2,three:3},checkbox:Selected Only=true');
				 */
				parseExpression:function(expression, delimiter, nestStart, nestEnd)
				{
					// utility functions
						function makeHash(value)
						{
							return Utils.makeHash(String(value).split(''), true);
						}

						function addElement(element)
						{
							element = element.trim();
							if(element !== '')
							{
								elements.push(element);
							}
						}

					// parameters
						expression		= String(expression);
						delimiter		= makeHash(delimiter || ',');
						nestStart		= makeHash(nestStart || '([{');
						nestEnd			= makeHash(nestEnd || '}])');

					// variables
						var elements	= [];
						var element		= '';
						var nesting		= 0;

					// parse string
						for (var i = 0; i < expression.length; i++)
						{
							var char = expression.charAt(i);
							if(char in delimiter)
							{
								if(nesting == 0)
								{
									addElement(element);
									element = '';
								}
								else
								{
									element += char;
								}
							}
							else
							{
								element += char;
								if(char in nestStart)
								{
									nesting++;
								}
								if(char in nestEnd)
								{
									nesting--;
								}
							}
						}

					// push last remaining element
						addElement(element);

					// return
						return elements;
				},


			// ---------------------------------------------------------------------------------------------------------------
			// # RegExp methods


				/**
				 * 将模板字符串中的占位符替换为实际值
				 * @param {String} template 模板字符串，包含 {placeholder} 形式的占位符
				 * @param {Object|...Mixed} objOrValues 替换值，可以是一个对象，也可以是多个参数
				 * @returns {String} 替换后的字符串
				 */
				inject:function(str,template) {
					// params
					// var params	= Array.slice.call(this, arguments);
					var params	= Array.slice.call(this, arguments,1);
					var obj		= params.length > 1
						? params
						: typeof params[0] === 'object'
							? params[0]
							: [params];

					// variables
					var rx		= /{([a-z0-9]+)}/gi;
					var values	= {};
					var length	= 0;


					// replacement functions
					function arrMatch(match, key)
					{
						if(typeof values[key] === 'undefined')
						{
							values[key] = length++;
						}
						return obj[values[key]];
					}

					function objMatch(match, key)
					{
						if(typeof values[key] === 'undefined')
						{
							values[key] = key.indexOf('.') == -1 ? obj[key] : Utils.getDeepValue(obj, key);
						}
						return values[key];
					}

					// return
					return str.replace(rx, obj instanceof Array ? arrMatch : objMatch);
				},

				/**
				 * Performs a global RegExp match but returns a 2D Array of local match Arrays, or Objects if matchNames are supplied
				 *
				 * This saves you running 2 separate RegExp loops to extract both global and local matchs, and also
				 * packages assigning match values to named properties
				 *
				 * @param	{String}	str				The string to be matched
				 * @param	{RegExp}	rx				A RegExp object or literal
				 * @param	{String}	params			An optional comma-delimited string of local match names
				 * @param	{Array}		params			An optional Array of local match names
				 * @param	{Boolean}	captureIndex	An optional Boolean to store the index of the global matches
				 * @returns	{Array}						An Array of local match Arrays or Objects
				 */
				match:function(str, rx, matchNames, captureIndex)
				{
					// variables
						var matchesGlobal, matchesLocal, matchNames;

					// global regexp
					// 	var flags			= 'g{m}{i}'.inject(rx.multiline ? 'm' : '', rx.ignoreCase ? 'i' : '');
						var flags			= Utils.inject('g{m}{i}', rx.multiline ? 'm' : '', rx.ignoreCase ? 'i' : '');
						// console.log(rx.source, flags);
						var rxGlobal		= new RegExp(rx.source, flags);

					// local regexp
						var rxLocal			= new RegExp(rx.source);
						rxLocal.multiline	= rxGlobal.multiline;
						rxLocal.ignoreCase	= rxGlobal.ignoreCase;

					// ensure input RegExp is global
						//rxGlobal			= new RegExp(rxGlobal.source, rxGlobal.global, ;

					// exec
						var n = 0;
						if(captureIndex)
						{
							// variables
								matchesGlobal		= [];
								matchNames			= matchNames ? 'matchIndex,match,' + matchNames : null;

							// exec
								if(matchesGlobal)
								{
									var exec;
									while(exec = rxGlobal.exec(str))
									{
										// stop processing if no matches (otherwise, exec() will loop forever)
											if(exec[0] == '')break;

										// set up local matches array, with the match index if an object is being returned
											matchesLocal	= matchNames ? [exec.index] : [];

										// add matches
											for (var i = 0; i < exec.length; i++)
											{
												matchesLocal.push(exec[i]);
											}

										// finalise matches
											if(matchNames)
											{
												// create an object
												matchesLocal = Utils.combine(matchNames, matchesLocal)
											}
											else
											{
												// add match index to array
												matchesLocal.push(exec.index);
											}
											matchesGlobal.push(matchesLocal);

									}

								// reset lastIndex (this is important so subsequent matches don't fail!)
									rxGlobal.lastIndex	= 0;
							}
						}

					// match
						else
						{
							// main match
								matchesGlobal 	= str.match(rxGlobal);
								matchNames		= matchNames ? 'match,' + matchNames : null;

							// sub matches
								if(matchesGlobal)
								{
									for (var i = 0; i < matchesGlobal.length; i++)
									{
										// variables
											matchesLocal		= matchesGlobal[i].match(rxLocal);

										// stop processing if matches were empty
											if(matchesLocal[0] == '')
											{
												matchesGlobal.pop();
												break;
											}

										// finalise matches
											matchesGlobal[i]	= matchNames ? Utils.combine(matchNames, matchesLocal) : matchesLocal;
									}
								}
						}

					// return
						return matchesGlobal || null;
				},

				/**
				 * Escapes a string for use in RegExp constructors
				 * @param	{String}	value	The string to be RegExp escaped
				 * @returns	{String}			The escaped string
				 */
				rxEscape:function(value)
				{
				    return String(value).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
				},

				/**
				 * Unescapes a string used in RegExp constructors
				 * @param	{String}	value	The string to be RegExp escaped
				 * @returns	{String}			The unescaped string
				 */
				rxUnescape:function(value)
				{
					 return String(value).replace(/\\\//g, '/');
				},

				/**
				 * Converts a wildcard (*) string into a non-greedy RegExp
				 * @param	{String}	value		The wildcard string to convert
				 * @param	{Boolean}	exactMatch	An optional Boolean to force an exact match
				 * @returns	{RegExp}				The new RegExp
				 */
				makeWildcard:function(value, exactMatch)
				{
					var str = Utils.rxEscape(value).replace(/\\\*/g, '.*?');
					if(exactMatch)
					{
						str = '^' + str + '$';
					}
					return new RegExp(str);
				},


			// ---------------------------------------------------------------------------------------------------------------
			// # File and URI methods

				/**
				 * Returns a list of URIs for a glob string
				 * @see									http://www.codeproject.com/Articles/2809/Recursive-patterned-File-Globbing
				 * @param	{String}	globPathOrURI	The path or URI to the folder to search, including the wildcard pattern, * = any character, ** = files recursive, ** / (no space!) folders recursive. Defaults to '*'
				 * @param	{Boolean}	searchableOnly	An optional Boolean to respect any folders with file manifests that set themselves as non-searchable
				 * @param	{Boolean}	asPaths			An optional Boolean to return paths not URIs
				 * @param	{Boolean}	debug			An optional Boolean to print debugging information about the generated RegExp
				 * @param	{Object}	debug			An optional Object to return debugging information about the generated RegExp
				 * @returns	{Array}						An Array of URI strings
				 */
				glob:function(globPathOrURI, searchableOnly, asPaths, debug)
				{
					// ----------------------------------------------------------------------------------------------------
					// callback function

						function process(folderURI)
						{
							var itemURI, matchURI, isFolder, matches;
							var names = FLfile.listFolder(folderURI);
							for each(var name in names)
							{
								// debug
									//trace('> ' + name)

								// create URI
									itemURI		= folderURI + name;
									isFolder	= String(FLfile.getAttributes(itemURI)).indexOf('D') !== -1;
									if(isFolder)
									{
										itemURI += '/';
									}
									matchURI = itemURI.substr(uri.length);

								// skip if folder is not searchable
									if(searchableOnly && isFolder)
									{
										if( ! Utils.isSearchable(itemURI) )
										{
											continue;
										}
									}

								// do matching
									var matches	= matchURI.match(rxSearch);
									if(matches)
									{
										if(rxMatch.test(matchURI))
										{
											uris.push(asPaths ? URI.asPath(itemURI) : itemURI);
										}
										if(recursive && isFolder)
										{
											process(itemURI);
										}
									}
							}
						}

					// ----------------------------------------------------------------------------------------------------
					// determine root folder and glob pattern

						// convert path or URI
							globPathOrURI	= URI.toURI(globPathOrURI, 1);

						// variables
							var uri			= '';
							var pattern		= '';
							var parts		= String(globPathOrURI).split('/');

						// determine root folder and glob pattern
							while(parts.length)
							{
								var part = parts.shift();
								if(part.indexOf('*') === -1)
								{
									uri += part + '/';
								}
								else
								{
									pattern = [part].concat(parts).join('/');
									break;
								}
							}

						// cleanup
							uri			= uri.replace(/\/+$/, '/');
							pattern		= pattern || '*'

					// ----------------------------------------------------------------------------------------------------
					// build glob regexp

						// explanation

							/*
								How this works, is that the pattern:
							*/
							//		jsfl/**/*.txt
							/*
								Is first chunked into RegExp segments:

									1 - jsfl/
									2 - .+/
									3 - .+.txt

								Then the parts are built into sequentially inclusive groups,
								in reverse order, which allows the matching to match none, some,
								or all segments of the current URI:

									^((jsfl\/.+\/.+.txt$)|(jsfl\/.+\/$)|(jsfl\/$))

								This also allows us to exit early from a URI match if the part of
								the pattern before any recursive tokens (**) is not found.

								When a match is found, it is then re-matched again against the
								single, full matching mattern:

									^jsfl/.+/.+.txt$

								And added the final URI list if it matches.
							*/

						// build glob pattern

							// variables
								var recursive	= false;
								var current		= '';
								var parts		= [];

							// update parameters
								var _pattern		= (pattern || '**')
													.replace(/ /g, '%20')
													.replace(/\./g, '\\.');

							// special treatment for leading recursive file (but not folder) wildcards, e.g. **, **file, **file.jsfl
								if(/^\*\*[^\/]+$/.test(_pattern))
								{
									var part = _pattern
										.replace(/\*\*/, '[^/]+')
										.replace(/\*/, '[^/]+')
										+ '$'
									parts.push('.*');
									parts.push(part);
									recursive = true;
								}

							// else
								else
								{
									// create reg exp for parsing
										var chunkerPattern	= '(file:///|[^:]+:/|[^/]+/|[^/]+$)'.replace(/\//g, '\\/');
										var chunker			= new RegExp(chunkerPattern, 'g');

									// build
										var exec, part;
										while(exec = chunker.exec(_pattern))
										{
											part = exec[0];
											if(part.indexOf('**') !== -1)
											{
												part = part.replace(/\*+/g, '.*');
												recursive = true;
											}
											else if(part.indexOf('*') !== -1)
											{
												part = part.replace(/\*/g, '.*');
											}
											current += part;
											parts.push(current + '$');
										}
								}

							// make regexps
								var strParts	= ('^((' + parts.reverse().join(')|(').replace(/\//g, '\\/') + '))');
								var rxSearch	= new RegExp(strParts);
								var rxMatch		= new RegExp(parts[0]);

					// ----------------------------------------------------------------------------------------------------
					// final setup and run

						// output debugging information
							if(debug)
							{
								var print;
								if(debug === true)
								{
									print = true;
									debug = {};
								}
								debug.path		= URI.asPath(uri);
								debug.pattern	= pattern;
								debug.recursive	= recursive;
								debug.match		= Utils.rxUnescape(rxMatch.source);
								debug.search	= Utils.rxUnescape(rxSearch.source);
								debug.parts		= parts;

								if(print)
								{
									inspect(debug, 'Pattern breakdown for glob("' + pattern + '")');
								}
							}

						// process paths and grab URIs
							var uris		= [];
							process(uri);

						// return
							return uris;
				},

				/**
				 * Returns a list of URIs for a given glob path, folder reference and optional condition
				 * @param	{String}	folder		An absolute or relative folder path or URI (wildcards allowed)
				 * @param	{Folder}	folder		A valid Folder instance
				 * @param	{URI}		folder		A valid URI instance
				 * @param	{Number}	$depth		An optional max depth to search to
				 * @param	{Boolean}	$filesOnly	An optional Boolean to get files only
				 * @param	{RegExp}	$filter		A RegExp to match each URI
				 * @returns	{Array}					An Array of URIs
				 */
				getURIs:function(folder, $depth, $filesOnly, $filter, $extensions)
				{
					//TODO - check this works for recursive URIs
					//TODO - Pass true to set max depth to infinite

					// get URI
						var uri	= folder instanceof URI
									? folder.uri
									: folder instanceof Folder
										? folder.uri
										: typeof folder === 'string'
											? URI.toURI(folder, 1)
											:null;

					// path or URI
						if(uri)
						{
							if(/\/\*$/.test(uri))
							{
								uri = uri.replace('*', '');
								return Utils.walkFolder(uri, true);
							}
							else if(FLfile.exists(uri))
							{
								return new Folder(uri).uris;
							}
						}

					// error if not exists, or not a glob
						throw new Error('Error in Utils.getURIs(): The folder reference "' +folder+ '" is not a valid folder reference')

					// folder URI: c:/temp/
					// folder URI: c:/temp/*
					// name: 'template', 'library'
					// Array: ['template', 'filesystem'], 'library'

				},

				/**
				 * Returns the first valid path or URI from an Array of paths and/or URIs
				 * @param	{Array}		pathsOrURIs		An array of paths or URIs
				 * @returns	{String}					A URI-formatted String
				 */
				getFirstValidURI:function(uris)
				{
					var uri;
					while(uris.length)
					{
						uri = URI.toURI(uris.shift());
						if(FLfile.exists(uri))
						{
							return uri;
						}
					}
					return null;
				},

				/**
				 * Returns URIs which are searchable as defined within manifest.xml files in parent folders
				 * @param	{String}	pathOrURI		A valid path or URI
				 * @param	{String}	itemType		An optional String, 'files', 'folders' or 'all', defaults to 'all'
				 * @param	{Boolean}	returnPaths		An optional Boolean to return only the dowstream path segments
				 * @returns	{Array}						A URIList instance of the collected URIs / paths
				 */
				getSearchableURIs:function(pathOrURI, itemType, returnPaths)
				{
					// callbacks
						function processFolder(folderURI)
						{
							// check if folder has a manifest, and if it says to ignore this folder
								if( ! Utils.isSearchable(folderURI) )
								{
									return;
								}

							// update paths
								paths.push(returnPaths ? folderURI.substr(rootURI.length) : folderURI);

							// process contents
								var names = FLfile.listFolder(folderURI, 'directories');
								for each(var name in names)
								{
									processFolder(folderURI + name + '/');
								}
						}

						function processAll(folderURI)
						{
							// check if folder has a manifest, and if it says to ignore this folder
								if( ! Utils.isSearchable(folderURI) )
								{
									return;
								}

							// update paths
								if(itemType !== 'files')
								{
									paths.push(returnPaths ? folderURI.substr(rootURI.length) : folderURI);
								}

							// process contents
								var itemURI;
								var names = FLfile.listFolder(folderURI);
								for each(var name in names)
								{
									itemURI = folderURI + name;
									if(FLfile.exists(itemURI + '/'))
									{
										processAll(itemURI + '/');
									}
									else
									{
										paths.push(returnPaths ? itemURI.substr(rootURI.length) : itemURI);
									}
								}
						}

				// parameters
					itemType		= {files:'files', folders:'directories'}[itemType];

				// variables
					var rootURI		= new URI(pathOrURI).folder;

				// build search paths
					if(FLfile.exists(rootURI))
					{
						var paths	= [];
						var fn		= itemType === 'directories' ? processFolder : processAll;
						fn(rootURI);
						return paths;
					}
					else
					{
						throw new URIError('URIError in Utils.getSearchableURIs: The folder "' +pathOrURI+ '" is not a valid folder');
					}

				},

				/**
				 * Checks is a folder is searchable, depending on its manifest
				 * @param	{String}	pathOrURI	A valid path or URI
				 * @returns	{Boolean}				true or false depending on the result
				 */
				isSearchable:function(pathOrURI)
				{
					var uri = URI.toURI(pathOrURI) + 'manifest.xml';
					if(FLfile.exists(uri))
					{
						var manifest = new XML(FLfile.read(uri));
						if(manifest.folder.searchable == false)
						{
							return false;
						}
					}
					return true;
				},

				/**
				 * Recursively trawl a folder's contents, optionally calling a callback per element (note that $ arguments may passed in any order)
				 * @param	{String}	folder			The path or uri to a valid folder
				 * @param	{Folder}	folder			A valid Folder instance
				 * @param	{URI}		folder			A valid URI instance
				 * @param	{Function}	$callback		An optional callback of the format callback(element, index, depth, indent) to call on each element. Return false to skip processing of that element. Return true to cancel all iteration.
				 * @param	{Number}	$maxDepth		An optional max depth to recurse to, defaults to 100
				 * @param	{Boolean}	$returnURIs		An optional Boolean to return all parsed URIs
				 * @returns	{String}					The URI of the current element if the callback returns true
				 * @returns	{Array}						An array of URIs or paths if returnURIs is set as true
				 */
				walkFolder:function(folder, $callback, $maxDepth, $returnURIs)
				{
					// ------------------------------------------------------------
					// functions

						var indent;

						function process(element, index)
						{
							// callback
								var state = callback ? callback(element, index, depth, indent) : null;

							// return immediately if the callback returned true
								if(state === true)
								{
									return element;
								}

							// process if the callback didn't return false (false == skip element)
								if(state !== false)
								{
									// return if callback passed back true (true == stop all processing)
										if(state === true)
										{
											return true;
										}

									// collect uri
										uris.push(element.uri);

									// children
										if(element instanceof Folder && depth < maxDepth)
										{
											// dow down a level
												depth ++;
												indent += '	';

											// iterate
												var contents = element.contents;
												for(var i = 0 ; i < contents.length; i++)
												{
													// catch long URI errors
														if(contents[i].uri.length > 260)
														{
															URI.throwURILengthError(contents[i].uri);
														}

													// process content
														var result = process(contents[i], i)
														if(result)
														{
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
							var maxDepth	= 100;
							var callback	= null;
							var returnURIs	= false;

						// parameter shift
							for each(var arg in [$callback, $maxDepth, $returnURIs])
							{
								if(typeof arg === 'number')
									maxDepth = arg;
								else if(typeof arg === 'function')
									callback = arg;
								else if(typeof arg === 'boolean')
									returnURIs = arg;
							}

						// variables
							var uris		= [];
							var indent		= '';
							var depth		= 0;
							var uri			= folder instanceof URI
												? folder.uri
												: folder instanceof Folder
													? folder.uri
													: typeof folder === 'string'
														? URI.toURI(folder, 1)
														:null;

						// process
							if(uri)
							{
								if(FLfile.exists(uri))
								{
									var folder	= new Folder(uri);
									var result	=  process(folder, 0);
									uris.shift();
									return returnURIs ? uris : result;
								}
								throw new Error('Error in Utils.walkFolder(): The folder reference "' +folder+ '" does not exist')
							}

						// error
							throw new Error('Error in Utils.walkFolder(): The folder reference "' +folder+ '" is not a valid folder reference')
				},

				/**
				 * Returns a multiline string, showing the file/folder hierarchy of an input array of paths or URIs
				 * @param	{String}		source		A path or URI
				 * @param	{URI}			source		A URI instance
				 * @param	{Folder}		source		A Folder instance
				 * @param	{Array}			source		An array of paths or URIs
				 * @returns	{String}					The hierarchial representation
				 */
				makeTree:function(source, includeRoot)
				{
					var uri, paths;
					if(typeof source === 'string')
					{
						uri = URI.toURI(source, 1);
					}
					else if(source instanceof URI)
					{
						uri = source;
					}
					else if(source instanceof Folder)
					{
						uri = source.uri;
					}
					else if(Utils.isArray(source))
					{
						paths = source;
					}
					else
					{
						throw new TypeError('TypeError in Utils.makeTree(): the parameter source "' +source+ '" is invalid');
					}

					if(uri)
					{
						paths = Utils.glob(uri + '**', true, true);
					}

					if(paths && paths.length)
					{
						// parameters
							if(includeRoot && uri)
							{
								paths.push(URI.toPath(uri));
							}
							paths = paths.sort();

						// variables
							var segments, name, indent;
							var path	= paths[0].replace('file:///', '').replace(/\/*$/, '');
							var depth	= path.split('/').length - 1;
							var tree	= '';

						// process
							for each(path in paths)
							{
								path = path.replace('file:///', '').replace(/\/*$/, '');
								if(path == '')
								{
									continue;
								}
								segments	= path.split('/');
								name		= segments.pop();
								indent		= '\t'.repeat(segments.length - depth);
								tree		+= indent + '/' + name + '\n';
							}

						// return
							return tree;
					}

				},

				/**
				 * Convert a tabbed list of folder/ and file tokens to a list of paths - essentially the opposite of Utils.makeTree() (note that $dollar param can be passed in any order)
				 * @param		{String}		tree				A tabbed list of folder/ and file tokens
				 * @param		{String}		tree				A valid URI to a file containing a tabbed list of folder/ and file tokens
				 * @param		{Function}		$fnFile				An optional callback function to call for each file
				 * @param		{Function}		$fnFolder			An optional callback function to call for each folder
				 * @param		{Boolean}		$returnObjects		An optional boolean to return Folder and File objects rather than a list of paths
				 * @returns		{Array}								An Array of paths or Folder and File objects
				 */
				makePaths:function(tree, $fnFile, $fnFolder, $returnObjects)
				{
					// parameter shift
						var fnFile, fnFolder, returnObjects;
						for each(var param in [$fnFile, $fnFolder, $returnObjects])
						{
							if(typeof param === 'boolean')
							{
								returnObjects = param;
							}
							else if(typeof param === 'function')
							{
								if(!fnFile)
								{
									fnFile = param;
								}
								else
								{
									fnFolder = param;
								}
							}
						}

						inspect([tree, fnFile, fnFolder, returnObjects])

					// variables
						var text 		= URI.isFile(tree) ? xjsfl.file.load(tree) : tree;
						var lines		= text.split(/[\r\n]+/);

					// callbacks
						fnFile			= fnFile || function(){};
						fnFolder		= fnFolder || function(){};

					// variables
						var path;
						var depth		= 0;
						var segment, folder;
						var stack		= [];
						var elements	= [];

					// process lines
						for each(var line in lines)
						{
							// grab line
								var matches = line.match(/(\s*)(.+)/);

							// if there's a match, preocess it
								if(matches && matches[2].trim() !== '')
								{
									// variables
										depth		= matches[1].length;
										segment		= matches[2];
										folder		= segment.indexOf('/') !== -1

									// folder (indicated by '/' at end of line)
										if(folder)
										{
											if(depth >= stack.length)
											{
												stack.push(segment);
											}
											else if(depth < stack.length)
											{
												stack = stack.slice(0, depth);
												stack.push(segment);
											}
											path = stack.join('');
											elements.push(returnObjects ? new Folder(path) : path);
										}

									// file
										else
										{
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
				 * @param	{String}	name		The panel name
				 * @returns	{SWFPanel}				An SWFPanel object
				 */
				getPanel:function(name)
				{
					if(name)
					{
						name = String(name).toLowerCase();
						for(var i = 0; i < fl.swfPanels.length; i++)
						{
							if(fl.swfPanels[i].name.toLowerCase() === name)
							{
								return fl.swfPanels[i];
							}
						}
					}
					return null;
				},

				/**
				 * Returns an array of the the currently executing files, paths, lines, and code (most-recent first)
				 *
				 * @param	{Error}		error		An optional error object
				 * @param	{Boolean}	shorten		An optional Boolean to shorten any core paths with {xjsfl}
				 * @returns	{Array}					An array of the executing files, paths, lines and code
				 */
				getStack:function(error, shorten)
				{
					// error
						var strStack	= (error instanceof Error ? error : new Error('Stack trace')).stack;

					// parse stack
						var rxParts		= /^(.*)?@(.*?):(\d+)$/mg;
						var matches		= strStack.match(rxParts);

					// remove the fake error
						if( ! error )
						{
							matches = matches.slice(2);
						}

					// parse lines
						var stack		= [];
						var rxFile		= /(.+?)([^\\\/]*)$/;
						var parts, fileParts, path, file;

						for (var i = 0; i < matches.length; i++)
						{
							// error, file, line number
								rxParts.lastIndex	= 0;
								parts				= rxParts.exec(matches[i]);

							// file parts
								fileParts			= (parts[2] || '').match(rxFile);
								path				= fileParts ? fileParts[1] : '';
								file				= fileParts ? fileParts[2] : '';

							// stack object
								stack[i] =
								{
									line	:parseInt(parts[3]) || '',
									code	:parts[1] || '',
									file	:file,
									path	:path.replace(/\\/g, '/'),
									uri		:FLfile.platformPathToURI(path + file)
								};
						}

					// return
						return stack;
				},

				/**
				 * Binds the scope of a function to another object permanently
				 * @param		{Object}		scope		The new "this" scope for the function
				 * @param		{Function}		fn			The function to bind to the new scope
				 * @param		{...rest}		...rest		Any arguments to curry
				 * @returns		{Function}					The new bound function, or null if the function doesn't exist
				 * @example									Utils.bind(someObject, this[functionName])(); // otherwise the function would run in Window scope
				 * @see										http://fitzgeraldnick.com/weblog/26/
				 * @see										http://javascriptweblog.wordpress.com/2010/04/05/curry-cooking-up-tastier-functions/
				 */
				bind:function(scope, fn /* arguments to curry */)
				{
					// if the passed-in function is not a function, return null
						if(typeof fn !== 'function')
						{
							return null;
						}

					// otherwise, grab any additional arguments as parameters
						var params = Array.prototype.slice.call(arguments, 2);

					// then return a curried wrapper function
						return function ()
						{
							var args = Array.prototype.slice.call(arguments);
							return fn.apply(scope, args.concat(params));
						};
				},

			// ---------------------------------------------------------------------------------------------------------------
			// Other

				toString:function()
				{
					return '[class Utils]';
				}
		}

	// ---------------------------------------------------------------------------------------------------------------
	// register

		// xjsfl.classes.register('Utils', Utils);
	return Utils;
})();











// xjsfl
var xjsfl=(function(){


// ------------------------------------------------------------------------------------------------------------------------
//
//           ██ ██████ ██████ ██
//           ██ ██     ██     ██
//  ██ ██    ██ ██     ██     ██
//  ██ ██    ██ ██████ █████  ██
//   ███     ██     ██ ██     ██
//  ██ ██    ██     ██ ██     ██
//  ██ ██ █████ ██████ ██     ██████
//
// ------------------------------------------------------------------------------------------------------------------------
// xJSFL 

//
// xjsfl.file.load
// xjsfl.settings.newLine
// xjsfl.uri
// xjsfl.ui.show(this);


	/**
	 * xJSFL
	 *
	 * @overview	Rapid development framework for extending Adobe Flash
	 * @author		Dave Stewart:	dave@xjsfl.com
	 * @see			Main website:	http://www.xjsfl.com
	 * @see			Support:		http://www.xjsfl.com/support
	 * @see			License:		http://www.xjsfl.com/license
	 * @instance	xjsfl
	 */

	// Fake xjsfl instantation for Komodo autocomplete
	// 	if( ! xjsfl )
		if(typeof xjsfl === 'undefined')
		{
			xjsfl = { };
		}



// ------------------------------------------------------------------------------------------------------------------------
//
//  ██████        ██    ██   ██
//  ██            ██    ██
//  ██     █████ █████ █████ ██ █████ █████ █████
//  ██████ ██ ██  ██    ██   ██ ██ ██ ██ ██ ██
//      ██ █████  ██    ██   ██ ██ ██ ██ ██ █████
//      ██ ██     ██    ██   ██ ██ ██ ██ ██    ██
//  ██████ █████  ████  ████ ██ ██ ██ █████ █████
//                                       ██
//                                    █████
//
// ------------------------------------------------------------------------------------------------------------------------
// # Settings - Core settings and cached variables

	/**
	 * Core settings and cached variables
	 * @class	xjsfl.settings
	 * @ignore
	 */
	xjsfl.settings =
	{
		/**
		 * Application data
		 * Information about the Flash version the user is currently running
		 */
		app:
		{
			// Apple: "mac" | Windows: "win"
				platform:	fl.version.substr(0, 3).toLowerCase(),
				
			// an object property to test against
				os:			{
								mac:fl.version.substr(0, 3) == 'MAC',
								win:fl.version.substr(0, 3) == 'WIN'
							},

			// the product name of flash, i.e. CS4
				name:		(function(){
								var version = fl.version.match(/\w+ (\d+)/)[1];
								var name = { '9':'CS3', '10':'CS4', '11':'CS5', '12':'CS6', '13':'CS7' };
								return name[version] || 'Unknown';
							})(),

			// the integer version of Flash
				version:	parseInt(fl.version.match(/\w+ (\d+)/)[1]),

			// the CS version of Flash
				csVersion:	parseInt(fl.version.match(/\w+ (\d+)/)[1]) - 6

		},

		/**
		 * Folder URIs
		 * Common folders which may be used as placeholders in URI references, i.e. '{core}path/to/file.txt'
		 */
		folders:
		{
			// methods
				get:function()
				{
					var uris = [];
					for(var name in this)
					{
						if( ! /^(get|set)$/.test(name) )
						{
							uris.push(this[name]);
						}
					}
					return uris.sort().reverse();
				},

				set:function(name, uri)
				{
					if( ! /^(set|get)$/.test(this.name) )
					{
						this[name] = URI.toURI(uri, 1);
					}
				},

			// properties
				xjsfl:		xjsfl.uri,
				core:		xjsfl.uri + 'core/',
				modules:	xjsfl.uri + 'modules/',
				user:		xjsfl.uri + 'user/',
				flash:		fl.configURI,
				swf:		fl.configURI + 'WindowSWF/',

		},

		/**
		 * URIs
		 * An ordered list of base URIs which xJSFL uses when searching for files
		 * module uris are updated automatically when new modules are added
		 * @type {Object}
		 */
		uris:
		{
			// properties
				core:	[ ],
				module: [ ],
				user:	[ ],

			// methods

				/**
				 * Adds URIs to the URIs list
				 * @param	{String}	pathOrURI	A valid path or URI
				 * @param	{String}	type		The type of URI to add. Valid types are user, module, or core
				 */
				add:function(pathOrURI, type)
				{
					// check uri is valid
						var uri = URI.toURI(pathOrURI);

					// check URI exists
						if( ! FLfile.exists(uri))
						{
							throw new URIError('Error in xjsfl.settings.uris.add(): URI "' +uri+ '" does not exist');
						}

					// variables
						type	= type || 'user';
						uri		= uri.replace(/[\/]+$/g, '') + '/';	// ensure a single trailing slash

					// add if not already added
						if(this[type].indexOf(uri) == -1)
						{
							this[type].push(uri);
							xjsfl.settings.searchPaths.add(uri);
						}
				},

				/**
				 * Gets all URIs in order
				 * @returns	{Array}		An Array or URIs
				 */
				get:function()
				{
					var uris = xjsfl.settings.uris;
					return [].concat(uris.core).concat(uris.module).concat(uris.user);
				},

		},

		/**
		 * Search paths
		 * A cache of folder paths which xJSFL searches when loading files
		 */
		searchPaths:
		{
			add:function(uri)
			{
				if(URI.isURI(uri))
				{
					// grab the path
						var path = URI.toPath(uri, true);

					// get all searchable paths
						var paths = Utils.getSearchableURIs(uri, 'folders', true);
						xjsfl.output.trace('added ' +paths.length+ ' search paths for "' +path+ '"');
						if(paths.length > 50)
						{
							xjsfl.output.warn('WARNING! Adding this many search paths can slow down file searching. Consider using manifest.xml files to exlude sub folders');
						}

					//BUG - for some reason, an error is thrown when there are 70+ paths in pocket god.
							// it's not always this pattern either. And the error is only thrown when
							// calling xjsfl.settings.uris.add from the bootstrap.
							// WTF?

					// assign the paths as a new URIList
						this[uri] = new URIList(paths);
				}
			},

			/**
			 * returns an Array or URILists
			 * @param	{String}			Filter all paths by the first folder
			 * @returns	{Array}				An Array of URILists
			 */
			get:function(filter)
			{
				// variables
					/** @type {URIList}	A list of URIs */
					var list;
					var inputPaths;
					var outputPaths	= [];
					var uris		= xjsfl.settings.uris.get();

				// loop over URI lists in order, extract paths, and collect source URI + paths
					for each(var uri in uris)
					{
						list = this[uri];
						if(list)
						{
							inputPaths = filter ? list.filter(new RegExp('^' + filter.replace(/\/*$/, '/'))) : list.getURIs();
							for each(var path in inputPaths)
							{
								outputPaths.push(uri + path);
							}
						}
					}

				// return
					return outputPaths;
			},

		},

		/**
		 * Newline character depending on PC or Mac
		 * @type {String}
		 */
		newLine:fl.version.substr(0, 3).toLowerCase() === 'win' ? '\r\n' : '\n'

	}


// ------------------------------------------------------------------------------------------------------------------------
//
//  █████        ██
//  ██  ██       ██
//  ██  ██ █████ █████ ██ ██ █████
//  ██  ██ ██ ██ ██ ██ ██ ██ ██ ██
//  ██  ██ █████ ██ ██ ██ ██ ██ ██
//  ██  ██ ██    ██ ██ ██ ██ ██ ██
//  █████  █████ █████ █████ █████
//                              ██
//                           █████
//
// ------------------------------------------------------------------------------------------------------------------------
// # Debug - debugging methods for file, function and error

	/**
	 * @type {Object}	The xJSFL Debug object
	 * @class
	 */
	xjsfl.debug =
	{
		/**
		 * Tests a callback and outputs the error stack if the call fails. Add additional parameters after the callback reference
		 * @param	{Function}	fn			The function to test
		 * @param	{Array}		params		An optional Array of arguments or Arguments object to pass to the function
		 * @param	{Object}	scope		An optional scope to run the function in
		 * @returns	{Value}					The result of the function if successful
		 */
		func:function(fn, params, scope)
		{
			// feedback
				xjsfl.output.trace('testing function: "' + Utils.parseFunction(fn).signature + '"');

			// test!
				try
				{
					return fn.apply(scope || this, params);
				}
				catch(err)
				{
					this.error(err, true);
				}
		},

		/**
		 * Tests for errors in loaded JSFL files
		 */
		file:function(path)
		{
			// clear any previous errors
				//this.clear();
				if(xjsfl.halted)
				{
					//return;
				}

			// detect if there's an error loading files, either by the output panel, or by a delay, caused by the user responding to an alert box

				// detect delay since the file was loaded
					var delay		= new Date().getTime() - xjsfl.file.lastLoadTime;

				// grab panel output
					var outputURI	= xjsfl.uri + 'core/jsfl/run/temp/output-panel.txt';
					fl.outputPanel.save(outputURI);
					var output		= FLfile.read(outputURI);
					//FLfile.remove(outputURI);

				// determine error type, if any
					var state	= false;
					var message	= '...';
					if(delay > 1000)
					{
						message = 'a delay (possibly due to an error alert box) was detected';
						state	= true;
					}
					else if(/(The following JavaScript error\(s\) occurred:|Open a Flash document \(FLA\) before running this script\.)\s*$/.test(output))
					{
						message = 'Flash threw a JavaScript error';
						state	= true;
					}
					return true;


			// generate an error if the file appeared to load incorrectly
				if(state)
				{
					//TODO	Think about loading and eval()ing the file to detect errors.
					//		Would need to create a files in the same folder, i.e. "some file.debug.jsfl" 
					//		and eval from there so URI methods don't fail

					// create a new error object (but only the first time an error is trapped)
						if( ! xjsfl.halted )
						{
							// flags
								xjsfl.halted		= true;
								xjsfl.loading		= false;

							// build error
								var error			= new Error('<error>', '', 0);
								error.message		= "The currently-loading file wouldn't run, as " +message + '.';
								error.fileName		= URI.toURI(path);
								error.stack			= error.stack.replace('Error("<error>","",0)@:0', 'Exact cause of error unknown. Run file manually to debug@' +path+ ':0');

							// remove fake items
								var arr				= error.stack.split(/[\r\n]+/);
								arr.splice(1,2);
								error.stack			= arr.join('\n');

							// log a file warning
								xjsfl.output.log('JavaScript error in "' +path+ '"\n', Log.FILE, 3);

							// debug this error
								xjsfl.debug.error(error);

							// pop the stack!
								xjsfl.file.stack.pop();

							// throw a new Error
								//throw error;
								throw new Error('File load error');
						}
				}
		},


		/**
		 * Generates, logs and traces a human-readable error stack
		 *
		 * @param	{Error}		error		A JavaScript Error object
		 * @param	{Boolean}	log			An optional Boolean to log the error
		 * @param	{Boolean}	testing		Internal use only. Removes test() stack items
		 */
		error:function(error, testing)
		{
			// reload required classes if not defined
				if( ! xjsfl.classes.cache.Template )
				{
					// override include so dependencies aren't loaded
						include = function(){  };

					// load files needed for debugging
						var files =
						[
							'utils/Utils.jsfl',
							'utils/Class.jsfl',
							'objects/JSON.jsfl',
							'file/FileSystemObject.jsfl',
							'file/File.jsfl',
							'text/Output.jsfl',
							'text/Template.jsfl',
							'flash/PropertyResolver.jsfl',
							'text/Table.jsfl'
						];
						for each(var file in files)
						{
							fl.runScript(xjsfl.uri + 'core/jsfl/libraries/' + file);
						}
				}

			// variables
				var stack;
				if(error instanceof Error)
				{
					stack = xjsfl.classes.cache.Utils.getStack(error, true);
					if(testing)
					{
						stack.splice(stack.length - 3, 2);
					}
				}
				else
				{
					error	= new Error(error);
					stack	= Utils.getStack(error, true);
					stack	= stack.slice(1);
				}

			// log error as JSON
				var data = Utils.getValues(stack, ['uri', 'line', 'code'], true);
				fl.runScript(xjsfl.uri + 'core/jsfl/libraries/objects/JSON.jsfl');
				FLfile.write(xjsfl.uri + 'core/jsfl/run/temp/error.txt', JSON.encode({message:error.message, stack:data}));

			// generate error text
				if(true)
				{
					// template uris
						var uriErrors	= xjsfl.uri + 'core/assets/templates/errors/errors.txt';
						var uriError	= xjsfl.uri + 'core/assets/templates/errors/error.txt';

					// build errors
						var content = '';
						for(var i = 0; i < stack.length; i++)
						{
							stack[i].index = i;
							content += new xjsfl.classes.cache.Template(uriError, stack[i]).render(); // reference Template class directly
						}

					// build output
						var data		= { error:error.toString(), content:content };
						var output		= new xjsfl.classes.cache.Template(uriErrors, data).render();
				}
				else
				{
					var data = Utils.getValues(stack, ['path','file','line','code'], true)
					var output = '\n\n' + new Table(data).render(false);
				}

			// log
				xjsfl.output.warn('File load error:');
				xjsfl.output.log(output);
				trace(output.replace(/^[\r\n]+/, ''))

			// update flags
				xjsfl.loading	= false;
				//xjsfl.halted	= false;
		},

		/**
		 * Clears any existing errors & logs
		 */
		clear:function()
		{
			xjsfl.halted = false;
			var uri = xjsfl.uri + 'core/jsfl/run/temp/error.txt';
			if(FLfile.exists(uri))
			{
				FLfile.remove(uri);
			}
		},
	}


xjsfl.output={
	trace:console.log,
	log:console.log,
	warn:console.warn,
	error:console.error
}

xjsfl.uri = window.AnJsflScript.$ProjectFileDir$+"/";
// ------------------------------------------------------------------------------------------------------------------------
//
//  ██████ ██ ██
//  ██        ██
//  ██     ██ ██ █████
//  █████  ██ ██ ██ ██
//  ██     ██ ██ █████
//  ██     ██ ██ ██
//  ██     ██ ██ █████
//
// ------------------------------------------------------------------------------------------------------------------------
// # File - Methods to load framework assets, or handle common filesystem functionality

	/**
	 * Methods to load framework assets, or handle common filesystem functionality
	 * @class
	 */
	xjsfl.file =
	{
		get loading()
		{
			return xjsfl.file.stack.length > 0;
		},

		lastLoadTime:0,

		stackLimit:99,

		stack:[],

		/**
		 * Finds all files of a particular type within the cascading file system
		 *
		 * @param	{String}	type		The folder in which to look in to find the files, @see switch statement
		 * @param	{String}	name		A file name (pass no extension to use default), or partial file path
		 * @param	{Number}	returnType	An optional 0, 1 or -1; 0: all files (default), -1: the last file (user), 1:the first file (core)
		 * @returns	{String}				A single file path if found and return type is 1 or -1, or null if not
		 * @returns	{Array}					An Array of file uris if found, and return type is 0, or null if not
		 */
		find:function(type, name, returnType)
		{
			// --------------------------------------------------------------------------------
			// work out base uri

				// variables
					name = name ? String(name) : '';

				// file-specific variables
					var path, name, ext, which;

				// switch type
					switch(type)
					{
						// for scripts, return the last file found, from: core, modules, user (jsfl)
						case 'script':
						case 'scripts':
						case 'jsfl':
							path	= 'jsfl/';
							ext		= '.jsfl';
							which	= -1;
						break;

						// for libraries, return all found files, in order: core, modules, user (jsfl)
						case 'lib':
						case 'libs':
						case 'library':
						case 'libraries':
							path	= 'jsfl/libraries/';
							ext		= '.jsfl';
							which	= 0;
						break;

						// for full config path return the last file found from: core, modules, user (xml)
						case 'config':
						case 'settings':
							path	= 'config/';
							ext		= '.xml';
							which	= -1;
						break;

						// for templates, return the last file found, from: core, modules, user (txt, or supplied extension)
						case 'template':
							path	= 'assets/templates/';
							ext		= '.txt';
							which	= -1;
						break;

						// otherwise, return all files found, from: core, modules, user
						default:
							path	= type.replace(/\/+$/g, '') + '/';
							ext		= '';
							which	= 0;
					}

				// add default extension if not provided;
					name += name.match(/\.\w+$/) ? '' : ext;


			// --------------------------------------------------------------------------------
			// find files

				// variables
					var uris		= [];
					var paths		= xjsfl.settings.searchPaths.get(path);

				// check all paths for files
					for(var i = 0; i < paths.length; i++)
					{
						var uri = paths[i] + name;
						if(FLfile.exists(uri))
						{
							uris.push(uri);
						}
					}

				// return null if no URIs found
					if(uris.length === 0)
					{
						return null;
					}

			// --------------------------------------------------------------------------------
			// return

				// variables
					returnType = Number(returnType || which)

				// return
					if(returnType > 0)
					{
						return uris.shift();
					}
					else if(returnType < 0)
					{
						return uris.pop();
					}
					else
					{
						return uris;
					}
		},

		/**
		 * Attempts to directly load files, or find and run or return files from the cascading file structure.
		 * Parameters and return type vary depending on file type!
		 *
		 * @param	{String}		pathOrName	The relative or absolute path, or uri to the file (glob wildcards allowed)
		 * @param	{String}		pathOrName	The name or path fragment to a file, with or without the file extension
		 * @param	{String}		type		The folder type in which to look (i.e. settings) for the file(s)
		 *
		 * @returns	{Boolean}					A Boolean indicating Whether the file was successfully found and loaded
		 * @returns	{XML}						An XML object of the content of the file, if XML
		 * @returns	{String}					The string content of the file otherwise
		 */
		load:function (pathOrName, type)
		{
			/**
			 * 加载XML模板文件
			 * @param {string} templateName - 模板文件名
			 * @returns {string} XML字符串
			 */
			function loadTemplate(templateName) {
				// const dirname = window.AnJsflScript.$ProjectFileDir$;

				// requirejs + text! 加载模板文件
				var template = '';
				var templatePath ='text!./config/' + templateName;
				requirejs([templatePath], function (tm) {
					template = tm;
				})

				// return template;
				var xml = new XML(template);
				// console.log(xml);
				return xml;
			}

			return loadTemplate(pathOrName);
		},

		/**
		 * Saves data to file
		 * @param	{String}	pathOrURI	The path or URI to save data to
		 * @param	{String}	contents	The data to save
		 * @param	{Boolean}	force		An optional Boolean to force overwriting of readonly files
		 * @returns	{Boolean}				true or false depending on the result
		 */
		save:function(pathOrURI, contents, force)
		{
			var uri			= URI.toURI(pathOrURI, 1)
			var file		= new File(uri);
			

			//TODO Re-look at all this file permissions stuff - perforce always seems to throw something up
			if(force)
			{
				FLfile.setAttributes(uri, 'N');
			}
			
			file.contents	= contents;
			return file.exists && file.size > 0;
		},

		/**
		 * Copies a file from one location to another
		 * @param	{String}	srcPathOrURI	The source path or URI
		 * @param	{String}	trgPathOrURI	The target path or URI
		 * @returns	{Boolean}					true or false depending on whether the copy was successful or not
		 */
		copy:function(srcPathOrURI, trgPathOrURI)
		{
			// not yet implemented
		}
	}


// ------------------------------------------------------------------------------------------------------------------------
//
//  ██████ ██
//  ██     ██
//  ██     ██ █████ █████ █████ █████ █████
//  ██     ██    ██ ██    ██    ██ ██ ██
//  ██     ██ █████ █████ █████ █████ █████
//  ██     ██ ██ ██    ██    ██ ██       ██
//  ██████ ██ █████ █████ █████ █████ █████
//
// ------------------------------------------------------------------------------------------------------------------------
// # Classes - Core methods to load and register framework libraries and classes

	xjsfl.classes =
	{
		/** @type {Object}	Cache of all loaded URIs */
		loadedURIs:{},

		/** @type {Object}	Cache of class URIs */
		uris:{},

		/** @type {Object}	Cache of class definitions */
		cache:{},

		/**
		 * Load a class or array of classes from disk
		 *
		 * @param	{String}	fileRef		A class name
		 * @param	{String}	fileRef		A class filename or path, relative to any jsfl/libraries folder
		 * @param	{String}	fileRef		A wildcard string, i.e. '//user/jsfl/libraries/**.jsfl'
		 * @param	{Array}		fileRef		An Array of class filepaths
		 * @param	{Boolean}	reload		An optional Boolean to force a reload of loaded URIs
		 * @returns	{xjsfl}					The main xJSFL object
		 */
		load:function(fileRef, reload)
		{
			// catch errors
				if(arguments.length > 2 || typeof reload === 'string')
				{
					throw new Error('xjsfl.classes.load() accepts only 2 arguments: fileRef (which can be an Array) & reload.');
				}

			// exit if xjsfl is halted
				if(xjsfl.halted)
				{
					return;
				}

			// --------------------------------------------------------------------------------
			// Load URI references

				if(URI.isURI(fileRef) && String(fileRef).indexOf('*') === -1)
				{
					// variables
						var uri		= fileRef;
						var name	= uri.split('/').pop().replace(/\.\w+$/, '');

					// never reload xjsfl
						if(name === 'xjsfl')
						{
							return;
						}

					// load
						if(FLfile.exists(uri))
						{
							// otherwise, load
								if( ! this.loadedURIs[uri.toLowerCase()] || reload)
								{
									// exit if file is already loading
										if(xjsfl.file.stack.indexOf(uri) !== -1)
										{
											//trace('FILE ALREADY LOADED:' + uri);
											return null;
										}

									// exit if file.stack limit is reached
										if(xjsfl.file.stack.length > xjsfl.file.stackLimit)
										{
											xjsfl.output.log('not loading library: ' + name)
											return;
										}
										else
										{
											xjsfl.output.trace('loading library: ' + name);
										}

									// load class
										this.loadedURIs[uri.toLowerCase()] = true;
										xjsfl.output.log('load library: "' + name + '"', Log.FILE);
										xjsfl.file.load(uri);
								}
								else
								{
									xjsfl.output.log('already loaded library: "' + name + '"');
								}
						}
						else
						{
							xjsfl.output.warn('library "' + name + '" could not be found', Log.FILE);
						}
				}

			// --------------------------------------------------------------------------------
			// resolve wildcard

				else if(typeof fileRef === 'string' && fileRef.indexOf('*') !== -1)
				{
					// variables
						fileRef		= URI.toURI(fileRef, 1);
						var uris	= Utils.glob(fileRef);
						
					// debug
						if(uris.length)
						{
							xjsfl.output.log('found ' +uris.length+ ' file(s) files in path "' +fileRef+ '"', Log.FILE);
						}
						else
						{
							xjsfl.output.log('path "' +fileRef+ '" did not resolve to any files', Log.FILE);
						}

					// load files
						xjsfl.classes.load(uris, reload);
				}

			// --------------------------------------------------------------------------------
			// resolve single tokens

				else if(typeof fileRef === 'string' && /^\w+$/.test(fileRef) && fileRef != 'xjsfl')
				{
					var uris = xjsfl.file.find('library', fileRef);
					for each(var uri in uris)
					{
						xjsfl.classes.load(uri, reload);
					}
				}


			// --------------------------------------------------------------------------------
			// resolve Array

				else if(fileRef instanceof Array && fileRef.length)
				{
					var operation = reload ? 'require' : 'include';
					xjsfl.output.log(operation + ' classes: "' + fileRef.join('", "') + '"', Log.FILE);
					for each(var file in fileRef)
					{
						xjsfl.classes.load(file, reload);
					}
				}

			// return
				return this;
		},

		/**
		 * Registers a class/function for later retrieval
		 *
		 * @param	{String}	name		The name of the class / function / object to register
		 * @param	{Object}	obj			The actual class / function / object
		 * @param	{String}	uri			An optional URI to the object's file, defaults to the calling file's URI
		 * @returns	{xjsfl}					The main xJSFL object
		 */
		register:function(name, obj, uri)
		{
			// only log if we're not in the middle of an error
				if( ! xjsfl.halted )
				{
					xjsfl.output.log('registering ' +(/[a-z]/.test(name[0]) ? 'function ' : 'class ')+ name);
				}

			// work out URI before utils has loaded
				var error	= new Error();
				var rx		= /@(.+):\d+\s*$/;
				var match	= error.stack.match(rx);
				var uri		= uri || match ? FLfile.platformPathToURI(match[1]) : null;

			// store class
				xjsfl.classes.cache[name]	= obj;
				xjsfl.classes.uris[name]	= uri;

				//alert(name)
		},

		/**
		 * Internal function that restores a class/function to the supplied namespace
		 *
		 * @param	{Object}	scope		The scope to which the class should be restored to (defaults to window)
		 * @param	{string}	name		An optional name of the class to restore. if this is omitted, all classes are restored
		 * @returns	{xjsfl}					The main xJSFL object
		 */
		restore:function(scope, name)
		{
			// restore all classes if no name is passed
				if(arguments.length === 1)
				{
					for (name in xjsfl.classes.cache)
					{
						xjsfl.classes.restore(scope, name);
					}
				}

			// restore only one class
				else if(typeof name === 'string')
				{
					delete scope[name];
					scope[name] = xjsfl.classes.cache[name];
				}

			// return this for chaining
				return this;
		}
	}

// ------------------------------------------------------------------------------------------------------------------------
//
//  ██   ██          ██       ██
//  ███ ███          ██       ██
//  ███████ █████ █████ ██ ██ ██ █████ █████
//  ██ █ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██
//  ██   ██ ██ ██ ██ ██ ██ ██ ██ █████ █████
//  ██   ██ ██ ██ ██ ██ ██ ██ ██ ██       ██
//  ██   ██ █████ █████ █████ ██ █████ █████
//
// ------------------------------------------------------------------------------------------------------------------------
// # Modules - Core methods to handle the initialization and loading of modules

	/**
	 * Core methods to handle the initialization and loading of modules
	 *
	 * A namespace in which to store module code to prevent pollution of global
	 * scope as well as a couple of methods to add and load module code
	 *
	 * Needs to be created in a closure to keep the modules and manifests private
	 *
	 * The syntax below is somewhat convoluted, in order to trick Komodo into
	 * displaying the members correctly in autocomplete. Nothing else :)
	 *
	 * @ignore
	 * @class
	 */
	xjsfl.modules =
	(
		/**
		 * The module lazy-loading process goes like this...
		 *
		 * 1 - 	All modules reside in their own folder, with a manifest.xml in the root, and a
		 * 		bootstrap.jsfl in jsfl. The manifest stores all information about the module, and
		 * 		the bootstrap contains optional JSFL code that the module needs to run on startup.
		 *
		 * 2 - 	During the main xJSFL bootstrap, xjsfl.modules.find() is called, to search the main
		 *		modules folder for modules' manifest.xml files. Note that find() can also be called
		 *		manually from the user bootstrap to initialize modules external to the xJSFL modules
		 *		folder.
		 *
		 * 3 -	For any modules that are found, xjsfl.modules.init(path) is called and the module's
		 *		manifest information is cached, and any files in <module>/flash/ are copied to the
		 *		main Flash folder.
		 *
		 *		Note that no modules instances are instantiated yet!
		 *
		 * 4 -	When any panels are opened, xjsfl.modules.load(namespace) is called via MMExecute()
		 * 		from the AbtractModule.initialize() function. This loads the module's bootstrap.jsfl
		 *		file, which should in turn load the module's main JSFL file which contains the module's
		 *		JSFL properties and methods. This file then calls...
		 *
		 * 5 -	...xjsfl.modules.create(), which creates and registers the module internally, so it
		 *		can be retrieved if necessary via xjsfl.modules.getModule(namespace)
		 *
		 * @ignore
		 */
		function modules()
		{
			/**
			 * A private reference to all found manifests
			 */
			var manifests = {};

			/**
			 * A private reference to all loaded modules
			 */
			var modules = {};

			/**
			 * The property object that will be returned as xjsfl.modules
			 */
			xjsfl.modules =
			{
				/**
				 * Gets the manifest for a particular module namespace
				 * @param	{String}	namespace	The namespace of the manifest to get
				 * @returns	{XML}					The manifest XML
				 */
				getManifest:function(namespace)
				{
					var manifest = manifests[namespace];
					if(manifest)
					{
						return manifest;
					}
					throw new Error('xjsfl.modules.getManifest(): there is no manifest registered under the namespace "' +namespace+ '"');
				},

				/**
				 * Gets the Module instance for a particular module namespace
				 * @param	{String}	namespace	The namespace of the module (should match the AS3 and manifest values)
				 * @returns	{Module}				An xJSFL Module instance
				 */
				getModule:function(namespace)
				{
					var module = modules[namespace];
					if(module)
					{
						return module;
					}
					throw new Error('xjsfl.modules.getModule(): there is no module registered under the namespace "' +namespace+ '"');
				},

				/**
				 * Returns the base URI of all modules in a given folder and sub folder
				 * Called in the main bootstrap, and can be called manually in the user bootstrap to add other folders.
				 * @param	{String}	uri			An optional folder URI to search in, defaults to xJSFL/modules/
				 * @param	{Boolean}	init		An optional Boolean to initialize any found modules
				 * @returns	{Array}					An Array of module URIs
				 */
				find:function(uri, init)
				{
					// callback function to process files and folders
						function processFile(element)
						{
							if(element instanceof Folder)
							{
								// skip folders where manifests shouldn't be
								if(/assets|config|docs|temp|ui/.test(element.name))
								{
									return false;
								}
							}
							// if a manifest is found, with module information, initialize it
							else if(element.name === 'manifest.xml')
							{
								var manifest = xjsfl.file.load(element.uri);
								if(manifest.module.length())
								{
									var uri = element.parent.uri;
									uris.push(uri);
									if(init)
									{
										xjsfl.modules.init(uri);
									}
									return false;
								}
							}
						};

					// find and load modules automatically
						var uris	= [];
						uri			= uri ? URI.toURI(uri, 1) : xjsfl.settings.folders.modules;
						Utils.walkFolder(uri, processFile);

					// return
						return uris;
				},

				//TODO Does init() need to be public? Consider making it private

				/**
				 * Initializes, but does not instantiate a module, by caching its manifest files, and copying
				 * any panel resources to the Flash/WindowSWF folder, and commands to the Commands folder
				 *
				 * @param	{String}	folderNameOrURI		The module folder name or path, relative to xJSFL/modules/ i.e. "Snippets", or an absolute URI
				 */
				init:function(folderNameOrURI)
				{
					// ensure path has a trailing slash
						folderNameOrURI = folderNameOrURI.replace(/\/*$/, '/');
						
					// if URI is a path, and absolute, convert to be a URI (this allows us to use paths to load init user modules)
						if(URI.isAbsolute(folderNameOrURI) && URI.isPath(folderNameOrURI))
						{
							folderNameOrURI = URI.toURI(folderNameOrURI);
						}

					// if path is not a URI, it will probably be a path fragment, so default to the modules folder
						var uri = URI.isURI(folderNameOrURI) ? folderNameOrURI : xjsfl.settings.folders.modules + folderNameOrURI;

					// attempt to load the module's manifest
						var manifest = xjsfl.file.load(uri + 'manifest.xml');
						if(manifest)
						{
							manifest = manifest.module;
						}

					// if no module manifest, assume the module is code-only, and return
						else
						{
							return this;
						}

					// feedback
						function warn(message)
						{
							xjsfl.output.warn(message + ' in "' +URI.asPath(uri)+ 'manifest.xml"');
						}
						var name = String(manifest.meta.name);
						if( ! name )
						{
							warn('Manifest module.meta.name not declared');
							return false;
						}
						xjsfl.output.trace('registering module "' +name+ '"', 1);

					// update manifest with the *actual* URI, and store on main xjsfl object
						manifest.data.uri		= uri;
						var namespace			= String(manifest.data.namespace);
						if( ! namespace )
						{
							warn('Manifest module.data.namespace not declared');
							return false;
						}
						manifests[namespace]	= manifest;

					// add the URI to xjsfl.settings.folders
						var token			= String(manifest.data.uri.@token) || namespace;
						var token			= String(namespace);
						xjsfl.settings.folders[token] = uri;

					// add the URI to xjsfl.settings.uris.modules
						xjsfl.settings.uris.add(uri, 'module');

					// copy any flash assets
						var assetsURI = uri + 'flash/';
						if(FLfile.exists(assetsURI))
						{
							// variable and callback
								var copyURIs = [];
								var process = function(element)
								{
									if(element instanceof File)
									{
										var targetURI	= URI.reTarget(element.uri, fl.configURI, assetsURI);
										var targetFile	= new File(targetURI);
										if( ! targetFile.exists || targetFile.modified < element.modified)
										{
											copyURIs.push({fromURI:element.uri, toURI:targetFile.uri, toPath:targetFile.path});
										}
									}
								}

							// find new or updated files
								Utils.walkFolder(assetsURI, process);

							// copy files, if any
								if(copyURIs.length)
								{
									xjsfl.output.trace('copying / updating ' + copyURIs.length + ' asset(s) to the Flash configuration folder');
									for each(var obj in copyURIs)
									{
										new File(obj.fromURI).copy(obj.toURI, true);
										xjsfl.output.trace('copying asset to "' +obj.toPath+ '"', false, false);
									}
								}
								else
								{
									xjsfl.output.trace('assets are already up to date', false, false);
								}
						}


					// preload any modules which asked to load immediately
						if(String(manifest.data.preload) == 'true')
						{
							this.load(manifest.data.namespace);
						}

					// return
						return this;
				},

				/**
				 * Runs the module bootstrap to load code locally into the host panel
				 * @param	{String}	namespace	The namespace of the module to initialize
				 */
				load:function(namespace)
				{
					var manifest = manifests[namespace];
					if(manifest)
					{
						xjsfl.file.load(String(manifest.data.uri) + 'jsfl/bootstrap.jsfl');
					}
					else
					{
						throw new Error('xjsfl.modules.load(): there is no module registered under the namespace "' +namespace+ '"');
					}
				},

				/**
				 * Factory method to create an xJSFL module instance
				 * @param	{String}	namespace	The namespace of the module (should match the AS3 and manifest values)
				 * @param	{Object}	properties	The properties of the module
				 * @param	{Window}	window		A reference to the window the function was called from
				 * @returns	{Module}				An xJSFL Module instance
				 */
				create:function(namespace, properties, window)
				{
					// if manifest is not yet loaded (perhaps in development) attempt to initialize the module
						if( ! manifests[namespace])
						{
							this.init(namespace);
						}

					// create module
						try
						{
							// create module
								var module = new xjsfl.classes.cache.Module(namespace, properties, window);

							// register with module and window
								if(module)
								{
									modules[namespace] = module;
									window[namespace] = module;
								}

							// call constructor
								if(window)
								{
									module.init();
								}
								return module;
						}
						catch(err)
						{
							xjsfl.debug.error(err);
						}
				}
			}

			return xjsfl.modules;
		}
	)();


// ------------------------------------------------------------------------------------------------------------------------
//
//  ██  ██ ██
//  ██  ██ ██
//  ██  ██ ██
//  ██  ██ ██
//  ██  ██ ██
//  ██  ██ ██
//  ██████ ██
//
// ------------------------------------------------------------------------------------------------------------------------
// # UI - Global access to XUL UI dialogs

	/**
	 * Global access to XUL UI dialogs
	 * @type {Object}	Description
	 * @class
	 */
	xjsfl.ui =
	{
		dialogs:[],

		/**
		 * Show a new XUL dialog, nesting if one is already shown
		 * @param	{XUL}		xul			A valid XUL object
		 * @returns	{Object}				The settings object from the XMLUI
		 */
		show:function(xul)
		{
			// clear dialogs if there's no current XMLUI
				var xulid = fl.xmlui.get('xulid');
				if(xulid == undefined)
				{
					this.dialogs = [];
				}

			// grab new id
				xul.id			= this.dialogs.length;

			// update XML id placeholders with correct id
				 var xml		= xul
									.xml.prettyPrint()
									.replace(/{xulid}/g, xul.id)
									.replace(/xjsfl.ui.handleEvent\(0,/g, 'xjsfl.ui.handleEvent(' +xul.id+ ',');

			// save XML to dialog.xml
			// 	var uri			= xul.uri || xjsfl.uri + 'core/ui/dialog.xul';
			// 	var uri			= xul.uri || xjsfl.uri + 'config/ui/dialog.xul';
				var uri			= window.AnJsflScript.FOLDERS.Cache + '/ui/dialog.xul';
				if(FLfile.exists(uri))
				{
					FLfile.setAttributes(uri, 'W');
				}
				FLfile.write(uri, xml);

			// register XUL
				this.dialogs.push(xul);

			// debug
				xjsfl.output.log('Showing XUL dialog "' +xul.title+ '"');

			// show
				var settings = fl.xmlPanel(uri);

			// unregister
				this.dialogs.pop();

			// debug
				//Output.inspect(settings);

			// return settings
				return settings;
		},

		handleEvent:function(xulid, type, id)
		{
			var dialog = this.dialogs[xulid];
			if(dialog)
			{
				dialog.handleEvent(type, id);
			}
		},

		getFlashData:function()
		{
			var xul = this.dialogs[this.dialogs.length - 1];
			return xul ? xul.flashData : null;
		},

		setFlashData:function(data)
		{
			var xul = this.dialogs[this.dialogs.length - 1];
			xul ? xul.flashData = data: null;
		},

	}


// ------------------------------------------------------------------------------------------------------------------------
//
//  ██████                    ██
//  ██                        ██
//  ██     ██ ██ █████ █████ █████ █████
//  █████  ██ ██ ██ ██ ██ ██  ██   ██
//  ██     ██ ██ █████ ██ ██  ██   █████
//  ██      ███  ██    ██ ██  ██      ██
//  ██████  ███  █████ ██ ██  ████ █████
//
// ------------------------------------------------------------------------------------------------------------------------
// Events

	// add events stub. event code will be added in core/jsfl/libraries/events.jsfl
		if( ! xjsfl.events )
		{
			xjsfl.events =
			{
				/**
				 * Add an event handler function for a particular event type
				 * @param	{String}	type		A String Event constant
				 * @param	{Function}	callback	A callback function to be fired when the event happens
				 * @param	{String}	name		A named id with which to get, delete or overwrite the callback
				 * @param	{Object}	scope		An optional scope in which to call the callback function
				 */
				add:function(type, callback, name, scope){},
				
				/**
				 * Remove an event handler function for a single or all event types
				 * @param	{String}	type		A String Event constant
				 * @param	{String}	name		The supplied name of a previously-registered callback
				 */
				remove:function(type, name){},
				
				/**
				 * Remove all event handler functions for a single, or all event types
				 * @param	{String}	type	An optional String Event constant
				 */
				removeAll:function(type){},
				
				/**
				 * Get a reference to an event handler function for an event type
				 * @param	{String}	type		A String Event constant
				 * @param	{String}	name		A name of a previously-registered callback
				 * @returns	{Function}				An event handler function or null if it doesn't exist
				 */
				get:function(type, name){}
			};
		}


// ------------------------------------------------------------------------------------------------------------------------
//
//  ██       ██  ██   ██       ██ ██
//  ██           ██            ██
//  ██ █████ ██ █████ ██ █████ ██ ██ ████ █████
//  ██ ██ ██ ██  ██   ██    ██ ██ ██   ██ ██ ██
//  ██ ██ ██ ██  ██   ██ █████ ██ ██  ██  █████
//  ██ ██ ██ ██  ██   ██ ██ ██ ██ ██ ██   ██
//  ██ ██ ██ ██  ████ ██ █████ ██ ██ ████ █████
//
// ------------------------------------------------------------------------------------------------------------------------
// # Initialisation - Functions to initialize and reload the framework

	/**
	 * Final setup
	 */
	(function toString()
	{
		// These properties are assigned using extend, to remain hidden from Komodo's code-intelligence
			var props =
			{
				toString:function(){ return '[object xJSFL]'; }
			};
			for(var prop in props)
			{
				xjsfl[prop] = props[prop];
			};
	})()

	/**
	 * Initialize the environment by extracting variables / objects / functions to global scope
	 * @param	{Object}	scope			The scope into which the framework should be extracted
	 * @param	{String}	$scopeName		An optional id, which when supplied, traces a short message to the Output panel
	 * @param	{Array}		$classes		An optional Array of classes to load
	 */
	xjsfl.init = function(scope, $scopeName, $classes)
	{
		// parameter shift
			var scopeName	= '';
			var classes		= [];
			for each(var param in [$scopeName, $classes])
			{
				if(typeof param === 'string')
					scopeName = param;
				if(param instanceof Array)
					classes = param;
			}

		// if classes were specified, and search paths have been initialized, attempt to load classes
			if( ! xjsfl.halted )
			{
				var paths = xjsfl.settings.searchPaths.get();
				if(paths.length && classes.length)
				{
					// only reload classes if xJSFL is NOT loading, and the current file stack 
					// length is 0 (so nested classes don't xjsfl.init() and reload their classes)
					xjsfl.classes.load(classes, ! xjsfl.loading && xjsfl.file.stack.length == 0);
				}
			}

		// only initialize if not loading
			if( ! xjsfl.loading )
			{
				// debug
					if(scopeName)
					{
						xjsfl.output.trace('initializing [' +scopeName+ ']', 1);
					}

				// set flags
					xjsfl.file.stackLimit	= 99;

				// copy core variables and functions into scope
					xjsfl.initVars(scope);

				// copy registered classes into scope
					xjsfl.classes.restore(scope);

				// flag xJSFL initialized by setting a scope-level variable (xJSFL, not xjsfl)
					scope.xJSFL = xjsfl;
			}

	}
	return xjsfl;

})();












var XULControl = (function(Utils){

// ------------------------------------------------------------------------------------------------------------------------
//
//  ██  ██ ██  ██ ██        ██████              ██              ██
//  ██  ██ ██  ██ ██        ██                  ██              ██
//  ██  ██ ██  ██ ██        ██     █████ █████ █████ ████ █████ ██
//   ████  ██  ██ ██        ██     ██ ██ ██ ██  ██   ██   ██ ██ ██
//  ██  ██ ██  ██ ██        ██     ██ ██ ██ ██  ██   ██   ██ ██ ██
//  ██  ██ ██  ██ ██        ██     ██ ██ ██ ██  ██   ██   ██ ██ ██
//  ██  ██ ██████ ██████    ██████ █████ ██ ██  ████ ██   █████ ██
//
// ------------------------------------------------------------------------------------------------------------------------
// XUL Control

	/**
	 * XULControl
	 * @overview	OO representation of a dialog control
	 * @instance	control
	 */

	// xjsfl.init(this, ['Utils', 'XUL']);
	// xjsfl.init(this, ['Utils']);

	// --------------------------------------------------------------------------------
	// Constructor

		/**
		 * An object-oriented wrapper for XMLUI controls
		 * @param	{String}	id		The id of the control
		 * @param	{String}	type	The type (tag name) of the control item
		 * @param	{XUL}		xul		The parent XUL instance of the control
		 * @param	{XML}		xml		The XML of the control, that will be added to the UI
		 */
		XULControl = function(id, type, xul, xml)
		{
			// --------------------------------------------------------------------------------
			// # Properties
			
				/**
				 * @Type	{String}	The node id attribute of the control
				 * @name	id
				 */
				this.id			= id;

				/**
				 * @type	{String}	The XML node type of the control
				 * @name	type
				 */
				this.type		= type;

			// --------------------------------------------------------------------------------
			// # Getters - so the full xml doesn't it doesn't print when inspect()ing

				/**
				 * Gets the XUL instance the control belongs to
				 * @returns	{XUL}			A XUL instance
				 */
				this.getXUL = function()
				{
					return xul;
				}

				/**
				 * Gets the XML String that originally created the control
				 * @returns	{String}		An XML String
				 */
				this.getXML = function()
				{
					return xml;
				}

			// flags
				/**
				 * @type {Boolean} Whether the control should be enumerated for a value from XUL.values
				 */
				this.enumerable	= ! /^button|flash$/.test(type);

				/**
				 * @type {Boolean} Whether the control is a combination type like dropdown, list, or such like
				 */
				this.compound		= /^radiogroup|checkboxgroup|menulist|listbox$/.test(type);

			// if compound control, set child elements
				if(this.compound)
				{
					// grab XML child nodes
						var elements;
						switch(type)
						{
							case 'radiogroup':
								elements = xml..radio;
							break;
							case 'checkboxgroup':
								elements = xml..checkbox;
							break;
							case 'menulist':
								elements = xml..menuitem;
							break;
							case 'listbox':
								elements = xml..listitem;
							break;
						}

					// assign elements
						this.elements = {};
						for each(var element in elements)
						{
							var value = Utils.parseValue(String(element.@value));
							this.elements[value] = {id:element.@id, label:element.@label, value:value};
						}
				}
		}

	// --------------------------------------------------------------------------------
	// Prototype
	
		//TODO Subclass XULControl with simple and complex types
		//TODO Add ability to query both indices and values of compound controls

		XULControl.prototype =
		{
			// properties
				id:				'',
				type:			'',

			// flags
				enumerable:		true,
				compound:		false,

			// accessors

				get rawValue()
				{
					// work out if the dialog is open, or closed (existance of settings.dismiss implies it's closed)
						var settings	= this.getXUL().settings;
						var open		= settings && settings.dismiss === undefined;

					// grab the (String) value for the control
						var value		= open ? fl.xmlui.get(this.id) : settings[this.id];

					// return
						return value;
				},

				/**
				 * @type {Value} Returns the actual vlue of the control, rather than just the string
				 */
				get value()
				{
					//TODO - see how we can tidy up this settings > open > state chain - it's unweildy!
					
					// work out if the dialog is open, or closed (existance of settings.dismiss implies it's closed)
						var settings	= this.getXUL().settings;
						var open		= settings && settings.dismiss === undefined;

					// raw value
						var value		= this.rawValue;

					// parse to a real value
						switch(this.type)
						{
							case 'checkboxgroup':
								value = [];
								for each(var element in this.elements)
								{
									var id		= element.id;
									var state	= open ? fl.xmlui.get(id) : settings[id];
									if(state === 'true')
									{
										value.push(element.value);
									}
								}
							break;

							case 'colorchip':
								value = value.substr(0,2) == '0x' ? parseInt(value, 16) : value.substr(1);
							break;

							case 'popupslider':
								value = parseInt(value);
								value = isNaN(value) ? null : value;
							break;

							case 'checkbox':
							case 'textbox':
							case 'targetlist':
								value = Utils.parseValue(value);
								if(this.type === 'textbox' && typeof value === 'string')
								{
									value = value.replace(/\r\n/g, '\n');
								}
							break;

							case 'choosefile':
								value = value.replace(/unknown:/, '')
							break;

							default:
								value = Utils.parseValue(value);
						}

					// debug
						//inspect(value)

					// return
						return typeof value === 'string' && value === '' ? null : value;
				},

				set value(value)
				{
					// debug
						//trace('Setting ' + this.id + ':' + value);

					// set values per element type
						switch(this.type)
						{
							case 'checkboxgroup':
								for each(var element in this.elements)
								{
									var arr		= value.filter(function(e, i){return String(element.value) == String(e)});
									var state	= arr.length == 1;
									fl.xmlui.set(element.id, state);
								}
							break;

							case 'choosefile':
								// do nothing
							break;

							default:
								fl.xmlui.set(this.id, value);
						}
				},

				/**
				 * @type {Boolean} Set the visible state of the control
				 */
				set visible(state)
				{
					fl.xmlui.setVisible(this.id, state);
				},

				/**
				 * @type {Boolean} Get the visible state of the control
				 */
				get visible()
				{
					return fl.xmlui.getVisible(this.id);
				},

				/**
				 * @type {Boolean} Set the enabled state of the control
				 */
				set enabled(state)
				{
					fl.xmlui.setEnabled(this.id, state);
				},

				/**
				 * @type {Boolean} Get the enabled state of the control
				 */
				get enabled()
				{
					return fl.xmlui.getEnabled(this.id);
				},

			// compound controls only

				/**
				 * @type {Array} An array of child elements (dropdown & menulist only)
				 */
				elements:null,

				/**
				 * @type {Array} Get the values of a radiobuttongroup, listbox, or dropdown child items
				 */
				get values()
				{
					var values = [];
					for each(var element in this.elements)
					{
						values.push(element.value);
					}
					return values;
				},

				/**
				 *
				 * @type {Array} Sets the child items of a listbox or dropdown. The value should be an array of primitive values, or an Array of Objects of the format {'label':value}
				 */
				set values(values)
				{
					if(/^menulist|listbox$/.test(this.type))
					{
						var elements = [];
						for (var i = 0; i < values.length; i++)
						{
							var value = values[i];
							if(typeof value === 'object')
							{
								for(var label in value)
								{
									elements.push({label:label, value:value[label]});
								}
							}
							else
							{
								elements.push({label:value, value:value});
							}
						}
						fl.xmlui.setControlItemElements(this.id, elements);
						this.elements		= elements;
						this.selectedIndex	= 0;
					}
				},

				/**
				 * @type {Number} Sets the selected index of the control
				 */
				set selectedIndex(index)
				{
					if(this.compound)
					{
						this.value = this.values[index];
					}
				},

				/**
				 * @type {Number} Gets the selected index of the control
				 */
				get selectedIndex()
				{
					if(this.compound)
					{
						return this.values.indexOf(this.value);
					}
					return -1;
				},

			// validation

				update:function(settings)
				{
					// debug
						//trace(this.id)

					// grab the (String) value for the control
						var value	= settings[this.id];

					// update controls
						switch(this.type)
						{
							case 'checkboxgroup':
								for each(var element in this.elements)
								{
									var id		= element.id;
									var state	= settings[id];
									fl.xmlui.set(id, state);
								}
							break;

							case 'checkbox':
								fl.xmlui.set(this.id, value || false);
							break;

							case 'choosefile':
							case 'checkbox':
							case 'colorchip':
							case 'popupslider':
							case 'textbox':
							case 'targetlist':
							default:
								fl.xmlui.set(this.id, value || '');
						}
				},

				/**
				 * Validates the control's value and returns an error message if invalid
				 * @returns	{String}		The error message if invalid, or null if valid
				 */
				validate:function()
				{
					//TODO Implement proper validation using rules, and the Validation class
					var valid = true;
					switch(this.type)
					{
						case 'popupslider':
							if(this.value === null)
							{
								valid = false;
							}
						break;

						case 'textbox':
						case 'expression':
						case 'colorchip':
							if(String(this.rawValue).trim() == '')
							{
								valid = false;
							}
						break;
					}

					return valid ? null : 'Field "' +this.id+ '" is required';
				},

				/**
				 * A string representation of the control
				 * @returns	{String}		A string representation of the control
				 */
				toString:function()
				{
					return '[object XULControl id="'+this.id+'" type="'+this.type+'" value="' +this.value+ '"]';
				}

		}
		
	// ---------------------------------------------------------------------------------------------------------------
	// register

		// xjsfl.classes.register('XULControl', XULControl);
return XULControl;
})(Utils);










var XULEvent=(function(){

// ------------------------------------------------------------------------------------------------------------------------
//
//  ██  ██ ██  ██ ██        ██████                    ██
//  ██  ██ ██  ██ ██        ██                        ██
//  ██  ██ ██  ██ ██        ██     ██ ██ █████ █████ █████
//   ████  ██  ██ ██        █████  ██ ██ ██ ██ ██ ██  ██
//  ██  ██ ██  ██ ██        ██     ██ ██ █████ ██ ██  ██
//  ██  ██ ██  ██ ██        ██      ███  ██    ██ ██  ██
//  ██  ██ ██████ ██████    ██████  ███  █████ ██ ██  ████
//
// ------------------------------------------------------------------------------------------------------------------------
// XUL Event 


	/**
	 * XUL Event 
	 * @overview	A XUL Event class to pass parameters to event callbacks
	 * @instance	event
	 */

	// --------------------------------------------------------------------------------
	// Constructor

		/**
		 * A XUL Event class to pass parameters to event callbacks
		 * @param	{String}		type		The type of event, i.e. 'click', 'change', 'create'
		 * @param	{XULControl}	control		The xJSFL XULControl the event was dispatched by
		 * @param	{XUL}			xul			The xJSFL XUL instance the control belongs to
		 * @param	{XMLUI}			xmlui		The Flash XMLUI instance the control belongs to
		 */
		XULEvent = function(type, control, xul, xmlui)
		{
			/**
			 * @type {String}		The type of event, i.e. 'click', 'change', 'create'
			 */
			this.type		= type;

			/**
			 * @type {XULControl}	The xJSFL XULControl the event was dispatched by
			 */
			this.control	= control;

			/**
			 * @type {XUL}			The xJSFL XUL instance the control belongs to
			 */
			this.xul		= xul;

			/**
			 * @type {XMLUI}		The Flash XMLUI instance the control belongs to
			 */
			this.xmlui		= xmlui;

			this.toString = function()
			{
				var control		= this.control ? ' control="' +this.control.id+ '"' : '';
				return '[object XULEvent type="' +this.type+ '"' +control+ ' xul="' +this.xul.id+ '"]';
			}
		}

	// ---------------------------------------------------------------------------------------------------------------
	// register

		// xjsfl.classes.register('XULEvent', XULEvent);
return XULEvent;
})();












var __XML__=(function(Utils, xjsfl){


// ------------------------------------------------------------------------------------------------------------------------
//
//  ██  ██ ██   ██ ██
//  ██  ██ ███ ███ ██
//  ██  ██ ███████ ██
//   ████  ██ █ ██ ██
//  ██  ██ ██   ██ ██
//  ██  ██ ██   ██ ██
//  ██  ██ ██   ██ ██████
//
// ------------------------------------------------------------------------------------------------------------------------
// XML


	/**
	 * XML
	 * @overview	XML extensions to work around Spidermonkey's buggy E4X declarate filtering
	 * @instance	xml
	 */

(function xml()
{
	// includes
	// 	xjsfl.init(this, ['Utils']);

		// var inspect=fl.trace;
	// --------------------------------------------------------------------------------
	// RegExps
	
		/**
		 * Finds the full path
		 * @type {RegExp}	operator, node, index, filter, attribute, matchIndex
		 * @ignore
		 */
		var rxPath			= /(?:(\.{0,2})([\-*\w]+))?(?:\[(\d+)\])?(?:\.\((.+?)\))?(?:\.(@[\-\w]+))?/g;
		
		/**
		 *
		 * @type {RegExp}	type, attr, operator, value
		 * @ignore
		 */
		var rxFilter		= /([@#\.])([-\w_:]+)([\^\$!=<>]+)?([^"'\(\)]+)?/;
		
		/**
		 * 
		 * @type {RegExp}	.(type, attr, operator, value) / 
		 * @ignore
		 */
		var rxFilterOnly	= new RegExp('^\.?\\(' +rxFilter.source+ '\\)$');
		
		/**
		 * Matches an attribute
		 * @type {RegExp}	i.e. @name, @some-name, @some_name
		 * @ignore
		 */		
		var rxAttribute		= /^@[-\w_]+$/;
		
			
	// --------------------------------------------------------------------------------
	// Find
	
		/**
		 * Alternative syntax for get, which allows a single filter to be passed in
		 *
		 * @param	{String}	path		An xJSFL E4X Path expression to a node
		 * @param	{Boolean}	descendants	An optional Boolean to debug the path to the node
		 * @returns	{XMLList}				An XML list of targetted nodes
		 * @example							xml.find('#id');
		 * @example							xml.find('.class');
		 * @example							xml.find('@name=dave);
		 */
		function find(attribute, descendants)
		{
			var path = '';
			return this.get(path);
		}
		XML.prototype.function::find = find;
		
	// --------------------------------------------------------------------------------
	// Get
	
		/**
		 * Gets nodes according to an path or callback
		 *
		 * @param	{String}	path		An xJSFL E4X Path expression to a node
		 * @param	{Boolean}	debug		An optional Boolean to debug the path to the node
		 * @returns	{XMLList}				An XML list of targetted nodes
		 * @example							xml.get('#id');
		 * @example							xml.get('.class');
		 * @example							xml.get('a.b.c.(@name=dave)');
		 * @example							xml.get('a.b.c.(@name=dave).d.e.@attr');
		 * @see								http://www.connectedpixel.com/blog/e4x/callbackfilters
		 */
		function get(path, debug)
		{
			// if a single attribute is passed, return attribute matches
				if(rxAttribute.test(path))
				{
					return this[path];
				}
			
			// if a single filter is specified, filter the current node / XMLList
				if(rxFilterOnly.test(path))
				{
					return this.filter(path);
				}
				
			// process
				var parent		= this;
				var pathMatches	= Utils.match(path, rxPath, null, true);
				
				while(pathMatches.length)
				{
					// current match segment
						var pathMatch	= pathMatches.shift();
						
					// variables
						var operator		= pathMatch[1];
						var node			= pathMatch[2];
						var index			= pathMatch[3];
						var filter			= pathMatch[4];
						var attribute		= pathMatch[5];
						var matchIndex		= pathMatch[6];
						
					// debug
						var currentPath	= path.substr(0, matchIndex + pathMatch[0].length);
						if(debug)
						{
							inspect(Utils.combine('match,operator,node,index,filter,attribute,matchIndex', pathMatch), '\nXML > processing path "' + currentPath + '"');
						}
						
					// grab elements
						var nullList	= new XMLList();
						var elements	= operator == '..' ? parent.descendants(node) : parent.elements(node);
						
					// resolve index
						if(index !== '')
						{
							var length	= elements.length();
							var index	= parseInt(index);
							if(index >= length)
							{
								return nullList;
							}
							elements	= elements[index];
						}
						
					// resolve filter
						else if(filter !== '')
						{
							elements = elements.filter(filter);
						}
	
					// if there are still matches to process...
						if(pathMatches.length > 0)
						{
							// at this point, we should hopefully have a single node
								length = elements.length();
								if(length == 1)
								{
									parent = elements[0];
								}
							
							// if not, we can't go forward, so return an empty XMLList
								else if(length == 0)
								{
									if(debug)
									{
										throw new Error('The path "' + currentPath + '" doesn\'t contain any nodes');
									}
									return nullList;
								}
								else if(length > 1)
								{
									if(debug)
									{
										throw new Error('The path "' + currentPath + '" has more than one node');
									}
									return nullList;
								}
						}
				}
				
			// return
				//return elements.nodeKind() === 'attribute' ? Utils.parseValue(elements) : elements;
				
			// return
				if(attribute)
				{
					return elements[attribute];
				}
				else
				{
					return elements;
				}
		}
		XML.prototype.function::get = get;
		
		
	// --------------------------------------------------------------------------------
	// Set
		
		/**
		 * Sets a child node on the node via String path
		 *
		 * @param	{String}	path		An xJSFL E4X Path expression to a node
		 * @param	{Object}	value		A value to assign or append to the targetted node
		 * @param	{Boolean}	append		An optional Boolean to append rather than replace/update the targetted node
		 * @param	{Number}	append		An optional index to insert, rather than replace the current node.
		 * @param	{Boolean}	debug		An optional Boolean to debug the path to the node
		 * @returns	{XML}					The node the value was set on
		 */
		function set(path, value, append, debug)
		{
			//TODO add in support to create new nodes by adding an index a.b.c[1] = 'new node'
			//TODO Add shorthand for a.b.c[] meaning 'append node'
			//TODO move index after filter a.(@name=dave)[3], so filtered nodes can then be selected by index
			//TODO move config.set() functionality here
			
			// if a single attribute is passed, set the value
				if(rxAttribute.test(path))
				{
					if(this.length() == 1)
					{
						this[path] = value;
					}
					return this;
				}
			
			// pre-process any single filters
				if(rxFilterOnly.test(path))
				{
					path = '*.(' +path+ ')';
				}
				
			// process
				var child;
				var parent		= this;
				var pathMatches	= Utils.match(path, rxPath, null, true);
				while(pathMatches.length)
				{
					// current match segment
						var pathMatch		= pathMatches.shift();
						
					// variables
						var operator		= pathMatch[1];
						var node			= pathMatch[2];
						var index			= pathMatch[3];
						var filter			= pathMatch[4];
						var attribute		= pathMatch[5];
						var matchIndex		= pathMatch[6];
						
					// debug
						var currentPath	= path.substr(0, matchIndex + pathMatch[0].length);
						if(debug)
						{
							inspect(Utils.combine('match,operator,node,index,filter,attribute,matchIndex', pathMatch), '\nXML > processing path "' + currentPath + '"');
						}
						
					// grab elements
						var elements	= operator == '..' ? parent.descendants(node) : parent.elements(node);
						var length		= elements.length();
						
					// if there are children, attempt to walk down
						if(length > 0)
						{
							if(filter !== '')
							{
								var children = elements.filter(filter);
								if(children.length())
								{
									elements	= children;
								}
								//TODO if a filter is passed, and not found, we just use the original list, rather than failing. Do we want to do this?
								parent		= elements[0];
							}
							else
							{
								var index	= index && index < length ? parseInt(index) : length - 1;
								parent		= elements[index];
							}
						}
						
					// if no children were found, create the new node
						if(elements.length() == 0)
						{
							// debug
								if(debug)
								{
									trace('XML > No <' +node+ ' /> node on ' + parent.name() + ' for current path "' + currentPath + '"')
								}

							// create node
								parent.appendChild(<{node} />);
								parent = parent[node];
							
							// check if a filter was set, and if so, apply its properties
								if(filter)
								{
									var filterMatches = filter.match(rxFilter);
									if(filterMatches)
									{
										// variables
											var type		= filterMatches[1];
											var attr		= filterMatches[2];
											var operator	= filterMatches[3];
											var val			= filterMatches[4];
											
										// resolve id and class shortcuts
											var attrs = {'#':'id', '.':'class'};
											if(type in attrs)
											{
												val			= attr;
												attr		= attrs[type];
												operator	= '=';
											}
											
										// debug
											if(debug)
											{
												format('XML > Adding attribute: {attr}="{value}"', attr, val);
											}
											
										// assign
											if(operator == '=')
											{
												parent['@' + attr] = val;
											}
									}
								}
						}
						
				}
				
			// finally, assign the value
				if(attribute)
				{
					parent[attribute] = value;
				}
				else
				{
					if(typeof value === 'xml')
					{
						// update variables
							var child	= parent;
							var parent	= parent.parent();
							
						// add new value
							if(typeof append === 'number')
							{
								var child = parent.*[append];
								parent.insertChildBefore(child, value);
							}
							else
							{
								parent.appendChild(value);
							}
						
						// if not appending, remove the original
							if(append === undefined)
							{
								var index = child.childIndex();
								delete parent.*[index];
							}
					}
					else
					{
						//TODO Check that vanilla values work
						if(append)
						{
							//parent = parent.parent();
							trace(parent.toXMLString())
							parent.* += value;
						}
						else
						{
							var index	= parent.childIndex();
							parent.*[index] = value;
						}
					}
					/*
					if(length > 1)
					{
						trace('PARENT')
						parent.* += value;
					}
					else
					{
					}
					*/
				}
				
			// return
				return parent;
		}
		XML.prototype.function::set = set;
	

	// --------------------------------------------------------------------------------
	// Remove
		
		/**
		 * Remove the current node/attribute(s), or targeted node/attribute(s) from the current node
		 *
		 * @param	{String}	path		An optional xJSFL E4X Path expression to a node
		 * @returns	{Boolean}				True or false, depending on a sucessful deletion. false means the node has no parent, or has already been deleted
		 */
		function remove(path, debug)
		{
			// remove single attributes
				if(rxAttribute.test(path))
				{
					delete this[path];
				}
				
			// remove node(s) from parent
				else
				{
					var nodes = path ? this.get(path, debug) : this;
					if(nodes)
					{
						for (var i = nodes.length() - 1; i >= 0; i--)
						{
							var node	= nodes[i];
							var parent	= node.parent();
							if(node.nodeKind() === 'attribute')
							{
								var name = node.name();
								delete parent['@' + name];
							}
							else
							{
								var index = node.childIndex();
								delete parent.*[index];
							}
						}
					}
				}
		}
		XML.prototype.function::remove = remove;

		
	// --------------------------------------------------------------------------------
	// Filter
		
		/**
		 * Filters the existing nodeset using an xJSFL E4X callback expression
		 *
		 * @param	{String}	path		An xJSFL E4X Path expression to a node
		 * @returns	{XMLList}				An XML list of targetted nodes
		 */
		function filter(filter)
		{
			// debug
				//trace('FILTERING:' + filter)			
			
			// function
				function makeCallback(type, attr, operator, value)
				{
					// variables
						var callback;
						var attrs = {'#':'id', '.':'class'};
						if(type in attrs)
						{
							value		= attr;
							attr		= attrs[type];
							operator	= '=';
						}
						
					// callbacks
						switch(operator)
						{
							case '':	callback	= function(node){ return node.attribute(attr).length(); };		break;
							case '=':                                                                           	
							case '==':	callback	= function(node){ return node.attribute(attr) == value; };		break;
							case '!=':	callback	= function(node){ return node.attribute(attr) != value; };		break;
							case '<':	callback	= function(node){ return node.attribute(attr) < value; };		break;
							case '>':	callback	= function(node){ return node.attribute(attr) > value; };		break;
							case '<=':	callback	= function(node){ return node.attribute(attr) <= value; };		break;
							case '>=':	callback	= function(node){ return node.attribute(attr) >= value; };		break;
							case '^=':	
							case '$=':	var rxStr	= operator === '^=' ? '^' + value : value + '$';
										var rx		= new RegExp(rxStr);
										callback	= function(node){ return rx.test(String(node.attribute(attr))); };
							break;
							default:	callback	= function(node){ return false; }
						}
						
					// return
						return callback;
				}
				
			// variables
				var elements		= this;
				var filterMatches	= filter.match(rxFilter);
				
			// process
				if(filterMatches)
				{
					var params		= filterMatches.splice(1); // remove original match
					var callback	= makeCallback.apply(this, params);
					elements		= elements.(callback(function::valueOf()));
				}
				
			// return
				return elements;

		}
		// Should this be XMLList!?
		XML.prototype.function::filter = filter;
		
		
	// --------------------------------------------------------------------------------
	// PrettyPrint
		
		/**
		 * Returns a pretty-printed XML string with correct tabbing and linespacing
		 *
		 * @param	{Object}	useSystemNewline	An optional Boolean to 
		 * @returns	{String}						An XML String
		 */
		function prettyPrint(useSystemNewline)
		{
			return this.toXMLString().replace(/ {2}/g, '\t').replace(/\n/g, useSystemNewline ? xjsfl.settings.newLine : '\n');
			// return this.toXMLString().replace(/ {2}/g, '\t').replace(/\n/g, '\n');
		}
		XML.prototype.function::prettyPrint = prettyPrint;


})();

/*
	var xml =
		<xml>
			<path>
				<to>
					<node index="1" value="value1" id="ID"/>
					<node index="2" value="value2" />
					<node index="3" value="value3" class="green"/>
					<node index="4" value="value4" class="red">
						<target index="5" id="dummy"/>
						<target index="6" id="gateway" class="green">
							<node index="7" id="final" />
						</target>
					</node>
				</to>
				<node index="8" value="value1" id="ID"/>
			</path>
			<node index="9" value="value1" id="ID"/>
		</xml>
*/
		

/*
	//var path	= "xml.path.to.node.(.value4).target.(#gateway).node.(@value=Dave)";
	//var path	= "xml.path.to.node.(function::attribute('value') == 'value4').target.(function::attribute('id') == 'gateway')";
	//var path	= "xml.path.to.node.(function::attribute('value') == 'value4').target";
	//var node	= xml.path.to.node.(function::attribute('value') == 'value4').target.(function::attribute('id') == 'gateway')
	//var nodes	= eval(str);
	
	
	//var path	= "path.to.node.(.red).target.(#gateway).@class";
	
	//var path = 'path.to'
	//var path	= ".*.(.green)";
	//var path	= ".green";
	//var path	= "@class^=g";
	
	//var path	= "@index>1";
	//var path	= "path.to.node.(@index>2)";
	//var path	= "path.to.node.(@index)";
	//var path	= ".*.(#ID)";
	//var nodes	= findNode(xml, path, true, true);

	var nodes	= xml.get(path, true, true);
*/

//var nodes = xml.path.to.node.(@index == 3)

/*

	trace(nodes.length(), nodes.toXMLString())
	
	var state = xml.find('path.to.node').remove();
	trace(state)
	
	trace(xml.toXMLString())
	
	//var node = xml.path.to.node.(function::attribute('id') == 'ID').remove()
	//var node = xml.find('@id', true).remove()
	
	//var node = xml.find('node', true, true).remove()
	trace();
	
	var node = xml..*.(function::name() == 'node');
	var node = xml..*.(function::attribute('index') > 0);
	//var node = xml.find('@index>0', true, true);
	
	
	var node = xml.find('@index>0', false, true);
	var node = xml.find('*.(@index>0)', false, true);
	
	var node = xml.find('@index>0', true, true);
	var node = xml.find('*.(@index>0)', true, true);
	var node = xml.find('.*.(@index>0)', false, true);
	var node = xml.find('..*.(@index>0)', false, true);
	
	function callback(node, index)
	{
		return node.@index > 4;
	}
	
	var node = xml.find(callback, true)[0].remove()
	
	delete[0]//.remove()
	//inspect(node)
*/





/*
	
clear();
var xml =
	<xml>
		<a id="a" vowel="true"/>
		<b id="b" />
		<c id="c" class="test" />
		<d id="d" class="test">
			<e id="e" vowel="true">
				<f id="f" class="test" />
			</e>
		</d>
	</xml>
	

	//inspect(xml.get('a'));
	//inspect(xml.get('d.e.f'));
	//inspect(xml.get('*.(.test)'));
	inspect(xml.get('*.(@class=test)', true));
	
	//inspect(xml.get('#id'));
	//inspect(xml.get('.class'));
	//inspect(xml.get('a.b.c.(@name=dave)'));
	//inspect(xml.get('a.b.c.(@name=dave).d.e.@attr'));

	//xml.remove('*.(.test)', true)
	//xml.remove('a.@id', true)

	//delete xml.*.(function::attribute('@class') == 'test')
	
	
	//trace(xml.toXMLString());
*/

})(Utils, xjsfl);












var XUL=(function(Utils,XULControl,XULEvent,_,xjsfl){


// ------------------------------------------------------------------------------------------------------------------------
//
//  ██  ██ ██  ██ ██
//  ██  ██ ██  ██ ██
//  ██  ██ ██  ██ ██
//   ████  ██  ██ ██
//  ██  ██ ██  ██ ██
//  ██  ██ ██  ██ ██
//  ██  ██ ██████ ██████
//
// ------------------------------------------------------------------------------------------------------------------------
// XUL


// define(["Utils","XULControl","XULEvent","XML","xjsfl","COMPATIBILITY"],
// 	function(Utils,XULControl,XULEvent,_,_,COMPATIBILITY){
// const {__WEBPACK_COMPATIBILITY_TEXT_PLUGIN_ABSOLUTE_PATH__}=COMPATIBILITY;

	var trace=fl.trace;

	/**
	 * XUL
	 * @overview	OO library for creating and managing XUL dialogs
	 * @instance	xul
	 */

	//xjsfl.halted = false;
	// xjsfl.init(this, ['Utils', 'URI', 'File', 'XML', 'String', 'XULControl', 'XULEvent', 'JSFLInterface']);
	// xjsfl.init(this, ['Utils', 'URI', 'XML', 'XULControl', 'XULEvent']);


// --------------------------------------------------------------------------------
	// constructor

		/**
		 * XUL constructor
		 * @param	{String}	title		The title of the new dialog
		 * @returns	{XUL}					A new XUL instance
		 */
		XUL = function(title)
		{
			//TODO Allow a file: uri to be passed into the constructor

			//TODO Consider making XUL driver-based, so basic controls are constructed using the core, but can be wrapped with additional markup using driver-based methods
			//TODO Alternatively, have an additional XULBuilder class, so code and presentation are kept separate

			//TODO Add functionality for basic arithmetic to be performed inside textboxes

			// public properties
			// 	this.xml		= xjsfl.file.load('xul/dialog.xul', 'template', true);
			// 	this.xml		= loadTemplate('xul/dialog.xul', 'template', true);
			// 	this.xml		= new XML(__WEBPACK_COMPATIBILITY_TEXT_PLUGIN_ABSOLUTE_PATH__('./config/xul/dialog.xul'));
				this.xml		= new XML("<dialog id=\"dialog\" title=\"\" buttons=\"accept,cancel\">\r\n\r\n\t<content>\r\n\r\n\t\t<grid>\r\n\r\n\t\t\t<columns id=\"columns\">\r\n\t\t\t\t<column flex=\"1\" />\r\n\t\t\t\t<column flex=\"2\" />\r\n\t\t\t</columns>\r\n\r\n\r\n\t\t\t<rows id=\"controls\">\r\n\r\n\t\t\t</rows>\r\n\r\n\t\t</grid>\r\n\r\n\t</content>\r\n\r\n\t<script>\r\n\t\t<![CDATA[\r\n\t\t\tif(window.xjsfl)\r\n\t\t\t{\r\n\t\t\t\txjsfl.ui.handleEvent({xulid}, 'initialize');\r\n\t\t\t}\r\n\t\t]]>\r\n\t</script>\r\n\r\n</dialog>\r\n");

				this.controls	= {};
				this.settings	= {};
				this.flashData	= null;

			// private properties
				this.events		= {};
				this.rules		= {};
				this.columns	= [100, 180],
				this.error		= null;
				this.id			= -1;


			// load controls
			// 	var xml			= xjsfl.file.load('xul/controls.xul', 'template', true);
			// 	var xml			= loadTemplate('xul/controls.xul', 'template', true);
			// 	var xml			= new XML(__WEBPACK_COMPATIBILITY_TEXT_PLUGIN_ABSOLUTE_PATH__('./config/xul/controls.xul'));
				var xml			= new XML("<!--<?xml version=\"1.0\"?>-->\r\n<!--\t\tSyntaxError:xml is a reserved identifier-->\r\n<?xul version=\"1.0\"?>\r\n\r\n<dialog id=\"dialog\" title=\"Controls\" buttons=\"\">\r\n\t\r\n\t<grid>\r\n\t\t\r\n\t\t<columns>\r\n\t\t\t<column flex=\"1\" />\r\n\t\t\t<column flex=\"2\" />\r\n\t\t</columns>\r\n\t\t\r\n\t\t<rows id=\"controls\" >\r\n\r\n\r\n\t\t\t<!--\r\n\t\t\t====================================================================================================\r\n\t\t\tSIMPLE CONTROLS\r\n\t\t\t====================================================================================================\r\n\t\t\t-->\r\n\t\t\t\r\n\t\t\t\t<row template=\"label\">\r\n\t\t\t\t\t<label value=\"Label\" align=\"\" />\r\n\t\t\t\t</row>\r\n\t\t\t\t\r\n\t\t\t\t<row template=\"textbox\">\r\n\t\t\t\t\t<label value=\"Textbox:\" />\r\n\t\t\t\t\t<textbox class=\"control\" id=\"textbox\" value=\"\" maxlength=\"\" prompt=\"\" size=\"\" multiline=\"false\" width=\"\" flex=\"1\" />\r\n\t\t\t\t</row>\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/textbox -->\r\n\t\t\t\t<!-- size=\"20\" wrap=\"on\" scroll=\"true\" rows=\"3\" wraparound=\"true\" -->\r\n\t\t\t\t\r\n\t\t\t\t<row template=\"colorchip\">\r\n\t\t\t\t\t<label value=\"Colorchip:\" />\r\n\t\t\t\t\t<colorchip class=\"control\" id=\"colorchip\" color=\"\" format=\"hex\" width=\"100\" />\r\n\t\t\t\t</row>\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/colorchip -->\r\n\t\t\t\t<!--\r\n\t\t\t\t\tformat:\thex|string\r\n\t\t\t\t-->\r\n\t\t\t\t\r\n\t\t\t\t<row template=\"popupslider\">\r\n\t\t\t\t\t<label value=\"Popupslider:\" />\r\n\t\t\t\t\t<popupslider class=\"control\" id=\"popupslider\" value=\"\" minvalue=\"0\" maxvalue=\"100\" orientation=\"horz\" tabindex=\"\" width=\"60\" flex=\"\" />\r\n\t\t\t\t</row>\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/popupslider -->\r\n\t\t\t\t\r\n\t\t\t\t<row template=\"checkbox\">\r\n\t\t\t\t\t<label value=\"Checkbox:\" />\r\n\t\t\t\t\t<checkbox class=\"control\" id=\"checkbox\" label=\"Checkbox\" checked=\"true\" tabindex=\"\" acceskey=\"\" />\r\n\t\t\t\t</row>\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/checkbox -->\r\n\r\n\t\t\t\t<row template=\"button\">\r\n\t\t\t\t\t<label value=\"Button:\" align=\"\" control=\"\" />\r\n\t\t\t\t\t<button class=\"control\" id=\"button\" label=\"Button\" width=\"\" flex=\"1\" tabindex=\"\" acceskey=\"\" oncommand=\"\" />\r\n\t\t\t\t</row>\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/button -->\r\n\t\r\n\t\t\t\t<!--\r\n\t\t\t\t<row template=\"expression\">\r\n\t\t\t\t\t<label value=\"Expression:\" />\r\n\t\t\t\t\t<expression class=\"control\" id=\"expression\" value=\"\" prompt=\"\" size=\"\" flex=\"\" />\r\n\t\t\t\t</row>\r\n\t\t\t\t-->\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/expression -->\r\n\t\t\t\t\r\n\t\t\t\r\n\t\t\t\t<row template=\"targetlist\">\r\n\t\t\t\t\t<label value=\"Targetlist:\" />\r\n\t\t\t\t\t<targetlist id=\"targetlist\" class=\"\" width=\"300\" height=\"\" flex=\"1\" pathtype=\"absolute\" />\r\n\t\t\t\t\t<property id=\"targetlist\" />\r\n\t\t\t\t</row>\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/targetlist -->\r\n\t\t\t\t\r\n\t\t\t\t<row template=\"choosefile\">\r\n\t\t\t\t\t<label value=\"Choose File:\" align=\"\" control=\"\" />\r\n\t\t\t\t\t<choosefile id=\"choosefile\" literal=\"false\" pathtype=\"\" required=\"\" size=\"\" type=\"\" width=\"\" flex=\"1\" tabindex=\"\" />\r\n\t\t\t\t</row>\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/button -->\r\n\t\t\t\t\r\n\t\t\t<!--\r\n\t\t\t====================================================================================================\r\n\t\t\tCOMPOUND CONTROLS\r\n\t\t\t====================================================================================================\r\n\t\t\t-->\r\n\t\t\t\r\n\t\t\t\t<row template=\"listbox\">\r\n\t\t\t\t\t<label value=\"Listbox:\" />\r\n\t\t\t\t\t<listbox class=\"control\" id=\"listbox\" width=\"\" flex=\"1\" rows=\"6\" tabindex=\"\">\r\n\t\t\t\t\t\t<listitem label=\"Item 1\" value=\"1\" selected=\"\" />\r\n\t\t\t\t\t\t<listitem label=\"Item 2\" value=\"2\" selected=\"\" />\r\n\t\t\t\t\t\t<listitem label=\"Item 3\" value=\"3\" selected=\"\" />\r\n\t\t\t\t\t</listbox>\r\n\t\t\t\t</row>\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/listbox -->\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/listitem -->\r\n\t\t\t\t\r\n\t\t\t\t<row template=\"menulist\">\r\n\t\t\t\t\t<label value=\"Menu List:\" />\r\n\t\t\t\t\t<menulist class=\"control\" id=\"menulist\" editable=\"\" width=\"\" flex=\"1\" tabindex=\"\" oncreate=\"\" onsetfocus=\"\">\r\n\t\t\t\t\t\t<menupop class=\"control\" id=\"menupop\">\r\n\t\t\t\t\t\t\t<menuitem label=\"Item 1\" value=\"1\" selected=\"\" />\r\n\t\t\t\t\t\t\t<menuitem label=\"Item 2\" value=\"2\" selected=\"\" />\r\n\t\t\t\t\t\t\t<menuitem label=\"Item 3\" value=\"3\" selected=\"\" />\r\n\t\t\t\t\t\t</menupop>\r\n\t\t\t\t\t</menulist>\r\n\t\t\t\t</row>\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/menulist -->\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/menupop -->\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/menuitem -->\r\n\t\t\t\t\r\n\t\t\t\t<row template=\"radiogroup\">\r\n\t\t\t\t\t<label value=\"Radio Group:\" />\r\n\t\t\t\t\t<radiogroup class=\"control\" id=\"radiogroup\" tabindex=\"\" groupbox=\"true\">\r\n\t\t\t\t\t\t<radio label=\"Radio 1\" selected=\"\" value=\"1\" acceskey=\"\" />\r\n\t\t\t\t\t\t<radio label=\"Radio 2\" selected=\"\" value=\"2\" acceskey=\"\" />\r\n\t\t\t\t\t\t<radio label=\"Radio 3\" selected=\"\" value=\"3\" acceskey=\"\" />\r\n\t\t\t\t\t</radiogroup>\r\n\t\t\t\t</row>\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/radiogroup -->\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/radio -->\r\n\r\n\t\t\t\t<row template=\"checkboxgroup\">\r\n\t\t\t\t\t<label value=\"Checkbox Group:\" />\r\n\t\t\t\t\t<vbox class=\"control\" groupbox=\"true\">\r\n\t\t\t\t\t\t<checkbox class=\"control\" id=\"checkbox[0]\" label=\"Checkbox 1\" checked=\"true\" tabindex=\"\" acceskey=\"\" />\r\n\t\t\t\t\t\t<checkbox class=\"control\" id=\"checkbox[1]\" label=\"Checkbox 2\" checked=\"true\" tabindex=\"\" acceskey=\"\" />\r\n\t\t\t\t\t\t<checkbox class=\"control\" id=\"checkbox[2]\" label=\"Checkbox 3\" checked=\"true\" tabindex=\"\" acceskey=\"\" />\r\n\t\t\t\t\t</vbox>\r\n\t\t\t\t</row>\r\n\t\t\t\t\r\n\r\n\t\t\t<!--\r\n\t\t\t====================================================================================================\r\n\t\t\tNON-VISUAL CONTROLS\r\n\t\t\t====================================================================================================\r\n\t\t\t-->\r\n\t\t\t\t\r\n\t\t\t\t<row template=\"separator\" />\r\n\t\t\t\t\r\n\t\t\t\t<row template=\"spacer\">\r\n\t\t\t\t\t<spacer />\r\n\t\t\t\t\t<label />\r\n\t\t\t\t</row>\r\n\t\t\t\t\r\n\t\t\t\t<property template=\"property\" id=\"property\" />\r\n\t\t\t\r\n\t\t\t<!--\r\n\t\t\t====================================================================================================\r\n\t\t\tFLASH CONTROLS\r\n\t\t\t====================================================================================================\r\n\t\t\t-->\r\n\t\t\t\r\n\t\t\t\t<element template=\"flash\">\r\n\t\t\t\t\t<flash class=\"control\" id=\"flash\" src=\"assets/flash.swf\" width=\"250\" height=\"100\" />\r\n\t\t\t\t</element>\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/flash -->\r\n\t\t\t\t<!-- https://developer.mozilla.org/en/XUL/property -->\r\n\t\t\t\t<!-- http://www.webdesign.org/flash-swish/flash-tutorials/communicating-between-actionscript-and-jsfl.8608.html -->\r\n\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\r\n\t\t</rows>\r\n\t</grid>\r\n\t\r\n\t<separator template=\"separator\" />\r\n\r\n\t<script template=\"script\">\r\n\t\t\r\n\t</script>\r\n\t\r\n</dialog>\r\n");

				for each(var node in xml.grid.rows.*)
				{
					XUL.templates[node.@template.toString()] = node.copy();
				}


				//TODO columns flex properly, and ensure appropriate elements flex to fill

			// set title if provided
				this.setTitle(title || 'xJSFL');

			// return
				return this;

		}


	// ------------------------------------------------------------------------------------------------
	// # XUL static methods & properties

		/**
		 * Static convenience method to instantiate and return a new chainable XUL instance
		 * @param	{String}	props		An optional shorthand controls String
		 * @param	{Function}	props		An optional Function
		 * @returns	{XUL}					A XUL class
		 */
		XUL.factory = function(props)
		{
			/*
				Arguments:
				String, accept, fail	- get controls, labels and values from string @see XUL.add()
				accept, fail			- build controls from function params
				Object, accept, fail	- build controls from object (not yet implemented)
				//TODO implement building from Object
			*/

			// build new XUL
				var xul = new XUL();

			// populate
				if(xul.xml && props)
				{
					// if props is a function, set the dialog title to the function name, and create textfields per function argument
						if(typeof props == 'function')
						{
							// assign properties
								//cancel = accept;
								//accept = props;

							// parse and assign controls
								props = XUL.prototype._parseFunction(props);
								for each(var prop in props.params)
								{
									xul.addTextbox(prop);
								}

							// title
								xul.setTitle('Dialog for "' + props.name + '"');
						}

					// props is XML, use set XML
						else if(typeof props == 'xml')
						{
							xul.setXML(props);
						}
					// props is URI, load XML
						else if(props instanceof URI)
						{
							xul.load(props);
						}

					// props is a string, load XML if is a URI, or use shorthand notation to create controls
						else if(typeof props == 'string')
						{
							if(URI.isURI(props))
							{
								xul.load(props);
							}
							else
							{
								xul.add(props);
							}
						}

					// return
						return xul;
				}

			// return
				return xul;
		}

		/**
		 * Static convenience method to create and show interface in one call, returning any submitted values
		 * @param	{String}	props		A String of shorthand controls
		 * @param	{Function}	props		A Function, the parameters of which will map to dialog controls
		 * @param	{Function}	accept		An optional callback function to be called when the user clicks the OK button
		 * @param	{Function}	cancel		An optional callback function to be called when the user clicks the Cancel button
		 * @param	{Object}	defaults	An optional Object of name:value properties to apply to the dialog
		 * @returns	{Object}				An Object containing the accepted values, or null if the user cancels the dialog
		 */
		XUL.create = function(props, accept, cancel, defaults)
		{
			// build new XUL
				var xul = XUL.factory(props);
				
			// assign defaults
				if(defaults)
				{
					xul.setValues(defaults);
				}

			// show
				if(xul && Utils.getKeys(xul.controls).length > 0)
				{
					xul.show(accept, cancel);
					if(xul.settings && xul.settings.dismiss === 'accept')
					{
						return xul.values;
					}
				}

			// return
				return null;
		}

		XUL.toString = function()
		{
			return '[class XUL]';
		}

		/**
		 * Static control store
		 * @ignore
		 */
		XUL.templates = {};


	// ------------------------------------------------------------------------------------------------
	// XUL prototype

		XUL.prototype =
		{
			// --------------------------------------------------------------------------------
			// properties

				// settings
					id:			null,
					xml:		null,

				// properties
					controls:	{},
					settings:	{},
					events:		{},
					rules:		{},
					columns:	[100, 180],

				// template
					content:	'',
					separator:	'</rows></grid><separator /><grid><columns><column flex="1" /><column flex="2" /></columns><rows>',

				// properties
					title:		'',
					error:		null,

				// flags
					built:		false,
					open:		false,
					accepted:	false,

			// --------------------------------------------------------------------------------
			// # Accessors

					/**
					 * @type {Object} The values of the dialog controls parsed into their correct data types
					 */
					get values()
					{
						// return null if a settings object doesn't exist (the user cancelled)
							if( ! this.settings )
							{
								return null;
							}

						// if not, grab values
							var values = {};
							for(var id in this.controls)
							{
								var control = this.controls[id];
								if(control.enumerable)
								{
									values[id] = control.value;
								}
							}

						// return
							return values;
					},


			// --------------------------------------------------------------------------------
			// methods

				/**
				 * Reset constructor
				 * @ignore
				 */
				constructor:XUL,


			// --------------------------------------------------------------------------------
			// # Control methods

				// misc
					/**
					 * (private) Main add control method
					 * @param	{String}	type		The control type, i.e. button, colorchip, etc
					 * @param	{String}	id			The control id
					 * @param	{String}	label		The control label
					 * @param	{XML}		xml			The original XML of the control, built by the appropriate addControl method
					 * @param	{Object}	attributes	Any additional attributes that should be applied to the control XML
					 * @param	{Object}	validation	Any validation rules that should be applied to the control
					 * @param	{Object}	events		An Object containing event:callback pairs
					 * @param	{Boolean}	user		An optional Boolean specifying to use use XML? //TODO check this
					 * @returns	{XUL}					The XUL dialog
					 */
					_addControl:function(type, id, label, xml, attributes, validation, events, user)
					{
						// element
							var element			= user ? xml : xml[type][0];

						// label
							id					= id || this._makeId(label);

							if(xml.label && xml.label.length())
							{
								xml.label.@value = label ? label + ' : ' : ' ';
							}

						// check id is not already defined
							if(this.controls[id])
							{
								throw new Error('XUL.addControl(): Cannot add <' +type+ '> control - duplicate id "' +id+ '"');
							}

						// id & attributes
							if(element)
							{
								element.@id = id;
								for(var attr in attributes)
								{
									if(/^(value|checked)$/.test(attr))
									{
										// need to add / set values using JavaScript (rather than in XML) or else the field will always show initial values when being re-shown
										this.settings[id] = attributes[attr];
									}
									else
									{
										element['@' + attr] = attributes[attr];
									}
								}
							}
							
						// width
							if(attributes && attributes.width > this.columns[1])
							{
								this.columns[1] = attributes.width;
							}

						// combo / selected

						// special cases

							// target list
								switch(type)
								{
									case 'targetlist':
										var property = xml['property'][0];
										property.@id = id;
									break;

									case 'radiogroup':
									case 'menulist':
									case 'listbox':
										var selected		= xml..*.(function(element){return element.@selected && element.@selected == 'true';});
										this.settings[id]	= selected.@value;
										//trace('>>' + selected.toXMLString())
									break;
								}

						// setup validation
							if(validation)
							{
								this._addValidation(id, validation);
							}

						// setup events
							if(events)
							{
								this._addEvents(id, events);
							}

						// set control
							this.controls[id] = new XULControl(id, type, this, xml);
							if(user !== true)
							{
								this.addXML(xml, false, true);
							}

						// debug
							//trace(xml)


						// return
							return xml;
					},

					/**
					 * Updates supplied XML with new child items parent
					 * @param	{XML}		parent		An XML parent node. Child items are updated by reference
					 * @param	{Array}		values		The values (values, or {label:'',value:''} Objects) of each of the new elements you want to add
					 * @param	{String}	id			The id of the new control
					 * @param	{String}	selected	The value of the selected item
					 * @returns	{XML}					The XML of the new children (altough the original parent is altered by reference anyway)
					 * @ignore
					 */
					_addChildren:function(parent, values, id, selected)
					{
						// grab the first item in the list to use as a template for the others
							var items			= parent.*;
							var itemTemplate	= items[0].copy();

						// delete old child nodes
							while(items.length())
							{
								delete items[0];
							}

						// add new child nodes
							var i = 0;
							var subId;
							for(var name in values)
							{
								// bugfix: skip prototype values in for loop
								if (!values.hasOwnProperty(name)){
									continue;
								}

									// TODO: possibly add in check to skip prototype values in for loop

								// variables
									var value			= values[name];
									var item 			= itemTemplate.copy();

								// create item
									if(value.label) // value is an object {label:'Label', value:'some value'}
									{
										item.@value		= value.value;
										item.@label		= value.label;
										subId			= value.value;
									}
									else
									{
										if(Utils.isArray(values))
										{
											item.@value		= value;
											item.@label		= value;
											subId			= value;
										}
										else
										{
											item.@value		= value;
											item.@label		= name;
											subId			= value;
										}
									}

								// item id
									if(id)
									{
										item.@id		= id + '[' + subId + ']';
									}

								// selected
									if((selected === undefined && i === 0) || value == selected)
									{
										item.@selected = true;
									}
									else
									{
										delete item.@selected;
									}

								// add
									items[i++]			= item;
							}

						// return parent
							return parent;
					},

					/**
					 * Add validation to an individual control (not yet implemented)
					 * @param	{String}	id			The id of the control
					 * @param	{Object}	validation	Not yet implemented
					 * @returns	{XUL}					The XUL dialog
					 */
					_addValidation:function(id, validation)
					{
						if(this.rules[id] == null)
						{
							this.rules[id] = {};
						}
						for(var rule in validation)
						{
							this.rules[id][rule] = validation[rule];
						}
						return this;
					},

					/**
					 * Add events to an individual control
					 * @param	{String}	id			The id of the control
					 * @param	{Object}	events		An Object containing event:callback pairs
					 * @returns	{XUL}					The XUL dialog
					 */
					_addEvents:function(id, events)
					{
						for(var name in events)
						{
							this.addEvent(id, name, events[name]);
						}
						return this;
					},

					/**
					 * Parse user-supplied XML so that XULControls are created
					 * @param	{XML}		xml			An XML element containing valid XMLUI control elements
					 * @returns	{XMLList}				The child XML control elements
					 */
					_parseUserXML:function(xml)
					{
						// add xml under a temp root node, so we can find any top-level control nodes passed in
							xml = new XML('<temp>' + xml.toXMLString() + '</temp>');

						// loop through control types, and attempt to find and add to controls array
							var types	= 'textbox,popupslider,checkbox,colorchip,choosefile,button,listbox,menulist,radiogroup,targetlist,property'.split(',');
							for each(var type in types)
							{
								var controls = xml.get('..' + type);

								if(controls.length() > 0)
								{
									for each(var control in controls)
									{
										// variables
											var id				= control.@id.toString();
											var value			= control.@value.toString();
											var controlXML		= control.toXMLString();

										// add control
											this._addControl(type, id, null, control, {value:value}, null, null, true);
									}
								}
							}

						// xml
							return xml.children();
					},

					_makeId:function(id)
					{
						return id.split(/[^\d\w ]/)[0].toLowerCase().replace(/[^a-z0-9]/g, '');
					},

				// --------------------------------------------------------------------------------
				// shorthand addition of controls

					/**
					 * Add control using shorthand notation
					 * @param	{String}	str				A string of the format "property:value,type:Label=values,type:Label=values, ..."
					 * @returns	{XUL}						The XUL dialog
					 */
					add:function(str)
					{
						//TODO Add xml:<xml attr="value"> functionality

						// variables
							var controls	= Utils.parseExpression(str);
							var rxControl	= /(\||\w*:)?([^=]*)=?(.*)/
							var rxObj		= /([^:,]+):([^,]+)/;
							
						// parse
							for each(var control in controls)
							{
								// variables
									var matches		= control.match(rxControl);
									var control		= matches[1].trim().replace(':', '');
									var label		= matches[2].trim();
									var value		= matches[3].trim();

								// control
									if(control === '')
									{
										control = 'textbox';
									}
									
								// handle properties
									if(/^(title|columns|width|xml)$/.test(control))
									{
										value = label;
										label = '';
									}

								// compound value
									else if(/^[\[{]/.test(value))
									{
										// variables
											var isObject	= value[0] == '{';
											var values		= value.substring(1, value.length - 1).split(',');

										// loop through the array and convert elements to values / objects
											for(var i = 0; i < values.length; i++)
											{
												if(isObject)
												{
													var matches = values[i].match(rxObj)
													if(matches)
													{
														var lab		= matches[1].trim();
														var val		= matches[2].trim();
														values[i]	= {label:lab, value:val};
													}
												}
												else
												{
													var val		= values[i].trim();
													values[i]	= /^(popupslider|slider|numeric)$/.test(control) ? val : {label:val, value:val};
												}
											}

										// update control type
											if(control == 'textbox')
											{
												control = 'dropdown';
											}

										// re-assign values
											value = values;
									}

								// debug
									//inspect([control, label, value])

								// add control
									switch(control)
									{
										// single controls

											case 'button':
												this.addButton(label);
											break;

											case 'checkbox':
												this.addCheckbox(label, null, {checked:value});
											break;

											case 'color':
											case 'colorchip':
											case 'colorpicker':
												this.addColorchip(label, null, {value:value});
											break;

											case 'expression':
												this.addExpression(label, null, {value:value});
											break;

											case 'choosefile':
											case 'openfile':
											case 'file':
												this.addFile(label, null);
											break;

											case 'savefile':
											case 'save':
												this.addFile(label, null, {value:'', type:'save'});
											break;

											case 'flash':
												this.setFlash(label, control, value);
											break;

											case 'value':
											case 'number':
											case 'numeric':
											case 'slider':
											case 'popupslider':
												this.addSlider(label, null, value);
											break;

											case 'targetlist':
												this.addTargetlist(label, null, {value:value});
											break;

											case 'text':
											case 'textbox':
											case 'textfield':
												this.addTextbox(label, null, {value:value});
											break;

											case 'textarea':
												this.addTextbox(label, null, {value:value, multiline:true});
											break;

										// compound controls

											case 'checkboxgroup':
											case 'checkboxes':
												this.addCheckboxgroup(label, null, value);
											break;

											case 'radiogroup':
											case 'radios':
											case 'radio':
												this.addRadiogroup(label, null, value);
											break;

											case 'list':
											case 'listbox':
												this.addListbox(label, null, value);
											break;

											case 'menulist':
											case 'dropdown':
												this.addDropdown(label, null, value);
											break;

										// other

											case 'xml':
												this.addXML(value);
											break;

											case 'label':
												this.addLabel(label, null);
											break;

											case 'property':
												this.addProperty(value);
											break;

											case 'spacer':
											case '-':
												this.addSpacer();
											break;

											case 'separator':
											case '|':
												this.addSeparator();
											break;

										// properties

											case 'title':
												this.setTitle(value);
											break;

											case 'width':
												this.setWidth(parseInt(value));
											break;

											case 'columns':
												this.setColumns(Utils.parseValue(value));
											break;

									default:
										// xjsfl.debug.error('XUL.add(): Undefined control type "' +control+ '"');
										throw new Error('XUL.add(): Undefined control type "' +control+ '"');
									}
									
								// output
									//inspect([matches[0]..trim(), control, label, value], 'Add');
							}
						// return
							return this;
					},

				// --------------------------------------------------------------------------------
				// # Single controls

					/**
					 * Add a Textbox control to the UI
					 * @param	{String}	label			A label for the UI item
					 * @param	{String}	id				An optional id, otherwise derived from the label
					 * @param	{Object}	attributes		Optional attributes
					 * @param	{Object}	validation		Optional validation properties
					 * @param	{Object}	events			Optional event callbacks
					 * @returns	{XUL}						The XUL dialog
					 */
					addTextbox:function(label, id, attributes, validation, events)
					{
						// build xml
							var xml				= XUL.templates.textbox.copy();

						// add control
							xml					= this._addControl('textbox', id, label, xml, attributes, validation, events);
							return this;
					},

					/**
					 * Add a Popupslider control to the UI
					 * @param	{String}	label			A label for the UI item
					 * @param	{String}	id				An optional id, otherwise derived from the label
					 * @param	{Array}		values			An optional Array of values [default, min, max]
					 * @param	{Object}	attributes		Optional attributes
					 * @param	{Object}	validation		Optional validation properties
					 * @param	{Object}	events			Optional event callbacks
					 * @returns	{XUL}						The XUL dialog
					 */
					addSlider:function(label, id, values, attributes, validation, events)
					{
						// check values
							if(! (values instanceof Array))
							{
								values = [values || 0, 0, 100];
							}

						// attributes
							attributes					= attributes || {};
							attributes.value			= values[0];

						// build xml
							var xml						= XUL.templates.popupslider.copy();
							xml..popupslider.@value		= values[0];
							xml..popupslider.@minvalue	= values[1];
							xml..popupslider.@maxvalue	= values[2];

						// add control
							xml					= this._addControl('popupslider', id, label, xml, attributes, validation, events);
							return this;
					},

					/**
					 * Add a Checkbox control to the UI
					 * @param	{String}	label			A label for the UI item
					 * @param	{String}	id				An optional id, otherwise derived from the label
					 * @param	{Object}	attributes		Optional attributes
					 * @param	{Object}	validation		Optional validation properties
					 * @param	{Object}	events			Optional event callbacks
					 * @returns	{XUL}						The XUL dialog
					 */
					addCheckbox:function(label, id, attributes, validation)
					{
						// build xml
							var xml				= XUL.templates.checkbox.copy();
							xml.checkbox.@label = label;
							id					= id || this._makeId(label);
							label				= '';

						// add control
							xml					= this._addControl('checkbox', id, label, xml, attributes, validation);
							return this;
					},

					/**
					 * Add a Colorchip control to the UI
					 * @param	{String}	label			A label for the UI item
					 * @param	{String}	id				An optional id, otherwise derived from the label
					 * @param	{Object}	attributes		Optional attributes [value, format]
					 * @param	{Object}	validation		Optional validation properties
					 * @param	{Object}	events			Optional event callbacks
					 * @returns	{XUL}						The XUL dialog
					 */
					addColorchip:function(label, id, attributes, validation, events)
					{
						// build xml
							var xml				= XUL.templates.colorchip.copy();

						// values
							attributes = attributes || {};

							var value = attributes.value;
							if(value)
							{
								value = String(attributes.value);
								if(value.substr(0, 2) == '0x')
								{
									attributes.format = 'hex';
								}
								else if(value.substr(0, 1) == '#')
								{
									attributes.format = 'string';
								}
								else
								{
									attributes.format = 'string';
									if(!isNaN(parseInt(attributes.value)))
									{
										attributes.value = '#' + Utils.padStart(parseInt(value).toString(16).toUpperCase());
									}
									else
									{
										attributes.value = '#' + value;
									}
								}
							}
							//inspect(attributes)

						// add control
							xml					= this._addControl('colorchip', id, label, xml, attributes, validation, events);
							return this;
					},

					/**
					 * Add a Choosefile control to the UI
					 * @param	{String}	label			A label for the UI item
					 * @param	{String}	id				An optional id, otherwise derived from the label
					 * @param	{Object}	attributes		Optional attributes
					 * @param	{Object}	validation		Optional validation properties
					 * @param	{Object}	events			Optional event callbacks
					 * @returns	{XUL}						The XUL dialog
					 */
					addFile:function(label, id, attributes, validation, events)
					{
						// build xml
							var xml				= XUL.templates.choosefile.copy();
							//inspect(attributes, 'Attributes')

						// add control
							xml					= this._addControl('choosefile', id, label, xml, attributes, validation, events);
							return this;
					},

					addChoosefile:function(label, id, attributes, validation, events)
					{
						return this.addFile(label, id, attributes, validation, events);
					},

					/**
					 * Add a Expression control to the UI
					 * @param	{String}	label			A label for the UI item
					 * @param	{String}	id				An optional id, otherwise derived from the label
					 * @param	{Object}	attributes		Optional attributes
					 * @param	{Object}	validation		Optional validation properties
					 * @param	{Object}	events			Optional event callbacks
					 * @returns	{XUL}						The XUL dialog
					 */
					addExpression:function(label, id, attributes, validation, events)
					{
						// build xml
							var xml				= XUL.templates.expression.copy();
							//trace('ADD EXPRESSION:' + attributes.value);

						// add control
							xml					= this._addControl('expression', id, label, xml, attributes, validation, events);
							return this;
					},

					/**
					 * Add a Button control to the UI
					 * @param	{String}	label			A label for the UI item
					 * @param	{String}	id				An optional id, otherwise derived from the label
					 * @param	{Object}	attributes		Optional attributes
					 * @param	{Object}	events			Optional event callbacks
					 * @returns	{XUL}						The XUL dialog
					 */
					addButton:function(label, id, attributes, events)
					{
						// build xml
							var xml				= XUL.templates.button.copy();
							attributes			= attributes || {};
							attributes.label	= label;
							id					= id || this._makeId(label);

						// add control
							xml					= this._addControl('button', id, '', xml, attributes, null, events);
							return this;
					},


				// --------------------------------------------------------------------------------
				// # Multiple-value controls

					/**
					 * Add a Listbox control to the UI (listbox does not allow multi-select)
					 * @param	{String}	label			A label for the UI item
					 * @param	{String}	id				An optional id, otherwise derived from the label
					 * @param	{Object}	attributes		Optional attributes
					 * @param	{Object}	validation		Optional validation properties
					 * @param	{Object}	events			Optional event callbacks
					 * @returns	{XUL}						The XUL dialog
					 */
					addListbox:function(label, id, values, attributes, validation, events)
					{
						// build xml
							var xml				= XUL.templates.listbox.copy();

						// add child items
							var parent			= xml..listbox;
							this._addChildren(parent, values);

						// add control
							xml					= this._addControl('listbox', id, label, xml, attributes, validation, events);
							return this;
					},

					/**
					 * Add a Menulist control to the UI
					 * @param	{String}	label			A label for the UI item
					 * @param	{String}	id				An optional id, otherwise derived from the label
					 * @param	{Object}	attributes		Optional attributes
					 * @param	{Object}	validation		Optional validation properties
					 * @param	{Object}	events			Optional event callbacks
					 * @returns	{XUL}						The XUL dialog
					 */
					addDropdown:function(label, id, values, attributes, validation, events)
					{
						// build xml
							var xml				= XUL.templates.menulist.copy();
							var parent			= xml..menupop;

						// add child items
							this._addChildren(parent, values);

						// add control
							xml					= this._addControl('menulist', id, label, xml, attributes, validation, events);
							return this;
					},


					addMenuList:function(label, id, values, attributes, validation, events)
					{
						return this.addDropdown(label, id, values, attributes, validation, events);
					},

					/**
					 * Add a RadioGroup to the UI
					 * @param	{String}	label			A label for the UI item
					 * @param	{String}	id				An optional id, otherwise derived from the label
					 * @param	{Object}	attributes		Optional attributes
					 * @param	{Object}	validation		Optional validation properties
					 * @param	{Object}	events			Optional event callbacks
					 * @returns	{XUL}						The XUL dialog
					 */
					addRadiogroup:function(label, id, values, attributes)
					{
						// build xml
							var xml				= XUL.templates.radiogroup.copy();

						// add child items
							var parent			= xml..radiogroup;
							this._addChildren(parent, values, id, attributes ? attributes.selected : null);

						// add control
							xml					= this._addControl('radiogroup', id, label, xml, attributes);
							return this;
					},

					/**
					 * Add a CheckboxGroup to the UI
					 * @param	{String}	label			A label for the UI item
					 * @param	{String}	id				An optional id, otherwise derived from the label
					 * @param	{Object}	attributes		Optional attributes
					 * @param	{Object}	validation		Optional validation properties
					 * @param	{Object}	events			Optional event callbacks
					 * @returns	{XUL}						The XUL dialog
					 */
					addCheckboxgroup:function(label, id, values, attributes, validation)
					{
						// build xml
							var xml				= XUL.templates.checkboxgroup.copy();

						// add child items
							var parent			= xml..vbox;
							this._addChildren(parent, values, id || label.toLowerCase());
							
							//TODO Add functionality to pre-check checkboxes by passing in a "checked" Array ( [1,0,1,1] ) in attributes
							// and look at some kind of shorthand alternative to this
							// check also the control values for this. label[name]=name, or label[name]=true/false ?
							
						// add control
							xml					= this._addControl('checkboxgroup', id, label, xml, attributes, validation);
							return this;
					},

					/**
					 * Add a Targetlist control to the UI
					 * @param	{String}	label			A label for the UI item
					 * @param	{String}	id				An optional id, otherwise derived from the label
					 * @param	{Object}	attributes		Optional attributes
					 * @param	{Object}	validation		Optional validation properties
					 * @param	{Object}	events			Optional event callbacks
					 * @returns	{XUL}						The XUL dialog
					 */
					addTargetlist:function(label, id, attributes, validation, events)
					{
						// build xml
							var xml				= XUL.templates.targetlist.copy();

						// add control
							xml					= this._addControl('targetlist', id, label, xml, attributes, validation, events);
							return this;
					},

					/**
					 * Add an invisible property control to the UI
					 * @param	{String}	id				A unique id so the value can be retrieved from the settings object
					 * @returns	{XUL}						The XUL dialog
					 */
					addProperty:function(id)
					{
						// build xml
							var xml		= XUL.templates.property.copy();
							xml.@id		= id;

						// add xml
							//this.addXML(xml);
							xml					= this._addControl('property', id, id, xml);
							return this;

						// return
							return this;
					},

					/**
					 * Adds XML to the rows tag of the UI xml. If the XML, XMLList, or String doesn't contain a row, it will be created automatically
					 * @param	{XML}		xml				An XML <row>
					 * @param	{XMLList}	xml				An XMLList of <row>s
					 * @param	{String}	xml				A String of XML
					 * @param	{String}	breakOutOfRows	An optional Boolean to break out of rows, and just add vanilla XML to the dialog
					 * @param	{Boolean}	dontParse		Internal flag to indicate to the function not to process the XML for control info
					 * @returns	{XUL}						The XUL dialog
					 */
					addXML:function(xml, breakOutOfRows, dontParse)
					{
						// parse argument
							if(typeof xml === 'string')
							{
								xml = new XMLList(xml);
							}

						// Parse XML for new controls, and if found, add event handlers, and add to control hash for validation
							if(dontParse !== true)
							{
								xml = this._parseUserXML(xml);
							}

						// handle non-row XML
							if(xml[0].name() != 'row')
							{
								// break out of, then back into rows
									if(breakOutOfRows)
									{
										xml = this.separator.replace('<separator />', xml.toXMLString());
									}

								// wrap in a row tag
									else
									{
										xml = '<row>' + xml.toXMLString() + '</row>';
									}
							}

						// add XML
							this.content += xml.toString();

						// return
							return this;
					},

				// --------------------------------------------------------------------------------
				// # Additional element methods

					/**
					 * Add a separator element to the dialog
					 * @param	{String}	label		An optional labal to add beneath the separator
					 * @returns	{XUL}					The XUL dialog
					 */
					addSeparator:function(label)
					{
						//FIX Work out why separators don't make it into the final XUL.
						// Is this because the non-controls are being added to a separate XML buffer? Compare to _addControl()

						// build xml
							var xml		= XUL.templates.separator.copy();
							if(label)
							{
								xml.@label = label;
							}

						// add xml
							this.addXML(xml);

						// return
							return this;
					},

					/**
					 * Add a spacer element to the dialog
					 * @returns	{XUL}					The XUL dialog
					 */
					addSpacer:function()
					{
						// build xml
							var xml = XUL.templates.spacer.copy();

						// add xml
							this.addXML(xml);

						// return
							return this;
					},

					/**
					 * Add a Label control to the UI
					 * @param	{String}	label		A label for the UI item
					 * @param	{String}	id			An optional id, otherwise derived from the label
					 * @param	{Object}	attributes	Optional attributes
					 * @returns	{XUL}					The XUL dialog
					 */
					addLabel:function(label, id)
					{
						// build xml
							var xml				= XUL.templates.label.copy();
							var sum				= 0; this.columns.forEach( function(e){sum += e} );
							xml.label.@width	= sum;
							xml.label.@value	= label;

						// add xml
							this.addXML(xml);

						// return
							return this;
					},

					/**
					 * Adds a script source to the interface
					 * @param	{Function}script
					 * @returns	{XUL}					The XUL dialog
					 */
					addScript:function(script)
					{
						// add
							if(typeof script == 'function')
							{
								script = script.toSource();
							}
							var xml = new XML('<script>' + script + '</script>');

						// add xml
							this.addXML(xml);

						// return
							return this;
					},


				// --------------------------------------------------------------------------------
				// # Custom controls

					/**
					 * Add a Flash control to the UI (for the moment, this replaces any existing controls)
					 * @param	{String}	src			Source path to the SWF, (important!) relative to the calling file (defaults to user/)
					 * @param	{Number}	width		The width of the Flash window
					 * @param	{Number}	height		The height of the Flash window
					 * @param	{Object}	data		An optional Object of name:value pairs to be saved to the same folder as the Flash element (use AS3 to retrieve them)
					 * @param	{XML}		data		An optional XML 
					 * @param	{Array}		properties	An optional Array of property names to be created
					 * @returns	{XUL}					The XUL dialog
					 */
					setFlash:function(uriOrPath, width, height, data, properties)
					{
						//TODO add functinality to save a string of variables to a hard-coded location, as you can't pass in query strings, which you then load in manually
						//TODO Can the SWF determine its location using ExternalInterface, or do we need to use a hardcoded URL? Does MMExecute work in a XUL dialog?

						// build xml
							var xml			= XUL.templates.flash.copy();
							
						// src must be a relative path (NOT absolute URI) such as path/to/file.swf or ../file.swf
							var uri			= URI.toURI(uriOrPath, 1);
							var src			= URI.pathTo(xjsfl.uri + 'core/ui/', uri);
							xml..flash.@src	= src;

						// add control and set XML
							xml					= this._addControl('flash', 'flash', null, xml, {width:width, height:height});
							this.setXML(xml);

						// update size
							this.xml.@width		= width;
							this.xml.@height	= height;
							
						// set data
							if(data)
							{
								this.setFlashData(data);
							}

						// properties
							for each(var property in properties)
							{
								this.addProperty(property); // TODO check if we need to first set() the property to have it work
							}

						// return
							return this;
					},
					
					/**
					 * Stores data for any Flash elements as local SharedObject data
					 * @param	{Object}	data		Any object that can be serialized to XML
					 * @returns	{XUL}					The XUL dialog
					 */
					setFlashData:function(data)
					{
						this.flashData = data;
						return this;
					},
					
					/**
					 * Replace the standard XML dialog template
					 * @param	{String}	xml			An XML String containing dialog controls
					 * @returns	{XUL}					The XUL dialog
					 */
					setXML:function(xml)
					{
						// variables
							this.controls	= {};
							this.events		= {};
							this.settings	= {};

						// xml							
							var nodes = new XMLList(xml);
							
						// update content
							delete this.xml..content.*;
							this.xml..content.@id	= 'controls'
							this.content			= this._parseUserXML(nodes);
							
						// add new controls
							return this;
					},


			// --------------------------------------------------------------------------------
			// # Set methods

				/**
				 * Sets the initial values of controls in the dialog
				 * @param	{Object}	values			A hash of control:value values
				 * @param	{XML}		values			An XML node of <name>value</name> elements
				 * @returns	{XUL}						The XUL dialog
				 */
				setValues:function(values)
				{
					if(typeof values == 'xml')
					{
						if(values.length() === 1 && values.*.length() > 0)
						{
							values = values.*;
						}
						for each(var node in values)
						{
							this.setValue(node.name(), String(node.valueOf()));
						}
					}
					else
					{
						for(var id in values)
						{
							this.setValue(id, values[id]);
						}
					}
					return this;
				},

				/**
				 * Sets the initial value of a control in the dialog
				 * @param	{String}	id				The name of the control
				 * @param	{value}		value			The value of the control
				 * @returns	{XUL}						The XUL dialog
				 */
				setValue:function(id, value)
				{
					//TODO Add support for checkbox groups
					//TODO Re-evaluate the logic behind using XMLUI.settings, and think about using XUL.values
					if(this.controls[id])
					{
						this.settings[id] = String(value);
					}
					return this;
				},

				/**
				 * Assign values from a miscellaneous property object
				 * @param	{Object}	props			An object of key:value pairs. Valid keys are: title
				 * @returns	{XUL}						The XUL dialog
				 */
				setProperties:function(props)
				{
					for(var name in props)
					{
						var value = props[name];
						switch(name)
						{
							case 'title':
								this.xml.@title = value;
							break;
						}
					}
					return this;
				},

				/**
				 * Set the default buttons of the XMLUI dialog
				 * @param	{String}	str				A comma delimted string of valid button types, e.g. "accept,cancel"
				 * @returns	{XUL}						The XUL dialog
				 */
				setButtons:function(str)
				{
					this.xml.@buttons = str;
					return this;
				},

				/**
				 * Set the widths of the dialog's columns
				 * @param	{Array}		columns			An array of Number pixel widths
				 * @returns	{XUL}						The XUL dialog
				 */
				setColumns:function(columns)
				{
					if(Utils.isArray(columns))
					{
						this.columns = columns;
					}
					return this;
				},
				
				setWidth:function(value)
				{
					trace('XUL.setWidth() not yet implemented');
					return this;
				},

				/**
				 * Set the title of the dialog
				 * @param	{String}	title			A String title
				 * @returns	{XUL}						The XUL dialog
				 */
				setTitle:function(title)
				{
					if(this.xml)
					{
						this.xml.@title		= ' ' + title;
						this.title			= title;
					}
					return this;
				},


			// --------------------------------------------------------------------------------
			// # Event handling

				/**
				 * Add (or actually, set) a event callback for an id. Global events take only type and callback arguments.
				 * @param	{String}	ids			The id(s) of the element to register the callback for
				 * @param	{String}	types		The type(s) of callback. Values can be create, change, click, setfocus. Separate multiple types with spaces or commas if required
				 * @param	{Function}	callback	The callback to call. Format must be function(event){ ... }
				 * @param	{Object}	scope		An optional scope in which event callbacks should run. Defaults to the current XUL instance
				 * @returns	{XUL}					The XUL dialog
				 */
				addEvent:function(ids, types, callback, scope)
				{
					// xul-level events
						if(arguments.length == 2 && typeof types == 'function')
						{
							// variables
								callback	= types;
								var type	= ids;

							// check types are valid
								if( ! /^initialize|prevalidate|postvalidate$/.test(type))
								{
									throw new Error('XUL.addEvent(): invalid event type "' +type+ '"');
								}

							// build hash if not yet exists
								if(this.events[type] == null)
								{
									this.events[type] = {};
								}

							// assign command
								this.events[type] = callback;

						}

					// control events
						else
						{
							// update "click" events to "command" events
								types	= types.replace(/click/g, 'command');

							// convert ids and types to Arrays
								ids		= Utils.toArray(ids);
								types	= Utils.toArray(types);

							// add events
								for each(var id in ids)
								{
									for each(var type in types)
									{
										// check types are valid
											if( ! /^command|change|setfocus|create$/.test(type))
											{
												throw new Error('XUL.addEvent(): invalid event type "' +type+ '"');
											}

										// build hash if not yet exists
											if(this.events[type] == null)
											{
												this.events[type] = {};
											}

										// assign command
											this.events[type][id] = callback;
									}
								}
						}
						
					// assign scope
						if(scope)
						{
							this.setEventScope(scope);
						}

					// return
						return this;
				},

				/**
				 * Set the scope in which events will run
				 * @param	{Object}	scope		The object in which you want events to be called in
				 * @returns	{XUL}					The XUL dialog
				 */
				setEventScope:function(scope)
				{
					this.scope = scope;
					return this;
				},

				/**
				 * Handles all events in the XUL dialog
				 * @param	{String}	type		The event type
				 * @param	{String}	id			The control id
				 * @private
				 */
				handleEvent:function (type, id)
				{
					// variables
						var object;
						var value;

					// debug
						//trace('Event:' + [id, type])

					// handle event
						switch(type)
						{
							// xul-level
								case 'initialize':

									// set all values
										for each(var control in this.controls)
										{
											control.update(this.settings);
										}

								case 'prevalidate':
								case 'postvalidate':
									if(this.events[type])
									{
										var callback = this.events[type];
										if(typeof callback == 'function')
										{
											var event = new XULEvent(type, null, this, fl.xmlui);
											callback.apply(this.scope || this, [event]);
										}
									}
								break;

							// create
								case 'create':

							// change, command, setfocus
								case 'change':
								case 'command':
								case 'setfocus':
									if(this.events[type] && this.events[type][id])
									{
										var callback = this.events[type][id];
										if(typeof callback == 'function')
										{
											//FIX Fix problem of colors disappearing when these commands are outside of this if() & check if adding callbacks screws it up too

											// xul control
												var control = this.controls[id];
												var event	= new XULEvent(type, control, this, fl.xmlui);

											// xmlui element
												var value	= fl.xmlui.get(id);

											// dispatch event
												//callback(control, this, fl.xmlui, type) // control, xul, xmlui, type
												callback.apply(this.scope || this, [event]);
										}
									}
								break;
						}

					// debug
						//trace('Event:' + [fl.xmlui, this, object, value, id, type])

				},

			// --------------------------------------------------------------------------------
			// # Loading and showing
			
				/**
				 * Loads a dialog in from an external file
				 * @param	{String}	pathOrURI	A valid path or URI
				 * @param	{URI}		pathOrURI	A URI instance
				 * @returns	{XUL}					The XUL dialog
				 */
				load:function(pathOrURI)
				{
					// get URI
						var xml = xjsfl.file.load(pathOrURI);
						// var xml = loadTemplate(pathOrURI);

					// grab nodes
						if(xml.name() == 'dialog')
						{
							var title = xml.@title;
							if(title.length())
							{
								this.setTitle(title);
							}
						}
						var nodes = xml.*;
						
					// set nodes
						this.setXML(nodes);
						return this;
				},

				/**
				 * Save the dialog in a particular location so custom Flash controls can reference the src attribute properly
				 * @param	{String}	uriOrPath		A valid URI or path of where to save the dialog's XML file
				 * @returns	{XUL}						The XUL dialog
				 */
				saveAs:function(pathOrURI)
				{
					// check file is an XML file
						if(URI.getExtension(pathOrURI) !== 'xul')
						{
							throw new Error('XUL.saveAs(): dialog uri must end with .xul extension');
						}

					// make URI
						this.uri = URI.toURI(pathOrURI, 1);

					// return
						return this;
				},

				/**
				 * Shows the XUL dialog
				 * @param	{Function}	onAccept	An optional function to run when the user presses the dialog OK button
				 * @param	{Function}	onCancel	An optional function to run when the user presses the dialog Cancel button
				 * @returns	{XUL}					The XUL dialog
				 */
				show:function(onAccept, onCancel)
				{
					// --------------------------------------------------------------------------------
					// force a document open if none is

						// if( ! $dom )
						// {
						// 	//fl.createDocument();
						// }
						
						/*
							// can we set the AS3 timeout to longer than 15 seconds so we don't get these errors?
							
							Error: Error #1502: A script has executed for longer than the default timeout period of 15 seconds.
								at com.xjsfl.jsfl.io::JSFL$/trace()
								at Splash()
								
							PublishProfile scriptTimeLimit
								
							fl.showIdleMessage(state)
							
							Lets you disable the warning about a script running too long (pass false). You might want to do
							this when processing batch operations that take a long time to complete. To re-enable the alert,
							issue the command again, this time passing true.
							
							@see http://help.adobe.com/en_US/Flash/10.0_ExtendingFlash/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7b87.html
						*/
						

					// --------------------------------------------------------------------------------
					// build and show panel

						// build XML
							if(this.built == false)
							{
								this._build();
							}

						// clear settings
							delete this.settings.dismiss;

						// show panel
							this.open		= true;
							this.accepted	= false;
							this.settings	= xjsfl.ui.show(this);
							this.open		= false;

					// --------------------------------------------------------------------------------
					// process result
					
						// kill quoted strings
						//TODO check if this is Flash or me adding the quotes
							for(var name in this.settings)
							{
								this.settings[name] = this.settings[name].replace(/^"([\s\S]*?)"$/, '$1');
							}
							
						// get control values and convert to array for callbacks
							if(onAccept || onCancel)
							{
								var args = Utils.getValues(this.values);
							}

						// test for validation
							if(this.settings && this.settings.dismiss === 'accept')
							{
								// set accepted
									this.accepted	= true;
									
								// validate

									// prevalidate event
										this.handleEvent('prevalidate');

									// reset last error message
										this.error = null;

									// loop over controls and request validation
										for each(var control in this.controls)
										{
											var error = control.validate();
											if(error != null)
											{
												this.error = error;
												break;
											}
										}

									// postvalidate event
										this.handleEvent('postvalidate');

								// didn't validate - alert error and show again
									if(this.error)
									{
										alert(this.error);
										this.show(onAccept, onCancel);
									}

								// validated - update settings and call accept callback
									else
									{
										if(onAccept)
										{
											onAccept.apply(this, args);
										}
									}
							}

						// cancel
							else
							{
								if(onCancel)
								{
									onCancel.apply(this, args);
								}
							}

						// return
							return this;
				},

				/**
				 * Closes the dialog
				 * @param	{Boolean}	state		An optional Boolean to close and accpet (true) or cancel (unsupplied or false) the dialog
				 * @returns
				 */
				close:function(state)
				{
					state ? fl.xmlui.accept() : fl.xmlui.cancel();
				},

				/**
				 * Builds the XML for the XMLUI dialog
				 * @returns
				 */
				_build:function()
				{
					// find #controls node and add content
						if(true)
						{
							var controls	= this.xml.get('..*.(#controls)');
							var content		= new XMLList(this.content);
							controls.row	+= content;
						}
						else
						{
							var xml			= this.xml.toXMLString();
							xml				= xml.replace(/<(\w+) id="controls"(>\/\\1>|\/>)/, '<$1 id="controls">' +this.content+ '</$1>');
							this.xml		= new XML(xml);
						}

					// add handlers to controls
						// events
							var types =
							{
								button:			'create command',
								checkbox:		'create',
								radiogroup:		'create',
								//choosefile:		'create',
								colorchip:		'create change',
								//expression:		'create change',
								flash:			'create',
								listbox:		'create change setfocus',
								menulist:		'create change setfocus',
								popupslider:	'create',
								targetlist:		'create',
								textbox:		'create change',
								property:		'create'
							};

						// loop over types
							for(var type in types)
							{
								// variables
									var events		= types[type].split(/ /g);
									var event;
									var nodes		= this.xml.get('..' + type);
									var node;

								// for each node
									for each(node in nodes)
									{
										// id
											var id = node.@id;

										// assign handler. Note that the xulid will be assigned and the {xulid} placeholder replaced during xjsfl.ui.show()
											for each(event in events)
											{
												// Note that the window.xjsfl is needed so that the installation dialogs don't error
												node['@on' + event] = "if(window.xjsfl)xjsfl.ui.handleEvent('{xulid}', '" +event+ "', '" +id+ "');";
											}
									}
							}

					// set column widths
						for each(var label in this.xml..row.label)
						{
							label.@width = this.columns[0];
						}
						for each(var control in this.xml..row.*.(function::attribute('class') == 'control'))
						{
							control.@width = this.columns[1];
						}

					// replace separators
						var str		= this.xml.toXMLString().replace(/<row template="separator"\/>/g, this.separator);
						this.xml	= new XML(str);

					// add xulid, so we can test for existance of dialog boxes in future
						this.xml.*	+= new XML('<property id="xulid" value="{xulid}" />');

					// debug
						// trace(this.xml.toXMLString())

					// flag as built
						this.built = true;

					// return
						return this;

				},

			// ----------------------------------------------------------------------------#----
			// # Utilities

				/**
				 * Parses a function source into an info object: {name:name, params:['param1','param2','param3']}
				 * @param	{Function}		fn		A function
				 * @returns	{Object}				An object
				 */
				_parseFunction:function(fn)
				{
					var matches = fn.toSource().match(/function (\w+)\(([^\)]*)\)/);
					if(matches && matches[2])
					{
						var params = matches[2].match(/(\w+)/g);
						return {name:matches[1], params:params};
					}
					return null;
				},

				/**
				 * Returns a String representation of the dialog
				 * @returns	{String}				The String representation of the dialog
				 */
				toString:function()
				{
					return '[object XUL id="' +this.id+ '" title="' +(this.xml ? String(this.xml.@title).trim() : '')+ '" controls:' +Utils.getKeys(this.controls).length+ ']';
				}
		}

	// ---------------------------------------------------------------------------------------------------------------
	// register

		// xjsfl.classes.register('XUL', XUL);
		return XUL;
})(Utils,XULControl,XULEvent,__XML__,xjsfl);





return XUL;

});