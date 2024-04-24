// all legend list elements
var legendList = document.querySelectorAll(".legend li");

// associative array of
//   <legend classname> : <element>
legendElems = {};
for (var i = 0; i < legendList.length; i++) {
    var e = legendList[i];
    // first class identifies type of element (e.g. alkali-metal, metalloid ...)
    var c = e.classList[0];
    legendElems[c] = e;
}

var currentLegend = null;  // nothing hightlighted by default

// highLight a legend element given the associated class name
// or remove highlight if given null
function highlightLegend(newLegend) {
    if (newLegend === currentLegend)
        return;  // already highlighted - nothing to do

    // remove from currently highlighted element
    if (currentLegend && 'classList' in legendElems[currentLegend])
        legendElems[currentLegend].classList.remove("legend-highlight");
    // highlight selected element
    if (newLegend && 'classList' in legendElems[newLegend])
        legendElems[newLegend].classList.add("legend-highlight");
    currentLegend = newLegend;  // selected is now current
}

// all divs representing each periodic element
var pElements = document.getElementById("periodic-table").getElementsByClassName("element");

// call the hightLightLegend() function for periodic element mouseover events.
for (var i = 0; i < pElements.length; i++) {
    pe = pElements[i];
    if (!pe)
        continue;
    // claslist contains somthing like:
    //  0          1            2 (this is what we want)
    // ['element', 'element-1', 'diatomic-nonmetal', 'gas', value: 'element element-1 diatomic-nonmetal gas']
    pe.onmouseenter = function (ev) {
        // pass the legend class name if found, or null (for unselected legend)
        var hasLegend = 'classList' in ev.target && ev.target.classList.length >= 3;
        legendClass = hasLegend ? ev.target.classList[2] : null;
        highlightLegend(legendClass);
    };

    pe.onmouseleave = function (ev) {
        // unselect legend when mouse leave element
        highlightLegend(null);
    };
}