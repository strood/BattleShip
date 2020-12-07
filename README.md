# Webpack With React Frame

Same as Webapack with React loaders built in, and some structure implemented with router. Just sass built in here

Included are files that are useful examples or templates previously used in webpack projects. Follow the steps below to set up a webpack project, then use what you like. The structure of this repo demos that of the webpack project once set up.

---

## Webpack Proj Setup

- \$ mkdir webpack-demo
- \$ cd webpack-demo
- \$ npm init \*_Answer Q's or default with -y flag_
- \$ npm i webpack webpack-cli --save-dev

NOTE: --save-dev to save just for dev, --save to save globally/sticks to project. (Not required)

---

## package.json

Included is info on our package, one key element is scripts, which we use for more complex npm commands.

- Included is a general.package.json, this just shows a sample from an old project that can be used as guide when creating new projects. Various scripts or dependencies.

## webpack.config.js

Orchestrates the merging of our base config, and any additional configs we specifiy
through flags or scripts we run.

Basic use of config is specifying our Input -> Output, but we can also add things
like plugins, addons, or modules to further customize our build, or various
environments.

- Included is a general.webpack.config.js, this just shows a sample from an old
  project that can be used as guide when creating new projects. However, it is all in
  one file, so will abstract into our various build-utils based on what you need in
  new proj, as doing in one file not as clean.

## /src/index.js

Where we have pointed to as our entry point in our app, this is specified in webpack.common.js

- Note: Links to style-sheets in /styles. Use normalize or base if you want to reset css.

## /build-utils

This file will be where we organize our build configs based on environment, or see /addons for smaller plugins we may want to test on our code.

- ### webpack.common.js

  This serves as our base of commonly used plugins for projects, this is whats merges onto in webpack.config.js _see above^_

- ### webpack.prod.js - webpack.dev.js

  Prod and dev environment configs, set them up based on what you need in prod, and dev.
  Or if needed in both, maybe common is best place.

- ### common-paths.js

  Just a nice life hack to make our paths be in one place for easy maintenance.

- ### /addons

  A place to add small snippits of plugins we may want to run our code against. Make a script and run a plugin, try out making your own plugins. makes it really easy to sample things without polluting your main common, dev and prod configs.

### NOTE: Look up loader, plugins, ect for further config/info

---

### Setup basic project structure

    |webpack-demo
    |- /dist <- output as specifed in webpack.common.js
      |- main.bundle.js <- output from npm run build aka webpack.
      |- index.html <- output from html-webpack-plugin
      |- _redirects <- For netlify hosting w/ react router, can delete if NA
      |- *More random files will apear here based on our config*
    |- /src
      |- index.js - app/webpack entry point.
    |- /test
    |- __mocks__/ <--mocks for unit tests
    |- /build-utils
      |- /addons - area to add additional situational config/envs
        |- webpack.bundleanalyze.js -demo addon example
        |- webpack.firstplugin.js -demo plugin build area
      |- common-paths.js
      |- webpack.common.js -Common webpack configs
      |- webpack.dev.js -dev only config
      |- webpack.prod.js -prog only config
    |- webpack.config.js - Points to the build utils we are using
    |- package.json - Scripts, dependencies and package info.

    |- general.package.json -Demo package.json file w/ examples
    |- general.webpack.config.js - Demo config examples
    |- /node_modules - Our node modules
