// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from "react";
import { TagData } from './ClosingTag';

let space = String.fromCharCode(160);
let doubleSpace = space + space;

export interface OpeningTagProps {
    data: TagData;
}

export function OpeningTag(props: OpeningTagProps) {
    var data = props.data;
    var icon = doubleSpace;
    if (data.nodes) {
        icon = data.expand && data.expand === true ? "- " : "+ ";
    }

    var backSlush = data.value || data.nodes ? "" : "/";
    var closingTag = data.value ? "</" + data.name + ">" : "";
    var attributes = "";

    if (data.attrs) {
        for (let key in data.attrs) {
            attributes += ' ' + key + '="' + data.attrs[key] + '"';
        }
    }

    return (
        <li>
            {icon}<span className="xml-element">{'<' + data.name}<span className="xml-attribute">{attributes}</span>{backSlush + '>'}</span>{data.value ? data.value : null}<span className="xml-element">{closingTag}</span>
        </li>);
}