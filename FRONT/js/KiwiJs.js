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
    return 'dashboard.html';
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
        <img alt="" src="https://emmanuel.nuiro.me/kiwi/FRONT/Img/look.png" class="jobAdMore" />
    </article>
    `;
}

function setJobAdMoreClick(sheet) {
    $(".jobAdMore").off('click');
    $(".jobAdMore").click(function() {
        changeCSS(".jobAdMore", "height", getComputedStyle(this).height, sheet);
        changeCSS(".jobAdMore", "align-self", 'start', sheet);
        if ($(this).parent().hasClass("jobAddFull")) {
            $(".jobAd").removeClass("jobAddFull");
            $('.jobAdSelected .jobAdPreview p').html(getPreview());
            $(this).parent().removeClass("jobAdSelected");
        } else {
            $(".jobAd").removeClass("jobAddFull");
            $('.jobAdSelected .jobAdPreview p').html(getPreview());
            $(".jobAd").removeClass("jobAdSelected");
            let all = getComputedStyle(this).height;
            // changeCSS(".jobAdSelected", "height", all, sheet);
            changeCSS(".jobAdSelected > *", "align-self", 'start', sheet);
            $(this).parent().addClass("jobAdSelected", function() {
                $('.jobAdSelected .jobAdPreview p').html(spinner);
                // let p = getComputedStyle(document.querySelector('.jobAdSelected .jobAdPreview p')).height;
                // changeCSS(".jobAddFull .jobAdPreview p", "height", `calc(80vh - ${all} + ${p})`);
                // changeCSS(".jobAddFull .jobAdPreview p", "transition-duration", '9s');
                setTimeout(() => $(this).addClass("jobAddFull"), 10);
                setTimeout(() => $('.jobAddFull .jobAdPreview p').html(getDescription()), 20);
            });
        }
    });
}
globalThis.spinner = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

function getDescription() {
    return `

    $(".jobAdMore").click(function() {
        changeCSS(".jobAdMore", "height", getComputedStyle(this).height);
        changeCSS(".jobAdMore", "align-self", 'start');
        if ($(this).parent().hasClass("jobAddFull")) {
            $(".jobAd").removeClass("jobAddFull");
            $('.jobAddFull .jobAdPreview p').html = getPreview();
            $(this).parent().removeClass("jobAdSelected");
        } else {
            $(".jobAd").removeClass("jobAddFull");
            let all = getComputedStyle(this).height;
            changeCSS(".jobAdSelected", "height", all);
            $(this).parent().addClass("jobAdSelected", function() {
                $('.jobAdSelected .jobAdPreview p').html(spinner);
                let p = getComputedStyle(document.querySelector('.jobAdSelected .jobAdPreview p')).height;
                changeCSS(".jobAddFull .jobAdPreview p", "height", 2
     );
changeCSS(".jobAddFull .jobAdPreview p", "transition-duration", '9s');
setTimeout(() => $(this).addClass("jobAddFull"), 10);
setTimeout(() => $('.jobAddFull .jobAdPreview p').html(getDescription()), 1200);
});
}
`
}

function getPreview() {
    return lorem;
}

function refresh() {
    test();
    setJobAdMoreClick(4);
}

function changeCSS(typeAndClass, newRule, newValue, sheet) {
    var thisCSS = document.styleSheets[document.styleSheets.length - 1];
    var ruleSearch = thisCSS.cssRules ? thisCSS.cssRules : thisCSS.rules
    for (i = 0; i < ruleSearch.length; i++) {
        if (ruleSearch[i].selectorText == typeAndClass) {
            var target = ruleSearch[i]
            break;
        }
    }
    target.style[newRule] = newValue;
}

function spinnRefresh(sheet, verif = () => true) {
    gsap.to(".spinner-border", {
        onComplete: function() {
            refresh();
            // setJobAdMoreClick(sheet);
            this.kill();
            if (verif()) {
                spinnRefresh(sheet, verif);
            }
        },
        scrollTrigger: {
            trigger: "main",
            start: "bottom bottom", // the default values
            end: "bottom bottom",
        },
    });
}

function searchForAd(a, b) {

}

function headerPopover() {
    $("img.menu.profil-picture").popover({
        trigger: 'click',
        placement: $("img.menu.profil-picture").attr('data-placement'),
        html: true,
        template: ` <div class="popover">
                        <div class="popover-title">${$("img.menu.profil-picture").attr('data-title')}</div>
                        <div class="popover-content">${$("img.menu.profil-picture").attr('data-content')}</div>
                        <div class="popover-footer">${$("img.menu.profil-picture").attr('data-footer')}</div>
                    </div>`
    }).on('show.bs.popover', function() {
        $("[data-toggle=popover]").not(this).popover('hide');
    });
    $("img.menu.bell").popover({
        trigger: 'click',
        placement: $("img.menu.profil-picture").attr('data-placement'),
        html: true,
        template: ` <div class="popover">
                        <div class="popover-title">No notifications for now</div>
                        <div class="popover-content">Incoming notifications will be displayed here.</div>
                    </div>`
    }).on('show.bs.popover', function() {
        $("[data-toggle=popover]").not(this).popover('hide');
    });
}