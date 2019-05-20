/// <reference path="get-size.d.ts" />
/// <reference path="unidragger.d.ts" />
/// <reference path="node_modules/@types/jquery/index.d.ts" />
/*!
 * Draggabilly v2.1.1
 * Make that shiz draggable
 * http://draggabilly.desandro.com
 * MIT license
 */
declare var define: {
    (dependencies: string[], factory: Function);
    amd: boolean;
};
declare var module: {
    exports: Object;
};
declare function require(dependency: string): any;
interface JQueryEventConstructor {
    (src: Event): JQueryEventObject;
    new (src: Event): JQueryEventObject;
}
interface JQueryEventObject {
    type: string;
}
interface JQueryStatic {
    bridget(name: string, ctor: Function): any;
}
