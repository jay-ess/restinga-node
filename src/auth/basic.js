export default class Basic {
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}

	setupRequest() {
		return {
			opts: {auth: `${this.username}:${this.password}`}
		};
	}
}

