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

// $(function(){
//   $.ajaxSetup({
//         cache: false,
//     });
//   $("a.review_link").on("click", function(e){
//     e.preventDefault();
//     $.ajax({
//       method: "GET",
//       url: this.action,
//       data: $(this).serialize(),
//       dataType: "json",
//       success: function(reviews){
//         debugger
//         // if a#id = reviews.review.id then display etc...
//       }
//     })
//   })
// })

// function createReview(){
//   $("#new_review").on("submit", function(e){
//     e.preventDefault();
//     url = this.action
//     data = {
//       'authenticity_token': $("input[name='authenticity_token']").val(),
//       'review': {
//         'difficulty': $("#review_difficulty").val(),
//         'instructor_quality': $("#review_instructor_quality").val(),
//         'amount_learned': $("#review_amount_learned").val(),
//         'work_amount': $("#review_work_amount").val(),
//         'course_quality': $("#review_course_quality").val(),
//         'comment': $("#review_comment").val(),
//         'user_id': $("input[name='review[user_id]']").val(),
//         'course_id': $("input[name='review[course_id]']").val()
//       }
//     }
//     $.ajax({
//       method: "POST",
//       url: url,
//       data: data,
//       success: function(data){
//         $("#test").append(`<li><a href="http://localhost:3000/courses/${data.course_id}/reviews/${data.review.id}">${data.review.course_quality}</li>`);
//       }
//     });
//   })
// };

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
  var html = "";
  // html += '<ol id="test">'
  html += '<li><a class="review_link" href="http://localhost:3000/courses/${this.course}/reviews/${this.id}">${this.comment.substring(0,10) + "..."}</li>';
  // html += '<ol>'
};

function createProtoReview(){
  $('#new_review').on('submit',function(event){
    event.preventDefault();
    $form = $(this);
    url = this.action
    data = $form.serialize();
    $.ajax({
      method: "POST",
      url: url,
      data: data,
      success: function(data) {
        var review = new Review(data);
        var renderReview = review.renderReview();
        $("#test").append(renderReview);
      }
    });
  })
}



$(document).ready(function() {
  getReviews();
  // createReview();
  createProtoReview();
//  showReview();
});
