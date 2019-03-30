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
    var info=store.getAll();
    info.onsuccess=function(data)
    {
      console.log(data.target.result);
      display(data.target.result);
    }
  }
  var parent=document.querySelector(".parent");
  function display(d)
  {
    for(i=0;i<d.length;i++)
    {
      var child=document.createElement("div");
      child.classList.add("child");
      var image=document.createElement("img");
      image.src="images/man.svg";
      image.alt=d[i].name;

      var name=document.createElement("h2");
      name.textContent=d[i].name;
      var link=document.createElement("a");
      link.classList.add("link");
      link.href="resume.html?id="+d[i].id;
      link.textContent="view profile";

      var dob=document.createElement("h3");
      dob.textContent=d[i].dob;
      var mobile=document.createElement("h3");
      mobile.textContent=d[i].mobile;
      var email=document.createElement("h3");
      email.textContent=d[i].email;
      var address=document.createElement("h3");
      address.textContent=d[i].address;

      child.append(image);
      child.append(name);
      child.append(dob);
      child.append(mobile);
      child.append(email);
      child.append(address);
      child.append(link);
      parent.append(child);

    }
  }
