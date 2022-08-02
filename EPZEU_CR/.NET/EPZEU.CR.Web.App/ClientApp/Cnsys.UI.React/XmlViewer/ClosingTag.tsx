﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from "react";

let space = String.fromCharCode(160);
let doubleSpace = space + space;

export interface TagData {
    expand?: boolean;
    name: string;
    value?: string;
    attrs?: any;
    nodes: TagData[];
}

export interface ClosingTagProps {
    data: TagData;
}

export function ClosingTag(props: ClosingTagProps) {
    let tag = doubleSpace + "</" + props.data.name + ">";

    return props.data.nodes != null &&
        (<div className={props.data.expand != true ? "hidden" : ""}>
            <span className="xml-element"><li>{tag}</li></span>
        </div>);
}