var assert = require('assert');
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
	});


	describe('#change()', function () {
		it('should change query string to url', function () {
			var qBuilder = new URLQueryBuilder(siteUrl);
			var url = qBuilder.add("name", "value")
				.change("name", "newValue")
				.getUrl();

			assert.equal("example.com?name=newValue&", url);
		});
	});

	describe('#delete()', function () {
		it('should delete query string to url', function () {
			var qBuilder = new URLQueryBuilder(siteUrl);
			var url = qBuilder.add("name", "value")
				.delete("name")
				.getUrl();

			assert.equal("example.com?", url);
		});
	});

});