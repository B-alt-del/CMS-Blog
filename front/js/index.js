// MATERIALIZE INIT
document.addEventListener('DOMContentLoaded', function () { M.AutoInit() })
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
});

//get posts

function fetchPosts() {
    fetch('/posts')
        .then(res => res.json()
        // console.log('worked')
        )
            // .then(data => {
            //     let posts_data = data;
            //     outputPosts(posts_data);
            // })
        }

fetchPosts()