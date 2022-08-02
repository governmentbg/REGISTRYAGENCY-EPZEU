import * as React from 'react';
import { action, observable } from "mobx";
import { observer } from 'mobx-react';
import {
  EPZEUBaseComponent,
  Button,
  ValidationSummaryErrors,
  attributesClassFormControlMaxL4,
  attributesClassFormControl, AutoComplete
} from 'EPZEU.Core';
import { ObjectHelper, SelectListItem, UIHelper } from "Cnsys.Core";
import {NomenclaturesPR, RegistryOffice } from "EPZEU.PR.Core";
import { ApplicationInfoUI, Document, DocumentsForReportDataService, SearchDocumentsForReport } from "EPZEU.PR.ApplicationBase";
import { SearchDocumentsForReportValidator } from "../Models/Validators/SearchDocumentsForReportValidator";
import { SubjectFromReportTableUI } from "./SubjectFromReportTableUI";
import { AsyncUIProps, BaseProps, withAsyncFrame } from "Cnsys.UI.React";

interface SearchDocumentsForReportUIProps extends AsyncUIProps, BaseProps {
  totalSubjectsOfReportCount?: number;
}

@observer export class SearchDocumentsForReportUIImpl extends EPZEUBaseComponent<SearchDocumentsForReportUIProps, SearchDocumentsForReport> {

  @observable private registryOffices: RegistryOffice[];
  @observable private books: SelectListItem[];
  private _service: DocumentsForReportDataService;
  @observable private documents: Document[];
  private documentFromReport: Document;
  @observable open: boolean;
  @observable showResults: boolean;
  @observable reRender: boolean;
  private groupName: string;
  private resultsTableRef;

  constructor(props?: any) {
    super(props);

    this.model.clearErrors();
    this._service = new DocumentsForReportDataService();
    this.documents = [];
    this.documentFromReport = new Document();
    this.model.items = [];
    this.groupName = ObjectHelper.newGuid();
    this.resultsTableRef = React.createRef();

    this.getBooks = this.getBooks.bind(this);
    this.getRegistryOffices = this.getRegistryOffices.bind(this);
    this.handleBookSelectOption = this.handleBookSelectOption.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);

    this.selectRegistryOffice = this.selectRegistryOffice.bind(this);
    this.clearRegistryOfficeData = this.clearRegistryOfficeData.bind(this);
    this.handleRegistryOfficeSelectOption = this.handleRegistryOfficeSelectOption.bind(this);
    this.showResults = false;

