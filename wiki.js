$(document).ready(function() {

    /*BIND ENTER-KEY TO SEARCH BUTTON BY WRAPPING SEARCH IN A FUNCTION*/
	
	$('#request').keypress(function(e) {
	  
	  if (e.which == 13) {
		wikisearch();
		
		/*getting ridiculous now*/;
	  };
	});

	
	/*GET RANDOM WIKIPEDIA ARTICLE*/
  $("#getRandom").on("click",function() {
    
    var randomUrl = "http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&format=json&callback=?&exintro=";
    
	$.getJSON(randomUrl, function(randomRes) {
		
		var rpage = Object.keys(randomRes.query.pages);
		var rextract = randomRes.query.pages[rpage].extract;
    var rtitle = randomRes.query.pages[rpage].title;
    var rbutton = rtitle.replace(/ /g, "%20");
		
		$(".result").html(rextract+"<br> <button id='goto' class='btn btn-default btn-xs'>View @ Wikipedia'</button>");
     
    $("#goto").on("click",function() {
         window.open("https://en.wikipedia.org/wiki/"+rbutton);
		
	});
    });        
          
  });
  
  
  /*FUNCTION TRIGGERED ON CLICK OF SEARCH BUTTON*/
  
  $("#request").on("click", function() {
	  
	  wikisearch()
  });

  function wikisearch() {
		
	var search = $("#search").val();
    var s = search.replace(/ /g, "%20");

    var url = "http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&redirects=&exintro=&callback=?&titles=" + s;
    
    if (s === "") {
      $(".result").html("<p style='text-align:center'>No Search term entered.</p>");
    }

    $.getJSON(url, function(res) {
      var page = Object.keys(res.query.pages);
      var extract = res.query.pages[page].extract;
      var html;

      if (page > 0) {
        html = res.query.pages[page].extract+"<br> <button id='goto' class='btn btn-default btn-xs'>View @ Wikipedia'</button>";

      } else {
        html = "<p style='text-align:center'>No results found.</p>";
      };

      $(".result").html(html);
      
      $("#goto").on("click",function() {
         window.open("https://en.wikipedia.org/wiki/"+s);
        
      });

    });

  };
 
  

});