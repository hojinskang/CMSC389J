"use strict";

window.onsubmit = validate;

function validate() {
  var message = "";

  // verify phone number validity (#7)
  var phone1st = document.getElementById("phone1").value;
  var phone2nd = document.getElementById("phone2").value;
  var phone3rd = document.getElementById("phone3").value;

  if (isNaN(phone1st) || isNaN(phone2nd) || isNaN(phone3rd)) {
    message += "Invalid phone number\n";
  }

  //-------------------------------------------------------

  // verify conditions selected (#11)
  var cond1st = document.getElementById("cond1");
  var cond2nd = document.getElementById("cond2");
  var cond3rd = document.getElementById("cond3");
  var cond4th = document.getElementById("cond4");
  var condNone = document.getElementById("cond0");

  if (!cond1st.checked && !cond2nd.checked && !cond3rd.checked && !cond4th.checked && !condNone.checked) {
    message += "No conditions selected\n";
  }

  if (condNone.checked && (cond1st.checked || cond2nd.checked || cond3rd.checked || cond4th.checked)) {
    message += "Invalid conditions selection\n";
  }

  //-------------------------------------------------------

  // verfiy at least one time period selected (#12)
  var flag = 0;
  var timePeriod = document.getElementsByName("period");
  for (var idx = 0; idx < timePeriod.length; idx++) {
    if (timePeriod[idx].checked) {
      flag = 1;
    }
  }
  if (flag == 0) {
    message += "No time period selected\n";
  }

  //-------------------------------------------------------

  // verfiy valid study id (#14)
  var study1st = document.getElementById("studyId1").value;
  var study2nd = document.getElementById("studyId2").value;

  if (study1st.charAt(0) != "A" || isNaN(study1st.substring(1)) || study2nd.charAt(0) != "B" || isNaN(study2nd.substring(1))) {
    message += "Invalid study id\n";
  }

  //-------------------------------------------------------
  
  if (message.length > 0) {
    alert(message);
    return false;
  } else {
    // all inputs valid
    window.confirm('Do you want to submit the form data?');
    return true;
  }
}
