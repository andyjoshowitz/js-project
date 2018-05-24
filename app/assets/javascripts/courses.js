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
