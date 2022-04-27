const disallowedChars = ['<', '>', '&', '"', '\''];

$(document).ready(function() {
    $('#input').keypress(function(e) {
        if (e.which == 13) {
            fetchData();
            $('#usercontent').removeClass('hidden');
        }
    });
});

function fetchData() {
    const input = document.getElementById('input').value;
    fetch('https://my-ocular.jeffalo.net/api/user/' + input)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                $('#notification').removeClass('hidden');
                $('#notification').removeClass('bg-blue-500');
                $('#notification').addClass('bg-red-500');
                $('#notification').text("Specified user not found");
                $('#notification').addClass('animate-pulse');
                $('#usercontent').addClass('hidden');
                setTimeout(function() {
                    $('#notification').addClass('hidden');
                }
                , 2000);
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
            const sig = data.signature;
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
            document.querySelector('#topForum').innerText = mostPostedForum;
            document.getElementById("totalPosts").innerText = total;
            document.querySelector('#signature').innerHTML = sig;
        });

    const img = "https://my-ocular.jeffalo.net/api/user/" + input + "/picture";
    $('#pfp').attr('src', img);
}

function refreshStat() {
    const input = document.getElementById('input').value;
    fetch('https://my-ocular.jeffalo.net/api/user/' + input)
        .then(res => res.json())
        .then(data => {
            // if the user is not found, display error message
            if (data.error) {
                alert("invalid user");
                $('#input').val('');
            }
            const { status } = data;
            document.getElementById("motd").innerText = status;
        });
    // if sig contains characters that are not allowed, remove them
    for (let i = 0; i < disallowedChars.length; i++) {
        sig.replace(disallowedChars[i], '');
    }
    document.getElementById("signature").innerText = sig;
}
