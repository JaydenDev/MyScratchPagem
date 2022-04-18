const disallowedChars = ['<', '>', '&', '"', '\''];

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
// use jquery if button id go is clicked then fetchData is called
$(document).ready(function() {
    $('#go').click(function() {
        fetchData();
        // remove class 'invisible' from id usercontent
        $('#usercontent').removeClass('invisible');
        // remove the novalerr id element
        $('#novalerr').remove();
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
    fetch('https://aviateapp.eu.org/api/' + input)
        .then(res => res.json())
        .then(data => {
            // if the api cannot be reached, set aviate to 'N/A'
            if (data.error) {
                document.getElementById("aviate").innerText = "N/A";
            }
            const { status } = data;
            document.querySelector('#aviate').innerText = status;
            // if status doesn't get defined, display error message
            if (status === undefined) {
                document.querySelector('#aviate').innerText = 'Aviate status not set';
            }
        });
    document.querySelector('#username').innerText = input;
    // Made by @webdev03
    fetch('https://scratchdb.lefty.one/v3/forum/user/info/' + document.querySelector('#input').value, )
        .then(res => res.json())
        .then(data => {
            // Get the counts
            const counts = data.counts;
            const total = data.counts.total.count;
            const original_sig = data.signature;
            // if counts is undefined make an alert that ScratchDB is down
            if (counts === undefined) {
                alert("ScratchDB is down");
            }
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
            // remove all images from sig
            let sigWithoutImages = original_sig.replace(/<img[^>]*>/g, "");
            // remove all links from sig
            let sig = sigWithoutImages.replace(/<a[^>]*>/g, "");
            // remove all html tags from sig
            sig = sig.replace(/<[^>]*>/g, "");
            // remove underscores and arrows from sig
            sig = sig.replace(/[\u00A0-\u9999<>\&]/gim, '');
            document.querySelector('#signature').innerText = sig;
            // if sig is empty, display N/A
            if (sig == "") {
                document.querySelector('#signature').innerText = "Not set, or only contains images";
            }
        });

    const img = "https://my-ocular.jeffalo.net/api/user/" + input + "/picture";
    $('#pfp').attr('src', img);
}

// if url argument "user" is not empty, parse it
if (window.location.href.split('?')[1] !== undefined) {
    const user = window.location.href.split('?')[1].split('=')[1];
    document.getElementById('input').value = user;
    fetchData();
}

function closePopup() {
    // remove div by id popup
    $('#popup').remove();
    // save popup state to local storage
    localStorage.setItem('popup', 'false');
}

// if popup state is true, display popup if not, hide popup
if (localStorage.getItem('popup') === 'true') {
    $('#popup').removeClass('invisible');
} else {
    $('#popup').addClass('invisible');
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
    // for debug
    document.getElementById("signature").innerText = sig;
}

// if url arguments contains user, run fetchData on the user
if (window.location.href.split('?')[1] !== undefined) {
    const user = window.location.href.split('?')[1].split('=')[1];
    document.getElementById('input').value = user;
    fetchData();
}