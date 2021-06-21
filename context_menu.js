// reference: https://heodolf.tistory.com/120
var target;

const ctxMenuFunction = [
    [
        {
            label: 'Rename',
            onClick: function (e) {
                console.log(e.path[3].id)
                renameFolder(target);
            }
        },
        {
            label: 'Remove',
            onClick: function (e) {
                removeFolder(target);
            }
        },
    ]
];

function handleCreateContextMenu(event) {
    console.log("Create Context...");
    event.preventDefault();

    target = event.target;
    targetClass = target.className;
    const ctxMenuID = 'ctxMenuID';
    const ctxMenu = document.createElement('div');

    ctxMenu.id = ctxMenuID;
    ctxMenu.className = 'ctxMenuClass';

    ctxMenu.style.top = event.pageY + 'px';
    ctxMenu.style.left = event.pageX + 'px';

    const ctxMenuList = document.createElement('ul');

    if (targetClass == 'folderName') {
        const folderFunction = ctxMenuFunction[0];
        console.log(folderFunction);
        for (var i = 0; i < folderFunction.length; i++) {
            const item = folderFunction[i];
            const ctxMenuItem = document.createElement('li');
            const ctxMenuItem_a = document.createElement('a');
            const ctxMenuItem_a_text = document.createTextNode(item.label);
            const itemOnClick = item.onClick;

            ctxMenuItem.addEventListener('click', itemOnClick);
            ctxMenuItem_a.appendChild(ctxMenuItem_a_text);
            ctxMenuItem.appendChild(ctxMenuItem_a);
            ctxMenuList.appendChild(ctxMenuItem);
        }
    }/*
    else if (targetClass == 'detailsButton') {
        const folderList = document.getElementById('folderList');
        console.log(folderList.childNodes.length);
        for(var i = 0; i < folderList.childNodes.length; i++) {
            const folderDiv = folderList.childNodes[i];
            const folderName = document.getElementById(folderDiv.id.replace('Div', 'Name'));
            const ctxMenuItem = document.createElement('li');
            ctxMenuItem.id = folderName.id.replace('Name', 'Act');
            const ctxMenuItem_a = document.createElement('a');
            const ctxMenuItem_a_text = document.createTextNode(folderName.textContent);
            const itemOnClick = function (e) {
                console.log(e);
            }

            ctxMenuItem.addEventListener('click', itemOnClick);
            ctxMenuItem_a.appendChild(ctxMenuItem_a_text);
            ctxMenuItem.appendChild(ctxMenuItem_a);
            ctxMenuList.appendChild(ctxMenuItem);
        }
    }*/

    ctxMenu.appendChild(ctxMenuList);

    const prevCtxMenu = document.getElementById(ctxMenuID);
    if (prevCtxMenu) {
        prevCtxMenu.remove();
    }

    document.body.appendChild(ctxMenu);
}

function handleClearContextMenu(event) {
    console.log("Clear Context...");
    const ctxMenu = document.getElementById('ctxMenuID');
    if (ctxMenu) {
        ctxMenu.remove();
    }
}

document.addEventListener('click', handleClearContextMenu, false);