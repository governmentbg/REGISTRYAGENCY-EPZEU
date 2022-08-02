import { ObjectHelper } from "Cnsys.Core";
import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import {
  Act,
  attributesClassFormControl,
  AutoComplete,
  Button,
  EPZEUBaseComponent,
  fieldTittleRequiredAttributes,
  setCurrentOptionInNavMenu,
  ValidationSummaryErrors
} from "EPZEU.Core";
import { Book, NomenclaturesPR, NomenclaturesPRDataService } from "EPZEU.PR.Core";
import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { TaxesCalculator } from "../Models/TaxesCalculator";
import { TaxesCalculatorValidator } from "../Models/Validators/TaxesCalculatorValidator";
import { TaxesDataService } from "../Services/TaxesDataService";

interface TaxesCalculatorUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt {
}

const attributesClassFormControlMaxL13TextRight = { className: 'form-control text-right' };

@observer class TaxesCalculatorSectionUIImpl extends EPZEUBaseComponent<TaxesCalculatorUIProps, TaxesCalculator> {
  private _taxesDataService: TaxesDataService;
  private _nomenclaturesPRDataService: NomenclaturesPRDataService;
  @observable private _actSelectOptions: Act[];
  @observable private _result: number;
  @observable private _materialInterestSearched: number;
  @observable private _error: string;


  constructor(props: TaxesCalculatorUIProps) {
    super(props);

    setCurrentOptionInNavMenu('pr_calculator');

    this.getActs = this.getActs.bind(this);
    this.calculate = this.calculate.bind(this);

    this.handleBookSelectOption = this.handleBookSelectOption.bind(this);
    this.handleBookChange = this.handleBookChange.bind(this);
    this.selectBook = this.selectBook.bind(this);

    this.handleActSelectOption = this.handleActSelectOption.bind(this);
    this.handleActChange = this.handleActChange.bind(this);
    this.selectAct = this.selectAct.bind(this);
    this._nomenclaturesPRDataService = new NomenclaturesPRDataService();

    this.model = new TaxesCalculator();
    this.validators = [];
    this.validators.push(new TaxesCalculatorValidator());
       
    this._taxesDataService = new TaxesDataService();

  }



  @action getActs(): void {
    //TODO: Това да се чете от номенклатурата
    this.props.registerAsyncOperation(this._nomenclaturesPRDataService.getActsByBook(this.model.book.id).then(acts => {
      this._actSelectOptions = acts.sort(function (a, b) {
        return ('' + a.name).localeCompare(b.name);
      });
    }));
  }

  render(): JSX.Element {

    return (
      <>
        <section className="card card-page">
          <div className="card-body card-page__body">
            <div className="mt-0">
              <div className="help-text">
                <p>{this.getResource('PR_APP_00057_I')}</p>
            </div>
            </div>
            <div className="field-container">
              <ValidationSummaryErrors key="taxesCalculator" errors={this.model.getModelErrors()} />
              <div className="row">
                <div className="form-group col-sm-12">
                  {this.labelFor(m => m.book, 'PR_APP_BOOK_L', fieldTittleRequiredAttributes)}
                  <AutoComplete {...this.bind(m => m.book.name)}
                    handleChangeCallback={this.handleBookChange}
                    selector={this.selectBook}
                    showValue={this.showBookValue}
                    hasSelectedValue={this.model.book && this.model.book.id && this.model.book.name ? true : false}
                    handleSelectCallback={this.handleBookSelectOption}
                    triggerLength={0}
                    attributes={attributesClassFormControl}
                  />
                </div>
                <div className="form-group col-sm-12">
                  {this.labelFor(m => m.act, 'PR_TYPE_OF_REGISTRATION_ACT_L', fieldTittleRequiredAttributes)}
                  <AutoComplete {...this.bind(m => m.act.name)}
                    handleChangeCallback={this.handleActChange}
                    selector={this.selectAct}
                    showValue={this.showActValue}
                    hasSelectedValue={this.model.act && this.model.act.id && this.model.act.name ? true : false}
                    handleSelectCallback={this.handleActSelectOption}
                    triggerLength={0}
                    attributes={attributesClassFormControl}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {this.labelFor(m => m.materialInterestInBGN, 'PR_MATERIAL_INTEREST_IN_BGN_L', fieldTittleRequiredAttributes)}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6 col-sm-4 col-md-3 col-lg-3">
                  <div className="form-row">
                    <div className="col">
                      {this.textBoxFor(m => m.materialInterestInBGN, attributesClassFormControlMaxL13TextRight)}
                    </div>
                    <div className="col-auto">
                      <label className="col-form-label">{this.getResource('GL_BGN_ABBRAVETION_L')}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="help-text-inline">
                    {this.getResource('PR_MATERIAL_INTEREST_IN_BGN_I')}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col">
                  <hr />
                  <Button type="button" className="btn btn-outline-light text-dark" lableTextKey={"PR_APP_CALCULATE_L"} onClick={this.calculate}>
                    <i className="ui-icon ui-icon-calculator mr-1" aria-hidden="true"></i>
                  </Button>
                </div>
              </div>
              {
                !ObjectHelper.isNullOrUndefined(this._result) &&
                <div id="RESULT" className="alert alert-info" role="alert">
                  <p>
                    {this.getResource('PR_MATERIAL_INTEREST_IN_BGN_L')} <b>
                      {this._materialInterestSearched.toFixed(2).toString().length > 7 ?
                        this._materialInterestSearched.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        : this._materialInterestSearched.toFixed(2)} {this.getResource('GL_BGN_ABBRAVETION_L')}
                    </b>
                  </p>
                  <p>{this.getResource('GL_DUE_FEE_E')}: <span className='lead'>
                    <b>{this._result.toFixed(2).toString().length > 7 ?
                      this._result.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                      : this._result.toFixed(2)} {this.getResource('GL_BGN_ABBRAVETION_L')}</b>
                  </span>
                  </p>
                </div>
              }
              {
                this._error &&
                <div id="error" className="alert alert-info" role="alert">
                  <p>{this._error}</p>
                </div>
              }
            </div>
          </div>
        </section>

      </>);
  }

