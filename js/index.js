//Config
var applicationID = 'W6M077NCU8';
var apiKey = 'ecad65d2339f89d92cb4e13b5182c1b4';
var indexName = 'test_project1';

var client = algoliasearch(applicationID, apiKey);
var helper = algoliasearchHelper(client, indexName, {
  facets: ['food_type']
});

helper.on('result', function(content) {
  renderHits(content);

});

function renderHits(content) {
  //$('#container').html(JSON.stringify(content, null, 2));
  var count = 0;
  var processingTime = 0.001;
  var c = 0;
  $('#container').html(function() {
    count = content.nbHits;
    processingTime = content.processingTimeMS;
    return $.map(content.hits, function(hit) {
      c+=1;
      //var str = "<li><div class='dp ycdp'><div class='dpl'><img src='https://www.opentable.com/img/restimages/99943.jpg'  width='110' /></div><div class='dpr'><div class='dpr1'>Anchor and Hope</div><div class='dpr2'><span>4.2</span><img src='images/star4.png'  height='25' /> (1897 reviews)</div><br><div class='dpr3'>American & Seafood | SOMA | $31 TO $50</div></div></div></li>";
      var str = "<li><div class='dp";
      var str_img = "images/star" + parseInt(hit.stars_count) + ".png";
      if (c>3) str+="p";

      str+="'><div class='dpl'><img src='" + hit.Image_URL + "'width='110' /></div><div class='dpr'><div class='dpr1'>";
      str+="<a href='" + hit.URL + "'target='_blank'  style='text-decoration: none'>" + hit.name + "</a></div><div class='dpr2'><span>" + hit.stars_count + "</span><img src='"+ str_img + "'  height='25' /> (";
      str+=hit.reviews_count + " reviews)</div><div class='dpr3'>" + hit.food_type + " | " + hit.neighborhood + " | ";
      str+=hit.price_range + "</div></div></div><li>";
      return str;
    });
  });
  var str = "<p>" + count + " results found <span>in ";
  str += processingTime/1000 + " seconds &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:#D8D8D8;'>_____________________________________________________________</span></span></p>";
  document.getElementById("stats").innerHTML = str;
}


function ycdp(){
  var yc=document.getElementsByClassName("dpp");
  //document.getElementsByClassName("left")[0].style.height="3000px";
  //document.getElementsByClassName("smore").style.display="none";
  if(document.getElementById("smore").innerHTML == "Show More"){
    document.getElementById("smore").innerHTML = "Show Less";
    for(i=0;i<yc.length;i++){
      yc[i].style.display="block";
    }
  }else{
     document.getElementById("smore").innerHTML = "Show More";
     for(i=0;i<yc.length;i++){
      yc[i].style.display="none";
    }
  }
}

var prevId = "no";
function leftClick(clicked_id){
  if(prevId!="no"){
    document.getElementById(prevId).style.background = "white";
    document.getElementById(prevId).style.color = "#000000";
    document.getElementById(prevId).style.borderRadius = "0px";
    var tmp = document.getElementById(prevId).getElementsByTagName('span');
    tmp[0].style.color="#CCC";
  }
  document.getElementById(clicked_id).style.borderRadius = "5px";
  document.getElementById(clicked_id).style.background = "#4A95C0";
  document.getElementById(clicked_id).style.color = "#FFFFFF";
  var tmp = document.getElementById(clicked_id).getElementsByTagName('span');
  tmp[0].style.color="#FFFFFF";
  prevId = clicked_id;
}


var prevId2 = "no";
function leftClick2(clicked_id){
  if(prevId2!="no"){
    document.getElementById(prevId2).style.color = "#000000";
    document.getElementById(prevId2).style.border = "dotted 0px white";
  }
  document.getElementById(clicked_id).style.borderRadius = "5px";
  document.getElementById(clicked_id).style.border = "1px dotted grey";
  prevId2 = clicked_id;
}


var prevId3 = "no";
function leftClick3(clicked_id){
  if(prevId3!="no"){
    document.getElementById(prevId3).style.background = "white";
    document.getElementById(prevId3).style.color = "#000000";
    document.getElementById(prevId3).style.borderRadius = "0px";
    var tmp = document.getElementById(prevId3).getElementsByTagName('span');
    tmp[0].style.color="#CCC";
  }
  document.getElementById(clicked_id).style.borderRadius = "5px";
  document.getElementById(clicked_id).style.background = "#4A95C0";
  document.getElementById(clicked_id).style.color = "#FFFFFF";
  var tmp = document.getElementById(clicked_id).getElementsByTagName('span');
  tmp[0].style.color="#FFFFFF";
  prevId3 = clicked_id;
}


function uncheck(clicked_id){
  if(clicked_id=="Cuisine"){
    document.getElementById(prevId).style.background = "white";
    document.getElementById(prevId).style.color = "#000000";
    document.getElementById(prevId).style.borderRadius = "0px";
    var tmp = document.getElementById(prevId).getElementsByTagName('span');
    tmp[0].style.color="#CCC";
  }else if(clicked_id=="Rating"){
    document.getElementById(prevId2).style.color = "#000000";
    document.getElementById(prevId2).style.border = "dotted 0px white";
  }else{
    document.getElementById(prevId3).style.background = "white";
    document.getElementById(prevId3).style.color = "#000000";
    document.getElementById(prevId3).style.borderRadius = "0px";
    var tmp = document.getElementById(prevId3).getElementsByTagName('span');
    tmp[0].style.color="#CCC";
  }
}
$('#search-box').on('keyup', function() {
  helper.setQuery($(this).val())
        .search();
});

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



helper.search();