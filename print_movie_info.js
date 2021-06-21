var openedNum = 0;
let movieSeqs = [];

function closeButtonNode() {
    const spanID = this.id.replace('closedButton', 'openedSpan');
    const openedList = document.getElementById('openedList');
    const movieSeq = document.getElementById(spanID).firstChild.id;
    openedList.removeChild(document.getElementById(spanID));
    movieSeqs = movieSeqs.splice(movieSeqs, movieSeqs.indexOf(movieSeq))
}

function showFolderList(event) {
    const folderListDiv = document.getElementById('folderList');
    const folderListBox = document.createElement('div');
    const folderSelect = document.createElement('ul');

    const folderListBoxID = 'folderListBoxID';

    folderListBox.id = folderListBoxID
    folderListBox.className = 'folderListBoxClass';

    folderListBox.top = event.pageY + 'px';
    folderListBox.left = event.pageX + 'px';

    for (var i = 0; i < folderListDiv.childNodes.length; i++) {
        const folderDiv = folderListDiv.childNodes[i];
        const folderNameSpan = document.getElementById(folderDiv.id.replace('Div', 'Name'));
        const folderName = folderNameSpan.textContent;
        const fnItem = document.createElement('li');
        const fnItem_a = document.createElement('a');
        const fnItem_a_text = document.createTextNode(folderName);
        const addFile = function (e) {
            console.log(e);
            console.log("addFile()...");
        }

        fnItem.addEventListener('click', addFile);
        fnItem_a.appendChild(fnItem_a_text);
        fnItem.appendChild(fnItem_a);
        folderSelect.appendChild(fnItem);        
    }

    folderListBox.appendChild(folderSelect);

    const prevFLB = document.getElementById(folderListBoxID);
    if(prevFLB) {
        prevFLB.remove();
    }

    document.body.appendChild(folderListBox);
}

function printdetails(Data, isFile) {
    // print movie details on main display
    var detailText = "";
    var data = Data.Data[0].Result[0];
    var Title = data.title.replace(/ !HS /g, "").replace(/ !HE /g, "");
    var posterSrc;

    var directorCnt = Object.keys(data.directors.director).length;
    var actorCnt = Object.keys(data.actors.actor).length;

    if (actorCnt > 5) {
        actorCnt = 5;
    }
    if (directorCnt > 2) {
        directorCnt = 2;
    }

    var imgSrc = data.posters;
    if (imgSrc == "") {
        posterSrc = "./images/noimg.png";
    }
    else {
        posterSrc = imgSrc.split('|')[0];
    }

    // create poster
    const poster = document.createElement('div');
    poster.id = 'poster';

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', posterSrc);
    posterImg.setAttribute('width', 250);
    posterImg.setAttribute('height', 325);

    poster.appendChild(posterImg);

    // create details
    const details = document.createElement('div');
    details.id = "details";

    detailText += "<b>제목</b>: " + Title + "(" + data.prodYear + ")</br>";
    detailText += "<b>장르</b>: " + data.genre + "</br>";
    detailText += "<b>국가</b>: " + data.nation + "</br>";
    detailText += "<b>감독</b>: " + data.directors.director[0].directorNm;
    for (var i = 1; i < directorCnt; i++) {
        detailText += ", " + data.directors.director[i].directorNm;
    }
    detailText += "</br>";
    detailText += "<b>출연</b>: " + data.actors.actor[0].actorNm;
    for (var i = 1; i < actorCnt; i++) {
        detailText += ", " + data.actors.actor[i].actorNm;
    }
    detailText += "</br>";
    detailText += "<b>줄거리</b>: " + data.plots.plot[0].plotText + "</br>";

    details.innerHTML = detailText;

    // create options
    const options = document.createElement('div');
    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    const button3 = document.createElement('button');

    options.id = 'options';
    button1.className = 'detailsButton';
    button2.className = 'detailsButton';
    button3.className = 'detailsButton';
    button1.textContent = 'Add';
    button2.textContent = 'Play';
    button3.textContent = 'Is File?';
    button1.setAttribute('onclick', showFolderList, false);

    options.appendChild(button1);
    options.appendChild(button2);
    options.appendChild(button3);

    // add poster, detail, options to mainDisplay
    const mainDisplay = document.getElementById("mainDisplay");
    while (mainDisplay.hasChildNodes()) {
        mainDisplay.removeChild(mainDisplay.firstChild);
    }
    mainDisplay.appendChild(poster);
    mainDisplay.appendChild(options);
    mainDisplay.appendChild(details);

    // add button on opened_list at index.html
    const openedList = document.getElementById('openedList');
    var findDuplicate = 0;
    for (const seq of movieSeqs) {
        if (seq == data.movieSeq) {
            findDuplicate = 1;
            break;
        }
    }
    if (findDuplicate == 0) {
        openedNum += 1;
        movieSeqs.push(data.movieSeq);

        const openedSpan = document.createElement('span');
        const openedButton = document.createElement('button');
        const closeButton = document.createElement('button');
        const movieSeqNode = document.createElement('span');

        openedSpan.className = 'openedSpan';
        openedSpan.id = 'openedSpan' + String(openedNum);
        openedButton.className = 'openedButton';
        openedButton.id = 'openedButton' + String(openedNum);
        closeButton.className = 'closeButton';
        closeButton.id = 'closedButton' + String(openedNum);

        var query = "\"" + data.movieSeq + "\",\"" + Title + "\",\"" + isFile + "\"";
        openedButton.setAttribute('onclick', 'searchByMovieSeq(' + query + ')')
        openedButton.innerHTML = Title;
        closeButton.addEventListener('click', closeButtonNode);
        closeButton.innerHTML = 'X';

        movieSeqNode.id = data.movieSeq;
        movieSeqNode.setAttribute('style', 'display=\'hidden\'');

        openedSpan.appendChild(movieSeqNode);
        openedSpan.appendChild(openedButton);
        openedSpan.appendChild(closeButton);

        console.log(openedList);
        openedList.appendChild(openedSpan);
    }
}

function searchByMovieSeq(movieSeq, Title, isFile) {
    var url = new URL('http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp');
    var listCount = 10;
    var startCount = 0;
    var params = {
        'collection': 'kmdb_new2',
        'ServiceKey': 'Y3XG54K0S7679W988P2A',
        'listCount': listCount,
        'startCount': startCount,
        'title': Title,
        'movieSeq': movieSeq,
        'detail': 'Y',
        'type': '극영화',
    };
    url.search = new URLSearchParams(params).toString();
    console.log(movieSeq, Title);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(success => printdetails(success, isFile))
        .catch((error) => console.log(error));
}