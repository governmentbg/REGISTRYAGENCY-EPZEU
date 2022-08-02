import * as React from 'react';
import { BaseProps } from 'Cnsys.UI.React';
import {Button, EPZEUBaseComponent, fieldTitleLabelAttributes, ValidationSummaryErrors} from 'EPZEU.Core';
import { ApplicationInfoUI, SectionTitleUI } from 'EPZEU.PR.ApplicationBase';
import { Owners } from "../../Models/Sections/Owners";
import { PropertyDocumentUI } from "../PropertyDocumentUI";
import { PropertyDocument } from "../../Models/PropertyDocument";
import { observer } from "mobx-react";
import { ObjectHelper } from "Cnsys.Core";
import { Person } from "../../Models/Person";
import { PersonUI } from "../PersonUI";

interface PreviousOwnersUIProps extends BaseProps {
}

@observer export class PreviousOwnersUI extends EPZEUBaseComponent<PreviousOwnersUIProps, Owners> {
  constructor(props?: BaseProps) {
    super(props);

    this.addOwner = this.addOwner.bind(this);
    this.deleteOwner = this.deleteOwner.bind(this);
    this.addPropertyDocument = this.addPropertyDocument.bind(this);
    this.deletePropertyDocument = this.deletePropertyDocument.bind(this);

  }

  renderEdit(): JSX.Element {
    return (
      <>
        <SectionTitleUI titleKey={'PR_APP_PREVIOUS_OWNERS_L'}/>
        <ApplicationInfoUI infoTextKey={'PR_APP_00098_I'}/>

        <ValidationSummaryErrors errors={this.model.getPropertyErrors("duplicatedIdentifierIndividual")}/>
        <ValidationSummaryErrors errors={this.model.getPropertyErrors("duplicatedIdentifierLegalEntity")}/>

        <div className="field-container">

          {this.model.persons && this.model.persons.map((person, index) => {
            return (
              <React.Fragment key={ObjectHelper.newGuid()}>
                <div id={'person_' + index} className="interactive-container interactive-container--form">
                  <div className="interactive-container__content record-container">
                    <PersonUI showCompanyCase={true} haveBulstat={true} isIdentityOptional={true}
                              infoTextKeyForIndividual={'PR_APP_00036_I'}{...this.bindArrayElement(m => m.persons[index], [index])}/>
                  </div>
                  <div className="interactive-container__controls">
                    <button className="btn btn-outline-light btn-sm" title={this.getResource('GL_DELETE_L')}
                            onClick={() => {this.deleteOwner(person);}}
                            onMouseOver={()=>{$('#person_' + index).addClass('interactive-container--focus')}}
                            onMouseOut={()=>{$('#person_' + index).removeClass('interactive-container--focus')}}>
                      <i className="ui-icon ui-icon-times" aria-hidden="true"></i></button>
                  </div>
                </div>
                {this.model.persons.length - 1 != index ?
                  <hr className="hr--doted-line"/>
                  : null}
              </React.Fragment>
            )
          })}
          <div className="row">
            <div className="form-group col">
              <hr/>
              <Button type="button" className="btn btn-outline-light text-dark" lableTextKey={"PR_APP_ADD_OWNER_L"}
                      onClick={this.addOwner}>
                <i className="ui-icon ui-icon-plus mr-1" aria-hidden="true"></i>
              </Button>
            </div>
          </div>
        </div>
        <div className="field-container">
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m.persons, 'PR_APP_PROPERTY_DOCUMENT_L', fieldTitleLabelAttributes)}
            </div>
          </div>
          <ApplicationInfoUI infoTextKey={'PR_APP_00105_I'}/>

          {this.model.propertyDocuments && this.model.propertyDocuments.map((propertyDocument, index) => {
            return (
              <React.Fragment key={ObjectHelper.newGuid()}>
                <div id={'property_document_' + index} className="interactive-container interactive-container--form">
                  <div className="interactive-container__content record-container">
                    <PropertyDocumentUI {...this.bindArrayElement(m => m.propertyDocuments[index], [index])} />
                  </div>
                  <div className="interactive-container__controls">
                    <button className="btn btn-outline-light btn-sm" title={this.getResource('GL_DELETE_L')}
                            onClick={() => {this.deletePropertyDocument(propertyDocument);}}
                            onMouseOver={()=>{$('#property_document_' + index).addClass('interactive-container--focus')}}
                            onMouseOut={()=>{$('#property_document_' + index).removeClass('interactive-container--focus')}}>
                      <i className="ui-icon ui-icon-times" aria-hidden="true"></i></button>
                  </div>
                </div>
                {this.model.propertyDocuments.length - 1 != index ?
                  <hr className="hr--doted-line"/>
                  : null}
              </React.Fragment>
            )
          })}
          <div className="row">
            <div className="form-group col">
              <hr/>
              <Button type="button" className="btn btn-outline-light text-dark" lableTextKey={"PR_APP_ADD_PROPERTY_DOCUMENT_L"}
                      onClick={this.addPropertyDocument}>
                <i className="ui-icon ui-icon-plus mr-1" aria-hidden="true"></i>
              </Button>
            </div>
          </div>
        </div>

      </>);
  }

  renderDisplay(): JSX.Element {
    return (<>
      <h2 className="section-title section-title--preview">{this.getResource("PR_APP_PREVIOUS_OWNERS_L")}</h2>

      {this.model.persons && this.model.persons.map((person, index) => {
        return (<>
            <PersonUI showCompanyCase={true} haveBulstat={true} hideLabelPersonType={true} isIdentityOptional={true}
                      {...this.bindArrayElement(m => m.persons[index], [index])}
                      viewMode={this.props.viewMode}/>
            {this.model.persons.length - 1 != index ?
              <hr className="hr--preview"/>
              : null}
          </>
        )
      })}

      {this.model.propertyDocuments && this.model.propertyDocuments.map((property, index) => {
        return (<>
            {this.model.propertyDocuments.length > 0 && index == 0 ? <span className="field-title field-title--preview">{this.getResource('PR_APP_PROPERTY_DOCUMENT_L')}</span> : null}
            <PropertyDocumentUI {...this.bindArrayElement(m => m.propertyDocuments[index], [index])} viewMode={this.props.viewMode}/>
            {this.model.propertyDocuments.length - 1 != index ?
              <hr className="hr--preview"/>
              : null}
          </>
        )
      })}
    </>);
  }

  addOwner() {
    if (this.model.persons == null) {
      this.model.persons = [];
    }
    this.model.persons.push(new Person());
  }

  deleteOwner(person: Person) {
    let index = this.model.persons.indexOf(person, 0);
    if (index > -1) {
      this.model.persons.splice(index, 1);
    }
  }

  addPropertyDocument() {
    if (this.model.propertyDocuments == null) {
      this.model.propertyDocuments = [];
    }
    this.model.propertyDocuments.push(new PropertyDocument());
  }

  deletePropertyDocument(propertyDocument: PropertyDocument) {
    let index = this.model.propertyDocuments.indexOf(propertyDocument, 0);
    if (index > -1) {
      this.model.propertyDocuments.splice(index, 1);
    }
  }
}
