var submitlistday = '';
var listnum = 0;

window.onload = function () {
    count = GetQueryString();
    submitlistday = count["date"];
    listnum = Number(count["list"]);

    submit_list();
}

function GetQueryString() {
    if (1 < document.location.search.length) {
        var query = document.location.search.substring(1);

        var parameters = query.split('&');

        var result = new Object();
        for (var i = 0; i < parameters.length; i++) {

            var element = parameters[i].split('=');

            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);

            result[paramName] = decodeURIComponent(paramValue);

        }
        return result;
    }
    return null;
}

function submit_list() {
    var submit_html = '';

    submit_html += '<h2>予定を入力してください</h2>';

    submit_html += '<div class="input_list"><form name="input_list"><textarea name="listsubmit", required="true", maxlength="100"></textarea></form></div>';

    submit_html += '<p><div class="subcan"><button onclick="check_submit()">登録</button><button onclick="check_cancel()">キャンセル</button></div></p>'

    document.querySelector('#listsubmit').innerHTML = submit_html;
}

function check_submit() {
    const listditail = document.input_list.listsubmit.value;
    localStorage.setItem(submitlistday + is_1digit(listnum), listditail);
    console.log(submitlistday + is_1digit(listnum) + "," + listditail);
    window.location.href = "list.html" + "?date=" + submitlistday;
}

function check_cancel() {
    window.location.href = "list.html" + "?date=" + submitlistday;
}

function is_1digit(count) {
    if (count < 10) {
        return "0" + count;
    }
    else {
        return count;
    }
}