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

             /$$$$$$       /$$$$$$      /$$$$$$ 
            /$$__  $$     /$$$_  $$    /$$__  $$
 /$$    /$$|__/  \ $$    | $$$$\ $$   |__/  \ $$
|  $$  /$$/  /$$$$$$/    | $$ $$ $$     /$$$$$$/
 \  $$/$$/  /$$____/     | $$\ $$$$    /$$____/ 
  \  $$$/  | $$          | $$ \ $$$   | $$      
   \  $/   | $$$$$$$$ /$$|  $$$$$$//$$| $$$$$$$$
    \_/    |________/|__/ \______/|__/|_______*/





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

function createNoti(title, content, options) {
  //CHECK ARGS
  if (typeof title !== 'string') title = 'title'
  if (typeof content !== 'string') content = 'content'
  if (typeof options !== 'object') options = {}
  //PUSH NOTIFICATION
  oNotis.push({title, content, options})
  oNotisSaved.push({title, content, options})
  //REFRESH NOTI MANAGER
  if (!oNotiActive) oNotiManager()
}

function oNotiManager() {
  if (!oNotiActive) nManager()

  //NOTI MANAGER
  function nManager() {
    if (oNotis.length > 0) {
      oNotiActive = true
      nCreator()
    } else oNotiActive = false
  }

  //NOTI CREATOR
  function nCreator() {
    //GET NOTI AND REMOVE FROM LIST
    let title = oNotis[0].title
    let content = oNotis[0].content
    let options = oNotis[0].options
    oNotis.shift()
    //CHECK VARIABLES
    if (typeof title !== 'string') title = 'title'
    if (typeof content !== 'string') content = 'content'
    if (typeof options !== 'object') options = {}
    //CREATE NOTI
    let id = "oNoti"+Date.now()
    let html = `<div id="${id}" class="button noti">
                  <div id="exit-${id}">✕</div>
                  <div>${title}</div>
                  <div>${content}</div>
                </div>`
    document.body.insertAdjacentHTML('beforeend', html)
    //NOTI TIMEOUT
    let time = 2500
    if (typeof options.time === 'number') time = options.time
    const timeout = setTimeout(() => closeNoti(), time)
    //NOTI LISTENERS
    document.getElementById(id).addEventListener('click', function() {
      if (typeof options.onClick === 'function') options.onClick()
      clearTimeout(timeout)
      closeNoti()
    })
    document.getElementById('exit-'+id).addEventListener('click', function() {
      event.stopPropagation()
      clearTimeout(timeout)
      closeNoti()
    })
    //HIDE FUNCTION
    function closeNoti() {
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

function createDialog(innerHTML, title, options) {
  //CHECK ARGS
  if (typeof innerHTML !== 'string') return ''
  if (typeof title !== 'string') title = ''
  if (typeof options !== 'object') options = {}
  //CREATE DIALOG
  let id = "oDialog"+Date.now()
  let html = `<div id="${id}" class="vc" style="width: 100%; height: 100%; position: fixed; z-index: 99996; align-items: center; background-color: rgba(0, 0, 0, 0.5); opacity: 0;"> 
                <div id="box-${id}" class="vc" style="width: fit-content; max-width: calc(100% - 40px); height: fit-content; max-height: calc(100% - 40px); margin: auto; background: var(--background); border-radius: 10px; box-shadow: var(--shadow2); overflow: hidden;" onclick="event.stopPropagation()">
                  <div class="hc" style="width: 100%; height: 20px; flex-direction: row-reverse; background: var(--menu); position: relative;">
                    <div id="name-${id}" style="width: 100%; height: 20px; top: 0; left: 0; position: absolute; text-align: center; font-family: Display2; color: var(--text3); pointer-events: none;">${title}</div>
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
      if (options.preventClose == true) {
        document.getElementById('exit-'+id).remove()
      } else {
        //EXIT BUTTON
        document.getElementById('exit-'+id).addEventListener('click', close)
        //DIALOG BACKGROUND
        let clickedElement = ''
        document.getElementById(id).addEventListener('mousedown', function() {
          clickedElement = 'bg' 
        })
        document.getElementById('box-'+id).addEventListener('mousedown', function() {
          event.stopPropagation()
          clickedElement = ''
        })
        window.addEventListener('mouseup', winClose)
        //CLOSE FUNCTION
        function close() {
          if (typeof options.onClose === 'function') options.onClose()
          else closeDialog(id)
        }
        //WINDOW CLOSE FUNCTION
        function winClose() {
          if (clickedElement == 'bg') {
            close()
            window.removeEventListener('mouseup', winClose)
          }
        }
      }
    }
  }
  return id
}

function closeDialog(id) {
  //CHECK ARGS
  if (typeof id !== 'string') return
  //CHECK IF DIALOG EXISTS
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
  //CHECK ARGS
  if (typeof id !== 'string') return
  if (typeof title !== 'string') return
  //RENAME IF DIALOG EXISTS
  if (document.getElementById('name-'+id) != null)
    document.getElementById('name-'+id).innerHTML = title
}

function dialogBuilder(type, options) {
  //CHECK ARGS
  if (typeof type !== 'string') type = ''
  if (typeof options !== 'object') options = {}
  //CREATE VARIABLES
  let id = "oDialog"+Date.now()
  let dialog = {
    innerHTML: ''
  }
  let content = options.content
  //TYPE SWITCH
  switch(type) {
    case 'info':
      //CONTENT
      if (typeof content !== 'string') content = ''
      //RETURN HTML
      dialog.innerHTML = `<div class="vc" style="width: 500px; max-width: 500px; position: relative; padding: 20px; text-align: center; font-size: 15px;">
                            ${content}
                          </div>`
      break
    case 'alert':
      //CONTENT
      if (typeof content !== 'string') content = ''
      //RETURN HTML
      dialog.confirmId = 'confirm-'+id
      dialog.innerHTML = `<div class="vc" style="width: 500px; max-width: 500px; position: relative; padding: 20px; text-align: center; font-size: 15px;">
                            ${content}
                            <o-button id="${dialog.confirmId}" type="ghost" style="margin: 20px 0 0 auto;">Ok</o-button>
                          </div>`
      break
    case 'confirm':
      //CONTENT
      if (typeof content !== 'string') content = ''
      //RETURN HTML
      dialog.confirmId = 'confirm-'+id
      dialog.cancelId = 'cancel-'+id
      dialog.innerHTML = `<div class="vc" style="width: 500px; max-width: 500px; position: relative; padding: 20px; text-align: center; font-size: 15px;">
                            ${content}
                            <div class="hc" style="margin: 20px 0 0 auto; gap: 10px;">
                              <o-button id="${dialog.confirmId}" type="ghost">Confirm</o-button>
                              <o-button id="${dialog.cancelId}" type="ghost">Cancel</o-button>
                            </div>
                          </div>`
      break
    case 'input':
      //CONTENT
      let placeholder = options.placeholder
      if (typeof placeholder !== 'string') placeholder = ''
      let label = options.label
      if (typeof label !== 'string') label = ''
      //RETURN HTML
      dialog.inputId = 'input-'+id
      dialog.confirmId = 'confirm-'+id
      dialog.innerHTML = `<div class="vc" style="width: 500px; max-width: 500px; position: relative; padding: 20px; text-align: center; font-size: 15px;">
                            <o-input id="${dialog.inputId}" width="100%" placeholder="${placeholder}" label="${label}"></o-input>
                            <o-button id="${dialog.confirmId}" type="ghost" style="margin: 20px 0 0 auto;">Confirm</o-button>
                          </div>`
      break
  }
  //RETURN DIALOG
  return dialog
}





  /*$$$$$  /$$$$$$$$ /$$   /$$       /$$      /$$ /$$$$$$$$ /$$   /$$ /$$   /$$
 /$$__  $$|__  $$__/| $$  / $$      | $$$    /$$$| $$_____/| $$$ | $$| $$  | $$
| $$  \__/   | $$   |  $$/ $$/      | $$$$  /$$$$| $$      | $$$$| $$| $$  | $$
| $$         | $$    \  $$$$/       | $$ $$/$$ $$| $$$$$   | $$ $$ $$| $$  | $$
| $$         | $$     >$$  $$       | $$  $$$| $$| $$__/   | $$  $$$$| $$  | $$
| $$    $$   | $$    /$$/\  $$      | $$\  $ | $$| $$      | $$\  $$$| $$  | $$
|  $$$$$$/   | $$   | $$  \ $$      | $$ \/  | $$| $$$$$$$$| $$ \  $$|  $$$$$$/
 \______/    |__/   |__/  |__/      |__/     |__/|________/|__/  \__/ \_____*/

function createCTXMenu(event, items, title) {
  //CHECK ARGS
  if (typeof event !== 'object') return ''
  if (typeof items !== 'object') items = {}
  if (typeof title !== 'string') title = ''
  //CREATE MENU
  let id = "oMenu"+Date.now()
  let html = `<div id="${id}" class="vc" style="width: 100%; height: calc(100% - 20px); top: 20px; position: fixed; z-index: 99998;">
                <div id="box-${id}" class="ctx-menu vc" onclick="event.stopPropagation()">
                  ${title}
                </div>
              </div>`
  document.body.insertAdjacentHTML('beforeend', html)
  //ADD ITEMS
  const cmenu = document.getElementById('box-'+id)
  for (i in items) {
    //DATA
    let id2 = items[i].id
    if (id2 == undefined || typeof id2 !== 'string') continue
    else id2 = 'oMenu-'+id2
    let label = items[i].label
    if (label == undefined || typeof label !== 'string') continue
    let click = items[i].click
    if (click == undefined || typeof click !== 'function') click = null
    let frontElement = items[i].frontElement
    if (frontElement == undefined || typeof frontElement !== 'string')
      frontElement = `<svg class="button-svg" viewBox="0 0 24 24" style="margin: 0 10px 0 0;">
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
  //CHECK ARGS
  if (typeof id !== 'string') return
  //CLOSE MENU IF EXISTS
  if (document.getElementById(id) == null) return
    document.getElementById(id).remove()
}

function CTXCopy(text) {
  //CHECK ARGS
  if (typeof text !== 'string') return
  //COPY TO CLIP
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
  //CHECK ARGS
  if (typeof base64 !== 'string') return
  if (typeof maxWidth !== 'number') maxWidth = 128
  if (typeof maxHeight !== 'number') maxHeight = 128
  //RESIZE IMAGE
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















 /*$$$$$$$ /$$       /$$$$$$$$ /$$      /$$ /$$$$$$$$ /$$   /$$ /$$$$$$$$ /$$$$$$ 
| $$_____/| $$      | $$_____/| $$$    /$$$| $$_____/| $$$ | $$|__  $$__//$$__  $$
| $$      | $$      | $$      | $$$$  /$$$$| $$      | $$$$| $$   | $$  | $$  \__/
| $$$$$   | $$      | $$$$$   | $$ $$/$$ $$| $$$$$   | $$ $$ $$   | $$  |  $$$$$$ 
| $$__/   | $$      | $$__/   | $$  $$$| $$| $$__/   | $$  $$$$   | $$   \____  $$
| $$      | $$      | $$      | $$\  $ | $$| $$      | $$\  $$$   | $$   /$$  \ $$
| $$$$$$$$| $$$$$$$$| $$$$$$$$| $$ \/  | $$| $$$$$$$$| $$ \  $$   | $$  |  $$$$$$/
|________/|________/|________/|__/     |__/|________/|__/  \__/   |__/   \_____*/

function getBooleanAtt(elem, att) {
  return elem.hasAttribute(att) 
}

function setBooleanAtt(elem, att, val) {
  if (val)
    elem.setAttribute(att, '')
  else 
    elem.removeAttribute(att)
}

function getStringAtt(elem, att) {
  if (elem.hasAttribute(att)) return elem.getAttribute(att)
  else return ''
}

function setStringAtt(elem, att, val, posib) {
  if (Array.isArray(posib)) {
    if (posib.indexOf(val) != -1)
      elem.setAttribute(att, val)
    else 
      elem.removeAttribute(att)
  } else {
    if (val)
      elem.setAttribute(att, val)
    else 
      elem.removeAttribute(att)
  }
}

function getOrionColor(val) {
  let colors = ['menu', 'background', 'scrollbar', 'accent', 'success', 'danger', 'warning', 'progress', 'text1', 'text2', 'text3', 'button']
  if (typeof val !== 'string') val = ''
  if (colors.indexOf(val) >= 0) 
    return `var(--${val})`
  else
    return val
}





 /*$$$$$$  /$$   /$$ /$$$$$$$$ /$$$$$$$$ /$$$$$$  /$$   /$$
| $$__  $$| $$  | $$|__  $$__/|__  $$__//$$__  $$| $$$ | $$
| $$  \ $$| $$  | $$   | $$      | $$  | $$  \ $$| $$$$| $$
| $$$$$$$ | $$  | $$   | $$      | $$  | $$  | $$| $$ $$ $$
| $$__  $$| $$  | $$   | $$      | $$  | $$  | $$| $$  $$$$
| $$  \ $$| $$  | $$   | $$      | $$  | $$  | $$| $$\  $$$
| $$$$$$$/|  $$$$$$/   | $$      | $$  |  $$$$$$/| $$ \  $$
|_______/  \______/    |__/      |__/   \______/ |__/  \_*/

customElements.define('o-button', class extends HTMLElement {
  static get observedAttributes() { return ['width', 'height', 'background', 'color', 'type', 'content', 'hover', 'cursor', 'lefticon', 'righticon'] }

  //WIDTH ATTRIBUTE
  get width() { return getStringAtt(this, 'width') }
  set width(val) { setStringAtt(this, 'width', val) }

  //HEIGHT ATTRIBUTE
  get height() { return getStringAtt(this, 'height') }
  set height(val) { setStringAtt(this, 'height', val) }

  //BACKGROUND ATTRIBUTE
  get background() { return getStringAtt(this, 'background') }
  set background(val) { setStringAtt(this, 'background', val) }

  //COLOR ATTRIBUTE
  get color() { return getStringAtt(this, 'color') }
  set color(val) { setStringAtt(this, 'color', val) }

  //TYPE ATTRIBUTE
  get type() { return getStringAtt(this, 'type') }
  set type(val) { setStringAtt(this, 'type', val) }

  //CONTENT ATTRIBUTE
  get content() { return getStringAtt(this, 'content') }
  set content(val) { setStringAtt(this, 'content', val) }

  //HOVER ATTRIBUTE
  get hover() { return getStringAtt(this, 'hover') }
  set hover(val) { setStringAtt(this, 'hover', val) }

  //CURSOR ATTRIBUTE
  get cursor() { return getStringAtt(this, 'cursor') }
  set cursor(val) { setStringAtt(this, 'cursor', val) }

  //LEFT ICON ATTRIBUTE
  get lefticon() { return getStringAtt(this, 'lefticon') }
  set lefticon(val) { setStringAtt(this, 'lefticon', val) }

  //RIGHT ICON ATTRIBUTE
  get righticon() { return getStringAtt(this, 'righticon') }
  set righticon(val) { setStringAtt(this, 'righticon', val) }

  //CONSTRUCTOR
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    //STYLE
    const style = document.createElement('style')
    style.textContent = `@import url('orion-framework.css')`
    shadow.appendChild(style)
    //DIV
    const div = document.createElement('div')
    div.classList.add('button', 'button-text')
    shadow.appendChild(div)
    //SLOT
    const slot = document.createElement('slot')
    div.appendChild(slot)
  }
  
  attributeChangedCallback(name, oldVal, val) {
    const div = this.shadowRoot.querySelector('div')
    switch(name) {
      //WIDTH
      case 'width':
        if (this.width == '') 
          div.style.width = ''
        else switch(this.content) {
          //TEXT CONTENT
          case 'text':
          case '':
            let padding = 20
            if (this.lefticon) padding = padding - 10
            if (this.righticon) padding = padding - 10
            div.style.width = `calc(${this.width} - ${padding}px)`
          break
          //OTHER CONTENT
          default:
            div.style.width = this.width
            break
        }
        break
      //HEIGHT
      case 'height':
        if (this.height == '') 
          div.style.height = ''
        else 
          div.style.height = this.height
        break
      //BACKGROUND
      case 'background':
        div.style.setProperty('--oBackground', getOrionColor(this.background))
        break
      //COLOR
      case 'color':
        div.style.setProperty('--oColor', getOrionColor(this.color))
        break
      //TYPE
      case 'type':
        setStringAtt(div, 'shape', this.type)
        break
      //CONTENT
      case 'content':
        div.style.padding = ''
        if (this.content == 'emote') {
          div.classList.add('button-emote')
          div.classList.remove('button-text')
        } else if (this.content == 'box') {
          div.classList.remove('button-emote', 'button-text')
        } else {
          div.classList.remove('button-emote')
          div.classList.add('button-text')
          if (this.content == 'textbox')
            div.style.padding = '0'
        }
        break
      //HOVER
      case 'hover':
        setStringAtt(div, 'hover', this.hover)
        break
      //CURSOR
      case 'cursor':
        setStringAtt(div, 'cursor', this.cursor)
        break
      //LEFT ICON
      case 'lefticon':
        let leftImg = div.querySelector("#leftButtonImg")
        if (this.lefticon != '') {
          if (leftImg == null) {
            leftImg = document.createElement('img')
            leftImg.id = 'leftButtonImg'
            leftImg.classList.add('button-image')
            div.prepend(leftImg)
          }
          leftImg.src = this.lefticon
          div.style.paddingLeft = '0'
        } else if (leftImg != null) {
          leftImg.remove()
          div.style.paddingLeft = ''
        }
        break
      //RIGHT ICON
      case 'righticon':
        let rightImg = div.querySelector("#rightButtonImg")
        if (this.righticon != '') {
          if (rightImg == null) {
            rightImg = document.createElement('img')
            rightImg.id = 'rightButtonImg'
            rightImg.classList.add('button-image')
            div.append(rightImg)
          }
          rightImg.src = this.righticon
          div.style.paddingRight = '0'
        } else if (rightImg != null) {
          rightImg.remove()
          div.style.paddingRight = ''
        }
        break
    }
  }
})





 /*$$$$$ /$$   /$$ /$$$$$$$  /$$   /$$ /$$$$$$$$
|_  $$_/| $$$ | $$| $$__  $$| $$  | $$|__  $$__/
  | $$  | $$$$| $$| $$  \ $$| $$  | $$   | $$   
  | $$  | $$ $$ $$| $$$$$$$/| $$  | $$   | $$   
  | $$  | $$  $$$$| $$____/ | $$  | $$   | $$   
  | $$  | $$\  $$$| $$      | $$  | $$   | $$   
 /$$$$$$| $$ \  $$| $$      |  $$$$$$/   | $$   
|______/|__/  \__/|__/       \______/    |_*/

customElements.define('o-input', class extends HTMLElement {
  static get observedAttributes() { 
    return ['width', 'value', 'background', 'color', 'transparent', 'placeholder', 
            'label', 'showlabel', 'type', 'max', 'disabled'] 
  }

  //WIDTH ATTRIBUTE
  get width() { return getStringAtt(this, 'width') }
  set width(val) { setStringAtt(this, 'width', val) }
  
  //VALUE ATTRIBUTE
  get value() { return this.shadowRoot.querySelector('input').value }
  set value(val) { this.shadowRoot.querySelector('input').value = val }

  //BACKGROUND ATTRIBUTE
  get background() { return getStringAtt(this, 'background') }
  set background(val) { setStringAtt(this, 'background', val) }

  //COLOR ATTRIBUTE
  get color() { return getStringAtt(this, 'color') }
  set color(val) { setStringAtt(this, 'color', val) }

  //TRANSPARENT ATTRIBUTE
  get transparent() { return getBooleanAtt(this, 'transparent') }
  set transparent(val) { setBooleanAtt(this, 'transparent', val) }

  //PLACEHOLDER ATTRIBUTE
  get placeholder() { return getStringAtt(this, 'placeholder') }
  set placeholder(val) { setStringAtt(this, 'placeholder', val) }

  //LABEL ATTRIBUTE
  get label() { return getStringAtt(this, 'label') }
  set label(val) { setStringAtt(this, 'label', val) }

  //SHOWLABEL ATTRIBUTE
  get showlabel() { return getBooleanAtt(this, 'showlabel') }
  set showlabel(val) { setBooleanAtt(this, 'showlabel', val) }
  
  //TYPE ATTRIBUTE
  get type() { return getStringAtt(this, 'type') }
  set type(val) { setStringAtt(this, 'type', val, ['text', 'password', 'search', 'number', 'date', 'month', 'week', 'time']) }

  //MAX ATTRIBUTE
  get max() { return getStringAtt(this, 'max') }
  set max(val) { setStringAtt(this, 'max', val) }

  //DISABLED ATTRIBUTE
  get disabled() { return getBooleanAtt(this, 'disabled') }
  set disabled(val) { setBooleanAtt(this, 'disabled', val) }

  //CONSTRUCTOR
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    //STYLE
    const style = document.createElement('style')
    style.textContent = `@import url('orion-framework.css')`
    shadow.appendChild(style)
    //DIV
    const div = document.createElement('div')
    div.classList.add('button')
    div.style.width = '200px'
    shadow.appendChild(div)
    //INPUT
    const input = document.createElement('input')
    input.classList.add('input')
    input.type = 'text'
    input.spellcheck = false
    input.oninput = function() { this.value = input.value }
    div.appendChild(input)
    //LABEL
    const label = document.createElement('span')
    label.classList.add('input-label')
    div.appendChild(label)
  }

  attributeChangedCallback(name, oldVal, val) {
    const div = this.shadowRoot.querySelector('div')
    const input = this.shadowRoot.querySelector('input')
    const span = this.shadowRoot.querySelector('span')
    switch(name) {
      //WIDTH
      case 'width':
        if (this.width != '')
          div.style.width = this.width
        else
          div.style.width = '200px'
        break
      //VALUE
      case 'value':
        input.value = val
        break
      //BACKGROUND
      case 'background':
        div.style.setProperty('--oBackground', getOrionColor(val))
        break
      //COLOR
      case 'color':
        div.style.setProperty('--oColor', getOrionColor(val))
        break
      //TRANSPARENT
      case 'transparent':
        //TRANSPARENT
        if (this.hasAttribute('transparent')) {
          setStringAtt(div, 'shape', 'ghost')
          setStringAtt(div, 'hover', 'none')
          div.style.setProperty('--oBorderR', 0)
          input.style.width = '100%'
          input.style.padding = '0'
          span.style.left = '0'
        } else {
          setStringAtt(div, 'shape', 'plain')
          setStringAtt(div, 'hover', '')
          div.style.setProperty('--oBorderR', 'var(--buttonCorner)')
          input.style.width = 'calc(100% - 20px)'
          input.style.padding = '0 10px'
          span.style.left = '10px'
        }
        break
      //PLACEHOLDER
      case 'placeholder':
        input.placeholder = val
        break
      //LABEL
      case 'label':
        span.innerHTML = val
        break
      //SHOWLABEL
      case 'showlabel':
        if (this.hasAttribute('showlabel')) 
          span.style.opacity = '1'
        else 
          span.style.opacity = ''
        break
      //TYPE
      case 'type':
        if (val == '' || val == null) 
          input.type = 'text'
        else 
          input.type = val
        break
      //MAX
      case 'max':
        input.maxLength = val
        break
      //DISABLED
      case 'disabled':
        input.disabled = this.hasAttribute('disabled')
        break
    }
  }
})





  /*$$$$$  /$$      /$$ /$$$$$$ /$$$$$$$$ /$$$$$$  /$$   /$$
 /$$__  $$| $$  /$ | $$|_  $$_/|__  $$__//$$__  $$| $$  | $$
| $$  \__/| $$ /$$$| $$  | $$     | $$  | $$  \__/| $$  | $$
|  $$$$$$ | $$/$$ $$ $$  | $$     | $$  | $$      | $$$$$$$$
 \____  $$| $$$$_  $$$$  | $$     | $$  | $$      | $$__  $$
 /$$  \ $$| $$$/ \  $$$  | $$     | $$  | $$    $$| $$  | $$
|  $$$$$$/| $$/   \  $$ /$$$$$$   | $$  |  $$$$$$/| $$  | $$
 \______/ |__/     \__/|______/   |__/   \______/ |__/  |_*/

customElements.define('o-switch', class extends HTMLElement {
  static get observedAttributes() { return ['background', 'color', 'type', 'checked'] }

  //BACKGROUND ATTRIBUTE
  get background() { return getStringAtt(this, 'background') }
  set background(val) { setStringAtt(this, 'background', val) }

  //COLOR ATTRIBUTE
  get color() { return getStringAtt(this, 'color') }
  set color(val) { setStringAtt(this, 'color', val) }

  //TYPE ATTRIBUTE
  get type() { return getStringAtt(this, 'type') }
  set type(val) { setStringAtt(this, 'type', val, ['small']) }

  //CHECKED ATTRIBUTE
  get checked() { return this.shadowRoot.querySelector('input').checked }
  set checked(val) { this.shadowRoot.querySelector('input').checked = val }

  //CONSTRUCTOR
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    //STYLE
    const style = document.createElement('style')
    style.textContent = `@import url('orion-framework.css')`
    shadow.appendChild(style)
    //INPUT
    const input = document.createElement('input')
    input.classList.add('button', 'switch')
    input.type = 'checkbox'
    shadow.appendChild(input)
  }

  attributeChangedCallback(name, oldVal, val) {
    const input = this.shadowRoot.querySelector('input')
    switch(name) {
      //BACKGROUND
      case 'background':
        input.style.setProperty('--oBackground', getOrionColor(val))
        break
      //COLOR
      case 'color':
        input.style.setProperty('--oColor', getOrionColor(val))
        break
      //TYPE
      case 'type':
        if (val == 'small')
          input.setAttribute('switch', val)
        else
          input.removeAttribute('switch')
        break
      //CHECKED
      case 'checked':
        input.checked = this.hasAttribute('checked')
        break
    }
  }
})





 /*$$$$$$$      /$$$$$$  /$$      /$$ /$$$$$$ /$$$$$$$$ /$$$$$$  /$$   /$$
| $$_____/     /$$__  $$| $$  /$ | $$|_  $$_/|__  $$__//$$__  $$| $$  | $$
| $$          | $$  \__/| $$ /$$$| $$  | $$     | $$  | $$  \__/| $$  | $$
| $$$$$       |  $$$$$$ | $$/$$ $$ $$  | $$     | $$  | $$      | $$$$$$$$
| $$__/        \____  $$| $$$$_  $$$$  | $$     | $$  | $$      | $$__  $$
| $$           /$$  \ $$| $$$/ \  $$$  | $$     | $$  | $$    $$| $$  | $$
| $$$$$$$$ /$$|  $$$$$$/| $$/   \  $$ /$$$$$$   | $$  |  $$$$$$/| $$  | $$
|________/|__/ \______/ |__/     \__/|______/   |__/   \______/ |__/  |_*/

customElements.define('o-eswitch', class extends HTMLElement {
  static get observedAttributes() { return ['background', 'color', 'left', 'right', 'checked'] }

  //BACKGROUND ATTRIBUTE
  get background() { return getStringAtt(this, 'background') }
  set background(val) { setStringAtt(this, 'background', val) }

  //COLOR ATTRIBUTE
  get color() { return getStringAtt(this, 'color') }
  set color(val) { setStringAtt(this, 'color', val) }

  //COLOR ATTRIBUTE
  get left() { return getStringAtt(this, 'left') }
  set left(val) { setStringAtt(this, 'left', val) }

  //COLOR ATTRIBUTE
  get right() { return getStringAtt(this, 'right') }
  set right(val) { setStringAtt(this, 'right', val) }

  //CHECKED ATTRIBUTE
  get checked() { return this.shadowRoot.querySelector('input').checked }
  set checked(val) { this.shadowRoot.querySelector('input').checked = val }

  //CONSTRUCTOR
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    //STYLE
    const style = document.createElement('style')
    style.textContent = `@import url('orion-framework.css')`
    shadow.appendChild(style)
    //DIV
    const div = document.createElement('div')
    div.classList.add('button', 'eswitch')
    div.style.width = '80px'
    div.style.height = '40px'
    shadow.appendChild(div)
    //INPUT
    const input = document.createElement('input')
    input.type = 'checkbox'
    div.appendChild(input)
    //DIV1
    const div1 = document.createElement('div')
    div1.id = 'leftSwitchDiv'
    div1.classList.add('button-emote')
    div.appendChild(div1)
    //DIV2
    const div2 = document.createElement('div')
    div2.id = 'rightSwitchDiv'
    div2.classList.add('button-emote')
    div.appendChild(div2)
  }

  attributeChangedCallback(name, oldVal, val) {
    const div = this.shadowRoot.querySelector('div')
    const input = this.shadowRoot.querySelector('input')
    switch(name) {
      //BACKGROUND
      case 'background':
        div.style.setProperty('--oBackground', getOrionColor(val))
        break
      //COLOR
      case 'color':
        div.style.setProperty('--oColor', getOrionColor(val))
        break
      //LEFT
      case 'left':
        let leftDiv = div.querySelector("#leftSwitchDiv")
        leftDiv.innerHTML = this.left
        break
      //RIGHT
      case 'right':
        let rightDiv = div.querySelector("#rightSwitchDiv")
        rightDiv.innerHTML = this.right
        break
      //CHECKED
      case 'checked':
        input.checked = this.hasAttribute('checked')
        break
    }
  }
})





  /*$$$$$  /$$   /$$ /$$$$$$$$  /$$$$$$  /$$   /$$ /$$$$$$$   /$$$$$$  /$$   /$$
 /$$__  $$| $$  | $$| $$_____/ /$$__  $$| $$  /$$/| $$__  $$ /$$__  $$| $$  / $$
| $$  \__/| $$  | $$| $$      | $$  \__/| $$ /$$/ | $$  \ $$| $$  \ $$|  $$/ $$/
| $$      | $$$$$$$$| $$$$$   | $$      | $$$$$/  | $$$$$$$ | $$  | $$ \  $$$$/ 
| $$      | $$__  $$| $$__/   | $$      | $$  $$  | $$__  $$| $$  | $$  >$$  $$ 
| $$    $$| $$  | $$| $$      | $$    $$| $$\  $$ | $$  \ $$| $$  | $$ /$$/\  $$
|  $$$$$$/| $$  | $$| $$$$$$$$|  $$$$$$/| $$ \  $$| $$$$$$$/|  $$$$$$/| $$  \ $$
 \______/ |__/  |__/|________/ \______/ |__/  \__/|_______/  \______/ |__/  |_*/

