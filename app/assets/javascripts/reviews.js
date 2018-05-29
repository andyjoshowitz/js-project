function getReviews(){
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
          $("#test").append(`<li><a href="http://localhost:3000/courses/${json.id}/reviews/${review.id}">${review.course_quality}</li>`);
        })
      }
    })
  })
};

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



$(document).ready(function() {
  getReviews();
  createReview();
  //getReview();
});
