
declare module "XUL" {
    interface MenulistAttribute {
        editable: string;
        width: string;
        flex: string;
        tabindex: string;
        // oncreate: string;
        // onsetfocus: string;
    }


    interface XULControl {
        id: string;
        type: string;
        enumerable: boolean;
        compound: boolean;
        elements: Record<string, { id: string; label: string; value: any }> | null;

        getXUL(): XUL;
        getXML(): string;
        update(settings: Record<string, any>): void;
        validate(): string | null;

        readonly rawValue: string;
        value: any;
        set value(value: any);

        visible: boolean;
        enabled: boolean;

        readonly values: any[];
        set values(values: Array<any | { label: string; value: any }>);

        selectedIndex: number;
        set selectedIndex(index: number);

        toString(): string;
    }

    interface XULEvent {
        type: string;
        control: XULControl | null;
        xul: XUL;
        xmlui: any;
        toString(): string;
    }

    interface XUL {
        new (title?: string): XUL;
        factory(props: string | Function | XML | URI): XUL;
        create(props: string | Function, accept?: Function, cancel?: Function, defaults?: Record<string, any>): Record<string, any> | null;
        templates: Record<string, XML>;

        // Properties
        xml: XML;
        controls: Record<string, XULControl>;
        settings: Record<string, any>;
        flashData: any;
        events: Record<string, any>;
        rules: Record<string, any>;
        columns: [number, number];
        error: string | null;
        id: number;
        content: string;
        separator: string;
        title: string;
        built: boolean;
        open: boolean;
        accepted: boolean;
        scope: any;

        // Accessors
        readonly values: Record<string, any> | null;

        // Control methods
        add(str: string): XUL;

        // Single controls
        addTextbox(label: string, id?: string | null, attributes?: Record<string, any>, validation?: any, events?: any): XUL;
        addSlider(label: string, id?: string | null, values?: any[] | number, attributes?: Record<string, any>, validation?: any, events?: any): XUL;
        addCheckbox(label: string, id?: string | null, attributes?: Record<string, any>, validation?: any): XUL;
        addColorchip(label: string, id?: string | null, attributes?: Record<string, any>, validation?: any, events?: any): XUL;
        addFile(label: string, id?: string | null, attributes?: Record<string, any>, validation?: any, events?: any): XUL;
        addExpression(label: string, id?: string | null, attributes?: Record<string, any>, validation?: any, events?: any): XUL;
        addButton(label: string, id?: string | null, attributes?: Record<string, any>, events?: any): XUL;

        // Multiple-value controls
        addListbox(label: string, id?: string | null, values?: any, attributes?: Record<string, any>, validation?: any, events?: any): XUL;
        addDropdown(label: string, id?: string | null, values?: any, attributes?: MenulistAttribute, validation?: any, events?: any): XUL;
        addMenuList(label: string, id?: string | null, values?: any, attributes?: MenulistAttribute, validation?: any, events?: any): XUL;
        addRadiogroup(label: string, id?: string | null, values?: any, attributes?: any): XUL;
        addCheckboxgroup(label: string, id?: string | null, values?: any, attributes?: Record<string, any>, validation?: any): XUL;
        addTargetlist(label: string, id?: string | null, attributes?: Record<string, any>, validation?: any, events?: any): XUL;
        addProperty(id: string): XUL;
        addXML(xml: XML | string, breakOutOfRows?: boolean, dontParse?: boolean): XUL;

        // Additional elements
        addSeparator(label?: string): XUL;
        addSpacer(): XUL;
        addLabel(label: string, id?: string | null): XUL;
        addScript(script: Function | string): XUL;

        // Custom controls
        setFlash(uriOrPath: string, width?: number, height?: number, data?: any, properties?: string[]): XUL;
        setFlashData(data: any): XUL;
        setXML(xml: XML | string): XUL;

        // Set methods
        setValues(values: Record<string, any> | XML): XUL;
        setValue(id: string, value: any): XUL;
        setProperties(props: Record<string, any>): XUL;
        setButtons(str: string): XUL;
        setColumns(columns: number[]): XUL;
        setWidth(value: number): XUL;
        setTitle(title: string): XUL;

        // Event handling
        addEvent(ids: string | string[], types: string | string[], callback: Function, scope?: any): XUL;
        addEvent(type: string, callback: Function): XUL;
        setEventScope(scope: any): XUL;
        handleEvent(type: string, id?: string): void;

        // Loading and showing
        load(pathOrURI: string | URI): XUL;
        saveAs(pathOrURI: string | URI): XUL;
        show(onAccept?: Function, onCancel?: Function): XUL;
        close(state?: boolean): void;

        // Utility
        toString(): string;
    }

    const XUL: XUL;
    export = XUL;
}

// Global xjsfl objects
declare namespace xjsfl {
    var uri: string;
    namespace ui {
        function show(xul: XUL): Record<string, any>;
        function handleEvent(xulid: string, type: string, id: string): void;
    }
}
