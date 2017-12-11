
//Config
var applicationID = 'W6M077NCU8';
var apiKey = 'ecad65d2339f89d92cb4e13b5182c1b4';
var indexName = 'test_project1';

var client = algoliasearch(applicationID, apiKey);
//var helper = algoliasearchHelper(client, indexName);
var helper = algoliasearchHelper(client, index, {
  facets: ['food_type']
});

helper.on('result', function(content) {
  //renderFacetList(content); // not implemented yet
  renderHits(content);
});

function renderHits(content) {
  $('#container').html(function() {
    return $.map(content.hits, function(hit) {
      return '<li>' + hit._highlightResult.name.value + '</li>';
    });
  });
}

$('#facet-list').on('click', 'input[type=checkbox]', function(e) {
  var facetValue = $(this).data('facet');  
  helper.toggleRefinement('type', facetValue)
        .search();
});

function renderFacetList(content) {
  $('#facet-list').html(function() {
    return $.map(content.getFacetValues('type'), function(facet) {
      var checkbox = $('<input type=checkbox>')
        .data('facet', facet.name)
        .attr('id', 'fl-' + facet.name);
      if(facet.isRefined) checkbox.attr('checked', 'checked');
      var label = $('<label>').html(facet.name + ' (' + facet.count + ')')
                              .attr('for', 'fl-' + facet.name);
      return $('<li>').append(checkbox).append(label);
    });
  });
}

$('#search-box').on('keyup', function() {
  helper.setQuery($(this).val())
        .search();
});

helper.search();