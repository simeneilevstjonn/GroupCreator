// Global variables
let names;
let totgrp = 1;
let totobj;
let objgrp;

// String empty code
function isEmpty(str) {
    return str.replace(/^\s+|\s+$/gm,'').length == 0;
}

// Pageination code
let currentpage = 0;
function Next() {
    nextpage = currentpage + 1;

    // Page specific actions
    let psar = PageSpecificActions(nextpage);

    // Display previous-button
    document.getElementById("prev").style.display = "initial";

    // Go to next page
    document.getElementById(`page-${currentpage}`).style.display = "none";
    document.getElementById(`page-${nextpage}`).style.display = "block";

    // Increment page counter
    currentpage++;

    if (psar == 1) {
        return Next();
    }
}

function Previous() {
    lastpage = currentpage - 1;

    // Page specific actions
    let psar2 = PageSpecificActions(lastpage);

    // Display next-button
    document.getElementById("next").style.display = "initial";

    // Go to last page
    document.getElementById(`page-${currentpage}`).style.display = "none";
    document.getElementById(`page-${lastpage}`).style.display = "block";

    // Decrement page counter
    currentpage--;

    if (psar2 == 1) {
        return Previous();
    }
}

// Page specific actions
function PageSpecificActions(targetPage) {
    switch (targetPage) {
        case 0:
            // Page specific code for page 0

            // Check if textarea is still invalid
            let tempnames1 = document.getElementById("nameInput").value.split('\n');
            names = new Array();
            // Filter out whitespace lines
            tempnames1.forEach(function(x) {
                if (!isEmpty(x)) {
                    names.push(x);
                }
            });

            // Check if names has members
            if (names.length != 0) {
                document.getElementById("nameInput").className = "form-control";
            }

            // Hide previous button
            document.getElementById("prev").style.display = "none";

            // Change next button text
            document.getElementById("next").innerHTML = "Next <i class=\"fas fa-arrow-right\"></i>";
            break;
        case 1:
            // Page specific code for page 1
            
            // Assign to names array
            let tempnames = document.getElementById("nameInput").value.split('\n');
            names = new Array();
            // Filter out whitespace lines
            tempnames.forEach(function(x) {
                if (!isEmpty(x)) {
                    names.push(x);
                }
            });

            // Check if names has members
            if (names.length == 0) {
                document.getElementById("nameInput").className = "form-control is-invalid";
                throw "No names supplied";
            }

            // Set numbers

            // Total objects
            document.getElementById("totobj").innerHTML = names.length;
            totobj = names.length;
            objgrp = names.length;

            // objects per group
            document.getElementById("objgrp").innerHTML = names.length;


            // Set slider values

            // Total groups
            document.getElementById("totgrpipt").max = names.length;

            // Objects per group
            document.getElementById("objgrpipt").max = names.length;
            document.getElementById("objgrpipt").value = names.length;


            // Change next button text
            document.getElementById("next").innerHTML = "Generate <i class=\"fas fa-arrow-right\"></i>";

            break;
        case 2:
            // Page specific code for page 2

            // Hide next button
            document.getElementById("next").style.display = "none";
            break;
    }
    return 0;
}

// Group slider functions
function upDateSliderValue() {
    // Check which slider has changed

    // Check if total groups has changed
    if (document.getElementById("totgrpipt").value != totgrp) {
        // Assign total groups
        totgrp = document.getElementById("totgrpipt").value;
        document.getElementById("totgrp").innerHTML = totgrp;

        // Calculate objects per group
        objgrp = Math.ceil(totobj / totgrp);

        // Assign objgrp value
        document.getElementById("objgrp").innerHTML = objgrp;
        document.getElementById("objgrpipt").value = objgrp;
    }
    // Check if objects per group has changed
    else if (document.getElementById("objgrpipt").value != objgrp) {
        // Assign objects per group
        objgrp = document.getElementById("objgrpipt").value;
        document.getElementById("objgrp").innerHTML = objgrp;

        // Calculate total groups
        totgrp = Math.ceil(totobj / objgrp);

        // Assign totgrp value
        document.getElementById("totgrp").innerHTML = totgrp;
        document.getElementById("totgrpipt").value = totgrp;
    }
}
