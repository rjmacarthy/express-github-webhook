
## express-github-webhook

An express server to listen for `push` events from a specific branch of github repository and run a bash script when this happens.

Set environment variables.

```
PORT=3000
SECRET=YOUR_GITHUB_WEBHOOK_SECRET
EXEC_SCRIPT=/home/test/test.sh
BRANCH=refs/head/master
BASIC_AUTH_PASSWORD=test
```

### Install

`npm install`

### Serve

`node index.js`

### Api

POST `/deploy` webhook url to configure in github
GET `/deploy` to show output of bash script

### Test

`npm run test`

### Lint

`npm run lint`
