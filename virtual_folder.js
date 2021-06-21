var fileInput = document.getElementById('fileInput');
var nametmp = "";
var folderNum = 0;
var movieNum = 0;

// fileInput.style.opacity = 0;
fileInput.addEventListener('change', makeTree);

function makeTree() {
    const folderList = document.getElementById('folderList');

    const selectedFiles = fileInput.files;
    const selectedDirectory = selectedFiles[0].webkitRelativePath;
    const directoryName = selectedDirectory.slice(0, selectedDirectory.indexOf("/"));
    const folderDiv = createFolder(directoryName);
    folderDiv.appendChild(appendFiles(selectedFiles));
    folderList.appendChild(folderDiv);
}

function makeEmptyFolder() {
    const folderList = document.getElementById('folderList');
    const folderDiv = createFolder("Folder - " + String(folderNum+1));
    folderList.appendChild(folderDiv);
}

function renaming() {
    const newName = document.createElement('span');
    const renameNode = document.getElementById('renameID');
    const parentID = renameNode.parentNode.id;
    newName.id = parentID.replace('folder', 'folderName');
    if (renameNode.value == 'n' || renameNode.value == 'N') {
        newName.textContent = nametmp;
    }
    else {
        newName.textContent = renameNode.value;
    }
    newName.className = 'folderName';
    newName.addEventListener('contextmenu', handleCreateContextMenu, false);

    document.getElementById(parentID).appendChild(newName);
    renameNode.remove();
}

function renameFolder(target) {
    const parentNodeID = target.parentElement.id;
    nametmp = target.textContent;
    target.remove();

    const renameInput = document.createElement('input');
    renameInput.id = 'renameID';
    renameInput.placeholder = 'To cancle type N';
    renameInput.setAttribute('onchange', 'renaming()');
    document.getElementById(parentNodeID).appendChild(renameInput);
}

function removeFolder(target) {
    const parentNodeID = target.parentElement.id;
    const folderDivID = parentNodeID.replace('folder', 'folderDiv');
    document.getElementById(folderDivID).remove();
}

function createFolder(directoryName) {
    folderNum += 1;

    const folderDiv = document.createElement('div');
    folderDiv.className = 'folderDiv';
    folderDiv.id = 'folderDiv-' + String(folderNum);

    const virtualFolder = document.createElement('button');

    virtualFolder.className = 'virtualFolder';
    virtualFolder.id = 'folder-' + String(folderNum);

    const toggle = document.createElement('span');
    toggle.id = 'folder-' + String(folderNum) + '-toggle';

    const name = document.createElement('span');
    name.id = 'folderName-' + String(folderNum);
    name.className = 'folderName';
    name.textContent = directoryName;
    name.addEventListener('contextmenu', handleCreateContextMenu, false);

    toggle.appendChild(closedImg());
    virtualFolder.appendChild(toggle);
    virtualFolder.appendChild(name);
    virtualFolder.addEventListener('click', openCloseList);
    folderDiv.appendChild(virtualFolder);

    return folderDiv;
}

function appendFiles(selectedFiles) {
    const fileDiv = document.createElement('div');
    fileDiv.className = 'fileDiv';
    fileDiv.id = 'file-' + String(folderNum);

    for (const file of selectedFiles) {
        movieNum += 1;
        const buttonDiv = document.createElement('div');
        const movieName = parse(file.name);
        const fileButton = document.createElement('button');
        fileButton.className = 'fileButton';
        fileButton.id = 'movieFile' + String(movieNum);
        fileButton.setAttribute('onclick', 'search(\"' + movieName + '\")');
        fileButton.textContent = movieName;

        buttonDiv.appendChild(fileButton);
        fileDiv.appendChild(buttonDiv);
    }

    return fileDiv;
}

function openCloseList() {
    console.log("Activate openCloseList()...");
    const fileID = this.id.replace('folder', 'file');
    const toggle = document.getElementById(this.id + '-toggle');

    if (document.getElementById(fileID).style.display === 'block') {
        document.getElementById(fileID).style.display = 'none';
        toggle.replaceChild(closedImg(), toggle.firstChild);
    }
    else {
        document.getElementById(fileID).style.display = 'block';
        toggle.replaceChild(openedImg(), toggle.firstChild);
    }
}

function closedImg() {
    const closedImg = document.createElement('img');
    closedImg.id = 'folderImg';
    closedImg.setAttribute('src', './images/folderClosed.png');
    closedImg.setAttribute('width', '25px');
    closedImg.setAttribute('height', '25px');

    return closedImg;
}

function openedImg() {
    const openedImg = document.createElement('img');
    openedImg.id = 'folderImg';
    openedImg.setAttribute('src', './images/folderOpened.png');
    openedImg.setAttribute('width', '25px');
    openedImg.setAttribute('height', '25px');

    return openedImg
}