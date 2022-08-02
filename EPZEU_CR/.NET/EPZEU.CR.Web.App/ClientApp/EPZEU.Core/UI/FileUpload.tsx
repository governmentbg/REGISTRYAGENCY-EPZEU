import { appConfig, authenticationService, ObjectHelper, UrlHelper } from "Cnsys.Core";
import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { moduleContext } from '../';

interface FileUploadProps {
    onUploaded?: (fileInfo: any, response: any, dropzone: Dropzone) => void,
    onError?: (error: any, file: Dropzone.DropzoneFile) => void,
    instantUpload?: boolean,
    uploadURL: string,
    onAddedFile?: (file: any, dropzone: Dropzone) => void,
    onRemovedfile?: any,
    allowUpload: boolean,
    acceptedFiles: string,
    maxFilesize: number,
    params: any,
    dictInvalidFileType: string,
    dictDefaultMessage: string,
    dictFileTooBig: string,
    dictRemoveFile: string,
    dictMaxFilesExceeded: string,
    selectFileText: string,
    addFileText: string,
    showUploadedFilesPreview: boolean,
    isEnabled: boolean,
    timeout?: number,
    idOfParentOfLoadingUI?: string,
    accepts?: any
}

@observer export class FileUpload extends React.Component<FileUploadProps, {}>{
    private myDropzone: Dropzone;
    private dropzoneId: string;
    @observable private isDropZoneLoaded: boolean;
    @observable private showLoadingUI: boolean;
    @observable private bearerToken: any;

    constructor(props?: any, context?: any) {
        super(props, context);

        authenticationService.GetUserAccessToken().bind(this).then(token => {
            this.bearerToken = token;
        });

        this.dropzoneId = ObjectHelper.newGuid();
        this.isDropZoneLoaded = false;
    }

    componentDidMount() {
        let that = this;

        import(/* webpackChunkName: "dropzone" */ 'dropzone').then((Dropzone) => {
            runInAction(() => {
                let options: Dropzone.DropzoneOptions = {
                    url: UrlHelper.generateContentUrl(that.props.uploadURL),
                    //method:"default is POST"
                    maxFilesize: this.props.maxFilesize, //in MB
                    filesizeBase: 1024,
                    //uploadMultiple:"boolean",
                    //previewsContainer:"HTMLElement or a CSS selector",
                    acceptedFiles: this.props.acceptedFiles,
                    maxFiles: 1,
                    timeout: that.props.timeout ? that.props.timeout : 1000000,
                    addRemoveLinks: true,
                    autoProcessQueue: false, // if hat.props.instantUpload is true, we call processQueue in the addedfile method AFTER we get token (it may have expired!)
                    previewsContainer: "#preview-file",
                    previewTemplate: document.querySelector("#preview-template").innerHTML,
                    dictInvalidFileType: moduleContext.resourceManager.getResourceByKey(that.props.dictInvalidFileType).replace('{FILE_FORMATS}', appConfig.acceptedFileExt),
                    dictDefaultMessage: moduleContext.resourceManager.getResourceByKey(that.props.dictDefaultMessage),
                    dictFileTooBig: moduleContext.resourceManager.getResourceByKey(that.props.dictFileTooBig),
                    dictRemoveFile: '',//moduleContext.resourceManager.getResourceByKey(this.props.dictRemoveFile),
                    dictCancelUpload: '',
                    params: that.getDropzoneParams(),
                    dictMaxFilesExceeded: moduleContext.resourceManager.getResourceByKey(that.props.dictMaxFilesExceeded),
                    headers: {
                        'Content-Type': undefined,
                        'encType': 'multipart/form-data',
                        'Authorization': that.bearerToken ? "Bearer " + that.bearerToken : null
                    },
                    accept: this.props.accepts
                }

                that.myDropzone = new (Dropzone as any).default(document.getElementById('my-dropzone' + that.dropzoneId), options)
                that.isDropZoneLoaded = true;

                let parentLoadingDiv = ObjectHelper.isStringNullOrEmpty(that.props.idOfParentOfLoadingUI) ? undefined : document.getElementById(that.props.idOfParentOfLoadingUI);

                //#region Events

                that.myDropzone.on("queuecomplete", function () {
                    //that.removeAllFiles();
                });

                that.myDropzone.on("maxfilesexceeded", function (file: any) {
                    this.removeAllFiles();
                    this.addFile(file);
                })

                that.myDropzone.on("error", function (file: Dropzone.DropzoneFile, message: string | Error, xhr: XMLHttpRequest) {
                    that.showLoadingUI = false;
                    if (parentLoadingDiv) {
                        parentLoadingDiv.setAttribute('class', 'loader-overlay-local');
                    }

                    if (xhr && (xhr.status == 403)) {
                        message = moduleContext.resourceManager.getResourceByKey('GL_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_E').replace('{FILE_FORMATS}', appConfig.acceptedFileExt);
                    }

                    that.props.onError && that.props.onError(message, file);
                    this.removeAllFiles();
                })

                that.myDropzone.on("addedfile", function (file: any) {
                    that.showLoadingUI = true;

                    if (parentLoadingDiv) {
                        parentLoadingDiv.setAttribute('class', 'loader-overlay-local load');
                    }

                    // TODO да се види това дали да не се взима от appParameter
                    //ако до 20 минути не се качи файла, прекъсваме качването
                    Promise.delay(1200000).then(() => {
                        if (that.showLoadingUI) {
                            that.showLoadingUI = false;
                            if (parentLoadingDiv) {
                                parentLoadingDiv.setAttribute('class', 'loader-overlay-local');
                            }
                            that.myDropzone.removeAllFiles(true);
                        }
                    });

                    if (that.props.onAddedFile) {
                        that.props.onAddedFile(file, this.myDropzone);
                    }

                    if (that.props.instantUpload) {
                        authenticationService.GetUserAccessToken().bind(this).then(token => {
                            that.bearerToken = token;
                            (that.myDropzone as any).options.headers = {
                                'Content-Type': undefined,
                                'encType': 'multipart/form-data',
                                'Authorization': that.bearerToken ? "Bearer " + that.bearerToken : null
                            };
                            that.myDropzone.processQueue();
                        });
                    }
                })

                that.myDropzone.on("removedfile", (file: Dropzone.DropzoneFile) => {
                })

                that.myDropzone.on("success", (file: any, response: any) => {
                    that.showLoadingUI = false;

                    if (parentLoadingDiv) {
                        parentLoadingDiv.setAttribute('class', 'loader-overlay-local');
                    }

                    that.props.onUploaded(file, response, this.myDropzone);
                })

                this.myDropzone.on("canceled", (file: any) => {
                    that.showLoadingUI = false;

                    if (parentLoadingDiv) {
                        parentLoadingDiv.setAttribute('class', 'loader-overlay-local');
                    }
                })

                if (!that.props.isEnabled)
                    that.myDropzone.disable();

                //#endregion Events
            });
        });
    }

