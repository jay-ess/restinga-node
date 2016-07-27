export default function ReceiveJson(SuperClass) {
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

			const resources = [];

			for (const data of resourcesData) {
				const resource = new this.constructor();
				resource._receiveJsonFill(data);
				resources.push(resource);
			}

			return resources;
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

			this._receiveJsonFill(resourceData);

			return this;
		}

		/**
		 * @param {Object} data
		 */
		_receiveJsonFill(data) {
			for (const key of Object.keys(data)) {
				this.attributes[key] = data[key];
			}
		}
	}
}

