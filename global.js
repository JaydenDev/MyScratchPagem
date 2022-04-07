// use jquery so that when enter is pressed in the input field, fetchData is called
$(document).ready(function() {
    $('#input').keypress(function(e) {
        if (e.which == 13) {
            fetchData();
            // remove class 'invisible' from id usercontent
            $('#usercontent').removeClass('invisible');
            // remove the novalerr id element
            $('#novalerr').remove();
        }
    });
});

function fetchData() {
    const input = document.getElementById('input').value;
    fetch('https://my-ocular.jeffalo.net/api/user/' + input)
        .then(res => res.json())
        .then(data => {
            // if the user is not found, display error message
            if (data.error) {
                alert("invalid user");
                $('#input').val('');
            }
            const { color, status } = data;
            document.getElementById("motd").innerText = status;
            document.getElementById("username").style.color = color;
        });
    document.querySelector('#username').innerText = input;
    // Made by @webdev03
    fetch('https://scratchdb.lefty.one/v3/forum/user/info/' + document.querySelector('#input').value, )
        .then(res => res.json())
        .then(data => {
            // Get the counts
            const counts = data.counts;
            const total = data.counts.total.count;
            // Get the keys in the counts object, and then reverse it
            let keys = Object.keys(counts).reverse();
            // The reason why we reverse it is to use .pop which removes the last element (since it is reversed, the first element, which is "total")
            keys.pop();
            // Define the variables
            let mostPostedForum = "N/A";
            let mostPostedForumCount = 0;
            // Loop through all the forums
            for (let i = 0; i < keys.length; i++) {
                // If the forum looped has more posts than the mostPostedForumCount then that is the most posted currently so set the variable
                // It will still continue through all the forums, then the one with the most posts is found
                if (counts[keys[i]].count > mostPostedForumCount) {
                    mostPostedForum = keys[i];
                    mostPostedForumCount = counts[keys[i]].count;
                }
            }
            // mostPostedForum and mostPostedForumCount
            // set id totalPosts to the total value
            document.getElementById("totalPosts").innerText = total;
            document.querySelector('#mostPostedForum').innerText = mostPostedForum;
            console.log(total);
        });

    const img = "https://my-ocular.jeffalo.net/api/user/" + input + "/picture";
    $('#pfp').attr('src', img);
}