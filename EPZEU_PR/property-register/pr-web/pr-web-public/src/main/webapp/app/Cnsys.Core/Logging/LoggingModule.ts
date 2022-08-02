"use strict";
import { EventDispatcher, IEventDispatcher } from "../Common/EventDispatcher"

export namespace Logging {
    interface AppenderModules {
        consoleLogAppenderModule?: Logging.AppenderModule;
    }

    export interface AppenderModule {
        configure(config?: Logging.AppenderConfigBase): (event: Logging.LoggingEvent) => void;
        appender(config?: Logging.AppenderConfigBase): (event: Logging.LoggingEvent) => void;
    }

    export const BaseAppenderModules: AppenderModules = { consoleLogAppenderModule: undefined };

    //log4js
    var originalConsoleFunctions = {
        log: console.log,
        debug: console.debug,
        info: console.info,
        warn: console.warn,
        error: console.error
    }
    var configState = {};

    var ALL_CATEGORIES = '[all]'
        , loggers = {}
        , appenderMakers = {}
        , appenderShutdowns = {}
        , defaultConfig = {
            appenders: [
                { type: "stdout" }
            ],
            replaceConsole: false
        };
    export interface AppenderConfigBase {
        type: string;
        category?: string;
        layout?: { type: string;[key: string]: any }
    }
    export var appenders:any = {};
    export function hasLogger(logger: any) {
        return loggers.hasOwnProperty(logger);
    }

    export function getBufferedLogger(categoryName: any) {
        var base_logger = getLogger(categoryName);
        var logger = {};
        (<any>logger).temp = [];
        (<any>logger).target = base_logger;
        (<any>logger).flush = function () {
            for (var i = 0; i < (<any>logger).temp.length; i++) {
                var log = (<any>logger).temp[i];
                (<any>logger).target[log.level](log.message);
                delete (<any>logger).temp[i];
            }
        };
        (<any>logger).trace = function (message: any) { (<any>logger).temp.push({ level: 'trace', message: message }); };
        (<any>logger).debug = function (message: any) { (<any>logger).temp.push({ level: 'debug', message: message }); };
        (<any>logger).info = function (message: any) { (<any>logger).temp.push({ level: 'info', message: message }); };
        (<any>logger).warn = function (message: any) { (<any>logger).temp.push({ level: 'warn', message: message }); };
        (<any>logger).error = function (message: any) { (<any>logger).temp.push({ level: 'error', message: message }); };
        (<any>logger).fatal = function (message: any) { (<any>logger).temp.push({ level: 'fatal', message: message }); };

        return logger;
    }

    function normalizeCategory(category: any) {
        return category + '.';
    }

    function doesLevelEntryContainsLogger(levelCategory: any, loggerCategory: any) {
        var normalizedLevelCategory = normalizeCategory(levelCategory);
        var normalizedLoggerCategory = normalizeCategory(loggerCategory);
        return normalizedLoggerCategory.substring(0, normalizedLevelCategory.length) == normalizedLevelCategory; //jshint ignore:line
    }

    function doesAppenderContainsLogger(appenderCategory: any, loggerCategory: any) {
        var normalizedAppenderCategory = normalizeCategory(appenderCategory);
        var normalizedLoggerCategory = normalizeCategory(loggerCategory);
        return normalizedLoggerCategory.substring(0, normalizedAppenderCategory.length) == normalizedAppenderCategory; //jshint ignore:line
    }

