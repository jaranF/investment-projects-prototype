const { handle404, handleError} = require('app/error/handlers');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const express = require('express');
const path = require('path');

const routes = require('app/routes');
const investmentTypesRoute = require('app/modules/investment-types/route');
const ciInvestorOpportunity = require('app/modules/ci-investor-opportunity/route');
const session = require('app/session/session');
const sessionCheck = require('app/session/sessionCheck');
const app = express();

app.use(session);
app.use(sessionCheck);
app.enable('trust proxy');

const dist = path.resolve(__dirname, '../dist');
const images = path.resolve(__dirname, 'assets/images');
const govukFrontend = path.resolve(__dirname, '../node_modules/govuk-frontend');

app.use('/dist', express.static(dist));
app.use('/assets/images', express.static(images));
app.use('/assets', express.static(govukFrontend));
app.use('/assets', express.static(`${govukFrontend}/assets`));

nunjucks.configure([
  'app/templates',
  'app/modules/investment-types/',
  'app/modules/ci-investor-opportunity/',
  'node_modules/govuk-frontend/',
  'node_modules/govuk-frontend/components/'
], {
  autoescape: true,
  express: app,
});

app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use(investmentTypesRoute);
app.use(ciInvestorOpportunity);

app.use(handle404);
app.use(handleError);

module.exports = app;
