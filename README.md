# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

* first commit


<!-- <h3>Your Reviews</h3>
<ol>
  <% @reviews.each do |review| %>
    <li><h4><%= link_to review.course.full_title, course_path(course) %></h4>
        <br>
        <small class="text-muted">Last updated: <%= course.updated_at.strftime("%m/%d/%Y") %></small>
  <% end %></li>
</ol>-->

<h5><%=@instructor.overall_rating%></h5>

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

  showIndexReview() {
    return `<li>${this.user.email} : ${this.body}</li>`
  }

  showReviewMade() {
    return `<li>${this.type_object.name} (${this.commentable_type.split(/(?=[A-Z])/).join(" ")}) : ${this.body}</li>`
  }

  showReviewReceived() {
    //return `<li>${this.type_object.name} (${this.commentable_type.split(/(?=[A-Z])/).join(" ")}) : ${this.body}</li>`
  }
}

Review.done = function(response) {
  let $ul = $("div.comments ul");
  $ul.html(" ");
  $.each(response, function(index, value){
    let review = new Review(response[index]);
    let indexReview;
    if (this.id === "reviews_made"){
      indexReview = review.showReviewMade();
    }else if (this.id === "reviews_received"){
      indexReview = review.showReviewReceived();
    }else {
      indexReview = review.showIndexReview();
    }
    $ul.append(indexReview);
  }.bind(this));
}

const loadReviewsMade = function () {
  $("#reviews_made").on("click", function(e){
    $.get(this.href).done(Review.done.bind(this))
    e.preventDefault();
  });
}

const loadReviews = function() {
  $("#load_reviews").on("click", function(e){
    e.preventDefault();
    $.get(this.href).done(Review.done.bind(this))
  });
}

const hideReviews = function() {
  $("#hide_reviews").on("click", function(e){
    let $ul = $("div.reviews ul");
    $ul.html(" ")
    e.preventDefault();
  });
}

const newReviewForm = function() {
  $("#new_review").on("submit", function(e){
    $.ajax({
      type: ($("input[name='_method']").val() || this.method),
      url: this.action,
      data: $(this).serialize()
    }).success(function(response){
        $("#review_body").val("");
        let $ul = $("div.comments ul");
        $ul.append(response);
      });
    e.preventDefault();
  });
}

