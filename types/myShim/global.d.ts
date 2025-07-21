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