    export function getLogger(loggerCategoryName: any) {

        // Use default logger if categoryName is not specified or invalid
        if (typeof loggerCategoryName !== "string") {
            loggerCategoryName = Logger.prototype.DEFAULT_CATEGORY;
        }

        if (!hasLogger(loggerCategoryName)) {

            var level;

            if ((<any>levels).config) {
                var keys = Object.keys((<any>levels).config).sort();
                for (var idx = 0; idx < keys.length; idx++) {
                    var levelCategory = keys[idx];
                    if (doesLevelEntryContainsLogger(levelCategory, loggerCategoryName)) {
                        // level for the logger
                        level = (<any>levels).config[levelCategory];
                    }
                }
            }
            // Create the logger for this name if it doesn't already exist
            (<any>loggers)[loggerCategoryName] = new Logger(loggerCategoryName, level);

            var appenderList;
            for (var appenderCategory in appenders) {
                if (doesAppenderContainsLogger(appenderCategory, loggerCategoryName)) {
                    appenderList = (<any>appenders)[appenderCategory];
                    appenderList.forEach(function (appender: any) {
                        (<any>loggers)[loggerCategoryName].addEventListener("log", appender);
                    });
                }
            }

            if ((<any>appenders)[ALL_CATEGORIES]) {
                appenderList = (<any>appenders)[ALL_CATEGORIES];
                appenderList.forEach(function (appender: any) {
                    (<any>loggers)[loggerCategoryName].addEventListener("log", appender);
                });
            }
        }

        return (<any>loggers)[loggerCategoryName];
    }

    /**
     * args are appender, optional shutdown function, then zero or more categories
     */
    export function addAppender(args: any) {
        args = Array.prototype.slice.call(arguments);
        var appender = args.shift();
        //check for a shutdown fn
        if (args.length > 0 && typeof args[0] === 'function') {
            (<any>appenderShutdowns)[appender] = args.shift();
        }

        if (args.length === 0 || args[0] === undefined) {
            args = [ALL_CATEGORIES];
        }
        //argument may already be an array
        if (Array.isArray(args[0])) {
            args = args[0];
        }

        args.forEach(function (appenderCategory: any) {
            addAppenderToCategory(appender, appenderCategory);

            if (appenderCategory === ALL_CATEGORIES) {
                addAppenderToAllLoggers(appender);
            } else {

                for (var loggerCategory in loggers) {
                    if (doesAppenderContainsLogger(appenderCategory, loggerCategory)) {
                        (<any>loggers)[loggerCategory].addEventListener("log", appender);
                    }
                }

            }
        });
    }

    function addAppenderToAllLoggers(appender: any) {
        for (var logger in loggers) {
            if (hasLogger(logger)) {
                (<any>loggers)[logger].addEventListener("log", appender);
            }
        }
    }

    function addAppenderToCategory(appender: any, category: any) {
        if (!(<any>appenders)[category]) {
            (<any>appenders)[category] = [];
        }
        (<any>appenders)[category].push(appender);
    }

    export function clearAppenders() {
        //if we're calling clearAppenders, we're probably getting ready to write
        //so turn log writes back on, just in case this is after a shutdown
        enableAllLogWrites();
        appenders = {};
        for (var logger in loggers) {
            if (hasLogger(logger)) {
                (<any>loggers)[logger].removeEventListener("log");
            }
        }
    }

    function configureAppenders(appenderList: any, options: any) {
        clearAppenders();
        if (appenderList) {
            appenderList.forEach(function (appenderConfig: any) {
                loadAppender(appenderConfig.type);
                var appender;
                appenderConfig.makers = appenderMakers;
                try {
                    appender = (<any>appenderMakers)[appenderConfig.type](appenderConfig, options);
                    addAppender([appender, appenderConfig.category]);
                } catch (e) {
                    throw new Error("log4js configuration problem for " + JSON.stringify(appenderConfig));
                }
            });
        }
    }

    function configureLevels(_levels: any) {
        (<any>levels).config = _levels; // Keep it so we can create loggers later using this cfg
        if (_levels) {
            var keys = Object.keys((<any>levels).config).sort();
            for (var idx in keys) {
                var category = keys[idx];
                if (category === ALL_CATEGORIES) {
                    setGlobalLogLevel(_levels[category]);
                }
                for (var loggerCategory in loggers) {
                    if (doesLevelEntryContainsLogger(category, loggerCategory)) {
                        (<any>loggers)[loggerCategory].setLevel(_levels[category]);
                    }
                }
            }
        }
    }

    export function setGlobalLogLevel(level: any) {
        Logger.prototype.level = toLevel(level, levels.TRACE);
    }

