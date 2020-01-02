function onLoad(){
  var resize_val_ = Math.abs(document.documentElement.clientWidth/540); for(var a of document.getElementsByClassName('resize_val')){if(a.id === 'drops'){a.setAttribute('stdDeviation',`${resize_val_*3}`);}else{a.setAttribute('stdDeviation',`${resize_val_}`);}}
  includeHTML();
}
window.onmousemove = function (e) {
  var height = Math.max(document.documentElement.clientHeight);
  var width = Math.max(document.documentElement.clientWidth);
  var hover = document.getElementsByClassName('tooltip');
  var x = e.clientX + width/90,
      y = e.clientY + width/90;
  for(var hov of hover){
    hov.style.top = (y < height-hov.offsetHeight ? y : height-hov.offsetHeight) + 'px';
    hov.style.left = (x < width-hov.offsetWidth ? x : width-hov.offsetWidth) + 'px';
    }
};
function clearSelection()
{
 if (window.getSelection) {window.getSelection().removeAllRanges();}
 else if (document.selection) {document.selection.empty();}
}
function selectText(node) {
    node = document.getElementById(node);

    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}
function goToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
function getStatus(){
  MinecraftAPI.getServerStatus('trotbox.net', {
          port: 25565 // optional, only if you need a custom port
        }, function (err, status) {
          if (err) {
            console.log(err);
            document.getElementById('status').innerHTML = "<a class='mc_c'> Offline</a>";
            document.getElementById('online').innerHTML = "<a class='mc_c'> Offline</a>";
            document.getElementById('nav_join').classList.add('offline');
            document.getElementById('nav_join').setAttribute("onclick","alert('Server is offline... sorry');");
          }

          // you can change these to your own message!
          if(!status.online){
            document.getElementById('nav_join').onclick = "alert('Server is offline... sorry');";
          }
          document.getElementById('status').innerHTML = status.online ? "<a class='mc_a mc_r'> Online</a>" : "<a class='mc_c'> Offline</a>";
          document.getElementById('online').innerHTML = status.online ? `<a class='mc_7 mc_r'> ${status.players.now}/${status.players.max}</a>` : "<a class='mc_c'> Offline</a>";
          document.getElementById('nav_join').classList.add(status.online ? 'online' : 'offline');
        });
}
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("nav");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
            elmnt.id = "navigation";
          }
          if (this.status == 404) {elmnt.innerHTML = "Unable to load Nav";}
        }
        elmnt.removeAttribute('nav');
        getStatus();
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};
