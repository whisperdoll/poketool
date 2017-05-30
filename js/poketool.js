var gameBytes;
var u8reader;
var froffsets = ["124EA0","124F6C"];
var frbyte = "90";

var games = {};

function init() {
    document.getElementById("file").addEventListener("change", readFile, false);
    document.getElementById("ipsfile").addEventListener("change", readIPS, false);
    document.getElementById("save").addEventListener("click", saveFile);
}

function getGameCode() {
    var offset = parseInt("ac", 16);
    var len = 4;
    var b = readBytes(offset, len);
    var string = new TextDecoder("utf-8").decode(b);
    return string;
}

function readBytes(offset, len, u8) {
    if (u8 === undefined) u8 = u8reader;
    if (len === undefined) len = 1;
    if (typeof(offset) === "string") offset = parseInt(offset, 16);
    return u8.slice(offset, offset + len);
}

function writeBytes(offset, bytes, u8) {
    if (u8 === undefined) u8 = u8reader;
    if (offset === undefined) offset = 0;
    if (typeof(offset) === "string") offset = parseInt(offset, 16);

    bytes = bytes.map(function(byte) {
        if (typeof(byte) === "string") byte = parseInt(byte, 16);
        return byte;
    });

    u8.set(bytes, offset);
}

function applyPatch(url, cb) {
    var r = new XMLHttpRequest();
    r.responseType = "arraybuffer";
    r.addEventListener("load", function() {
        var data = this.response;

        if (applyPatchData(data)) {
            alert("Done!");
        } else {
            alert("Invalid IPS file.");
        }

    });
    r.open("GET", url);
    r.send();
}

function applyPatchData(data) {
    var u8 = new Uint8Array(data);
    //console.log(readBytes(5,3,u8));
    if ((new TextDecoder("utf-8")).decode(readBytes(0, 5, u8)) === "PATCH") {
        // apply it
        // format: 3 bytes for where, 2 bytes for len, then len bytes
        var running = 5;
        var offset = readBytes(running, 3, u8);
        while ((new TextDecoder("utf-8")).decode(offset) !== "EOF") {
            running += 3;
            var len = numberFromBytes(readBytes(running, 2, u8));
            //console.log(readBytes(running, 2, u8));
            offset = numberFromBytes(offset);
            running += 2;

            if (len === 0) {
                var times = numberFromBytes(readBytes(running, 2, u8));
                running += 2;
                var byte = readBytes(running, 1, u8);
                running++;

                for (var i = 0; i < times; i++) {
                    writeBytes(offset + i, byte);
                }
            } else {
                writeBytes(offset, readBytes(running, len, u8));
                running += len;
            }

            offset = readBytes(running, 3, u8);
            //console.log(running);
        }

        return true;
    } else {
        console.log((new TextDecoder("utf-8")).decode(readBytes(0, 5, u8)));
        return false;
    }
}

function numberFromBytes(u8) {
    var ret = 0;
    for (var i = 0; i < u8.length; i++) {
        ret |= u8[i] << (8 << (u8.length - i - 2));
    }

    return ret;
}

function readFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }

    var reader = new FileReader();
    reader.onload = function(_e) {
        document.getElementById("container-modules").innerHTML = "";
        //console.log(_e);
        gameBytes = this.result;
        u8reader = new Uint8Array(gameBytes);
        var gc = getGameCode();

        if (games.hasOwnProperty(gc)) {
            document.getElementById("name").innerText = games[gc].name;

            for (var i = 0; i < games[gc].modules.length; i++) {
                let container = document.createElement("div");
                container.className = "module";
                let t = document.createElement("div");
                t.innerText = games[gc].modules[i].name;
                t.className = "module-name";
                container.appendChild(t);
                games[gc].modules[i].build(container);
                document.getElementById("container-modules").appendChild(container);
            }

            document.getElementById("ipscontainer").style.display = "inline-block";
            document.getElementById("save").style.display = "inline-block";
        } else {
            alert("Game not supported! " + gc);
            document.getElementById("name").innerText = "^^^ Select a file ^^^";
        }
    }

    reader.readAsArrayBuffer(file);
    //e.target.files = [];
}

function readIPS(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }

    var reader = new FileReader();
    reader.onload = function(_e) {
        var data = this.result;
        if (applyPatchData(data)) {
            alert("Done!");
        } else {
            alert("Invalid IPS file.");
        }
    }

    reader.readAsArrayBuffer(file);
}

function saveFile() {
    var blob = new Blob([gameBytes], {type: "application/x-gameboy-rom"});
    saveAs(blob, getGameCode() + ".gba");
}


window.addEventListener("load", init);