$(function(){
  $("a.load_reviews").on("click", function(e){
    e.preventDefault();
    $.ajax({
      method: "GET",
      url: this.action,
      data: $(this).serialize(),
      dataType: "json",
      success: function(json){
        console.log(json)
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
        // $("review_comment").val("");
         $("#test").append(response);
      }
    });
    e.preventDefault();
  })
};


/* var Review = function(attributes) {
  this.id = attributes.id;
  this.difficulty = attributes.difficulty;
  this.course_quality = attributes.course_quality;
  this.instructor_quality = attributes.instructor_quality;
  this.amount_learned = attributes.amount_learned;
  this.work_amount = attributes.work_amount;
  this.comment = attributes.comment;
  this.updated_at = attributes.updated_at
  this.activity_id = attributes['course']['id'];
  this.user_email = attributes['user']['email']
  this.user_id = attributes['user']['id']
};

Review.prototype.deleteLink = function() {
  var output = '<a class="btn btn-danger btn-xs" data-confirm="Are you sure you want to delete?" rel="nofollow" data-method="delete" href="/stories/:story_id/comments/' + this.id + '">';
    output += '<span class="glyphicon glyphicon-remove"></span>';
    output += '</a>';
  return output;
}

Review.prototype.renderReview = function() {
  var html = "";
  html += '<ol class="list-unstyled" id="review-" + review.id >';
  html += '<li><strong>' +  this.user.username + '</strong>' + " " + ':' + " " + this.comment + " " + this.deleteLink() +'</li>';
  html += '</ol>';
  return html;
};

/*  var attachListener = function() {
    $(document).on('submit', 'form#new_review', function(event){
    event.preventDefault();
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();
    $.ajax({
      url: action,
      data: params,
      dataType: "json",
      method: "POST",
      success: (function(json) {
      $(".reviewText").val("");
      var review = new Review(json);
      var renderReview = review.renderReview();
      $("#reviewSection").append(renderReview);
      });
    });
}*/

$(document).ready(function() {
  createReview();
});
