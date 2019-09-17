import { UtilsContext } from './utils-context';

export interface InteropDataPacket {
    appName: string;
    url: string;
    appSize: AppSize;
    error: any;
    utilsContext: UtilsContext;
    tabName: string;
}

export interface AppSize {
    windowHeight: number;
    windowWidth: number;
    scrollHeight: number;
}
