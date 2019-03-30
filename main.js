function submitdata() {
  var career=document.querySelector("#career").value;
  var name=document.querySelector("#name").value;
  var dob=document.querySelector("#dob").value;
  var mobile=document.querySelector("#mobile").value;
  var email=document.querySelector("#email").value;
  var address=document.querySelector("#address").value;
  var ginsti=document.querySelector("#ginsti").value;
  var gbranch=document.querySelector("#gbranch").value;
  var gyop=document.querySelector("#gyop").value;
  var gper=document.querySelector("#gper").value;
  var iinsti=document.querySelector("#iinsti").value;
  var ibranch=document.querySelector("#ibranch").value;
  var iyop=document.querySelector("#iyop").value;
  var iper=document.querySelector("#iper").value;
  var sinsti=document.querySelector("#sinsti").value;
  var sbranch=document.querySelector("#sbranch").value;
  var syop=document.querySelector("#syop").value;
  var sper=document.querySelector("#sper").value;
  var skills=document.querySelector("#skills").value;
  //indexedDB implementation
  var idb=window.indexedDB||window.mozIndexedDB||window.msIndexedDB||window.webkitIndexedDB;
  if (!idb in window)
   {
     console.log("indexedDB not supported");
  }
  //indexedDB creation
  var request;
  var store;
  var open=idb.open("storedata",1);
  console.log("indexedDB is created");

  open.onupgradeneeded=function(e)
   {
    request=e.target.result;
    store=request.createObjectStore("formdata",{keyPath:"id",autoIncrement:true});
    console.log("store is created");
  }
    open.onerror=function(error)
    {
     console.log("Error occured");
    }
    open.onsuccess=function(e)
    {
      request=e.target.result;
      var transaction=request.transaction("formdata","readwrite");
      store=transaction.objectStore("formdata");
      store.put({
        career:career,
        name:name,
        dob:dob,
        mobile:mobile,
        email:email,
        address:address,
        education:[
          {
            institute:ginsti,
            branch:gbranch,
            yop:gyop,
            percent:gper
          },
          {
            institute:iinsti,
            branch:ibranch,
            yop:iyop,
            percent:iper
          },
          {
            institute:sinsti,
            branch:sbranch,
            yop:syop,
            percent:sper
          }
        ],
        skills:skills
      });

    }


  window.open("index.html");
}