    export function getDefaultLogger() {
        return getLogger(Logger.prototype.DEFAULT_CATEGORY);
    }


    function configureOnceOff(config: any, options: any) {
        if (config) {
            try {
                restoreConsole();
                configureLevels(config.levels);
                configureAppenders(config.appenders, options);

                if (config.replaceConsole) {
                    replaceConsole();
                }
            } catch (e) {
                throw new Error(
                    "Problem reading log4js config " + JSON.stringify(config) +
                    ". Error was \"" + e.message + "\" (" + e.stack + ")"
                );
            }
        }
    }


    export function replaceConsole(logger?: any) {
        function replaceWith(fn: any) {
            return function () {
                fn.apply(logger, arguments);
            };
        }
        logger = logger || getLogger("console");
        ['log', 'debug', 'info', 'warn', 'error'].forEach(function (item) {
            (<any>console)[item] = replaceWith(item === 'log' ? logger.info : logger[item]);
        });
    }

    export function restoreConsole() {
        ['log', 'debug', 'info', 'warn', 'error'].forEach(function (item) {
            (<any>console)[item] = (<any>originalConsoleFunctions)[item];
        });
    }

    export function loadAppender(appenderName: string, appenderModule?: AppenderModule) {
        appenderModule = appenderModule;

        if (!appenderModule) {
            throw new Error("Invalid log4js appender: " + JSON.stringify(appenderName));
        }
        (<any>appenders)[appenderName] = appenderModule.appender.bind(appenderModule);
        if ((<any>appenderModule).shutdown) {
            (<any>appenderShutdowns)[appenderName] = (<any>appenderModule).shutdown.bind(appenderModule);
        }
        (<any>appenderMakers)[appenderName] = appenderModule.configure.bind(appenderModule);
        return (<any>appenders)[appenderName];
    }

    export function shutdown(cb: any) {
        // First, disable all writing to appenders. This prevents appenders from
        // not being able to be drained because of run-away log writes.
        disableAllLogWrites();

        //turn off config reloading
        if ((<any>configState).timerId) {
            clearInterval((<any>configState).timerId);
        }

        // Call each of the shutdown functions in parallel
        var completed = 0;
        var error: any;
        var shutdownFcts: any = [];
        var complete = function (err: any) {
            error = error || err;
            completed++;
            if (completed >= shutdownFcts.length) {
                cb(error);
            }
        };
        for (var category in appenderShutdowns) {
            if (appenderShutdowns.hasOwnProperty(category)) {
                shutdownFcts.push((<any>appenderShutdowns)[category]);
            }
        }
        if (!shutdownFcts.length) {
            return cb();
        }
        shutdownFcts.forEach(function (shutdownFct: any) { shutdownFct(complete); });
    }
    //logger;

    var DEFAULT_CATEGORY = '[default]';
    var logWritesEnabled = true;

    export class LoggingEvent {
        public startTime: Date = new Date();
        public categoryName: any;
        public data: any;
        public level: Level;
        public logger: Logger;
        constructor(categoryName: any, level: any, data: any, logger: any) {
            this.startTime = new Date();
            this.categoryName = categoryName;
            this.data = data;
            this.level = level;
            this.logger = logger;
        }
    }
    export class Logger extends EventDispatcher {
        public category: any;
        public DEFAULT_CATEGORY: string = DEFAULT_CATEGORY;
        public level: Level = levels.TRACE;
        constructor(name?: any, level?: any) {
            super();
            this.category = name || DEFAULT_CATEGORY
            this.setLevel.bind(this);
            this.removeLevel.bind(this);
            this.log.bind(this);
            this.isLevelEnabled.bind(this);
            this._log.bind(this);
            this.disableAllLogWrites.bind(this);
            this.enableAllLogWrites.bind(this);
            if (level) {
                this.setLevel(level);
            }
            ['Trace', 'Debug', 'Info', 'Warn', 'Error', 'Fatal', 'Mark'].forEach(addLevelMethods);

        }

