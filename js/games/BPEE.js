games.BPEE = {
    name: "Pokemon Emerald",
    modules: [
        {
            name: "Reusable TMs",
            build: function(container) {
                var b = document.createElement("button");
                b.addEventListener("click", function() {
                    writeBytes("001B6EE0", ["90"]);
                    alert("Done!");
                });
                b.innerText = "Make TMs Reusable";
                container.appendChild(b);

                var b2 = document.createElement("button");
                b2.addEventListener("click", function() {
                    writeBytes("001B6EE0", ["A9"]);
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
                    applyPatch("patches/BPEE/PSS.ips");
                });
                b.innerText = "Apply Split";
                container.appendChild(b);

                var b2 = document.createElement("button");
                b2.addEventListener("click", function() {
                    applyPatch("patches/BPEE/PSS-revert.ips");
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
                    writeBytes("11A1E8", ["00"]);
                    alert("Done!");
                });
                b.innerText = "Allow Running Indoors";
                container.appendChild(b);

                var b2 = document.createElement("button");
                b2.addEventListener("click", function() {
                    writeBytes("11A1E8", ["08"]);
                    alert("Done!");
                });
                b2.innerText = "Only Run Outdoors";
                container.appendChild(b2);
            }
        }
    ]
};