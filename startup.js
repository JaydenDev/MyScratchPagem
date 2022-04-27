// if localStorage value seen then hide id "notification"
if (localStorage.getItem('seen') === 'true') {
    $('#notification').addClass('hidden');
}

function closePopup() {
    $('#notification').addClass('hidden');
    localStorage.setItem('seen', 'true');
}

console.log(localStorage.getItem('seen'))

// if url argument "user" is not empty, parse it
if (window.location.href.split('?')[1] !== undefined) {
    const user = window.location.href.split('?')[1].split('=')[1];
    document.getElementById('input').value = user;
    fetchData();
}