import { Logging } from './LoggingModule';
import * as consoleLogAppenderImport from "./ConsoleLogAppender";

export const logger = Logging.getLogger('cnsys');

export * from './LoggingModule';

Logging.BaseAppenderModules.consoleLogAppenderModule = consoleLogAppenderImport;