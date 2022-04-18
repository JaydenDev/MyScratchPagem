// if url arguments contains user, run fetchData on the user
if (window.location.href.split('?')[1] !== undefined) {
    const user = window.location.href.split('?')[1].split('=')[1];
    document.getElementById('input').value = user;
    fetchData();
}