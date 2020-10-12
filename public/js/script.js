var results;
function loadSource(e) {
    readFileContent(document.getElementById("source" + e.toString()).files[0], e)
}
function runProcv() {
    const e = window.results;
    let t = []
      , n = document.getElementById("key-selection")
      , o = n.options[n.selectedIndex].value;
    e[0].data.forEach(function(n) {
        let c = n;
        match = e[1].data.filter(e=>e[o] === n[o]),
        match.length > 0 && Object.assign(c, match[0]),
        t.push(c)
    });
    let c = "";
    Object.keys(t[0]).forEach(function(e) {
        c += e.trim() + ","
    }),
    c += "\n",
    t.forEach(function(e) {
        Object.values(e).forEach(function(e) {
            c += e.trim() + ","
        }),
        c += "\n"
    }),
    generateDownloadLink(c)
}
function readFileContent(e, t) {
    const n = new FileReader;
    n.onload = function() {
        n.result.split("\n").forEach(function(t, n) {
            let o = {};
            t.split(",").forEach(function(t, c) {
                0 == n ? (void 0 === e.headers && (e.headers = []),
                e.headers.push(t)) : o[e.headers[c]] = t
            }),
            n > 0 && (void 0 === e.data && (e.data = []),
            e.data.push(o))
        }),
        document.getElementById("source" + t.toString() + "-content").innerText = n.result,
        1 == t && fillKeySelectionArea(e.headers),
        void 0 === window.results && (window.results = []),
        window.results.push(e)
    }
    ,
    n.readAsText(e)
}
function fillKeySelectionArea(e) {
    const t = document.getElementById("key-selection-area")
      , n = document.getElementById("key-selection")
      , o = document.createElement("select");
    o.id = "key-selection",
    o.classList.add("custom-select"),
    t.replaceChild(o, n);
    for (let t = 0; t < e.length; t++) {
        var c = document.createElement("option");
        c.value = e[t],
        c.text = e[t],
        o.appendChild(c)
    }
}
function generateDownloadLink(e) {
    var t = document.getElementById("download");
    t.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(e)),
    t.setAttribute("download", "resultado.csv"),
    t.click()
}
