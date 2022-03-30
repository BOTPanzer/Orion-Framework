  /*$$$$$  /$$$$$$$  /$$$$$$  /$$$$$$  /$$   /$$
 /$$__  $$| $$__  $$|_  $$_/ /$$__  $$| $$$ | $$
| $$  \ $$| $$  \ $$  | $$  | $$  \ $$| $$$$| $$
| $$  | $$| $$$$$$$/  | $$  | $$  | $$| $$ $$ $$
| $$  | $$| $$__  $$  | $$  | $$  | $$| $$  $$$$
| $$  | $$| $$  \ $$  | $$  | $$  | $$| $$\  $$$
|  $$$$$$/| $$  | $$ /$$$$$$|  $$$$$$/| $$ \  $$
 \______/ |__/  |__/|______/ \______/ |__/  \__/

 /$$$$$$$$ /$$$$$$$   /$$$$$$  /$$      /$$ /$$$$$$$$ /$$      /$$  /$$$$$$  /$$$$$$$  /$$   /$$
| $$_____/| $$__  $$ /$$__  $$| $$$    /$$$| $$_____/| $$  /$ | $$ /$$__  $$| $$__  $$| $$  /$$/
| $$      | $$  \ $$| $$  \ $$| $$$$  /$$$$| $$      | $$ /$$$| $$| $$  \ $$| $$  \ $$| $$ /$$/ 
| $$$$$   | $$$$$$$/| $$$$$$$$| $$ $$/$$ $$| $$$$$   | $$/$$ $$ $$| $$  | $$| $$$$$$$/| $$$$$/  
| $$__/   | $$__  $$| $$__  $$| $$  $$$| $$| $$__/   | $$$$_  $$$$| $$  | $$| $$__  $$| $$  $$  
| $$      | $$  \ $$| $$  | $$| $$\  $ | $$| $$      | $$$/ \  $$$| $$  | $$| $$  \ $$| $$\  $$ 
| $$      | $$  | $$| $$  | $$| $$ \/  | $$| $$$$$$$$| $$/   \  $$|  $$$$$$/| $$  | $$| $$ \  $$
|__/      |__/  |__/|__/  |__/|__/     |__/|________/|__/     \__/ \______/ |__/  |__/|__/  \__/

              /$$       /$$$$$$$      /$$$$$$ 
            /$$$$      | $$____/     /$$$_  $$
 /$$    /$$|_  $$      | $$         | $$$$\ $$
|  $$  /$$/  | $$      | $$$$$$$    | $$ $$ $$
 \  $$/$$/   | $$      |_____  $$   | $$\ $$$$
  \  $$$/    | $$       /$$  \ $$   | $$ \ $$$
   \  $/    /$$$$$$ /$$|  $$$$$$//$$|  $$$$$$/
    \_/    |______/|__/ \______/|__/ \_____*/





 /*$   /$$  /$$$$$$  /$$$$$$$$ /$$$$$$  /$$$$$$ 
| $$$ | $$ /$$__  $$|__  $$__/|_  $$_/ /$$__  $$
| $$$$| $$| $$  \ $$   | $$     | $$  | $$  \__/
| $$ $$ $$| $$  | $$   | $$     | $$  |  $$$$$$ 
| $$  $$$$| $$  | $$   | $$     | $$   \____  $$
| $$\  $$$| $$  | $$   | $$     | $$   /$$  \ $$
| $$ \  $$|  $$$$$$/   | $$    /$$$$$$|  $$$$$$/
|__/  \__/ \______/    |__/   |______/ \_____*/

let oNotiActive = false
let oNotis = []
let oNotisSaved = []

function createNoti(title, content, onClick) {
  oNotis.push({title, content, onClick})
  oNotisSaved.push({title, content, onClick})
  if (!oNotiActive) oNotiManager()
}

