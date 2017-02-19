var itemTemplate = '<li class="collection-item"><input type="checkbox" id="indeterminate-checkbox{{newListId01}}" class="done" /><label for="indeterminate-checkbox{{newListId02}}">{{date}}：{{name}}</label><button class="delete btn-flat pull-right">&times;</button></li>';
var dataUrl = "http://www.monoame.com/awi_class/api/command.php?type=get&name=tododata";
var todoData;

$.ajax({
    url: dataUrl,
    success: function(res) {
        todoData = JSON.parse(res);
        for (var t in todoData) {
            var nowClass = "";
            var nowItem = itemTemplate.replace("{{name}}", todoData[t].name)
                .replace("{{newListId01}}", t)
                .replace("{{newListId02}}", t)
                .replace("{{date}}", todoData[t].date)
                .replace("{{class}}", nowClass);
            $('#ListItems').append(nowItem);

            if (todoData[t].done == true) {
                $('#indeterminate-checkbox' + t).attr("checked", true);
            }
        }
    }
});

function addListItem() {
    if ($("#addtolist").val().length < 1) {
        return;
    }
    var newListItem = $("#addtolist").val();
    var newListId = $(".done").length + 1;

    $("#ListItems").append('<li class="collection-item"><input type="checkbox" id="indeterminate-checkbox' + newListId + '" class="done"/>  <label for="indeterminate-checkbox' + newListId + '">' + newListItem + ' ' + '</label><button class="delete btn-flat pull-right"> &times; </button></li>');
    $("#addtolist").val('');
}

function deleteItem() {
    $(this).parent().remove();
}

$(function() {
    $("#add").on('click', addListItem);
    $(document).on('click', '.delete', deleteItem);
});
