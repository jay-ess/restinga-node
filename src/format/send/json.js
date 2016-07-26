export default function SendJson {
	/**
	 * @returns {object}
	 */
	encode() {
		return this.attributes;
	}

	/**
	 * @returns {string}
	 */
	getContentTypeHeader() {
		return 'application/json';
	}
}

