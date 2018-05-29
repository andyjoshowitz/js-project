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
  text = '<h2 class="review-title">' + this.id + '</h2>';
  text += '<p class="review-meta">' + 'by' + ' ' + this.user + ' ' +'-' + ' ' + this.created_at + ' ' + '</p>';
  text += '<p class="review-description">' + this.comment + '</p>';
  return text;
};

var getReview = function() {
  $.ajax({
    url: this.action,
    method: "GET",
    data: $(this).serialize(),
    dataType: "json",
    success: function(json){
       var review = new Review(json)
       var renderReview = json.review.renderReview();
      $("#showreview").append(renderReview);
    }
  })
}

$(document).ready(function() {
  getReview();
});
