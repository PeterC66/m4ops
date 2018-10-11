<!-- markdownlint-disable -->
<!-- cSpell:disable -->
# M4OPS2 Other Technical Possibilities

## Introduction

This document was where standards, procedures etc were first recorded. Eventually all active elements will have been moved to [M4OPS2-Notes, Standards and Practices](M4OPS2-NotesStandardsPractices.md), and this will be left with possibilities only. For now it includes useful technical procedures.

## Active Utility Software 


### [**Prettier**](https://prettier.io/docs/en/options.html)

  - > [<span class="underline">Prettier
    > options</span>](https://prettier.io/docs/en/options.html) – eg
    > single quotes, 2 spaces for indent

### [jq](https://stedolan.github.io/jq/) - command-line JSON processor

  - [tutorial](https://stedolan.github.io/jq/tutorial/) and
    [manual](https://stedolan.github.io/jq/manual/v1.5/) -
    see[<span class="underline">Windows section in the
    FAQ</span>](https://github.com/stedolan/jq/wiki/FAQ#windows). eg jq
    -f jqfilter01.txt \< Studies.json

### **Windows Command Prompt**, (command shell or just cmd.exe)

  - [List of
    commands](https://www.lifewire.com/list-of-command-prompt-commands-4092302)

  - stop anything running with Ctl C

  - copy using Robocopy – see Robocopy.bat, and (better to git clone?)

### Npm

  - [NPM guides](https://docs.npmjs.com/getting-started/what-is-npm);
    [Referring to specific
    versions](https://60devs.com/npm-install-specific-version.html)

  - [Useful
    npm-tricks](https://nodesource.com/blog/eleven-npm-tricks-that-will-knock-your-wombat-socks-off/)
    and
    [installing-listing-and-uninstalling-packages-using-npm](https://javascript.tutorialhorizon.com/2014/09/21/installing-listing-and-uninstalling-packages-using-npm/)

  - Some good places to search for npm modules are:
    [npmjs](http://npmjs.org/) ,
    [node-modules](http://node-modules.com/) , and
    [npmsearch](http://npmsearch.com/)

  - [What goes where](https://docs.npmjs.com/files/folders)

  - [To create and publish your first nodejs
    package](https://nodesource.com/blog/your-first-nodejs-package/)

  - To create a package.json with values that you supply, run: npm init

  - npm install -g means globally (npm list -g --depth 0 lists all
    global packages)

  - npm install --save (adds a dependency in package.json) – no longer
    needed

  - npm install --save-dev (adds a dependency but only for dev eg
    testing)

  - A package is a file or directory that is described by a
    package.json.

  - A module is any file or directory that can be loaded by Node.js'
    require().

  - Most npm packages are modules, Almost all npm packages (Node
    programs) contain many
    modules

  - [Licencing;](https://medium.com/@vovabilonenko/licenses-of-npm-dependencies-bacaa00c8c65)
    Scanning for licences: [ScanCode
    toolkit](file:///C:\\Users\\Peter_2\\Documents\\Mapping\\Software\\M4OPS2\\Documentation\\ScanCode%20is%20a%20suite%20of%20command%20line%20utilities%20to%20reliably%20scan%20a%20codebase%20for%20license,%20copyright,%20package%20manifests%20and%20direct%20dependencies%20and%20other%20interesting%20origin%20and%20licensing%20information%20discovered%20in%20source%20and%20binary%20code%20files.)

  - To update npm run “npm install npm@latest -g “then “npm audit fix”
    to fix issues

  - [Yarn or npm
    in 2018](https://blog.risingstack.com/yarn-vs-npm-node-js-package-managers/)?
    - use npm, and [in
    detail](https://scotch.io/@brian_kimo/npm-vs-yarn) or
    [here](https://www.sitepoint.com/yarn-vs-npm/) – can use
    interchangeably (with different commands)

  - [peerDependencies have to be handled
    manually](https://terrestris.github.io/react-geo-ws/first-steps/basispakete.html)
    and see
    [documentation](https://docs.npmjs.com/files/package.json#peerdependencies)

  - [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)
    makes it easy to use CLI tools and other executables hosted on the
    registry

  - Nvm and n are not available for windows

  - But a good way for being sure if you don't want to uninstall one by
    one is:
    
      - check packages json , empty node\_modules, then npm install

  - [npm link](https://docs.npmjs.com/cli/link) and [Package
    linking](https://medium.com/@alexishevia/the-magic-behind-npm-link-d94dcb3a81af)
    
      - See also [the basics of developing/testing an NPM package
        locally](https://medium.com/@the1mills/how-to-test-your-npm-module-without-publishing-it-every-5-minutes-1c4cb4b369be)

  - Dangerous to use .npmignore\!

  - [SemVer](https://docs.npmjs.com/misc/semver): and [Dependencies in
    npm](https://lexi-lambda.github.io/blog/2016/08/24/understanding-the-npm-dependency-model/)
  - see [npm semver calculator](https://semver.npmjs.com/)
      - ~version "Approximately equivalent to version" See npm semver -
        Tilde Ranges & semver (7)
    
      - ^version "Compatible with version" See npm semver - Caret Ranges
        & semver (7)
    
      - version Must match version exactly
    
      - \>version Must be greater than version
    
      - \>=version etc
    
      - \<version
    
      - \<=version
    
      - 1.2.x 1.2.0, 1.2.1, etc., but not 1.3.0
    
      - latest Obtains latest release
      - [Greenkeeper](https://greenkeeper.io/docs.html#what-greenkeeper-does) makes sure that you know when your project’s dependency updates break your code - used by the react-geo team

  - 
### [Babeljs](https://babeljs.io/) - a JavaScript compiler - use next generation JavaScript, today

  - [Try it
    out](https://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBAllApgWwjAvDA2gRgDQwBMBAzALoDcAUKJLACYgCuARgDaL0bxKoB0yAIYAHABQAPDAD4YkgFREAlBSA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=fal)
    in a browser

  - Used in both React and Node.js

### [Webpack](https://webpack.js.org/)

  - a modular bundler which can take JS, CSS, HTML, etc., and crank out
    an application folder.

  - Useful tutorial from Darren Beck [Setting up React with Webpack &
    Babel](mailto:http://www.darrenbeck.co.uk/webpack/babel/react/webpackbabel/)

### [Postman](https://www.getpostman.com/)

  - is an API development environment,

## Active Functional Software 

### Overall

  - [My original
    question](https://gis.stackexchange.com/questions/292499/recommended-starting-point-for-an-openlayers-v5-node-js-and-npm-project/292505#292505)
    – start from
    
      - [Workshop](http://openlayers.org/workshop/en/)
    
      - Examples
    
      - Working 3<sup>rd</sup> party Library



### [**React**](https://reactjs.org/)

  - is a JavaScript library for building user interfaces. It is
    maintained by Facebook

  - See full stack documentation
    above

  - [create-react-app](https://github.com/facebook/create-react-app/tree/master)
    is the official way to create a React app [User
    Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md)
    
      - Includes Async/await ; Object Rest/Spread Properties; Dynamic
        import(); Class Fields and Static Properties; JSX and
        [Flow](https://flow.org/) syntax.
    
      - See [re
        servers](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development)

  - <https://reactdom.com/react>[Learning
    React](http://www.react.express/) useful tutorial from React Express

  - we no longer use [React Router](https://reacttraining.com/react-router/), for details see [API](https://reacttraining.com/react-router/web/api/Link)
    - for code-splitting see [official method](https://reacttraining.com/react-router/web/guides/code-splitting) - an alternative for asynchronous components is [here](https://mxstbr.blog/2016/01/react-apps-with-pages/)
    - the [match object](https://reacttraining.com/react-router/web/api/match) tells the component how a Route path matched the URL (as this.props.match) - eg match.url helps us make a [relative path](https://stackoverflow.com/questions/36312453/does-react-router-support-relative-links)

  - from [Dan
    Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
    on presentation and container components
    
      - My presentational components:
        
          - Are concerned with how things look.
        
          - May contain both presentational and container components\*\*
            inside, and usually have some DOM markup and styles of their
            own.
        
          - Often allow containment via this.props.children.
        
          - Have no dependencies on the rest of the app, such as Flux
            actions or stores.
        
          - Don’t specify how the data is loaded or mutated.
        
          - Receive data and callbacks exclusively via props.
        
          - Rarely have their own state (when they do, it’s UI state
            rather than data).
        
          - Are written as functional components unless they need state,
            lifecycle hooks, or performance optimizations.
        
          - Examples: Page, Sidebar, Story, UserInfo, List.
    
      - My container components:
        
          - Are concerned with how things work.
        
          - May contain both presentational and container components\*\*
            inside but usually don’t have any DOM markup of their own
            except for some wrapping divs, and never have any styles.
        
          - Provide the data and behavior to presentational or other
            container components.
        
          - Call Flux actions and provide these as callbacks to the
            presentational components.
        
          - Are often stateful, as they tend to serve as data sources.
        
          - Are usually generated using higher order components such as
            connect() from React Redux, createContainer() from Relay, or
            Container.create() from Flux Utils, rather than written by
            hand.
        
          - Examples: UserPage, FollowersSidebar, StoryContainer,
            FollowedUserList.
  - Not using [reduxsauce](https://github.com/infinitered/reduxsauce) for tools as it provides a few tools for working with Redux-based codebases

  - We recommend using the [“Babel” language
    definition](http://babeljs.io/docs/editors) for your editor of
    choice so that both ES6 and JSX code is properly highlighted. This
    website uses the [Oceanic
    Next](https://labs.voronianski.com/oceanic-next-color-scheme/) color
    scheme which is compatible with it.

  - Discussion of [Forms in
    React](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)

  - [Sharing functions in
    React](https://stackoverflow.com/questions/32888728/correct-way-to-share-functions-between-components-in-react)

  - [React Developer Tools](https://github.com/facebook/react-devtools);
    let you inspect the component hierarchy, including component props
    and
    state.

  - [redux-devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
    in
    chrome

  - [Babel](https://babeljs.io/repl/#?presets=react&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA)

  - [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

  - There are two types of “model” data in React: props and state.
    One-way data flow

  - Consider [Code
    splitting](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#code-splitting)
    later

  - [import the
    CSS](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-stylesheet)
    into the JavaScript file like components, and Webpack handles it
    (also [images, fonts
    etc](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-images-fonts-and-files))

  - [Don’t use a CSS
    Preprocessor](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)
    ([Sass](https://sass-lang.com/guide), Less etc.)

  - May have to store [images in the public
    Folder](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-assets-outside-of-the-module-system)
    if need to dynamically reference their paths.

  - Use [Flow](http://flowtype.org/)
    ([Documentation](https://flow.org/en/docs/)) static typing see eg
    [here](https://medium.freecodecamp.org/why-use-static-types-in-javascript-part-1-8382da1e0adb)
    
      - add // @flow to any files you want to type check (for example,
        to src/App.js
    
      - npm run flow to check the files for type errors

  - add [React Router](https://reacttraining.com/react-router/)

  - Use
    [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
    for fetching resources

  - Useful:
    [the-basics-of-destructuring-props-in-react](https://medium.freecodecamp.org/the-basics-of-destructuring-props-in-react-a196696f5477)

  - Use [PropTypes](https://www.npmjs.com/package/prop-types) eg string/
    number/ bool/ func/ object/ array/arrayOf(\[type\])/ element
    /.isRequired etc
    
      - Also use
    defaultProps

  - [tagged-template-literals](https://wesbos.com/tagged-template-literals/)

  - [styling-in-react-best-practices](https://medium.com/@stephanieworkman/styling-in-react-best-practices-777f6fc5ed69)
    - Use [styled-components](https://www.styled-components.com/), or
    see
    
      - 
  - [Set up a Node.js
    server](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)
    (NOT Completed as errors)
    
      - two package.json files as The client and the server specify
        their own dependencies independently. For all intents and
        purposes, they are two completely separate apps

  - Could use [Storybook](https://storybook.js.org/) for UI component
    development (Too complicated - import ready-made)
    


### [Jest](https://jestjs.io/)is

  - JavaScript Unit Testing (p235)

  - [jasmine](http://jasmine.github.io/) is the testing language and
    jest is the test runner,
    [Enzyme](https://github.com/airbnb/enzyme/blob/master/docs/guides/jest.md)
    is a helper library, [sinon](https://sinonjs.org/#get-started) for
    stubs

  - [Function
    reference](https://facebook.github.io/jest/docs/api.html#Writing-assertions-with-expect)

  - [getting-started with
    Jest](https://jestjs.io/docs/en/getting-started)

  - see [introduction for use with
    react-scripts](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests),
    and [this from
    react-scripts](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)

  - use [within VS Code](https://github.com/jest-community/vscode-jest)

  - [Overview-of-javascript-testing, terminology and
    systems](https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2018-f68950900bc3)

### Integration testing – ignore for now

  - automation server selenium <http://www.seleniumhq.org> automated
    testing

  - framework called Nightwatch http://nightwatchjs.org

### **OpenLayers** – use v 5.1.3 (not “latest”) - mapping

#### [Useful 3rd party libraries](https://openlayers.org/3rd-party/) for OpenLayers

| **<span class="underline">Library</span>**                         | **<span class="underline">Description</span>**                                                      | **<span class="underline">Comment</span>**                                                                                                                                             | **<span class="underline">Maintainer</span>**                                                 |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [OL3-Ext](https://github.com/Viglino/ol-ext)                       | Miscellanous classes and functions for OpenLayers.                                                  | YES, [Examples](https://viglino.github.io/ol-ext/); [API](https://viglino.github.io/ol-ext/doc/doc-pages/) – see details at end of document                                            | Jean-Marc Viglino                                                                             |
| [OL-LayerSwitcher](https://github.com/walkermatt/ol-layerswitcher) | Layer control for OpenLayers.                                                                       | MAYBE                                                                                                                                                                                  | Matt Walker                                                                                   |
| [OL-Popup](https://github.com/walkermatt/ol-popup)                 | Basic popup overlay for OpenLayers.                                                                 | MAYBE                                                                                                                                                                                  | Matt Walker                                                                                   |
| [JSTS](https://github.com/bjornharrtell/jsts)                      | [JavaScript Topology Suite](https://bjornharrtell.github.io/jsts/).                                 | MAYBE – buffer, union etc                                                                                                                                                              | Björn Harrtell                                                                                |
| [OL3-Geocoder](https://github.com/jonataswalker/ol-geocoder)       | Geocoder for OpenLayers.                                                                            | MAYBE – name\>coords                                                                                                                                                                   | Jonatas Walker                                                                                |
| [OL3-ContextMenu](https://github.com/jonataswalker/ol-contextmenu) | Custom Context Menu for OpenLayers.                                                                 | MAYBE                                                                                                                                                                                  | Jonatas Walker                                                                                |
| [React OpenLayers](https://github.com/allenhwkim/react-openlayers) | A minimal React wrapper of OL 3+ written in [TypeScript](https://www.typescriptlang.org/index.html) | YES– we have cloned it; [33 others have too](https://github.com/allenhwkim/react-openlayers/network/members) -                                                                         | Allen Kim                                                                                     |
| (Used) react-geo                                                   | A set of geo related modules to use in combination with React, Ant Design UI and OpenLayers         | YES? especially [MapComponent](https://terrestris.github.io/react-geo-ws/map-integration/map-component.html) and a [useful basic workshop](https://terrestris.github.io/react-geo-ws/) | terrestris Active: [DNLKoch](https://github.com/dnlkoch/react-geo/branches), and a few others |

  - [Guidance for writing openlayers javascript
    plugins](https://stackoverflow.com/questions/49184442/good-pattern-to-write-openlayers-4-javascript-plugins)

  - Among React OpenLayers only significant action seems to be:
    
      - [ealgis](https://github.com/ealgis/ealgis) (Interactive Data
        Analysis) [keith moss](https://github.com/keithamoss)
        <keithamoss@gmail.com>
        
          - Branch: [Moving ol and React to peerDeps and cleaning unused
            packages from dev
            deps](https://github.com/ealgis/react-openlayers/tree/deps-upgrade)
        
          - Branch:
            [ealgis-integration](https://github.com/ealgis/react-openlayers/tree/ealgis-integration)
    
      - map2u, react 16, repository/bugs url and homepage
    
      - mgropp, overlay.tsx

### ES6 (ES2015 or javascript v6) – the basic (modern) language

  - <http://es6-features.org> – coding examples); [**MDN JavaScript
    Reference**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

  - From [the React
    team](https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c)
    We use the class keyword to define [JavaScript
    classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).
    There are two things worth remembering about them. Firstly, unlike
    with objects, you *don't* need to put commas between class method
    definitions. Secondly, unlike many other languages with classes, in
    JavaScript the value of this in a method [depends on how it is
    called](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Boxing_with_prototype_and_static_methods).

  - [A re-introduction to JavaScript (JS
    tutorial)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
    30 minutes refresher (and [W3schools
    summary](https://www.w3schools.com/js/js_es6.asp))
    
      - use import and export – rather than require() and module.exports
    
      - use [default export for single function modules, and named
        exports for utility
        modules](http://stackoverflow.com/questions/36795819/react-native-es-6-when-should-i-use-curly-braces-for-import/36796281#36796281)
    
      - Let (scoped), const (constant), or var
    
      - check for null objects before accessing their attributes: var
        name = o && o.getName();
    
      - caching values var name = cachedName || (cachedName =
        getName());
    
      - switch: comment deliberate fallthrough eg case 1: //
        fallthrough; case 2:
    
      - obj.details.color is equivalent to obj\['details'\]\[' color
        '\];
    
      - object prototype: function Person(name, age) {this.name = name;
        this.age = age;}
    
      - var you = new Person('You', 24); // Define an object
    
      - length of the array is one more than the highest index (not
        necessarily the number of elements)
    
      - **for** (var i = 0; i \< a.length; i++){a\[i\]} \>now\> **for**
        (const currentValue **of** a) {a} as arrays are iterable
    
      - or array.**forEach**(function(currentValue, index, array) {});
        [array
        methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
    
      - functions have access to an arguments variable - an array-like
        object holding all of the values passed
    
      - Rest parameter syntax (ellipsis )eg avg(...args) args is the
        list of uncaptured arguments
    
      - anonymous functions eg var avg = function() {); can call
        functions recursively.
    
      - JavaScript uses functions as classes
    
      - **new** creates a brand new empty object, and then calls the
        function specified, with this set to that new object. Functions
        that are designed to be called by new are called **constructor**
        functions. Common practice is to **capitalize** these functions
        as a reminder to call them with new
    
      - can modify something's prototype so add extra methods to
        existing objects at runtime
    
      - method resolution 1) the object itself 2) its Constructor
        function’s prototype property … Last) Object.prototype, whose
        methods include toString()
    
      - The first argument to apply() is the object that should be
        treated as 'this'
    
      - With call(), an object can use a method from another object,
        apply()’s arguments as an array.
    
      - nested functions can access variables in their parent function's
        scope - "local globals"
    
      - function **default** values. Eg function myFunction(x, y = 10)
        {}
    
      - the **find**() method returns the value of the first array
        element that passes a test function.eg var first =
        numbers.find(myFunction); function myFunction(value, index,
        array) {return value \> 18;}
        
          - the function takes 3 arguments: The item value, The item
            index, The array itself
        
          - findIndex() method is similar but returns the index of the
            array element
    
      - Number.isInteger() method returns true if the argument is an
        integer.
    
      - isNan() method returns true if the argument is NaN (=not a
        number)
    
      - **Arrow functions** var x = function(x, y) {return x \* y;}
        becomes const x = (x, y) =\> { return x \* y }; but they do not
        have a **this**
    
      - Keyed collections: **Maps**, Sets, WeakMaps, WeakSets
    
      - [how references work in
        JavaScript](https://medium.com/@naveenkarippai/learning-how-references-work-in-javascript-a066a4e15600)
    
      - [Template
        literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
    
      - JavaScript allows trailing commas in array literals, object
        literals, function parameters (not JSON)
    
      - [Array
        functions](https://codeburst.io/array-methods-explained-filter-vs-map-vs-reduce-vs-foreach-ea3127c6d319)
        Filter vs Map vs Reduce vs Foreach
    
      - Windows.
        [local-storage-and-how-to-use-it](https://www.smashingmagazine.com/2010/10/local-storage-and-how-to-use-it/)

### Typescript

  - [TypeScript](https://www.typescriptlang.org/index.html) – a typed
    superset of javascript – used by Angular, and the react-OL package

  - See also the second answer in [Why you should choose
    TypeScript](https://stackoverflow.com/questions/12694530/what-is-typescript-and-why-would-i-use-it-in-place-of-javascript)

### Node.js using LTS 8.11.3

  - [How to
    install](http://blog.teamtreehouse.com/install-node-js-npm-windows)
    [Guides](https://nodejs.org/en/docs/guides/);
    [API](https://nodejs.org/dist/latest-v8.x/docs/api/); and
    [API](https://nodejs.org/docs/latest-v8.x/api/fs.html)

  - [nodebeginner.pdf](file:///S:\\Not%20to%20Backup\\Other%20Tech\\nodebeginner.pdf)
    and
    [nodecraftsman.pdf](file:///S:\\Not%20to%20Backup\\Other%20Tech\\nodecraftsman.pdf)
    (see especially last chapter of part 1 for node.js and MongoDB)

  - [using-create-react-app-with-a-Node.js
    server](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)

  - [how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)

  - See also the book: Programming JavaScript Applications Robust Web
    Architecture with Node, HTML5, and Modern JS Libraries by Eric
    Elliot

  - See [module.exports vs. export default in Node.js and
    ES6](https://stackoverflow.com/questions/40294870/module-exports-vs-export-default-in-node-js-and-es6/40295288)
    for complications

#### additional packages with Node.js

  - Use packages where possible, rather than reinventing\!

  - [Nodemon](https://nodemon.io/) is a utility that will monitor for
    any changes in your source and automatically restart your server.

  - [lodash](https://lodash.com/) makes JavaScript easier for working
    with arrays, numbers, objects, strings, etc. (4.17.10)
    
      - [documentation](https://lodash.com/docs/4.17.10)
    
      - Or [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide) -
        a more functional programming (FP) friendly style
    
      - Also [futil-js](https://github.com/smartprocure/futil-js)
        complements -a collection of F(unctional) Util(ities).
    
      - Consider
        [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash)
        and
        [lodash-webpack-plugin](https://www.npmjs.com/package/lodash-webpack-plugin)
        – which are cherry-picked
    
      - [Problem with
        chain](https://medium.com/making-internets/why-using-chain-is-a-mistake-9bc1f80d51ba)

  - [dotenv](https://github.com/motdotla/dotenv#readme) - [III.
    Config](https://12factor.net/config) Store config in the
environment

### **Express -** a framework for handling HTTP requests in your Node.js application on the server.

  - [Express web framework
    (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)-
    useful from mozilla

  - [expressjs](https://expressjs.com/) the most used and most well
    known Node.js web framework

  - Includes these [Express middleware
    modules](https://expressjs.com/en/resources/middleware.html)

  - ([Difference between webpack and
    express](https://stackoverflow.com/questions/39684134/difference-between-webpack-and-express)
    )

## Other Software – will/may use

### [Reusable React components](https://hackernoon.com/the-coolest-react-ui-frameworks-for-your-new-react-app-ad699fffd651)

  - [react-bootstrap](https://react-bootstrap.github.io/) [React
    bootstrap on
    github](https://github.com/react-bootstrap/react-bootstrap) - use
    even though not 1.0.0 yet? Is v3 ([diff from
    v4](https://blog.templatetoaster.com/bootstrap-3-vs-bootstrap-4-migrate-differences/))

  - [reactstrap (=v4)](https://www.npmjs.com/package/reactstrap) – seems
    good but use Ant Design

  - [React Helmet](https://www.npmjs.com/package/react-helmet) - manage
    all of your changes to the document head??

  - [React Intl - Internationalize React
    apps](https://www.npmjs.com/package/react-intl).

### [MERN](http://mern.io/) - a scaffolding tool which makes it easy to build universal apps 

  - using Mongo, Express, React and NodeJS. We installed 2.5.0 but 3.0
    is coming. [Documentation](http://mern.io/documentation.html)

  - [Mern support on Hashnode](https://hashnode.com/n/mern)

  - [2016 React/Mern
    tutorial](https://hashnode.com/post/react-tutorial-using-mern-stack-ciiyus9m700qqge53mer0isxz)

  - Needed
    [python](https://www.howtogeek.com/197947/how-to-install-python-on-windows/)

### additional packages with Node.js

  - [**Cheerio**](https://cheerio.js.org/) (instead of
    [JQuery](https://quaintous.com/2015/07/31/jqery-node-mystery/)? –
    [useful
    comments](https://stackoverflow.com/questions/1801160/can-i-use-jquery-with-node-js))
    - fast, flexible, and lean implementation of core jQuery designed
    specifically for the server
    
      - wraps around @FB55’s forgiving
        [htmlparser2](https://github.com/fb55/htmlparser2/)
    
      - used for [web
        scraping](https://hackernoon.com/cheerio-node-nodejs-tutorial-web-html-scraping-note-a4ceb37d9cbb)

  - [body-parser
    middleware](https://github.com/expressjs/body-parser#readme)

### GitBook

  - Consider using <https://docs.gitbook.com/> for documentation

  - 
### ol-ext: Extensions for OpenLayers (ol)

  - uses npm, (not React)

  - [Examples](https://viglino.github.io/ol-ext/);
    [API](https://viglino.github.io/ol-ext/doc/doc-pages/); see code [On
    GitHub](https://github.com/Viglino/ol-ext) for how to
use

#### Styles

| **<span class="underline">Name</span>** | **<span class="underline">Description</span>**                                                                                                                       | **<span class="underline">Comment</span>** |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Font style                              | Draw points using an iconic font (font Awesome) gives you scalable vector icons that can instantly be customized (form, size, color, drop shadow) using attributes.. | YES                                        |
| Photo style                             | The ol.style.Photo is an image style to show photos or images on a map. The photos are drawn in a box and can be anchored.                                           | YES                                        |
| Statistic charts style                  | The ol.style.Chart is an image style to draw statistical graphics (bar, donut or pie charts) on a map.                                                               | MAYBE                                      |
| Statistic charts style + values         | This example show how to show values using a ol.style.Chart.                                                                                                         | MAYBE                                      |
| Fill pattern style                      | The ol.style.FillPattern is a fill style with a set of cartographic patterns to use in your maps.                                                                    | MAYBE                                      |
| Stroke pattern style                    | The ol.style.StokePattern is a stroke style with a set of cartographic patterns to use in your maps.                                                                 | MAYBE                                      |
| Scribble fill                           | The scribbleFill function calculates a MultiPolyline to fill a Polygon with a scribble effect that appear hand-made.                                                 | MAYBE                                      |

#### Animation

| **<span class="underline">Name</span>** | **<span class="underline">Description</span>**                             | **<span class="underline">Comment</span>** |
| --------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------ |
| Animated clusters                       | ol.layer.AnimatedCluster is a layer that animates clusters on zoom change. | Not working?                               |
| Feature animation                       | ol.featureAnimation provides animations to animate features on a map.      | MAYBE                                      |
| Animate features along a path           | This example animates features along a path.                               | MAYBE                                      |
| Pulse\!                                 | A pulse function to pulse points on a map.                                 | MAYBE                                      |

#### Filter

| **<span class="underline">Name</span>** | **<span class="underline">Description</span>**                      | **<span class="underline">Comment</span>** |
| --------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------ |
| Crop/mask filter                        | Filter to crop or mask a map or a layer using an area (ol.feature). | MAYBE                                      |
| Clip filter                             | Filter to clip a map or a layer.                                    | MAYBE                                      |

#### Canvas controls

| **<span class="underline">Name</span>** | **<span class="underline">Description</span>**                                                                 | **<span class="underline">Comment</span>** |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Canvas control                          | Example of canvas controls, ie. controls that are drawn on the canvas to use with export (jepg/png) functions. | YES Export                                 |
| Target control.                         | The ol.control.Target draw a target to materialize the center of the map.                                      | YES                                        |

#### Interactions

| **<span class="underline">Name</span>**  | **<span class="underline">Description</span>**                                                                  | **<span class="underline">Comment</span>** |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| An interaction to draw holes in polygons | ol.interaction.DrawHole is an interaction to draw holes in poglygon features.                                   | MAYBE                                      |
| Hover interaction                        | An interaction to do something when hovering a feature (change cursor, show a popup, display information, etc.) | YES?                                       |
| Clip interaction                         | ol.interaction.Clip clip layers by a circle on the map.                                                         | YES spy                                    |
| Dropfile interaction                     | ol.interaction.DropFile is a drag and drop interaction. It fires a loadstart and loadend and errors.            | YES                                        |

#### Control bar

| **<span class="underline">Name</span>** | **<span class="underline">Description</span>**                                                | **<span class="underline">Comment</span>** |
| --------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Control button                          | The ol.control.Button is simple control button.                                               | YES?                                       |
| Control Toggle                          | ol.control.Toggle is an ol.control.Button with an active/deactive state.                      | MAYBE                                      |
| Control bar                             | The ol.control.Bar is a panel that contains other controls. You can compose toolbars with it. | YES?                                       |
| Control subbar                          | ol.control.Bar an be bested using an ol.control.Toggle to add subbar.                         | YES?                                       |
| Edit bar                                | An example of ol.control.Bar to handle an edit toolbar.                                       | YES?                                       |

#### Controls

| **<span class="underline">Name</span>** | **<span class="underline">Description</span>**                                                | **<span class="underline">Comment</span>** |
| --------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Layer switcher control example          | Example of a layer switcher control with visibility, opacity and ordering.                    | YES                                        |
| LayerSwitcher popup                     | A simple layer switcher as a menu.                                                            | MAYBE                                      |
| Overlay menu                            | The overlay control can be used to display a menu on to of the map.                           | YES                                        |
| Overview map                            | An overview map with zoom limit and custom styles. Click on the overview will center the map. | YES                                        |
| Permalink control                       | The ol.control.Permalink is hyperlink that will return the user to the current map view.      | YES                                        |
| Swipe control                           | The ol.control.Swipe is a control that add a split screen to compare two map overlays.        | MAYBE                                      |

#### Search

| **<span class="underline">Name</span>** | **<span class="underline">Description</span>** | **<span class="underline">Comment</span>** |
| --------------------------------------- | ---------------------------------------------- | ------------------------------------------ |
| Search bar                              | A generic search bar to search on the map.     | Base                                       |
| Search feature                          | A search bar to search features on the map.    | YES                                        |

#### Popup

| **<span class="underline">Name</span>** | **<span class="underline">Description</span>**                           | **<span class="underline">Comment</span>** |
| --------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------ |
| Popup\!                                 | Show popup on a map with style.                                          | YES                                        |
| Animated popup\!                        | This example uses a CSS to add a bounce effect to the popup display.     | MAYBE                                      |
| Overlay control                         | The overlay control can be used to display information on to of the map. | MAYBE                                      |

#### Layer / source

| **<span class="underline">Name</span>** | **<span class="underline">Description</span>**                                        | **<span class="underline">Comment</span>** |
| --------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------ |
| Preview of a layer                      | Add a getPreview function to ol.layer that retrieve a preview of the layer.           | MAYBE                                      |
| Overpass source                         | ol.source.Overpass is a vector source that use the Overpass API to load OSM features. | Not working                                |
| Wikimedia Commons layer                 | ol.layer.WikiCommons is a tile vector layer that use Wikimedia Commons.               | Not working                                |

#### Mobile

| **<span class="underline">Name</span>** | **<span class="underline">Description</span>**                                              | **<span class="underline">Comment</span>** |
| --------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Draw feature using GPS                  | The ol.interaction.GeolocationDraw is a draw interaction that use the GPS to draw features. | LATER                                      |
| A control bar to record GPS tracks      | The ol.control.GeolocationBar is a control designed to record GPS tracks.                   | LATER                                      |

#### Miscellaneous

| **<span class="underline">Name</span>** | **<span class="underline">Description</span>**                                                                                                                     | **<span class="underline">Comment</span>** |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| Exif2geojson                            | A useful tool to make a GeoJSON file with all of the found GPS points in a list of images.                                                                         | LATER                                      |
| Magnify glass                           | The Magnify overlay add a "magnifying glass" effect to an OL3 map that displays a portion of the map in a different zoom (and actually display different content). | MAYBE                                      |
| Synchronize Maps                        | Synchronize maps and add an overlay to show mouse position.                                                                                                        | YES                                        |

#### Full map

| **<span class="underline">Name</span>** | **<span class="underline">Description</span>**                      | **<span class="underline">Comment</span>** |
| --------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------ |
| Clustering map                          | An example using the ol.style.Chart to display the cluster content. | Not working                                |

## Standards

### Useful guides

  - [Overview](https://codeburst.io/5-javascript-style-guides-including-airbnb-github-google-88cbc6b2b7aa)

  - [Writing Clean and Concise React Components by Making Full Use of
    ES6/7 Features and the Container-Component
    Pattern](https://hackernoon.com/writing-clean-and-concise-react-components-by-making-full-use-of-es6-7-features-and-the-container-4ba0473b7b01)
    – a few
    
      - container handles functionality and renders, component displays
        data fetched by container.
    
      - write stateless components
    
      - class properties allow defining a class property outside any of
        your class’ methods.
    
      - don’t need to call ‘super(props)’, unless you need to use
        ‘this.props’ inside the constructor.

  - [Airbnb JavaScript Style
    Guide](https://github.com/airbnb/javascript) and [Airbnb React/JSX
    Style Guide](https://github.com/airbnb/javascript/tree/master/react)
    – Excellent and full
    
      - includes eslint parameters

  - [How to write highly readable React code — 10 coding style
    tips](https://medium.freecodecamp.org/10-points-to-remember-thatll-help-you-master-coding-in-reactjs-library-d0520d8c73d8)

  - [Presentational and Container
    Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
    adds to
    [container-components](https://medium.com/@learnreact/container-components-c0e67432e005)

  - [Our Best Practices for Writing React
    Components](https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8)

  - [React Code Style
    Guide](https://css-tricks.com/react-code-style-guide/) - OK
    
      - Destructure your props
    
      - One tag, one line – a one line way to define a simple tag
    
      - The rule of 3's - If you have three or more properties, then put
        them each on their own line
    
      - plus more

  - [Clean Code vs. Dirty Code: React Best
    Practices](https://americanexpress.io/clean-code-dirty-code/)
    
      - Add comments only to explain complex thoughts; rename some of
        the functions to better describe what they do, thus eliminating
        the need for comments

  - [React components naming
    convention](https://hackernoon.com/react-components-naming-convention-%EF%B8%8F-b50303551505)

  - [How To Write Better Code In
    React](https://blog.bitsrc.io/how-to-write-better-code-in-react-best-practices-b8ca87d462b0)

  - [The twelve-factor app](https://12factor.net/) is a methodology for
    building software-as-a-service apps (not now)

### Other

## Deployment

### Useful guides

  - See Nate Murray, PDF [30 Days of
    React](file:///S:\\Not%20to%20Backup\\Other%20Tech\\30-days-of-react-ebook-fullstackio.pdf)
    (last parts)

  -
