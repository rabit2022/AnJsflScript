type Int = number;
type Uint = number;
type Float = number;
type NumberLike = number | string;

interface AnJsflScript {
    importFlashScripts: (scripts: string[]) => void;
    $ProjectFileDir$: string;
    FOLDERS: {
        Log: string;
        Cache: string;
        AsciiArtLibrary: string;
        Save: string;
        Scripts: string;
    };
}

declare var AnJsflScript: AnJsflScript;

// 导出全局变量
declare var exports: any;

