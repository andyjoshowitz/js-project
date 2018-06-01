$(function(){
  $.ajaxSetup({
        cache: false,
    });
  let id = 1
  $("a.next_instructor").on("click", function(e){
    e.preventDefault();
    id =+ 1
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/instructors/${id}",
      data: $(this).serialize(),
      dataType: "json",
      success: function(instructor){
        debugger

      }
    })
  })
})

  //e.preventDefault();

// $(document).ready(function() {
//   showInstructor();
// });
