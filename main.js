function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

(function($) {

var delimiter = document.querySelector('#page-delimiter'),
    input = document.querySelector('#input'),
    output = document.querySelector('#output');

var inputPlaceholderTemplate = 'Line 1\n\nLine 2\n\nLine 3\n\n【DELIMITER】\n\nLine 4\n\nLine 5\n\nLine 6';

output.placeholder = 'Page 01\n\nLine 1\n\nLine 2\n\nLine 3\n\nPage 02\n\nLine 4\n\nLine 5\n\nLine 6';

delimiter.oninput = function(e) {
    if (this.value === '') this.value = '***';
    var newPlaceholder = inputPlaceholderTemplate.replace('【DELIMITER】', this.value);
    input.placeholder = newPlaceholder;
    input.oninput();
};

input.oninput = function(e) {
    if (input.value === '') {output.value = ''; return;}

    var inputText = '\n\n' + input.value.trim(),
        delimPattern = new RegExp(escapeRegExp(delimiter.value)),
        outputList = inputText.split(delimPattern),
        outputText = '';

    outputList.forEach(function(entry, index) {
        outputText += 'Page ' + (index < 9 ? '0' + (index + 1) : index + 1) + entry;
    });

    output.value = outputText;
};

delimiter.oninput();

})(jQuery);