    componentDidUpdate(prevProps: FileUploadProps, prevState: any, snapshot: any): void {
        if (this.isDropZoneLoaded) {
            if (this.props.isEnabled) {
                this.myDropzone.enable();
            } else {
                this.myDropzone.disable();
            }

            (this.myDropzone as any).options.headers = {
                'Content-Type': undefined,
                'encType': 'multipart/form-data',
                'Authorization': this.bearerToken ? "Bearer " + this.bearerToken : null
            };

            (this.myDropzone as any).options.url = UrlHelper.generateContentUrl(this.props.uploadURL);
            (this.myDropzone as any).options.params = this.getDropzoneParams();
        }
    }

    componentWillUnmount() {
        if (this.isDropZoneLoaded) {
            this.myDropzone.destroy();
        }
    }

    render() {
        return (
            <>
                <div className={this.showLoadingUI && ObjectHelper.isStringNullOrEmpty(this.props.idOfParentOfLoadingUI) ? "loader-overlay-local load" : ""}>
                    <div className="custom-file-button btn btn-outline-light text-dark">
                        <i className="ui-icon ui-icon-upload-color mr-1" aria-hidden="true"></i>{moduleContext.resourceManager.getResourceByKey(this.props.selectFileText)}
                        <span className="custom-file-input" id={"my-dropzone" + this.dropzoneId}></span>
                    </div>
                    <span id="preview-file">
                    </span>
                    <span id="preview-template" style={{ display: "none" }}>
                        <span>
                            <span data-dz-name style={!this.props.showUploadedFilesPreview && { display: "none" }}></span>&nbsp;
                        <span className="dz-size" data-dz-size style={!this.props.showUploadedFilesPreview && { display: "none" }}></span>
                            <span className='pdf-pages' style={!this.props.showUploadedFilesPreview && { display: "none" }}></span>
                            {/*<span className="dz-error-message text-danger"><span data-dz-errormessage></span></span>*/}
                        </span>
                        <span data-dz-remove></span>
                    </span>

                    {this.props.instantUpload ? null : <div className="row col-12"><button className="btn btn-default" id="add-file-btn" onClick={this.handleClick.bind(this)}>{moduleContext.resourceManager.getResourceByKey(this.props.addFileText)}</button></div>}
                </div>
            </>);
    }

    private handleClick(e: Event) {
        e.preventDefault();

        if (this.props.instantUpload == false && this.props.allowUpload) {
            authenticationService.GetUserAccessToken().bind(this).then(token => {
                this.bearerToken = token;
                (this.myDropzone as any).options.headers = {
                    'Content-Type': undefined,
                    'encType': 'multipart/form-data',
                    'Authorization': this.bearerToken ? "Bearer " + this.bearerToken : null
                };
                this.myDropzone.processQueue();
            });
        }
    }

    /** Ако в multipart/form-data някое поле е null или undefined при десерилизацията му в string се десерилизира като "null" или "undefined" */
    getDropzoneParams(): any {
        var params = JSON.parse(JSON.stringify(this.props.params));
        var result: any = {};

        for (var propName in params) {
            if (params[propName]) {
                result[propName] = params[propName];
            }
        }

        return result;
    }
}
