//import { AppenderConfigBase,levels, LogEvent } from './Logger'
import { Logging } from './LoggingModule'

function ConsoleLogAppender(config?: Logging.AppenderConfigBase): (event: Logging.LoggingEvent) => void {

    return (event: Logging.LoggingEvent) => {

        if (event.data) {
            (<Array<any>>event.data).forEach(error => {

                if (event.level.isGreaterThanOrEqualTo(Logging.levels.ERROR))
                    console.error(error);
                else if (event.level.isGreaterThanOrEqualTo(Logging.levels.WARN))
                    console.warn(error);
                else
                    console.log(error);
            });
        }
    }
}

export function configure(config?: Logging.AppenderConfigBase): (event: Logging.LoggingEvent) => void {
    return ConsoleLogAppender(config);
}

export function appender(config?: Logging.AppenderConfigBase): (event: Logging.LoggingEvent) => void {
    return ConsoleLogAppender(config);
}