function oNotiManager() {
  if (!oNotiActive) nManager()

  function nManager() { 
    if (oNotis.length > 0) {
      oNotiActive = true
      nCreator()
    } else oNotiActive = false
  }

  function nCreator() {
    //GET NOTI AND REMOVE FROM LIST
    let title = oNotis[0].title
    let content = oNotis[0].content
    let click = oNotis[0].onClick
    oNotis.shift()
    //CREATE NOTI
    let id = "oNoti"+Date.now()
    let html = `<div id="${id}" class="button noti">
                  <div id="exit-${id}">✕</div>
                  <div>${title}</div>
                  <div>${content}</div>
                </div>`
    document.body.insertAdjacentHTML('beforeend', html)
    //NOTI LISTENERS
    const timeout = setTimeout(() => hideNoti(), 1500)
    document.getElementById(id).addEventListener('click', function() {
      if (typeof click === 'function') click()
      clearTimeout(timeout)
      hideNoti()
    })
    document.getElementById('exit-'+id).addEventListener('click', function() {
      event.stopPropagation()
      clearTimeout(timeout)
      hideNoti()
    })
    //HIDE FUNCTION
    function hideNoti() {
      //ADD AN EVENT THAT PREVENTS THE OTHERS 
      document.getElementById(id).addEventListener('click', function(event) { event.stopImmediatePropagation() }, true) 
      //HIDE NOTI ANIMATION
      let op = 1
      hideAnim()
      function hideAnim() {
        if (op > 0) {
          op -= .1
          document.getElementById(id).style.opacity = op
          setTimeout(function() { hideAnim() }, 50)
        } else {
          //REMOVE NOTI
          document.getElementById(id).remove()
          setTimeout(nManager, 200)
        }
      }
    }
  }
}





 /*$$$$$$  /$$$$$$  /$$$$$$  /$$        /$$$$$$   /$$$$$$ 
| $$__  $$|_  $$_/ /$$__  $$| $$       /$$__  $$ /$$__  $$
| $$  \ $$  | $$  | $$  \ $$| $$      | $$  \ $$| $$  \__/
| $$  | $$  | $$  | $$$$$$$$| $$      | $$  | $$| $$ /$$$$
| $$  | $$  | $$  | $$__  $$| $$      | $$  | $$| $$|_  $$
| $$  | $$  | $$  | $$  | $$| $$      | $$  | $$| $$  \ $$
| $$$$$$$/ /$$$$$$| $$  | $$| $$$$$$$$|  $$$$$$/|  $$$$$$/
|_______/ |______/|__/  |__/|________/ \______/  \_____*/

function createDialog(innerHTML, title, onClose) {
  //CREATE DIALOG
  let id = "oDialog"+Date.now()
  if (title == undefined) title = ''
  let html = `<div id="${id}" class="vc" style="width: 100%; height: calc(100% - 20px); top: 20px; position: fixed; z-index: 99996; align-items: center; background-color: rgba(0, 0, 0, 0.5); opacity: 0;">
                <div id="box-${id}" class="vc" style="width: fit-content; max-width: calc(100% - 40px); height: fit-content; max-height: calc(100% - 40px); margin: auto; background: var(--background); border-radius: 10px; box-shadow: var(--shadow2); overflow: hidden;" onclick="event.stopPropagation()">
                  <div class="hc" style="width: 100%; height: 20px; flex-direction: row-reverse; background: var(--menu); position: relative;">
                    <div id="name-${id}" style="width: 100%; height: 20px; top: 0; left: 0; position: absolute; text-align: center; font-family: Name; color: var(--textTitleBar); pointer-events: none;">${title}</div>
                    <div id="exit-${id}" class="button-top button-exit">✕</div>
                  </div>
                  <div id="window-${id}" class="vc" style="overflow: auto;">
                    ${innerHTML}
                  </div>
                </div>
              </div>`
  document.body.insertAdjacentHTML('beforeend', html)
  //SHOW DIALOG ANIMATION
  let op = 0
  showAnim()
  function showAnim() {
    if (op < 1) {
      op += .1
      document.getElementById(id).style.opacity = op
      setTimeout(function() { showAnim() }, 10)
    } else {
      //DIALOG LISTENERS
      if (typeof onClose === 'function') {
        document.getElementById(id).addEventListener('click', onClose)
        document.getElementById('exit-'+id).addEventListener('click', onClose)
      } else {
        document.getElementById(id).addEventListener('click', function() { hideDialog(id) })
        document.getElementById('exit-'+id).addEventListener('click', function() { hideDialog(id) })
      }
    }
  }
  return id
}

