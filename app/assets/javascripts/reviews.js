function getReviews(){
  $.ajaxSetup({
        cache: false,
    });
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
          $("#test").append(`<li><a class="review_link" href="http://localhost:3000/courses/${json.id}/reviews/${review.id}">${review.comment.substring(0,20) + "..."}</li>`);
        })
      }
    })
  })
};

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
  // createProtoReview();
//  showReview();
});
