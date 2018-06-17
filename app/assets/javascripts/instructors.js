function loadInstructor(data) {
      history.pushState({}, "", "/instructors/" + data.id)
      $(".first-name").text(data["first_name"]);
      $(".second-name").text(data["second_name"]);
      $(".js-next").attr("data-id", data["id"]);
      $(".js-previous").attr("data-id",data["id"]);

  }

  $(".js-next").on("click", function(event) {
    var id = $(".js-next").attr("data-id")
    $.get("/instructors/" + id + "/next", function(data) {
      console.log(data)
      loadInstructor(data);
    });
    event.preventDefault();
  });

  $(".js-previous").on("click", function(event) {
    var id = $(".js-previous").attr("data-id")
    $.get("/instructors/" + id + "/previous", function(data) {
      console.log(data)
      loadInstructor(data);
    });
    event.preventDefault();

  });