function hideDialog(id) {
  if (document.getElementById(id) == null) return
  //ADD AN EVENT THAT PREVENTS THE OTHERS
  document.getElementById(id).addEventListener('click', function(event) { event.stopImmediatePropagation() }, true)
  //HIDE DIALOG ANIMATION
  let op = 1
  hideAnim()
  function hideAnim() {
    if (op > 0) {
      op -= .1
      document.getElementById(id).style.opacity = op
      setTimeout(function() { hideAnim() }, 20)
    } else {
      //REMOVE DIALOG
      document.getElementById(id).remove()
    }
  }
}

function setDialogTitle(id, title) {
  if (document.getElementById('name-'+id) != null)
    document.getElementById('name-'+id).innerHTML = title
}





  /*$$$$$  /$$$$$$$$ /$$   /$$       /$$      /$$ /$$$$$$$$ /$$   /$$ /$$   /$$
 /$$__  $$|__  $$__/| $$  / $$      | $$$    /$$$| $$_____/| $$$ | $$| $$  | $$
| $$  \__/   | $$   |  $$/ $$/      | $$$$  /$$$$| $$      | $$$$| $$| $$  | $$
| $$         | $$    \  $$$$/       | $$ $$/$$ $$| $$$$$   | $$ $$ $$| $$  | $$
| $$         | $$     >$$  $$       | $$  $$$| $$| $$__/   | $$  $$$$| $$  | $$
| $$    $$   | $$    /$$/\  $$      | $$\  $ | $$| $$      | $$\  $$$| $$  | $$
|  $$$$$$/   | $$   | $$  \ $$      | $$ \/  | $$| $$$$$$$$| $$ \  $$|  $$$$$$/
 \______/    |__/   |__/  |__/      |__/     |__/|________/|__/  \__/ \_____*/

function createCTXMenu(event, permaArray) {
  //CREATE MENU
  let id = "oMenu"+Date.now()
  let html = `<div id="${id}" class="vc" style="width: 100%; height: calc(100% - 20px); top: 20px; position: fixed; z-index: 99998;">
                <div id="box-${id}" class="ctx-menu vc" onclick="event.stopPropagation()"></div>
              </div>`
  document.body.insertAdjacentHTML('beforeend', html)
  //ADD ITEMS
  const cmenu = document.getElementById('box-'+id)
  for (i in permaArray) {
    //DATA
    let id2 = permaArray[i].id
    if (id2 == undefined || typeof id2 !== 'string') continue
    else id2 = 'oMenu-'+id2
    let label = permaArray[i].label
    if (label == undefined || typeof label !== 'string') continue
    let click = permaArray[i].click
    if (click == undefined || typeof click !== 'function') click = null
    let frontElement = permaArray[i].frontElement
    if (frontElement == undefined || typeof frontElement !== 'string')
      frontElement = `<svg class="svg" viewBox="0 0 24 24" style="margin: 0 10px 0 0;">
                        <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM17 17.25H7C6.59 17.25 6.25 16.91 6.25 16.5C6.25 16.09 6.59 15.75 7 15.75H17C17.41 15.75 17.75 16.09 17.75 16.5C17.75 16.91 17.41 17.25 17 17.25ZM17 12.75H7C6.59 12.75 6.25 12.41 6.25 12C6.25 11.59 6.59 11.25 7 11.25H17C17.41 11.25 17.75 11.59 17.75 12C17.75 12.41 17.41 12.75 17 12.75ZM17 8.25H7C6.59 8.25 6.25 7.91 6.25 7.5C6.25 7.09 6.59 6.75 7 6.75H17C17.41 6.75 17.75 7.09 17.75 7.5C17.75 7.91 17.41 8.25 17 8.25Z"/>
                      </svg>`
    //CREATE ITEM
    let item = `<div id="${id2}" class="ctx-item">
                  ${frontElement}
                  ${label}
                </div>`
    cmenu.insertAdjacentHTML('beforeend', item)
    //ADD LISTENER
    if (click != null)
    document.getElementById(id2).addEventListener('click', function() {
      closeCTXMenu(id)
      click()
    })
  }
  //GET MOUSE POSITION & SIZES
  const { clientX: mouseX, clientY: mouseY } = event
  const winW = document.body.clientWidth
  const winH = document.body.clientHeight
  const menuW = cmenu.clientWidth+1
  const menuH = cmenu.clientHeight+1
  //OVERFLOW
  let posX = mouseX
  if (mouseX + menuW > winW) posX = winW-menuW
  let posY = mouseY
  if (mouseY + menuH > winH) posY = winH-menuH
  //MOVE & SHOW MENU
  cmenu.style.left = posX+'px'
  cmenu.style.top = posY+'px'
  cmenu.style.visibility = 'visible'
  //MENU LISTENERS
  document.getElementById(id).addEventListener('click', function() {
    closeCTXMenu(id)
  })
  return id
}

