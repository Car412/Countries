/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  name: 'Argentina',
  id: 'ARG',                           // faltaban datos
  flags: "https://flagcdn.com/ar.svg",
  continents: "South America",
  capital: "Buenos Aires",
  subregion: "South America",
  area: '2780400',
  population: '45376763',
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country))); // cambié pokemon por country
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
  describe('GET /countries ID', ()=>{ // muestra country por ID
    it('should get 200', ()=>
    agent.get('/countries/ARG').expect(200)
    )
  })
});