        setLevel(level: Level) {
            this.level = levels.toLevel(level, this.level || levels.TRACE);
        };
        removeLevel() {
            delete this.level;
        };
        log() {
            var logLevel = levels.toLevel(arguments[0].name, levels.INFO);
            if (!this.isLevelEnabled(logLevel)) {
                return;
            }
            var numArgs = arguments.length - 1;
            var args = new Array(numArgs);
            for (var i = 0; i < numArgs; i++) {
                args[i] = arguments[i + 1];
            }
            this._log(logLevel, args);
        };
        isLevelEnabled(otherLevel: any) {
            return this.level.isLessThanOrEqualTo(otherLevel);
        };

        _log(level: any, data: any) {
            var categoryName = this.category;
            var logger = this;
            var loggingEvent = new LoggingEvent(categoryName, level, data, logger);
            this.dispatchEvent('log', loggingEvent);
            //this.emit('log', loggingEvent);
        };
        disableAllLogWrites() {
            logWritesEnabled = false;
        }
        enableAllLogWrites() {
            logWritesEnabled = true;
        }

    }

    Logger.prototype.DEFAULT_CATEGORY = DEFAULT_CATEGORY;
    export function addLevelMethods(level: any) {
        level = levels.toLevel(level);

        var levelStrLower = level.toString().toLowerCase();
        var levelMethod = levelStrLower.replace(/_([a-z])/g, function (g: any) { return g[1].toUpperCase(); });
        var isLevelMethod = levelMethod[0].toUpperCase() + levelMethod.slice(1);

        (<any>Logger.prototype)['is' + isLevelMethod + 'Enabled'] = function () {
            return this.isLevelEnabled(level);
        };

        (<any>Logger.prototype)[levelMethod] = function () {
            if (logWritesEnabled && this.isLevelEnabled(level)) {
                var numArgs = arguments.length;
                var args = new Array(numArgs);
                for (var i = 0; i < numArgs; i++) {
                    args[i] = arguments[i];
                }
                this._log(level, args);
            }
        };
    }
    export function disableAllLogWrites() {
        logWritesEnabled = false;
    }
    export function enableAllLogWrites() {
        logWritesEnabled = true;
    }

    //levels" 

    export class Level {
        public level: any;
        public levelStr: any;
        constructor(level: any, levelStr: any) {
            this.level = level;
            this.levelStr = levelStr;
        }
        toString() {
            return this.levelStr;
        };
        isLessThanOrEqualTo(otherLevel: any): boolean {
            if (typeof otherLevel === "string") {
                otherLevel = toLevel(otherLevel);
            }
            return this.level <= otherLevel.level;
        };

        isGreaterThanOrEqualTo(otherLevel: any): boolean {
            if (typeof otherLevel === "string") {
                otherLevel = toLevel(otherLevel);
            }
            return this.level >= otherLevel.level;
        };

        isEqualTo(otherLevel: any): boolean {
            if (typeof otherLevel === "string") {
                otherLevel = toLevel(otherLevel);
            }
            return this.level === otherLevel.level;
        };

    }
    export function toLevel(sArg: any, defaultLevel?: any): any {
        if (!sArg) {
            return defaultLevel;
        }
        if (sArg instanceof Level) {
            return sArg.toString();
        }
        if (sArg.toUpperCase() === "ERROR") {
            return levels.ERROR;
        }
        if (typeof sArg === "string") {
            return sArg.toUpperCase() || defaultLevel;
        }
        return toLevel(sArg.toString());
    }
    export var levels = {
        ALL: new Level(Number.MIN_VALUE, "ALL"),
        TRACE: new Level(5000, "TRACE"),
        DEBUG: new Level(10000, "DEBUG"),
        INFO: new Level(20000, "INFO"),
        WARN: new Level(30000, "WARN"),
        ERROR: new Level(40000, "ERROR"),
        FATAL: new Level(50000, "FATAL"),
        MARK: new Level(9007199254740992, "MARK"), // 2^53
        OFF: new Level(Number.MAX_VALUE, "OFF"),
        toLevel: toLevel,
        Level: Level
    };
}