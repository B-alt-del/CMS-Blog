// MATERIALIZE INIT
document.addEventListener('DOMContentLoaded', function () { M.AutoInit() })
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
});

// // SAVE POSTS TO DATABASE
// const post_btn = document.getElementById('post_btn');
// function savePost(event) {
//     // event.preventDefault();
//     const post_title = document.getElementById('enter_title').value;
//     const post_content = document.getElementById('enter_content').value;

// console.log('here' + post_title)

//     const new_post = {
//         title: post_title,
//         // topic_name: select_topic.innerText,
//         content: post_content
//     }
//     console.log(new_post)

//     fetch('/posts/create-post', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'content-type': 'application/json'
//         },
//         body: {
//             title: post_title,
//             content: post_content
//         }
//     })
//     document.location.replace('/')
// }

// post_btn.addEventListener('click', savePost);