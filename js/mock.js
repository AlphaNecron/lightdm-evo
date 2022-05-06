// lightdm-gab-gradient

if (!('lightdm' in window)) {
    document.title = "Evo - Live Demo";
    window.lightdm = {};
    lightdm.hostname ="evo";
    lightdm.sessions = [
        {
            key: "bspwm",
            name: "bspwm",
            comment: "no comment"
        },
        {
            key: "openbox",
            name: "Openbox",
            comment: "no comment"
        },
        {
            key: "plasma",
            name: "KDE Plasma",
            comment: "no comment"
        }
    ];
    lightdm.default_session = lightdm.sessions[0];
    lightdm.authentication_user = null;
    lightdm.is_authenticated = false;
    lightdm.can_suspend = true;
    lightdm.can_hibernate = true;
    lightdm.can_restart = true;
    lightdm.can_shutdown = true;
    lightdm.users = [
        {
            name: "necron",
            real_name: "Nguyen Thanh Quang",
            display_name: "AlphaNecron",
            image: "https://avatars.githubusercontent.com/u/57827456?v=4",
            language: "en_US",
            layout: null,
            session: "bspwm",
            logged_in: false
        },
        {
            name: "venus",
            real_name: "Nguyen Van Thanh Lam",
            display_name: "BayuLewis",
            image: "https://avatars.githubusercontent.com/u/68362244?v=4",
            language: "en_US",
            layout: null,
            session: "openbox",
            logged_in: false
        }
    ];
    lightdm.select_user = lightdm.users[0];
    lightdm.num_users = lightdm.users.length;
    lightdm.timed_login_delay = 0;
    lightdm.timed_login_user =
        lightdm.timed_login_delay > 0 ? lightdm.users[0] : null;
    lightdm.get_string_property = () => {};
    lightdm.get_integer_property = () => {};
    lightdm.get_boolean_property = () => {};
    lightdm.cancel_timed_login = function () {
        _lightdm_mock_check_argument_length(arguments, 0);
        lightdm._timed_login_cancelled= true;
    };

    lightdm.respond = function (secret) {
        if (typeof lightdm._username == 'undefined' || !lightdm._username) {
            show_error("start_authentication must be called first!");
        }
        _lightdm_mock_check_argument_length(arguments, 1);
        user = _lightdm_mock_get_user(lightdm.username);
        if (!user && secret == lightdm._username) {
            lightdm.is_authenticated = true;
            lightdm.authentication_user = user;
        } else {
            lightdm.is_authenticated = false;
            lightdm.authentication_user = null;
            lightdm._username = null;
        }
        authentication_complete();
    };

    lightdm.start_authentication = function (username) {
        _lightdm_mock_check_argument_length(arguments, 1);
        if (lightdm._username)
            show_error("Already authenticating!");
        user = _lightdm_mock_get_user(username);
        if (!user)
            show_error(username + " is an invalid user");
        lightdm._username = username;
    };

    lightdm.cancel_authentication = function() {
        _lightdm_mock_check_argument_length(arguments, 0);

        if (!lightdm._username)
            show_error("Not authenticating");
        lightdm._username = null;
    };

    lightdm.suspend = () =>
        show_message("Suspending...");

    lightdm.hibernate = () =>
        show_message("Hibernating...");

    lightdm.restart = () =>
        show_message("Restarting...");

    lightdm.shutdown = () =>
        show_message("Shutting down...");

    lightdm.start_session_sync = function (session) {
        _lightdm_mock_check_argument_length(arguments, 1);
        if (!lightdm.is_authenticated)
            show_error("The system is not authenticated");
        else if (user !== lightdm.authentication_user)
            show_error("This user is not authenticated");
        else if (!session) show_error("Invalid session!");
        else show_message("Logged in successfully!");
        document.location.href = "https://xwork.space";
    };

    if (lightdm.timed_login_delay > 0) {
        setTimeout(
            () => {
                if (!lightdm._timed_login_cancelled()) timed_login();
            },
            lightdm.timed_login_delay
        );
    }
}

const _lightdm_mock_check_argument_length = (args, length) => {
    if (args.length != length) {
        show_prompt("Incorrect number of arguments in function call");
    }
};

const _lightdm_mock_get_user = username => lightdm.users.find(user => user.name === username);
