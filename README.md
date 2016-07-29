# restinga-node

> REST API abstraction layer to easily consume data. Based on [artesaos/restinga](https://github.com/artesaos/restinga).

[![Build Status](https://travis-ci.org/jay-ess/restinga-node.svg?branch=master)](https://travis-ci.org/jay-ess/restinga-node)
[![Coverage Status](https://coveralls.io/repos/github/jay-ess/restinga-node/badge.svg?branch=master)](https://coveralls.io/github/jay-ess/restinga-node?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Contents

* [Usage](#usage)
* [Overview](#overview)
* [Debug](#debug)
* [Docs](#docs)
  * [Resource Methods](#resource-methods)
  * [Make Your Auth System](#make-your-auth-system)
  * [Make Your Format](#make-your-format)

## Usage

```sh
npm install -S restinga
```

## Overview

###### digital-ocean-descriptor.js

```js
import {Descriptor} from 'restinga';
import {Bearer} from 'restinga/lib/auth';

export default class DigitalOceanDescriptor extends Descriptor {
  constructor() {
    super({
      service: 'digital-ocean',
      prefix: 'https://api.digitalocean.com/v2',
      
      // Optional User-Agent for requests:
      agent: 'restinga-node/1.0.0 (https://github.com/jay-ess/restinga-node)'
    });
  }
  
  // Optional auth setup
  get authorization() {
    return new Bearer('YourToken');
  }
}
```

###### container.js

```js
import {Container} from 'restinga';
import DigitalOceanDescriptor from './digital-ocean-descriptor';

Container.register(new DigitalOceanDescriptor());
```

###### droplet.js

```js
import {Resource} from 'restinga';
import {receiveJson, sendJson} from 'restinga/lib/format';

export default class Droplet extends receiveJson(sendJson(Resource)) {
  setup() {
    super.setup({
      service: 'digital-ocean', // match a descriptor service name
      name: 'droplets',
      identifier: 'id',
      collectionRoot: 'droplets',
      itemRoot: 'droplet'
    });
  }
}
```

###### usage.js

```js
import Droplet from './droplet';

const droplet = new Droplet({
  name: 'server.restinga.dev',
  region: 'nyc3',
  size: '512mb',
  image: 'ubuntu-14-04-x64'
});

// Resources methods return Promises

droplet.save()
  .then(droplet => console.log(droplet.get('id'))) // Returns itself
  .catch(err => console.log(err));

// Wanna some async-await?

try {
  await droplet.save();
  console.log(droplet.get('id'));
} catch (err) {
  console.log(err);
}
```

See a working example: [test/resource.test.js](test/resource.test.js).

## Debug

Wanna know what's happening behind the scenes? This module uses [visionmedia/debug](https://github.com/visionmedia/debug), so you can just run `DEBUG=restinga:* node your-file.js` and get a pretty output of how restinga is working.

## Docs

### Resource methods

Method | Return Type | Description
--- | --- | ---
hasParentResource() | `Boolean` | True if you're using a nested resource
childResource(resource) | `Resource` | Make a resource your child
getIdentifier() | `?string` | Return the identifier value
get(key) | `*` | Return `key` from attributes
set(key, value) | `self` | Change a key from attributes
set(obj) | `self` | Change multiple attributes
unset(key) | `self` | Delete `key` from attributes
`static` all(query) | `Promise` => `Resource[]` | Static search resources
getAll(query) | `Promise` => `Resource[]` | Search resources
`static` find(identifier) | `Promise` => `Resource` | Static search for an resource with identifier = `identifier`
doFind(identifier) | `Promise` => `Resource` | Search for an resource with identifier = `identifier`
save() | `Promise` => `Resource` | Save this resource
update() | `Promise` => `Resource` | Update this resource
destroy() | `Promise` | Delete this resource

### Make Your Auth System

For you to make your own authorization class, just make a class with a `setupAuth()` method that takes no params and returns an object like this:

```js
class MyAuthSystem {
  setupRequest() {
    return {
      opts: {},
      headers: {}
    };
  }
}
```

`opts` follow [http.request](https://nodejs.org/api/http.html#http_http_request_options_callback) since we use [got](https://github.com/sindresorhus/got) for requests. And `headers` are plain HTTP headers.

### Make Your Format

Formats are High Order Classes that work as mixins and take care of understand what comes from your REST API responses.

To make a format, you must build `receiveSomething()` and `sendSomething()` mixins. See [src/format/](src/format/) for examples.

##### Receiver Methods:

Method | Return Type | Description
--- | --- | ---
getAcceptHeader() | `string` | Value to the `Accept` HTTP header
factory(rawResponse) | `Resource` | Parse a resource and return it's instance
factoryCollection(rawResponse) | `Resource[]` | Parse multiple resources and returns an array of instances

##### Sender Methods:

Method | Return Type | Description
--- | --- | ---
getContentTypeHeader() | `string` | Value to the `Content-Type` HTTP header
encode() | `*` | Do whatever you need with `this.attributes` before sendind it

## License

[MIT](LICENSE.md)
