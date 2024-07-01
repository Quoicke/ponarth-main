!(function(a, b, c, d) {
  function e() {
    a("body").removeClass("av-resolved"),
      a("body").removeClass("av-unresolved"),
      a("html").removeClass("av-resolved"),
      a("html").removeClass("av-unresolved"),
      a("body").addClass("av-hidden"),
      a("html").addClass("av-hidden"),
      a("#av-wrap").css({
        opacity: 0
      }),
      a(b).off("resize"),
      setTimeout(function() {
        a("#av-wrap").remove();
      }, 330);
  }
  function f() {
    var b = !1;
    if ("birthday" == y.mode) {
      var c = new Date(),
        e = new Date();
      c.setDate(a("#select-day").val()),
        c.setMonth(a("#select-month").val()),
        c.setYear(a("#select-year").val()),
        e.getTime() - c.getTime() > 365 * y.minimum_age * 24 * 60 * 60 * 1e3 &&
          (b = !0);
    }
    if (
      ("age" == y.mode &&
        parseInt(a("#field-age").html(), 10) >= y.minimum_age &&
        (b = !0),
      "confirmation" == y.mode &&
        a("#form-confirm-checkbox").hasClass("form-confirm-checkbox-checked") &&
        (b = !0),
      b &&
        a.age_verifier_user_verified != d &&
        (a.age_verifier_user_verified(), s()))
    ) {
      if (1 == parseInt(localStorage.age_verifier_preview, 10))
        return (localStorage.age_verifier_preview = 0), b;
      (localStorage.ageVerifierId = a.age_verifier_id),
        (localStorage.ageVerifierDate = new Date().getTime());
    }
    return b;
  }
  function g() {
    a("#av-error").addClass("av-error-visible");
  }
  function h() {
    b.location.href = y.safe_url;
  }
  function i() {
    var b = new Date();
    a("#select-year").val(b.getFullYear()),
      a("#select-month").val(b.getMonth()),
      a("#select-day").val(b.getDate()),
      a(".birthday-select").chosen({
        width: "100%",
        disable_search_threshold: 1e6
      });
  }
  function j() {
    a(b).on("resize", function() {
      "age" == y.mode && k();
    }),
      a("#slider-age-wrap").on("mousedown", function(a) {
        A || D || ((D = !0), m(), n(a));
      }),
      a(c).on("mousemove", function(a) {
        A || (D && n(a));
      }),
      a(c).on("mouseup", function(a) {
        A || (D && ((D = !1), o()));
      }),
      a("#slider-age-wrap").on("touchstart", function(a) {
        (A = !0), D || ((D = !0), m(), n(a));
      }),
      a(c).on("touchmove", function(a) {
        (A = !0), D && n(a);
      }),
      a(c).on("touchend", function(a) {
        (A = !0), D && ((D = !1), o());
      });
  }
  function k() {
    (H = a("#slider-age-bar")),
      (B = a("#slider-age").offset().left),
      (C = a("#slider-age").width()),
      (I = a("#field-age"));
  }
  function l() {
    var b = parseInt(a("#field-age").data("initial-age"), 10),
      c = 100 * b / (K - J) + 0;
    H.css({
      width: c + "%"
    }),
      (F = c),
      I.html(b);
  }
  function m() {
    k(), a("#slider-age").addClass("slider-dragging");
  }
  function n(a) {
    var b = 0;
    b = a.pageX != d ? a.pageX : a.originalEvent.touches[0].pageX;
    var c = B,
      e = C,
      f = 100 * (b - c) / e;
    (f = f > 100 ? 100 : f), (f = 0 > f ? 0 : f), (G = f), p();
  }
  function o() {
    a("#slider-age").removeClass("slider-dragging");
  }
  function p() {
    E == d &&
      (E = setInterval(function() {
        Math.abs(F - G) > 0.1
          ? ((F = r(F, G, 0.3)),
            H.css({
              width: F + "%"
            }),
            I.html(Math.round(J + F * (K - J) / 100)))
          : (clearInterval(E), (E = d));
      }, 16));
  }
  function q() {
    var b = a(".av-content-node"),
      c = b.length,
      d = c - 1,
      e = 100;
    "slide" == y.animation && (e = 160);
    var f = setInterval(function() {
      d >= 0
        ? (a(b[d]).removeClass("av-unresolved-content"), d--)
        : clearInterval(f);
    }, e);
  }
  function r(a, b, c) {
    return (1 - c) * a + c * b;
  }
  function s() {
    try {
      var a = b.localStorage,
        c = "__storage_test__";
      return a.setItem(c, c), a.removeItem(c), !0;
    } catch (d) {
      return console.log("Local storage is NOT supported!"), !1;
    }
  }
  function t(a) {
    var b = "",
      c = "";
    "birthday" == a.mode && (c = u()),
      "age" == a.mode && (c = v()),
      "confirmation" == a.mode && (c = w()),
      (a.text = a.text.replace(/\\n/g, "<br>")),
      (a.text = a.text.replace(/\n/g, "<br>"));
    var d = "";
    "pop_in" == a.animation && (d = "av-animation-pop-in"),
      "slide" == a.animation && (d = "av-animation-slide");
    var e = a.error_message.replace("[age]", a.minimum_age),
      f = "background-color: " + a.background + "; ";
    "image" == a.background_type &&
      (f += "background-image: url(" + a.background_image_url + ")");
    var g = "color: " + a.text_color,
      b = "";

    return (
      (b +=
        '<div id="av-wrap" class="' + d + '" style="' + f + "; " + g + '">'),
      (b += '    <div id="av-inner-scroll-wrap">'),
      (b += '    <div id="av-inner">'),
      (b += '        <div id="av-content">'),
      (b += '            <div id="av-title" class="av-content-node">'),
      (b += "                " + a.title),
      (b += "            </div>"),
      (b += '            <div id="av-text" class="av-content-node">'),
      (b += "                " + a.text),
      (b += "            </div>"),
      (b += '            <div id="av-form" class="av-content-node">'),
      (b += "                " + c),
      (b += "            </div>"),
      (b += "            <br />"),
      (b += '            <div id="av-submit" class="av-content-node">'),
      (b += "                " + a.submit_text),
      (b += "            </div><br>"),
      (b += '            <div id="av-error" class="av-content-node">'),
      (b += '               <div id="av-error-inner">'),
      (b += '                   <div id="av-error-icon">'),
      (b +=
        '                       <div class="glyphicon glyphicon-ban-circle"></div>'),
      (b += "                   </div>"),
      (b += "                   " + e),
      (b += "               </div>"),
      (b += "            </div>"),
      (b += "        </div>"),
      (b += "    </div>"),
      (b += "    </div>"),
      (b += "</div>")
    );
  }
  function u() {
    var a = "";
    (a += '<div id="form-birthday">'),
      (a += '    <div id="form-birthday-inner">'),
      (a += '        <div class="birthday-select-wrap av-first">'),
      (a += '            <select id="select-day" class="birthday-select">');
    for (var b = 1; 31 >= b; b++)
      a += '                <option value="' + b + '">' + b + "</option>";
    (a += "            </select>"),
      (a += "        </div>"),
      (a += '        <div class="birthday-select-wrap">'),
      (a += '            <select id="select-month" class="birthday-select">'),
      (a += '                <option value="0">January</option>'),
      (a += '                <option value="1">February</option>'),
      (a += '                <option value="2">March</option>'),
      (a += '                <option value="3">April</option>'),
      (a += '                <option value="4">May</option>'),
      (a += '                <option value="5">June</option>'),
      (a += '                <option value="6">July</option>'),
      (a += '                <option value="7">August</option>'),
      (a += '                <option value="8">September</option>'),
      (a += '                <option value="9">October</option>'),
      (a += '                <option value="10">November</option>'),
      (a += '                <option value="11">December</option>'),
      (a += "            </select>"),
      (a += "        </div>"),
      (a += '        <div class="birthday-select-wrap av-last">'),
      (a += '            <select id="select-year" class="birthday-select">');
    for (var c = new Date().getFullYear(), b = c; b > c - 110; b--)
      a += '                <option value="' + b + '">' + b + "</option>";
    return (
      (a += "            </select>"),
      (a += "        </div>"),
      (a += "    </div>"),
      (a += "</div>")
    );
  }
  function v() {
    var a = "";
    (a += '<div id="form-age">'),
      (a +=
        '    <div id="field-age" data-initial-age="' + y.minimum_age + '">'),
      (a += "        24"),
      (a += "    </div>"),
      (a += '    <div id="slider-age-wrap">');
    var b = x(y.text_color);
    return (
      (a +=
        '        <div id="slider-age" style="background: rgba(' +
        b.r +
        "," +
        b.g +
        "," +
        b.b +
        ',0.35)">'),
      (a +=
        '           <div id="slider-age-bar" style="background: ' +
        y.text_color +
        '">'),
      (a +=
        '               <div id="slider-age-handle" style="background: ' +
        y.text_color +
        '"></div>'),
      (a += "           </div>"),
      (a += "        </div>"),
      (a += "    </div>"),
      (a += "</div>")
    );
  }
  function w() {
    var a = "";
    return (
      (a += '<div id="form-confirm">'),
      (a += '    <div id="form-confirm-checkbox">'),
      (a += "    </div>"),
      (a += '    <div id="form-confirm-text">'),
      (a += "        I am at least " + y.minimum_age + " years old."),
      (a += "    </div>"),
      (a += "</div>")
    );
  }
  function x(a) {
    var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
    return b
      ? {
          r: parseInt(b[1], 16),
          g: parseInt(b[2], 16),
          b: parseInt(b[3], 16)
        }
      : null;
  }
  var y = d,
    z = d,
    A = !1,
    B = 0,
    C = 0,
    D = !1,
    E = d,
    F = 0,
    G = 0,
    H = d,
    I = d,
    J = 1,
    K = 110;
  a.AgeVerifier = function(c) {
    (y = c), (z = t(y));
    var m = new Date().getTime();
    return s() &&
      parseInt(a.age_verifier_id, 10) ==
        parseInt(localStorage.ageVerifierId, 10) &&
      (0 == parseInt(localStorage.age_verifier_preview, 10) ||
        localStorage.age_verifier_preview === d) &&
      m / 1e3 - parseInt(localStorage.ageVerifierDate, 10) / 1e3 <
        86400 * parseInt(y.cookie_expiration, 10)
      ? void a("body, html").css({
          opacity: 1
        })
      : (a("body").addClass("av-unresolved"),
        a("html").addClass("av-unresolved"),
        a("body").prepend(z),
        a(".av-content-node").addClass("av-unresolved-content"),
        a("body").addClass("av-resolved"),
        a("html").addClass("av-resolved"),
        q(),
        (b.onload = function() {
          setTimeout(function() {
            scrollTo(0, -1);
          }, 0);
        }),
        "birthday" == y.mode && i(),
        "age" == y.mode && (j(), k(), l()),
        a("#av-submit").on("click", function() {
          f() ? e() : 1 == parseInt(y.safe_url_enabled, 10) ? h() : g();
          // setTimeout(()=>{
          //   window.location.href = "https://ladoshki39.ru/magazin/folder/detskoye-pitaniye-i-kormleniye"
          // },2000)
        }),
        void a("#form-confirm").on("click", function() {
          a("#form-confirm-checkbox").toggleClass(
            "form-confirm-checkbox-checked"
          );
        }));
  };
})(jQuery, window, document);

$(document).ready(function() {
  $.age_verifier_id = "28915";
  $.age_verifier_ajax_url = "http://selectoil.com/wp-admin/admin-ajax.php";
  $.AgeVerifier({
    enabled: "1",
    mode: "age",
    minimum_age: "18",
    cookie_expiration: "365",
    animation: "slide",
    title: "Добро пожаловать на сайт пивоваренной компании Ponarth. Пожалуйста, подтвердите свой возраст",
    text: "",
    background: "black",
    background_type: "color",
    background_image_url:
      "http://selectoil.com/wp-content/uploads/2017/06/icon-logo.png",
    text_color: "#ffffff",
    submit_text: "Подтвердить",
    error_message: "Упссс, кажется вы еще совсем малыш... Вам идеально подойдет данный сайт redirect https://ladoshki39.ru/magazin/folder/detskoye-pitaniye-i-kormleniye",
    safe_url: "",
    safe_url_enabled: "0"
  });
});
