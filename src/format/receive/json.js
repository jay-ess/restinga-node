export default function receiveJson(SuperClass) {
	return class ReceiveJson extends SuperClass {
		/**
		 * @returns {string}
		 */
		getAcceptHeader() {
			return 'application/json';
		}

		/**
		 * @param {Object} data
		 * @returns {Resouce[]}
		 */
		factoryCollection({body}) {
			let resourcesData = JSON.parse(body);

			if (this.itemRoot) {
				resourcesData = resourcesData[this.collectionRoot];
			}

			return resourcesData
				.map(data => new this.constructor(data));
		}

		/**
		 * @param {Object} data
		 * @returns {Resource}
		 */
		factory({body}) {
			let resourceData = JSON.parse(body);

			if (this.itemRoot) {
				resourceData = resourceData[this.itemRoot];
			}

			return this.set(resourceData);
		}
	};
}

