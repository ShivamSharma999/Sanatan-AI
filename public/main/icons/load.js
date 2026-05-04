import { defineElement, Element as Lord } from "./index.js";

// define "lord-icon" custom element with default properties
defineElement();

/**
 * ### Create a Lord Icon element
 * @param { {colors?: string, src?: string, state?: string, trigger?: string, loading?: string, target?: string, speed: "1" | "2" | "3" | 1 | 2 | 3, stroke: "1" | "2" | "3" | 1 | 2 | 3, icon?: string | any } } props
 * @returns { Element extends { animationContainer: Element | null; triggerInstance: any; playerInstance: any; readyPromise: Promise<boolean | undefined>; ready: boolean; speed: boolean } } 
 */
export default function LordIcon(props) {
    let elem = new Lord();
    const propNames = Object.keys(props);
    for (let i = 0; i < propNames.length; i++) {
        if (propNames[i] == "style" && typeof props[propNames[i]] === "object") {
            const propertyNames = Object.keys(props[propNames[i]]);
            propertyNames.forEach(prop => {
                elem.style[prop] = props[propNames[i]][prop];
            });
        }
        else elem.setAttribute(propNames[i], props[propNames[i]]);
    }
    return elem;
}