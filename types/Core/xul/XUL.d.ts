// 定义依赖模块的类型

// @ts-ignore
class DialogBuilder {
    templates: { [key: string]: string };

    build(title: string, content: string, columns: number[]): string;
}

class ControlManager {
    controls: { [id: string]: Control };

    getControl(id: string): Control | undefined;

    addControl(control: Control): void;

    updateControl(control: Control): void;
}

interface Control {
    id: string;
    type: string;
    label: string;
    attributes?: { [key: string]: any };
    items?: any[];
    xml: string;
    xul: XUL;
}


class ControlFactory {
    static create(
        type: string,
        id: string,
        label: string,
        xul: XUL,
        xml: string,
        attributes?: { [key: string]: any },
        items?: any[]
    ): Control;
}

class EventManager {
    constructor(xul: XUL);

    EventType: typeof EventType;

    add(eventType: EventType, controlId: string, handler: (event: any, data: any) => void): void;

    trigger(eventType: EventType, controlId: string, data: any): void;
}

enum EventType {
    CREATE = "create",
    CHANGE = "change",
    COMMAND = "command"
}


class Config {
    static parser: any;
    static builder: any;
    static domParser: any;
    static serializer: any;
}

//     <textbox className="control" id="textbox" value="" maxlength="" prompt="" size="" multiline="false" width=""
interface TextboxAttr {
    value: string;
    maxlength: number;
    prompt: string;
    size: number;
    multiline: boolean;
    width: number;
}

//     <colorchip class="control" id="colorchip" color="" format="hex" width="100" />
interface ColorchipAttr {
    color: string;
    format: string;
    width: number;
}

//     <popupslider className="control" id="popupslider" value="" minvalue="0" maxvalue="100" orientation="horz"
//                  tabindex="" width="60" flex=""/>
interface PopupsliderAttr {
    value: number;
    minvalue: number;
    maxvalue: number;
    orientation: string;
    tabindex: number;
    width: number;
    flex: number;
}

//     <checkbox className="control" id="checkbox" label="Checkbox" checked="true" tabindex="" acceskey=""/>
interface CheckboxAttr {
    label: string;
    checked: boolean;
    tabindex: number;
    accesskey: string;
}

//     <button class="control" id="button" label="Button" width="" flex="1" tabindex="" acceskey="" oncommand="" />
interface ButtonAttr {
    label: string;
    width: number;
    flex: number;
    tabindex: number;
    accesskey: string;
    oncommand: string;
}

//     <targetlist id="targetlist" class="" width="300" height="" flex="1" pathtype="absolute" />
interface TargetlistAttr {
    width: number;
    height: number;
    flex: number;
    pathtype: string;
}

//     <choosefile id="choosefile" literal="false" pathtype="" required="" size="" type="" width="" flex="1" tabindex="" />
interface ChoosefileAttr {
    literal: boolean;
    pathtype: string;
    required: boolean;
    size: number;
    type: string;
    width: number;
    flex: number;
    tabindex: number;
}

//     <listbox class="control" id="listbox" width="" flex="1" rows="6" tabindex="">
interface ListboxAttr {
    width: number;
    flex: number;
    rows: number;
    tabindex: number;
}

//         <listitem label="Item 1" value="1" selected="" />
interface ListitemAttr {
    label: string;
    value: string;
    selected: boolean;
}

//     <menulist className="control" id="menulist" editable="" width="" flex="1" tabindex="" oncreate="" onsetfocus="">
interface MenulistAttr {
    editable: boolean;
    width: number;
    flex: number;
    tabindex: number;
    oncreate: string;
    onsetfocus: string;
}

//             <menuitem label="Item 1" value="1" selected=""/>
interface MenuitemAttr {
    label: string;
    value: string;
    selected: boolean;
}

//     <radiogroup className="control" id="radiogroup" tabindex="" groupbox="true">
interface RadiogroupAttr {
    tabindex: number;
    groupbox: boolean;
}

//         <radio label="Radio 1" selected="" value="1" acceskey=""/>
interface RadioAttr {
    label: string;
    selected: boolean;
    value: string;
    accesskey: string;
}

//     <vbox className="control" groupbox="true">
interface CheckboxGroupAttr {
    groupbox: boolean;
}

//         <checkbox className="control" id="checkbox[0]" label="Checkbox 1" checked="true" tabindex="" acceskey=""/>
interface CheckboxGroupItemAttr {
    label: string;
    checked: boolean;
    tabindex: number;
    accesskey: string;
}

//     <flash className="control" id="flash" src="assets/flash.swf" width="250" height="100"/>
interface FlashAttr {
    src: string;
    width: number;
    height: number;
}

interface XULAttr {
    name: string;
    params: string[]
}

// XUL 类的类型定义
export class XUL {
    constructor(title?: string);

    parser: any;
    builder: any;
    domParser: any;
    serializer: any;

    dialogBuilder: DialogBuilder;
    controlManager: ControlManager;
    eventManager: EventManager;

    settings: { [key: string]: any };
    columns: number[];
    title: string;
    templates: { [key: string]: string };

    updateControl(id: string, label: string, attributes?: { [key: string]: any }, items?: any[]): XUL;

    addLabel(label: string, id: string): XUL;

    addTextbox(label: string, id: string, attributes?: TextboxAttr): XUL;

    addColorchip(label: string, id: string, attributes?: ColorchipAttr): XUL;

    addPopupSlider(label: string, id: string, attributes?: PopupsliderAttr): XUL;

    addCheckbox(label: string, id: string, attributes?: CheckboxAttr): XUL;

    addButton(label: string, id: string, attributes?: ButtonAttr): XUL;

    addTargetList(label: string, id: string, attributes?: TargetlistAttr): XUL;

    addChooseFile(label: string, id: string, attributes?: ChoosefileAttr): XUL;

    addListbox(label: string, id: string, attributes?: ListboxAttr, items?: ListitemAttr[]): XUL;

    addMenuList(label: string, id: string, attributes?: MenulistAttr, items?: MenuitemAttr[]): XUL;

    addRadioGroup(label: string, id: string, attributes?: RadiogroupAttr, items?: RadioAttr[]): XUL;

    addCheckboxGroup(label: string, id: string, attributes?: CheckboxGroupAttr, items?: CheckboxGroupItemAttr[]): XUL;

    addSeparator(id: string): XUL;

    addSpacer(id: string): XUL;

    addProperty(id: string): XUL;

    addScript(id: string, content: string): XUL;

    addFlash(id: string, attributes?: FlashAttr): XUL;

    get xml(): string;

    static factory(props: XULAttr): XUL;

    addEvent(eventType: string, controlId: string, handler: (event: any, data: any) => void): XUL;
}
