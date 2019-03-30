var para;
var paravalue;
var query=window.location.search.substring(1).split("?");
for(var i in query){
  para=query[i].split("=");
  paravalue=parseInt(para[1]);
}

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
    var info=store.get(paravalue);
    info.onsuccess=function(data)
    {
      console.log(data);
      perinfo(data.target.result);
      details(data.target.result);
    }
  }
var left=document.querySelector(".left");
function perinfo(pi)
{
  var image=document.createElement("img");
  image.src="images/man.svg";
  image.alt=pi.name;
  left.append(image);
  var name=document.createElement("h2");
  name.textContent=pi.name;
  left.append(name);
  var dob=document.createElement("h2");
  dob.textContent=pi.dob;
  left.append(dob);
  var mobile=document.createElement("h2");
  mobile.textContent=pi.mobile;
  left.append(mobile);
  var email=document.createElement("h2");
  email.textContent=pi.email;
  left.append(email);
  var address=document.createElement("h2");
  address.textContent=pi.address;
  left.append(address);
}
var right=document.querySelector(".right");
function details(e)
{
  var h1=document.createElement("h3");
  h1.textContent="Career Objective";
  right.append(h1);
  var hr=document.createElement("hr");
  right.append(hr);
  var career=document.createElement("p");
  career.textContent=e.career;
  right.append(career);
  var h1=document.createElement("h3");
  h1.textContent="Education Details";
  right.append(h1);
  var hr=document.createElement("hr");
  right.append(hr);
  var table=document.createElement("table");
  right.append(table);
  var tr1="<tr><th>institute</th><th>branch</th><th>yop</th><th>percent</th>";
  var tr2="";
  for(var i in e.education)
  {
    tr2=tr2+"<tr><td>"+e.education[i].institute+"</td><td>"+e.education[i].branch+"</td><td>"+e.education[i].yop+"</td><td>"+e.education[i].percent+"</td>";

  }
  table.innerHTML=tr1+tr2;
  right.append(table);
  var h1=document.createElement("h3");
  h1.textContent="Skills";
  right.append(h1);
  var hr=document.createElement("hr");
  right.append(hr);
  var skills=document.createElement("p");
  skills.textContent=e.skills;
  right.append(skills);
}
