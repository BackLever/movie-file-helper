// reference: https://github.com/divijbindlish/parse-torrent-name

const patterns = [
    / NonDRM | DRM /,
    / DTR /,
    /xvid|[hxXH]?[. ]?26[45]/,
    /([sS]([0-9]{1,2}))/,
    /(\d?[exEX]([0-9]{2})(?:[^0-9]|$))/,
    /([\[\(]?((?:19[0-9]|20[01])[0-9])[\]\)]?)/,
    /([0-9]{3,4}p)/,
    /PPV|[HP]DTV|(HD)?CAM|B[DRr]Rip|(?:HD ?)?TS/,
    /(?:PPV )?WEB[- ]?DL(?: DVDRip)?|HDR[iI][pP]|DVDRip|DVDRIP|WEB  /,
    /CamRip|W[EB]B[rR]ip|BluRay|DvDScr|hdtv|telesync|TELESYNC/,
    /MP3|DD5[. ]?1|Dual[\- ]Audio|LiNE|DTS/,
    /HEVC/,
    / UpScaled /,
    / Rip /,
    / DesiSCR /,
    /AAC/,
    / LC /,
    /AC3/,
    /(- ?([^-]+(?:-={[^-]+-?$)?))$'/,
    /R[0-9]/,
    /(EXTENDED(:?[. ]?CUT)?)|(Extended(:?[. ]?Cut)?)/,
    / HC /,
    /PROPER/,
    /REPACK/,
    /(MKV|AVI|MP4)/,
    / WS /,
    /^(\[ ?([^\]]+?) ?\])/,
    /(rus[ .]?eng|ita[ .]?eng)/,
    /(?:Half )?SBS/,
    /UNRATED/,
    /(\d+(?:\.\d+)?(?:GB|MB))/,
    / 3D /,
    /W4F/,
    / READNFO/,
    / iNTERNAL/,
    / Hindi /,
    /  Mafiaking/,
    /  \d ?\d  /,
    / X[vV]iD/,
    /  \d  /
]

const releDelimeter = ["-", ".", " "];
const bracketOpener = ["(", "[", "{"];
const bracketCloser = [")", "]", "}"];

function fileExt(filename) {
    var lastDot = filename.lastIndexOf(".");
    var fileExt = filename.slice(lastDot).toLowerCase;

    return fileExt;
}

function parse(name) {
    var len = name.length;
    var ext = fileExt(name);
    var output = name;
    var start, end;

    if (ext.length < 5) {
        output = output.slice(-ext.length, output.length);
    }

    // delete release source
    for (const del of releDelimeter) {
        if (output.lastIndexOf(del) > (len/2)) {
            start = output.lastIndexOf(del);
            output = output.slice(0, start);
            output += "    ";
            break;
        }
    }

    // delete some char and patterns
    output = output.replace(/[-._]/g, " ");
    for (const item of patterns) {
        if (item.exec(output)) {
            output = output.replace(item.exec(output)[0], "");
        }
    }

    // to lower alphabet
    output = output.toLowerCase();

    // delete bracket
    for (var i = 0; i < 3; i++) {
        if (output.indexOf(bracketOpener[i]) != -1) {
            start = output.indexOf(bracketOpener[i]);
            end = output.indexOf(bracketCloser[i]);
            if (end != -1) {
                output = output.slice(0, start) + output.slice(end + 1, len - 1);
            }
            else {
                output = output.slice(0, start);
            }
        }
    }

    //delete continuous spaces
    output = output.replace(/ +/g, " ");

    // delete space at frist and last
    if (output[0] == " ") {
        output = output.slice(1, output.length);
    }
    if (output[output.length-1] == " ") {
        output = output.slice(0, output.length-1);
    }

    return output;
}