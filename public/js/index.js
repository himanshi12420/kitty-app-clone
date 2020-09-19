$("#button").click(function() {
  alert("Created successfullyy!");
});

$("#button_1").click(function() {
  alert("Expense added successfully!");
});

$("input:radio").on('click', function() {

  var $box = $(this);
  if ($box.is(":checked")) {

    var group = "input:radio[name='" + $box.attr("name") + "']";

    $(group).prop("checked", false);
    $box.prop("checked", true);
  } else {
    $box.prop("checked", false);
  }
});
