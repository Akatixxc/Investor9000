const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe('Routes', () => {
    // Hyvin yksinkertainen testi joka testaa 404 routen
    it('should return 404', done => {
        chai.request(app)
            .get(`/ivalidPath`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});
