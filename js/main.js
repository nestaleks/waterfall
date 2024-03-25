// мобільне меню
const menuBtn = document.querySelector('.menu__btn');
const menuList = document.querySelector('.menu__list');
const menuClose = document.querySelector('.menu__close');

menuBtn.addEventListener('click', ()=>{
    menuList.classList.toggle('menu--open');
});
menuClose.addEventListener('click', ()=>{
    menuList.classList.remove('menu--open');
});

//закриття бургера після кліку на посилання
$('.menu__btn').on('click', function () {
	$('.menu__list').addClass('menu--open');
  });
  
  $( '.menu__link' ).on("click", function(){
	$('.menu__list').removeClass('menu--open');
  });



//кнопка Наверх

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("upBtn").style.display = "block";
    } else {
        document.getElementById("upBtn").style.display = "none";
    }
};

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

//попап на документи
$(document).ready(function() {
	$('.popup__link').magnificPopup({
		disableOn: 900,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});
	$('.gallery_img').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small></small>';
			}
		}
	});
});



(function()
{
  'use strict';
  //Создаём полупрозрачный серый фон на заднем плане под увеличенным изображением.
  //Он будет перекрывать все элементы экрана.
  const imgBg = document.createElement('div');
  document.getElementsByTagName('body')[0].appendChild(imgBg);
  imgBg.style = 'background-color: rgba(48, 48, 48, 0.6); position: fixed; top: 0px; left: 0px; width: 100%; z-index: 1';
  imgBg.hidden = true;
  fillBg(); //Функция, которая растягивает серый фон по высоте на весь экран.
  //Перерисовываем высоту серого фона при изменении размеров окна браузера.
  window.addEventListener('resize', fillBg);
  function fillBg()
  {
    imgBg.style.height = (document.documentElement.clientHeight + 100) + 'px';
  }
  
  //Определяем долю от размера экрана, которую будет занимать увеличенное изображение
  let bigImgageScreenFraction;
  if (window.matchMedia('(max-width: 1080px)').matches) //Зашли с мобильного.
  {
    bigImgageScreenFraction = 1.0;
  }
  else //Зашли с компьютера.
  {
    bigImgageScreenFraction = 0.7;
  }
  //Заглушка для картинки. Появляется вместо неё на том месте откуда она увеличилась.
  let placeholder = document.createElement('img');
  document.querySelectorAll('img[scalable]').forEach((img) =>
  {
    const smallSize = img.getAttribute('scalable');
    let defaultStyle = `max-width: ${smallSize}; max-height: ${smallSize}`;
    img.style = defaultStyle;
    let isGoingToSmall = false;
    img.addEventListener('click', () => 
    {
      if (img.getAttribute('is-big') === 'true') //Картинка большая - уменьшаем
      {
        //Смотрим по каким координатам надо вернуть картинку на место.
        let coords = placeholder.getBoundingClientRect();
        //Устанавливаем для изображения уменьшенный размер.
        //Но position остаётся fixed, т.к. нужно, чтобы при анимации уменьшения не смещались остальные элементы страницы.
        img.style = `${defaultStyle}; position: fixed; left: ${coords.left}px; top: ${coords.top}px`;
        img.setAttribute('is-big', false);
        imgBg.hidden = true;
        //Указываем, что мы собираемся уменьшить картинку.
        //Эта переменная опять станет false, когда завершится анимация уменьшения.
        isGoingToSmall = true;
      }
      else //Картинка маленькая - увеличиваем.
      {
        imgBg.hidden = false;
        img.setAttribute('is-big', true);
        //Перед тем как увеличить картинку вставляем вместо неё заглушку.
        placeholder.hidden = false;
        placeholder.style = `width: ${img.width}px; height: ${img.height}px; background-color: rgb(200, 200, 200)`;
        img.before(placeholder);
        //Увеличиваем картинку.
        doImageBig(img);
      }
    });
    img.addEventListener('transitionend', () =>
    {
      if (isGoingToSmall) //Отследили завершение анимации уменьшения.
      {
        //Вставляем картинку обратно в поток.
        img.style = defaultStyle;
        isGoingToSmall = false;
        //Убираем заглушку.
        placeholder.hidden = true;
      }
    }); 
    //Сохраняем центровку увеличенной картинки при изменении размеров окна браузера.
    window.addEventListener('resize', () => 
    {
      if (img.getAttribute('is-big') === 'true') doImageBig(img);
    });
  });
  
  //Эта функция расчитывает размеры увеличенного изображения и центрирует его.
  function doImageBig(img)
  {
    let screenHeight = document.documentElement.clientHeight;
    let screenWidth = document.documentElement.clientWidth;
    let imgWidth = img.width;
    let imgHeight = img.height;
    let bigImgHeight = Math.round(screenHeight * bigImgageScreenFraction);
    let bigImgWidth = Math.round(screenWidth * bigImgageScreenFraction);
    let ratio = imgWidth / imgHeight
    let newWidth = Math.round(bigImgHeight * ratio);
    if (newWidth < bigImgWidth)
    {
      bigImgWidth = newWidth;
    }
    else
    {
      bigImgHeight = Math.round(bigImgWidth / ratio);
    }
    let left = Math.round(0.5 * (screenWidth - bigImgWidth));
    let top = Math.round(0.5 * (screenHeight - bigImgHeight));
    img.style = `max-width: ${bigImgWidth}px; max-height: ${bigImgHeight}px; left: ${left}px; top: ${top}px; position: fixed; z-index: 2`;
  }
})();







