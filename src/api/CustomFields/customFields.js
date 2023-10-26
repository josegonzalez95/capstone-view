import axios from 'axios';
export const createCustomField = async (eventBodySend) => {
	try {
		console.log('from api call', eventBodySend);
		const customFieldResponse = await axios.post(
			process.env.REACT_APP_API_URL + '/create-custom-field',
			eventBodySend,
			{
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'true',
				},
			}
		);
		const data = customFieldResponse.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getCustomField = async (eventBodySend) => {
	try {
		console.log('from api call', eventBodySend);
		const customFieldResponse = await axios.post(
			process.env.REACT_APP_API_URL + '/get-custom-fields-by-event',
			eventBodySend,
			{
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'true',
				},
			}
		);
		const data = customFieldResponse.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const createOption = async (bodySend) => {
	try {
		const customFieldResponse = await axios.post(
			process.env.REACT_APP_API_URL + '/create-option',
			bodySend,
			{
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'true',
				},
			}
		);
		const data = customFieldResponse.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getOptions = async (bodySend) => {
	try {
		const customFieldResponse = await axios.post(
			process.env.REACT_APP_API_URL + '/get-options',
			bodySend,
			{
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'true',
				},
			}
		);
		const data = customFieldResponse.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const updateCustomFieldPublished = async (bodySend) => {
	try {
		const customFieldResponse = await axios.post(
			process.env.REACT_APP_API_URL + '/change-published-cf',
			bodySend,
			{
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'true',
				},
			}
		);
		const data = customFieldResponse.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const updateCustomFieldName = async (bodySend) => {
	try {
		const customFieldResponse = await axios.post(
			process.env.REACT_APP_API_URL + '/update-field-name',
			bodySend,
			{
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'true',
				},
			}
		);
		const data = customFieldResponse.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const updateCustomFieldOption = async (bodySend) => {
	try {
		const customFieldResponse = await axios.post(
			process.env.REACT_APP_API_URL + '/update-option',
			bodySend,
			{
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'true',
				},
			}
		);
		const data = customFieldResponse.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteCustomFieldOption = async (bodySend) => {
	try {
		const customFieldResponse = await axios.post(
			process.env.REACT_APP_API_URL + '/delete-option',
			bodySend,
			{
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'true',
				},
			}
		);
		const data = customFieldResponse.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};
