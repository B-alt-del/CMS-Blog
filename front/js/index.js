// MATERIALIZE INIT
document.addEventListener('DOMContentLoaded', function () { M.AutoInit() })
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
});


function activeTab(id){
    // ElHomeTab = document.querySelector('#HomeTab');
    // ElDashboardTab = document.querySelector('#DashboardTab');
    // ElLoginTab = document.querySelector('#LoginTab');
    // ElRegisterTab = document.querySelector('#RegisterTab');

    ElTab = document.querySelector(`#${id}`);

    ElTab.classList.add('active')

    console.log(id);

}


function deletePost(id){
    fetch('/posts/delete-post/' + id,  {
        method: 'DELETE'
      })

    window.location.href = "/dashboard";
}