$(function(){
  loadReview();
  hideReview();
  newReviewForm();
  loadReviewsMade();
})

  // $("#comments_received").on("click", function(e){
  //   $.get(this.href).success(function(json){
  //     let $ul = $("div.comments ul");
  //     $ul.html(" ");
  //     json.forEach(function(comment){
  //       $ul.append("<li>" + comment.author.name + " : " + comment.body + "</li>")
  //     });
  //   });
  //   e.preventDefault();
  // });


  // fire functions after turbolinks has loaded
  $(document).on('turbolinks:load', function() {
      listReviews();
      showReviewForm();
      postReview();
      viewBest();
  });

  // rating object function
  function Review (attributes) {
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

  // render newly created rating for JS rating object using Handlebars template
  Review.prototype.renderNewReview = function() {
      // debugger
      return Review.renderReview(this)
  }

  // get Handlebars ready
  function setupHandleBars() {
      // get template from page
      Review.template = $('#review-partial').html();
      // compile tempate
      Review.renderReview = Handlebars.compile(Review.template);
  }

  function listReviews() {
      // listen for "view reviews" button to be clicked
      $("#js-view-reviews").on("click", function(e) {
          // get Handlebars ready
          setupHandleBars();
          // reset div's contents
          $('#js-review').html("")
          // get current restroom's id from data attributes
          let id = $(this).data("id");
          // send get request for current restroom's json data
          $.get(`/courses/${id}.json`, function(data) {
              // push below any other contents
              $('#js-reviews').append('<br>');
              data.forEach(review => {
                  // create new JS rating object for each rating
                  let rev = new Review(review);
                  // send rating's data to Handlebars template
                  let revDiv = rev.renderNewReview();
                  // add Handlebars rendered rating to ratings div
                  $('#js-reviews').append(revDiv);
              });
          });
          // hide preview button
          $('a#js-view-reviews').hide();
          e.preventDefault();
      });
  }

  function postReview() {
      // listen for new rating form to be submitted
      $('form#new_review').submit(function(e) {
          // get Handlebars ready
          setupHandleBars();
          // get url from form
          let url = this.action
          // serialize form data into a string
          let formData = $(this).serialize();
          // send post request to /reviews with form data
          $.post(url, formData, function(reviewData) {
              // create new JS rating object with response data
              let rev = new Review(reviewData);
              // render newly created rating with Handlebars
              let revDiv = rev.renderNewReview()
              // add rating to ratings div
              $('#js-reviews').append(revDiv);
          // specify that request is for json format
          }, "json");
          $('form#new_review').trigger("reset");
          // prevent form from submitting & redirecting the page
          e.preventDefault();
      });
  };

  function showReviewForm() {
      // when add rating link is clicked
      $("a#js-add-review").click( function(e) {
          // show form
          $("div.hide").removeClass('hide');
          // hide 'add rating link'
          $('a#js-add-review').hide();
          // prevent button from removing js elements from page
          e.preventDefault();
      });
  };

  function viewBest() {
      // look at the ratings.json for this restroom
      // filter for ratings with stars >= 3
      // display those ratings
      $('button.viewBest').click( function(e) {
          let id = $(this).data("id");
          // get Handlebars ready
          setupHandleBars();
          // reset div's contents
          $('#js-ratings').html("")
          // send get request for current restroom's json data
          $.get(`/courses/${id}.json`, function(data) {
              // push below any other contents
              $('#js-reviews').append('<br>');
              // debugger
              let bestReviews = data.filter( course_quality =>
                  rating.course_quality >= 3
              )

              let sortedBest = bestReviews.sort(function (a, b) {
                  return a.course_quality < b.course_quality
              })

              sortedBest.forEach(review => {
                  // debugger
                  // create new JS rating object for each rating
                  let rev = new Review(review);
                  // send rating's data to Handlebars template
                  // debugger
                  let revDiv = rat.renderNewReview();
                  // add Handlebars rendered rating to reviews div
                  $('#js-reviews').append(revDiv);
                  // $('#js-reviews').append(rev);
              });
          });
          // hide preview button
          // $('a#js-view-reviews').hide();
          e.preventDefault();
      })
  }

  $(document).ready(function(){
    showComments()
    formSubmit()
  })

  function showComments() {
    $('#showComments').on('click', function(){
      const id = $(this).data('id')
      $.get(`http://localhost:3000/recipes/${id}/comments.json`, function(data){
        data.forEach(function(comment){
          $('#comments_list').append(`<li><em>"${comment.body}"</em> -- "${comment.user}"</li>`)
        })
      })
    })
  }

  function formSubmit() {
    $('form').submit(function(event) {
      //prevent form from submitting the default way
      event.preventDefault();
      console.log("Hello")
      var values = $(this).serialize();
      var recipeId = parseInt(document.getElementById('showComments').name, 10)
      var posting = $.post('/recipes/' + recipeId + '/comments', values);
      posting.done(function(data) {
        var recipe = data;
        $("#commentBody").text(recipe["body"]);
      });
    });
  }


  class Course {
    constructor(attributes) {
      this.id = attributes.id;
      this.title = attributes.title
      this.description = attributes.description
      this.department = attributes.department
      this.course_number = attributes.course_number
      this.reviews = attributes.reviews
    }
  }


  Course.prototype.renderCourse = function(){
    return Course.template(this)
  }

  $(function(){
    Handlebars.registerPartial('coursePartial', document.getElementById('course-partial').innerHTML);
    Handlebars.registerHelper('limit', function(arr, limit){
      return arr.slice(0,limit)
    })
    // Course.templateSource = $("#course-template").html();
    // Course.template = Handlebars.compile(Course.templateSource);
     // attachCourseListeners()
  })

  document.addEventListener("turbolinks:load", function() {
    $("#review_form_btn").click(function(e){
      e.preventDefault();
      displayReviewForm();
    });
    $("#remove_form").click(function(e){
      e.preventDefault();
      removeForm();
    })
  })

  // function attachCourseListeners(){
  //   $("#review_form_btn").click(function(e){
  //     e.preventDefault();
  //     displayReviewForm();
  //   });
  //   $("#remove_form").click(function(e){
  //     e.preventDefault();
  //     removeForm();
  //   })
  //   // $("button[data-id]").click(function(e){
  //   //   let $locButton = $(this)
  //   //   displayLocCourses($locButton)
  //   // })
  // }

  function displayReviewForm(){
    $("#review_form_placeholder").show()
    $("#review_form_btn").toggle();
  }

  function removeForm(){
    $("#review_form_placeholder").hide();
    $("#review_form_btn").toggle()
  }

  // function displayLocCourses(instructor){
  //   let instructorId = instructor.attr('data-id')
  //   $(`#instructorCard${instructorId}`).after("<div><p>Hi.</p></div>")
  // }


  // function submitNewReview($form){
  //   var action = $form.attr("action");
  //   var params = $form.serialize()
  //
  //   let posting = $.post(action, params)
  //   posting.done(function(json){
  //     console.log(json)
  //     let review = new Review()
  //   })
  // }
  // document.addEventListener("DOMContentLoaded", function(e){
  //   init()
  // })

  $(document).ready(function(){

    $('#ingredients').on('click', function(){
      const id = $(this).data('id')
      $.get(`http://localhost:3000/recipes/${id}/ingredients.json`, function(data){
        data.forEach(function(ingredient){
          const ing = new Ingredient(ingredient)
          $('#ingredients_list').append(ing.render())
        })
      })
    })


  function Ingredient(json){
    this.name = json.name
    this.quantity = json.ing_quantity
  }

  Ingredient.prototype.render = function() {
    return `<li>${this.name} -- ${this.quantity}</li>`
  }

  $(".nextRecipe").on("click", function(event) {
      event.preventDefault()
      var nextId = parseInt($(this).attr("data-id")) + 1;
      $.get("http://localhost:3000/recipes/" + nextId + ".json", function(data) {
        var recipe = data;
        $(".recipeName").text(recipe["name"]);
        $(".recipeInstructions").text(recipe["instructions"]);
        $(".recipeCooktime").text(recipe["cooktime"]);
        // re-set the id to current on the link
        $(".nextRecipe").attr("data-id", recipe["id"]);
      });
    });



  })



  $(document).ready(function () {

  	$('button#loadInstructors').click(function(event) {
  		var url = $(this).data("url")
  	$.get(url)
  	  .done(function( data ) {
  	  	$('#instructors').html("");

  	  	// filtering from live coding
  	  	// const fillteredData = data.filter(element => element.name === 'Boathouse')

  	    $.each(data, function(index, value) {
  	    	var newInstrutor = new Instructor(value, url);

  	    	var InstructorHtml = newInstructor.formatDisplay();
  			  $('#instructors').append(instructorHtml)
  			});

  	  });
  	});
  });

  function Instructor(instructor, url) {
  	this.id = instructor.id
    this.id = instructor.id;
    this.first_name = instructor.first_name;
    this.second_name = instructor.second_name;
  	this.instructorUrl = url + '/' + instructor.id

  	this.courses = instructor.courses.map(e => new Course(e))
  };

  Instructor.prototype.formatDisplay = function() {
  	var coursesHtml = ""
  	$.each(this.courses, function() {
  		var courseListItem = this.formatDisplay()
  		courseHtml += courseListItem
  	});
  	var courseHtml = `<div><a href='${this.courseUrl}'>${this.name}</a> is taught by: ${this.first_name} ${this.second_name}</div>
  											<div>Apartments</div>
  											<ul>${coursessHtml}</ul>`;
  	return instructorHtml;
  };

  function Course(course) {
  	this.id = course.id
    this.title = course.title
    this.course_number = course.course_number
    this.department = course.department
  	this.description = course.description
  };

  Course.prototype.formatDisplay = function() {
  	console.log(this)
  	var coursetHtml = `<li>Department: ${this.department}, Description: ${this.description}</li>`
  	return courseHtml;
  };

  <h1>Reviews for <%= link_to @course.full_title, course_path(@course) %></h1>
  <!-- display reviews or 'no reviews' content -->
  <% @reviews.each do |review| %>
    <div class="review-box card rounded">
      <h4>Ratings</h4>
        <p>Course Difficulty: <%=review.difficulty%> | Instructor Quality: <%=review.instructor_quality%> | Amount Learned: <%=review.amount_learned%></li> | Workload: <%=review.work_amount%></li> | Course Quality: <%=review.course_quality%></p>
      <h4>Comment</h4>
        <p><%= review.comment %></p>
      <p><%= review.user.email %> | <%= last_updated review %></p>
    </div>
    <% if current_user == review.user %>
      <%= link_to "Edit your review", edit_course_review_path(id: review.id, course_id: @course.id) %>
       |
      <%= link_to "Delete your review", course_review_path(@course, review), :method => :delete %>
    <% end %>
    <br><br>
  <% end %>

  <!-- add rating form -->
