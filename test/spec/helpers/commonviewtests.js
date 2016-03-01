var pluginManager = require('../../../src/framework/pluginmanager.js');
var jsdom = require('jsdom').jsdom;

var commonViewTests = function(scenario, initFunction) {

  describe('(basis view tests) ' + scenario, function() {

    var document, window, $;
    var data, ViewType;

    beforeEach(function() {
      var init = initFunction();
      data = pluginManager.createModel(JSON.parse(JSON.stringify(init.data)));
      ViewType = init.ViewType;

      document = global.document = jsdom("<html><head><style id='wl-obj-css'></style></head><body></body></html>");
      window = global.window = document.defaultView;
      $ = document.querySelector;
    });
    /*
        it('will add a new DOM element when no element is provided', function() {
          var view = new ViewType(data);
          expect(view.innerEl).not.toBeUndefined();
          expect(view.outerEl).not.toBeUndefined();
        });

        it('the DOM element will have the same tag as defined in the data model', function() {
          var view = new ViewType(data);
          expect(view.innerEl.tagName.toUpperCase()).toBe(data.attributes.tag.toUpperCase());
          expect(view.outerEl.tagName.toUpperCase()).toBe(data.attributes.tag.toUpperCase());
        });

        it('will add a _wlView property to the DOM element', function() {
          var view = new ViewType(data);
          var element = view.innerEl;
          expect(element._wlView === view).toBeTruthy();
        });
        it('when initialized with the noRender option true, the view doesn\'t get rendered', function() {
          var view = new ViewType(data, {
            noRender: true
          });

          expect(view.outerEl).toBeDefined();
          expect(view.outerEl.id).toBe('');
        });

        it('can be initialized with an existing element, without re-rendering', function() {
          var element = document.createElement('div');
          element.id = '1000';

          var view = new ViewType(data, {
            el: element
          });
          expect(view.outerEl).toBe(element);
          expect(view.outerEl.id).not.toBe(data.attributes.id);
        });


        it('will not automatic render the DOM element with data from it\'s dataModel', function() {
          var view = new ViewType(data);
          var element = view.outerEl;

          expect(element.id).not.toBe(data.attributes.id);
        });


        it('can be initialized with an existing element, forcing re-rendering', function() {
          var element = document.createElement('div');
          element.id = '1000';
          var view = new ViewType(data, {
            el: element,
            forceRender: true
          });
          expect(view.outerEl).toBe(element);
          expect(view.outerEl.id).toBe('wl-obj-' + data.attributes.id.toString()); // changed
        });

        it('cannot add view to existing element if that is already connected to another view', function() {
          var element = document.createElement('div');
          element.id = '1000';
          element._wlView = {};
          var options = {
            el: element
          };

          var fun = function() {
            var cv = new viewType(data, options);
          };
          expect(fun).toThrow()
        });

        it('is styled in a separte stylesheet if a style is defined', function() {
          var view = new ViewType(data);

          var expected = expect(document.getElementById('wl-obj-css').innerHTML);
          if (data.attributes.style) {
            expected.toContain("#wl-obj-" + data.attributes.id + "{" + data.attributes.style + "}");
          } else {
            expected.not.toContain("#wl-obj-" + data.attributes.id);
          }
        });

        it('will add a data-wl-id attribute DOM element', function() {
          var view = new ViewType(data);

          var element = view.outerEl;
          var data_wl_id = element.getAttribute('data-wl-id');
          expect(data_wl_id).toBe(data.attributes.id.toString());
        });

        it('will add a data-wl-type attribute DOM element', function() {
          var view = new ViewType(data);

          var element = view.outerEl;
          var data_wl_type = element.getAttribute('data-wl-type');
          expect(data_wl_type).toBe(data.attributes.type.toString());
        });

        it('will add a default class to the DOM element', function() {
          var view = new ViewType(data);

          var element = view.outerEl;
          var classAttribute = element.getAttribute('class');
          expect(classAttribute).toContain('object-default object-' + data.attributes.type);
        });

        it('will add classes that are defined in a data to the DOM element', function() {
          var view = new ViewType(data);

          var element = view.outerEl;
          var classAttribute = element.getAttribute('class');
          expect(classAttribute).toContain(data.attributes.classes);
        });

        it('will add classes that are defined in a data to the DOM element', function() {
          var view = new ViewType(data);

          var element = view.outerEl;
          var classAttribute = element.getAttribute('class');
          expect(classAttribute).toContain(data.attributes.classes);
        });

        it('will remove the linked DOM element from is parent when destroy is called', function() {
          var parent = document.createElement('div');
          var child = document.createElement('div');
          parent.appendChild(child);

          expect(parent.children.length).toBe(1);

          var view = new ViewType(data, {
            el: child
          });
          view.destroy();

          expect(parent.children.length).toBe(0);
          expect(child.parent).toBeUndefined();
        });

        it('will set the href attribute of the anchor DOM element to the link_to attribute of the data model', function() {
          var view = new ViewType(data);
          var element = view.outerEl;

          if (data.attributes.tag.toUpperCase() == 'A') {
            expect(element.hasAttribute('href')).toBeTruthy();
            expect(element.getAttribute('href')).toBe(data.attributes.linkTo ? data.attributes.linkTo : '');
          } else {
            expect(element.hasAttribute('href')).toBeFalsy();
          }
        });

        it('will set the target attribute of the anchor DOM element to the link_target attribute of the data model', function() {
          var view = new ViewType(data);
          var element = view.outerEl;

          if (data.attributes.tag.toUpperCase() == 'A') {
            expect(element.hasAttribute('target')).toBeTruthy();
            expect(element.getAttribute('target')).toBe(data.attributes.linkTarget ? data.attributes.linkTarget : '_self');
          } else {
            expect(element.hasAttribute('target')).toBeFalsy();
          }
        });*/

    it('when no dataObject is passed and no DOM element is passed, a dataObject can\'t be found', function() {
      var error = function() {
        var view = new ViewType(undefined, {});
      };

      expect(error).toThrow('data object must exist when creating a view');
    });

    it('when no dataObject is passed and a DOM element is passed, this DOM element will be parsed to get a dataObject', function() {
      var element = document.createElement('a');
      element.setAttribute('data-wl-id', 1);
      element.setAttribute('data-wl-type', data.attributes.type);
      element.style.display = 'none';
      element.style.zIndex = 2;
      element.style.width = '100px';
      element.style.height = '200px';
      element.style.left = '50px';
      element.style.top = '25px';
      element.className = 'object-default object-' + data.attributes.type + ' someClass';
      element.setAttribute('href', 'url');
      element.setAttribute('target', '_self');

      var view = new ViewType(undefined, {
        el: element
      });

      var dataObject = view.data;
      expect(dataObject).toBeDefined();

      expect(dataObject.attributes.id).toBe('1');
      expect(dataObject.attributes.type).toBe(data.attributes.type);
      expect(dataObject.attributes.tag).toBe('A');
      expect(dataObject.attributes.classes).toBe(' someClass');
      expect(dataObject.attributes.linkTo).toBe('url');
      expect(dataObject.attributes.linkTarget).toBe('_self');
      expect(dataObject.attributes.x).toBe('50px');
      expect(dataObject.attributes.y).toBe('25px');
      expect(dataObject.attributes.hidden).toBe(true);
      expect(dataObject.attributes.zIndex).toBe('2');
      expect(dataObject.attributes.width).toBe('100px');
      expect(dataObject.attributes.height).toBe('200px');
    });

    it('will contain a Parse method to read the data from a DOM element', function() {
      expect(ViewType.parse).toBeDefined();
    });

    it('the Parse method will return a data object with all the data-wl-* attributes from a DOM element', function() {
      var element = document.createElement('a');
      element.setAttribute('data-wl-someThing', '1');
      element.setAttribute('data-wl-someThingElse', '2');
      element.setAttribute('data-custom', '3');

      var dataObject = ViewType.parse(element);

      expect(dataObject).toBeDefined();
      expect(dataObject.something).toBe('1');
      expect(dataObject.somethingelse).toBe('2');
      expect(dataObject.custom).toBeUndefined();
    });

    it('the Parse method will return a data object based on a DOM element', function() {
      var element = document.createElement('a');
      element.setAttribute('data-wl-id', 1);
      element.setAttribute('data-wl-type', data.attributes.type);
      element.style.display = 'none';
      element.style.zIndex = 2;
      element.style.width = '100px';
      element.style.height = '200px';
      element.style.left = '50px';
      element.style.top = '25px';
      element.className = 'object-default object-' + data.attributes.type + ' someClass';
      element.setAttribute('href', 'url');
      element.setAttribute('target', '_self');

      var dataObject = ViewType.parse(element);

      expect(dataObject).toBeDefined();
      expect(dataObject.id).toBe('1');
      expect(dataObject.type).toBe(data.attributes.type);
      expect(dataObject.tag).toBe('A');
      expect(dataObject.classes).toBe(' someClass');
      expect(dataObject.linkTo).toBe('url');
      expect(dataObject.linkTarget).toBe('_self');
      expect(dataObject.x).toBe('50');
      expect(dataObject.y).toBe('25');
      expect(dataObject.hidden).toBe(true);
      expect(dataObject.zIndex).toBe('2');
      expect(dataObject.width).toBe('100px');
      expect(dataObject.height).toBe('200px');
    });

    it('listens for changes on its DOM element when _observerCounter is 0', function() {
      var view = new ViewType(data);
      var element = view.outerEl;
      view.render();

      expect(view._observer).toBeDefined();
      expect(view._observerCounter).toBe(0);

      element.style.width = "55px";
      element.className = "a_class";
      element.setAttribute('data-wl-custom', 10);

      expect(data.attributes.width).toBe('55px');
      expect(data.attributes.classes).toBe('a_class');
      expect(data.attributes.custom).toBe('10');
    });

    it('doesn\'t listen for changes on its DOM element when _observerCounter is greater then 0', function() {
      var view = new ViewType(data);
      var element = view.outerEl;

      view.render();
      view.disableObserver();

      expect(view._observer).toBeDefined();
      expect(view._observerCounter).toBe(1);

      element.style.width = "55px";
      element.className = "a_class";
      element.setAttribute('data-wl-custom', 10);

      expect(data.attributes.width).not.toBe('55px');
      expect(data.attributes.classes).not.toBe('a_class');
      expect(data.attributes.custom).not.toBe('10');
    });

    it('will listen for chnanges on its DOM element by default', function() {
      var view = new ViewType(data);
      var element = view.outerEl;

      expect(view._observer).toBeDefined();
      expect(view._observerCounter).toBe(0);
    });
  });
};

module.exports = commonViewTests;
