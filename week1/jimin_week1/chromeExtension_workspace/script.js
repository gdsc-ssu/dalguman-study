document.querySelector('#user').addEventListener('change', function () {
    var user = document.querySelector('#user').value;

    chrome.tabs.executeScript({
        code: 'document.querySelector("body").innerText'
    }, function (result) {

        var bodyText = result[0];
        var bodyNum = bodyText.split(' ').length;
        var myNum = bodyText.match(new RegExp('\\b(' + user + ')\\b', 'gi')).legnth;

        var per = myNum / bodyNum * 100;
        per = per.toFixed(1);

        document.querySelector('#result').innerText = myNum + '/' + bodyNum + '(' + (per) + '%)';

    });

});