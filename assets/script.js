let startTime = 0;
let rotationDuration = 0;
const imageElement = document.querySelector('#root img');

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