customElements.define('o-checkbox', class extends HTMLElement {
  static get observedAttributes() { return ['background', 'color', 'type', 'checked'] }

  //BACKGROUND ATTRIBUTE
  get background() { return getStringAtt(this, 'background') }
  set background(val) { setStringAtt(this, 'background', val) }

  //COLOR ATTRIBUTE
  get color() { return getStringAtt(this, 'color') }
  set color(val) { setStringAtt(this, 'color', val) }

  //TYPE ATTRIBUTE
  get type() { return getStringAtt(this, 'type') }
  set type(val) { setStringAtt(this, 'type', val, ['reverse']) }

  //CHECKED ATTRIBUTE
  get checked() { return this.shadowRoot.querySelector('input').checked }
  set checked(val) { this.shadowRoot.querySelector('input').checked = val }

  //CONSTRUCTOR
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    //STYLE
    const style = document.createElement('style')
    style.textContent = `@import url('orion-framework.css')`
    shadow.appendChild(style)
    //INPUT
    const input = document.createElement('input')
    input.classList.add('button', 'checkbox')
    input.type = 'checkbox'
    shadow.appendChild(input)
  }

  attributeChangedCallback(name, oldVal, val) {
    const input = this.shadowRoot.querySelector('input')
    switch(name) {
      //BACKGROUND
      case 'background':
        input.style.setProperty('--oBackground', getOrionColor(val))
        break
      //COLOR
      case 'color':
        input.style.setProperty('--oColor', getOrionColor(val))
        break
      //TYPE
      case 'type':
        if (val == 'reverse')
          input.setAttribute('checkbox', val)
        else
          input.removeAttribute('checkbox')
        break
      //CHECKED
      case 'checked':
        input.checked = this.hasAttribute('checked')
        break
    }
  }
})





 /*$$$$$$   /$$$$$$  /$$$$$$$  /$$$$$$  /$$$$$$
| $$__  $$ /$$__  $$| $$__  $$|_  $$_/ /$$__  $$
| $$  \ $$| $$  \ $$| $$  \ $$  | $$  | $$  \ $$
| $$$$$$$/| $$$$$$$$| $$  | $$  | $$  | $$  | $$
| $$__  $$| $$__  $$| $$  | $$  | $$  | $$  | $$
| $$  \ $$| $$  | $$| $$  | $$  | $$  | $$  | $$
| $$  | $$| $$  | $$| $$$$$$$/ /$$$$$$|  $$$$$$/
|__/  |__/|__/  |__/|_______/ |______/ \_____*/

