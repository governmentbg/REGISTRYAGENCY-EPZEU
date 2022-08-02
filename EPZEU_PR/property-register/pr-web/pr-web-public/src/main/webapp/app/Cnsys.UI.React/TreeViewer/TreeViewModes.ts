import { TypeSystem, moduleContext } from 'Cnsys.Core';

export enum TreeViewModes {
    DisplayTree = 0,
    MultiSelectTree = 1,
    SingleSelectTree = 2,
}
TypeSystem.registerEnumInfo(TreeViewModes, 'TreeViewModes', moduleContext.moduleName);