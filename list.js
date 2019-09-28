var year = 0;
var month = 0;
var date = 0;
var listcount = 0;

window.onload = function onload() {
    param = GetQueryString();
    year = Number(param["date"].slice(0, 4));
    month = Number(param["date"].slice(4, 6));
    date = Number(param["date"].slice(6, 8));
    this.PrintList();
    this.Setbackcolor();
}

function GetQueryString() {
    if (1 < document.location.search.length) {
        var query = document.location.search.substring(1);

        var result = new Object();

        var element = query.split('=');

        var paramName = decodeURIComponent(element[0]);
        var paramValue = decodeURIComponent(element[1]);

        result[paramName] = decodeURIComponent(paramValue);

        return result;
    }
    return null;
}

function is_1digit(count){
    if (count < 10) {
        return "0" + count;
    }
    else {
        return count;
    }
}

function PrintList() {
    var list_html = '';
    let monthstr = is_1digit(month);
    let datestr = is_1digit(date);
    var isenptylist = 1;

    list_html += '<h2>' + year + '/' + monthstr + '/' + datestr + 'の予定</h2>'

    list_html += '<div class="operation"><div class="return"><button onclick="move_calender()">カレンダーに戻る</button></div>'
    list_html += '<div class="submit"><button onclick="list_submit()">登録</button></div></div>';

    list_html += '<table>';

    console.log(year + monthstr + datestr + is_1digit(listcount));

    for(var i = 0; i < 80; i++)
    {
        if (localStorage.getItem(year + monthstr + datestr + is_1digit(i)) != null)
        {
            isenptylist = 0;
            break;
        }
    }

    if (isenptylist == 1)
    {
        list_html += '<tr><td>この日の予定はありません</td></tr>';
    }
    else
    {
        for (var i = 0; i < 80; i++)
        {
            if (localStorage.getItem(year + monthstr + datestr + is_1digit(i)) == null)
            {
                continue;
            }
            else
            {
                list_html += '<tr><td>' + localStorage.getItem(year + monthstr + datestr + is_1digit(i)) + '</td>';
                list_html += '<td><button onclick="list_delete(' + i + ')">削除</button></td></tr>';
                console.log(listcount);
                listcount++;
            }
        }
    }

    
    list_html += '</table><div class="move"><div class="changelistbef"><button onclick="changelist(-1)">前の日</button></div>';
    list_html += '<div class="changelistaft"><button onclick="changelist(1)">次の日</button></div></div>';
    

    document.querySelector('#param').innerHTML = list_html;
}

function changelist(mvmonth){
    var month_datecount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var changedate = Number(date) + Number(mvmonth);

    if(month_datecount[month - 1] < changedate)
    {
        month++;
        if(month > 12)
        {
            month = 1;
            year++;
        }
        changedate = 1;
    }
    else if(1 > changedate)
    {
        month--;
        if(month < 1)
        {
            month = 12;
            year--;
        }
        changedate = month_datecount[month - 1];
    }

    date = changedate;

    window.location.href = "list.html" + "?date=" + year + is_1digit(month) + is_1digit(date);
}

function Setbackcolor() {
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

    document.body.style.backgroundColor = "rgba(" + colorstr[month - 1] + ", 0.3)";
}

function move_calender() {
    window.location.href = "calender.html";
}

function list_delete(listnumber) {
    if(window.confirm("この予定を削除しますか?"))
    {
        localStorage.removeItem(year + is_1digit(month) + is_1digit(date) + is_1digit(listnumber));
        window.location.href = "list.html" + "?date=" + year + is_1digit(month) + is_1digit(date);
    }
}

function list_submit() {
    window.location.href = "submit.html" + "?date=" + year + is_1digit(month) + is_1digit(date) + "&list=" + is_1digit(listcount);
}