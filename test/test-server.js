const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Blog API', function(){

	before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });	

  it("should list items on get request", function(){
  	return chai.request(app).get("/blog").then(function(res){
  		console.log("test");
  		expect(res).to.have.status(200);
  		expect(res).to.be.json;
  		expect(res.body).to.be.a('array');
  		expect(res.body.length).to.be.at.least(1);
  		const expectedKeys = ['id','title', 'content','author','publishDate'];
  		res.body.forEach(function(item){

  			expect(item).to.be.a('object');
         	expect(item).to.include.keys(expectedKeys);
  		});
  	});
  });

  it('should add item on POST', function(){
  	const newItem = {
  		title: "test",
  		content: "here is some content",
  		author: "me",
  		publishDate: "today"
  	};

  	return chai.request(app).post("/blog").send(newItem).then(function (res){
		expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id','title', 'content','author','publishDate');
        expect(res.body.id).to.not.equal(null); 
        expect(res.body).to.deep.equal(Object.assign(newItem, {id: res.body.id}));
  	});
  });

  it('update when put', function(){
  	const updateData = {
      title: 'foo',
      content: 'foobar',
      author: 'bar'
    };
    return chai.request(app).get("/blog").then(function(res){
    	updateData.id = res.body[0].id

    	return chai.request(app).put(`/blog/${updateData.id}`).send(updateData);
    }).then(function(res){
    	expect(res).to.have.status(204);
    });
  });
  it('should delete when on delete', function(){
  	return chai.request(app).get("/blog").then(function(res){
  		return chai.request(app).delete(`/blog/${res.body[0].id}`);
  	}).then(function(res){
  		expect(res).to.have.status(204);
  	});
  });
});