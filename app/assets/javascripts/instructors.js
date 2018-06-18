

function loadInstructor(data) {
      history.pushState({}, "", $(this).attr("href"));
      // $(this).attr("href")
      // "/instructors/" + data.id
      $(".first-name").text(data["first_name"]);
      $(".second-name").text(data["second_name"]);
      $(".js-next").attr("data-id", data["id"]);
      $(".js-previous").attr("data-id", data["id"]);
      $("#instructor-courses").empty();
      data["course_list"].forEach(function(element){
        var course = new Course(element);
        course.renderDisplay();
      });
  }


  $(".js-next").on("click", function(event) {
    event.preventDefault();
    var id = $(".js-next").attr("data-id")
    $.get("/instructors/" + id + "/next", function(data) {
      console.log(data);
      loadInstructor(data);
    });

  });

  $(".js-previous").on("click", function(event) {
    var id = $(".js-previous").attr("data-id")
    $.get("/instructors/" + id + "/previous", function(data) {
      console.log(data);
      loadInstructor(data);
    });
    event.preventDefault();

  });

  function Course(data) {
    this.id = data.id;
    this.instructor = data.instructor;
    this.department = data.department;
    this.title = data.title;
    this.course_number = data.course_number;
    this.description = data.description;
    this.user = data.user;
  }

  Course.prototype.renderDisplay = function() {
    var html = "" ;
    html += '<ol>' +'<li>' + '<h3 class="instructorCourseDepartment">' + this.department + "-" + this.course_number + ":" + this.title + '</h3>';
    html += '<p class="card-text">' + this.description + '</p>';
    html += "<a class='course_link' href='http://localhost:3000/courses/${this.id}'>" + "View Course" + '</a>';
    html += '</li>';
    html += '</ol>';
    $("#instructor-courses").append(html);
  }
