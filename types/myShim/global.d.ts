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
    };
}

declare var AnJsflScript: AnJsflScript;


interface SoundInfo {
    LAYER: {
        layer: FlashLayer;
        layerName: string;
        layerIndex: number;
    };
    FRAME: {
        frame: FlashFrame;
        frameIndex: number;
        start: number;
        end: number;
    };
    SOUND: {
        soundName: string;
        start: number;
        // end: number; //1073741823
    };
}
