
$(function(){
  $(“a.load_reviews”).on(“click”, function(e){
    $.get(this.href).success(function(json){
      var $ol = $(“div.reviews ol”)
      $ol.html(“”)
      json.forEach(function(review){
        $ol.append("<li>" + review.course_quality + "</li>");
      })
    })
    e.preventDefault();
  })
})

$(function(){
  $("#new_review").on("submit", function(e){
    $.ajax({
      method: "POST",
      url: this.action,
      data: $(this).serialize();,
      dataType: "json",
      success: function(response){
        $("review_comment").val("");
        var $ol = $(“div.reviews ol”)
        $ol.append(response);
      }
    });
    e.preventDefault();
  })
});

$(function(){
  $.ajaxSetup({
        cache: false,
    });
    $.get(this.href).success(function(json){
      var courses = $(".courses")
      courses.html("")
      json.forEach(function(course){
        text = '<a class="js-course-show" href="/courses/' + course.id + '">' + course.title + '</a>';
        text += '<p class="course-meta">' + 'by' + ' ' + story.user.email + ' ' +'-' + ' ' + courses.created_at +
                ' ' + '<span class="badge">' + course.reviews_count + ' ' +'reviews' + '</span></p>';
        text += '<p>' + course.description.substring(0, 50) + '...';
        text += '<a class="js-course-show" href="/courses/' + course.id+ '">Read More</a></p>';
        $courses.append(text);
      })
   })
})


var Course = function(attributes) {
  this.id = course.id
  this.title = course.title
  this.course_number = course.course_number
  this.department = course.department
  this.description = course.description
  this.reviews = attributes.reviews;
  this.user = attributes.user;
};

Course.prototype.renderCourse = function() {
  var text = "";
  text = '<h2 class="course-title">' + this.title + '</h2>';
  text += '<p class="course-meta">' + 'by' + ' ' + this.user.email + ' ' +'-' + ' ' + this.created_at + ' ' + '</p>';
  text += '<p class="course-description">' + this.description + '</p>';
  return text;
};

var getCourse = function() {
    $.ajax({
      url: this.href,
      method: "GET",
      dataType: "json",
    }).success(function(json){
      var course = new Course(json)
      var renderCourse = course.renderCourse();
      $("#showcourse").append(renderCourse);
    })
}

$(document).ready(function() {
  getCourse();
})
