class Instructor {
  constructor(attributes){
    this.id = attributes.id;
    this.first_name = attributes.first_name;
    this.second_name = attributes.second_name;
    this.courses = attributes.courses
  }
}


Instructor.prototype.renderInstructor = function(){
  return Instructor.template(this)
}

$(function(){
  Instructor.templateSource = $("#instructor-template").html();
  Instructor.template = Handlebars.compile(Instructor.templateSource);
  // attachInstructorListeners();
})

document.addEventListener("turbolinks:load", function() {
  $("button[data-id]").click(function(e){
    let $locButton = $(this)
    displayLocCourses($locButton)
  })
})

// function attachInstructorListeners(){
//   $("button[data-id]").click(function(e){
//     let $locButton = $(this)
//     displayLocCourses($locButton)
//   })
// }

function displayLocCourses(instructorArg){
  let instructorId = instructorArg.attr('data-id')
  // $(`#instructorCard${instructorId}`).after("<div><p>Hi.</p></div>")
  $.get(`/locations/${instructorId}`, function(json){
    console.log(json)
    let instructor = new Instructor(json);
    let instructorCourses = instructor.renderCourse();

    // $(`#instructorCard${instructorId}`).after(instructorCourses)
    if ($(`button[data-id=${instructorId}]`).html() == "View"){
      $(`#instructor{instructorId}Courses`).html(instructorCourses);
      $(`button[data-id=${instructorId}]`).html('Hide')
    } else if ($(`button[data-id=${instructorId}]`).html() == "Hide") {
      $(`#instructor{instructorId}Courses`).html("");
      $(`button[data-id=${instructorId}]`).html('View')
    }

  })
}