function closeCTXMenu(id) {
  if (document.getElementById(id) == null) return
  document.getElementById(id).remove()
}

function CTXCopy(text) {
  navigator.clipboard.writeText(text).then((err) => { if (err) createNoti('Oriøn Assistant', "Couldn't Copy: "+err) })
}

function CTXCutInput(target) {
  const ss = target.selectionStart
  const se = target.selectionEnd
  if (ss != undefined && se != undefined) {
    //CUT SELECTION
    let text = target.value.slice(ss, se)
    target.value = target.value.slice(0, ss)+target.value.slice(se)
    navigator.clipboard.writeText(text).then((err) => { if (err) createNoti('Oriøn Assistant', "Couldn't Cut: "+err) })
  }
}

async function CTXPasteInput(target) {
  const clip = await navigator.clipboard.readText()
  const ss = target.selectionStart
  const se = target.selectionEnd
  if (ss != undefined && se != undefined)
    //PASTE FROM SELECTION START TO END
    target.value = target.value.slice(0, ss)+clip+target.value.slice(se)
  else if (ss != undefined)
    //PASTE AT SELECTION START
    target.value = target.value.slice(0, ss)+clip+target.value.slice(ss)
  else
    //NO SELECTION => PASTE AT END
    target.value = target.value+clip
}





 /*$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$$$  /$$$$$$  /$$   /$$
| $$__  $$ /$$__  $$ /$$__  $$| $$_____/ /$$__  $$| $$  | $$
| $$  \ $$| $$  \ $$| $$  \__/| $$      | $$  \__/| $$  | $$
| $$$$$$$ | $$$$$$$$|  $$$$$$ | $$$$$   | $$$$$$$ | $$$$$$$$
| $$__  $$| $$__  $$ \____  $$| $$__/   | $$__  $$|_____  $$
| $$  \ $$| $$  | $$ /$$  \ $$| $$      | $$  \ $$      | $$
| $$$$$$$/| $$  | $$|  $$$$$$/| $$$$$$$$|  $$$$$$/      | $$
|_______/ |__/  |__/ \______/ |________/ \______/       |_*/

const resizeBase64Image = (base64, maxWidth, maxHeight) => {
  if (maxWidth == undefined) maxWidth = 128
  if (maxHeight == undefined) maxHeight = 128
  return new Promise((resolve) => {
    let img = new Image()
    img.src = base64
    img.onload = () => {
      let canvas = document.createElement('canvas')
      let width = img.width
      let height = img.height

      //NO NEED TO RESIZE
      if (maxWidth >= width && maxHeight >= height) {
        resolve(base64)
      }
      //RESIZE
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height
          height = maxHeight
        }
      }
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL())
    }
  })
}