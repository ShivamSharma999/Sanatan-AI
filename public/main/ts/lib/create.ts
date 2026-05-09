export function evListener(evs: string, to: EventTarget, func: (e: any) => void): void {
  try {
    const events = evs.split(',');
    events.forEach(ev => to.addEventListener(ev, func));
  }
  catch (e) {
    console.log(e)
  }
}

/**
 * ## Create HTML elements in javascript
 * Works some as `document.createElement` but in a shorter and efficient way.
 * 
 * Example:
 * 
 * ```javascript
 * // No.1 - using the classic document.createElement method
 * const div = document.createElement("div");
 * div.className = "mydiv";
 * div.hidden = "true";
 * div.appendChild(document.createElement("p"));
 * div.addEventListener("click", myFn);
 * div.addEventListener("mousemove", myFn2);
 * divParent.appendChild(div);
 * 
 * // No.2 - using the modern Create function
 * const div = Create("div.mydiv", {hidden: true}, Create("p"), [["click", myFn],["mousemove", myFn2]], divParent) // Does same as all work done above
 * ```
 * @param query - The name of selector e.g. `div.main` or `a#hero`
 * @param props - The list of properties to be applied to element
 * @param childs - Child Nodes or text in element
 * @param ev - An array of eventListeners to the element, It could be in format `[eventName, listener]` or `[[event1name, listener1], [event2name, listener2]..]`
 * @param parentElement - The parent Element of current node, will be used as `parentElement.appendChild(element)`
 * @returns The element made
 */
export default function Create<K extends keyof HTMLElementTagNameMap, X extends [string, (e: Event) => void]>(query: K | string,
    props: any = {},
    childs: string | Element | Array<Element> = "",
    ev?: X | X[],
    parentElement?: HTMLElement
): HTMLElementTagNameMap[K] {
    let [elem, classes, id] = _Create(query)
    let element = document.createElement(elem);

    // Support text node
    if (childs instanceof Element) element.appendChild(childs);
    else if (childs instanceof Array) {
        childs.forEach(child => {
        if (typeof child === 'string') element.appendChild(document.createTextNode(child));
        else element.appendChild(child);
    })}
    else if (typeof childs === "string") {
        if (childs.includes("<")) element.innerHTML = childs;
        else element.textContent = childs;
    }
    

    classes.forEach(c => element.classList.add(c));
    if (id) element.id = id;

    const propNames = Object.keys(props);
    for (let i = 0; i < propNames.length; i++) {
        if (propNames[i] == "style" && typeof props[propNames[i]] === "object") {
            const propertyNames = Object.keys(props[propNames[i]]);
            propertyNames.forEach(prop => {
                element.style[prop] = props[propNames[i]][prop];
            });
        }
        else element.setAttribute(propNames[i], props[propNames[i]]);
    }
    if (ev && ev.length === 2 && typeof ev[0] != "object") {
        evListener(ev[0], element, (ev as [string, (e: Event) => void])[1]);
    }
    else if (ev && typeof ev[0] == "object") {
        ev.forEach(event => {
            evListener(event[0], element, event[1]);
        })
    } else if(ev && !(ev.length == 0)) console.error("Please use a valid format for adding event listeners");

    if (parentElement) {
        parentElement.appendChild(element)
    }
    return (element as HTMLElementTagNameMap[K]);
}


function _Create(name: string): [string, string[], string] {
    let nameReg = /(.+?)[#.]/,
        classReg = /\.([^#.]+)/,
        idReg = /\#([^#.]+)/,
        isCheck = /[#.]/,
        classes = [],
        ids = [],
        elem = "",
        stte = name;

    if (name.match(isCheck)) {
        elem = stte.match(nameReg)[1];
        stte.replace(elem, '');
        while (stte.match(classReg)) {
            const clas = stte.match(classReg)[1];
            classes.push(clas);
            stte = stte.replace('.' + clas, '');
        }
        while (stte.match(idReg)) {
            const id = stte.match(idReg)[1];
            ids.push(id);
            stte = stte.replace('#' + id, '');
        }
        return [elem, [...classes], ids.join(" ")]
    }
    else return [name, [], ""]
}

