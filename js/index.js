document.addEventListener("DOMContentLoaded", function () {
  // Activate sidebar nav
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();
 
function loadNav() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status != 200) return;
 
      // Muat daftar tautan menu
      document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
      
        elm.innerHTML = xhttp.responseText;
      });
 
      // Daftarkan event listener untuk setiap tautan menu
      document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", function(event) {
          // Tutup sidenav
          var sidenav = document.querySelector(".sidenav");
          M.Sidenav.getInstance(sidenav).close();
 
          // Muat konten halaman yang dipanggil
          page = event.target.getAttribute("href").substr(1);
          loadPage(page);
        });
      });
    }
  };
  xhttp.open("GET", "nav.html", true);
  xhttp.send();
}

  // LOAD PAGE CONTENT 

  var page = window.location.hash.substr(1);
  if (page === ""){ page = "home";}
  
  loadPage(page);
  
  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        var content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
         devbutton();
          if(page==="Trip"){
           trip();
          }else if(page=="transport"){
           transport();
          }else if(page=="home"){
            home();
          }
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman Tidak Ditemukan</p>";
        } else {
          content.innerHTML = "<p>ups..Halaman tidak dapat diakses.</p>"
        }
      }

    }
    
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  };
 

  function home(){
        // Daftarkan event listener 
        document.querySelectorAll("a.changecontent").forEach(elm => {
          
          elm.addEventListener("click", () => {
            // Muat konten halaman yang dipanggil
            page = elm.getAttribute("href").substr(1);
            loadPage(page);
            window.scrollTo(0,0);
          });
        });
  
  }
  function trip(){
    const elem = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elem);
    var elems = document.querySelectorAll('.carousel');
    M.Carousel.init(elems,{
      dist:0,
      padding:50
    });
  
  
  }
  function transport(){
    const el=document.querySelectorAll('.tabs');
    M.Tabs.init(el);
    const elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems,{
      minDate:new Date()
    });
    var timeElems = document.querySelectorAll('.timepicker');
     M.Timepicker.init(timeElems);
  }
});
  function devbutton(){
    const devbutton=document.querySelectorAll(".development").forEach(devbutton=>{
      devbutton.setAttribute("onclick","M.toast({html: 'This Feature is not available yet because this app is still  under development'})");
  });
  }