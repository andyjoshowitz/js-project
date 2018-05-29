
$(function(){
  $("a.load_reviews").on("click", function(e){
    e.preventDefault();
    $.ajax({
      method: "GET",
      url: this.action,
      data: $(this).serialize(),
      dataType: "json",
      success: function(json){
        /*console.log(json.reviews)
        $("div.reviews ol")
        // orderedList.html("")
        console.log(orderedList.html(""))*/
        json.reviews.forEach(function(review){
          $("#new").append(`<li><a href="http://localhost:3000/courses/${json.id}/reviews/${review.id}">${review.course_quality}</li>`);
        })
      }
    })
  })
})

function createReview(){
  $("#new_review").on("submit", function(e){
    $.ajax({
      method: "POST",
      url: this.action,
      data: $(this).serialize(),
      dataType: "json",
      success: function(response){
         $("#test").append(response);
      }
    });
    e.preventDefault();
  })
};

var Review = function(attributes) {
  this.id = attributes.id;
  this.difficulty = attributes.difficulty;
  this.course_quality = attributes.course_quality;
  this.instructor_quality = attributes.instructor_quality;
  this.amount_learned = attributes.amount_learned;
  this.work_amount = attributes.work_amount;
  this.comment = attributes.comment;
  this.updated_at = attributes.updated_at;
  this.course = attributes.course;
};

Review.prototype.renderReview = function() {
  var text = "";
  text = '<h2 class="course-title">' + this.id + '</h2>';
  text += '<p class="course-meta">' + 'by' + ' ' + this.user.email + ' ' +'-' + ' ' + this.updated_at.strftime("%m/%d/%Y") + ' ' + '</p>';
  text += '<p class="course-description">' + this.comment + '</p>';
  return text;
};

var getReview = function() {
    $.ajax({
      url: this.href,
      method: "GET",
      data: $(this).serialize(),
      dataType: "json",
    }).success(function(json){
      var review = new Review(json)
      var renderReview = review.renderReview();
      $("#showreview").append(renderReview);
    })
}



$(document).ready(function() {
  createReview();
  //getReview();
});
