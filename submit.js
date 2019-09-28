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
        // 最初の1文字 (?記号) を除いた文字列を取得する
        var query = document.location.search.substring(1);

        // クエリの区切り記号 (&) で文字列を配列に分割する
        var parameters = query.split('&');

        var result = new Object();
        for (var i = 0; i < parameters.length; i++) {
            // パラメータ名とパラメータ値に分割する
            var element = parameters[i].split('=');

            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);

            // パラメータ名をキーとして連想配列に追加する
            result[paramName] = decodeURIComponent(paramValue);

        }
        return result;
    }
    return null;
}

function submit_list() {
    var submit_html = '';

    submit_html += '<h4>予定を入力してください</h4>';

    submit_html += '<div class="input_list"><form name="input_list"><textarea name="listsubmit", required="true", maxlength="100"></textarea></form></div>';

    submit_html += '<p><button onclick="check_submit()">登録</button><button onclick="check_cancel()">キャンセル</button></p>'

    document.querySelector('#listsubmit').innerHTML = submit_html;
}

function check_submit() {
    const listditail = document.input_list.listsubmit.value;
    localStorage.setItem(submitlistday + is_1digit(listnum), listditail);
    console.log(submitlistday + is_1digit(listnum) + "," + listditail);
    window.location.href = "list.html" + "?date=" + submitlistday;
}

function check_cancel() {
    
}

function is_1digit(count) {
    if (count < 10) {
        return "0" + count;
    }
    else {
        return count;
    }
}