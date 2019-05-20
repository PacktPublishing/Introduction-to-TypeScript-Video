/*!
 * Draggabilly v2.1.1
 * Make that shiz draggable
 * http://draggabilly.desandro.com
 * MIT license
 */

/// <reference path="get-size.d.ts" />
/// <reference path="unidragger.d.ts" />
/// <reference path="node_modules/@types/jquery/index.d.ts" />

// -------------------------- modules -------------------------- //

declare var define: {
    (dependencies: string[], factory: Function);
    amd: boolean;
};

declare var module: {
    exports: Object;
}

declare function require(dependency: string): any;

// augment jQuery types

interface JQueryEventConstructor {
    (src: Event): JQueryEventObject;
    new (src: Event): JQueryEventObject;
}

interface JQueryEventObject {
    type: string; /* force writeable */
}

interface JQueryStatic {
    bridget(name: string, ctor: Function);
}

// --------------- //

/* jshint browser: true, strict: true, undef: true, unused: true */

(function (window: any, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD
        define([
            'get-size/get-size',
            'unidragger/unidragger'
        ],
            function (getSize, Unidragger) {
                return factory(window, getSize, Unidragger);
            });
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            window,
            require('get-size'),
            require('unidragger')
        );
    } else {
        // browser global
        window.Draggabilly = factory(
            window,
            window.getSize,
            window.Unidragger
        );
    }

} (window, function factory(window: Window, getSize: getSizeFunction, Unidragger: UnidraggerConstructor) {
    'use strict';
    
    var document = window.document;

    function noop() { }

    // -------------------------- helpers -------------------------- //

    // extend objects
    function extend<T1, T2>(a: T1, b: T2): T1 & T2 {
        for (var prop in b) {
            (<any>a)[prop] = b[prop];
        }
        return <T1 & T2>a;
    }

    function isElement(obj) {
        return obj instanceof HTMLElement;
    }

    function applyGrid(value, grid, method: MathMethod = 'round') {
        return grid ? Math[method](value / grid) * grid : value;
    }

    // -------------------------- requestAnimationFrame -------------------------- //


    // get rAF, prefixed, if present
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame || (window as any).mozRequestAnimationFrame;

    // fallback to setTimeout
    var lastTime = 0;
    if (!requestAnimationFrame) {
        requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = setTimeout(callback, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    // -------------------------- support -------------------------- //

    var docElem = document.documentElement;
    var transformProperty = typeof docElem.style.transform == 'string' ?
        'transform' : 'WebkitTransform';

    var jQuery: JQueryStatic = (window as any).jQuery;

    // css position values that don't need to be set
    var positionValues = {
        relative: true,
        absolute: true,
        fixed: true
    };

    interface Point {
        x: number;
        y: number;
    }

    type Axis = 'x' | 'y';
    type MathMethod = 'round' | 'ceil' | 'floor';

    interface Options {
        handle?: string;
        containment?: string | HTMLElement | boolean;
        axis?: Axis;
        grid?: number[];
    }

    // --------------------------  -------------------------- //

    class Draggabilly extends Unidragger {

        static defaults: Options = {}

        isEnabled: boolean;
        isDragging: boolean;
        element: HTMLElement;
        $element: JQuery;
        options: Options;
        position: Point;
        relativeStartPosition: Point;
        startPoint: Point;
        dragPoint: Point;
        startPosition: Point;
        handles: Element[];
        containSize: { width: number, height: number };

        constructor(element: string | HTMLElement, options: Options) {
            super();

            // querySelector if string
            this.element = typeof element == 'string' ?
                <HTMLElement>document.querySelector(element) : element;

            if (jQuery) {
                this.$element = jQuery(this.element);
            }

            // options
            this.options = extend({}, Draggabilly.defaults);
            this.option(options);

            this._create();
        }

        /**
         * set options
         * @param opts
         */
        option(opts: Partial<Options>) {
            extend(this.options, opts);
        }

        private _create() {

            // properties
            this.position = { x: 0, y: 0 };
            this._getPosition();

            this.startPoint = { x: 0, y: 0 };
            this.dragPoint = { x: 0, y: 0 };

            this.startPosition = extend({}, this.position);

            // set relative positioning
            var style = getComputedStyle(this.element);
            if (!positionValues[style.position]) {
                this.element.style.position = 'relative';
            }

            this.enable();
            this.setHandles();
        }

        /**
         * set this.handles and bind start events to 'em
         */
        setHandles() {
            this.handles = this.options.handle ?
                <any>this.element.querySelectorAll(this.options.handle) : [this.element];

            this.bindHandles();
        }

        /**
         * emits events via EvEmitter and jQuery events
         * @param {String} type - name of event
         * @param {Event} event - original event
         * @param {Array} args - extra arguments
         */
        dispatchEvent(type: string, event: Event, args: any[]) {
            var emitArgs = [event].concat(args);
            this.emitEvent(type, emitArgs);

            // trigger jQuery event
            if (jQuery && this.$element) {
                if (event) {
                    // create jQuery event
                    var $event = jQuery.Event(event);
                    $event.type = type;
                    this.$element.trigger($event, args);
                } else {
                    // just trigger with type if no event available
                    this.$element.trigger(type, args);
                }
            }
        }

        // -------------------------- position -------------------------- //

        _getPosition() {
            var style = getComputedStyle(this.element);
            var x = this._getPositionCoord(style.left, 'width');
            var y = this._getPositionCoord(style.top, 'height');
            // clean up 'auto' or other non-integer values
            this.position.x = isNaN(x) ? 0 : x;
            this.position.y = isNaN(y) ? 0 : y;

            this._addTransformPosition(style);
        }

        _getPositionCoord(styleSide: string, measure: "width" | "height") {
            if (styleSide.indexOf('%') != -1) {
                // convert percent into pixel for Safari, #75
                var parentSize = getSize(this.element.parentNode);
                // prevent not-in-DOM element throwing bug, #131
                return !parentSize ? 0 :
                    (parseFloat(styleSide) / 100) * parentSize[measure];
            }
            return parseInt(styleSide, 10);
        }

        _addTransformPosition(style: CSSStyleDeclaration) {
            var transform = style[transformProperty];
            // bail out if value is 'none'
            if (transform.indexOf('matrix') !== 0) {
                return;
            }
            // split matrix(1, 0, 0, 1, x, y)
            var matrixValues = transform.split(',');
            // translate X value is in 12th or 4th position
            var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
            var translateX = parseInt(matrixValues[xIndex], 10);
            // translate Y value is in 13th or 5th position
            var translateY = parseInt(matrixValues[xIndex + 1], 10);
            this.position.x += translateX;
            this.position.y += translateY;
        }

        // -------------------------- events -------------------------- //

        // preventDefault if enabled and not a <select>. #141
        canPreventDefaultOnPointerDown(event: Event) {
            // prevent default, unless touchstart or <select>
            return this.isEnabled && (<Node>event.target).nodeName != 'SELECT';
        }

        /**
         * pointer start
         * @param {Event} event
         * @param {Event or Touch} pointer
         */
        pointerDown(event: Event, pointer: Event | Touch) {
            this._dragPointerDown(event, pointer);
            // kludge to blur focused inputs in dragger
            var focused = <HTMLElement>document.activeElement;
            // do not blur body for IE10, metafizzy/flickity#117
            if (focused && focused.blur && focused != document.body) {
                focused.blur();
            }
            // bind move and end events
            this._bindPostStartEvents(event);
            this.element.classList.add('is-pointer-down');
            this.dispatchEvent('pointerDown', event, [pointer]);
        }

        /**
         * drag move
         * @param {Event} event
         * @param {Event or Touch} pointer
         */
        pointerMove(event: Event, pointer: Event | Touch) {
            var moveVector = this._dragPointerMove(event, pointer);
            this.dispatchEvent('pointerMove', event, [pointer, moveVector]);
            this._dragMove(event, pointer, moveVector);
        }

        /**
         * drag start
         * @param {Event} event
         * @param {Event or Touch} pointer
         */
        dragStart(event: Event, pointer: Event | Touch) {
            if (!this.isEnabled) {
                return;
            }
            this._getPosition();
            this.measureContainment();
            // position _when_ drag began
            this.startPosition.x = this.position.x;
            this.startPosition.y = this.position.y;
            // reset left/top style
            this.setLeftTop();

            this.dragPoint.x = 0;
            this.dragPoint.y = 0;

            this.element.classList.add('is-dragging');
            this.dispatchEvent('dragStart', event, [pointer]);
            // start animation
            this.animate();
        }

        measureContainment() {
            var containment = this.options.containment;
            if (!containment) {
                return;
            }

            // use element if element
            var container: HTMLElement = isElement(containment) ? <HTMLElement>containment :
                // fallback to querySelector if string
                typeof containment == 'string' ? <HTMLElement>document.querySelector(containment) :
                    // otherwise just `true`, use the parent
                    <HTMLElement>this.element.parentNode;

            var elemSize = getSize(this.element);
            var containerSize = getSize(container);
            var elemRect = this.element.getBoundingClientRect();
            var containerRect = container.getBoundingClientRect();

            var borderSizeX = containerSize.borderLeftWidth + containerSize.borderRightWidth;
            var borderSizeY = containerSize.borderTopWidth + containerSize.borderBottomWidth;

            var position = this.relativeStartPosition = {
                x: elemRect.left - (containerRect.left + containerSize.borderLeftWidth),
                y: elemRect.top - (containerRect.top + containerSize.borderTopWidth)
            };

            this.containSize = {
                width: (containerSize.width - borderSizeX) - position.x - elemSize.width,
                height: (containerSize.height - borderSizeY) - position.y - elemSize.height
            };
        }

        // ----- move event ----- //

        dragMove(event: Event, pointer: Event | Touch, moveVector: Point) {
            if (!this.isEnabled) {
                return;
            }
            var dragX = moveVector.x;
            var dragY = moveVector.y;

            var grid = this.options.grid;
            var gridX = grid && grid[0];
            var gridY = grid && grid[1];

            dragX = applyGrid(dragX, gridX);
            dragY = applyGrid(dragY, gridY);

            dragX = this.containDrag('x', dragX, gridX);
            dragY = this.containDrag('y', dragY, gridY);

            // constrain to axis
            dragX = this.options.axis == 'y' ? 0 : dragX;
            dragY = this.options.axis == 'x' ? 0 : dragY;

            this.position.x = this.startPosition.x + dragX;
            this.position.y = this.startPosition.y + dragY;
            // set dragPoint properties
            this.dragPoint.x = dragX;
            this.dragPoint.y = dragY;

            this.dispatchEvent('dragMove', event, [pointer, moveVector]);
        }

        containDrag(axis: Axis, drag: number, grid: number) {
            if (!this.options.containment) {
                return drag;
            }
            var measure = axis == 'x' ? 'width' : 'height';

            var rel = this.relativeStartPosition[axis];
            var min = applyGrid(-rel, grid, 'ceil');
            var max = this.containSize[measure];
            max = applyGrid(max, grid, 'floor');
            return Math.min(max, Math.max(min, drag));
        }

        // ----- end event ----- //

        pointerUp(event: Event, pointer: Event | Touch) {
            this.element.classList.remove('is-pointer-down');
            this.dispatchEvent('pointerUp', event, [pointer]);
            this._dragPointerUp(event, pointer);
        }

        /**
         * drag end
         * @param {Event} event
         * @param {Event or Touch} pointer
         */
        dragEnd(event?: Event, pointer?: Event | Touch) {
            if (!this.isEnabled) {
                return;
            }
            // use top left position when complete
            if (transformProperty) {
                this.element.style[transformProperty] = '';
                this.setLeftTop();
            }
            this.element.classList.remove('is-dragging');
            this.dispatchEvent('dragEnd', event, [pointer]);
        }

        // -------------------------- animation -------------------------- //

        animate() {
            // only render and animate if dragging
            if (!this.isDragging) {
                return;
            }

            this.positionDrag();

            requestAnimationFrame(() => {
                this.animate();
            });
        }

        // left/top positioning
        setLeftTop() {
            this.element.style.left = this.position.x + 'px';
            this.element.style.top = this.position.y + 'px';
        }

        positionDrag() {
            this.element.style[transformProperty] = 'translate3d( ' + this.dragPoint.x +
                'px, ' + this.dragPoint.y + 'px, 0)';
        }

        // ----- staticClick ----- //

        staticClick(event: Event, pointer: Event | Touch) {
            this.dispatchEvent('staticClick', event, [pointer]);
        }

        // ----- methods ----- //

        enable() {
            this.isEnabled = true;
        }

        disable() {
            this.isEnabled = false;
            if (this.isDragging) {
                this.dragEnd();
            }
        }

        destroy() {
            this.disable();
            // reset styles
            this.element.style[transformProperty] = '';
            this.element.style.left = '';
            this.element.style.top = '';
            this.element.style.position = '';
            // unbind handles
            this.unbindHandles();
            // remove jQuery data
            if (this.$element) {
                this.$element.removeData('draggabilly');
            }
        }

        // ----- jQuery bridget ----- //

        _init = noop;
    }

    if (jQuery && jQuery.bridget) {
        jQuery.bridget('draggabilly', Draggabilly);
    }

    // -----  ----- //
    return Draggabilly;
}));