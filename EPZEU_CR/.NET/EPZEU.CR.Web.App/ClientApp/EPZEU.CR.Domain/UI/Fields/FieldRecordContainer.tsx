import { withFieldContainer } from './FieldContainer'
import { withRecordContainer, RecordContainerProps } from './RecordContainer'

export function withFieldRecordContainer<C extends React.ComponentClass<RecordContainerProps>>(Component: C, props?: RecordContainerProps): C {

    return withFieldContainer(withRecordContainer(Component), props);
}