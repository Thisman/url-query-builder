import assert from 'assert';
import should from 'should';
import URLQueryBuilder from '../src/index';

const siteUrl = "example.com";

describe('Url Query Builder', function () {
  describe('#init', function () {
    it('should parse initial query from url', function () {
      const qBuilder = new URLQueryBuilder(`${siteUrl  }?name=value`);

      assert.equal("example.com?name=value", qBuilder.get());
    });

    it('should parse inital query by @param {string} query', function () {
      const qBuilder = new URLQueryBuilder(siteUrl, "name=value");

      assert.equal("example.com?name=value", qBuilder.get());
    });

    it('should parse inital query by @param {object} query', function () {
      const qBuilder = new URLQueryBuilder(siteUrl, {
        "name": "value", 
        "name2":"value2"
      });

      assert.equal("example.com?name=value&name2=value2", qBuilder.get());
    });

    it('should not throw an exception when initialization without params', function () {
      should(() => new URLQueryBuilder()).not.throw();
    });

    it("don't added empty query after last &", function () {
      const qBuilder = new URLQueryBuilder(`${siteUrl  }?name=value&`);

      assert.equal("example.com?name=value", qBuilder.get());
    })
  });

  describe('#set()', function () {
    it('should set query string', function () {
      const qBuilder = new URLQueryBuilder(siteUrl);
      let url = qBuilder.set("name", "value").get();
      assert.equal("example.com?name=value", url);

      url = qBuilder.set("name2", "value2").get();
      assert.equal("example.com?name=value&name2=value2", url);
    });

    it('should set query object', function () {
      const qBuilder = new URLQueryBuilder(siteUrl);
      let url = qBuilder.set({"name": "value"}).get();
      assert.equal("example.com?name=value", url);

      url = qBuilder.set({"name2" : "value2"}).get();
      assert.equal("example.com?name=value&name2=value2", url);
    });
  });

  describe('#delete()', function () {
    it('should delete query string', function () {
      const qBuilder = new URLQueryBuilder(siteUrl);
      const url = qBuilder.set("name", "value")
        .delete("name")
        .get();

      assert.equal("example.com?", url);
    });
  });

  describe('#reset()', function () {
    it('should clear query string', function () {
      const qBuilder = new URLQueryBuilder(siteUrl, "name=value");
      const url = qBuilder.reset().get();

      assert.equal("example.com?", url);
    });

    it('should clear query string and set new value from param {string}', function () {
      const qBuilder = new URLQueryBuilder(siteUrl, "name=value");
      const url = qBuilder.reset("name2=value&name3=value").get();

      assert.equal("example.com?name2=value&name3=value", url);
    })

    it('should clear query string and set new value from param {object}', function () {
      const qBuilder = new URLQueryBuilder(siteUrl, "name=value");
      const url = qBuilder.reset({name2: "value", name3: "value"}).get();

      assert.equal("example.com?name2=value&name3=value", url);
    })
  });

  describe('#has()', function () {
    it('should return true if query name is exist', function () {
      const qBuilder = new URLQueryBuilder(`${siteUrl  }?name=value`);

      assert.equal(true, qBuilder.has("name"));
    });

    it('should return false if query name not exist', function () {
      const qBuilder = new URLQueryBuilder(`${siteUrl  }?name=value`);

      assert.equal(false, qBuilder.has("name2"));
    })
  });

  describe('#get()', function () {
    it("should'n return queries with undefined/null value", function () {
      const qBuilder = new URLQueryBuilder(siteUrl);
      qBuilder.set({
        value1: 0,
        value2: undefined,
        value3: null,
      })
      assert.equal("example.com?value1=0", qBuilder.get());
    });
  });
});
