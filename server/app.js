/**
 * The Server Can be configured and created here...
 *
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require('./data');
const http = require('http');
const hostname = 'localhost';
const port = 3035;
const url = require('url');

/**
 * Start the Node Server Here...
 *
 * The http.createServer() method creates a new server that listens at the specified port.
 * The requestListener function (function (req, res)) is executed each time the server gets a request.
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */

const findSome = valuetoSearch => tag => {
  return tag.substr(0, valuetoSearch.filter.length) === valuetoSearch.filter;
};
const filterBy = valuetoSearch => elements => {
  return elements.tags.some(findSome(valuetoSearch));
};

http
  .createServer(function(req, res) {
    // Allow Cors Policy
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Max-Age': 2592000 // 30 days
      /** add other headers as per requirement */
    };

    if (req.method === 'OPTIONS') {
      res.writeHead(204, headers);
      res.end();
      return;
    }

    if (['GET', 'POST'].indexOf(req.method) > -1) {
      // .. Here you can create your data response in a JSON format
      var valuetoSearch = url.parse(req.url, true).query;
      const responseData = data.filter(filterBy(valuetoSearch));
      res.writeHead(200, headers);
      res.write(JSON.stringify(responseData)); // Write out the default response
      res.end(); //end the response
      return;
    }
  })
  .listen(port);

console.log(`[Server running on ${hostname}:${port}]`);
