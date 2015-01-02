function loadBackupScript(callback){
    if (typeof callback !== 'function') {
       throw 'Not a valid callback';   
    }
    var script = document.createElement('script');
    script.src = 'https:////www.parsecdn.com/js/parse-1.3.2.min.js';
    script.type = 'text/javascript'; 
    script.onload = callback;   
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
}

loadBackupScript(function(){
    var script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js';
    script.type = 'text/javascript';   
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
    Parse.initialize("qc3ZW7dP2SN3eOzO6fmruWeu4t8IFMCeixHPT63I", "7CqN2NfFitXg6TQWwTkphWZUJrxvlXfiwq6VNrGX");
    console.log("parse initalized");
});