customElements.define('o-radio', class extends HTMLElement {
  static get observedAttributes() { return ['background', 'color', 'type', 'name', 'checked'] }

  //BACKGROUND ATTRIBUTE
  get background() { return getStringAtt(this, 'background') }
  set background(val) { setStringAtt(this, 'background', val) }

  //COLOR ATTRIBUTE
  get color() { return getStringAtt(this, 'color') }
  set color(val) { setStringAtt(this, 'color', val) }

  //TYPE ATTRIBUTE
  get type() { return getStringAtt(this, 'type') }
  set type(val) { setStringAtt(this, 'type', val, ['reverse']) }

  //NAME ATTRIBUTE
  get name() { this.shadowRoot.querySelector('input').name }
  set name(val) { this.shadowRoot.querySelector('input').name }

  //CHECKED ATTRIBUTE
  get checked() { return this.shadowRoot.querySelector('input').checked }
  set checked(val) { this.shadowRoot.querySelector('input').checked = val }

  //CONSTRUCTOR
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    //STYLE
    const style = document.createElement('style')
    style.textContent = `@import url('orion-framework.css')`
    shadow.appendChild(style)
    //INPUT
    const input = document.createElement('input')
    input.classList.add('button', 'radio')
    input.type = 'radio'
    shadow.appendChild(input)
  }

  attributeChangedCallback(name, oldVal, val) {
    const input = this.shadowRoot.querySelector('input')
    switch(name) {
      //BACKGROUND
      case 'background':
        input.style.setProperty('--oBackground', getOrionColor(val))
        break
      //COLOR
      case 'color':
        input.style.setProperty('--oColor', getOrionColor(val))
        break
      //TYPE
      case 'type':
        if (val == 'reverse')
          input.setAttribute('radio', val)
        else
          input.removeAttribute('radio')
        break
      //NAME
      case 'name':
        input.name = val
        break
      //CHECKED
      case 'checked':
        input.checked = this.hasAttribute('checked')
        break
    }
  }
})





  /*$$$$$  /$$$$$$$$ /$$$$$$$$ /$$   /$$ /$$$$$$$   /$$$$$$  /$$$$$$$ 
 /$$__  $$| $$_____/| $$_____/| $$  /$$/| $$__  $$ /$$__  $$| $$__  $$
| $$  \__/| $$      | $$      | $$ /$$/ | $$  \ $$| $$  \ $$| $$  \ $$
|  $$$$$$ | $$$$$   | $$$$$   | $$$$$/  | $$$$$$$ | $$$$$$$$| $$$$$$$/
 \____  $$| $$__/   | $$__/   | $$  $$  | $$__  $$| $$__  $$| $$__  $$
 /$$  \ $$| $$      | $$      | $$\  $$ | $$  \ $$| $$  | $$| $$  \ $$
|  $$$$$$/| $$$$$$$$| $$$$$$$$| $$ \  $$| $$$$$$$/| $$  | $$| $$  | $$
 \______/ |________/|________/|__/  \__/|_______/ |__/  |__/|__/  |_*/

