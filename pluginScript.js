const sessionKey = 'dPixivSession';
const siteUrl = 'https://dpixiv.herokuapp.com';
const mainPage = siteUrl + '/'

const saveSession = (session) => {
    window.localStorage.setItem(sessionKey, session);
}

const loadSession = () => {
    window.localStorage.getItem(sessionKey);
}

const getToken = (callback) => {
    return grecaptcha.enterprise.ready(() => {
        grecaptcha.enterprise.execute(0, { action: 'accounts/login' }).then(callback)
    })
}

const getFormData = () => {
    const form = new FormData(document.forms[0]);
    const data = Object.fromEntries(form);
    const loginComponent = document.getElementById('LoginComponent');
    const inputs = loginComponent.getElementsByTagName('input');
    return Object.assign(data, {
        pixiv_id: inputs[0]?.value,
        password: inputs[1]?.value
    })
}

const buttonEvent = (e) => getToken(recaptcha_enterprise_score_token => {
    const data = Object.assign(getFormData(), { recaptcha_enterprise_score_token });
    showErrors(['Loading...'])
    fetch(siteUrl + "/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(res => {
            if (res.ok) {
                newButton.style.background = '#68bdb4';
                window.location.replace(mainPage);
            }
            else {
                const prevColor = newButton.style.background
                newButton.style.background = '#ff2563';
                setTimeout(() => {
                    newButton.style.background = prevColor;
                }, 5000)
                if (res.errors?.length) {
                    showErrors(res.errors)
                }
            }
        })
})

const createNewButton = () => {
    const dpixivButton = document.createElement('button');
    dpixivButton.className = 'signup-form__submit';
    dpixivButton.innerHTML = 'Login to dpixiv';
    dpixivButton.type = 'button';
    dpixivButton.style.cssText = 'margin-bottom: 8px; margin-top: 9px;'
    dpixivButton.addEventListener('click', buttonEvent)
    return dpixivButton
}

const createErrorBlock = () => {
    const block = document.createElement('ul');
    block.style.cssText = "margin: 8px auto; padding-left: 0px; list-style-type: none;"
    return block
}

const createErrorItem = (text) => {
    const err = document.createElement('li');
    err.style.cssText = "text-align: left; color: rgb(255, 255, 255); line-height: 1.5; font-size: 14px; padding: 13px 10px; margin: 0px auto 2px; width: 280px; background-color: rgba(187, 22, 22, 0.3); border-radius: 4px; border: medium none;"
    err.innerHTML = text;
    return err
}

const showErrors = (errors) => {
    errorBlock.innerHTML = "";
    for (const error of errors) {
        errorBlock.appendChild(createErrorItem(error))
    }
}

const getLoginButton = () => document.getElementsByClassName('signup-form__submit')[1];

const putNewBlock = (loginButton, NewButton) => {
    loginButton.parentNode.insertBefore(NewButton, loginButton);
}

const newButton = createNewButton()

const errorBlock = createErrorBlock()

const loginButton = getLoginButton()

if (loginButton) {
    putNewBlock(loginButton, errorBlock)
    putNewBlock(loginButton, newButton)
}
