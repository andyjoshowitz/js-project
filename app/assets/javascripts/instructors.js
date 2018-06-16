function loadInstructor(data) {
    history.pushState({}, "", "/instructors/" + data.id)
    var instructorCoursePath = '/instructors/' + data.id + '/courses/';
    $(".instructorFirstName").text(data["first_name"]);
    $(".instructorSecondName").text(data["second_name"]);
    $(".js-next").attr("data-id", data["id"]);
    $(".js-previous").attr("data-id",data["id"]);
    $("#instructor-courses").empty();
    data["course_list"].forEach(function(element){
      var courses = new Course(element);
      course.renderDisplay();
    });


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
    loadIntructor(data);
  });
  event.preventDefault();

});

function Course(data) {
  this.id = data.id;
  this.department = data.department;
  this.title = data.title;
  this.course_number = data.course_number;
  this.description = data.description;
  this.user = data.user;
  this.instructor = data.instructor;
}



Course.prototype.renderDisplay = function() {
  var html = "" ;
  html += "<li>" + "<h3 class=\'instructorCourseDepartment\'>" + this.department + "</h3>" + "<h3 class=\'instructorCourseTitle\'>" + this.title + "</h3>" + "<p class=\'card-text\'>" + this.description + "</p>" + "</li>";
  $("#instructor-courses").append(html);
}

// <li><h3 class="instructorCourseDepartment"><%= course.department%></h3><h3 class="instructorCourseTitle">-<%=course.title %></h3>
// <p class="card-text"><%= course.description %></p>
//   <div class="btn-group">
//     <%= button_to "View", course_path(course), method: :get %>
//   </div>
//   <div class="btn-group">
//     <%= button_to "Edit", edit_course_path(course), method: :get, class: "btn btn-sm btn-outline-secondary" if current_user.try(:admin?) || course.user_id == current_user.try(:id) %>
//   </div>
//   <small class="text-muted">Last updated: <br><%= course.updated_at.strftime("%m/%d/%Y") %></small>
// <% end %></li>