customElements.define('o-seekbar', class extends HTMLElement {
  static get observedAttributes() { return ['width', 'background', 'color', 'min', 'max', 'value'] }

  //WIDTH ATTRIBUTE
  get width() { return getStringAtt(this, 'width') }
  set width(val) { setStringAtt(this, 'width', val) }

  //BACKGROUND ATTRIBUTE
  get background() { return getStringAtt(this, 'background') }
  set background(val) { setStringAtt(this, 'background', val) }

  //COLOR ATTRIBUTE
  get color() { return getStringAtt(this, 'color') }
  set color(val) { setStringAtt(this, 'color', val) }

  //MIN ATTRIBUTE
  get min() { return this.shadowRoot.querySelector('input').min }
  set min(val) { this.shadowRoot.querySelector('input').min = val }

  //MAX ATTRIBUTE
  get max() { return this.shadowRoot.querySelector('input').max }
  set max(val) { this.shadowRoot.querySelector('input').max = val }

  //VALUE ATTRIBUTE
  get value() { return this.shadowRoot.querySelector('input').value }
  set value(val) { this.shadowRoot.querySelector('input').value = val }

  //CONSTRUCTOR
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    //STYLE
    const style = document.createElement('style')
    style.textContent = `@import url('orion-framework.css')`
    shadow.appendChild(style)
    //INPUT
    const input = document.createElement('input')
    input.classList.add('seekbar')
    input.type = 'range'
    shadow.appendChild(input)
  }

  attributeChangedCallback(name, oldVal, val) {
    const input = this.shadowRoot.querySelector('input')
    switch(name) {
      //WIDTH
      case 'width':
        input.style.width = this.width
        break
      //BACKGROUND
      case 'background':
        input.style.setProperty('--oBackground', getOrionColor(val))
        break
      //COLOR
      case 'color':
        input.style.setProperty('--oColor', getOrionColor(val))
        break
      //MIN
      case 'min':
        input.min = val
        break
      //MAX
      case 'max':
        input.max = val
        break
      //VALUE
      case 'value':
        input.value = val
        break
    }
  }
})





  /*$$$$$   /$$$$$$  /$$$$$$$  /$$$$$$$
 /$$__  $$ /$$__  $$| $$__  $$| $$__  $$
| $$  \__/| $$  \ $$| $$  \ $$| $$  \ $$
| $$      | $$$$$$$$| $$$$$$$/| $$  | $$
| $$      | $$__  $$| $$__  $$| $$  | $$
| $$    $$| $$  | $$| $$  \ $$| $$  | $$
|  $$$$$$/| $$  | $$| $$  | $$| $$$$$$$/
 \______/ |__/  |__/|__/  |__/|______*/

