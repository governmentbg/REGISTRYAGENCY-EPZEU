import { BaseRouteProps } from "Cnsys.UI.React";
import { observable, action, computed } from "mobx";

interface BreadcrumbNode {
    pathPattern: string;
    text: ((pathParams: any) => Promise<string>) | string;
    showMainNodeOnly?: boolean
    pathRegEx?: string
    pathParamsNames?: string[]
}

class Breadcrumb {
    @observable private breadcrumbNodes: BreadcrumbNode[] = [];
    rootItems: { path: string; text: string; isInternal: boolean }[] = []

    @computed get breadcrumbNodesCount(): number {
        return this.breadcrumbNodes.length;
    }

    @action addBreadcrumbNodes(nodes: BreadcrumbNode[]) {
        if (nodes) {
            for (var node of nodes) {
                this.breadcrumbNodes.push(node);
            }
        }
    }
       
    async getBreadcrumbItems(currentPath: string): Promise<{ path: string; text: string; showMainNodeOnly: boolean; isInternal: boolean }[]> {
        var nodes = this.getBreadcrumbNodes(currentPath);
        var breadcrumbItems: { path: string; text: string; textPromise: Promise<string>; showMainNodeOnly: boolean; isInternal: boolean }[] = [];

        if (nodes) {

            for (var node of nodes) {
                breadcrumbItems.push({
                    path: node.path,
                    text: null,
                    isInternal: true,
                    textPromise: typeof (node.text) == "string" ? Promise.resolve(node.text) : node.text(node.pathParams),
                    showMainNodeOnly: node.showMainNodeOnly
                })
            }

            for (var breadcrumbItem of breadcrumbItems) {
                breadcrumbItem.text = await breadcrumbItem.textPromise;
            }

            for (var i = this.rootItems.length - 1; i >= 0; i--) {
                breadcrumbItems.push({
                    path: this.rootItems[i].path,
                    text: this.rootItems[i].text,
                    isInternal: this.rootItems[i].isInternal,
                    textPromise: null,
                    showMainNodeOnly: null
                })
            }
        }

        return breadcrumbItems;
    }

    private getBreadcrumbNodes(path: string, nodes?: { path: string; pathPattern: string; text: ((routeParams: any) => Promise<string>) | string, showMainNodeOnly?: boolean, pathParams: any }[]): { path: string; pathPattern: string; text: ((routeParams: any) => Promise<string>) | string, showMainNodeOnly?: boolean, pathParams: any }[] {
        if (!nodes) {
            nodes = [];
        }

        for (var node of this.breadcrumbNodes) {

            if (!node.pathRegEx) {
                var dynamicParams = node.pathPattern.match(/\/:[^/]*/gi);

                if (dynamicParams && dynamicParams.length > 0) {
                    node.pathRegEx = node.pathPattern;
                    node.pathParamsNames = [];

                    for (var dynamicParam of dynamicParams) {
                        if (dynamicParam.indexOf("?") > 0) {
                            node.pathRegEx = node.pathRegEx.replace(dynamicParam, "(/[^/]*)?")
                        }
                        else {
                            node.pathRegEx = node.pathRegEx.replace(dynamicParam, "(/[^/]*)")
                        }

                        node.pathParamsNames.push(dynamicParam.substr(2).replace("?", ""));
                    }
                }
                else {
                    node.pathRegEx = node.pathPattern;
                }
            }

            var regex = new RegExp(node.pathRegEx, 'i');
            var phMatch = path.match(regex);

            if (phMatch && phMatch[0] == path) {
                if (nodes.filter(n => n.pathPattern == node.pathPattern).length == 0) {
                    var pathParams: any = null;
                    if (phMatch.length > 1) {
                        pathParams = {};

                        for (var i = 1; i < phMatch.length; i++) {
                            if (phMatch[i] && phMatch[i].replace("/", "").trim().length > 0) {
                                pathParams[node.pathParamsNames[i - 1]] = phMatch[i].replace("/", "").trim();
                            }
                        }
                    }

                    nodes.push({
                        path: path,
                        pathPattern: node.pathPattern,
                        showMainNodeOnly: node.showMainNodeOnly,
                        text: node.text,
                        pathParams: pathParams
                    });
                }
                break;
            }
        }

        path = path.substr(0, path.lastIndexOf("/"));

        if (path.length > 0) {
            return this.getBreadcrumbNodes(path, nodes);
        }

        return nodes.length == 0 ? null : nodes;
    }
}

export const breadcrumb = new Breadcrumb();