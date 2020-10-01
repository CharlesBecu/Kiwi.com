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
var lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed amet nisi alias inventore rerum expedita laudantium explicabo nulla aut, illo itaque cumque nobis nemo accusantium beatae voluptatibus, fugit repudiandae hic.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed amet nisi ";

function jobAd(id = '0',
    titre = "Dévelopeur Front-end Angular",
    entreprise = "Alphabet",
    lieu = "Nice, France",
    primaryTag = [],
    secondaryTag = [],
    salaire = "25k€ - 30k€ par an",
    preview = lorem) {

    /// 
    /// 
    /// Ajouter tags en fonction du nombre de tags de chaque type.
    /// 
    /// 
    return `
    <article class='jobAd' data-id="${id}">
        <div class='jobAdCorpse'>
            <div class='jobAdTitle'>
                <h4>${titre}</h4>
                <h5>@ ${entreprise}, ${lieu}</h5>
            </div>
            <div class='jobAdSubTitle'>
                <h5>
                    <a href="#" class="badge badge-primary">Angular</a>
                    <a href="#" class="badge badge-secondary">Bootstrap</a>
                </h5>
                <h5>${salaire}</h5>
            </div>
            <div class='jobAdPreview'>
                <p>${preview}</p>
            </div>
        </div>
        <img alt="" src="../Img/look.png" class="jobAdMore" />
    </article>
    `;
}
globalThis.spinner = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';