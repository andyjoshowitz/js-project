

// var Review = function(attributes) {
//   this.id = attributes.id;
//   this.difficulty = attributes.difficulty;
//   this.course_quality = attributes.course_quality;
//   this.instructor_quality = attributes.instructor_quality;
//   this.amount_learned = attributes.amount_learned;
//   this.work_amount = attributes.work_amount;
//   this.comment = attributes.comment;
//   this.updated_at = attributes.updated_at;
//   this.course = attributes.course;
// };
//
// Review.prototype.renderReview = function() {
//   var text = "";
//   text = '<h2 class="review-title">' + this.id + '</h2>';
//   text += '<p class="review-meta">' + 'by' + ' ' + this.user + ' ' +'-' + ' ' + this.created_at + ' ' + '</p>';
//   text += '<p class="review-description">' + this.comment + '</p>';
//   return text;
// };
//
// var showReview = function() {
//   $.ajax({
//     url: this.action,
//     method: "GET",
//     data: $(this).serialize(),
//     dataType: "json",
//     success: function(json){
//        var review = new Review(json)
//        var renderReview = json.review.renderReview();
//       $("#showreview").append(renderReview);
//     }
//   })
// }
//
// $(document).ready(function() {
//   showReview();
// });


// var Comment = function(attributes) {
//   this.id = attributes.id;
//   this.content = attributes.content;
//   this.user = attributes.user;
//   this.created_at = attributes.created_at;
// };
//
// Comment.prototype.deleteLink = function() {
//   var output = '<a class="btn btn-danger btn-xs" data-confirm="Are you sure you want to delete?" rel="nofollow" data-method="delete" href="/stories/:story_id/comments/' + this.id + '">';
//     output += '<span class="glyphicon glyphicon-remove"></span>';
//     output += '</a>';
//   return output;
// }
//
// Comment.prototype.renderComment = function() {
//   var html = "";
//   html += '<ol class="list-unstyled" id="comment-" + comment.id >';
//   html += '<li><strong>' +  this.user.username + '</strong>' + " " + ':' + " " + this.content + " " + this.deleteLink() +'</li>';
//   html += '</ol>';
//   return html;
// };
//
//  var attachListener = function() {
//     $(document).on('submit', 'form#new_comment', function(event){
//     event.preventDefault();
//     var $form = $(this);
//     var action = $form.attr("action");
//     var params = $form.serialize();
//     $.ajax({
//       url: action,
//       data: params,
//       dataType: "json",
//       method: "POST"
//     }).success(function(json) {
//       $(".commentText").val("");
//       var comment = new Comment(json);
//       var renderComment = comment.renderComment();
//       $("#commentSection").append(renderComment);
//       });
//     });
// }

// $(document).ready(function() {
//   showReview();
// });

var showCourse= function() {
  $.ajax({
    method: "GET",
    url: this.action,
    data: $(this).serialize(),
    success: function(course){
      debugger
      text = '<h2><a class="js-course-show" href="/courses/' + course.id + '">' + course.title + '</a></h2>';
      text += '<p>' + course.description + '...';
      text += '<a class="js-course-show" href="/courses/' + course.id+ '">Read More</a></p>';
      $("#showcourse").append('<div>' + text + '</div>');
    }
  })
}

$(document).ready(function() {
  showCourse();
})
