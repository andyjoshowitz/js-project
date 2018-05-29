/*$(function(){
  $.ajaxSetup({
        cache: false,
    });
    //e.preventDefault();
    $.ajax({
      method: "GET",
      url: this.action,
      data: $(this).serialize(),
      dataType: "json",
      success: function(json){
      json.forEach(function(course){
        text = '<h2><a class="js-course-show" href="/courses/' + course.id + '">' + course.title + '</a></h2>';
        text += '<p>' + course.description.substring(0, 50) + '...';
        text += '<a class="js-course-show" href="/courses/' + course.id+ '">Read More</a></p>';
        text += '<small class="course-meta">' + 'by' + ' ' + course.user.email + ' ' +'-' + ' ' + course.created_at +
                '</small>';
        $("#indexCourses").append('<li>' + text + '</li>');
      })
    }
  })
})*/
