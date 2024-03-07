async function loadGraph() {
    const res = await fetch("data.json");
    let data = await res.json();

    let maxHeight = -1;
    let highest = "mon";
    for (let i = 0; i < data.length; i++) {
        const day = data[i];

        const dayHTML = document.getElementById(day.day);
        const height = day.amount * 2; 
        dayHTML.style.height = height + "px";

        highest = height > maxHeight ? day.day : highest;
        maxHeight = height > maxHeight ? height : maxHeight; 

        const hoverId = day.day + "Hover";
        const hoverHTML = document.getElementById(hoverId);
        hoverHTML.innerHTML = "$" + day.amount; 

        elementSize = 60; 
        hoverHTML.style.marginBottom = height + elementSize + "px";

        dayHTML.addEventListener("mouseover", () => showHover(hoverId));
        dayHTML.addEventListener("mouseout", () => removeHover(hoverId));
    }

    const graph = document.getElementById("graph");
    graph.style.height = (maxHeight * 1.5) + "px";
    document.getElementById(highest).style["background-color"] = "var(--Cyan)";
}

function showHover(id) {

    const hoverHTML = document.getElementById(id);

    if (hoverHTML.classList.contains("hoverHidden")) {

        hoverHTML.classList.add("hoverShown");
        hoverHTML.classList.remove("hoverHidden");
    }
}

function removeHover(id) {

    const hoverHTML = document.getElementById(id);

    if (hoverHTML.classList.contains("hoverShown")) {

        hoverHTML.classList.add("hoverHidden");
        hoverHTML.classList.remove("hoverShown");
    }
}

loadGraph()