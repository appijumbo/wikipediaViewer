(function () {
"use strict";

    var wikipediaAPi = "https://en.wikipedia.org/w/api.php?";
    var dataTypeList = {action: 'opensearch', format: 'json', namespace:'0', limit:'10', search:'bbc'};
    var dataTypeRand = {action: 'query', format: 'json', list:'random', rnnamespace:'0', rnlimit: '1'};
    var newurl = 'https://en.wikipedia.org/w/index.php?curid=';
    
    var rndAjax = $.ajax({
        type: 'GET',   // the URL to which the request is sent
        url: wikipediaAPi,  // need a single random wiki page
        dataType: 'jsonp',  // support cross-site requests domains (https://www.mediawiki.org/wiki/API:Cross-site_requests)
        data: dataTypeRand,
        traditional: true
    });
        
    
    
        var listAjax = $.ajax({
        type: 'GET',   // the URL to which the request is sent
        url: wikipediaAPi,  // need a single random wiki page
        dataType: 'jsonp',  // support cross-site requests domains (https://www.mediawiki.org/wiki/API:Cross-site_requests)
        data: dataTypeList,
        traditional: true
    });
    
    
    
    function rndPageAjax(){
       
        rndAjax
        .done(function(dataR) {
            console.log('random Page is', dataR);
            console.log("dataR.query.random[0].id  " + dataR.query.random[0].id);
            window.location = newurl + dataR.query.random[0].id;
        })
        .fail(function(xhrR) {
          console.log('error callback for random page condition', xhrR);
        });
    }
    
    
    
    function searchAjax(){
      
        listAjax
        .done(function(dataS) {
          console.log('search list produced', dataS.query.random[0].id;);
        })
        .fail(function(xhrS) {
          console.log('error callback for seacrh list', xhrS);
        });
  
    }
    
    
    
    
    $( "#randBut" ).on( "click", function(event){
        /* set ajax request values for a random search */
        rndPageAjax();
        console.log("pressed random button");
    } );


    

    $("input").keyup(function(event){
            
        var searchVal = $("input").val(); 
            
        if(event.keyCode==13 && searchVal!==""){
            //$("input").click();
            /* set api request for searchVal */
        
            console.log("submit this as entered pressed");
            console.log("search Value = " + searchVal);
            
            searchAjax();
        }
    });


    
    
})();


