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
        let next = connect(0, mail, pass);
        if (next != 0) {
            bsModal('Be kept signed in ?', 'Would you like us to keep you signed in ? It will enable automatic connection when you will come back.', 'Yes', 'No', function() {
                cookie(mail, pass);
                window.open(next, "_self");
            }, function() {
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
        let next = connect(1, mail, pass);
        if (next != 0) {
            bsModal('Be kept signed in ?', 'Would you like us to keep you signed in ? It will enable automatic connection when you will come back.', 'Yes', 'No', function() {
                cookie(mail, pass);
                window.open(next, "_self");
            }, function() {
                window.open(next, "_self");
            });
        } else {
            bsAlert(`We couldn't identify you with this login/password. If you forgot your password you can <a href="reset.php" class="alert-link">reset it here</a>. If you haven't signed in yet, please click on 'Start now'.`);
        }
    });
    bsAlert(`Test mode. Login always succeeds and sign in aways failS.`);
});

function connect(type, mail, pass) {
    if (type) {

    } else if (!type) {

    }
    return type;
}

function cookie(a, b) {
    document.cookie = `mail=${a};`;
    document.cookie = `password=${b};`;
}

function bsAlert(a = 'Error. Please Try again', duration = 5000) {
    let txt = `
    <div class="alert alert-danger fade show" role="alert">${a}</div>
    `
    let el = $(txt);
    el.prependTo('body');
    setTimeout(function() {
        el.alert('close');
    }, duration);
}

function bsModal(titre, corps, successbtn, failbtn, success, fail) {
    let txt = `
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">${titre}</h5>
                </div>
                <div class="modal-body">${corps}</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"><span id="bs-Modal-Custom-Fail-Btn">${failbtn}</span></button>
                    <button type="button" class="btn btn-primary bs-Modal-Custom-Success-Btn">${successbtn}</button>
                </div>
            </div>
        </div>
    </div>`;
    $(txt).prependTo('body');
    $('.modal').modal('show');
    $('.modal').click(function(e) {
        e.stopPropagation();
        if ($(document.elementFromPoint(e.clientX, e.clientY)).hasClass('bs-Modal-Custom-Success-Btn')) {
            $('.modal').on('hidden.bs.modal', success);
            $('.modal').modal('hide');
        } else if (
            $(document.elementFromPoint(e.clientX, e.clientY)).hasClass('modal') ||
            $(document.elementFromPoint(e.clientX, e.clientY)).hasClass('btn-secondary')
        ) {
            $('.modal').on('hidden.bs.modal', fail);
            $('.modal').modal('hide');
        }
    });


}