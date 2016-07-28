export default function sendJson(SuperClass) {
	return class SendJson extends SuperClass {
		/**
		 * @returns {Object}
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
	};
}

