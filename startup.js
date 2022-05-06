if (localStorage.getItem('seen') === 'true') {
    $('#notification').addClass('hidden');
}

function closePopup() {
    $('#notification').addClass('hidden');
    localStorage.setItem('seen', 'true');
}

if (logging === "true") {
    console.log(localStorage.getItem('seen'))
}

if (window.location.href.split('?')[1] !== undefined) {
    const user = window.location.href.split('?')[1].split('=')[1];
    document.getElementById('input').value = user;
    fetchData();
}

if (window.location.href.split('?')[1] !== undefined) {
    if (window.location.href.split('?')[1].split('=')[0] === 'logging') {
        if (window.location.href.split('?')[1].split('=')[1] === 'true') {
            logging = "true";
        }
    }
}