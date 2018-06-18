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
        // console.log(json.reviews)
        // $("div.reviews ol")
        // // orderedList.html("")
        // console.log(orderedList.html(""))
        json.reviews.forEach(function(review){
          $("#test").append(`<li><a class="review_link" href="http://localhost:3000/courses/${json.id}/reviews/${review.id}">${review.comment.substring(0,20) + "..."}</li>`);
        })
      }
    })
  })
};
