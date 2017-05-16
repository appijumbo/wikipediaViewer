(function () {
"use strict";

    
     //  *************  Declare API elements   *************    
    
    var wikipediaAPi = "https://en.wikipedia.org/w/api.php?";
    
    
    var dataTypeList = {action: 'opensearch', format: 'json', namespace:'0', limit:'10'};
    var searchBBC = 'bbc';
    dataTypeList.search = searchBBC;
    // https://en.wikipedia.org/w/api.php?action=opensearch&format=json&namespace=0&limit=10&search=bbc
    console.log("bbc check ---> dataTypeList = " + JSON.stringify(dataTypeList));
    
    
    var dataTypeRand = {action: 'query', format: 'json', list:'random', rnnamespace:'0', rnlimit: '1'};
    // https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=1
    
    var newurl = 'https://en.wikipedia.org/w/index.php?curid=';
    
    
    
    
        
    
     //  *************  Random Api   *************

    function rndPageAjax(){
        
        rndAjax
        .done(function(dataR) {
            console.log('random Page is', dataR);
            console.log("dataR.query.random[0].id  " + dataR.query.random[0].id);
            //window.location = newurl + dataR.query.random[0].id;
            window.open(newurl + dataR.query.random[0].id,'_blank');
            // need to have taget=_blank so window.open not window.location
        })
        .fail(function(xhrR) {
          console.log('error callback for random page condition', xhrR);
        });
    }
    
    
    var rndAjax = $.ajax({
        type: 'GET',   // the URL to which the request is sent
        url: wikipediaAPi,  // need a single random wiki page
        dataType: 'jsonp',  // support cross-site requests domains (https://www.mediawiki.org/wiki/API:Cross-site_requests)
        data: dataTypeRand,
        traditional: true
    });
        
    
    
    
    
    
    //  *************  Search Api   *************
 
    function searchAjax(){
    
        var listAjax = $.ajax({
        type: 'GET',   // the URL to which the request is sent
        url: wikipediaAPi,  // need a single random wiki page
        dataType: 'jsonp',  // support cross-site requests domains (https://www.mediawiki.org/wiki/API:Cross-site_requests)
        data: dataTypeList,
        traditional: true
    });
        
        listAjax
        .done(function(dataS) {
          console.log('search list produced'+ JSON.stringify(dataS));
          
        //remove previous search
        $("#output").html("");
            
            console.log('dataS[1].length = ' + dataS[1].length);
            
        // reformat css
        $("header").addClass("hide");
        $(".button").addClass("withList");
            
        // 3 = link,  1 = title, 2 = description
            for (var i=0; i<dataS[1].length; i++ ){
                $("#output").append("<li> <a href="+dataS[3][i]+"><h3>"+dataS[1][i]+"</h3><p>"+dataS[2][i]+"</p></a></li>");
                // <li><a href="http....."><h3>Title</h3><p>description</p></a></li>
            }
            
        })
        .fail(function(xhrS) {
          console.log('error callback for seacrh list', xhrS);
        });
  
    }
    
    
   
    
    
    
    
    
    
    
     //  *************  Inputs   *************
    
    $( "#randBut" ).on( "click", function(event){
        /* set ajax request values for a random search */
        rndPageAjax();
        console.log("pressed random button");
    } );


    

    $("input").keyup(function(event){
            
        var searchVal = $("input").val(); 
            
        if(event.keyCode==13 && searchVal!==""){
        
            console.log("search dataTypeList value is currently = " + JSON.stringify(dataTypeList.search));
            console.log("search Value = " + searchVal);
            dataTypeList.search = searchVal;
            console.log("search input entry --> dataTypeList = " + JSON.stringify(dataTypeList));
            console.log("search dataTypeList value is now = " + JSON.stringify(dataTypeList.search));
            
            searchAjax();
        }
    });
    
    
    
    

    
    
})();



