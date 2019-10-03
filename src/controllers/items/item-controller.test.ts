import server from '../../../server';
import {describe} from 'mocha';
const chai = require('chai');
const should = chai.should();

const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

describe('Items', () =>{
  describe('GET /api/items', () => {
     it('Should return list of items', () =>{
        return chai.request(server)
          .get('/api/items')
          .then(response => {
            expect(response.status).to.eql(200);
            expect(response.type).to.eql('application/json');
            response.body.length.should.eql(2);
            response.body[0].should.include.keys('id', 'name', 'active','createdAt', 'updatedAt');
          })
     })
  });
});
