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


function cookie(a, b) {
    localStorage.setItem('mail', a);
    localStorage.setItem('password', 'b');
}

function session(a, b) {
    document.cookie = `mail=${a}; SameSite=None; Secure;`;
    document.cookie = `password=${b}; SameSite=None; Secure;`;
}

function connect(mail, pass) {
    //Function
    return 'dashboard/index.html';
}

function signin(mail, pass) {
    //Function
    return 0;
}

globalThis.spinner = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';