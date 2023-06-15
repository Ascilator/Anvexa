$(function () {
  // Intro animation

  // Slick slider
  $('.slider_container').slick({
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 1000,
    arrows: true,
    prevArrow: $('.arrow_prev'),
    nextArrow: $('.arrow_next'),
    variableWidth: true
  });

  $('.slider_logo')
    .children('.slider_body')
    .slick({
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      speed: 700,
      arrows: true,
      prevArrow: $('.logo_slider_prev'),
      nextArrow: $('.logo_slider_next'),
      dots: true,
      appendDots: $('.slider_dots'),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });

  $('.slider_bg').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: true,
    appendDots: $('.slider_bg_dots')
  });

  $('.menu_item')
    .children('.item_title')
    .click(function () {
      $(this).toggleClass('_active');
      $(this).siblings().slideToggle();
    });

  $('.hide_btn').click(function () {
    $('.invisible_cont').slideToggle();
    $(this).toggleClass('_active');
  });

  $('.burger').click(function () {
    $('.nav').toggleClass('_active');
    $(this).toggleClass('_active');
  });

  $('.main_link').click(function () {
    $(this).siblings('.hidden').slideToggle();
  });

  $('.drop_down_title').click(function () {
    if (!$(this).closest('.task_desc._disabled').length) {
      $(this).siblings('.drop_down_body').slideToggle();
    }
  });

  $('.drop_down_item').click(function () {
    $(this).parent().siblings('.drop_down_title').html($(this).html());
    $(this).parent().slideUp();
  });

  $('.warning').click(function () {
    $('.warning_popup').addClass('_active');
  });
  $('.warning_close').click(function () {
    $('.warning_popup').removeClass('_active');
  });

  tinymce.init({
    selector: '.rich_text_textarea',
    toolbar: 'bold italic underline',
    menubar: ''
  });

  //todo several dragndrops
  function dragNdrop() {
    $('.drag_n_drop_input').on(
      'drag dragstart dragend dragover dragenter dragleave drop',
      function (e) {
        e.preventDefault();
        e.stopPropagation();
      }
    );

    $('.drag_n_drop_input').on('dragover dragenter', function () {
      $(this).addClass('is-dragover');
    });

    $('.drag_n_drop_input').on('dragleave dragend drop', function () {
      $(this).removeClass('is-dragover');
    });

    const renderPrev = (selector, files) => {
      files.forEach(element => {
        if (element.type.indexOf('svg') !== -1) {
          selector.html(
            selector.html() +
              `
                <div class="svg">
                  <img src="img/svg_icon.svg" alt="" />
                  <div class="text">
                    <div class="name">${element.name}</div>
                    <div class="format">SVG Graphic</div>
                  </div>
                </div>
          `
          );
        } else if (element.type.indexOf('image') !== -1) {
          selector.html(
            selector.html() + `<img class="image" src="${URL.createObjectURL(element)}" ></img>`
          );
        }
      });
    };

    $('.drag_n_drop_input').on('drop', function (e) {
      const droppedFiles = Array.from(e.originalEvent.dataTransfer.files);
      $(this).addClass('_active');
      renderPrev($(this).children('.preview'), droppedFiles);
    });

    $('.drag_n_drop_input>input').on('change', function () {
      const files = Array.from(this.files);
      $(this).parent().addClass('_active');
      renderPrev($(this).siblings('.preview'), files);
    });
  }

  function calendar() {
    let year;
    let month;
    let day;
    let time;
    let monthText;

    let yearSecond;
    let monthSecond;
    let monthSecondText;
    let daySecond;
    let timeSecond;
    let isSecond = false;
    let withSecondDate = false;

    $('.choose_year').on('scroll', function () {
      const { top, left } = $(this).parent().parent().offset();

      $('.year').removeClass('_active');

      document.elementFromPoint(left + 10, top + 220).classList.add('_active');
    });

    $('.choose_time').on('scroll', function () {
      const { top, left } = $(this).parent().parent().offset();

      $('.time').removeClass('_active');
      document.elementFromPoint(left + 10, top + 220).classList.add('_active');
    });

    $('.year').click(function (e) {
      if (isSecond) {
        yearSecond = Number($(this).text());
      } else {
        year = Number($(this).text());
      }
      $(this).parent().parent().addClass('_month');
      $(this).parent().parent().siblings('.calendar_header').children('.head_year').text(year);
      if ($(e.target).closest('._withSecond').length) {
        withSecondDate = true;
      }
    });

    $('.month').click(function () {
      const monthObj = {
        Янв: 1,
        Фев: 2,
        Мар: 3,
        Апр: 4,
        Май: 5,
        Июн: 6,
        Июл: 7,
        Авг: 8,
        Сен: 9,
        Окт: 10,
        Ноя: 11,
        Дек: 12
      };
      if (isSecond) {
        monthSecond = monthObj[$(this).text()];
        monthSecondText = $(this).text();
      } else {
        month = monthObj[$(this).text()];
        monthText = $(this).text();
      }

      refresh($(this), isSecond ? yearSecond : year, isSecond ? monthSecond : month);
    });

    $('.time').click(function () {
      if (withSecondDate && !isSecond) {
        time = $(this).text();
        $(this).parent().parent().removeClass(['_month', '_day', '_time']);
        isSecond = true;
        return;
      } else {
        timeSecond = $(this).text();
        $(this).parent().parent().parent().parent().removeClass('_active');
      }

      if (withSecondDate) {
        $(this)
          .parent()
          .parent()
          .parent()
          .siblings('.input')
          .children('.text')
          .text(`${day} ${monthText}, ${time} ${daySecond} ${monthSecondText} ${timeSecond}`);
      } else {
        $(this)
          .parent()
          .parent()
          .parent()
          .siblings('.input')
          .children('.text')
          .text(`${day} ${monthText}, ${time}`);
      }
    });

    $('.input').click(function () {
      if ($(this).closest('.task_desc._disabled').length) return;
      $(this).parent().toggleClass('_active');
      $(this).siblings('.calendar').children('.main_part').removeClass(['_month', '_day', '_time']);
    });

    $('.cancel').click(function () {
      $(this).parent().parent().parent().removeClass('_active');
    });

    $(document).click(function (e) {
      if (!$(e.target).closest('.calendar_cont').length) {
        $('.calendar').children('.main_part').removeClass(['_month', '_day', '_time']);
        $('.calendar_cont').removeClass('_active');
      }
    });

    const refresh = (thisSelector, yearLocal, monthLocal) => {
      console.log(yearLocal, monthLocal);
      const date = new Date(yearLocal, monthLocal, 0);
      const date2 = new Date(yearLocal, monthLocal - 1, 1);
      console.log(date, date2);
      const daysNumber = date.getDate();
      const weekDay = date2.getDay();
      const monthArr = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря'
      ];

      thisSelector.parent().parent().removeClass('_month');
      thisSelector.parent().parent().addClass('_day');
      let daysLayout = '';
      if (weekDay === 0) {
        for (let i = 1; i < 7; i++) {
          daysLayout += `<div class="empty_day"></div>`;
        }
      } else {
        for (let i = 1; i < weekDay; i++) {
          daysLayout += `<div class="empty_day"></div>`;
        }
      }

      for (let i = 1; i <= daysNumber; i++) {
        daysLayout += `<div class="day"><span>${i}</span></div>`;
      }

      thisSelector.parent().siblings('.choose_day').children('.days').html(daysLayout);
      $('.day').on('click', function () {
        $('.day').removeClass('_active');
        $(this).addClass('_active');
        if (!isSecond) {
          day = $(this).text();
        } else {
          daySecond = $(this).text();
        }

        $(this)
          .parent()
          .parent()
          .parent()
          .siblings('.calendar_header')
          .children('.head_date')
          .text(`${isSecond ? daySecond : day} ${monthArr[monthLocal - 1]}`);
        $(this).parent().parent().parent().addClass('_time');
        $(this).parent().parent().parent().removeClass('_day');
      });
    };
  }

  function addSubtask() {
    $('.add_subtask_button').click(function () {
      const inputValue = $(this).siblings('.input_desc').children().val();
      if (inputValue === '') return;
      const oldHtml = $(this).siblings('.values').html();
      $(this)
        .siblings('.values')
        .html(
          oldHtml +
            `
            <div class="subtask_added">
              <div class="icon">
                <img src="img/tick.svg" alt="" />
              </div>
              <div class="text">${inputValue}</div>
            </div>
             `
        );
      $(this).siblings('.input_desc').children().val('');
    });
  }

  function commentsSection() {
    $('.comment_section>.arrow').click(function (e) {
      $(this).parent().parent().parent().toggleClass('_active');
    });

    $('.comments_header>img').click(function (e) {
      $(this).parent().parent().remove('_active');
    });
  }

  commentsSection();
  dragNdrop();
  calendar();
  addSubtask();
});
