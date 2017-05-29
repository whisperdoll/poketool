games.BPRE = {
    name: "Pokemon Fire Red",
    modules: [
        {
            name: "Reusable TMs",
            build: function(container) {
                var b = document.createElement("button");
                b.addEventListener("click", function() {
                    writeBytes("00124EA0", ["90"]);
                    writeBytes("00124F6C", ["90"]);
                    writeBytes("00125C74", ["90"]);
                    alert("Done!");
                });
                b.innerText = "Make TMs Reusable";
                container.appendChild(b);

                var b2 = document.createElement("button");
                b2.addEventListener("click", function() {
                    writeBytes("00124EA0", ["A9"]);
                    writeBytes("00124F6C", ["A9"]);
                    writeBytes("00125C74", ["A9"]);
                    alert("Done!");
                });
                b2.innerText = "Make TMs One-Use Only";
                container.appendChild(b2);
            }
        },
        {
            name: "Physical/Special Split",
            build: function(container) {
                var b = document.createElement("button");
                b.addEventListener("click", function() {
                    applyPatch("patches/BPRE/PSS.ips");
                });
                b.innerText = "Apply Split";
                container.appendChild(b);

                var b2 = document.createElement("button");
                b2.addEventListener("click", function() {
                    applyPatch("patches/BPRE/PSS-revert.ips");
                });
                b2.innerText = "Revert Split";
                container.appendChild(b2);
            }
        },
        {
            name: "Indoor Running Shoes",
            build: function(container) {
                var b = document.createElement("button");
                b.addEventListener("click", function() {
                    writeBytes("BD494", ["00"]);
                    alert("Done!");
                });
                b.innerText = "Allow Running Indoors";
                container.appendChild(b);

                var b2 = document.createElement("button");
                b2.addEventListener("click", function() {
                    writeBytes("BD494", ["08"]);
                    alert("Done!");
                });
                b2.innerText = "Only Run Outdoors";
                container.appendChild(b2);
            }
        }
    ]
};