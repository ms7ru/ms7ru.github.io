var totalApps = listOfApps.length;

// Create a container for app windows if it doesn't exist
function ensureAppWindowContainer() {
    let container = document.getElementById('app-windows-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'app-windows-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);
    }
    return container;
}

// Function to create a unique app window
function createAppWindow(app) {
    // Create app window element
    var appWindowElement = document.createElement('div');
    appWindowElement.id = `App${app.AppNo}`;
    appWindowElement.style.backdropFilter = 'blur(20px)';
    appWindowElement.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    appWindowElement.style.color = '#fff';
    appWindowElement.style.position = 'absolute';
    appWindowElement.style.top = '50%';
    appWindowElement.style.left = '50%';
    appWindowElement.style.transform = 'translate(-50%, -50%)';
    appWindowElement.style.padding = '10px';
    appWindowElement.style.border = 'solid';
    appWindowElement.style.width = '50vw';
    appWindowElement.style.height = '50vh';
    appWindowElement.style.borderRadius = '16px';
    appWindowElement.style.display = 'none';  // Hidden by default
    appWindowElement.style.zIndex = '1000';
    appWindowElement.style.pointerEvents = 'auto';

    // App window header
    var appHeader = document.createElement('div');
    appHeader.id = `App${app.AppNo}-header`;
    appHeader.style.borderRadius = '6px';
    appHeader.style.backdropFilter = 'blur(20px)';
    appHeader.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    appHeader.style.display = 'flex';
    appHeader.style.cursor = 'move';
    appHeader.style.marginTop = '8px';
    appHeader.style.justifyContent = 'space-between';
    appHeader.style.alignItems = 'center';

    // Close button
    var closeButton = document.createElement('div');
    closeButton.onclick = function() {
        appWindowElement.style.display = 'none';
    };
    closeButton.style.cursor = 'pointer';
    closeButton.style.margin = '0px';
    closeButton.style.color = '#000';
    closeButton.style.fontWeight = '500';
    closeButton.style.marginLeft = '16px';
    closeButton.classList.add('closebutton');
    closeButton.textContent = '×';

    // App name in header as a clickable link
    var headerAppName = document.createElement('h3');
    var appLink = document.createElement('a');
    appLink.href = app.AppLink;
    appLink.textContent = app.AppName;
    appLink.target = '_blank';
    appLink.style.color = '#000';
    appLink.style.textDecoration = 'none';
    appLink.style.fontWeight = '500';
    headerAppName.appendChild(appLink);
    headerAppName.style.margin = '0px';

    appHeader.appendChild(closeButton);
    appHeader.appendChild(headerAppName);

    // App content (iframe)
    var appContent = document.createElement('div');
    appContent.style.backgroundColor = '#fff';
    appContent.style.margin = '1px';
    appContent.style.marginTop = '5px';
    appContent.style.borderRadius = '3px';
    appContent.style.width = '100%';
    appContent.style.height = 'calc(100% - 50px)';  // Adjust for header

    var iframe = document.createElement('iframe');
    iframe.src = app.AppLink;  // Use the specific app link
    iframe.frameBorder = "0";
    iframe.style.height = '100%';
    iframe.style.width = '100%';

    appContent.appendChild(iframe);

    appWindowElement.appendChild(appHeader);
    appWindowElement.appendChild(appContent);

    // Add to app windows container
    var appWindowsContainer = ensureAppWindowContainer();
    appWindowsContainer.appendChild(appWindowElement);

    // Make the window draggable
    dragElement(appWindowElement);

    return appWindowElement;
}

// Process each app
listOfApps.forEach(function(app) {
    // Create taskbar app element
    var taskbarAppElement = document.createElement('div');
    taskbarAppElement.style.backgroundColor = '#fff';
    taskbarAppElement.style.borderRadius = '3px';
    taskbarAppElement.style.display = 'flex';
    taskbarAppElement.style.margin = '3px';
    taskbarAppElement.style.cursor = 'pointer';
    
    var appIcon = document.createElement('img');
    appIcon.src = app.AppIcon;
    appIcon.style.width = '24px';
    appIcon.style.height = '24px';
    
    var appName = document.createElement('h3');
    appName.textContent = app.AppName;
    appName.style.marginLeft = '5px';
    
    taskbarAppElement.appendChild(appIcon);
    taskbarAppElement.appendChild(appName);

    // Add to taskbar
    var taskbarAppsContainer = document.getElementById('taskbarapps');
    if (taskbarAppsContainer) {
        // Create the app window
        var appWindow = createAppWindow(app);

        // Add click event to taskbar app to show the specific window
        taskbarAppElement.onclick = function() {
            appWindow.style.display = 'block';
        };

        taskbarAppsContainer.appendChild(taskbarAppElement);
    }
});

// Drag functionality
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var header = elmnt.querySelector(`[id$="-header"]`);
    
    if (header) {
        header.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}