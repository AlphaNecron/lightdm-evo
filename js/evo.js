const powerOperations = {
    "Shutdown": "&#xe9c0;",
    "Restart": "&#xe9c4;",
    "Hibernate": "&#xe9e2;",
    "Suspend": "&#xe9a3;"
};

let timeWidgetMode = 1;
let currentUser;
let currentSession;

function update_time() {
    $("dt").innerText = timeWidgetMode === 0 ? new Date().toLocaleDateString() : new Date().toLocaleTimeString();
}

this.addEventListener("load", () => {
    $("dt").addEventListener("click", () => {
        timeWidgetMode = timeWidgetMode === 0 ? 1 : 0;
        update_time();
    });
    document.querySelectorAll("[dropdown]").forEach(btn => {
        const dropdown = btn.attributes.dropdown.value;
        btn.addEventListener("click", () => $(dropdown).classList.toggle("show"));
    });
    update_time();
    setInterval(() => update_time(), 1000);
    Object.entries(powerOperations).filter(([o, _]) => lightdm[`can_${o.toLowerCase()}`]).forEach(([o, i]) => $("powermenu").appendChild(make_menu_item(`<p class="icon" style="display: inline">${i}</p> ${o}`, () => lightdm[o.toLowerCase()]())));
    lightdm.users.forEach(usr => $("user-dropdown").appendChild(make_menu_item(`<img src="${usr.image}" class="sm-avatar"></img>${usr.display_name}`, () => set_user(usr))));
    lightdm.sessions.forEach(s => $("session-list").appendChild(make_menu_item(s.name, () => set_session(s))));
    $("hostname").innerText = lightdm.hostname;
    set_user(lightdm.select_user || lightdm.users[0]);
});

function make_menu_item(inner, click) {
    const d = document.createElement("div");
    d.addEventListener("click", click);
    d.innerHTML = inner;
    return d;
}

function toast(title, isErr) {
    const toast = document.createElement("div");
    if (isErr) toast.className = "err";
    toast.innerHTML = title;
    toast.addEventListener("click", () => $("toast-container").removeChild(toast));
    $("toast-container").appendChild(toast);
    setTimeout(() => {
            [1, 0.75, 0.5, 0.25].forEach(x => setTimeout(() => toast.style.opacity = x, 25 / x));
            setTimeout(() => { if ($("toast-container").contains(toast)) $("toast-container").removeChild(toast) }, 125);
    }, 2000);
}

function authentication_complete() {
    $("login-btn").disabled = false;
    if (lightdm.is_authenticated)
        lightdm.start_session_sync(currentSession);
    else {
        if (lightdm._username) {
            lightdm.cancel_authentication();
        }
        if (currentUser) lightdm.start_authentication(currentUser.name);
        show_error("Wrong password!");
    }
}

function show_error(err) {
    toast(err, true);
}

function show_prompt(text, type) {
    if (type === "password") {
        $("password-box").innerText = "";
        $("password-box").focus();
    } else toast(text, false);
}

function show_message(msg) {
    toast(msg, false);
}

function provide_secret() {
    password = $("password-box").value || null;
    if (password !== null) {
        $("login-btn").disabled = true;
        lightdm.respond(password);
    }
}

window.addEventListener("click", e => {
    if (!e.target.attributes.dropdown)
        Array.from(document.getElementsByClassName("drop-container")).filter(drop => drop.classList.contains("show")).forEach(drop =>
            drop.classList.remove("show")
        );
});

function set_session(session) {
    currentSession = session;
    $("session").innerText = session.name;
}

function set_user(user) {
    currentUser = user;
    if (lightdm._username) {
        lightdm.cancel_authentication();
    }
    if (user) lightdm.start_authentication(user.name);
    set_session(currentUser.session ? lightdm.sessions.find(s => s.key === currentUser.session) : currentSession || lightdm.default_session);
    $("avatar").src = user.image;
    $("name").textContent = user.display_name;
    $("password-box").focus();
}

function $(id) {
    return document.getElementById(id);
}