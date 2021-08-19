'use strict'
exports.__esModule = true
// Const
var TRANSFORMED_TYPE_KEY = '@t'
var CIRCULAR_REF_KEY = '@r'
var KEY_REQUIRE_ESCAPING_RE = /^#*@(t|r)$/
var GLOBAL = (function getGlobal() {
  // NOTE: see http://www.ecma-international.org/ecma-262/6.0/index.html#sec-performeval step 10
  var savedEval = eval
  return savedEval('this')
})()
var ARRAY_BUFFER_SUPPORTED = typeof ArrayBuffer === 'function'
var MAP_SUPPORTED = typeof Map === 'function'
var SET_SUPPORTED = typeof Set === 'function'
var TYPED_ARRAY_CTORS = [
  'Int8Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Int16Array',
  'Uint16Array',
  'Int32Array',
  'Uint32Array',
  'Float32Array',
  'Float64Array',
]
// Saved proto functions
var arrSlice = Array.prototype.slice
// Default serializer
var JSONSerializer = {
  serialize: function (val) {
    return JSON.stringify(val)
  },
  deserialize: function (val) {
    return JSON.parse(val)
  },
}
// EncodingTransformer
var EncodingTransformer = /** @class */ (function () {
  function EncodingTransformer(val, transforms) {
    this.references = val
    this.transforms = transforms
    this.circularCandidates = []
    this.circularCandidatesDescrs = []
    this.circularRefCount = 0
  }
  EncodingTransformer._createRefMark = function (idx) {
    var obj = Object.create(null)
    obj[CIRCULAR_REF_KEY] = idx
    return obj
  }
  EncodingTransformer.prototype._createCircularCandidate = function (
    val,
    parent,
    key
  ) {
    this.circularCandidates.push(val)
    this.circularCandidatesDescrs.push({ parent: parent, key: key, refIdx: -1 })
  }
  EncodingTransformer.prototype._applyTransform = function (
    val,
    parent,
    key,
    transform
  ) {
    var result = Object.create(null)
    var serializableVal = transform.toSerializable(val)
    if (typeof serializableVal === 'object')
      this._createCircularCandidate(val, parent, key)
    result[TRANSFORMED_TYPE_KEY] = transform.type
    result.data = this._handleValue(
      function () {
        return serializableVal
      },
      parent,
      key
    )
    return result
  }
  EncodingTransformer.prototype._handleArray = function (arr) {
    var result = []
    var _loop_1 = function (i) {
      result[i] = this_1._handleValue(
        function () {
          return arr[i]
        },
        result,
        i
      )
    }
    var this_1 = this
    for (var i = 0; i < arr.length; i++) {
      _loop_1(i)
    }
    return result
  }
  EncodingTransformer.prototype._handlePlainObject = function (obj) {
    var _a, _b
    var result = Object.create(null)
    var _loop_2 = function (key) {
      if (Reflect.has(obj, key)) {
        var resultKey = KEY_REQUIRE_ESCAPING_RE.test(key) ? '#' + key : key
        result[resultKey] = this_2._handleValue(
          function () {
            return obj[key]
          },
          result,
          resultKey
        )
      }
    }
    var this_2 = this
    for (var key in obj) {
      _loop_2(key)
    }
    var name =
      (_b =
        (_a = obj === null || obj === void 0 ? void 0 : obj.__proto__) ===
          null || _a === void 0
          ? void 0
          : _a.constructor) === null || _b === void 0
        ? void 0
        : _b.name
    if (name && name !== 'Object') {
      result.constructor = { name: name }
    }
    return result
  }
  EncodingTransformer.prototype._handleObject = function (obj, parent, key) {
    this._createCircularCandidate(obj, parent, key)
    return Array.isArray(obj)
      ? this._handleArray(obj)
      : this._handlePlainObject(obj)
  }
  EncodingTransformer.prototype._ensureCircularReference = function (obj) {
    var circularCandidateIdx = this.circularCandidates.indexOf(obj)
    if (circularCandidateIdx > -1) {
      var descr = this.circularCandidatesDescrs[circularCandidateIdx]
      if (descr.refIdx === -1)
        descr.refIdx = descr.parent ? ++this.circularRefCount : 0
      return EncodingTransformer._createRefMark(descr.refIdx)
    }
    return null
  }
  EncodingTransformer.prototype._handleValue = function (getVal, parent, key) {
    try {
      var val = getVal()
      var type = typeof val
      var isObject = type === 'object' && val !== null
      if (isObject) {
        var refMark = this._ensureCircularReference(val)
        if (refMark) return refMark
      }
      for (var _i = 0, _a = this.transforms; _i < _a.length; _i++) {
        var transform = _a[_i]
        if (transform.shouldTransform(type, val))
          return this._applyTransform(val, parent, key, transform)
      }
      if (isObject) return this._handleObject(val, parent, key)
      return val
    } catch (e) {
      try {
        return this._handleValue(
          function () {
            return e instanceof Error ? e : new Error(e)
          },
          parent,
          key
        )
      } catch (_b) {
        return null
      }
    }
  }
  EncodingTransformer.prototype.transform = function () {
    var _this = this
    var references = [
      this._handleValue(
        function () {
          return _this.references
        },
        null,
        null
      ),
    ]
    for (var _i = 0, _a = this.circularCandidatesDescrs; _i < _a.length; _i++) {
      var descr = _a[_i]
      if (descr.refIdx > 0) {
        references[descr.refIdx] = descr.parent[descr.key]
        descr.parent[descr.key] = EncodingTransformer._createRefMark(
          descr.refIdx
        )
      }
    }
    return references
  }
  return EncodingTransformer
})()
// DecodingTransform
var DecodingTransformer = /** @class */ (function () {
  function DecodingTransformer(references, transformsMap) {
    this.activeTransformsStack = []
    this.visitedRefs = Object.create(null)
    this.references = references
    this.transformMap = transformsMap
  }
  DecodingTransformer.prototype._handlePlainObject = function (obj) {
    var unescaped = Object.create(null)
    if ('constructor' in obj) {
      if (!obj.constructor || typeof obj.constructor.name !== 'string') {
        obj.constructor = {
          name: 'Object',
        }
      }
    }
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        this._handleValue(obj[key], obj, key)
        if (KEY_REQUIRE_ESCAPING_RE.test(key)) {
          // NOTE: use intermediate object to avoid unescaped and escaped keys interference
          // E.g. unescaped "##@t" will be "#@t" which can overwrite escaped "#@t".
          unescaped[key.substring(1)] = obj[key]
          delete obj[key]
        }
      }
    }
    for (var unsecapedKey in unescaped)
      obj[unsecapedKey] = unescaped[unsecapedKey]
  }
  DecodingTransformer.prototype._handleTransformedObject = function (
    obj,
    parent,
    key
  ) {
    var transformType = obj[TRANSFORMED_TYPE_KEY]
    var transform = this.transformMap[transformType]
    if (!transform)
      throw new Error('Can\'t find transform for "' + transformType + '" type.')
    this.activeTransformsStack.push(obj)
    this._handleValue(obj.data, obj, 'data')
    this.activeTransformsStack.pop()
    parent[key] = transform.fromSerializable(obj.data)
  }
  DecodingTransformer.prototype._handleCircularSelfRefDuringTransform =
    function (refIdx, parent, key) {
      // NOTE: we've hit a hard case: object reference itself during transformation.
      // We can't dereference it since we don't have resulting object yet. And we'll
      // not be able to restore reference lately because we will need to traverse
      // transformed object again and reference might be unreachable or new object contain
      // new circular references. As a workaround we create getter, so once transformation
      // complete, dereferenced property will point to correct transformed object.
      var references = this.references
      Object.defineProperty(parent, key, {
        // @ts-ignore
        val: void 0,
        configurable: true,
        enumerable: true,
        get: function () {
          if (this.val === void 0) this.val = references[refIdx]
          return this.val
        },
        set: function (value) {
          this.val = value
        },
      })
    }
  DecodingTransformer.prototype._handleCircularRef = function (
    refIdx,
    parent,
    key
  ) {
    if (this.activeTransformsStack.includes(this.references[refIdx]))
      this._handleCircularSelfRefDuringTransform(refIdx, parent, key)
    else {
      if (!this.visitedRefs[refIdx]) {
        this.visitedRefs[refIdx] = true
        this._handleValue(this.references[refIdx], this.references, refIdx)
      }
      parent[key] = this.references[refIdx]
    }
  }
  DecodingTransformer.prototype._handleValue = function (val, parent, key) {
    if (typeof val !== 'object' || val === null) return
    var refIdx = val[CIRCULAR_REF_KEY]
    if (refIdx !== void 0) this._handleCircularRef(refIdx, parent, key)
    else if (val[TRANSFORMED_TYPE_KEY])
      this._handleTransformedObject(val, parent, key)
    else if (Array.isArray(val)) {
      for (var i = 0; i < val.length; i++) this._handleValue(val[i], val, i)
    } else this._handlePlainObject(val)
  }
  DecodingTransformer.prototype.transform = function () {
    this.visitedRefs[0] = true
    this._handleValue(this.references[0], this.references, 0)
    return this.references[0]
  }
  return DecodingTransformer
})()
// Transforms
var builtInTransforms = [
  {
    type: '[[NaN]]',
    shouldTransform: function (type, val) {
      return type === 'number' && isNaN(val)
    },
    toSerializable: function () {
      return ''
    },
    fromSerializable: function () {
      return NaN
    },
  },
  {
    type: '[[undefined]]',
    shouldTransform: function (type) {
      return type === 'undefined'
    },
    toSerializable: function () {
      return ''
    },
    fromSerializable: function () {
      return void 0
    },
  },
  {
    type: '[[Date]]',
    shouldTransform: function (type, val) {
      return val instanceof Date
    },
    toSerializable: function (date) {
      return date.getTime()
    },
    fromSerializable: function (val) {
      var date = new Date()
      date.setTime(val)
      return date
    },
  },
  {
    type: '[[RegExp]]',
    shouldTransform: function (type, val) {
      return val instanceof RegExp
    },
    toSerializable: function (re) {
      var result = {
        src: re.source,
        flags: '',
      }
      if (re.global) result.flags += 'g'
      if (re.ignoreCase) result.flags += 'i'
      if (re.multiline) result.flags += 'm'
      return result
    },
    fromSerializable: function (val) {
      return new RegExp(val.src, val.flags)
    },
  },
  {
    type: '[[Error]]',
    shouldTransform: function (type, val) {
      return val instanceof Error
    },
    toSerializable: function (err) {
      var _a, _b
      if (!err.stack) {
        ;(_b = (_a = Error).captureStackTrace) === null || _b === void 0
          ? void 0
          : _b.call(_a, err)
      }
      return {
        name: err.name,
        message: err.message,
        stack: err.stack,
      }
    },
    fromSerializable: function (val) {
      var Ctor = GLOBAL[val.name] || Error
      var err = new Ctor(val.message)
      err.stack = val.stack
      return err
    },
  },
  {
    type: '[[ArrayBuffer]]',
    shouldTransform: function (type, val) {
      return ARRAY_BUFFER_SUPPORTED && val instanceof ArrayBuffer
    },
    toSerializable: function (buffer) {
      var view = new Int8Array(buffer)
      return arrSlice.call(view)
    },
    fromSerializable: function (val) {
      if (ARRAY_BUFFER_SUPPORTED) {
        var buffer = new ArrayBuffer(val.length)
        var view = new Int8Array(buffer)
        view.set(val)
        return buffer
      }
      return val
    },
  },
  {
    type: '[[TypedArray]]',
    shouldTransform: function (type, val) {
      for (
        var _i = 0, TYPED_ARRAY_CTORS_1 = TYPED_ARRAY_CTORS;
        _i < TYPED_ARRAY_CTORS_1.length;
        _i++
      ) {
        var ctorName = TYPED_ARRAY_CTORS_1[_i]
        if (
          typeof GLOBAL[ctorName] === 'function' &&
          val instanceof GLOBAL[ctorName]
        )
          return true
      }
      return false
    },
    toSerializable: function (arr) {
      return {
        ctorName: arr.constructor.name,
        arr: arrSlice.call(arr),
      }
    },
    fromSerializable: function (val) {
      return typeof GLOBAL[val.ctorName] === 'function'
        ? new GLOBAL[val.ctorName](val.arr)
        : val.arr
    },
  },
  {
    type: '[[Map]]',
    shouldTransform: function (type, val) {
      return MAP_SUPPORTED && val instanceof Map
    },
    toSerializable: function (map) {
      var flattenedKVArr = []
      map.forEach(function (val, key) {
        flattenedKVArr.push(key)
        flattenedKVArr.push(val)
      })
      return flattenedKVArr
    },
    fromSerializable: function (val) {
      if (MAP_SUPPORTED) {
        // NOTE: new Map(iterable) is not supported by all browsers
        var map = new Map()
        for (var i = 0; i < val.length; i += 2) map.set(val[i], val[i + 1])
        return map
      }
      var kvArr = []
      // @ts-ignore
      for (var j = 0; j < val.length; j += 2) kvArr.push([val[i], val[i + 1]])
      return kvArr
    },
  },
  {
    type: '[[Set]]',
    shouldTransform: function (type, val) {
      return SET_SUPPORTED && val instanceof Set
    },
    toSerializable: function (set) {
      var arr = []
      set.forEach(function (val) {
        arr.push(val)
      })
      return arr
    },
    fromSerializable: function (val) {
      if (SET_SUPPORTED) {
        // NOTE: new Set(iterable) is not supported by all browsers
        var set = new Set()
        for (var i = 0; i < val.length; i++) set.add(val[i])
        return set
      }
      return val
    },
  },
]
// Replicator
var Replicator = /** @class */ (function () {
  function Replicator(serializer) {
    this.transforms = []
    this.transformsMap = Object.create(null)
    this.serializer = serializer || JSONSerializer
    this.addTransforms(builtInTransforms)
  }
  Replicator.prototype.addTransforms = function (transforms) {
    transforms = Array.isArray(transforms) ? transforms : [transforms]
    for (
      var _i = 0, transforms_1 = transforms;
      _i < transforms_1.length;
      _i++
    ) {
      var transform = transforms_1[_i]
      if (this.transformsMap[transform.type])
        throw new Error(
          'Transform with type "' + transform.type + '" was already added.'
        )
      this.transforms.push(transform)
      this.transformsMap[transform.type] = transform
    }
    return this
  }
  Replicator.prototype.removeTransforms = function (transforms) {
    transforms = Array.isArray(transforms) ? transforms : [transforms]
    for (
      var _i = 0, transforms_2 = transforms;
      _i < transforms_2.length;
      _i++
    ) {
      var transform = transforms_2[_i]
      var idx = this.transforms.indexOf(transform)
      if (idx > -1) this.transforms.splice(idx, 1)
      delete this.transformsMap[transform.type]
    }
    return this
  }
  Replicator.prototype.encode = function (val) {
    var transformer = new EncodingTransformer(val, this.transforms)
    var references = transformer.transform()
    return this.serializer.serialize(references)
  }
  Replicator.prototype.decode = function (val) {
    var references = this.serializer.deserialize(val)
    var transformer = new DecodingTransformer(references, this.transformsMap)
    return transformer.transform()
  }
  return Replicator
})()
exports['default'] = Replicator
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVHJhbnNmb3JtL3JlcGxpY2F0b3IvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxRQUFRO0FBQ1IsSUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUE7QUFDakMsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUE7QUFDN0IsSUFBTSx1QkFBdUIsR0FBRyxZQUFZLENBQUE7QUFFNUMsSUFBTSxNQUFNLEdBQUcsQ0FBQyxTQUFTLFNBQVM7SUFDaEMsOEZBQThGO0lBQzlGLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQTtJQUV0QixPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMxQixDQUFDLENBQUMsRUFBRSxDQUFBO0FBRUosSUFBTSxzQkFBc0IsR0FBRyxPQUFPLFdBQVcsS0FBSyxVQUFVLENBQUE7QUFDaEUsSUFBTSxhQUFhLEdBQUcsT0FBTyxHQUFHLEtBQUssVUFBVSxDQUFBO0FBQy9DLElBQU0sYUFBYSxHQUFHLE9BQU8sR0FBRyxLQUFLLFVBQVUsQ0FBQTtBQUUvQyxJQUFNLGlCQUFpQixHQUFHO0lBQ3hCLFdBQVc7SUFDWCxZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixhQUFhO0lBQ2IsWUFBWTtJQUNaLGFBQWE7SUFDYixjQUFjO0lBQ2QsY0FBYztDQUNmLENBQUE7QUFFRCx3QkFBd0I7QUFDeEIsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUE7QUFFdEMscUJBQXFCO0FBQ3JCLElBQU0sY0FBYyxHQUFHO0lBQ3JCLFNBQVMsRUFBVCxVQUFVLEdBQVE7UUFDaEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFFRCxXQUFXLEVBQVgsVUFBWSxHQUFRO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN4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
