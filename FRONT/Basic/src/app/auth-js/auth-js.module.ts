import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { VariablesGlobales } from 'src/app/var-globales';
declare var $: any;

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AuthJsModule {

  start(): void {
    // // $('*').on('load', (a) => console.log('load', a.target));
    // $('.login input, .signin input').hide();
    // // $('#login').on('click', (e) => {
    // //   e.stopPropagation();
    // //   $('#signin .signin input').hide(1000, () => { $('#signin').removeClass('form-button'); });
    // //   $('#login').addClass('form-button');
    // //   $('#login .login input').show(1000);

    // // });
    // $('#signin').on('click', (e) => {
    //   e.stopPropagation();
    //   $('#login .login input').hide(1000, () => { $('#login').removeClass('form-button'); });
    //   $('#signin').addClass('form-button');
    //   $('#signin .signin input').show(1000);
    // });
    $('body').on('click', (e) => {
      $('.login input, .signin input').hide(1000, () => { $(this).removeClass('form-button'); });
    });
    /*$('#ssubmitLogin').on('click', (e) => {
      e.preventDefault();
      const mail = $('#smail').val();
      const pass = $('#spassword').val();
      let valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail);
      valid = valid && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(pass);
      // const next = this.signin(mail, pass);
      if (valid) {
        this.bsModalS(
          () => {
            this.cookie(mail, pass);
            const event = new CustomEvent('preSign', { detail: 'next' });
            $('#lsubmitLogin')[0].dispatchEvent(event);
          },
          () => {
            this.session(mail, pass);
            const event = new CustomEvent('preSign', { detail: 'next' });
            $('#lsubmitLogin')[0].dispatchEvent(event);
          });
      } else {
        this.bsAlert(`Sorry, your input doesn't meet the requirements. Keep in mind that your email address must have the correct format example@abc.xyz and your password must contain more than 5 characters and at least one number and one symbol. Please try again.`, 15000);
      }
    });*/
    $('#lsubmitLogin').on('click', (e) => {
      e.preventDefault();
      const mail = $('#lmail').val();
      const pass = $('#lpassword').val();
      const next = this.connect(mail, pass);
      if (next !== 0) {
        /*this.bsModal('Be kept signed in ?', 'Would you like us to keep you signed in ? It will enable automatic connection when you will come back.', 'Yes', 'No',
          () => {
            this.cookie(mail, pass);
            const event = new CustomEvent('connex', { detail: next });
            $('#lsubmitLogin')[0].dispatchEvent(event);
          },
          () => {
            this.session(mail, pass);
            const event = new CustomEvent('connex', { detail: next });
            $('#lsubmitLogin')[0].dispatchEvent(event);
          });*/
      } else {
        this.bsAlert(`We couldn't identify you with this login/password. If you forgot your password you can <a href="reset.php" class="alert-link">reset it here</a>. If you haven't signed in yet, please click on 'Start now'.`);
      }
    });
    setTimeout(() => this.bsAlert(`Test mode. Login always succeeds and sign in aways failS.`), 2000);
  }

  bsAlert(a = 'Error. Please Try again', duration = 5000): void {
    const txt = `<div class="alert alert-danger fade show" role="alert">${a}</div>`;
    const el = $(txt);
    el.prependTo('body');
    setTimeout((e) => {
      el.alert('close');
    }, duration);
  }
  bsModalSet(): void {
    /*$('.modal.sign').on('click', (e) => {
      e.stopPropagation();
      if ($(document.elementFromPoint(e.clientX, e.clientY)).hasClass('bs-Modal-Custom-Success-Btn')) {
        // $('.modal').on('hidden.bs.modal', success);
        $('.modal.sign').modal('hide');
      } else if (
        $(document.elementFromPoint(e.clientX, e.clientY)).hasClass('modal') ||
        $(document.elementFromPoint(e.clientX, e.clientY)).hasClass('btn-secondary')
      ) {
        // $('.modal').on('hidden.bs.modal', fail);
        $('.modal.sign').modal('hide');
      }
    });*/
  }
  bsModal(titre: string, corps: string, successbtn: string, failbtn: string, success: () => any, fail: () => any): void {
    const txt = `<app-modal class="modal"></app-modal
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
      </div>
    `;
    $(txt).prependTo('app-auth');
    $('.modal.log').modal('show');
    $('.modal.log').on('click', (e) => {
      e.stopPropagation();
      if ($(document.elementFromPoint(e.clientX, e.clientY)).hasClass('bs-Modal-Custom-Success-Btn')) {
        $('.modal.log').on('hidden.bs.modal', success);
        $('.modal.log').modal('hide');
      } else if (
        $(document.elementFromPoint(e.clientX, e.clientY)).hasClass('modal') ||
        $(document.elementFromPoint(e.clientX, e.clientY)).hasClass('btn-secondary')
      ) {
        $('.modal.log').on('hidden.bs.modal', fail);
        $('.modal.log').modal('hide');
      }
    });


  }
}
