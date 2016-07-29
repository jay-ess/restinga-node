export default class Bearer {
	construct(token) {
		this.token = token;
	}

	setupRequest() {
		return {
			headers: {Authorization: `Bearer ${this.token}`}
		};
	}
}

