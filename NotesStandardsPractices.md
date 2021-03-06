# M4OPS2 Notes Standards and Practices

- [Overview](#overview)
  - [Notes on this document](#notes-on-this-document)
- [Some useful Terminology](#some-useful-terminology)
- [The stack](#the-stack)
- [Folder and File set-up](#folder-and-file-set-up)
- [Naming conventions](#naming-conventions)
- [Visual Studio Code](#visual-studio-code)
  - [VSCode extensions used](#vscode-extensions-used)
  - [GIT for source code version control](#git-for-source-code-version-control)
  - [Eslint for proofing code](#eslint-for-proofing-code)
  - [Configuring eslint](#configuring-eslint)
- [Documenting](#documenting)
- [HTML5 standards](#html5-standards)
- [JS and ES6 standards](#js-and-es6-standards)
  - [Special functions and routines](#special-functions-and-routines)
  - [Regular Expressions](#regular-expressions)
- [Node](#node)
  - [Making an npm package](#making-an-npm-package)
    - [Looking after vfg-display-fields](#looking-after-vfg-display-fields)
      - [Set up](#set-up)
    - [Maintenance](#maintenance)
- [Client Overview](#client-overview)
  - [The Starting point](#the-starting-point)
- [Vue.js](#vuejs)
  - [Scoped Slots](#scoped-slots)
  - [Complex components](#complex-components)
  - [Vue Router](#vue-router)
    - [M4OPS2 URL structure](#m4ops2-url-structure)
      - [path parameters](#path-parameters)
      - [Examples](#examples)
      - [query parameters](#query-parameters)
      - [Other M4OPS parameters](#other-m4ops-parameters)
  - [Events](#events)
  - [Vuex](#vuex)
    - [Vuex plugins](#vuex-plugins)
    - [Typescript in Vue](#typescript-in-vue)
  - [HTTP Requests](#http-requests)
  - [Authorisation](#authorisation)
    - [Our structure](#our-structure)
    - [Client system](#client-system)
    - [Server system](#server-system)
      - [JSON Web Tokens (JWT)](#json-web-tokens--jwt-)
      - [General Server system](#general-server-system)
    - [Management](#management)
    - [Other Approaches](#other-approaches)
  - [Demo](#demo)
  - [Icons](#icons)
  - [CSS](#css)
  - [Useful components](#useful-components)
    - [Dates and Times](#dates-and-times)
    - [Buefy](#buefy)
    - [Element UI components](#element-ui-components)
    - [Vue Slider Component](#vue-slider-component)
    - [Vue Forms](#vue-forms)
      - [Plain](#plain)
      - [VueFormGenerator](#vueformgenerator)
        - [VFG documentation](#vfg-documentation)
      - [Other on forms](#other-on-forms)
    - [Colors/Colours](#colors-colours)
    - [Modals](#modals)
      - [Our Modals structure](#our-modals-structure)
    - [Other Vue aspects](#other-vue-aspects)
  - [Standards and styles](#standards-and-styles)
  - [Vue CLI 3](#vue-cli-3)
- [Sources of truth](#sources-of-truth)
  - [Current OPSCode](#current-opscode)
  - [Current User](#current-user)
  - [Current Chosen Layers](#current-chosen-layers)
- [Babel](#babel)
- [Bundler - Webpack](#bundler---webpack)
- [Debugging](#debugging)
- [Testing](#testing)
- [OpenLayers](#openlayers)
  - [OL and Vue](#ol-and-vue)
  - [Projections](#projections)
    - [Projections - Background](#projections---background)
    - [Projections - Basics](#projections---basics)
    - [Projections - What we do](#projections---what-we-do)
- [Server Overview](#server-overview)
  - [Routes](#routes)
  - [Connecting to MongoDB](#connecting-to-mongodb)
  - [Notes](#notes)
- [MongoDB](#mongodb)
  - [Imports into MongoDB](#imports-into-mongodb)
  - [To create Places.json](#to-create-placesjson)
  - [Mongoose](#mongoose)
- [Environment Variables](#environment-variables)
  - [Envars General](#envars-general)
  - [Envars on Server](#envars-on-server)
    - [Envars on Server: PC Development](#envars-on-server--pc-development)
    - [Envars on Server: Production](#envars-on-server--production)
  - [Envars on Client](#envars-on-client)
- [Into Production](#into-production)
  - [Principles](#principles)
  - [Guidance](#guidance)
  - [Into Production - Client](#into-production---client)
    - [Client Build](#client-build)
    - [Client Upload to AWS](#client-upload-to-aws)
  - [Into Production - Server](#into-production---server)
    - [AWS Lambda](#aws-lambda)
    - [Claudia](#claudia)
  - [General](#general)
  - [Useful but not used](#useful-but-not-used)
  - [Into Production - Database](#into-production---database)
    - [MongoDB Atlas implementation](#mongodb-atlas-implementation)
- [Other Notes](#other-notes)

[Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)

## Overview

This is an eclectic, pragmatic working document to help me remember how to do things, and evolving as I get more experience (or change technologies!). It has lots of links for useful reference. Be aware that although the intention is there, it is likely that at any time the code will not meet the standards by a long way. There is also lots of stuff here that I do not understand yet!

Whilst the codebase represented here is usually a working system, there is currently quite a bit of the code that is non-functional or not yet working, because it is:

- redundant
- in process of being adopted from v1 of M4OPS
- experimental, or
- under development

These files are excluded from linting by virtue of

- being in a folder called "unused" (per src/.eslintignore)
- being in a folder with the word OLD in the name (per src/.eslintignore, or
- starting with the line /* eslint-disable */

Although fairly complex, this is a simplified approach to aid understanding, development and maintenance, and has been adapted in the light of experience. See other possibilities in [M4OPS2 Other Technical Possibilities](M4OPS2OtherTechnicalPossibilities.md), although as we go on any that are actually used will be moved from there into this document.

### Notes on this document

- To see diagrams you need [mermaid](https://mermaidjs.github.io/) installed
- Do not use , ( ) / in headings else links from TOC will not function without manual change

## Some useful Terminology

- Semantic versioning (**semver**) - Change major number when it may break existing usages

- a software **stack** is a set of software subsystems or components needed to create a complete platform such that no additional software is needed to support applications

- **polyfill** - a snippet of code that patches a piece of functionality that's missing in some browsers.
  - **ponyfill** provides that functionality as a standalone module you can use – see [this discussion](https://ponyfoo.com/articles/polyfills-or-ponyfills)

- Function **currying** is the process of successive partial applications, until the last argument is given at which point the result of the function is returned

- [**functional programming**](https://en.wikipedia.org/wiki/Functional_programming) is a style of building computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data. In contrast, imperative programming changes state with commands in the source code, the simplest example being assignment. (Ignore as too complex?)

- A [**closure**](https://stackoverflow.com/questions/111102/how-do-javascript-closures-work) is the combination of a function and the scope object in which it was created. Closures let you save state — as such, they can often be used in place of objects. (Not used here)

- **CRUD** - create, read, update, and delete

- **REST** stands for Representational State Transfer -The fundamental concept within REST is that of a resource - the object we are operating on. For each resource we define what methods can operate on that resource. Methods such as GET, POST, UPDATE, DELETE.

- **HOC** - [higher-order component](https://reactjs.org/docs/higher-order-components.html) - a function that takes a component and returns a new component (used in React), compare in Vue.js ..
- In a **mixin** you can put any component’s methods and they will be merged with the ones of the component that uses it.

- a **variadic function** is one of indefinite arity, i.e., one which accepts a variable number of arguments

- Parentheses, Braces, or Brackets?
  - Round: Parentheses () for function calls, conditional statements, or enforcing Order of Operations.
  - Curly: Braces {} for the declaration of Object Literals, or to enclose blocks of code
  - Square: Brackets \[\]for accessing the properties of an Object (or the elements of an Array)

- **ORM** - Object-relational mapping for converting data between object-oriented and relational forms

- [Duck Typing](http://adripofjavascript.com/blog/drips/using-duck-typing-to-avoid-conditionals-in-javascript.html) is better than using instanceof

- **memoization** (memoisation) is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

- a [**Promise**](https://codeburst.io/a-simple-guide-to-es6-promises-d71bacd2e13a) is an object that is used as a placeholder for the eventual results of a deferred (and possibly asynchronous) computation.

- **PWA** (Progressive Web Apps)
  - a hybrid of regular web pages (or websites) and a mobile application
  - see [4 important points to know about Progressive Web Apps (PWA)](https://medium.com/@deepusnath/4-points-to-keep-in-mind-before-introducing-progressive-web-apps-pwa-to-your-team-8dc66bcf6011)
  - the Service Worker is a script that the browser runs in the background separate from web page is the backbone of every PWA
  - also Accelerated Mobile Pages (AMP) provides reliably fast web components for first load

- **BEM** - "Block, Element, Modifier” naming convention - see [Introducing BEM: The popular CSS naming convention](https://assortment.io/posts/introducing-bem-css-naming-convention)

- **VNode** - a “virtual node” containing information (returned by createElement) describing to Vue what kind of node it should render on the page, including descriptions of any child nodes. The entire tree of VNodes is called the “Virtual DOM”.

## The stack

The main stack is

- the client: OpenLayers, Vue.js (and Vuex), Webpack
- \<-via REST API-\>
- the server: Express, Node
- database: MongoDB

- see [Build full stack web apps with MEVN Stack](https://medium.com/@anaida07/mevn-stack-application-part-1-3a27b61dcae0) and [Part 2](https://medium.com/@anaida07/mevn-stack-application-part-2-2-9ebcf8a22753)

## Folder and File set-up

``` bash
**client** Folder Structure
├── dist - result of the build process
├── public
├── src
└── tests (TODO)

**public** Folder Structure
├── index.html (main entry point, includes  \<div id="app"></div> into which the whole app is injected by main.js)
├──  ...
├── OPS (one folder for each OPS)
│   ├── HcN - all the images, html files etc used for HcN in M4OPS
│   ├── HNB
│   └── ...
└── img (used by the system)
    └── ...

**src** Folder Structure: based on [How to Structure a Vue.js Project](https://itnext.io/how-to-structure-a-vue-js-project-29e4ddc1aeeb)
├── main.js - the first script loaded
├── App.vue - the first Vue component - contains all the others router.js
├── router.js - 'routes' URLs to views
├── assets - any assets that are imported into components
│   └── ...
├── components - All the components that are not routed (ie not views)
│   └── ...
├── global
│   ├── components - a few that are generic, and potentially used anywhere
│   │   └── ...
│   ├── constants ... system-wide
│   ├── utils ... functions used in various places
│   ├── plugins - TODO
│   │   └── ...
│   └── styles - any not included in SFCs
│       └── ...
├── initialising (used on first load)
│   └── ...
├── modules - for routines by application area (will change) - each potentially has index.js, components, submodules, utilities
│   ├── demo - to do
│   ├── framework - header, sidebar
│   ├── geography - ??
│   ├── mapping
│   └── params - parameters to the URL
├── store
│   ├── index.js - where we assemble modules and export the store
│   ├── mutation-types.js - Vuex constants
│   └── modules - each potentially has index.js, components, submodules, utilities
│       ├── ...
│       └── vuexApi - getters etc but no index.js
├── translations - Locales files (for eg using Vue-i18n) TODO
│   └── index.js
├── views - the components that are routed in router.js eg  xxx/dashboard
│   └── ...
└── other folders ... such as filters,or constants, API.

**server** src Folder Structure
├── controllers - the various 'find' functions to get data from the database
├── middleware TODO
├── models - defining the Mongoose/MongoDB schemas
└── routes - the routes from the URL to the controllers
```

Notes: Each folder

- can have a README.md file describing it
- can have .gitignore for files to be excluded from git
- can have .eslintignore for files to be excluded from eslint
- can have .eslintrc.json to direct eslint and give it parameters

Our OPS images etc go in the public folder - see [this](https://cli.vuejs.org/guide/html-and-static-assets.html#the-public-folder)

- storing them in the MongoDB database would use up space too much???
- consider [Fractal Project Structure](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure)

## Naming conventions

See under [Standards and styles](#standards-and-styles)

## Visual Studio Code

- Our main development environment is VSCode - intelligent code editing
- [Documentation](https://code.visualstudio.com/docs?start=true) and [Chrome debugging in VSCode](https://github.com/Microsoft/vscode-chrome-debug/blob/master/README.md#troubleshooting)
- a workspace (defined by an editable workspace file) is defined to be one or more folders and VSCode settings - we will not use them, unless it becomes necessary
- Note that almost all VSCode settings (including cSpell words) are done at the **folder** level (eg in C:\projects\m4ops\.vscode\settings.json), rather than at the User (C:\Users\Peter2\AppData\Roaming\Code\User) or workspace level
- Similarly for ESLint
- as the VSCode shell defaults to PowerShell on Windows 10 we set the terminal.integrated.shell.windows in user settings to "C:\\Windows\\System32\\cmd.exe"
- Use Ctrl+Shift+P for the list of commands (Ctrl+S to save - but we have set it to save automatically), and use Ctrl+space for **context-sensitive snippets** (or start typing)
- Ctrl+/ toggles lines as comments
- For documentation and markdown see separate [Documenting](#Documenting) section below
- Useful about [Node.js and Express](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial) in VSCode
- [VS Code can do that?!](https://vscodecandothat.com/)

### VSCode extensions used

- (See them in C:\Users\USER\.vscode\extensions)
- Using [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  - can Enable / Disable checking sections of code with // cSpell:disable
  - Includes [Emmet](https://docs.emmet.io/) - snippets etc (not used much)
- [Read Only indicator](https://github.com/alefragnani/vscode-read-only-indicator)
- [Vetur Vue tooling for VS Code](https://vuejs.github.io/vetur/)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- [ESlint](#eslint-for-proofing-code) - see below
- [GitLens](https://github.com/eamodio/vscode-gitlens/#gitlens-explorer) for examining the git history of files
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [Markdown Preview Github Styling]
- [Markdown Preview Mermaid Support]
- [vscode-babel-coloring]
- [dotenv]
- [debugger-for-chrome]
- [JSON to JS converter]
- [vue-snippets]
- [vue-peek]

### GIT for source code version control

- [GitHub](https://github.com/) P6 XXXX is the git server where my projects are

- [Projects on GitHub](https://github.com/explore); [GitHub Marketplace](https://github.com/marketplace); [Help](https://help.github.com/); free to use for public and open source projects

- With [gists](https://help.github.com/articles/about-gists/), you can share single files, parts of files, and full applications - powered by [CodeMirror](https://codemirror.net/).

- On forking see [How to fork a dependency and use it locally in a project](https://medium.com/@chrisdmasters/how-to-fork-a-dependency-and-use-it-locally-in-a-project-707c80d3449c), [npm link](https://docs.npmjs.com/cli/link) and [Package linking](https://medium.com/@alexishevia/the-magic-behind-npm-link-d94dcb3a81af)
  
  - and even [creating your own project from a fork](https://stackoverflow.com/questions/18390249/github-make-fork-an-own-project)
  - and [keeping it up to date](https://stackoverflow.com/questions/20984802/how-can-i-keep-my-fork-in-sync-without-adding-a-separate-remote/21131381#21131381)

  - we have the very helpful **Pro Git** PDF book, written by Scott Chacon and Ben Straub - then follow up with [Git support in VSCode](https://code.visualstudio.com/docs/editor/versioncontrol#_git-support)

- [Excellent Tutorial/Reference on git and GutHub](https://kbroman.org/github_tutorial/) - [commands](https://github.com/kbroman/Tools4RR/blob/master/04_Git/GitCommands/git_notes.md), [cheat sheet](https://git-scm.com/docs/)
- GIT locally on [GIT for Windows](https://gitforwindows.org/)
  - as GitHub Desktop is not for use from outside
  - Chose option to checkout Windows-style
  
- [Issues](https://guides.github.com/features/issues/) are suggested improvements -each contains its own discussion forum, [Glossary](https://help.github.com/articles/github-glossary/)

- [Pull requests (PRs)](https://help.github.com/articles/about-pull-requests/) let you tell others about changes you've pushed to a branch (ie you are Requesting that they Pull from your repository)

- [To clone a repository from GitHub to local](https://help.github.com/articles/cloning-a-repository/) (don't create folder first)

- [GitHub Guides](https://guides.github.com/); [Learn Git and GitHub](https://medium.freecodecamp.org/how-you-can-learn-git-and-github-while-youre-learning-to-code-7a592ea287ba)
- [draft pull requests](https://github.blog/2019-02-14-introducing-draft-pull-requests/)
- [Useful guide to git protocol](https://medium.com/@francesco.agnoletto/how-to-not-f-up-your-local-files-with-git-part-1-e0756c88fd3c) and [Learn Version Control with Git](https://www.git-tower.com/learn/git/ebook/en/desktop-gui/basics/what-is-version-control#start)
- A [Git blob (binary large object)](https://developer.github.com/v3/git/blobs/#git-blobs) is the object type used to store the contents of each file in a git repository.

- Notes
  - Initialise repository for this project, or "clone" (=download / copy) one to your local computer
  - A [helpful compilation of ignore rules](https://github.com/github/gitignore)
  - Files are "untracked" (not under version control, yet), or "tracked" - Git watches for changes
  - Commit Only Related Changes: Working copy \> Staged (ready for commit) \> Local Repository
  - Write Good Commit Messages
  - Use Branches Extensively - for new features, bug fixes, experiments, ideas: it is quick and easy
  - Never Commit Half-Done Work
  - Think of Stashes as a clipboard on steroids: it takes all the changes in your working copy and saves them for you, leaving a clean working copy. Later, you can restore the changes from that clipboard in your working copy current HEAD branch - and continue working where you left off.
  - You can merge (one branch into another - HEAD) as often as you like
  - One Long-Running Branch Only - your production code- all new topic branches are based off (and merged into) this "master" branch
  - A "[Submodule](https://www.git-tower.com/learn/git/ebook/en/desktop-gui/advanced-topics/submodules#start)" is just a standard repository (pointing to a specific commit) nested inside a parent repository. To include a code library, you can simply add it as a Submodule in your main project.
- Our simple workflow is (using Ctrl-Shift-P each time)
  - Checkout to...
  - +Create new branch - give it a name (XXX)
  - Do work until system is working OK
  - Checkout to Master branch
  - Merge branch XXX (into Master branch)
  - Delete branch XXX
- Every now and then publish changes (to [origin](https://github.com/PeterC66/m4ops))
- to remove them from tracking: put filename in .gitignore AND remove history using git rm filename --cached
- More on [fork and pull](https://www.openstreetmap.org/user/alexkemp/diary/47452)

### Eslint for proofing code

- [Set up guide](https://travishorn.com/setting-up-eslint-on-vs-code-with-airbnb-javascript-style-guide-6eb78a535ba6) includes style –uses [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) (-base for non-react)
  - npm i -D eslint eslint-plugin-import (not eslint-config-airbnb-base ?)
- Tried using Prettier rather than a style guide, but complications

- Note that we don't use [setting up global eslint in VSCode](https://medium.com/@davidchristophersally/how-to-set-up-eslint-in-vscode-globally-253f25fbaff9) (because create-react requires it local)

- Note that any plugins or shareable configs that you use must also be installed locally to work with a locally-installed ESLint

- Vue and EsLint

- See [eslint-prettier-vue-workflow](https://medium.com/@doppelmutzi/eslint-prettier-vue-workflow-46a3cf54332f) - seems good but not actually tried
  - [Eslint plugin for Vue](https://github.com/vuejs/eslint-plugin-vue)
  - See especially [How to integrate ESLint with Vue.js and Vetur in Visual Studio Code](https://alligator.io/vuejs/eslint-vue-vetur/)
- Also installed Vue 2 Snippets, Vue Peek
- To run on all files in eg client/src folder use "../node_modules/.bin/eslint" . (but see .eslintignore below)
  - Note that "npm run lint" runs "vue-cli-service lint" - which probably has different eslint options set

### Configuring eslint

- See [guide to configuring](https://eslint.org/docs/user-guide/configuring)
- [List of rules](https://eslint.org/docs/rules/)
- We do use some [Configuration (in-file) comments](https://eslint.org/docs/user-guide/configuring.html#disabling-rules-with-inline-comments))
  - /* eslint-disable */ or // eslint-disable-next-line or // eslint-disable-line
    - for rules eg no-console, max-len
    - can just right click in VSCode to implement this
- We do not use the eslintConfig field, but do use .eslintrc.json files
  - /m4ops/.eslintrc.json has the basic configuration that applies to both client and server code
    - do not include any rules (even common ones) as the whole rules object is overwritten by that in either the client or server file
  - /m4ops/client/.eslintrc.json has any specific configuration needed for the client (Vue) system, including rules
    - in particular it has the kebab-case names of imported components, for which the PascalCase rule is ignored
  - /m4ops/server/.eslintrc.json is similar for the server (Express) system, including rules
- We also use an /m4ops/.eslintignore file in any folder we run eslint in (note that [only one such file is used](https://eslint.org/docs/user-guide/configuring#eslintignore))
  - for patterns see [gitignore](https://git-scm.com/docs/gitignore#_pattern_format)

## Documenting

- (eg this) use [GitHub flavoured markdown](https://github.github.com/gfm/) (gfm)  - [Mastering GitHub flavoured markdown](https://guides.github.com/features/mastering-markdown/)
- [Markdown quick reference](https://www.markdownguide.org/cheat-sheet) (not GitHub), see also [Writing on GitHub](https://help.github.com/categories/writing-on-github/)

- see also [markdown cheat sheet](https://www.makeuseof.com/tag/printable-markdown-cheat-sheet/)

- lint using [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) - see also [configuration](https://github.com/DavidAnson/markdownlint#configuration)

- could use [markdown-style-guide](http://www.cirosantilli.com/markdown-style-guide/) but not easily linted in VSCode so stick with [markdownlint RULES](https://github.com/markdownlint/markdownlint/blob/master/docs/RULES.md)

- use [mermaid](https://mermaidjs.github.io/) in markdown for charts - Flowchart, Sequence diagram, Gantt diagram - but GitHub does not use mermaid

- use [pandoc](https://pandoc.org/index.html) to convert from Word to markdown– see [User Guide](https://pandoc.org/MANUAL.html), but as we have permissions problems so **as cmd Admin user**:
  - cd C:\\Users\\Peter Admin\\AppData\\Roaming\\pandoc, and do everything there
  - pandoc -f docx -t gfm “C:\\Users\\Peter\_2\\Documents\\Mapping\\Software\\M4OPS2\\Documentation\\filename.docx” -o filename.md
- for relative links use \[a relative link\](other\_file.md)
- ??Use [VuePress](https://medium.com/@charlesouellet/deep-dive-into-vuepress-craft-a-clean-documentation-blog-de6ac8e0c917), a [Vue-powered Static Site Generator](https://vuepress.vuejs.org/)
- [Percolate](https://github.com/danburzo/percollate) - A command-line tool to turn web pages into beautifully formatted PDFs

## HTML5 standards

- See [html5doctor's tag/element-index](http://html5doctor.com/element-index/) and [their flow chart](h5d-sectioning-flowchart.png) for use of \<section\> etc
- [Learn to Code HTML & CSS](https://learn.shayhowe.com/html-css/) - the fundamentals
- [Learn to Code Advanced HTML & CSS](https://learn.shayhowe.com/advanced-html-css/performance-organization/)
- [HTML Living Standard](https://html.spec.whatwg.org/multipage/)
- [HTML etc Cleanup](https://www.10bestdesign.com/dirtymarkup/)

## JS and ES6 standards

- [Excellent documentation/tutorial](https://javascript.info/)
- [Roadmap for learning the JavaScript language ES3++](https://bytearcher.com/articles/roadmap-for-learning-javascript-language/) - see MDN links for basic syntax, functions, object literals, arrays, regular expressions, prototypal inheritance
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- useful book - [Exploring ES6](http://exploringjs.com/es6/) covers every level
- [useful list of es6 features](https://github.com/lukehoban/es6features)
- newline between dependency imports and local imports
- in Node.js continue to use  module.exports (or just exports.) and  require rather than export and import
- (NOT YET) could use object literals instead of switch statements as per [this suggestion](https://medium.com/chrisburgin/rewriting-javascript-replacing-the-switch-statement-cfff707cf045)
- Add comments only to explain complex thoughts
- Boolean variables, or functions that return a boolean value, should start with 'is', 'has' or 'should'
- use [has()](https://www.npmjs.com/package/has) instead of hasOwnProperty as it is better
- (someone says we don't need to call `super(props)`, unless you need to use `this.props` inside the constructor)
- Could use [Flow](http://flowtype.org/) for typing
    ([Documentation](https://flow.org/en/docs/)) for static typing see eg [here](https://medium.freecodecamp.org/why-use-static-types-in-javascript-part-1-8382da1e0adb)
  - add // @flow to any files you want to type check (for example, to src/App.js (TO DO)
  - npm run flow to check the files for type errors
- for (ES6) maps and collections
  - [new ES6 standard maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), and
  - [what-you-should-know-about-es6-maps](https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e)
  - excellent [article about maps](https://flaviocopes.com/javascript-data-structures-map/)
  - [array-vs-set-vs-map-vs-object](https://codeburst.io/array-vs-set-vs-map-vs-object-real-time-use-cases-in-javascript-es6-47ee3295329b)
  - Note that we often use [k, v] meaning key, value
  - The [collections.js](http://www.collectionsjs.com/) package provides JavaScript implementations of common collections, with many useful features but they are less relevant now we have maps
- for [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
  - [ES6 Arrow Functions: Fat and Concise Syntax in JavaScript](https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/)
  - [Flowchart for arrow functions](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/fig1.png)
  - [When (and why) you should use ES6 arrow functions — and when you shouldn’t](https://medium.freecodecamp.org/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26)
- [Glossary of Modern JS Concepts](https://auth0.com/blog/glossary-of-modern-javascript-concepts)
- [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) shallow freezes an object (so nothing about it can be changed) whereas Object.seal() seals an object (just preventing new properties from being added to it)
- [Enums in Javascript](https://stijndewitt.com/2014/01/26/enums-in-javascript/)

### Special functions and routines

- For URLs etc use [url-parse](https://www.npmjs.com/package/url-parse), which includes [querystringify](https://gitlab.cs.washington.edu/glassctm/CShark/tree/55346ca6b16c6bbdadb94701dd554f26b17a3633/node_modules/querystringify) - which has just parse and stringify methods
  - Note that anything that you put after a hash (#) the browser ignores so that's a special trick that Vue Router uses to just get the frontend to take care of the URLs and not relay this information back to a server, and not reload the page

- use [uuid/v1](https://www.npmjs.com/package/uuid) for IDs (or cuid?)

- [lodash](https://lodash.com/docs/) has many useful functions
  - just import _ from 'lodash' (see [benchmark](https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark))- eventually use [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash)
  - for [iteratees](https://lodash.com/docs/#iteratee) see [this explanation](https://stackoverflow.com/questions/43384596/can-you-please-explain-lodash-iteratee-function-in-english)
- consider [vanilla ES6 js](https://30secondsofcode.org/) or [ramda](https://ramdajs.com/)
- for async/await see [Javascript.Info: The Modern Javascript Tutorial](https://javascript.info/async)
- for promises see [Javascript.Info](https://javascript.info/promise-basics)
  - [wait/sleep function](https://hackernoon.com/lets-make-a-javascript-wait-function-fa3a2eb88f11)
- to pass 'this' context to a function use [js bind](https://javascript.info/bind#solution-2-bind)
- [IIFE (Immediately Invoked Function Expression)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) is a JavaScript function that runs as soon as it is defined - an anonymous function with lexical scope enclosed within the Grouping Operator ()

### Regular Expressions

- [regexr](https://regexr.com/) is an online tool to learn, build, & test Regular Expressions
- [regular expressions.info](https://www.regular-expressions.info/quickstart.html) is useful
- [eloquent](https://eloquentjavascript.net/09_regexp.html)
- [w3schools](https://www.w3schools.com/js/js_regexp.asp) & [objects](https://www.w3schools.com/jsref/jsref_obj_regexp.asp)
- [regexp methods](https://javascript.info/regexp-methods)  Excellent on replace
- [exec vs match](https://stackoverflow.com/questions/9214754/what-is-the-difference-between-regexp-s-exec-function-and-string-s-match-fun)
- [Quick Reference](https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference)

with a global regular expression, .exec is meant to be used in a loop, as it will retrieve all matched subexpressions.  String.match does this for you and discards the captured groups.
Without the /g both exec and match return the first match ([0]) and any captured groups ([1] etc)

## Node

- [Node.js®](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [npm](https://www.npmjs.com/) - the [package](https://docs.npmjs.com/packages-and-modules/) manager for javascript ([documentation](https://docs.npmjs.com/cli-documentation/))
- npm globals are in C:\Users\Peter2\AppData\Roaming\npm
  - claudia, jest, nodemon, sass, vue

### Making an npm package

- [How to create and publish your npm package Node module in just 10 minutes](https://www.signet.hr/how-to-create-and-publish-your-npm-package-node-module-in-just-10-minutes/) - simple
- [Installing and Building an NPM Package from Github](https://blog.jim-nielsen.com/2018/installing-and-building-an-npm-package-from-github/) - some insights
- [How to make a beautiful, tiny npm package and publish it](https://medium.freecodecamp.org/how-to-make-a-beautiful-tiny-npm-package-and-publish-it-2881d4307f78) - jokey
- [Official documentation - Contributing packages to the registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry), and [About packages and modules](https://docs.npmjs.com/about-packages-and-modules)
- [building your first node module](https://gist.github.com/tmpvar/8746055)

#### Looking after vfg-display-fields

##### Set up

- (using "building your first node module" from above)
- choose the name (vfg-display-fields)
- npm view vfg-display-fields => confirms it does not exist yet
- create repository in github, and clone to c:\projects
- npm init => initialises package
- edit, commit, merge into master, synchronise with repo
- see [guide](https://docs.npmjs.com/misc/developers) to test package
- npm login (p6 lower case, )
- npm publish

#### Maintenance

- github repo is the 'source of truth', so commit and publish
- [Updating your published package version number](https://docs.npmjs.com/updating-your-published-package-version-number) - only when significant changes have been made

## Client Overview

### The Starting point

client/public/index.html is the file a browser will open - this provides a title and a root div (app), and runs client/src/main.js which takes the output of App.vue and puts it into the root div.  (registerServiceWorker.js is used just in production)

The client is the system that the user interacts with.  The server is the system that the client system can use, eg if it wants to store or retrieve data). We keep these systems separate, and develop them separately.

When the client needs to communicate with the server it sends an asynchronous request (with a promise attached) and when the server is done it notifies the client the promise has been completed. The client can then do any more processing dependent on the promise being completed. [More on this later]

(Almost) all of the state of the client is held in the Vuex store, and access to it is very structured [see later].

```mermaid
graph LR;
  M[Vuex store] -->|getters| C[Client]
  C --> A[Actions]
  A --> |mutations| M
  C -->|POST or GET| S[Server]
  S -->|Promise| C
```

## Vue.js

- [Main guide to Vue.js](https://vuejs.org/v2/guide/index.html)
- [Vue.js API](https://vuejs.org/v2/api/)
- [Vue.js cookbook](https://vuejs.org/v2/cookbook/index.html)
- [Vue Development In 2019: What You Need To Know](https://vuejsdevelopers.com/2018/12/04/vue-js-2019-knowledge-map/)
- to open the visual interface for managing project > vue ui
- [Vue.js User Forum](https://forum.vuejs.org/)
- [GitHub for Vue.js](https://github.com/vuejs)
- [**Awesome Vue.js**](https://github.com/vuejs/awesome-vue) is a HUGE curated list of things related to Vue.js, including components
- [eg styles](https://github.com/vuejs/awesome-vue#code-style)
- [Projects etc Made with Vue.js](https://madewithvuejs.com/)
- SSR [Server-Side Rendering](https://ssr.vuejs.org/) & [Nuxt](https://nuxtjs.org/) are not for us)
- See [boilerplate-template-scaffold](https://vuejsdevelopers.com/2018/04/23/vue-boilerplate-template-scaffold/) for useful scaffolds
  - consider later [this template which includes user sign-in](https://github.com/icebob/vue-express-mongo-boilerplate)
- [useful examples and libraries for Vue.js](https://vuejsexamples.com/)
- [Master Vue.js by mastering common problems](https://medium.com/@Roli_Dori/master-vue-js-by-mastering-common-problems-e2f1c2acd1e7)
- Consider [Local Storage](https://vuejs.org/v2/cookbook/client-side-storage.html) for persistence and speed (better use plugin?)
- [Six random issues and their solutions in VueJS](https://medium.com/@stijlbreuk/six-random-issues-and-their-solutions-in-vuejs-b16d470a6462)
- [Understanding Vue.js Lifecycle Hooks](https://alligator.io/vuejs/component-lifecycle/)
- Useful on [Vue's communication channels](https://stackoverflow.com/questions/38616167/communication-between-sibling-components-in-vuejs-2-0/49702934#49702934)
- [vue component to use common functions](https://stackoverflow.com/questions/51952654/vue-component-to-use-common-functions)
- [Global plugins](https://vuejs.org/v2/guide/plugins.html)
  - [clear description](https://alligator.io/vuejs/creating-custom-plugins/)
  - [Writing a very simple plugin in Vue.js](https://dev.to/nkoik/writing-a-very-simple-plugin-in-vuejs---example-8g8)
  - (Good but too complex) [Production-Ready Example from SnipCart](https://snipcart.com/blog/vue-js-plugin)
- [Working with Environment Variables in Vue.js](https://alligator.io/vuejs/working-with-environment-variables/)
- [Vue.js Instance Properties etc](https://vuejs.org/v2/api/#Instance-Properties) - available to all components as this.$...
- [Managing cookies](https://codeburst.io/how-to-manage-cookies-in-vuejs-51be86e8fc1b)
- [Authentication-system-with-node-js-backend](https://blog.jscrambler.com/vue-js-authentication-system-with-node-js-backend/)
- any components starting with _base in /global/components/ are globally registered
- [The correct way to force Vue to re-render a component](https://hackernoon.com/the-correct-way-to-force-vue-to-re-render-a-component-bde2caae34ad) - update the key
- A template element is used to declare fragments of HTML that can be cloned and inserted in the document by script.
- [The Vue.js Cheat Sheet](https://flaviocopes.com/vue-cheat-sheet/)
- [Methods, Computed, and Watchers in Vue.js](https://css-tricks.com/methods-computed-and-watchers-in-vue-js/)
- [Vue Filters](https://vuejs.org/v2/guide/filters.html) can be used to apply common text formatting in two places (mustache interpolations and v-bind expressions)
- [Vue Enter/Leave & List Transitions](https://vuejs.org/v2/guide/transitions.html) - automatically apply classes for CSS transitions and animations etc - \<transition\> goes around an element, \<transition-group\> round a v-for
- [v-cloak](https://vuejs.org/v2/api/#v-cloak) - hide until Vue compiled
- special abstract component [keep-alive](https://vuejs.org/v2/api/#keep-alive) tells Vue not to destroy and recreate its child, instead keep it in memory
- [Access And Change Parent Variables From A Child Component With Vue.js](https://www.thepolyglotdeveloper.com/2018/04/access-change-parent-variables-child-component-vuejs/)
- [Simplify Your Vue Components with Computed Setters](https://medium.com/@Taha_Shashtari/simplify-your-components-with-computed-setters-2f687f193fb0) - get/set for a computed property
- [26 Time Saving Tips for Vue](http://michaelnthiessen.com/26-time-saving-tips/) - useful to review
- [permission-control as an example of an abstract component](https://medium.com/js-dojo/one-more-example-of-abstract-component-in-vue-js-6e80293f7a38)
- [Constructor Pattern](https://inventi.studio/en/blog/vuejs-with-constructor-pattern)

### Scoped Slots

- [Scoped Slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots) can be in any element
  - see the excellent [Understanding scoped slots in Vue.js](https://medium.com/binarcode/understanding-scoped-slots-in-vue-js-db5315a42391)
  - and (video) [The Trick to Understanding Scoped Slots in Vue.js](https://adamwathan.me/the-trick-to-understanding-scoped-slots-in-vuejs/), explaining that if slots are like props, then scoped slots are like function props
  - slot-scope is the name of a temporary variable that holds the props object passed from the child - even simpler if it is destructured
  - [How I finally got my head around Scoped Slots in Vue](https://medium.com/@ross_65916/how-i-finally-got-my-head-around-scoped-slots-in-vue-c37238d4d4cc)

### Complex components

- Vuescript.com aims to offer latest free Vue.js components for web application developers. - eg [Gallery components](https://www.vuescript.com/gallery)
  - For gallery we use [v-viewer](http://mirari.cc/v-viewer/)
- [Render Functions](https://vuejs.org/v2/guide/render-function.html) - use instead of templates to generate components
  - Refers a lot to [Vue Instance Properties API](https://vuejs.org/v2/api/#Instance-Properties)
  - Can even use [JSX](https://github.com/vuejs/babel-plugin-transform-vue-jsx)
  - [Another similar explanation of render functions](https://alligator.io/vuejs/introduction-render-functions/)
- [Use Any Javascript Library With Vue.js](https://vuejsdevelopers.com/2017/04/22/vue-js-libraries-plugins/) - Object.defineProperty(Vue.prototype, '$moment', { value: moment }); or ... { get() { return this.$root.moment}}
- [Vue.JS Components for building Search UIs](https://medium.appbase.io/vue-js-components-for-building-search-uis-7b2a1b6fe159) - Reactive Search for Vue, using Elasticsearch

### Vue Router

- [Vue Router](https://router.vuejs.org/), and [its API ref](https://router.vuejs.org/api/)
  - we have access to the router (as this.$router) and the current route (as this.$route) inside any component
  - although better to decouple components from the router by [using props:](https://router.vuejs.org/guide/essentials/passing-props.html#passing-props-to-route-components)
  - a dynamic segment is denoted by a colon : - the value of the dynamic segments is in this.$route.params
    - eg for /user/:username/post/:post_id, /user/evan/post/123 yields params = { username: 'evan', post_id: '123' }
  - uses [path-to-regexp](https://github.com/pillarjs/path-to-regexp) for path matching - [example](https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js)
    - supports eg optional dynamic segments, zero or more / one or more requirements
    - includes [compile](https://github.com/pillarjs/path-to-regexp#compile-reverse-path-to-regexp) ("Reverse" Path-To-RegExp)
  - can have nested router-views (use the children option in routes), and named router-views
  - \<router-link :to="..."\> is the equivalent of router.push(...)
    - there are also router.replace, router.go
- [advanced uses](https://medium.com/@NAPOLEON039/the-lesser-known-amazing-things-vuerouter-can-do-3fbb2c191c00)
- Use path parameters, with their specific order, where there is an implied hierarchy, otherwise [use query parameters](https://medium.com/@BjornKrols/tutorial-dynamic-content-via-url-query-parameters-in-vue-js-d2df19b66633)
- See [Synchronize with Vue Router](https://community.algolia.com/vue-instantsearch/advanced/vue-router-url-sync.html) for passing route parameters as props, and keep the URL in sync with changes
- We use [https://github.com/vuejs/vuex-router-sync](https://github.com/vuejs/vuex-router-sync) to sync $route into vuex store's state
- [Missing manual](https://blog.webf.zone/vue-router-the-missing-manual-ce51c21430b0)
  - compares state-router vs url-router
  - can pass complex data from one-route to another during transition without making the data part of URL
  - Prefer tree configuration over a flat configuration
  - create a store injector function
  - for a route configuration with an asynchronous component may need to watch/unwatch $route in the parent
- [Yes, this is how vue-router **guards** work & when to use them](https://medium.com/@arieldi/yes-this-is-how-vue-router-guards-work-when-to-use-them-ed7e34946211)
  - Global guards (on the instance) - each time the URL changes
  - Route guards (on route definitions) - when the associated ROUTE is matched
  - Route Component guards - when a ROUTE COMPONENT is used/unused
- the **to** and **from** in the guards are [route objects](https://router.vuejs.org/api/#the-route-object), which include params etc
- [Data Fetching and Validating](https://router.vuejs.org/guide/advanced/data-fetching.html):
  - Fetching After Navigation (in created and watch $route) - but problem with validation?
  - Fetching Before Navigation (beforeRouteEnter and beforeRouteUpdate guards) - only call next when the fetch is complete
  - see also [Fetching/ using store in router](https://stackoverflow.com/questions/42579601/how-to-access-async-store-data-in-vue-router-for-usage-in-beforeenter-hook)
  - [using Vue Router Navigation Guards](https://serversideup.net/vue-router-navigation-guards-vuex/)
    - from [Roast And Brew tutorials](https://github.com/serversideup/roastandbrew)
    - eg [routes.js](https://github.com/serversideup/roastandbrew/blob/master/resources/assets/js/routes.js)
    - [Wait-Until and Compound beforeEnter Guard with Vue Router](https://hanezu.github.io/posts/sync-async-and-compound-beforeEnter-guard-with-Vue-Router.html)

#### M4OPS2 URL structure

##### path parameters

(specific order separated by /) - see client\src\router.js  "path: '/maps/"

- :ops: code for the OPS (optional - default HcN)
- :layers: zero or more layer titles (starting at layer 0) separated by / (if none then default is Bing%20Aerial/OSM)
  - layer titles can be alphanumeric, including -_ and spaces
- :opacities: zero or more opacity numbers (% starting at layer 1, as the base is always 100% opaque) separated by / (if none then default is 50 for rasters, 100 for feature layers)
- :ZoomOrFitTo: zoom level preceded by Z eg 18, or FitTo preceded by F eg 1 (default is the HomeView)
  - (FitTo was Extent and is the number of the layer to initially fit to)
- :Lon/Lat: Longitude/Latitude decimal degrees, eg -0.0318640/52.3304020 for central Needingworth
  - (This is in 'EPSG: 4326' or Spherical Mercator, and is irrelevant if a FitTo is specified)

##### Examples

(for now the final / is important)
[Basic](http://localhost:8080/maps/HcN/OpenStreetMap/Bing%20Aerial/NLS%201920s-1940s%20maps/55/Z16/)
[Pubs](http://localhost:8080/maps/HcN/OpenStreetMap/Pubs/)
[Protected Layer](http://localhost:8080/maps/HcN/Bing%20Aerial/Cosmo%20Wallace%201764/90/Z17/)
[2 Spinney Way](http://localhost:8080/maps/HcN/Bing%20Aerial/OpenStreetMap/HcN%20CP/90/Z18/-0.0234522/52.3333362/)
[HNB is Protected](http://localhost:8080/maps/HNB/)

##### query parameters

- (key/value pairs, or just the key - meaning true)

- NoCHNG means you cannot change the OPS
- Showlevel= (default 9999) for demonstrations starts at 0 then goes up at cutoffpoints
- Splash= html text for splash screen when M4OPS first opens, can include abbreviations (#..#)
  - one word abbreviations will, if necessary, have the word Splash appended, and be surrounded by #..#
  - (thus Splash=Spyglass becomes #SpyglassSplash#)
  - (and Splash=25inch becomes #25inchSplash#)
- Tab= the initial advanced option tab to show:
  - Actions - PNG, Demo, icons (the default)
  - MFL - Modifiable Feature Layers
  - Upload - Upload, compile
  - Time - Time sliders
- Displaystyle= (initial view)
  - onemapOpacity - One map with Opacity slider, or
  - sidebyside - Side by Side maps, or
  - onemapSpy - One Map with Spyglass
- Colours= initial colour scheme for features
- Click= the initial drop-down value - one of:
  - no - No lat/lon click
  - M4OPScsv - M4OPS lon;lat csv
  - M4OPSparam - M4OPS parameters
  - csv - lat,lon csv
  - geojson - {lon,lat} GeoJSON
  - EPSG3857 - EPSG:3857 (x/y)
  - HDMS - DegMinSec N/E
  - GeoHack - GeoHack links
  - Featureid - Feature id
- Green if you want the background in development to be the normal Green
- NoShift if you want the layers NOT shifted east or north
- LoadwA if you want tiles loaded during animations (may improve the user experience, but can also make things stutter on devices with slow memory)
- LoadwI if you want tiles loaded while interacting with the map (ditto)
- (Mouse if you want the next feature to be Georeferenced to appear by the mouse pointer)

##### Other M4OPS parameters

- from [forum](https://www.mapping4ops.org/m4ops-technicalities/m4ops-parameters/)
- File= filename of json to use, default M4OPS (.json) **NA**

### Events

- In Vue.js events can only go from child to parent, but a more general way is to use an  [Event Bus](https://alligator.io/vuejs/global-event-bus/) (and page 106 of the book) - add to Vue.prototype (lecture 98)
- we usually use Vuex (state) rather than events
- [Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/) - see also [this Vue guide for example](https://vuejs.org/v2/guide/computed.html#Watchers) and [lodash function](https://lodash.com/docs#debounce)

### Vuex

- [Vuex - State management](https://vuex.vuejs.org/)
- the store is injected into all child components of the root and will be available on them as this.$store
  - other routines can access the store and its getters etc by simply importing it
  - "getters" in the store are computed properties that can be referenced in components via store.getters.xxx (can be functions)
  - a mutation is a function eg increment-mutation (state) { state.count++ } - always synchronous
    - mutation types are UPPERCASE and defined in mutation-types.js
  - an action **commits** a mutation eg increment-action ({ commit }) { commit('increment-mutation') }
    - can be asynchronous, usually has a payload object, can [handle Promises](https://vuex.vuejs.org/guide/actions.html#composing-actions)
  - we **dispatch** actions in components with this.$store.dispatch('xxx')
  - in components use the helper functions
    - mapState to generate computed getter functions
    - mapGetters to map store getters to local computed properties
    - mapActions maps component methods to store.dispatch
  - inside module actions and getters, the root state will be exposed as as well as the module's state
  - We do not [Namespace](https://vuex.vuejs.org/guide/modules.html#namespacing) vuex Modules (except alert)
- Various [Vuex Utilities](https://github.com/vuejs/awesome-vue#vuex-utilities)
- Not using [vuex-pathify](https://davestewart.github.io/vuex-pathify/) although it simplifies the Vuex wiring
  - see also [Tame the Vuex Beast with vuex-pathify](https://alligator.io/vuejs/vuex-pathify/)
- [Vuex getters are great](https://codeburst.io/vuex-getters-are-great-but-dont-overuse-them-9c946689b414) but use mapState for simple ones
- [Vuex Instance Properties etc](https://vuex.vuejs.org/api/#vuex-store-instance-properties) - available to all components as this.$store.xxx

#### Vuex plugins

- [Documentation](https://vuex.vuejs.org/guide/plugins.html)
- We use the [Logger Plugin](https://vuex.vuejs.org/guide/plugins.html#built-in-logger-plugin) - createLogger
  - or use vue-devtools time-travel (p143 of the Fullstack Vue book) - but see [this issue](https://github.com/vuejs/vue-devtools/issues/649) with crashing
- For ORM [Vuex ORM](https://vuex-orm.github.io/vuex-orm/) - a plugin for Vuex to enable Object-Relational Mapping access
- [5 Vuex Plugins For Your Next VueJS Project](https://vuejsdevelopers.com/2017/09/11/vue-js-vuex-plugins/)
  - Persisting state
  - Syncing tabs/windows
  - Language localization
  - Managing multiple loading states
  - Caching actions
- [A Vuex Undo/Redo Plugin](https://www.codementor.io/vuejsdevelopers/create-a-vuex-undo-redo-plugin-for-vuejs-dt36c6w3z)

#### Typescript in Vue

- [Using Typescript with vue](https://vuejs.org/v2/guide/typescript.html) - we don't
- [Should You Learn TypeScript? (Benefits & Resources)](https://snipcart.com/blog/learn-typescript-why-use-ts) (answer - not yet!)
- [Type Vue without TypeScript](https://blog.usejournal.com/type-vue-without-typescript-b2b49210f0b)
  - [Type Vuex without TypeScript](https://itnext.io/type-vuex-without-typescript-4f183b83a907)

### HTTP Requests

- Use [**vuex-api**](https://github.com/vouill/vuex-api)
  - for GETS use [json-api](https://github.com/vouill/vuex-api#using-a-component)
- Considered later using plain [Axios](https://www.npmjs.com/package/axios), but too hard to change
  - [perform HTTP requests using Axios](https://flaviocopes.com/axios/) - simple examples
  - Rather than plain fetch, see [fetch-vs-axios](https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5)
  - see [Using Axios to Consume APIs](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html) for a simple approach
- See [vue.config.js](https://cli.vuejs.org/config/) is an optional config file, and needed for eg devserver-proxy
- Not using [vuex-rest-api](https://christianmalek.github.io/vuex-rest-api) (makes part of the store), nor [vue-api-request](https://ftgibran.github.io/#/vue-api-request) (which has lots of options)
  - from [section on Utilities for HTTP requests](https://github.com/vuejs/awesome-vue#http-requests)
- or p 178ff in Fullstack Vue book (action = axios call *then* commit mutation)
  - (need to commit a different mutation when axios call fails)

### Authorisation

- We use Jason Watmore's approach, and have absorbed his routines into ours (users modules), adapted to our standards
- The source of truth is in the server's (MongoDB) database

#### Our structure

- The key constraints are on:
  - being able to see an OPS at all
  - being able to see a layer
  - being able to upload a file
  - being able to compile
  - being able to set up, alter, delete users

- OPS are one of:
  - Unprotected - anyone can see it (default)
  - Protected - users need a specific right for that OPS to see it (and then can see all layers)

- Each Layer (settled and modifiable/MFL) is one of [see protectionStatusEnum]:
  - Unprotected - anyone can see it (default), if they can see the OPS
  - Protected - logged-in users can see it (eg with Census images), if they can see the OPS
  - Personal - only the one user (and admin) can see it
  - Test - only an admin (globalAdmin, or opsAdmin for that OPS) can see it, and then only if the Test switch is On

- Everyone (including [not logged-in] Guests) can see all Unprotected layers in all Unprotected OPS
  - and login as a User (thereby acquiring any specific rights they have)
  - and register as a User (but without any specific rights)
  - but not Upload, compile, create or change an MFL
- Logged-in Users (without needing any specific rights) can see all Protected (and Unprotected) layers in all Unprotected OPS
  - and their own Personal layers
  - and create an MFL, or change an MFL they can see

- In addition, Users can have none, one or more of the following specific rights [see userRightsEnum]:
  - opsViewer - as well as everything a Logged-in User can do
    - can see all Protected layers in the specific Protected OPS (not necessary if the OPS is Unprotected)
    - but not Upload, compile, create or change an MFL
  - opsTeamMember - can do everything the opsViewer can do
    - and Upload, compile, create or change an MFL in the specific OPS
  - opsAdmin - can do anything in the specific OPS
    - including everything an opsTeamMember can do
    - and see all Personal layers in that OPS (from everyone)
    - and Register/edit Users as opsTeamMembers and opsViewers
  - globalAdmin - can do anything

See client\src\global\constants.js for protectionStatusEnum {UN,PD,PL,TT}, userRightsEnum = {9_NO,6_OV,4_OT,2_OA,0_GA}

#### Client system

- See [Jason Watmore's approach - client](http://jasonwatmore.com/post/2018/07/14/vue-vuex-user-registration-and-login-tutorial-example)
- clone of Jason Watmore's system is in C:projects/vue-vuex-registration-login-example
- routines in \client\src
  - \store\modules\users - defines the user aspects of the Vuex store (state, actions, mutations)
    - account.module.js - the current user and their loggedin status
    - alert.module.js - alert state: type and message
    - users.module.js - all users
  - \views
    - LoginPage.vue - includes logout
    - RegisterPage.vue
    - ManagePage - (originally HomePage) sb only accessible by administrator
  - \modules\users
    - \_helpers
    - auth-header.js - generates a header
    - fake-backend.ts - intercepts certain api requests and mimics the behaviour of a real api
    - user.service.js - all backend api calls, and logging in/out (handleResponse handles if the JWT token is no longer valid for any reason)
- the URLs that are public are in router.js (beforeEach)
- Could use [Route Meta Fields](https://router.vuejs.org/guide/advanced/meta.html) to determine navigation limits

#### Server system

##### JSON Web Tokens (JWT)

- JSON Web Tokens are an open, industry standard method for representing claims securely between two parties - and the library  [jwt.io](https://jwt.io/)  allows you to decode, verify and generate JWT
- We use [jwt-express](https://www.npmjs.com/package/jwt-express) to facilitate this on the server
  - it uses [express-unless](https://www.npmjs.com/package/express-unless) to conditionally prevent itself from running
- As well as in REST APIs, JWTs can also be used in everyday web applications to store session data in a cookie - the JWT contains all the information we need
- We ignore the issue of [CSRF/Cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery)
- JWTs can be stale (different than expired) after a period of inactivity, so sometimes need to ensure their JWT is fresh, as well as valid

##### General Server system

- See [Jason Watmore's approach - server/API](http://jasonwatmore.com/post/2018/06/14/nodejs-mongodb-simple-api-for-authentication-registration-and-user-management)
- clone of Jason Watmore's system is in C:projects/node-mongo-registration-login-api (server)
- routines in \server\src
  - \models\User.js for the Schema/model
  - \modules\users for routines:
    - config.json - has just the secret
    - error-handler.js - centralised handling of api errors (TO DO include other modules' errors?)
    - jwt.js - calls expressJwt to revoke the user token unless the route is specified as not requiring authentication
    - user.service.js - contains the core business logic, encapsulates all interaction with the mongoose user model, and exposes a simple set of methods
  - app.js includes a new major route: '/users', usersRoute
  - \routes\user.js defines the actions for each sub-route (including our normal Controller aspects)
- the API calls that are public are in jwt.js, and to begin with we allow all calls

#### Management

- A list of users is given at menu option 'Manage', and they can be deleted from there

#### Other Approaches

- very simple [with mock data](https://www.thepolyglotdeveloper.com/2018/04/simple-user-login-vuejs-web-application/)
- more complete: [Structuring a Vue project — Authentication](https://medium.com/@zitko/structuring-a-vue-project-authentication-87032e5bfe16)

- Could use [Firebase](https://firebase.google.com/) - Google's realtime service, see [Introduction](https://hackernoon.com/introduction-to-firebase-218a23186cd7)
  - [VueSchool](https://vueschool.io/courses/vuejs-firebase-authentication) - not free, with [code](https://github.com/vueschool/vuejs-firebase-authentication)
  - Useful: [Build a Vue App with Firebase Authentication and Database](https://blog.bitsrc.io/build-a-vue-app-with-firebase-authentication-and-database-e7d6816f79af)
  - uses [vuefire](https://github.com/vuejs/vuefire)
  - also [useful](https://medium.freecodecamp.org/how-to-build-a-spa-using-vue-js-vuex-vuetify-and-firebase-adding-authentication-with-firebase-d9932d1e4365) - OK on firebase and vuex, but too Vuetify!
- We tried to use [Auth0](https://auth0.com) Identity-as-a-Service (IDaaS), [Managing](https://manage.auth0.com/)
  - We use [Universal Login](https://auth0.com/docs/hosted-pages/login), as seen the [Vue QWuickstart](https://auth0.com/docs/quickstart/spa/vuejs)
  - Use [vue-auth0-handler](https://github.com/felipe-tonon/vue-auth0-handler) and [vue-cookie](https://github.com/alfhen/vue-cookie)
  - We have v9 of auth0-js [see reference documentation](https://auth0.com/docs/libraries/auth0js/v9)
  - [Auth0 Community](https://community.auth0.com/top/all)
  - For other guidance see half way down [Developing Production-Ready Apps](https://auth0.com/blog/vue-js-and-lambda-developing-production-ready-apps-part-1/)
    - and also the [quick start](https://auth0.com/docs/quickstart/spa/vuejs)
- [Other Possibles](https://github.com/vuejs/awesome-vue#authenticationauthorization)
  - Might have used [Vue Auth](https://github.com/websanova/vue-auth) but no

### Demo

- For demo could use [Vue Tour](https://madewithvuejs.com/vue-tour) - a quick and easy way to guide your users through your application.

### Icons

- We use the [Buefy icon](https://buefy.github.io/documentation/icon) with [fontawesome 5](https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs)
  - [Free icons](https://fontawesome.com/icons?d=gallery&m=free)
  - [More details](https://github.com/FortAwesome/vue-fontawesome) and [a full-guide-to-using-font-awesome-icons-in-vue-js-apps](https://blog.logrocket.com/full-guide-to-using-font-awesome-icons-in-vue-js-apps-5574c74d9b2d)
  - Make sure you register the component and have added icons to your library before you bootstrap your Vue application (see main.js)
  - then use eg \<font-awesome-icon icon="arrow-up" /\>
    - but be aware that in some cases self-closing tags are not allowed
  - [advanced svg icons](https://vuejs.org/v2/cookbook/editable-svg-icons.html)
- Did use [Element Icons](http://element.eleme.io/#/en-US/component/icon)
- [ICONSVG](https://iconsvg.xyz) is a tool to simplify the process of finding and generating common icons

### CSS

- [CSS Basics](https://www.cssbasics.com/#page_start): selector { property: value; property: value }
- [CSS Properties](https://www.w3schools.com/cssref/default.asp), and [defaults](https://www.w3schools.com/cssref/css_default_values.asp)
- [CSS Selectors](https://www.w3schools.com/cssref/css_selectors.asp), and [Tester](https://www.w3schools.com/cssref/trysel.asp)
  - class selector begins with a (.) period, id selector begins with a (#) number sign
    - comma between selectors means for both
    - space between selectors means for the right one within the left
    - > between selectors means for the right one where its parent is the left one
    - \[attribute=value\] means all elements with the given attribute having the given value
    - etc
  - Pseudo classes/elements precede by (:) colon eg a:visited and p:first-line
- Use [Bulma](https://bulma.io/) via [**Buefy**](https://buefy.github.io/) for a CSS framework (like Bootstrap) - as used by vuelayers
  - [Buefy examples](http://rafaelescala.com/buefy-example/)
  - [Useful way to see Bulma variables](https://bulma-customizer.bstash.io/)
  - [Buefy: Bulma Based UI Components for Vue.js](https://dev.to/aligoren/bulma-based-ui-components-for-vuejs-41i4)
- Bulma uses [HSL colours](https://www.w3schools.com/colors/colors_hsl.asp)
- [High quality designs and components for Bulma.io](http://creativebulma.net/) - eg calendar, Lightbox
- [Bulma-extensions (not Vuejs-specific)](https://wikiki.github.io/) - divider, sexy checkbox and radio,** Icon Picker**, slider, switch, tags, badge,  page-loader, Accordion, Calendar, **Carousel**, Pricing table, **Quickview**, **Steps**, Timeline
- [SCSS/SASS Reference](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
- [SAAS Tutorial](https://www.tutorialspoint.com/sass/index.htm) - includes [debugging](https://www.tutorialspoint.com/sass/directives_debug.htm)
- [Use scss within a .vue file](https://flaviocopes.com/vue-using-scss/) - installed node-sass & sass-loader
- [Globally Load SASS into your Vue.js Applications](https://vueschool.io/articles/vuejs-tutorials/globally-load-sass-into-your-vue-js-applications/) - for when loading
- [Integrating and Using CSS Frameworks (eg Bulma) with Vue.js](https://alligator.io/vuejs/css-frameworks-vuejs/)
- We used to use plain CSS ??with variables - see [Everything you need to know about CSS Variables](https://medium.freecodecamp.org/everything-you-need-to-know-about-css-variables-c74d922ea855)
- [Learn CSS Layout](http://learnlayout.com) - a short course
- [Styling Vue.Js Components Using CSS](https://flaviocopes.com/vue-css/) - lots of places to put css and classes
- See also vue.config.js [css-modules](https://cli.vuejs.org/config/#css-modules)
- [CSS Specificity: Things You Should Know](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/)
- [How to Organize Your CSS with a Modular Architecture (OOCSS, BEM, SMACSS)](https://snipcart.com/blog/organize-css-modular-architecture?)
- [CSS utility classes](https://gomakethings.com/my-css-methodology)

### Useful components

#### Dates and Times

- [Moment.js](https://momentjs.com/) - Parse, validate, manipulate, and display dates and times
  - even better use [Luxon](https://raddevon.com/articles/choose-luxon-date-wrangling-javascript/)

#### Buefy

- [Buefy Components](https://buefy.github.io/documentation) include all we need except (see below):
  - Cascader (asked for)
  - Slider
- source monitor ? for infinite scroll

#### Element UI components

(**We are replacing Element by Buefy** when possible)

- [Guide](http://element.eleme.io/#/en-US/guide/design), [Quick Start and Components](http://element.eleme.io/#/en-US/component/quickstart)
- [Awesome Element - A curated list of Element projects etc](https://github.com/ElementUI/awesome-element)
- [Element uses BEM-styled CSS so that you can override styles easily](http://element.eleme.io/#/en-US/component/custom-theme) but also create a new theme
- [VSCode-Element-Helper](https://github.com/ElemeFE/vscode-element-helper)
- [Language handling needed](http://element.eleme.io/#/en-US/component/i18n) as Element standard is Chinese
- [Vee Element](https://github.com/davestewart/vee-element) enables the [Vee Validate](https://baianat.github.io/vee-validate/) validation library to be used in Element UI
- [Gitter conversations](https://gitter.im/element-en/Lobby)
- [Element for VueJS: 5 things to love and 5 things to hate](https://medium.com/@denny.headrick/element-for-vuejs-5-things-to-love-and-5-things-to-hate-d6ca336223b4)

#### Vue Slider Component

- [vue-slider-component](https://nightcatsama.github.io/vue-slider-component/example/) - [github](https://github.com/NightCatSama/vue-slider-component), [jsfiddle](https://jsfiddle.net/2xy72dod/8746/)
- [Introduction](https://www.develodesign.co.uk/vue/vue-slider-component-vue-2/) and [part 2](https://www.develodesign.co.uk/news/vue-slider-component-vue-2-part-2/)

#### Vue Forms

##### Plain

- [Form Input Bindings](https://vuejs.org/v2/guide/forms.html)
- [Further descriptions](https://logrocket.com/blog/an-imperative-guide-to-forms-in-vue-js-2/)
- [and this](https://vegibit.com/vuejs-form-example/)
- [Use form element](https://alligator.io/vuejs/vue-form-handling/)
- [interestipng](https://auralinna.blog/post/2018/how-to-build-a-complete-form-with-vue-js) - use i18n translation strings even if only one language?
- [Working with Dynamic Components in Vue.js](https://www.raymondcamden.com/2018/10/31/working-with-dynamic-components-in-vuejs) - useful vanilla Vue using :is
- [Vue.js — Forms, components and considerations](https://blog.webf.zone/vue-js-forms-components-and-considerations-d81b3ffe9efb) - some dos and don'ts
- [Building Custom Multi-Option Form Components with Vue.js](https://markus.oberlehner.net/blog/building-custom-multi-option-form-components-with-vue/)

##### VueFormGenerator

- On [github](https://github.com/vue-generators/vue-form-generator) - [on npm](https://www.npmjs.com/package/vue-form-generator)
- [Documentation](https://vue-generators.gitbook.io/vue-generators/), on [github](https://github.com/vue-generators/vue-form-generator-docs), [my fork](https://github.com/PeterC66/vue-form-generator-docs) ( see [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/))
- [another example](https://vuejsexamples.net/vue-form-generator/) and on [Vue.js Feed](https://vuejsfeed.com/blog/vue-form-generator)
- [css aspects](https://github.com/vue-generators/vue-form-generator/issues/384) and [this fiddle](https://jsfiddle.net/76of8ucs/)
- [How to dynamically load (part of) a form schema asynchronously](https://stackoverflow.com/questions/50060179/how-to-dynamically-load-a-vue-form-generator-schema)
- [Populate vue-form-generator's select field with dynamic values](https://stackoverflow.com/questions/48562255/populate-vue-form-generators-select-field-with-dynamic-values)
- [Attributes compatibility for input types](https://vue-generators.gitbook.io/vue-generators/fields/core-fields/input#attributes-compatibility)
- VFG generator: [Issues #503 and my #569](https://github.com/vue-generators/vue-form-generator/issues/503)
  - linked to [VDDL - Vue components for modifying lists with the HTML5 drag & drop API](http://hejx.space/vddl-demo/)
- [Vue-multiselect](https://vue-multiselect.js.org/) - used in vue-form-generator
- other (custom) field types - including [Public Custom Fields](https://github.com/vue-generators/vue-form-generator#public-custom-fields):
  - [vfg-field-array](https://www.npmjs.com/package/vfg-field-array?activeTab=readme) - a vfg field to handle arrays
  - [vfg-field-sourcecode](https://github.com/gwenaelp/vfg-field-sourcecode) - a source code field for vfg
  - [vfg-field-object](https://www.npmjs.com/package/vfg-field-object) - a vfg field to handle objects, with or without schemas
  - [vue-tel-input](https://github.com/EducationLink/vue-tel-input) - for international telephone numbers
  - [vfg-field-matrix](https://github.com/shwld/vfg-field-matrix#readme) - a vfg field to handle matrices
  - [https://gitlab.com/m_pchelnikov/vue-form-generator-graphql#README](https://gitlab.com/m_pchelnikov/vue-form-generator-graphql#README) - realize query building for GraphQL based on schema
  - NO - [vfg-field-checkboxlist](https://github.com/shwld/vfg-field-checkboxlist)

###### VFG documentation

- multiple, and multi: true fields, is about fields that can have more than one value (cf [see this](https://html.com/attributes/select-multiple/))
- featured means **bold**
- validateDebounceTime (milliseconds) is used eg on text fields with validation
- fields can have [complex definitions](https://vue-generators.gitbook.io/vue-generators/fields/field_properties), and even incorporate [buttons](https://vue-generators.gitbook.io/vue-generators/fields/field_properties/inside_buttons)
- [core field types](https://vue-generators.gitbook.io/vue-generators/fields/core-fields) are checkbox, checklist, input, label, radios, select, submit (button), textArea
- [other field types we might use](https://vue-generators.gitbook.io/vue-generators/fields/optional_fields) include cleave, image, pikaday, switch, vueMultiSelect (trying to avoid jQuery)
- fields can be [grouped](https://vue-generators.gitbook.io/vue-generators/groups)
- [Built in Validators](https://vue-generators.gitbook.io/vue-generators/validation/built-in-validators) are number, integer, double, string, array, date, regexp, email, url, creditCard, alpha, alphaNumeric - [Custom Validators](https://vue-generators.gitbook.io/vue-generators/validation/custom-validators) are possible
- for style see client\vfg.css.txt

##### Other on forms

- Could (but don't) use [Vuelidate](https://monterail.github.io/vuelidate/) validation - see [introduction](https://www.monterail.com/blog/2016/rethinking-validations-for-vue-js) - for forms and other validations
- or [Vuetify - Material Design Component Framework](https://vuetifyjs.com/en/), see also [extending Vuetify’s input field validation](https://alligator.io/vuejs/vuetify-validate-empty-fields) NO as it is too all-embracing - using Element UI et al
- see [VeeValidate 2.1: Validation Providers](https://medium.com/@logaretm/vee-validate-validation-providers-b5b38647c05c)
- See also [this list of form components](https://github.com/vuejs/awesome-vue#form)
  - includes Rich Text Editing etc
- Interesting: [How to Handle Multi-row Forms with Vue, Vuex and vuex-map-fields](https://markus.oberlehner.net/blog/how-to-handle-multi-row-forms-with-vue-vuex-and-vuex-map-fields/) (automates computed get/set)

#### Colors/Colours

- For the (optional) color type VFG uses [Spectrum Colorpicker](https://bgrins.github.io/spectrum/), but this needs JQuery and there is no recommended non-JQuery equivalent
- We use [TinyColor](https://github.com/bgrins/TinyColor)

#### Modals

- [Modals](https://github.com/vuejs/awesome-vue#overlay)
- We use [portal-vue](https://linusborg.github.io/portal-vue/#/guide) (a set of two components that allow you to render a component's template (or a part of it) anywhere in the document - even outside the part controlled by your Vue App!)
  - can also see [lessons](https://gaming.youtube.com/watch?v=1yWAxrpL3zU&list=PL7CcGwsqRpSOZAiNYyVvgTKSyARERvvij) from [Advanced Vue Component Design course (not free)](https://adamwathan.me/advanced-vue-component-design/)
  - Did try to use [buefy (b-modal)](https://buefy.github.io/documentation/modal), but now only use buefy css classes (see Buefy styles for ref.css)

##### Our Modals structure

- Essentially
  - the modals are all defined at the top level (M4OPSView) but hidden until 'wanted'
  - a modal is 'wanted' when showPortal sets title (in store/forms)
  - showPortal also always sets portalName (eg ModalForForms), and (usually) actionTextsArray
- the Modal actually appears in portal-target in App.vue, a standard component from portal-vue
  - this has a name bound to store/forms/portalName in Vuex
- one main Modal form component is **ModalForForms** (for general M4OPS forms such as LogIn), which handles
  - linking to the portal-target (with name "ModalForForms")
  - whether it shows (only if store/forms/title !== NOPORTAL - and the portal-target has the right name) or not
  - the background and closing (hidePortal sets forms/title = NOPORTAL)
  - the modal-card classes for head, body, foot etc
  - the VueFormGenerator form, whose spec is defined by the 'thisFormSpec' getter, which
    - assumes the value of forms/formId has been set (by showPortal)
    - collects the relevant mode, schema, options from  the Forms database
  - the text on button(s) (from store/forms/actionTextsArray)
  - the Submit action(s) (handleSubmit is hard-coded for now, with a switch on formId)
- This main Modal component is switched on from elsewhere by the actions showPortal({}), eg in
  - ActionsPane and UserStatus
  - it is switched off internally by hidePortal()
  - it needs showPortal to have also set: formId
- Note that ModalForForms uses the VuexApi data as spec, thus its '(vfg_)model' is changed by any form entries
  - for passwords, and any other sensitive data, the action to clear it should be included
  - eg dispatch('clearFormField', {formId: 'LogIn', fieldName: 'password'});
  - this data is imported from client\src\modules\forms\vfgData\forms.json
- Another main Modal component is **ModalForMessages**, similar to ModalForForms, except
  - it needs showPortal to have set: messagesArray
  - it just displays the text from the messagesArray, without using vfg
- Another main Modal component is **ModalForOPSForms** (for OPS-specific forms):
  - it needs showPortal to have set: ldid (of a vector layer)
  - it expects the specified layer to have a 'formId' property (eg 1B) corresponding to an OPSForm in the OPS' FormsArray
  - it uses the getOPSFormByLdid getter to get the schema and formOptions
  - it has a local copy of the model so nothing in the form data is overwritten
    - but the initial values and updated values therefore need to be handled separately

#### Other Vue aspects

- [vue-stepper-component](https://adi518.github.io/vue-stepper-component/)
- [scrolling etc](https://github.com/vuejs/awesome-vue#scroll)
  - [infinite-scroll](https://github.com/vuejs/awesome-vue#infinite-scroll)
- [pagination](https://github.com/vuejs/awesome-vue#pagination)
- [Create documentation](https://github.com/vuejs/awesome-vue#docs)
- [Tables/grids](https://github.com/vuejs/awesome-vue#table)
- [Charts](https://github.com/vuejs/awesome-vue#charts)
- [Markdown](https://github.com/vuejs/awesome-vue#markdown)
- [Trees](https://github.com/vuejs/awesome-vue#tree)
- [search](https://github.com/vuejs/awesome-vue#search)
- [GraphicsJS](http://www.graphicsjs.org/) - a lightweight free graphics library, based on SVG/VML technology

### Standards and styles

- See [the official style guide](https://vuejs.org/v2/style-guide/) 1 > 2 > 3

- **Naming conventions**
  - Component names are always **multi-word**, except for the root “App” component.
  - Each component is in its own file.
  - Filenames of single-file components (.vue) are in PascalCase.
  - Components that are only used once per page begin with the prefix “The”, to denote that there can be only one (eg TheNavbar.vue)
  - Child components include their parent name as a prefix (eg a “Photo” component used in “UserCard” is named UserCardPhoto).
  - Always use full name instead of abbreviations in the name of components, eg UserDashboardSettings.
  - Folder names are in lower case.
  - Non component filenames are in camelCase according to the job that they perform, eg userDropdown.js.
  - For components it's generally best to use PascalCase in the JavaScript, and kebab-case in the template - but Vue sees them as the same.
  - **Beware** the kebab/Pascal issue (OPSDetails would have become o-p-s-details, so we use opsdetails)
- Component data **must be a function**, as in export default {data () {return {foo: 'bar'}}}
- **Prop definitions** should be as detailed as possible, including where possble a validator function
- Always **use key** with v-for
- Never use v-if on the same element as v-for
- [Styles in components](https://vuejs.org/v2/style-guide/#Component-style-scoping-essential) should be **scoped** (except in the top-level App component and in ?? view components styles may be global)
  - and use class selectors (eg .btn-close) rather than element selectors (eg button)
- Always use the $_ prefix for custom private properties in a plugin, mixin, etc
- Base components (pure components) that apply app-specific styling and conventions should begin with the prefix Base
- Components with no content should be self-closing in single-file components, string templates, and JSX - but canot be in DOM templates
- Where possible we use [Single File Components (.vue)](https://vuejs.org/v2/guide/single-file-components.html) - needs Webpack, and has all in the one file:
  - \<template\> - HTML code template
  - \<script\> - JavaScript logic
  - \<style\> - CSS styling
- Elements with multiple attributes should span multiple lines, with one attribute per line (similar to JS object properties)
- Don’t use arrow functions on an options property or callback, since arrow functions are bound to the parent context, 'this' will not be the Vue instance as you’d expect
- Don’t use arrow functions in methods and computed properties as they almost always reference this to access the component data
- Do use arrow functions for filters (see also the [vue2-filters package](https://www.npmjs.com/package/vue2-filters))

- “Mustache” syntax (double curly braces): {{}} for interpolation (of component data into a component template)
- Component templates should only include simple expressions, with more complex expressions refactored into computed properties or methods.
- Complex computed properties should be split into as many simpler properties as needed.
- Non-empty HTML attribute values should always be inside quotes (even though without spaces they don't need to be)
- Directive shorthands (: for v-bind: and @ for v-on:) should be used always or never (we choose always)
- Component/instance options should be ordered consistently - see [this list](https://vuejs.org/v2/style-guide/#Component-instance-options-order-recommended)
- Attributes of elements (including components) should be ordered consistently - see [this list](https://vuejs.org/v2/style-guide/#Element-attribute-order-recommended)
- In .vue files we do not indent what is in the \<script\> or \<style\> blocks (even though Vetur could do it)

- For a comparison of Methods vs Watchers vs Computed Properties see page 90 of Vue Handbook.pdf

- Can do [dependency injection](https://vuejs.org/v2/guide/components-edge-cases.html#Dependency-Injection) (provide and inject - sort of 'long-range props'), [see also](https://codeburst.io/dependency-injection-with-vue-js-f6b44a0dae6d), and [vue-inject](https://www.npmjs.com/package/vue-inject) - but beware

### Vue CLI 3

- [Vue CLI](https://cli.vuejs.org/) Provides Standard Tooling for Vue.js Development
- To run a project > npm run serve
- See [Deployment](https://cli.vuejs.org/guide/deployment.html#general-guidelines)
- For [amazon S3](https://github.com/multiplegeorges/vue-cli-plugin-s3-deploy)

- (Remember that npm install -E (or --save-exact) ensures that the current version is not updated)

## Sources of truth

### Current OPSCode

- state.mapping.currentOptionArray[3]
- default initialOpsCode
- getter: use mapState
- setter via updateCurrentOptionArray
- Note that store.getters.place.OPSCode holds the OPSCode for the OPS currently loaded into place

### Current User

- store.state.users.account.user
- has .username and .status.loggedIn
- default none (username === 'Guest')
- localStorage.getItem('user') is used to keep user logged in between page refreshes - includes jwt token
  - so is kept updated by routines in user.service.js, and used in authHeader
  - but should not be used for any other reasons

### Current Chosen Layers

- store.state.mapping.mainmap.chosenLayers (array)
- each has .ldid, .opacity (0-1), .displaytype (A or B)
- getter chosenLayersMainmap
- set by setLayer and setOpacity
- there is also the simpler store.state.mapping.chosenRhLayer which has just ldid
- initialised to initialStateChosenLayersByOpsCode(opsCode) - none yet
- default initialStateChosenLayers.default [Bing Aerial, OSM]

## Babel

[Basics of Babel](https://babeljs.io/docs/en/learn)

## Bundler - Webpack

- [configuration](https://webpack.js.org/configuration/)
- [the-core-concepts](https://webpack.academy/p/the-core-concepts)
- [Introduction](https://auth0.com/blog/webpack-a-gentle-introduction/)
- See vue.config.js [configurewebpack](https://cli.vuejs.org/config/#configurewebpack) and [here](https://cli.vuejs.org/guide/webpack.html)
- need [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) in webpack for environment variables eg process.env.NODE_ENV
  - see [Node environment variables](https://medium.freecodecamp.org/heres-how-you-can-actually-use-node-environment-variables-8fdf98f53a0a)
- We were thinking of using [**Parcel**](https://parceljs.org/) as 'no configuration'.
  - (nice but Vue CLI uses Webpack) - see [Parcel and Vue](https://parceljs.org/recipes.html)
  - See also [A quick look at Parcel](https://glebbahmutov.com/blog/parcel/), and [Getting Started With Parcel](https://medium.com/codingthesmartway-com-blog/getting-started-with-parcel-197eb85a2c8c)
  - OL has [this example](https://github.com/openlayers/ol-parcel), and their [Building an OpenLayers Application tutorial](http://openlayers.org/en/latest/doc/tutorials/bundle.html)

## Debugging

- Use [VS Code debugging](https://code.visualstudio.com/docs/editor/debugging)
- [Debugging Vue.js in VS Code](https://vuejs.org/v2/cookbook/debugging-in-vscode.html)
- [make-console-log-output-colorful](http://voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/)
- [breakpointing](https://vuejsdevelopers.com/2018/10/16/vue-js-advanced-debugging)

- See also [Lighting Up Your JavaScript With the Debugger](https://peterlyons.com/js-debug) - links to
  - [Node Inspector Docs](https://nodejs.org/en/docs/inspector/)
  - [Chrome Developer Tools Docs](https://developers.google.com/web/tools/chrome-devtools/)
  - [Lesser-Known JavaScript Debugging Techniques](http://amasad.me/2014/03/09/lesser-known-javascript-debugging-techniques/)
  - [Debugging Asynchronous JavaScript with Chrome DevTools](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
  - [Watch Me Code Debugging Screencasts](https://sub.watchmecode.net/series/debugging-javascript/)

- Note that a DOM node with a property = a Function is reported as "[object Function]"
  - a property = an Object is reported as "[object Object]" (similarly for an Array etc)
- Chrome devtools has network tab - can turn on throttling to emulate a slow network (Online, Fast 3G, Slow 3G, Offline)

## Testing

- [Unit Testing Vue Components](https://vuejs.org/v2/cookbook/unit-testing-vue-components.html)
- Test runner [Karma](https://karma-runner.github.io/2.0/index.html)
- [**Vue Test Utils**](https://vue-test-utils.vuejs.org/) is the official unit testing utility library for Vue.js.
  - Can use [vue-jest preprocessor](https://vue-test-utils.vuejs.org/guides/testing-single-file-components-with-jest.html)
- [Possibles](https://github.com/vuejs/awesome-vue#test)
- [Mastering testing with Vue.js by testing a real application and setting up CI/CD](https://medium.com/clockwork-nl/mastering-testing-with-vue-js-by-testing-a-real-application-and-setting-up-ci-cd-e4e989c12912)
- [JavaScript Testing Fundamentals](https://vueschool.io/courses/javascript-testing-fundamentals) - then continues into a full paid-for course
- Could use ebook [Testing Vue.js components with Jest](https://leanpub.com/testingvuejscomponentswithjest) - $14 +VAT
  - eg [The power of Snapshot Testing](https://vuedose.tips/tips/9/)

## OpenLayers

Use version number eg v5.3.0 (which is the one we use) or latest (the original M4OPS used [v4.6.5](http://openlayers.org/en/v4.6.5/apidoc/))

- [Documentation](http://openlayers.org/en/v5.3.0/doc/)
- [Tutorials](http://openlayers.org/en/v5.3.0/doc/tutorials/)
- [(Current) Workshop](http://openlayers.org/workshop/en/))
- [API](http://openlayers.org/en/v5.3.0/apidoc/)
- [Examples](http://openlayers.org/en/v5.3.0/examples/)
- [(Latest) code](https://github.com/openlayers/openlayers)
- [ol on npm](https://www.npmjs.com/package/ol)
- [Releases on GitHub](https://github.com/openlayers/openlayers/releases/)
- Useful on [Adding a progress indicator](https://medium.com/gis-tips/openlayers-3-adding-a-progress-indicator-341431e3a938) (ie loading layers)
  - note that we use a v-if and spinner rather than buefy loading

### OL and Vue

- Use [vuelayers](https://github.com/ghettovoice/vuelayers) - Vue components with the power of OpenLayers
- [GitHub](https://vuelayers.github.io/#/) - scroll down for demo, quick start etc
- [Demo](https://vuelayers.github.io/demo/) and [demo code](https://github.com/ghettovoice/vuelayers-demo/blob/master/src/App.vue), App.vue code copied into [vuelayers-demo](vuelayers-demo\App.vue)
  - also includes [AlexRiceGist/](https://gist.github.com/guidorice/c39db591323d78e5cb659b6bbc5cb0b5) re storing map data in Vuex
- [My fork](https://github.com/PeterC66/vuelayers/)
  - Demo uses [vue-loader](https://vue-loader-v14.vuejs.org/en/), [vuejs-templates](https://github.com/vuejs-templates), and the [webpack template](https://vuejs-templates.github.io/webpack/)
  - but these are not needed now because Vue CLI 3 does it all
- see [how to track what vuelayers/OLmap is doing](https://github.com/ghettovoice/vuelayers/issues/73)
- and [use of $](https://github.com/ghettovoice/vuelayers/issues/59)
  - [explanation of $map etc](https://github.com/ghettovoice/vuelayers/issues/89#issuecomment-431653970)
- [olExt issue](https://github.com/ghettovoice/vuelayers/issues/90#issuecomment-431748771)
- see [Complex components](#complex-components) for generating eg layer components

- Other Vue OL implementations - fairly simple, could copy
  - [vue-openlayers](https://sombriks.github.io/vue-openlayers/#/introduction): humble wrapper
  - [vuejs-openlayers](https://github.com/rukandax/vuejs-openlayers)
  - see also [integrating OL was quite easy - but some gotchas](https://stackoverflow.com/questions/47479583/integrate-openlayers-in-vuejs-application)

### Projections

#### Projections - Background

- [FAQ: What projection is OpenLayers using?](http://openlayers.org/en/latest/doc/faq.html#what-projection-is-openlayers-using-) - default is EPSG:3857
- [Coordinate Systems Worldwide](https://epsg.io/)
- See the [note on projections](https://www.mapping4ops.org/background/useful-background-on-web-mapping/msg255/#msg255)
- this note on [Coordinates in M4OPS](https://www.mapping4ops.org/m4ops-technicalities/coordinates-in-m4ops/msg384/#msg384) includes something on projections
- In M4OPS v1 we had: a Note on projections, From [this discussion](http://gis.stackexchange.com/questions/48949/epsg-3857-or-4326-for-googlemaps-openstreetmap-and-leaflet)
  - The data in Open Street Map database is stored in EPSG: 4326 ([Spherical Mercator: decimal degrees](http://docs.openlayers.org/library/spherical_mercator.html))
  - The Open Street Map tiles and the WMS webservice, are in EPSG 3857
  - So it is usual to have to transform the basic maps from 'EPSG:4326' to 'EPSG:3857'
  - When you configure a source with features, you have to provide them in the view projection (ie in EPSG:3857) as no transformation is possible.
- **Correction** Features are always geojson, and always 'EPSG:4326'.  Not sure what the statement above means
- The values for HcN in the Testbed are
  - lon0 = -3970;
  - lat0 = 6860390;
  - d = 300;
- Other than that we do everything with GeoJSON in Lon/Lat ('EPSG:4326'), and the View is 'EPSG:3857' (metres) See [these insights](https://github.com/openlayers/ol3/issues/4264)

- in M4OPS v1 we convert from the featureProjection: 'EPSG:3857' to the dataProjection: 'EPSG:4326', decimals: 8}) when we writeFeatures
- See [Vuelayers on Global data projection](https://vuelayers.github.io/#/docs/quickstart?id=global-data-projection)

#### Projections - Basics

- [EPSG:4326](https://epsg.io/4326) is WGS 84 -- WGS84 - World Geodetic System 1984, used in GPS, or Spherical Mercator: decimal degrees
  - and HcN is [-0.0322294, 52.3305610] (lon, lat)
- [EPSG:3857](https://epsg.io/3857) is WGS 84 / Pseudo-Mercator -- Spherical Mercator: metres
  - used by Google Maps (EPSG:900913), OpenStreetMap, Bing, ArcGIS, ESRI
  - and HcN is [-3591, 6860098] (x,y) - (metres East, metres North)
  - We do all georeferencing work based on the EPSG:3857
- [EPSG:27700](https://epsg.io/27700) is OSGB 1936 / British National Grid -- United Kingdom Ordnance Survey
  - and HcN is [534174, 272097] or TL3417472097
- Northings and Eastings
  - and HcN is 52° 19′ 50″ N 0° 01′ 56″ W

#### Projections - What we do

- For the internal view projection we use EPSG:3857 (the default) - this is the projection with which OpenLayers components will work (ol.View, ol.Feature etc)
- For the data-projection property on the vl-map component we use EPSG:4326 (as the demo does)
- We assume that all vector layers are geojson, and always read (and written) as 'EPSG:4326'
  - Thus for plain coordinates, and GeoJSON encoded features or geometries there is a thin projection transform layer between Vue (EPSG:4326) and OpenLayers (EPSG:3857)
- to add a projection use createProj, addProj from [ol-ext Projection transform helpers](https://github.com/ghettovoice/vuelayers/blob/master/src/ol-ext/proj.js)
  - this has lots of other useful transform functions
- TODO
  - shiftingProjections.js - we have not adapted yet (see ProjectionsArray in Place)
  - extents in layerAndSourceTile.js
  - projection in layerAndSourceWms.js
  - projection in mousePosition
  - Use the LayerDefs (string) projection member of their sourcedef

## Server Overview

When the client needs to communicate with the server it sends an asynchronous GET or POST request via eg fetch(`/continents`). The corresponding route is defined in the server's routes folder (and referenced in its app.js). When the server is done it notifies the client, which can then do any more processing dependent on the promise being completed.

```mermaid
graph LR;
  C[Client] -->|POST or GET| S[Server]
  S -->|Promise| C
```

The main program is app.js which sets up connections to the database, (express) routes, and listens on a port.

Each route (including with parameters eg :id) is

- in a file in the server/routes folder, which is
- referred to in app.js
- can be called from the client by eg fetch(`/continents`)

### Routes

- All on localhost:5000 (and formatted by JSONView)
  - /places - list of studies in M4OPS
    - /places/xxx - OPSDetails for XXX study, with all its bits and arrays
  - /continents - continent/country/location/study (each has M4OPS:true where it is/contains an included study)
  - /m4opsdata - the M4OPS.json file, with all its bits and arrays
  - /featurelayers/OPS_Xxxx - the given feature layer from the given OPS in FeatureLayers

### Connecting to MongoDB

The MongoDB URL (including database) is set in the environment variables (qv)

For each type of data held in the database, (via [Mongoose](https://mongoosejs.com/docs/guides.html)) we have

- a data structures (or [schema](https://mongoosejs.com/docs/guide.html)) defined in a file in the server/models folder
- a [model](https://mongoosejs.com/docs/models.html) defined in the same file
- a controller in the server/controllers folder that [queries, deletes and/or updates](https://mongoosejs.com/docs/queries.html) the data using [MongoDB](https://docs.mongodb.com/manual/tutorial/query-documents/)
- call(s) from routes to the controller to do its work

```mermaid
graph LR;
  C[Client] -->|POST or GET| S[Server]
  S -->|Promise| C
  S -->|model & controller| M[Mongoose/MongoDB]
  M -->|Promise| S
```

### Notes

- middleware
- server [needed this](https://stackoverflow.com/questions/21658832/npm-install-error-msb3428-could-not-load-the-visual-c-component-vcbuild-ex) then npm i  before running with nodemon

## MongoDB

- provides users with a NoSQL document database system (Open Source) [Documentation](https://docs.mongodb.com/manual/introduction/)
- we are on v4.0

- [Install MongoDB Community Edition on Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
  - Start windows service: Command line as Administrator “net start MongoDB” (not Powershell)

- MongoDB is designed to be run in trusted environments (ie Localhost) - but in production we use authentication

- URL (if we needed it) is mongodb://localhost:27017/m4opsdb

- See [Introduction to mongodb](https://scotch.io/tutorials/an-introduction-to-mongodb) and [Getting Started](https://docs.mongodb.com/manual/tutorial/getting-started/)

- [MongoDB Compass](https://www.mongodb.com/products/compass) provides a GUI, queries, CRUD – use localhost:27017 [documentation](https://docs.mongodb.com/compass/master/), [Getting started](https://www.mongodb.com/blog/post/getting-started-with-mongodb-compass)
  - Example query on Places {OPSCode:"HcN"}
  - If problem, use Resource Monitor: cmd as Admin, resmon.exe -\> CPU tab -\> in handles type Compass, and Kill one (will kill all) associated processes - and wait for it to happen.
- for the MongoDB interactive shell see [the manual](https://docs.mongodb.com/manual/mongo/), or [this tutorial](https://www.tutorialkart.com/mongodb/mongo-shell/) - example use:
  - mongo
  - use m4opsdb
  - show collections
  - db.M4OPSData.drop()

### Imports into MongoDB

- [MongoDB Compass](https://docs.mongodb.com/compass/current/import-export/) (but did not work)
- [mongoimport](https://docs.mongodb.com/manual/reference/program/mongoimport/) can import JSON and csv into MongoDB
- Remember that it is **one (JSON) document per line**, although a single JSON document can span more than one line
- can use [jsonformatter](https://jsonformatter.curiousconcept.com/) for checking one of the json, not using –jsonArray option
- from terminal, for a whole collection or a single document, use
  - mongoimport --db m4opsdb --collection M4OPSData --drop --file C:\Users\Peter2\Documents\Mapping\Software\M4OPS2\M4OPS.json
  - mongoimport --db m4opsdb --collection Places --drop --file C:\Users\Peter2\Documents\Mapping\Software\M4OPS2\Places.json
  - mongoimport --db m4opsdb --collection Continents --drop --file C:\Users\Peter2\Documents\Mapping\Software\M4OPS2\Continents.json
  - mongoimport --db m4opsdb --collection Forms --drop --file C:\projects\m4ops\client\src\modules\forms\vfgData\Forms.json
  - (Note that for now we do not import Users - we set them up manually via /regiter)
- For Feature Layers
  - can use: ...m4ops\utils\importAllFeatureLayers.bat
  - **Remember** the url of the source in Places (eg Testing VFG.geojson) when prefixed by OPS\_ (eg HcN\_) and all spaces replaced by underscores (\_) must equal the \_id in the geojson file of the Feature Layer
  - mongoimport --db m4opsdb --collection FeatureLayers --mode upsert --file "C:\Users\Peter2\Documents\Mapping\Software\M4OPS\OPS\ENG England\HcN Holywell-cum-Needingworth\FromDev\ForMongo\Pubs.geojson"
  - and then:
    - Buildings.geojson"
    - Censuses.geojson"
    - HcN land ownership.geojson"
    - OSM20180209.geojson"
    - test03.geojson"
  - (adding --drop ensures the target instance drops the collection before importing the data from the input)
  - (adding --mode upsert to replace documents whose _id matches the document(s) in the import file)
- (Note that the Studies collection is not used now)
- Note that layerAndSourceVector.js prepends the OPS_ (eg HcN_) to the layer id before using it in the URL to get it from the database via the server
  - and the FromDev\ForMongo versions of the FeatureLayers have the extra _id field to correspond eg "_id":"HcN_Pubs"
- maximum BSON (Mongodb) document size is 16 megabytes, or use GridFS API.

### To create Places.json

- using [M4OPS-manage](https://www.mapping4ops.org/ShowMapsDev/M4OPS-manage.html) and with OPS.csv as chosen file compile all the studies
- for each study upload the OPS.json file into the study's local folder
- use concatOPS.bat to create output.txt concatenated from all of the individual OPS.json files
- rename output.txt as Places.json

### Mongoose

- [Mongoose](https://www.npmjs.com/package/mongoose) is a MongoDB object modeling tool designed to work in an asynchronous environment - see [documentation](https://mongoosejs.com/docs/guide.html)
  - see also [gotchas](https://www.jaygould.co.uk/dev/2018/03/28/concice-collection-mongodb-mongoose-database.html)
  - always use the third parameter in mongoose.model(singular, schema, *collection*), because of default upper/lower case and pluralisation issues

- [CRUD operations in a Node.js, ExpressJS, MongoDB using mongoose](https://scotch.io/bar-talk/using-mongoosejs-in-node-js-and-mongodb-applications)

- [creating a RESTful API using Node, Express 4 and Mongoose to interact with MongoDB](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)
- [Introduction to Mongoose for MongoDB](https://medium.freecodecamp.org/introduction-to-mongoose-for-mongodb-d2a7aa593c57)

### MongoDB Backups

- see [documentation](https://docs.mongodb.com/manual/core/backups/)
- for now we use [mongodump](https://docs.mongodb.com/manual/reference/program/mongodump/)
- data is stored at dbPath: "C:\Program Files\MongoDB\Server\4.0\data" in [WiredTiger files](https://docs.mongodb.com/manual/core/wiredtiger)
- mongodump --db m4opsdb --out "C:\My Backups\MongoDB\Dump00"
- see [bsondump](https://docs.mongodb.com/manual/reference/program/bsondump/) for reading bson files

## Environment Variables

### Envars General

- [How to handle environment-specific settings in your JavaScript apps](https://medium.freecodecamp.org/environment-settings-in-javascript-apps-c5f9744282b6)
- [Working with Environment Variables in Node.js](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)
- [Implement NodeJS environment variables in a modern Webpack app](https://itnext.io/implement-nodejs-environment-variables-in-a-modern-webpack-app-df20c27fe5f0)

### Envars on Server

- the environment variables we need are defined in .env.example ( as used by dotenv-safe)
  - PORT (only needed in development)
  - MONGO_DB_URL [see doc](https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options)
- they are read before, or very early in, app.js starts
- console.log(process.env) shows them

#### Envars on Server: PC Development

- we use [dotenv-safe](https://github.com/rolodato/dotenv-safe) to read from .env (untracked), and this is called if MONGO_DB_URL is not already set
- they include (but we do not use) all the windows environment variables such as PATH

#### Envars on Server: Production

- We use Claudia/AWS Lambda
- .aws/credentials is stored in %UserProfile% (ie Peter)
- environment variables are all in prod.json
- these are read by claudia via --set-env-from-json

### Envars on Client

- In the client we use Vue CLI 3 standards - see [VueCLI 3: Environment Variables and Modes](https://cli.vuejs.org/guide/mode-and-env.html)
  - .env                # loaded in all cases
  - .env.local          # loaded in all cases, ignored by git
  - .env.[mode]         # only loaded in specified mode
  - .env.[mode].local   # only loaded in specified mode, ignored by git
  - (where [mode] is development, production or test)
  - Only variables that start with **VUE_APP_** will be available (via process.env. ), plus BASE_URL & NODE_ENV
  - Computed env vars can be in vue.config.js (still prefixed with VUE_APP_)
- Note that the older Vue CLI 2 had a config directory with dev.env.js and prod.env.js

## Into Production

### Principles

- The front end (Vue.js) is built within VS Code then uploaded to an AWS S3 bucket
- The (Node/Express) back end is constructed using claudia and uploaded into AWS Lamda
- The (MongoDB) database behind that is implemented in Mongo Atlas

Where possible we use AWS REGION N. Virginia (us-east-1)

### Guidance

- [Vue.js and AWS Lambda: Developing Production-Ready Apps (Part 1)](https://auth0.com/blog/vue-js-and-lambda-developing-production-ready-apps-part-1/)
- [Vue.js and AWS Lambda: Developing Production-Ready Apps (Part 2)](https://auth0.com/blog/vue-js-and-lambda-developing-production-ready-apps-part-2/)

- Created (m4ops@one-place-studies.org) accounts with:
  - AWS ( see also ...\Guiding documents\AWS S3 for storing maps.doc)
  - Auth0 (for later)
  - MongoDB Atlas (mLab is merging with them)

- Now we use nodemon src/appd to start development server (Lambda server is at src/app)

### Into Production - Client

- [Vue Production Deployment](https://vuejs.org/v2/guide/deployment.html)
- Not used:
  - [GitHub Pages](https://pages.github.com/) - we use AWS S3
  - [vue-loader](https://vue-loader.vuejs.org/) is a loader for webpack that handles Single-File Components (SFCs):
  - [CSS Extraction](https://vue-loader.vuejs.org/guide/extract-css.html#webpack-4)
  - [Kubernetes vs. Docker: What Does It Really Mean?](https://www.sumologic.com/blog/devops/kubernetes-vs-docker/)
  - See [Dockerize Vue.js App](https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html)

#### Client Build

From Terminal: C:\projects\m4ops\client>npm run build

- Compiled with 2 warnings
  - asset(s) exceed the recommended size limit (244 KiB).
    - js/chunk-vendors.2cee4a6c.js (1.2 MiB)
  - entrypoint(s) combined asset size exceeds the recommended limit (244 KiB)
    - app (1.51 MiB)
    - css/chunk-vendors.253ba11b.css
    - js/chunk-vendors.2cee4a6c.js
    - css/app.655d80b5.css
    - js/app.a9c51c81.js

``` bash
  File                                      Size             Gzipped

  dist\js\chunk-vendors.2cee4a6c.js         1229.84 kb       347.15 kb
  dist\js\app.a9c51c81.js                   47.83 kb         14.06 kb
  dist\js\about.30fd5a98.js                 1.64 kb          0.68 kb
  dist\precache-manifest.7a2d93dc6fc2147    1.01 kb          0.40 kb
  a8173f6a6a2fd6cfb.js
  dist\service-worker.js                    0.94 kb          0.53 kb
  dist\css\app.655d80b5.css                 241.59 kb        31.64 kb
  dist\css\chunk-vendors.253ba11b.css       31.60 kb         5.53 kb
  dist\css\about.0e433876.css               0.00 kb          0.02 kb
```

#### Client Upload to AWS

 See [Vue CLI 3 deployment instructions](https://cli.vuejs.org/guide/deployment.html) - essentially drag and drop contents of dist folder into AWS bucket.

 [Our website](http://m4ops.s3-website-us-east-1.amazonaws.com)

### Into Production - Server

#### AWS Lambda

- [AWS Lambda](https://aws.amazon.com/lambda/) needs [AWS API Gateway](https://aws.amazon.com/api-gateway/) to define how external services (or, in this case, a Vue.js client) can communicate with your serverless backend app - makes AWS Lambda not straightforward.
- We use an open-source tool called [**Claudia**.js](https://claudiajs.com/).
  - For doing it without claudia [see this](https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started-with-lambda-integration.html) and [this](https://ig.nore.me/2016/03/setting-up-lambda-and-a-gateway-through-the-cli/).

- To see what is happening in Lambda, and console messages, use AWS CloudWatch in the region we used (us-east-1) - [prices](https://aws.amazon.com/cloudwatch/pricing)
- but see [the serverless_computing_study](https://www.theregister.co.uk/2018/12/19/serverless_computing_study/)

#### Claudia

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

### General

- [Useful](https://dev.to/saigowthamr/build-and-deploy-a-rest-api--using-serverless-express-and-nodejs-3331)
- Popular Express middleware to define backend endpoints
  - [bodyParser](https://github.com/expressjs/body-parser) (have) - Express middleware that parses request bodies so you can access JSON objects sent by clients
  - [cors](https://github.com/expressjs/cors) (have) - Express middleware to make your endpoint accept cross-origin requests
  - [**helmet**](https://github.com/helmetjs/helmet) - Express middleware that helps to secure your apps with various HTTP headers
  - [**morgan**](https://github.com/expressjs/morgan) - HTTP request logger middleware for Node.js web apps
  - [mongodb](https://github.com/mongodb/node-mongodb-native) (we use mongoose??) - the MongoDB **native driver** for Node.js;

### Useful but not used

- [Deploying a production Node/Express Mongo App to AWS — soft lessons](https://medium.freecodecamp.org/deploying-a-production-node-express-mongo-app-to-aws-a-reflection-8982894289c6)
- refers to [How to deploy a Node.js app to the AWS Elastic Beanstalk](https://medium.freecodecamp.org/how-to-deploy-a-node-js-app-to-the-aws-elastic-beanstalk-f150899ed977)

- See [Google](https://www.google.co.uk/search?q=deploy+vue+express+mongodb&ei=marcW9fsOcncgAanirToDw&start=10&sa=N&ved=0ahUKEwiXna7RvbbeAhVJLsAKHScFDf0Q8NMDCMoB&biw=1536&bih=732)
- [Heroku for Node?](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
  - [How To Deploy Nodejs App To Heroku](https://appdividend.com/2018/04/14/how-to-deploy-nodejs-app-to-heroku/)
- [The Most Popular Deployment Tools For Serverless](http://blog.epsagon.com/the-most-popular-deployment-tools-for-serverless)
- [Why serverless newbies should use a deployment framework](https://dev.to/paulswail/why-serverless-newbies-should-use-a-deployment-framework-3ea4) recommends [Serverless Framework](https://github.com/serverless/serverless)
- [Now](https://zeit.co/now) is an alternative to claudia?

### Into Production - Database

#### MongoDB Atlas implementation

- [Documentation](https://docs.atlas.mongodb.com/) and [pricing](https://www.mongodb.com/cloud/atlas/pricing)
- Free tier has maximum 512 MB storage, no automatic backups - see [limitations](https://docs.atlas.mongodb.com/reference/free-shared-limitations/#atlas-free-tier)
- login (manual) via RoboForm
  - users m4ops_admin, m4ops_r, m4ops_rw - passwords in db
  - AWS REGION N. Virginia (us-east-1)
  - [how to connect (command line - v2?!)](https://cloud.mongodb.com/v2/5be012b7c56c9822a3b4ca0e#clusters/commandLineTools/Cluster0)
- mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-bfjgs.mongodb.net:27017,cluster0-shard-00-01-bfjgs.mongodb.net:27017,cluster0-shard-00-02-bfjgs.mongodb.net:27017 --ssl --username m4ops_admin --password opl0oUiDw3w9FAH7 --authenticationDatabase admin --db m4opsdb --collection M4OPSData --drop --file C:\Users\Peter2\Documents\Mapping\Software\M4OPS2\M4OPS.json
  - also need --type csv if not json
  - --authenticationDatabase admin just means the user's details are in the admin db
- Compass URI Connection String: mongodb+srv://m4ops_admin:opl0oUiDw3w9FAH7@cluster0-bfjgs.mongodb.net/admin
- See also [re Lambda](https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/)
- [whitelist etc](https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas)
- Need [VPC Peering](https://docs.atlas.mongodb.com/security-vpc-peering/?_ga=2.60596525.1806821640.1542128896-679673914.1534237061) and [this](https://www.mongodb.com/blog/post/introducing-vpc-peering-for-mongodb-atlas?jmp=adref) for production, but
  - (free) M0 clusters don’t support VPC Peering so we need
  - whitelist 0.0.0.0/0 (access from anywhere)
- older URI  mongodb://m4ops_r:iS2NPR3HBmsSTheK@cluster0-shard-00-00-bfjgs.mongodb.net:27017,cluster0-shard-00-01-bfjgs.mongodb.net:27017,cluster0-shard-00-02-bfjgs.mongodb.net:27017/m4opsdb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true
- [**Check this**](https://mongoosejs.com/docs/lambda.html)
- [Also](https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas)

## Other Notes

- [The Power of Web Components](https://hacks.mozilla.org/2018/11/the-power-of-web-components/)
- [anatomy-of-a-url](https://doepud.co.uk/blog/anatomy-of-a-url)
- Convert/prettify
  - In VSCode use [JSON to JS converter](https://marketplace.visualstudio.com/items?itemName=renatorodrigues.json-to-js) - Select a JSON string in the editor and in press Ctrl+Shift+J
  - [Useful conversions](https://transform.now.sh/) (and prettifier) - eg
    - JS Object to JSON
    - JSON to Mongoose Schema
    - Markdown to HTML
  - [CSS Formatter](https://www.cleancss.com/css-beautify/)
  - [FreeFormatter](https://www.freeformatter.com/json-formatter.html)
  - to generate code in VSCode could use [quicktype](https://quicktype.io/) - copy json into clipboard and "paste as code"
- Any locally installed command (eg xx) will be available at ./node_modules/.bin/xx in your project
  - node_modules/.bin directory will be added to system $PATH when your're running npm scripts, so you can directly use the local xx command there
- [Popular Systems in 2017](https://risingstars.js.org/2017/en/) - especially Vue.js
- We have a [codeSandbox](https://codesandbox.io/u/PeterC66) for trying things out
- [unpkg](https://unpkg.com/) is a fast, global content delivery network for everything on npm - it makes every npm package available in the browser
- Beware [Memory Leaks](https://vuejs.org/v2/cookbook/avoiding-memory-leaks.html)
- to [install a specific version](https://60devs.com/npm-install-specific-version.html) use eg npm install vuelayers@^0.11.0 --save
- to reload not from cache use location.reload(true) - the parameter forces it to reload from the server
- more slots, less props
