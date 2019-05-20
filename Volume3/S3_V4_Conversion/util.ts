'use strict';

export = {
  isString: function(arg: Object): arg is string {
    return typeof(arg) === 'string';
  },
  isObject: function<T>(arg: any): arg is T {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg: Object | null): arg is null {
    return arg === null;
  },
  isNullOrUndefined: function(arg: Object | null | undefined): arg is null | undefined {
    return arg == null;
  }
};
