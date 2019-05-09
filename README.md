# express-angularjs-typescript-sqlite-webpack
## Starting the application
This application runs using webpack-dev-server and node.js (11.15.0 as sqlite3 is not yet compatible with v12.0)

To run this application, from the root directory of the project run:
```bash
yarn install
```
Then navigate to the public repository to build the front end:
```bash
cd src/public
yarn install
yarn run prestart
yarn run start
```
Now the backend can be started:
```bash
cd ../..
yarn run dev
```
## To Do
- [ ] Fix webpack to correctly compile angularjs dependencies so application can be served correctly from backend
- [ ] Enable strictdi on angularjs app
- [ ] E2E testing with protractor
- [ ] Solve Karma run issues
- [ ] DB authentication
- [ ] Implement JWT to validate requests
- [ ] Upgrade to Node.js 12 when sqlite3 dependency adds support
- [ ] Tidy unused webpack loader dependencies
