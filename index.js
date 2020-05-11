const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Logger = require('./services/logger_service');

const logger = new Logger('app');

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.use(bodyParser.json());

app.post('/test', (req, res) => {
	const body = req.body;

	let error = {};

	//adding body of the request as log data
	logger.setLogData(body);
	logger.info('Req /test ' + body);

	//we are expecting name, age and gender in the body

	if (body.name === null || body.name === '') {
		logger.error('name filed is empty');

		error['name'] = 'name field is empty';
	}

	if (body.age === null || body.age === '') {
		logger.error('Age field is empty');

		error['age'] = 'age field is empty';
	}

	if (body.gender === null || body.gender === '') {
		logger.error('Gender field is empty');

		error['gender'] = 'gender field is empty';
	}

	if (Object.keys(error).length != 0) {
		logger.error('Return error response', {
			sucess: false,
		});

		res.send('Error');
	} else {
		logger.info('Return sucess response', {
			sucess: true,
		});

		res.send('No Error');
	}
});

app.listen(4000, () => {
	logger.info('App launched in port 4000');
});
