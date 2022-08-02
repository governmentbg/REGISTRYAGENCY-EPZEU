import * as React from 'react';
import { IDataServiceProviderProps } from '../Services/DataServiceProvider';

export const DataServiceContext = React.createContext<IDataServiceProviderProps>({ dataSrvProvider: undefined });