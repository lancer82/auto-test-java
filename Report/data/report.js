let pass = 0, fail = 0, skip = 0, xpathError = 0, assertError = 0, browserError = 0, timeOutError = 0, onclickError = 0,
    otherError = 0, methods = [], seconds = [], totaltime = 0, from = 0, end = 49, page = 1,
    pageniationText = "page " + page + " of " + Math.ceil(data.length / 50);

function removeNull(e) {
    return null == e ? "" : e;
}

function addTableRowsFromJSON() {
    let e, t, a = document.getElementById("BodyRows"), o = a.parentNode;
    for (const r in data) {
        e = a.insertRow(r);
        const n = removeNull(data[r]._status);
        for ("SUCCESS" === n ? (e.className = "SUCCESS", pass += 1) : "FAILED" === n ? (e.className = "FAILED", fail += 1, failedData(removeNull(data[r]._exception))) : (e.className = "SKIPPED", skip += 1), j = 0; j < 6; j++) {
            t = e.insertCell(e.cells.length);
            let l, i = document.createElement("div");
            switch (j) {
                case 0:
                    l = removeNull(data[r]._count);
                    break;
                case 1:
                    l = removeNull(data[r]._class);
                    break;
                case 2:
                    l = removeNull(data[r]._mothod), methods.push(l);
                    break;
                case 3:
                    var d = removeNull(data[r]._time);
                    l = toSecond(d).toFixed(2), seconds.push(toSecond(d));
                    break;
                case 4:
                    l = removeNull(data[r]._status);
                    break;
                case 5:
                    l = removeNull(data[r]._exception);
                    break;
            }
            i.innerHTML = l, 1 != j && 2 != j || (i.className = "class"), 3 != j && 4 != j || (i.className = "result"), t.appendChild(i)
            if ("FAILED" == n && j == 5) {
                var newTH = document.createElement('div');
                newTH.className = "screenShot-link";
                newTH.id = data[r]._count;
                newTH.innerHTML = 'Check Screen Shot';
                i.appendChild(newTH);
            }
        }
    }
    o.appendChild(a);
    var lscreen = document.getElementsByClassName("screenShot-link");
    for (x = 0; x < lscreen.length; x++) {
        lscreen[x].onclick = function (e) {
            loadScreenshot(e)
        };
    }
}

function status() {
    let e = {
        type: "pie", data: {
            datasets: [{
                data: [xpathError, assertError, browserError, timeOutError, onclickError, otherError],
                backgroundColor: ["#f48642", "#6c8e5e", "#aeedf9", "#41c1f4", "#b6aef9", "#f4df41"],
                label: "Dataset 1"
            }],
            labels: ["Unable to find element", "Assert Fail", "Unable to get browser", "Time Out Issue", "Unable to Click", "Others"]
        }, options: {
            pieceLabel: {
                render: "percentage",
                fontColor: ["white", "white", "white"],
                precision: 1,
                fontSize: 11,
                fontStyle: "bold",
                overlap: !0
            }, title: {
                display: !1, text: "Type of Exeptions"
            }, legend: {
                labels: {
                    boxWidth: 10, padding: 5, fontSize: 12
                }
            }
        }
    }, t = {
        type: "pie", data: {
            datasets: [{
                data: [pass, fail, skip], backgroundColor: ["#82b74b", "#f7786b", "#ffcc5c"], label: "Dataset 1"
            }], labels: ["PASSED", "FAILED", "SKIPPED"]
        }, options: {
            pieceLabel: {
                render: "percentage", fontColor: ["white"], precision: 1, fontSize: 11, fontStyle: "bold", overlap: !0
            }, title: {
                display: !1, text: "Total Test Result"
            }, legend: {
                labels: {
                    boxWidth: 25, padding: 7, fontSize: 12
                }
            }
        }
    }, a = document.getElementById("test-status").getContext("2d");
    window.myPie = new Chart(a, t);
    var o = document.getElementById("fail-result").getContext("2d");
    window.myPie = new Chart(o, e)
}

