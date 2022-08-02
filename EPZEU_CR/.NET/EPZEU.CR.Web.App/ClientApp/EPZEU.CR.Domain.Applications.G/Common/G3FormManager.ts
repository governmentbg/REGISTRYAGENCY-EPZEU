﻿import { ObjectHelper } from 'Cnsys.Core';
import { RecordOperations } from 'EPZEU.CR.Domain';
import { G3 } from '../Models/ApplicationForms/ApplicationFormsG';
import { F10019A0_StatementA } from '../Models/Fields/ModelsAutoGenerated';
import { ApplicationFormGBaseManager } from './ApplicationFormGBaseManager';

export class G3FormManager extends ApplicationFormGBaseManager<G3> {

    private possibleDocTypes: { documentTypeID: string, documentTypeName: string, minOccurs: number, maxOccurs: number }[]

    //#region Abstract

    /**Инициализира данните на заявленеито*/
    protected initApplicationData(): Promise<void> {
        return super.initApplicationData().bind(this).then(() => {
            this.getPossibleActAttachedDocumentTypes().then(possibleDocTypes => {

                this.possibleDocTypes = possibleDocTypes
            })
        });
    }

    protected createApplication(obj: any): G3 {
        return new G3(obj);
    }

    public prepareForSave(): Promise<void> {

        for (var doc of this.application.documents) {

            //Проверяваме всички документи с guid. Гледаме дали имаме документ "Декларация по чл.38, ал.9, т.2 от ЗСч", за който да нямаме създаден модел statement. 
            //Ако нямаме си го създаваме и попълваме. Това нещо се прави тук, а не в onDocumentSaved защото там нямаме docGuid-a на документа, 
            //когато е подаден с шаблон преди да се подпише.

            if (!ObjectHelper.isStringNullOrEmpty(doc.guid)) {
                let docIds = doc.documentTypeID.split('.');

                if (docIds.length > 0 && docIds[0] == "5" && docIds[1] == "61"
                    && this.application.fields.statements.statements.filter(x => x.actID == doc.guid).length == 0) {

                    let statement = new F10019A0_StatementA();

                    statement.isActWithErasedPersonalData = doc.isActWithErasedPersonalData == true;
                    statement.actModeText = this.possibleDocTypes.filter(dt => dt.documentTypeID == doc.documentTypeID)[0].documentTypeName;
                    statement.actModeValue = docIds[1];
                    statement.description = doc.description;
                    statement.actID = doc.guid;

                    statement.recordOperation = RecordOperations.Add;
                    this.application.fields.statements.statements.push(statement);
                }
            }
        }

        return Promise.resolve();
    }

    //#endregion
}