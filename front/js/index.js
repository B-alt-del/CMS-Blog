// MATERIALIZE INIT
document.addEventListener('DOMContentLoaded', function () { M.AutoInit() })
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
});


function deletePost(id){
    fetch('/posts/delete-post/' + id,  {
        method: 'DELETE'
      })

    window.location.href = "/dashboard";
}