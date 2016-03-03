var jsdom = require("jsdom").jsdom;

var StageView = require('../../src/framework/stageview.js');
var LayerView = require('../../src/framework/layerview.js');
var StageData = require('../../src/framework/stagedata.js');
var CommonViewTests = require('./helpers/commonviewtests.js');
var CommonGroupViewTests = require('./helpers/commongroupviewtests.js');
var GroupView_renderChildPositionTests = require('./helpers/groupview_renderchildpositiontests.js');
var Common_renderChildPositionTests = require('./helpers/common_renderchildpositiontests.js');
var DatasetReader = require('./helpers/datasetreader.js');

var ViewsCommonParseTests = require('./helpers/views/common/parsetests.js');
var ViewsGroup_parseChildrenTests = require('./helpers/views/group/_parseChildrentests.js');


describe("StageView", function() {

  var document, window, $;
  var datasetReader = new DatasetReader();

  /*
    CommonViewTests(function() {
      return {
          data: datasetReader.readFromFile('simple_stagedata.js')[0],
          ViewType : StageView
      };
    });
  */

  CommonGroupViewTests('simple_stagedata.js', function() {
    return {
      data: datasetReader.readFromFile('simple_stagedata.js'),
      ViewType: StageView,
      parentId: 110540
    };
  });

  CommonGroupViewTests('test_data_set.js', function() {
    return {
      data: datasetReader.readFromFile('test_data_set.js'),
      ViewType: StageView,
      parentId: 1
    };
  });

  ViewsCommonParseTests({
    ViewType: StageView,
    viewTypeName: 'StageView',
    type: 'stage'
  });

  xdescribe("will run when the layerView parse method runs", function() {
    ViewsGroup_parseChildrenTests({
      ViewType: StageView,
      viewTypeName: 'StageView',
      type: 'stage',
      HTML: "<div id='100' data-wl-id='100' data-wl-type='stage'>" +
        "<div id='element1'></div>" +
        "<div id='101' data-wl-id='101' data-wl-type='layer'></div>" +
        "<div id='element2'></div>" +
        "<div id='102' data-wl-id='102' data-wl-type='layer'></div>" +
        "<div id='element3'></div>",
      expectedChildren: ['101', '102']
    });
  });
})
