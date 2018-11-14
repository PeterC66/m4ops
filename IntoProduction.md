# Lessons from the web

## From Bruno Krebs

[Vue.js and AWS Lambda: Developing Production-Ready Apps (Part 1)](https://auth0.com/blog/vue-js-and-lambda-developing-production-ready-apps-part-1/)
TL;DR: In this series, you will use modern technologies like Vue.js, AWS Lambda, Express, MongoDB, and Auth0 to create a production-ready application that acts like a micro-blog engine. The first part of the series (this one) will focus on the setup of the Vue.js client that users will interact with and on the definition of the Express backend app.

[**AWS Lambda**](https://aws.amazon.com/lambda/) needs [AWS API Gateway](https://aws.amazon.com/api-gateway/) to define how external services (or, in this case, a Vue.js client) can communicate with your serverless backend app - makes AWS Lambda not straightforward. So use an open-source tool called [**Claudia**.js](https://claudiajs.com/). Otherwise [see this](https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started-with-lambda-integration.html) and [this](https://ig.nore.me/2016/03/setting-up-lambda-and-a-gateway-through-the-cli/).

To see what is happening in Lambda, and console messages, use AWS CloudWatch in the region we used (us-east-1). [prices](https://aws.amazon.com/cloudwatch/pricing)

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

Created (m4ops@one-place-studies.org) accounts with:

- AWS ( see also ...\Guiding documents\AWS S3 for storing maps.doc)
- Auth0 (for later)
- MongoDB Atlas (mLab is merging with them)

Now we use nodemon src/appd to start development server (Lambda server is at src/app)

[The Most Popular Deployment Tools For Serverless](http://blog.epsagon.com/the-most-popular-deployment-tools-for-serverless)
[Why serverless newbies should use a deployment framework](https://dev.to/paulswail/why-serverless-newbies-should-use-a-deployment-framework-3ea4) recommends [Serverless Framework](https://github.com/serverless/serverless)

See [MongoDB Atlas implementation](NotesStandardsPractices.md#mongodb-atlas-implementation)
[Best Practices Connecting from AWS Lambda](https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/)

[Claudia and Express](https://claudiajs.com/tutorials/serverless-express.html) (now we use node v8.11.3)
Use the claudia CLI tool to prepare a serverless proxy around Express API:
claudia generate-serverless-express-proxy --express-module src/app

Then using [claudia create](https://github.com/claudiajs/claudia/blob/master/docs/create.md):

claudia create --handler lambda.handler --deploy-proxy-api --region us-east-1 --set-env-from-json prod.json

us-east-1 is Virginia

To re-create use
claudia update --set-env-from-json prod.json

See [our lambda](https://q91jlbi9al.execute-api.us-east-1.amazonaws.com/latest/continents)
 **check costs** !!!

[**Check this**](https://mongoosejs.com/docs/lambda.html)
[Useful](https://dev.to/saigowthamr/build-and-deploy-a-rest-api--using-serverless-express-and-nodejs-3331)
[Also](https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas)

## Environment Variables

### General

- [How to handle environment-specific settings in your JavaScript apps](https://medium.freecodecamp.org/environment-settings-in-javascript-apps-c5f9744282b6)
- [Working with Environment Variables in Node.js](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)
- [Implement NodeJS environment variables in a modern Webpack app](https://itnext.io/implement-nodejs-environment-variables-in-a-modern-webpack-app-df20c27fe5f0)

### On Server

- the environment variables we need are defined in .env.example ( as used by dotenv-safe)
  - PORT (only needed in development)
  - MONGO_DB_URL [see doc](https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options)
- they are read before, or very early in, app.js starts
- console.log(process.env) shows them

#### Server: Development (on PC)

- we use [dotenv-safe](https://github.com/rolodato/dotenv-safe) to read from .env (untracked), and this is called if MONGO_DB_URL is not already set
- they include (but we do not use) all the windows environment variables such as PATH

#### Server: Production

- We use Claudia/AWS Lambda
- .aws/credentials is stored in %UserProfile% (ie Peter)
- environment variables are all in prod.json
- these are read by claudia via --set-env-from-json

### On Client

- In the client we use Vue CLI 3 standards - see [VueCLI 3: Environment Variables and Modes](https://cli.vuejs.org/guide/mode-and-env.html)
  - .env                # loaded in all cases
  - .env.local          # loaded in all cases, ignored by git
  - .env.[mode]         # only loaded in specified mode
  - .env.[mode].local   # only loaded in specified mode, ignored by git
  - (where [mode] is development, production or test)
  - Only variables that start with **VUE_APP_** will be available (via process.env. ), plus BASE_URL & NODE_ENV
  - Computed env vars can be in vue.config.js (still prefixed with VUE_APP_)
- the older Vue CLI 2 had a config directory with dev.env.js and prod.env.js

#### Client: Development (on PC)

#### Client: Production
