import { BaseDataService } from 'Cnsys.Core'
import { appConfig } from '../Common'

export class ResourcesDataService extends BaseDataService {

    protected baseUrl(): string {
        return appConfig.epzeuApiRoot + 'nomenclatures/labels/' + (appConfig.clientLanguage ? appConfig.clientLanguage : '');
    }

    public getResources(prefixes: string[]): Promise<any> {
        var prefixesString = '';
        for (var prefixe of prefixes) {
            prefixesString += ',' + prefixe;
        }

        prefixesString = prefixesString.substring(1);

        return this.get<any>(null, null, { prefixes: prefixesString});
    }
}