games.AXPE = {
    name: "Pokemon Sapphire",
    modules: [
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