const winston = require('winston');
const moment = require('moment');
moment.locale('pt-br');

dateFormat = () => {
	return moment().format('LLLL');
};

class LoggerService {
	constructor(route) {
		this.log_data = null;
		this.route = route;
		const logger = winston.createLogger({
			transports: [
				new winston.transports.Console(),
				new winston.transports.File({
					filename: `./logs/${route}.log`,
				}),
			],
			format: winston.format.printf((info) => {
				//SAT, 01 Feb 2020 09:50:13 GMT | INFO/DEBUG/ERROR | main.log (the file that log belongs to) | App event
				let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${
					info.message
				} | `;
				//                             | data:{"a":"a"}
				message = info.obj
					? message + `data: ${JSON.stringify(info.obj)} | `
					: message;
				//                          | log_data:{"b":"b"}

				message = this.log_data
					? message +
					  `log_data:${JSON.stringify(this.log_data)} | `
					: message;

				return message;
			}),
		});

		this.logger = logger;
	}

	setLogData(log_data) {
		this.log_data = log_data;
	}

	async info(message) {
		this.logger.log('info', message);
	}

	async info(message, obj) {
		this.logger.log('info', message, {
			obj,
		});
	}

	async debug(message) {
		this.logger.log('debug', message);
	}

	async debug(message, obj) {
		this.logger.log('debug', message, {
			obj,
		});
	}

	async error(message) {
		this.logger.log('error', message);
	}

	async error(message, obj) {
		this.logger.log('error', message, {
			obj,
		});
	}
}

module.exports = LoggerService;
