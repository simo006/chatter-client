import { removeUserData, hasUserData, getUserData, saveUserData } from '../util/storage.js';
import { AuthenticationError } from '../error/AuthenticationError.js';


const host = 'http://localhost:3000';
const loginUrl = '/auth/login';
const registerUrl = '/auth/register';
const logoutUrl = '/auth/logout';

/**
 * General function for creating a request
 * @param  {String} url - request url
 * @param  {Object} options - options such as request headers and etc.
 */
async function performRequest(url, options) {
	try {
		const res = await fetch(host + url, options);
		if (!res.ok) {
			// To prevent soft lock
			if (res.status === 403) {
				removeUserData();
				throw new AuthenticationError();
			}

			const error = await res.json();
			throw new Error(error.message);
		}

		// No content available
		if (res.status === 204) {
			return res;
		}

		return await res.json();
	} catch (err) {
		throw err;
	}
}

/**
 * Create an object, containing request options
 * @param  {String} method - request methods such as get, post and etc.
 * @param  {Object} data? - request data 
 * @returns  {Object} - options for the request
 */
function createOptions(method, data) {
	const options = {
		method,
		headers: {},
		credentials: 'include'
	};

	if (data !== undefined) {
		options.headers['Content-Type'] = 'application/json';
		options.headers['Access-Control-Allow-Credentials'] = true;
		options.body = JSON.stringify(data);
	}

	return options;
}

/**
 * Get request
 * @param  {String} url - request url
 */
export async function get(url) {
	return await performRequest(url, createOptions('get'));
}

/**
 * Post request
 * @param  {String} url - request url
 */
export async function post(url, data) {
	return await performRequest(url, createOptions('post', data));
}

/**
 * Put request
 * @param  {String} url - request url
 */
export async function put(url, data) {
	return await performRequest(url, createOptions('put', data));
}

/**
 * Delete request
 * @param  {String} url - request url
 */
export async function remove(url) {
	return await performRequest(url, createOptions('delete'));
}

/**
 * Login request
 * @param  {String} email
 * @param  {String} password
 */
export async function login(email, password) {
	const result = await post(loginUrl, { email, password });
	const userData = {
		email: result.data.email,
		firstName: result.data.firstName,
		lastName: result.data.lastName,
		age: Number(result.data.age)
	};

	saveUserData(userData);

	return result;
}

/**
 * Register request
 * @param  {String} email
 * @param  {String} password
 * @param  {String} confirmPassword
 * @param  {String} firstName
 * @param  {String} lastName
 * @param  {Number} age
 */
export async function register(email, password, confirmPassword, firstName, lastName, age) {
	const result = await post(registerUrl, { email, password, confirmPassword, firstName, lastName, age });
	const userData = {
		email: result.data.email,
		firstName: result.data.firstName,
		lastName: result.data.lastName,
		age: Number(result.data.age)
	};

	saveUserData(userData);

	return result;
}

/**
 * Logout request
 */
export function logout() {
	post(logoutUrl);

	removeUserData();
}