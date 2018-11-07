# Lessons from the web

## From Bruno Krebs

[Vue.js and AWS Lambda: Developing Production-Ready Apps (Part 1)](https://auth0.com/blog/vue-js-and-lambda-developing-production-ready-apps-part-1/)
TL;DR: In this series, you will use modern technologies like Vue.js, AWS Lambda, Express, MongoDB, and Auth0 to create a production-ready application that acts like a micro-blog engine. The first part of the series (this one) will focus on the setup of the Vue.js client that users will interact with and on the definition of the Express backend app.

[**AWS Lambda**](https://aws.amazon.com/lambda/) needs [AWS API Gateway](https://aws.amazon.com/api-gateway/) to define how external services (or, in this case, a Vue.js client) can communicate with your serverless backend app - makes AWS Lambda not straightforward. So use an open-source tool called [**Claudia**.js](https://claudiajs.com/). Otherwise [see this](https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started-with-lambda-integration.html) and [this](https://ig.nore.me/2016/03/setting-up-lambda-and-a-gateway-through-the-cli/).

Popular Express middleware to define your backend endpoints

- [bodyParser](https://github.com/expressjs/body-parser) (have) - Express middleware that parses request bodies so you can access JSON objects sent by clients
- [cors](https://github.com/expressjs/cors) (have) - Express middleware to make your endpoint accept cross-origin requests
- [**helmet**](https://github.com/helmetjs/helmet) - Express middleware that helps to secure your apps with various HTTP headers
- [**morgan**](https://github.com/expressjs/morgan) - HTTP request logger middleware for Node.js web apps
- [mongodb](https://github.com/mongodb/node-mongodb-native) (we use mongoose??) - the MongoDB **native driver** for Node.js;

[Auth0](https://auth0.com) Identity-as-a-Service (IDaaS) - consider for inclusion later

Uses Folders: client and backend

Uses Docker to begin with for Mongodb, but later MLab so we ignore Docker.

[Vue.js and AWS Lambda: Developing Production-Ready Apps (Part 2)](https://auth0.com/blog/vue-js-and-lambda-developing-production-ready-apps-part-2/)

Create (m4ops@one-place-studies.org) accounts with:

- AWS ( see also ...\Guiding documents\AWS S3 for storing maps.doc)
- Auth0 (for later)
- MongoDB Atlas (mLab is merging with them)

Now we use nodemon src/appd to start development server (Lambda server is at src/app)

[The Most Popular Deployment Tools For Serverless](http://blog.epsagon.com/the-most-popular-deployment-tools-for-serverless)
[Why serverless newbies should use a deployment framework](https://dev.to/paulswail/why-serverless-newbies-should-use-a-deployment-framework-3ea4) recommends [Serverless Framework](https://github.com/serverless/serverless)