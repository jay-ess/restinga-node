export default function SendJson(SuperClass) {
	return class SendJson extends SuperClass {
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
}

