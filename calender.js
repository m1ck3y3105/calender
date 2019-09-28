var count = 0;

window.onload = function() {
    var allday = new Date();
    var thisyear = allday.getFullYear();
    var thismonth = allday.getMonth() + 1;
    var today = allday.getDate();
    var year = thisyear;
    var month = thismonth;

    localStorage.setItem("year", year);
    localStorage.setItem("thisyear", thisyear);
    localStorage.setItem("month", month);
    localStorage.setItem("thismonth", thismonth);
    localStorage.setItem("today", today);

    Setbackcolor(month);
    Calender(year, month, today);
}

function monthimage(mvmonth) {
    var changemonth = 0;
    var year = localStorage.getItem("year");
    var month = localStorage.getItem("month");
    var date = localStorage.getItem("today");

    changemonth = Number(month) + mvmonth;
    if (changemonth < 1) {
        changemonth = 12;
        year--;
    }
    else if(changemonth > 12) {
        changemonth = 1;
        year++;
    }
    console.log(changemonth)
    Calender(year, changemonth, date);
    localStorage.setItem("year", year);
    localStorage.setItem("month", changemonth);
    localStorage.setItem("today", date);

    Setbackcolor(changemonth);
}

function Setbackcolor(month) {
    const colorstr = ["224, 128, 128",
        "240, 128, 192",
        "224, 192, 224",
        "160, 192, 224",
        "128, 128, 192",
        "160, 224, 224",
        "128, 192, 160",
        "192, 160,  32",
        "240, 224,  32",
        "160,  64,  32",
        "224, 192, 128",
        "224, 240, 240"];

    document.body.style.backgroundColor = "rgba(" + colorstr[month -1] +", 0.5)";
}

function today_plan(today) {
    window.location.href =  "list.html" + "?date=" + today;
}

function Calender(year, month, today) {
    const startdate = new Date(year, month - 1, 1);
    const startday = startdate.getDay();
    const monthend = new Date(year, month, 0);
    const thismonth = localStorage.getItem("thismonth");
    const thisyear = localStorage.getItem("thisyear");
    const enddate = monthend.getDate();
    const strmonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sta"];
    let weekcount = 5;

    let calender = '';
    count = 0;

    let is_1digit = function(count) {
        if(count < 10)
        {
            return "0" + count;
        }
        else
        {
            return count;
        }
    }

    calender += '<h2>' + year + "  " + strmonth[month - 1] + '</h2>';

    calender += '<table>';

    for (let weeknum = 0; weeknum < day.length; weeknum++) {
        calender += '<td>' + day[weeknum] + '</td>';
    }

    for (let weeknum = 0; weeknum < weekcount; weeknum++) {
        calender += '<tr>';
        for (let datenum = 0; datenum < 7; datenum++) {
            if (weeknum == 0 && datenum < startday) {               //月の初めより前
                calender += '<td></td>';
            }
            else if (count < enddate){                              //その月
                count++;

                if (today == count && thismonth == month && thisyear == year) {
                    calender += '<td>' + '<span>';
                }
                else{
                    calender += '<td>';
                }

                if(datenum == 0){
                    calender += '<a class="sun", onclick="today_plan(' + year + is_1digit(month) + is_1digit(count) + ')">';
                }
                else if(datenum > 0 && datenum < 6){
                    calender += '<a class="wkd", onclick="today_plan(' + year + is_1digit(month) + is_1digit(count) + ')">';
                }
                else{
                    calender += '<a class="sat", onclick="today_plan(' + year + is_1digit(month) + is_1digit(count) + ')">';
                }

                if (today == count && thismonth == month && thisyear == year) {
                    calender += count + '</a>' + '</span>' + '</td>';
                }
                else {
                    calender += count + '</a>' + '</td>';
                }
            }
            else {                                                  //その月の終わりより後
                calender += '<td></td>';
            }

            if (weeknum == 4 && datenum == 6 && count < enddate) {
                weekcount = 6;
            }
        }
        calender += '</tr>';
    }

    calender += '</table>';

    document.querySelector('#calender').innerHTML = calender;
}
