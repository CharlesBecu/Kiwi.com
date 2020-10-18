import { Component, OnInit, HostListener, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthJsModule } from 'src/app/auth-js/auth-js.module';
import { VariablesGlobales } from 'src/app/var-globales';
declare var $: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})


export class AuthComponent implements OnInit {
  // box: boolean;
  o = false;
  loadSign = false;
  loadLog = false;
  validator = [];
  // @ViewChild('sp') sp;
  @ViewChild('sm') sm;
  @ViewChild('e') e;
  @ViewChild('p') pass;
  posted = false;

  constructor(
    private router: Router,
    // private authJs: AuthJsModule,
    private p: VariablesGlobales
  ) {
    // this.box = false;
  }

  ngOnInit(): void {
    $('.login input, .signin input').hide();
    $('form').on('click', (e) => { e.stopPropagation(); });
  }

  open(l): void {
    this.o = true;
    if ($(l).hasClass('form-button')) {
      $(l).children('form').children().hide(1000, () => {
        $('.form-button').toggleClass('form-button');
      });
    }
    else {
      const f = $('.form-button');
      f.children('form').children().hide(1000, () => { f.removeClass('form-button'); });
      $(l).addClass('form-button');
      $(l).children('form').children().show(1000);
    }
  }

  @HostListener('click', ['$event'])
  handleExtClick(event: any): void {
    if (!this.o) {
      $(event.target).children('#auth').children('div').children('.form-button').children('form').children().hide(1000, () => { $('.form-button').toggleClass('form-button'); });
    }
    this.o = false;
  }
  bsAlert(a, duration = 1000): void {
    const txt = `<div class="alert alert-danger fade show" role="alert">${a}</div>`;
    const el = $(txt);
    el.prependTo('body');
    setTimeout((e) => {
      el.alert('close');
    }, duration);
  }

  logIn(e, mail, pass): void {
    e.preventDefault();
    if (this.validator[7] && this.validator[8]) {
      this.loadLog = true;
      this.p.getUserToken(
        mail,
        pass,
        (response) => {
          localStorage.setItem('token', response);
          this.router.navigate([{ outlets: { primary: 'dashboard', h: null } }]);
        },
        (response) => {
          this.bsAlert('Incorrect login info');
        }
      );
    }
  }
  preSign(e): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.validator[5]) {
      this.e.nativeElement.value = this.sm.nativeElement.value;
      // this.pass.nativeElement.value = this.sp.nativeElement.value;
      this.validator[3] = true;
      // this.validator[4] = true;
      // this.authJs.bsModalSet();
      $('.modal.sign').modal('show');
      this.posted = false;
    }
  }
  signBox(e, val): void {
    e.preventDefault();
    // alert('yo');
    if (!this.validator.slice(0, 5).includes(false) && !this.validator.slice(0, 5).includes(null)) {
      // alert(JSON.stringify(val));
      this.loadSign = true;
      const values = val;
      // console.log(values);
      values.level = 0;
      this.p.postUser(
        values,
        () => {
          this.loadSign = false;
          this.posted = true;
        },
        () => {
          this.bsAlert('Sorry, we couldn\'t create your account.');
          this.loadSign = false;
        });
    }
  }
  goToLog(l): void {
    $('.modal.sign').modal('hide');
    $(l).click();
  }
  check(value: any, n: number): void {
    switch (n) {
      case 0:
      case 1:
        if (value === '') {
          this.validator[n] = null;
        } else {
          this.validator[n] = /^[a-zA-Z][a-zA-Z-' ]{1,}$/.test(value);
        }
        break;

      case 2:
        if (value === '') {
          this.validator[n] = null;
        } else {
          const age = Date.now() - new Date(value).getTime();
          const valid = age / (1000 * 86400 * 364.25 * 16) >= 1;
          this.validator[n] = valid;
        }

        break;

      case 3:
      case 5:
      case 7:
        if (value === '') {
          this.validator[n] = null;
        } else {
          this.validator[n] = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        }
        break;

      case 4:
      case 6:
      case 8:
        if (value === '') {
          this.validator[n] = null;
        } else {
          this.validator[n] = /(?=.*\W+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+)(?:\S{8,})/.test(value);
        }
        break;

      default:
        break;
    }
  }
}
