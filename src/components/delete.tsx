// fetch report
function fetchReportData() {
  // Get Current Date for Checking of Absent Days that date is less than today date than set color red
  var now = new Date(Date.now());
  if (
    FridayDates.length == 0 ||
    PublicHolidays.length == 0 ||
    AttendanceStatusDetail.length == 0
  )
    $("#ddlType").change();
  var filter = $("#ddlType option:selected").val();
  if (filter == 1) {
    Month = $("#ddlMonth").find("option:selected").val();
    Year = $("#ddlYear").find("option:selected").val();
  } else if (filter == 2) {
    Month = PersianDateToEn($(".todate").val());
    Year = PersianDateToEn($(".fromdate").val());
    // ------------- split date remove / and add - to date -------------
    Month = Month.split("/").join("-");
    Year = Year.split("/").join("-");
    ///------------------------------------------------------------
  }
  // declare needed variables
  var html = "",
    divReport = $("#div-report"),
    perPage = 5,
    perPageCounter = 0,
    counter = 0,
    HeaderColumns = [],
    itemCounter = 0;

  // call ajax function for fetch data from database
  getAjax(
    "/Api/GeneralReport/rpt_EmployeeAttendanceReport/" +
      Year +
      "/" +
      Month +
      "/" +
      filter,
    null,
    "get",
    function (data) {
      if (data.type == "success") {
        for (var item in data.data[0]) {
          HeaderColumns.push(item);
        }

        //fetch report style
        html += $("#reportStyle").html();

        //table wrapper div
        html += `<div class="tg-wrap">`;

        // load report header
        html += loadReportHeader(HeaderColumns);
        // fetch all information of employee with attendance
        for (var i = 0; i < data.data.length; i++) {
          var currentObject = data.data[i];

          // if page counter equal to per page counter then close div and break page and start new row
          if (perPageCounter == perPage) {
            //html += `<tr>`;
            //html += `<td colspan='40' style='border:none!important;text-align:right!important;'>`;
            //html += `<span style='height:20px;width:20px;color:#006b0d;'>(P) (حاضر)</span> &nbsp&nbsp&nbsp
            // <span style='height:20px;width:20px;color:#f3a4a4;'>(AB) غیرحاضر</span>&nbsp&nbsp&nbsp
            // <span style='height:20px;width:20px;color:#00486b;'>(HL) نیم روز</span>&nbsp&nbsp&nbsp
            // <span style='height:20px;width:20px;color:#5f6360;'>(AL) رخصت</span>&nbsp&nbsp&nbsp
            // <span style='height:20px;width:20px;color:#5f6360;'>(SL) رخصت مریضی</span>&nbsp&nbsp&nbsp
            // <span style='height:20px;width:20px;color:#5f6360;'>(UL) رخصت بدون پرداخت</span>&nbsp&nbsp&nbsp
            // <span style='height:20px;width:20px;color:#77a58b;'>(PH) رخصتی عمومی</span>&nbsp&nbsp&nbsp
            // <span style='height:20px;width:20px;color:#c1c1c1;'>جمعه</span>`;
            //html += `</td>`;
            //html += `</tr>`;

            //close table & div then break page & start new page
            html +=
              "</table></div><div style='page-break-before:always;' ></div>";

            // start table wrapper div
            html += "<div class='tg-wrap'>";
            //load report header
            html += loadReportHeader(HeaderColumns);
            //reset page counter
            perPageCounter = 0;
          }

          html += `<tr >`;
          html += `<td class="tg-0pky">` + ++counter + `</td>`;
          var contractID = "";
          var attendanceStatus = "";

          $.each(currentObject, function (i, item) {
            var rotateClass = "";
            if (i == "contractID") contractID = item;

            if (
              i != "name" &&
              i != "fatherName" &&
              i != "employeeCode" &&
              i != "contractID"
            ) {
              var absDate = i;
              var filteredAttendance = AttendanceStatusDetail.filter(
                ({ ContractID, Date }) =>
                  ContractID === contractID && Date === i
              );

              if (typeof filteredAttendance[0] != "undefined")
                attendanceStatus = filteredAttendance[0].LeaveStatus;
              else attendanceStatus = "";
            }

            if (i != "contractID") {
              if (i == "name" || i == "fatherName" || i == "employeeCode")
                rotateClass = "";
              else rotateClass = "rotateT2";

              if (item == "" || item == null) {
                // alert(attendanceStatus);
                if (typeof FridayDates != "undefined") {
                  // alert(attendanceStatus);
                  if (FridayDates.indexOf(i) > -1)
                    html +=
                      `<td class="tg-0pky ` +
                      rotateClass +
                      `" style="background-color:` +
                      fridayColor +
                      `!important;"></td>`;
                  else if (PublicHolidays.indexOf(i) > -1)
                    html +=
                      `<td class="tg-0pky ` +
                      rotateClass +
                      `" style="background-color:` +
                      publicHolidayColor +
                      `!important;"></td>`;
                  else if (
                    attendanceStatus == "AL" ||
                    attendanceStatus == "SL" ||
                    attendanceStatus == "ML" ||
                    attendanceStatus == "UL"
                  )
                    html +=
                      `<td class="tg-0pky ` +
                      rotateClass +
                      `" >` +
                      attendanceStatus +
                      `</td>`;
                  else if (convertToFaDate(absDate) <= convertToFaDate(now))
                    html +=
                      `<td class="tg-0pky ` +
                      rotateClass +
                      `" style="background:` +
                      absnetColor +
                      `!important">AB</td>`;
                  else html += `<td class="tg-0pky ` + rotateClass + ` "></td>`;
                } else html += `<td class="tg-0pky ` + rotateClass + `"></td>`;
              } else {
                if (FridayDates.indexOf(i) > -1)
                  html +=
                    `<td class="tg-0pky ` +
                    rotateClass +
                    `" style="background:` +
                    fridayColor +
                    `!important"><div>` +
                    item +
                    `</div></td>`;
                else if (PublicHolidays.indexOf(i) > -1)
                  html +=
                    `<td class="tg-0pky ` +
                    rotateClass +
                    `" style="background:` +
                    publicHolidayColor +
                    `!important"><div>` +
                    item +
                    `</div></td>`;
                else if (attendanceStatus == "HL") {
                  html +=
                    `<td class="tg-0pky ` +
                    rotateClass +
                    `" ><div>` +
                    item +
                    "-" +
                    attendanceStatus +
                    `</div></td>`;
                } else
                  html +=
                    `<td class="tg-0pky ` +
                    rotateClass +
                    `" style="color:` +
                    setColorBasedOnAttendanceStatus(item) +
                    `!important"><div>` +
                    item +
                    `</div></td>`;
              }

              itemCounter++;
            }
          });

          html += `</tr>`;

          perPageCounter++;
        }

        if (status == "Present") color = "#006b0d";
        else if (status == "Absent") color = "#f3a4a4";
        else if (status == "Half Day") color = "#00486b";
        else if (status == "Leave") color = "#5f6360";
        //    html += `<tr>`;
        //html += `<td colspan='40' style='border:none!important;text-align:right!important;'>`;
        //html += `<span style='height:20px;width:20px;color:#006b0d;'>P (حاضر)</span> &nbsp&nbsp&nbsp
        //         <span style='height:20px;width:20px;color:#f3a4a4;'>(AB) غیرحاضر</span>&nbsp&nbsp&nbsp
        //         <span style='height:20px;width:20px;color:#00486b;'>(HL) نیم روز</span>&nbsp&nbsp&nbsp
        //         <span style='height:20px;width:20px;color:#5f6360;'>(AL) رخصت</span>&nbsp&nbsp&nbsp
        //         <span style='height:20px;width:20px;color:#5f6360;'>(SL) رخصت مریضی</span>&nbsp&nbsp&nbsp
        //         <span style='height:20px;width:20px;color:#5f6360;'>(UL) رخصت بدون پرداخت</span>&nbsp&nbsp&nbsp
        //         <span style='height:20px;width:20px;color:#77a58b;'>(PH) رخصتی عمومی</span>&nbsp&nbsp&nbsp
        //         <span style='height:20px;width:20px;color:#c1c1c1;'>جمعه</span>`;
        //html += `</td>`;
        //html += `</tr>`;
        else html += `</table > `;

        // close report-div & tg-wrap div
        html += "</div>";

        // if loop is finished load partial footer
        if (counter == data.data.length) {
          html +=
            "<div class='report-footer' style='width:100%; align-content:center'>";
          html +=
            "<div class='report-footer-phone'>" + window.reportPhone + "</div>";
          html +=
            "<div class='report-footer-address'>" +
            window.reportAddress +
            "</div>";
          html += "</div></div>";
        }

        //append data in report div
        divReport.empty().html(html);

        // remove class hidden from report wrapper div
        $(".invoice-wrapper").removeClass("hide-element");
        afterLoadAttendance();
      } else {
        $(".invoice-wrapper").addClass("hide-element");
        messageBox("error", data.text);
      }
    }
  );
}
