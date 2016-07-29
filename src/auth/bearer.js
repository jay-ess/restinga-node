export default class Bearer {
	constructor(token) {
		this.token = token;
	}

	setupRequest() {
		return {
			headers: {Authorization: `Bearer ${this.token}`}
		};
	}
}

