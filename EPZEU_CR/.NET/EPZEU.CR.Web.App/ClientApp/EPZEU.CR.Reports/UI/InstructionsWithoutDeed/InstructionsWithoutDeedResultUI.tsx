import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { observer } from "mobx-react";
import * as React from "react";
import { Instruction } from "../../Models/Instruction";
import { InstructionsWithoutDeedResult } from "../../Models/InstructionsWithoutDeedResult";

interface InstructionsWithoutDeedResulProps extends BaseProps {
}

@observer export class InstructionsWithoutDeedResultUI extends EPZEUBaseComponent<InstructionsWithoutDeedResulProps, InstructionsWithoutDeedResult> {

    render(): JSX.Element {
        if (!this.model || !this.model.items || this.model.items.length == 0) return null;

        return <div className="table-responsive-block">
            <table className="table table-borderless table-striped table-hover">
                <thead>
                    <tr>
                        <th>{this.getResource('CR_APP_APPLICATION_NUMBER_WITH_INSTRUCTIONS_L')}</th>
                        <th>{this.getResource('CR_GL_COMPANY_NAME_ALL_L')}</th>
                        <th>{this.getResource('GL_GIVING_INSTRUCTIONS_TIME_L')}</th>
                        <th>{this.getResource('GL_DEADLINE_REMOVAL_IRREGULARITY_L')}</th>
                        <th>{this.getResource('GL_INSTRUCTIONS_L')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.model.items.map((item: Instruction, idx: number) => {
                            return <tr key={`${item.incomingNumber}_${idx}`}>
                                <td>
                                    <span className="field-title field-title--preview d-sm-none">{this.getResource("CR_APP_APPLICATION_NUMBER_WITH_INSTRUCTIONS_L")}</span>
                                    <p className="field-text">{item.incomingNumber}</p>
                                </td>
                                <td>
                                    <span className="field-title field-title--preview d-sm-none">{this.getResource("CR_GL_COMPANY_NAME_ALL_L")}</span>
                                    <p className="field-text">
                                    {
                                        item.deedSummary.map((deedInfo, index) => {
                                            return <React.Fragment key={index}>{deedInfo} {item.deedSummary.length-1 > index ? <br/> : null}</React.Fragment>
                                        })
                                    }
                                    </p>
                                </td>
                                <td>
                                    <span className="field-title field-title--preview d-sm-none">{this.getResource("GL_GIVING_INSTRUCTIONS_TIME_L")}</span>
                                    <p className="field-text">{this.dateDisplayFor(item.fromDate, `DD.MM.YYYY ${this.getResource('GL_YEAR_ABBREVIATION_L')} HH:mm:ss`)}</p>
                                </td>
                                <td>
                                    <span className="field-title field-title--preview d-sm-none">{this.getResource("GL_DEADLINE_REMOVAL_IRREGULARITY_L")}</span>
                                    <p className="field-text">{this.dateDisplayFor(item.endDate, `DD.MM.YYYY ${this.getResource('GL_YEAR_ABBREVIATION_L')} HH:mm:ss`)}</p>
                                </td>
                                <td>
                                    <p className="field-text"><a href={item.link} target="_blank">{this.getResource('GL_INSTRUCTIONS_L')}</a></p>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    }
}