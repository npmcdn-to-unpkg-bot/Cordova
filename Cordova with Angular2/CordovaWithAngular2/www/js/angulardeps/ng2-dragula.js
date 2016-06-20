System.registerDynamic("src/app/directives/dragula.directive", ["angular2/core", "../providers/dragula.provider", "dragula"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var dragula_provider_1 = $__require('../providers/dragula.provider');
  var dragula = $__require('dragula');
  var Dragula = (function() {
    function Dragula(el, dragulaService) {
      this.el = el;
      this.dragulaService = dragulaService;
      this.container = el.nativeElement;
    }
    Dragula.prototype.ngOnInit = function() {
      var _this = this;
      var bag = this.dragulaService.find(this.bag);
      var checkModel = function() {
        if (_this.dragulaModel) {
          if (_this.drake.models) {
            _this.drake.models.push(_this.dragulaModel);
          } else {
            _this.drake.models = [_this.dragulaModel];
          }
        }
      };
      if (bag) {
        this.drake = bag.drake;
        checkModel();
        this.drake.containers.push(this.container);
      } else {
        this.drake = dragula({containers: [this.container]});
        checkModel();
        this.dragulaService.add(this.bag, this.drake);
      }
    };
    Dragula.prototype.ngOnChanges = function(changes) {
      if (changes && changes['dragulaModel']) {
        if (this.drake) {
          if (this.drake.models) {
            var modelIndex = this.drake.models.indexOf(changes['dragulaModel'].previousValue);
            this.drake.models.splice(modelIndex, 1, changes['dragulaModel'].currentValue);
          } else {
            this.drake.models = [changes['dragulaModel'].currentValue];
          }
        }
      }
    };
    __decorate([core_1.Input('dragula'), __metadata('design:type', String)], Dragula.prototype, "bag", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object)], Dragula.prototype, "dragulaModel", void 0);
    Dragula = __decorate([core_1.Directive({selector: '[dragula]'}), __metadata('design:paramtypes', [core_1.ElementRef, dragula_provider_1.DragulaService])], Dragula);
    return Dragula;
  }());
  exports.Dragula = Dragula;
  return module.exports;
});

System.registerDynamic("src/app/providers/dragula.provider", ["dragula", "angular2/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var dragula = $__require('dragula');
  var core_1 = $__require('angular2/core');
  var DragulaService = (function() {
    function DragulaService() {
      this.cancel = new core_1.EventEmitter();
      this.cloned = new core_1.EventEmitter();
      this.drag = new core_1.EventEmitter();
      this.dragend = new core_1.EventEmitter();
      this.drop = new core_1.EventEmitter();
      this.out = new core_1.EventEmitter();
      this.over = new core_1.EventEmitter();
      this.remove = new core_1.EventEmitter();
      this.shadow = new core_1.EventEmitter();
      this.dropModel = new core_1.EventEmitter();
      this.removeModel = new core_1.EventEmitter();
      this.events = ['cancel', 'cloned', 'drag', 'dragend', 'drop', 'out', 'over', 'remove', 'shadow', 'dropModel', 'removeModel'];
      this.bags = [];
    }
    DragulaService.prototype.add = function(name, drake) {
      var bag = this.find(name);
      if (bag) {
        throw new Error('Bag named: "' + name + '" already exists.');
      }
      bag = {
        name: name,
        drake: drake
      };
      this.bags.push(bag);
      if (drake.models) {
        this.handleModels(name, drake);
      }
      if (!bag.initEvents) {
        this.setupEvents(bag);
      }
      return bag;
    };
    DragulaService.prototype.find = function(name) {
      for (var i = 0; i < this.bags.length; i++) {
        if (this.bags[i].name === name) {
          return this.bags[i];
        }
      }
    };
    DragulaService.prototype.destroy = function(name) {
      var bag = this.find(name);
      var i = this.bags.indexOf(bag);
      this.bags.splice(i, 1);
      bag.drake.destroy();
    };
    DragulaService.prototype.setOptions = function(name, options) {
      var bag = this.add(name, dragula(options));
      this.handleModels(name, bag.drake);
    };
    DragulaService.prototype.handleModels = function(name, drake) {
      var _this = this;
      var dragElm;
      var dragIndex;
      var dropIndex;
      var sourceModel;
      drake.on('remove', function(el, source) {
        if (!drake.models) {
          return;
        }
        sourceModel = drake.models[drake.containers.indexOf(source)];
        sourceModel.splice(dragIndex, 1);
        _this.removeModel.emit([name, el, source]);
      });
      drake.on('drag', function(el, source) {
        dragElm = el;
        dragIndex = _this.domIndexOf(el, source);
      });
      drake.on('drop', function(dropElm, target, source) {
        if (!drake.models || !target) {
          return;
        }
        dropIndex = _this.domIndexOf(dropElm, target);
        sourceModel = drake.models[drake.containers.indexOf(source)];
        if (target === source) {
          sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
        } else {
          var notCopy = dragElm === dropElm;
          var targetModel = drake.models[drake.containers.indexOf(target)];
          var dropElmModel = notCopy ? sourceModel[dragIndex] : JSON.parse(JSON.stringify(sourceModel[dragIndex]));
          if (notCopy) {
            sourceModel.splice(dragIndex, 1);
          }
          targetModel.splice(dropIndex, 0, dropElmModel);
          target.removeChild(dropElm);
        }
        _this.dropModel.emit([name, dropElm, target, source]);
      });
    };
    DragulaService.prototype.setupEvents = function(bag) {
      bag.initEvents = true;
      var that = this;
      var emitter = function(type) {
        function replicate() {
          var args = Array.prototype.slice.call(arguments);
          that[type].emit([bag.name].concat(args));
        }
        bag.drake.on(type, replicate);
      };
      this.events.forEach(emitter);
    };
    DragulaService.prototype.domIndexOf = function(child, parent) {
      return Array.prototype.indexOf.call(parent.children, child);
    };
    DragulaService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], DragulaService);
    return DragulaService;
  }());
  exports.DragulaService = DragulaService;
  return module.exports;
});

System.registerDynamic("ng2-dragula", ["./src/app/directives/dragula.directive", "./src/app/providers/dragula.provider"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var dragula_directive_1 = $__require('./src/app/directives/dragula.directive');
  var dragula_provider_1 = $__require('./src/app/providers/dragula.provider');
  __export($__require('./src/app/directives/dragula.directive'));
  __export($__require('./src/app/providers/dragula.provider'));
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {
    directives: [dragula_directive_1.Dragula],
    providers: [dragula_provider_1.DragulaService]
  };
  return module.exports;
});