customElements.define('o-card', class extends HTMLElement {
  static get observedAttributes() { return ['background', 'color', 'image', 'text'] }

  //BACKGROUND ATTRIBUTE
  get background() { return getStringAtt(this, 'background') }
  set background(val) { setStringAtt(this, 'background', val) }

  //COLOR ATTRIBUTE
  get color() { return getStringAtt(this, 'color') }
  set color(val) { setStringAtt(this, 'color', val) }

  //IMAGE ATTRIBUTE
  get image() { return getStringAtt(this, 'image') }
  set image(val) { setStringAtt(this, 'image', val) }

  //IMAGE ATTRIBUTE
  get text() { return getStringAtt(this, 'text') }
  set text(val) { setStringAtt(this, 'text', val) }

  //CONSTRUCTOR
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    //STYLE
    const style = document.createElement('style')
    style.textContent = `@import url('orion-framework.css')`
    shadow.appendChild(style)
    //DIV
    const div = document.createElement('div')
    div.classList.add('button', 'card')
    div.setAttribute('hover', 'none')
    shadow.appendChild(div)
    //IMG
    const img = document.createElement('img')
    div.appendChild(img)
    //TEXT
    const text = document.createElement('div')
    text.id = 'cardText'
    div.appendChild(text)
  }

  attributeChangedCallback(name, oldVal, val) {
    const div = this.shadowRoot.querySelector('div')
    const img = this.shadowRoot.querySelector('img')
    const text = div.querySelector('#cardText')
    switch(name) {
      //BACKGROUND
      case 'background':
        div.style.setProperty('--oBackground', getOrionColor(val))
        break
      //COLOR
      case 'color':
        div.style.setProperty('--oColor', getOrionColor(val))
        break
      //TYPE
      case 'image':
        img.src = val
        break
      //CHECKED
      case 'text':
        text.textContent = val
        break
    }
  }
})





 /*$$$$$$   /$$$$$$  /$$$$$$$  /$$$$$$  /$$$$$$
| $$__  $$ /$$__  $$| $$__  $$|_  $$_/ /$$__  $$
| $$  \ $$| $$  \ $$| $$  \ $$  | $$  | $$  \ $$
| $$$$$$$/| $$$$$$$$| $$  | $$  | $$  | $$  | $$
| $$__  $$| $$__  $$| $$  | $$  | $$  | $$  | $$
| $$  \ $$| $$  | $$| $$  | $$  | $$  | $$  | $$
| $$  | $$| $$  | $$| $$$$$$$/ /$$$$$$|  $$$$$$/
|__/  |__/|__/  |__/|_______/ |______/ \_____*/

