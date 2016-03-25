var assert = require('assert');
var should = require('should');
var URLQueryBuilder = require('./index.js');

var siteUrl = "example.com";


describe('Url Query Builder', function() {

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

});