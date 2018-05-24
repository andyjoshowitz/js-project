class Review {
  constructor(attributes){
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
  }
}

Review.prototype.renderReview = function(){
  return Review.template(this)
}

 Review.prototype.reformatDate = function(){
   return this.updated_at.slice(5,10).replace('-','/') + "/" + this.updated_at.slice(0,4)
 }

$(document).on("turbolinks:load", function(){
  Handlebars.registerPartial('reviewPartial', document.getElementById('review-partial').innerHTML);
  Handlebars.registerHelper('formatDate', function(timestamp){
     return timestamp.slice(5,10).replace('-','/') + "/" + timestamp.slice(0,4);
  });

  Review.templateSource = $("#review-template").html();
  Review.template = Handlebars.compile(Review.templateSource);
})


document.addEventListener("turbolinks:load", function() {
  $("form#new_review").submit(function(e){
    e.preventDefault();
    let $form = $(this)
    submitNewReview($form);
  })
})

function submitNewReview($form){
  let action = $form.attr("action");
  let params = $form.serialize()
  let posting = $.post(action, params)
  posting.done(function(data){
     console.log(data)
    if (!!data.id) {
      let review = new Review(data);
      debugger;
      let reviewCard = review.renderReview();
      $("#reviewBox").prepend(reviewCard);
      $("#timestampHolder").html(review.reformatDate());
      // $("#newReview").show();
      $("#review_form_placeholder").html("");

    } else {
      console.log(typeof data)
      let errorMessage = []
      for (var key in data) {
        errorMessage.push(`${key} ${data[key]}. `)
      };
      console.log(errorMessage.join("\n"))
      $("#error_msg").html(errorMessage.join("\n"))
      $("form#new_review [name=commit]").prop("disabled", false)
    }
  })
  .fail(function(e){
    alert("Sorry, something went wrong")
  })

}

///////////////// Traditional Ready function does not work with turbolinks //////////
$(function(){
  Handlebars.registerPartial('reviewPartial', document.getElementById('review-partial').innerHTML);
  Handlebars.registerHelper('formatDate', function(timestamp){
     return timestamp.slice(5,10).replace('-','/') + "/" + timestamp.slice(0,4);
  });

  Review.templateSource = $("#review-template").html();
  Review.template = Handlebars.compile(Review.templateSource);


  // attachReviewListeners();
})

// function attachReviewListeners(){
//   $("form#new_review").submit(function(e){
//     e.preventDefault();
//     var $form = $(this)
//     submitNewReview($form);
//   })
// }
