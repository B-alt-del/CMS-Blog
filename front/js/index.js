// MATERIALIZE INIT
document.addEventListener('DOMContentLoaded', function() {
    const optionsModal = {
        onOpenStart: (event) => { 
            console.log('onOpenStart')
            console.log(event)
        }
    }



    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, optionsModal);
  });

function activeTab(id){
    ElTab = document.querySelector(`#${id}`);
    ElTab.classList.add('active')
}


function deletePost(id){
    fetch('/posts/delete-post/' + id,  {
        method: 'DELETE'
      })

    window.location.href = "/dashboard";
}

function toLoginPage(){
    console.log('function runs')
    window.location.href = "/login"
}