    this.getBooks();
    this.getRegistryOffices();
    this.clear(true);
    this.model.bookForm = true;
    this.model.incomingRegistry = false;
    this.model.doubleIncomingRegistry = false;
  }

  componentDidMount(): void {
    UIHelper.enableElement('book');
    UIHelper.disableElement('incomingRegistry');
    UIHelper.disableElement('doubleIncomingRegistry');
  }

  private getBooks(): void {
    this.books = new Array<SelectListItem>();
    this.props.registerAsyncOperation(NomenclaturesPR.getBooks().then(books => {
      books.map(book => {
        this.books.push(new SelectListItem({
          selected: false,
          text: book.name,
          value: book.id
        }))
      })
    }));
  }

  private getRegistryOffices(): void {
    this.registryOffices = new Array<RegistryOffice>();
    this.props.registerAsyncOperation(NomenclaturesPR.getRegistryOffice().then(registryOffices => {
      registryOffices.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      this.registryOffices = registryOffices;
    }));
  }

  private toggle() {
    $('#collapsable-content').slideToggle();
  }

  renderEdit(): JSX.Element {
    let reRender = this.reRender;
    return (
      <>

        <div className="card card--search">
          <div className={"card-header"} onClick={this.toggle.bind(this)}>
            <h3>{this.getResource("PR_SEARCH_FOR_DOCUMENT_L")}
              <button className="system-button toggle-collapse">
                <i className="ui-icon ui-icon-chevron-up" aria-hidden="true"></i>
              </button>
            </h3>
          </div>
          <div id="collapsable-content" className={"collapse show"}>
            <div className="card-body">
              <ValidationSummaryErrors errors={this.model.getModelErrors()} />
              <ApplicationInfoUI infoTextKey={"PR_APP_00081_I"} />
              <div className="field-container">
                <div className="row">
                  <div className="form-group col-md-6 col-xl-4">
                    {this.labelFor(m => m.registryOfficeId, 'PR_REGISTRATION_OFFICE_L')}
                    <AutoComplete {...this.bind(m => m.registryOfficeName)}
                                  handleChangeCallback={this.clearRegistryOfficeData}
                                  selector={this.selectRegistryOffice}
                                  showValue={this.showRegistryOfficeValue}
                                  hasSelectedValue={this.model.registryOfficeName && this.model.registryOfficeId  && ObjectHelper.isNumber(this.model.registryOfficeId)}
                                  handleSelectCallback={this.handleRegistryOfficeSelectOption}
                                  triggerLength={0}
                                  attributes={attributesClassFormControl}
                    />
                  </div>
                </div>
                <hr className="hr--report"></hr>
                <div className="row no-gutters">
                  <div className="col-auto">
                    <div className="custom-control custom-radio">
                      <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_book'} name={this.groupName} value={'book'} checked={this.model.bookForm} />
                      <label className={"custom-control-label"} htmlFor={this.groupName + '_book'}></label>
                    </div>
                  </div>
                  <div className="col">
                    <div id='book'>
                      <div className="row">
                        <div className="form-group col-md-6 col-xl-4">
                          {this.labelFor(m => m.actNumber, 'PR_APP_ACT_NUMBER_L')}
                          {this.textBoxFor(m => m.actNumber, attributesClassFormControl)}
                        </div>
                        <div className="form-group col-6 col-md-3 col-xl-1">
                          {this.labelFor(m => m.volume, 'PR_APP_VOLUME_L')}
                          {this.textBoxFor(m => m.volume, attributesClassFormControl)}
                        </div>
                        <div className="form-group col-6 col-md-3 col-xl-1">
                          {this.labelFor(m => m.year, 'GL_YEAR_L')}
                          {this.textBoxFor(m => m.year, attributesClassFormControlMaxL4)}
                        </div>
                        <div className="form-group col-sm-6 col-md-6 col-xl-3">
                          {this.labelFor(m => m.book, 'PR_APP_BOOK_L')}
                          {this.dropDownListFor(m => m.book, this.books, attributesClassFormControl, this.handleBookSelectOption, true, this.getResource('GL_CHOICE_L'))}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <hr className="hr--report"></hr>
                <div className="row no-gutters">
                  <div className="col-auto">
                    <div className="custom-control custom-radio">
                      <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_incomingRegistry'} name={this.groupName} value={'incomingRegistry'} checked={this.model.incomingRegistry} />
                      <label className={"custom-control-label"} htmlFor={this.groupName + '_incomingRegistry'}></label>
                    </div>
                  </div>
                  <div className="col">
                    <div id='incomingRegistry'>
                      <div className="row">
                        <div className="form-group col-sm-6 col-xl-4">
                          {this.labelFor(m => m.numberIncomingRegistry, 'PR_APP_00038_L')}
                          {this.textBoxFor(m => m.numberIncomingRegistry, attributesClassFormControl)}
                        </div>
                        <div className="form-group col-sm-6 col-md-3">
                          {this.labelFor(m => m.dateIncomingRegistry, 'GL_DATE_L')}
                          {this.dateFor(m => m.dateIncomingRegistry)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="hr--report"></hr>
                <div className="row no-gutters">
                  <div className="col-auto">
                    <div className="custom-control custom-radio">
                      <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_doubleIncomingRegistry'} name={this.groupName} value={'doubleIncomingRegistry'} checked={this.model.doubleIncomingRegistry} />
                      <label className={"custom-control-label"} htmlFor={this.groupName + '_doubleIncomingRegistry'}></label>
                    </div>
                  </div>
                  <div className="col">
                    <div id='doubleIncomingRegistry'>
                      <div className="row">
                        <div className="form-group col-md-6 col-xl-4">
                          {this.labelFor(m => m.numberDoubleIncomingRegistry, 'PR_APP_00017_L')}
                          {this.textBoxFor(m => m.numberDoubleIncomingRegistry, attributesClassFormControl)}
                        </div>
                        <div className="form-group col-6 col-md-3 col-xl-1">
                          {this.labelFor(m => m.yearDoubleIncomingRegistry, 'GL_YEAR_L')}
                          {this.textBoxFor(m => m.yearDoubleIncomingRegistry, attributesClassFormControlMaxL4)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="button-bar butt">
                <div className="left-side">
                  <Button type="button" className="btn btn-secondary"
                    lableTextKey="GL_CLEAR_L" onClick={() => this.clear(true)}>
                  </Button>
                </div>
                <div className="right-side">
                  <Button type="submit" className="btn btn-primary"
                    lableTextKey="GL_SEARCH_L" onClick={this.search}>
                    <i className="ui-icon ui-icon-search ci-btn mr-1"></i>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {this.showResults
          ?
          <div className="card card--borderless">
            <SubjectFromReportTableUI {...this.bind(this.model, "documentFromReport")}
              results={this.documents}
              label={"PR_APP_DOCUMENT_DATA_L"}
              totalSubjectsOfReportCount={this.props.totalSubjectsOfReportCount}
              ref={this.resultsTableRef}
            ></SubjectFromReportTableUI>
          </div>
          :
          null
        }
      </>)
  }

  @action handleBookSelectOption(e: any) {
    var value = e.target.value;
  }

  @action
  private clear(clearRegistryOfficeId: boolean): void {
    if (clearRegistryOfficeId) {
      this.model.registryOfficeId = null;
      this.model.registryOfficeName = null;
    }
    this.model.numberDoubleIncomingRegistry = null;
    this.model.book = null;
    this.model.actNumber = null;
    this.model.year = null;
    this.model.yearDoubleIncomingRegistry = null;
    this.model.volume = null;
    this.model.numberIncomingRegistry = null;
    this.model.dateIncomingRegistry = null;
    this.model.clearErrors();
  }

  @action
  private search(): void {
    this.model.items = [];
    this.showResults = false;
    this.documents = [];
    let criteriaValidator = new SearchDocumentsForReportValidator();

    //TODO: Този ререндър ми изглежда безасмислен да се провери без него дали ще работи коректно
    this.reRender = !this.reRender;
    if (criteriaValidator.validate(this.model)) {
      this.prepareModelForRequest();
      this.props.registerAsyncOperation(this._service.searchDocumentsForReport(this.model).then((documents) => {

        let promiseArray = [];
        documents.map((document, idx) => {
          promiseArray.push(NomenclaturesPR.getRegistryOffice().then(registryOffice => {
            let registryOfficeFiltered = registryOffice.filter(filteredRegistryOffice => document.registryOffice.id == filteredRegistryOffice.id)[0];
            if (registryOfficeFiltered) {
              documents[idx].registryOffice = registryOfficeFiltered;
            }
          }));

          promiseArray.push(NomenclaturesPR.getBooks().then(book => {
            let bookFiltered = book.filter(filteredBook => document.book.id == filteredBook.id)[0];
            if (bookFiltered) {
              documents[idx].book = bookFiltered;
            }
          }))
        });
        Promise.all(promiseArray).then(() => {
          this.documents = documents;
          this.showResults = true;

          if (this.resultsTableRef.current) {
            //Reset the initial page from previous searches
            this.resultsTableRef.current.goToFirstPage();
          }
        })
      }));
    } else {
      this.showResults = false;
      this.documents = [];
    }
  }


  private prepareModelForRequest() {
    if (this.model.bookForm) {
      this.model.dateIncomingRegistry = null;
      this.model.numberIncomingRegistry = null;

      this.model.numberDoubleIncomingRegistry = null;
      this.model.yearDoubleIncomingRegistry = null;
    } else if (this.model.incomingRegistry) {
      this.model.book = null;
      this.model.actNumber = null;
      this.model.volume = null;
      this.model.year = null;

      this.model.numberDoubleIncomingRegistry = null;
      this.model.yearDoubleIncomingRegistry = null;

    } else if (this.model.doubleIncomingRegistry) {
      this.model.book = null;
      this.model.actNumber = null;
      this.model.volume = null;
      this.model.year = null;

      this.model.dateIncomingRegistry = null;
      this.model.numberIncomingRegistry = null;
    }
  }

  @action private handleChange(e: any) {
    if (e.target.value == 'book') {
      this.model.bookForm = true;
      this.model.doubleIncomingRegistry = false;
      this.model.incomingRegistry = false;
      UIHelper.enableElement('book');
      UIHelper.disableElement('incomingRegistry');
      UIHelper.disableElement('doubleIncomingRegistry');
    } else if (e.target.value == 'doubleIncomingRegistry') {
      this.model.bookForm = false;
      this.model.doubleIncomingRegistry = true;
      this.model.incomingRegistry = false;
      UIHelper.disableElement('book');
      UIHelper.disableElement('incomingRegistry');
      UIHelper.enableElement('doubleIncomingRegistry');
    } else if (e.target.value == 'incomingRegistry') {
      this.model.bookForm = false;
      this.model.doubleIncomingRegistry = false;
      this.model.incomingRegistry = true;
      UIHelper.disableElement('book');
      UIHelper.enableElement('incomingRegistry');
      UIHelper.disableElement('doubleIncomingRegistry');
    }
    this.clear(false);
  }

  showRegistryOfficeValue(value: RegistryOffice): string {
    return value.name;
  }

  selectRegistryOffice(value: string): Promise<RegistryOffice[]> {
    let valueLowerCase = value.toLowerCase().trim();
    return Promise.resolve(this.registryOffices.filter(v => v.name.toLowerCase().indexOf(valueLowerCase) > -1));
  }

  @action clearRegistryOfficeData() {
    if (this.model) {
      this.model.registryOfficeId = null;
    }
  }

  @action handleRegistryOfficeSelectOption(value?: RegistryOffice) {
    if (value) {
      this.model.registryOfficeId = value.id;
      this.model.registryOfficeId = value.id;
      this.model.registryOfficeName = value.name;
    } else {
      this.model.registryOfficeId = null;
      this.model.registryOfficeName = null;
    }
  }
}

export const SearchDocumentsForReportUI = withAsyncFrame(SearchDocumentsForReportUIImpl);
