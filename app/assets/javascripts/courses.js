$(function(){

  $.ajaxSetup({
        cache: false,
    });

    $.get(this.href).success(function(json){

      var courses = $(".courses")
      courses.html("")

      json.forEach(function(course){
        text = '<a class="js-course-show" href="/courses/' + course.id + '">' + course.title + '</a>';
        text += '<p class="course-meta">' + 'by' + ' ' + story.user.email + ' ' +'-' + ' ' + courses.created_at +
                ' ' + '<span class="badge">' + course.reviews_count + ' ' +'reviews' + '</span></p>';
        text += '<p>' + course.description.substring(0, 50) + '...';
        text += '<a class="js-course-show" href="/courses/' + course.id+ '">Read More</a></p>';
        $courses.append(text);
      })
   })

})