function StatusTable(qualifiedName, value) {
    let e = document.getElementById("statusTable");
    let t = e.insertRow(1);
    t.setAttribute("style", "background-color: #8cf2a2");
    let a = t.insertCell(0);
    let o = t.insertCell(1);
    let passCheckBox = document.createElement("input");
    passCheckBox.setAttribute("type", "checkbox");
    passCheckBox.checked = true;
    passCheckBox.setAttribute("onclick", "toggle('SUCCESS')");
    let passText = document.createTextNode("Passed");
    a.appendChild(passCheckBox);
    a.appendChild(passText);
    o.innerHTML = pass;
    let r = e.insertRow(2);
    r.setAttribute("style", "background-color: #f7786b");
    let n = r.insertCell(0), l = r.insertCell(1);
    let failedCheckBox = document.createElement("input");
    failedCheckBox.setAttribute("type", "checkbox");
    failedCheckBox.checked = true;
    failedCheckBox.setAttribute("onclick", "toggle('FAILED')");
    let failedText = document.createTextNode("Failed");
    n.appendChild(failedCheckBox);
    n.appendChild(failedText);
    l.innerHTML = fail;
    let i = e.insertRow(3);
    i.setAttribute("style", "background-color: #f9ef7f");
    let d = i.insertCell(0);
    let s = i.insertCell(1);
    let skippedCheckBox = document.createElement("input");
    skippedCheckBox.setAttribute("type", "checkbox");
    skippedCheckBox.checked = true;
    skippedCheckBox.setAttribute("onclick", "toggle('SKIPPED')");
    let skippedText = document.createTextNode("Skipped");
    d.appendChild(skippedCheckBox);
    d.appendChild(skippedText);
    s.innerHTML = skip;
    let c = e.insertRow(4);
    c.setAttribute("style", "background-color: #87cefa");
    let m = c.insertCell(0), u = c.insertCell(1);
    let totalCheckBox = document.createElement("input");
    totalCheckBox.setAttribute("type", "checkbox");
    totalCheckBox.checked = true;
    totalCheckBox.disabled = true;
    let totalText = document.createTextNode("Total");
    m.appendChild(totalCheckBox);
    m.appendChild(totalText);
    u.innerHTML = skip + pass + fail;
    let p = parseMillisecondsIntoReadableTime(totaltime);
    document.getElementById("time").innerHTML = p
}

function toSecond(e) {
    return totaltime += parseInt(e), parseInt(e) / 1e3
}

function parseMillisecondsIntoReadableTime(e) {
    var t = e / 36e5, a = Math.floor(t), o = a > 9 ? a : "0" + a, r = 60 * (t - a), n = Math.floor(r),
        l = n > 9 ? n : "0" + n, i = 60 * (r - n), d = Math.floor(i);
    return o + ":" + l + ":" + (d > 9 ? d : "0" + d)
}

function failedData(e) {
    e.indexOf("Unable to find element with") > -1 || e.indexOf("Cannot locate element with text") > -1 ? xpathError += 1 : e.indexOf("expected [") > -1 && e.indexOf("but found [") > -1 ? assertError += 1 : e.indexOf("Unable to get browser") > -1 ? browserError += 1 : e.indexOf("Timed out after") > -1 ? timeOutError += 1 : e.indexOf("Cannot click on element") > -1 ? onclickError += 1 : otherError += 1
}

function lineGraph(e, t) {
    var a = document.getElementById("canHolder"), o = document.getElementById("myChart");
    o.parentElement.removeChild(o);
    var r = document.createElement("canvas");
    r.id = "myChart", a.appendChild(r);
    var n = document.getElementById("myChart"), l = {
        labels: methods.slice(e, t), datasets: [{
            label: "Execution Time (S) / Test",
            fill: !0,
            lineTension: .1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "#42a1f4",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 5,
            data: seconds.slice(e, t),
            borderWidth: 1
        }]
    };
    Chart.Line(n, {
        data: l, options: {
            showLines: !0, scales: {
                xAxes: [{
                    ticks: {
                        display: !1
                    }
                }], yAxes: [{
                    ticks: {
                        display: !0
                    }
                }]
            }
        }
    })
}

function pagintion(e) {
    "next" === e ? (from = 50 * page, end = 50 * (page + 1) - 1, document.getElementById("back").disabled = !1, page++) : (end = 50 * --page - 1, from = 50 * (page - 1), document.getElementById("front").disabled = !1), end >= data.length && (end = data.length, from = 50 * (page - 1), document.getElementById("front").disabled = !0), from <= 0 && (from = 0, end = 49, document.getElementById("back").disabled = !0), lineGraph(from, end), pageniationText = "page " + page + " of " + Math.ceil(methods.length / 50), document.getElementById("size").value = pageniationText
}

function autoRefresh() {
    var e = document.getElementById("myCheck");
    document.getElementById("text");
    1 == e.checked ? timeout = setTimeout("location.reload(true);", 5e3) : clearTimeout(timeout);
}

window.addEventListener("load", function () {
    addTableRowsFromJSON(), status(), lineGraph(0, 49), document.getElementById("size").value = pageniationText, data.length < 51 && (document.getElementById("front").disabled = !0), autoRefresh()
});

function search() {
    var e, r;
    e = document.getElementById("myInput").value.toUpperCase();
    for (var l = 1, n = (r = document.getElementById("MainTable")).rows.length;
         l < n - 1;
         l++) {
        var s = !1;
        if (e) {
            for (var t = 0, a = r.rows[l].cells.length;
                 t < a;
                 t++) if (r.rows[l].cells[t].children[0].innerHTML.toUpperCase().indexOf(e) > -1) {
                s = !0;
                break;
            }
            r.rows[l].style.display = s ? "" : "none";
        } else r.rows[l].style.display = "";
    }
}

function toggle(className) {
    var x = document.getElementsByClassName(className);
    for (i = 0; i < x.length; i++) {
        if (x[i].style.display === "none") {
            x[i].style.display = "";
        } else {
            x[i].style.display = "none";
        }
    }
}

function loadScreenshot(e) {
    var id = e.target.id;
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = "screen_shot/" + id + ".png";
    var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
}
