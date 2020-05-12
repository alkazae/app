/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://app.skaffolder.com/#!/register?friend=5eba3199bbf7210dd3bd532e
*
* You will get 10% discount for each one of your friends
* 
*/
import winston from "winston";
import chalk from "chalk";

/**
 * Adapter for logger
 */
class Logger {
  constructor() {
    const errorStackFormat = winston.format(err => {
      if (err.level == "error") {
        return Object.assign({}, err, {
          stack: err.stack,
          message: err.message
        });
      }
      return err;
    });

    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            errorStackFormat(),
            winston.format.colorize(),
            winston.format.json(),
            winston.format.printf(
              info => `${info.timestamp} ${info.level}: ${info.message}`
            ),
            winston.format.simple()
          ),
          level: "info", // Local Dev to preview all logging events
          handleExceptions: true // Show exceptions in the console
        })
      ]
    });
  }

  trace(...args) {
    this.logger.trace(...args);
  }
  debug(...args) {
    this.logger.debug(...args);
  }
  info(...args) {
    this.logger.info(...args);
  }
  warn(...args) {
    this.logger.warn(...args);
  }
  error(...args) {
    this.logger.error(...args);
  }

  expressMiddleware(req, res, next) {
    console.log(
      new Date().toLocaleString() + chalk.green(` ${req.method} - ${req.url} `)
    );
    next();
  }
}

export default new Logger();
