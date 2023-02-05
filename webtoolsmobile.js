/* Плагин WebToolsMobile созданный TitanExpert */
let WTMmenuMass = [];
let WTMmenuNum = 0;
let WTMscrollBut = [];
let WTMscrollButNum = 0;
let startScrollType = document.documentElement.style.scrollBehavior;
export function menuAdd({"idButton": idButton, "idMenu": idMenu, "hiddenStyle": hiddenstyle = "display:none;"}) {
  WTMmenuMass[WTMmenuNum] = {"idButton": idButton, "idMenu": idMenu, "hiddenstyle": hiddenstyle};
  WTMmenuNum += 1;
  document.body.innerHTML += `<style>#${idMenu}.wtm-hidden {${hiddenstyle}}</style>`;
}
export function transform({"transformWidth": transformWidth, "setStyle": setStyle, "mod": mod = "smaller", "test": test = false}) {
  if (test == false) {
    if (mod == "bigger") {
      document.body.innerHTML += `<style>@media (min-width: ${transformWidth}px) {${setStyle}}</style>`;
    } 
    if (mod == "smaller") {
      document.body.innerHTML += `<style>@media (max-width: ${transformWidth}px) {${setStyle}}</style>`;
      console.log(`<style>@media (max-width: ${transformWidth}px) {${setStyle}}</style>`);
    }
    
  } else {
    document.body.innerHTML += `<style>${setStyle}</style>`;
  }
}
export function hideElement({"selector": selector, "hideWidth": hideWidth = 600, "mod": mod = "smaller", "test": test = false}) {
  if (test == false) {
    if (mod == "smaller")
    document.body.innerHTML += `<style>@media (max-width: ${hideWidth}px) {${selector} {display: none}}</style>`;
    if (mod == "bigger")
    document.body.innerHTML += `<style>@media (min-width: ${hideWidth}px) {${selector} {display: none}}</style>`;
  } else {
    document.body.innerHTML += `<style>${selector} {display: none}</style>`;
  }
}
export function scrollButton({"selector": selector, "scroll": scroll = 0, "showOn": showOn = 500, "position": position = "absolute", "smoothScroll": smoothScroll = true, "setStyle": setStyle = 'position: fixed; right: 20px; bottom: 20px; z-index: 10'}) {
  document.body.innerHTML += `<style>${selector} {${setStyle}}</style>`
  let displ = document.querySelector(`${selector}`).style.display;
  WTMscrollBut[WTMscrollButNum] = {"selector": selector, "scroll": scroll, "showOn": showOn, "position": position, "displ": displ, "smoothScroll": smoothScroll};
  WTMscrollButNum += 1;
}

function tick() {
  for (let x in WTMscrollBut) {
    document.querySelectorAll(`${WTMscrollBut[x].selector}`).forEach(function(scrbut) {
      if (WTMscrollBut[x].showOn > document.documentElement.scrollTop) {
        scrbut.style.display = "none";
      } else {
        scrbut.style.display = `${WTMscrollBut[x].displ}`;
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', function() {
  for (let x in WTMmenuMass) {
    document.querySelectorAll(`#${WTMmenuMass[x].idButton}`).forEach(function(menbut) {
      menbut.addEventListener('click', function(click1) {
        document.querySelectorAll(`#${WTMmenuMass.find(item => item.idButton == menbut.id).idMenu}`).forEach(function(menu1) {
          menu1.classList.toggle("wtm-hidden");

        }) 
      })
    })
  }
  for (let x in WTMscrollBut) {
    document.querySelectorAll(`${WTMscrollBut[x].selector}`).forEach(function(scrbut) {
      scrbut.addEventListener('click', function(scrll) {
        if(WTMscrollBut[x].smoothScroll == true)  {
          document.documentElement.style.scrollBehavior = "smooth";
        } else {
          document.documentElement.style.scrollBehavior = startScrollType;
        }
        if (WTMscrollBut[x].position == "relative") {
          document.documentElement.scrollTop += WTMscrollBut[x].scroll;
        } else {
          document.documentElement.scrollTop = WTMscrollBut[x].scroll;
        }
      })
    })
  }
})
setInterval(tick, 100);