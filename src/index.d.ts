export class ClassList {
    add(...classes: Array<string>): ClassList;
    remove(...classes: Array<string>): ClassList;
    get(): string;
}

export class Theme {
    public static Light: string;
    public static Dark: string;
    public static Auto: string;

    public static setMode(mode?: string, root?: any): undefined;
    public static toggleMode(isDark?: boolean): undefined;
    public static getMode(): string;
}

export default Theme;

