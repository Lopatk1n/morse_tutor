window.onload = function () {
    try {
    let login = document.getElementById('login')
    login.addEventListener('click', showLoginForm)
    } catch(e){};


    function showLoginForm() {
        document.getElementById('loginform').style.display = 'block'
        setTimeout(function () {
            document.getElementById('loginformInner').classList.add('_active');
            document.getElementById('signinformInner').classList.add('_active');

        }, 20)

    }
}
window.onclick = function (event) {
    background = document.getElementById('loginform');
    if (event.target == background) {
        background.style.display = "none";
        document.getElementById('loginformInner').classList.remove('_active');
        document.getElementById('signinformInner').classList.remove('_active');
    }
    dontHave = document.getElementById('dontHave');
    if (event.target == dontHave) {
        document.getElementById('loginformInner').classList.add('_reverse');
        document.getElementById('signinformInner').classList.add('_reverse');

    }
    IHave = document.getElementById('IHave');
    if (event.target == IHave) {
        document.getElementById('loginformInner').classList.remove('_reverse');
        document.getElementById('signinformInner').classList.remove('_reverse');

    }
    signInBtn = document.getElementById('signInBtn')
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    if (event.target == signInBtn) {
        fetch('/login/', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': `${getCookie('csrftoken')}`
            },
            body: JSON.stringify({ 'username': document.getElementById('usernameL').value, 'password': document.getElementById('passwordL').value })
        })
            .then((response) => {
                if (response.ok) {
                    window.location.reload()
                } else {
                    return response.json()
                }
            }).then((json) => alert(json['detail'])).catch((err) => {
                console.log(err.message)
            })
    }
    signUpBtn = document.getElementById('signUpBtn')
    if (event.target == signUpBtn) {
        fetch('/sign_up/', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': `${getCookie('csrftoken')}`
            },
            body: JSON.stringify({ 
                'username': document.getElementById('usernameS').value,
                'email': document.getElementById('emailS').value,
                'password': document.getElementById('passwordS').value })
        })
            .then((response) => {
                if (response.ok) {
                    window.location.reload()
                } else {
                    return response.json()
                }
            }).then((json) => alert(json['detail'])).catch((err) => {
                console.log(err.message)
            })
    }
}