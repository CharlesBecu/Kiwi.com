$(function() {
    $('.login input, .signin input').hide();
    $('#login').click(function(e) {
        e.stopPropagation();
        $('#signin .signin input').hide(1000, () => { $('#signin').removeClass('form-button'); });
        $(this).addClass('form-button');
        $('#login .login input').show(1000);

    });
    $('#signin').click(function(e) {
        e.stopPropagation();
        $('#login .login input').hide(1000, () => { $('#login').removeClass('form-button'); });
        $(this).addClass('form-button');
        $('#signin .signin input').show(1000);
    });
    $('body').click(function() {
        $('.login input, .signin input').hide(1000, () => { $(this).removeClass('form-button'); });
    });
    $('#ssubmitLogin').click(function(e) {
        e.preventDefault();
        let mail = $('#smail').val();
        let pass = $('#spassword').val();
        let next = signin(mail, pass);
        if (next != 0) {
            bsModal('Be kept signed in ?', 'Would you like us to keep you signed in ? It will enable automatic connection when you will come back.', 'Yes', 'No', function() {
                cookie(mail, pass);
                window.open(next, "_self");
            }, function() {
                session(mail, pass);
                window.open(next, "_self");
            });
        } else {
            bsAlert(`Sorry, your input doesn't meet the requirements. Keep in mind that your email address must have the correct format example@abc.xyz and your password must contain more than 5 characters and at least one number and one symbol. Please try again.`, 15000);
        }
    });
    $('#lsubmitLogin').click(function(e) {
        e.preventDefault();
        let mail = $('#lmail').val();
        let pass = $('#lpassword').val();
        let next = connect(mail, pass);
        if (next != 0) {
            bsModal('Be kept signed in ?', 'Would you like us to keep you signed in ? It will enable automatic connection when you will come back.', 'Yes', 'No', function() {
                cookie(mail, pass);
                window.open(next, "_self");
            }, function() {
                session(mail, pass);
                window.open(next, "_self");
            });
        } else {
            bsAlert(`We couldn't identify you with this login/password. If you forgot your password you can <a href="reset.php" class="alert-link">reset it here</a>. If you haven't signed in yet, please click on 'Start now'.`);
        }
    });
    bsAlert(`Test mode. Login always succeeds and sign in aways failS.`);
});