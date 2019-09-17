import { Action } from '@ngrx/store';

const PREFIX = 'nav-actions:';

export const NAV_RESET = PREFIX + 'reset the nav state';
export const NAV_IFRAME = PREFIX + 'set the source of the iframe';
export const NAV_RESIZE = PREFIX + 'resize the iframe';
export const NAV_SET_MENU_NAME = PREFIX + 'set the name of menu in url';
export const PUBLISH_INTEROP = PREFIX + 'send a message to the child app';
export const PUBLISH_INTEROP_SUCCESS = PREFIX + 'success of interop send';

export class NavReset implements Action {
    readonly type = NAV_RESET;
    constructor(public payload: any) { }
}

export class NavIframe implements Action {
    readonly type = NAV_IFRAME;
    constructor(public payload: any) { }
}

export class NavResize implements Action {
    readonly type = NAV_RESIZE;
    constructor(public payload: any) { }
}

export class NavSetMenuName implements Action {
    readonly type = NAV_SET_MENU_NAME;
    constructor(public payload: any) { }
}

export class PublishInterop implements Action {
    readonly type = PUBLISH_INTEROP;
    constructor(public payload: any) { }
}
export class PublishInteropSuccess implements Action {
    readonly type = PUBLISH_INTEROP;
    constructor(public payload: any) { }
}

export type Actions
    = NavReset
    | NavIframe
    | NavResize
    | NavSetMenuName
    | PublishInterop
    | PublishInteropSuccess;
