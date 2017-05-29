games.AXVE = {
    name: "Pokemon Ruby",
    modules: [
        {
            name: "Reusable TMs",
            build: function(container) {
                var b = document.createElement("button");
                b.addEventListener("click", function() {
                    writeBytes("0006F210", ["90"]);
                    alert("Done!");
                });
                b.innerText = "Make TMs Reusable";
                container.appendChild(b);

                var b2 = document.createElement("button");
                b2.addEventListener("click", function() {
                    writeBytes("0006F210", ["A9"]);
                    alert("Done!");
                });
                b2.innerText = "Make TMs One-Use Only";
                container.appendChild(b2);
            }
        },
        {
            name: "Indoor Running Shoes",
            build: function(container) {
                var b = document.createElement("button");
                b.addEventListener("click", function() {
                    writeBytes("E5E00", ["00"]);
                    alert("Done!");
                });
                b.innerText = "Allow Running Indoors";
                container.appendChild(b);

                var b2 = document.createElement("button");
                b2.addEventListener("click", function() {
                    writeBytes("E5E00", ["08"]);
                    alert("Done!");
                });
                b2.innerText = "Only Run Outdoors";
                container.appendChild(b2);
            }
        }
    ]
};