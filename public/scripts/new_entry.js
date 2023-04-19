$(document).ready(function() {
  loadEntries();


  //catch clicks on write tweet button
  $(".write-new-tweet").click(function(event) {
    event.preventDefault();

    // $("h2").effect("bounce", { times: 3 }, 300);
    $(".new-tweet").toggle(200, function() { });

  });



})
