let startTime = 0;
        let rotationDuration = 0;
        const imageElement = document.querySelector('#logo');
        
        imageElement.addEventListener('mouseenter', () => {
            startTime = Date.now();
            imageElement.classList.add('rotating');
            imageElement.classList.remove('reverse-rotating');
        });
        
        imageElement.addEventListener('mouseleave', () => {
            const endTime = Date.now();
            rotationDuration = endTime - startTime;
            
            // Calculate number of complete rotations (2s per rotation)
            const rotations = Math.ceil(rotationDuration / 2000);
            const currentRotation = (rotationDuration % 2000) / 2000 * 360;
            
            // Remove the continuous rotation
            imageElement.classList.remove('rotating');
            imageElement.classList.add('reverse-rotating');
            
            // Calculate the total degrees to rotate back
            const totalDegrees = (rotations * 360) + currentRotation;
            
            // Set the current rotation position
            imageElement.style.transform = `rotate(${totalDegrees}deg)`;
            
            // Force a reflow
            imageElement.offsetHeight;
            
            // Animate back to 0
            requestAnimationFrame(() => {
                imageElement.style.transform = 'rotate(0deg)';
            });
        });

function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.getElementById("timeElement");
    timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);


// Make the DIV element draggable:
dragElement(document.getElementById("window"));  

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("welcomeheader")) {
      // Use the welcomeheader for dragging
      document.getElementById("welcomeheader").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  
  // Make the DIV element draggable:
  dragElement(document.getElementById("window"));