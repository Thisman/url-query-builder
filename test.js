var assert = require('assert');
var should = require('should');
var URLQueryBuilder = require('./index.js');

var siteUrl = "example.com";


describe('Url Query Builder', function() {

	describe('#init', function () {
		it('should parse initial query from url', function () {
			var qBuilder = new URLQueryBuilder(siteUrl + "?name=value");
			var url = qBuilder.add("name2", "value2").add({cost: 100}).getUrl();

			assert.equal("example.com?name=value&name2=value2&cost=100&", url);
		});

		it('should parse inital query by @param {string} query', function () {
			var qBuilder = new URLQueryBuilder(siteUrl, "name=value");
			var url = qBuilder.getUrl();

			assert.equal("example.com?name=value&", url);
		});

		it('should parse inital query by @param {object} query', function () {
			var qBuilder = new URLQueryBuilder(siteUrl, {"name": "value", "name2":"value2"});
			var url = qBuilder.getUrl();

			assert.equal("example.com?name=value&name2=value2&", url);
		});

		it('should not throw an exception when initialization without params', function () {
			(function () {
				var qBuilder = new URLQueryBuilder();
			}).should.not.throw();
		});
	});


	describe('#add()', function () {
		it('should add query string to url', function () {
			var qBuilder = new URLQueryBuilder(siteUrl);
			var url = qBuilder.add("name", "value").getUrl();
			assert.equal( "example.com?name=value&", url);

			url = qBuilder.add("name2", "value2").getUrl();
			assert.equal("example.com?name=value&name2=value2&", url);
		});

		it('should throw error trying add query that already exist', function () {
			(function () {
				var qBuilder = new URLQueryBuilder(siteUrl);
				var url = qBuilder.add("name", "value")
					.add("name", "value")
			}).should.throw();		
		})

		it('should add query object to url', function () {
			var qBuilder = new URLQueryBuilder(siteUrl);
			var url = qBuilder.add({"name": "value"}).getUrl();
			assert.equal( "example.com?name=value&", url);

			url = qBuilder.add({"name2" : "value2"}).getUrl();
			assert.equal("example.com?name=value&name2=value2&", url);
		});

		it('should throw error trying add query {object} that already exist', function () {
			(function () {
				var qBuilder = new URLQueryBuilder(siteUrl);
				var url = qBuilder.add("name", "value")
					.add({"name" : "value"})
			}).should.throw();		
		})
	});


	describe('#change()', function () {
		it('should change query string to url', function () {
			var qBuilder = new URLQueryBuilder(siteUrl);
			var url = qBuilder.add("name", "value")
				.change("name", "newValue")
				.getUrl();

			assert.equal("example.com?name=newValue&", url);
		});

		it('should throw error trying change query that not exist', function () {
			(function () {
				var qBuilder = new URLQueryBuilder(siteUrl);
				var url = qBuilder.add("name", "value")
					.change("name2", "value")
			}).should.throw();		
		})
	});

	describe('#delete()', function () {
		it('should delete query string to url', function () {
			var qBuilder = new URLQueryBuilder(siteUrl);
			var url = qBuilder.add("name", "value")
				.delete("name")
				.getUrl();

			assert.equal("example.com?", url);
		});

		it('should throw error trying delete query that not exist', function () {
			(function () {
				var qBuilder = new URLQueryBuilder(siteUrl);
				var url = qBuilder.add("name", "value")
					.delete("name2", "value")
			}).should.throw();		
		})
	});

	describe('#reset()', function () {
		it('should clear query string', function () {
			var qBuilder = new URLQueryBuilder(siteUrl, "name=value");
			var url = qBuilder.reset()
				.getUrl();

			assert.equal("example.com?", url);
		});

		it('should clear query string and set new value from param {string}', function () {
			var qBuilder = new URLQueryBuilder(siteUrl, "name=value");
			var url = qBuilder.reset("name2=value&name3=value")
				.getUrl();

			assert.equal("example.com?name2=value&name3=value&", url);
		})

		it('should clear query string and set new value from param {object}', function () {
			var qBuilder = new URLQueryBuilder(siteUrl, "name=value");
			var url = qBuilder.reset({name2: "value", name3: "value"})
				.getUrl();

			assert.equal("example.com?name2=value&name3=value&", url);
		})
	});

});