  test(e: any) {
    e.preventDefault();
  }

  @action handleBookChange() {
    if(this.model.book) {
      this.model.book.id = null;
      this.model.act.id = null;
      this.model.act.name = null
    }
  }

  selectBook(value: string): Promise<Book[]> {
    var valueLowerCase = value.toLowerCase().trim();
    return NomenclaturesPR.getBooks().then(books => books.filter(c => c.name.toLowerCase().indexOf(valueLowerCase) > -1));
  }

  showBookValue(value: Book): string {
    return value.name;
  }

 @action handleBookSelectOption(value?: Book) {
    if (value) {
      this.model.book.id = value.id;
      this.model.book.name = value.name;
    } else {
      this.model.book.id = null;
    }
   this.getActs();
  }

  @action handleActChange() {
    if (this.model && this.model.act) {
        this.model.act.id = null;
    }
  }

  selectAct(value: string): Promise<Act[]> {
    var valueLowerCase = value.toLowerCase();
    return Promise.resolve(this._actSelectOptions && this._actSelectOptions.filter(c => c.name.toLowerCase().indexOf(valueLowerCase) > -1));
  }

  showActValue(value: Act): string {
    return value.name;
  }

  handleActSelectOption(value?: Act) {
    if (value) {
      this.model.act.id = value.id;
      this.model.act.name = value.name;
    } else {
      this.model.act.id = null;
      this.model.act.name = null;
    }
  }

  @action calculate(): void {
    this._error = null;
    let isValid = this.validators[0].validate(this.model);

    if (isValid) {
      this.props.registerAsyncOperation(this._taxesDataService.calculateTax(this.model.act.id, this.model.materialInterestInBGN).then(res => {
        runInAction(() => {
          if (ObjectHelper.isNullOrUndefined(res) || (res as any) === "") {
            this._result = null;
            this._error = this.getResource('PR_APP_00055_I'); // Размера на дължимата такса не може да се изчисли автоматично по Тарифата за държавните такси, събирани от Агенция по вписвания
          } else {
            this._result = res;
            this._materialInterestSearched = Number(this.model.materialInterestInBGN);
          }
        });
      }));
    }
  }
}

// async errors should be in div with className="fixed-content-width".
const TaxesCalculatorSectionUI = withRouter(withAsyncFrame(TaxesCalculatorSectionUIImpl));

@observer class TaxesCalculatorUIImpl extends EPZEUBaseComponent<TaxesCalculatorUIProps, TaxesCalculator> {
  render(): JSX.Element {
    return (
      <div id='main-wrapper' className="main-wrapper">
        <div className="page-wrapper">
          <div className="section-wrapper section-wrapper--margins">
            <div className="fixed-content-width">
              <TaxesCalculatorSectionUI {...this.props}/>
            </div>
          </div>
        </div>
      </div>
      );
  }
}


export const TaxesCalculatorUI = withRouter(withAsyncFrame(TaxesCalculatorUIImpl));
