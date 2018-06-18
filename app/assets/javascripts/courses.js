$(function(){
  $.ajaxSetup({
        cache: false,
    });
    //e.preventDefault();
  $.ajax({
    method: "GET",
    url: this.action,
    data: $(this).serialize(),
    dataType: "json",
    success: function(courses){
      courses.forEach(function(course){
        text = '<h2><a class="js-course-show" href="/courses/' + course.id + '">' + course.title + '</a></h2>';
        text += '<p>' + course.description.substring(0, 50) + '...' + '</p>';
        text += '<a class="js-course-show" href="/courses/' + course.id+ '">Read More</a></p>';
        text += '<small class="course-meta">' + 'by' + ' ' + course.user.email +
                '</small>';
        $("#indexCourses").append('<li>' + text + '</li>');
      })
    }
  })
})

function Review(attributes) {
  this.id = attributes.id;
  this.comment = attributes.comment;
  this.overall_quality = attributes.overall_quality
  this.average_difficulty = attributes.average_difficulty
  this.work_amount = attributes.work_amount
  this.amount_learned = attributes.amount_learned
  this.instructor_quality = attributes.course
  this.course = attributes.course;
  this.user = attributes.user;
  this.created_at = attributes.created_at;
}



Review.prototype.renderReview = function() {
  var html = "";
  html += '<li>' + '<a class="review_link" href="http://localhost:3000/courses/${this.course.id}/reviews/${this.id}">' + this.comment.substring(0,20) + "..." + '</li>';
  $("#test").append(html);
}

function createReview() {
  $("form#new_review").on("submit", function(event) {
    event.preventDefault();
    var $form = $(this);
    var url = this.action + "." + "json";
    var data = $form.serialize();
    debugger
    $.ajax({
      method: "POST",
      url: url,
      data: data,
      success: function(data) {
        $("#test").val("");
        var review = new Review(data);
        review.renderReview();
      }
    })
  })
}


//"http://localhost:3000/courses/4/reviews.json"


$(document).ready(function() {
  getReviews();
  createReview();
});