customElements.define('o-module', class extends HTMLElement {
  static get observedAttributes() { return ['image', 'name', 'checked'] }

  //TYPE ATTRIBUTE
  get image() { return getStringAtt(this, 'image') }
  set image(val) { setStringAtt(this, 'image', val) }

  //TYPE ATTRIBUTE
  get name() { return getStringAtt(this, 'name') }
  set name(val) { setStringAtt(this, 'name', val) }

  //CHECKED ATTRIBUTE
  get checked() { return this.shadowRoot.querySelector('input').checked }
  set checked(val) { this.shadowRoot.querySelector('input').checked = val }

  /*<div id="${id}" class="module">
    <input id="check-${id}" type="radio" name="module">
    <img src="${image}"></img>
    <div id="name-${id}">${name}</div>
  </div>*/

  //CONSTRUCTOR
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    //STYLE
    const style = document.createElement('style')
    style.textContent = `@import url('orion-framework.css')`
    shadow.appendChild(style)
    //DIV
    const div = document.createElement('div')
    div.classList.add('module')
    shadow.appendChild(div)
    //INPUT
    const input = document.createElement('input')
    input.classList.add('button', 'radio')
    input.type = 'radio'
    shadow.appendChild(input)
  }

  attributeChangedCallback(name, oldVal, val) {
    const input = this.shadowRoot.querySelector('input')
    switch(name) {
      //BACKGROUND
      case 'background':
        input.style.setProperty('--oBackground', getOrionColor(val))
        break
      //COLOR
      case 'color':
        input.style.setProperty('--oColor', getOrionColor(val))
        break
      //TYPE
      case 'type':
        if (val == 'reverse')
          input.setAttribute('radio', val)
        else
          input.removeAttribute('radio')
        break
      //CHECKED
      case 'checked':
        input.checked = this.hasAttribute('checked')
        break
    }
  }
})





 /*$        /$$$$$$   /$$$$$$  /$$$$$$$  /$$$$$$ /$$   /$$  /$$$$$$
| $$       /$$__  $$ /$$__  $$| $$__  $$|_  $$_/| $$$ | $$ /$$__  $$
| $$      | $$  \ $$| $$  \ $$| $$  \ $$  | $$  | $$$$| $$| $$  \__/
| $$      | $$  | $$| $$$$$$$$| $$  | $$  | $$  | $$ $$ $$| $$ /$$$$
| $$      | $$  | $$| $$__  $$| $$  | $$  | $$  | $$  $$$$| $$|_  $$
| $$      | $$  | $$| $$  | $$| $$  | $$  | $$  | $$\  $$$| $$  \ $$
| $$$$$$$$|  $$$$$$/| $$  | $$| $$$$$$$/ /$$$$$$| $$ \  $$|  $$$$$$/
|________/ \______/ |__/  |__/|_______/ |______/|__/  \__/ \_____*/

customElements.define('o-loading', class extends HTMLElement {
  static get observedAttributes() { return ['color', 'type'] }

  //COLOR ATTRIBUTE
  get color() { return getStringAtt(this, 'color') }
  set color(val) { setStringAtt(this, 'color', val) }

  //TYPE ATTRIBUTE
  get type() { return getStringAtt(this, 'type') }
  set type(val) { setStringAtt(this, 'type', val) }

  //CONSTRUCTOR
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    //STYLE
    const style = document.createElement('style')
    style.textContent = `@import url('orion-framework.css')`
    shadow.appendChild(style)
    //INPUT
    const div = document.createElement('div')
    div.classList.add('loading')
    shadow.appendChild(div)
  }

  attributeChangedCallback(name, oldVal, val) {
    const div = this.shadowRoot.querySelector('div')
    switch(name) {
      //COLOR
      case 'color':
        div.style.setProperty('--oColor', getOrionColor(val))
        break
      //TYPE
      case 'type':
        if (val == 'dots' || val == 'spin' || val == 'pulse')
          div.setAttribute('type', val)
        else
          div.removeAttribute('type')
        break
    }
  }
})

/* ASCII FONT: Big Money-ne - https://manytools.org/hacker-tools/ascii-banner */