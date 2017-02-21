var position = 0; // position of the list of all sections of document
var trackNavigation = 1; // active link to the section that currently into the view

var elements = document.getElementsByClassName("view"); // all sections of document
var up = document.getElementById("up"); // up button
var down = document.getElementById("down"); // down button

var fromTopToButtonHeightSection = []; // measures sections heights

// when the Document is completly loaded fill the array of sections heights
document.addEventListener("DOMContentLoaded", function(e) {
  (function test(){
    for (i = 0; i < elements.length; i++){
      fromTopToButtonHeightSection[i] = elements[i].scrollHeight +  elements[i].offsetTop
    }
  })();
});

// change view when 'onscroll' event emmited
window.onscroll = function(){

  elHeight = elements[0].scrollHeight;
  assumption = elHeight / 2;
  win = window.scrollY + assumption;

  if (win < fromTopToButtonHeightSection[0]){
    changeViewAndState(0);
  }
  if ((win > fromTopToButtonHeightSection[0]) && (win < fromTopToButtonHeightSection[1])){
    changeViewAndState(1);
  }
  if ((win > fromTopToButtonHeightSection[1]) && (win < fromTopToButtonHeightSection[2])){
    changeViewAndState(2);
  }
  if ((win > fromTopToButtonHeightSection[2]) && (win < fromTopToButtonHeightSection[3])){
    changeViewAndState(3);
  }


}

function changeViewAndState(position){
    this.position = position;
    showNavigationButton(position);
    highLighthNavigationBarElement(position + 1);
}

// onclik event handler that shows into view upper section
function Up(){
  position -= 1;
  if (position == 0){
    changeViewAndState(position);
    elements[position].scrollIntoView();
    return;
   }
  changeViewAndState(position);
  elements[position].scrollIntoView();
}

// onclik event handler that shows into view lower section
function Down(){
  position += 1;
  if(position == elements.length - 1) {
    changeViewAndState(position);
    elements[position].scrollIntoView();
    return;
   }
  changeViewAndState(position);
  elements[position].scrollIntoView()
}

function showNavigationButton(currentPosition){
  switch (currentPosition){
    case 0:
      up.disabled = true;
      down.disabled = false;
      break;
    case 3:
      up.disabled = false;
      down.disabled = true;
      break;
    default:
      up.disabled = false;
      down.disabled = false;
  }
}

function highLighthNavigationBarElement(navPosition){
    var oldE = document.querySelector(".nav li:nth-child(" + (trackNavigation) + "n)")
    oldE.classList.remove("active");
    var newE = document.querySelector(".nav li:nth-child(" + (navPosition) + "n)")
    newE.className += "active"
    trackNavigation = navPosition;
}
