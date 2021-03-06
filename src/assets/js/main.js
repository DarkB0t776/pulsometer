$(document).ready(function () {
  //Slider
  $('.carousel__inner').slick({
    speed: 1000,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="assets/img/left-arrow.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="assets/img/right-arrow.png"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  //Tabs
  $('ul.catalog__tabs').on(
    'click',
    'li:not(.catalog__tab_active)',
    function () {
      $(this)
        .addClass('catalog__tab_active')
        .siblings()
        .removeClass('catalog__tab_active')
        .closest('div.container')
        .find('div.catalog__content')
        .removeClass('catalog__content_active')
        .eq($(this).index())
        .addClass('catalog__content_active');
    }
  );

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (event) {
        event.preventDefault();
        $('.catalog-item__content')
          .eq(i)
          .toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  }

  //Modal
  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  });

  //dynamic subtitle
  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__desc').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn();
    });
  });

  //Validation

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: 'required',
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: 'Пожалуйста, введите свое имя',
          minlength: jQuery.validator.format('Введите {0} символа'),
        },
        phone: 'Пожалуйста, введите свой номер телефона',
        email: {
          required: 'Пожалуйста, введите свою почту',
          email: 'Неверный формат почты',
        },
      },
    });
  }

  validateForms('#consultation form');
  validateForms('#consultation-form');
  validateForms('#order form');

  //Phone mask
  $('input[name=phone]').mask('+7 (999) 9-99-9999');
});
