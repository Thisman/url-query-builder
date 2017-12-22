const assert = require('assert');
const should = require('should');
const URLQueryBuilder = require('./index.js').default;

const siteUrl = "example.com";


describe('Url Query Builder', function() {

	describe('#init', function () {
		it('should parse initial query from url', function () {
			const qBuilder = new URLQueryBuilder(siteUrl + "?name=value");

			assert.equal("example.com?name=value", qBuilder.getUrl() );
		});

		it('should parse inital query by @param {string} query', function () {
            const qBuilder = new URLQueryBuilder(siteUrl, "name=value");

			assert.equal("example.com?name=value", qBuilder.getUrl() );
		});

		it('should parse inital query by @param {object} query', function () {
            const qBuilder = new URLQueryBuilder(siteUrl, {
				"name": "value", 
				"name2":"value2"
			});

			assert.equal("example.com?name=value&name2=value2", qBuilder.getUrl() );
		});

		it('should not throw an exception when initialization without params', function () {
			(() => new URLQueryBuilder()).should.not.throw();
		});

		it("don't added empty query after last &", function () {
            const qBuilder = new URLQueryBuilder(siteUrl + "?name=value&");

			assert.equal("example.com?name=value", qBuilder.getUrl() );
		})
	});

	describe('#add()', function () {
		it('should add query string', function () {
            const qBuilder = new URLQueryBuilder(siteUrl);
            let url = qBuilder.add("name", "value").getUrl();
			assert.equal( "example.com?name=value", url);

			url = qBuilder.add("name2", "value2").getUrl();
			assert.equal("example.com?name=value&name2=value2", url);
		});

		it('should add query object', function () {
            const qBuilder = new URLQueryBuilder(siteUrl);
            let url = qBuilder.add({"name": "value"}).getUrl();
			assert.equal( "example.com?name=value", url);

			url = qBuilder.add({"name2" : "value2"}).getUrl();
			assert.equal("example.com?name=value&name2=value2", url);
		});
	});

	describe('#change()', function () {
		it('should change query string', function () {
            const qBuilder = new URLQueryBuilder(siteUrl);
            const url = qBuilder.add("name", "value")
				.change("name", "newValue")
				.getUrl();

			assert.equal("example.com?name=newValue", url);
		});
	});

	describe('#delete()', function () {
		it('should delete query string', function () {
            const qBuilder = new URLQueryBuilder(siteUrl);
            const url = qBuilder.add("name", "value")
				.delete("name")
				.getUrl();

			assert.equal("example.com?", url);
		});
	});

	describe('#reset()', function () {
		it('should clear query string', function () {
            const qBuilder = new URLQueryBuilder(siteUrl, "name=value");
            const url = qBuilder.reset()
				.getUrl();

			assert.equal("example.com?", url);
		});

		it('should clear query string and set new value from param {string}', function () {
            const qBuilder = new URLQueryBuilder(siteUrl, "name=value");
            const url = qBuilder.reset("name2=value&name3=value")
				.getUrl();

			assert.equal("example.com?name2=value&name3=value", url);
		})

		it('should clear query string and set new value from param {object}', function () {
            const qBuilder = new URLQueryBuilder(siteUrl, "name=value");
            const url = qBuilder.reset({name2: "value", name3: "value"})
				.getUrl();

			assert.equal("example.com?name2=value&name3=value", url);
		})
	});

	describe('#has()', function () {
		it('should return true if query name is exist', function () {
            const qBuilder = new URLQueryBuilder(siteUrl + "?name=value");

			assert.equal(true, qBuilder.has("name"));
		});

		it('should return false if query name not exist', function () {
            const qBuilder = new URLQueryBuilder(siteUrl + "?name=value");

			assert.equal(false, qBuilder.has("name2"));
		})
	});

	describe('#getUrl()', function () {
		it("should'n return queries with undefined/null value", function () {
            const qBuilder = new URLQueryBuilder(siteUrl);
			qBuilder.add({
				value1: 0,
				value2: undefined,
				value3: null,
				value4: {}.someProp
			})
			assert.equal("example.com?value1=0", qBuilder.getUrl());
		});
	});
});