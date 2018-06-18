$(function(){
  $.ajaxSetup({
        cache: false,
    });
    //e.preventDefault();
  $("a.load_courses").on("click", function(e){
  e.preventDefault();
    $.ajax({
      method: "GET",
      url: this.action,
      data: $(this).serialize(),
      dataType: "json",
      success: function(courses){
        courses.forEach(function(course){
          let text = `<h2><a class="js-course-show" href="/courses/${course.id}">${course.title}</a></h2>
                      <p>${course.description.substring(0, 50)}...</p>
                      <a class="js-course-show" href="/courses/${course.id}">Read More</a></p>
                      <small class="course-meta">by ${course.user.email}</small>`
          $("#indexCourses").append(`<li>${text}</li>`);
        })
      }
    })
  })
})

function getReviews(){
  $("a.load_reviews").on("click", function(e){
    e.preventDefault();
    $.ajax({
      method: "GET",
      url: this.action,
      data: $(this).serialize(),
      dataType: "json",
      success: function(json){
        // debugger
        let alphabetizedList = json.reviews.sort(function(a, b){
          if(a.comment.toUpperCase() < b.comment.toUpperCase()) return -1;
          if(a.comment.toUpperCase() > b.comment.toUpperCase()) return 1;
          return 0;
        })
        alphabetizedList.forEach(function(review){
          $("#test").append(`<li><a class="review_link" href="http://localhost:3000/courses/${json.id}/reviews/${review.id}">${review.comment.substring(0,20) + "..."}</li>`);
        })
      }
    })
  })
};

function Review(attributes) {
  this.id = attributes.id;
  this.comment = attributes.comment;
  this.overallQuality = attributes.overall_quality
  this.averageDifficulty = attributes.average_difficulty
  this.workAmount = attributes.work_amount
  this.amountLearned = attributes.amount_learned
  this.instructorQuality = attributes.course
  this.course = attributes.course;
  this.user = attributes.user;
  this.createdAt = attributes.created_at;
}



Review.prototype.renderReview = function() {
  let html = `<li>
                <a class="review_link" href="http://localhost:3000/courses/${this.course.id}/reviews/${this.id}">
                  ${this.comment.substring(0,20)}...
                </a>
              </li>`;
  $("#test").append(html);
}

function createReview() {
  $("form#new_review").on("submit", function(event) {
    event.preventDefault();
    var $form = $(this);
    var url = this.action + "." + "json";
    var data = $form.serialize();
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
