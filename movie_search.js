function writeonmain(Data, movieName, isFile) {
    var data = Data.Data[0];
    var displayCnt = data.Count;
    var movieSeq, poster, query;

    console.log('writeonmain with ' + movieName);
    var mainDisplay = document.getElementById('mainDisplay');
    while (mainDisplay.hasChildNodes()) {
        mainDisplay.removeChild(mainDisplay.firstChild);
    }

    for (var i = 0; i < displayCnt; i++) {
        const movieSpan = document.createElement('span');
        movieSpan.className = 'movieSpan';

        const movieButton = document.createElement('button');
        movieButton.className = 'movieButton';
        movieButton.id = 'button' + String(i);

        movieSeq = '\"' + data.Result[i].movieSeq + '\"';
        query = movieSeq + ', \"' + movieName + '\", \"' + isFile + '\"';

        movieButton.setAttribute('onclick', 'searchByMovieSeq('+query+')');

        const movieTitle = document.createElement('span');
        movieTitle.className = 'movieTitleSpan'
        movieTitle.innerHTML = data.Result[i].title.replace(/ !HS /g, "").replace(/ !HE /g, "");

        const movieImg = document.createElement('img');
        var imgSrc = data.Result[i].posters;
        if (imgSrc == "") {
            poster = "./images/noimg.png";
        }
        else {
            poster = imgSrc.split('|')[0];
        }
        movieImg.setAttribute('src', poster);
        movieImg.setAttribute('width', 150);
        movieImg.setAttribute('height', 195);

        movieButton.appendChild(movieImg);
        movieSpan.appendChild(movieButton);
        movieSpan.appendChild(movieTitle);
        document.getElementById('mainDisplay').appendChild(movieSpan);
    }
}

function search(movieName, isFile) {
    var url = new URL('http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp');
    var listCount = 10;
    var startCount = 0;
    var params = {
        'collection': 'kmdb_new2',
        'ServiceKey': 'Y3XG54K0S7679W988P2A',
        'listCount': listCount,
        'startCount': startCount,
        'title': movieName,
        'detail': 'Y',
        'type': '극영화',
    };
    url.search = new URLSearchParams(params).toString();

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };
    // fetch(url, requestOptions)
    // .then(response => response.json())
    // .then((data) => data_ = data)
    // .catch((error) => console.log(error))
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(success => writeonmain(success, movieName, isFile))
        .catch((error) => console.log(error));
}