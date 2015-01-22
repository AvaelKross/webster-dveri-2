var dveri = angular.module('dveri', ['uiGmapgoogle-maps', 'ngRoute']);

dveri.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        v: '3.17',
        language: 'ru',
        libraries: 'geometry,visualization'
    });
})
dveri.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({enabled: true,requireBase: false});
});

dveri.directive("scroll", function ($window) {
  return function(scope, element, attrs) {
    angular.element($window).bind("scroll", function() {
      if (this.pageYOffset >= 75) {
        scope.fixedMenu = true;
      } else {
        scope.fixedMenu = false;
      }
      scope.$apply();
    });
  };
});

dveri.directive("fadein", function($window) {
  return function(scope, element, attrs) {
    angular.element($window).bind("scroll", function() {
      if (this.pageYOffset >= 1200) {
        setTimeout(function () {
          $(element).fadeIn(700);
        }, parseInt(attrs["fadein"]));
      }
      scope.$apply();
    });
  };
})

dveri.directive('inputMask', ['$document', function($document) {
  return {
    link: function(scope, elm, attrs) {
      var phonemask = "+7 (999) 999-99-99";
      elm.mask(phonemask);
    }
  };
}]);

dveri.controller('MainCtrl', function ($scope, $sce, $location, $http) {
  $scope.selectedType = "shpon";
  $scope.names = {};
  $scope.phones = {};
  $scope.emails = {};

  $scope.showDefaultDoorPopup = false;
  $scope.showPaintDoorPopup = false;
  $scope.showLeadPopup = false;
  $scope.showPolitics = false;
  $scope.showInOneClick = false;
  $scope.showThanks = false;

  $scope.currentWhere = "";

  $scope.doors = [
    {title: "Межкомнатная дверь из массива, модель Adagio", 
      short_title: "Adagio", filling: "массив", cover: "ПВХ",
      opening: "универсальное", set: "коробка, комплект наличников", 
      sizes: "ширина 600, 700, 800, 900* мм. <br>высота 2010 мм.<br>*Дверь размером 900 мм рассчитывается по дополнительной цене.", polotno_price: "4610p", polotno_and_montage_price: "6610p",
       colors: [{key: "milky_dub", 
      pic_url: "Адажио дуб молочный.jpg"},
      {key: "venge", 
      pic_url: "Адажио венге.jpg"},
      {key: "noche_kremone", 
      pic_url: "Адажио ноче кремоне.jpg"}],
      room: "адажио.jpg",
      selected_color: "Адажио дуб молочный.jpg"},


      {title: "Межкомнатная дверь из массива, модель Legro ДО", 
      short_title: "Legro ДО", filling: "массив", cover: "ПВХ",
      opening: "универсальное", set: "коробка, комплект наличников", 
      sizes: "ширина 600, 700, 800, 900* мм. <br>высота 2010 мм.<br>*Дверь размером 900 мм рассчитывается по дополнительной цене.", polotno_price: "5010p", polotno_and_montage_price: "7010p",
       colors: [{key: "venge", 
      pic_url: "Легро ДО венге.jpg"},
      {key: "milky_dub", 
      pic_url: "Легро ДО дуб молочный.jpg"},
      {key: "noche_kremone", 
      pic_url: "Легро ДО ноче кремоне.jpg"}],
      room: "легро.jpg",
      selected_color: "Легро ДО венге.jpg"},


      {title: "Межкомнатная дверь из массива, модель Maestro", 
      short_title: "Maestro", filling: "массив", cover: "ПВХ",
      opening: "универсальное", set: "коробка, комплект наличников", 
      sizes: "ширина 600, 700, 800, 900* мм. <br>высота 2010 мм.<br>*Дверь размером 900 мм рассчитывается по дополнительной цене.", polotno_price: "5030p", polotno_and_montage_price: "7030p",
       colors: [{key: "milky_dub", 
      pic_url: "Маэстро дуб молочный.jpg"},
      {key: "venge", 
      pic_url: "Маэстро венге.jpg"},
      {key: "noche_kremone", 
      pic_url: "Маэстро ноче кремоне.jpg"}],
      room: "маэстро.jpg",
      selected_color: "Маэстро дуб молочный.jpg"},

      {title: "Межкомнатная дверь из массива, модель Forte Ч.С.", 
      short_title: "Forte Ч.С.", filling: "массив", cover: "ПВХ",
      opening: "универсальное", set: "коробка, комплект наличников", 
      sizes: "ширина 600, 700, 800, 900* мм.<br>высота 2010 мм.<br>*Дверь размером 900 мм рассчитывается по дополнительной цене.", polotno_price: "5200p", polotno_and_montage_price: "7200p",
       colors: [{key: "venge", 
      pic_url: "Форте ч.с. венге.jpg"},
      {key: "noche_kremone", 
      pic_url: "Форте ч.с. ноче кремоне.jpg"},
      {key: "milky_dub", 
      pic_url: "форте ч.с. дуб молочный.jpg"}],
      room: "форте.jpg",
      selected_color: "Форте ч.с. венге.jpg"},


      {title: "Межкомнатная дверь из массива, модель Piano", 
      short_title: "Piano", filling: "массив", cover: "ПВХ",
      opening: "универсальное", set: "коробка, комплект наличников", 
      sizes: "ширина 600, 700, 800, 900* мм. <br>высота 2010 мм.<br>*Дверь размером 900 мм рассчитывается по дополнительной цене.", polotno_price: "5030p", polotno_and_montage_price: "7030p",
       colors: [{key: "venge", 
      pic_url: "Пиано венге.jpg"},
      {key: "milky_dub", 
      pic_url: "Пиано дуб молочный.jpg"},
      {key: "noche_kremone", 
      pic_url: "Пиано ноче кремоне.jpg",
      }],
      selected_color: "Пиано венге.jpg"
      },


      {title: "Межкомнатная дверь из массива, модель Primo Ч.С.", 
      short_title: "Primo Ч.С.", filling: "массив", cover: "ПВХ",
      opening: "универсальное", set: "коробка, комплект наличников", 
      sizes: "ширина 600, 700, 800, 900* мм. <br>высота 2010 мм.<br>*Дверь размером 900 мм рассчитывается по дополнительной цене.", polotno_price: "5030p", polotno_and_montage_price: "7030p",
       colors: [{key: "shamp_dub", 
      pic_url: "Примо ч.с дуб шампань.jpg"},
      {key: "venge", 
      pic_url: "примо ч.с. венге.jpg"},
      {key: "noche_kremone", 
      pic_url: "примо ч.с. ноче кремоне.jpg"}],
      room: "примо.jpg",
      selected_color: "Примо ч.с дуб шампань.jpg"},


      { title: "Межкомнатная дверь из массива, модель El Porto", 
        short_title: "El Porto", filling: "массив", cover: "ПВХ",
        opening: "универсальное", set: "коробка, комплект наличников", 
        sizes: "ширина 600, 700, 800, 900* мм. <br>высота 2010 мм.<br>*Дверь размером 900 мм рассчитывается по дополнительной цене.", 
        polotno_price: "5030p", 
        polotno_and_montage_price: "7030p",
        colors: [
          {key: "venge", pic_url: "Эль Порте венге.jpg"},
          {key: "noche_kremone", pic_url: "Эль Порте ноче кремоне.jpg"},
          {key: "milky_dub", pic_url: "Эль Порте дуб молочный.jpg"}
        ],
        room: "эль порте.jpg",
        selected_color: "Эль Порте венге.jpg"
      }
  ]

  $scope.selectedDoor = $scope.doors[3];

  $scope.colors = {
    milky_dub: {name: "Молочный дуб", pic_url: "молочный дуб.jpg"},
    shamp_dub: {name: "Дуб шампань", pic_url: "дуб шампань.jpg"},
    brazil_pear: {name: "Бразильская груша", pic_url: "бразильская груша.jpg"},
    mor_dub: {name: "Мореный дуб", pic_url: "мореный дуб.jpg"},
    coffee: {name: "Кофе", pic_url: "кофе.jpg"},
    kanaletto: {name: "Каналетто", pic_url: "каналетто.jpg"},
    noche_kremone: {name: "Ноче кремоне", pic_url: "ноче кремоне.jpg"},
    venge: {name: "Венге", pic_url: "венге кв.jpg"},
    venge_mok: {name: "Венге мокка", pic_url: "венге мокка.jpg"},
    venge_li: {name: "Венге лайсвуд", pic_url: "венге лайсвуд.jpg"},
    venge_pokr: {name: "Венге", pic_url: "венге покраска.jpg"},
    dub_tab: {name: "Дуб табак", pic_url: "дуб табак.jpg"},
    dub_fine: {name: "Дуб файнлайн", pic_url: "дуб файнлайн.jpg"},
    greywood: {name: "Грейвуд", pic_url:"грейвуд.jpg"},
    makasar: {name: "Макассар", pic_url: "макассар.jpg"},
    white_yas: {name: "Белый ясень", pic_url: "белый ясень.jpg"},
    magnolia: {name: "Магнолия", pic_url: "магнолия.jpg"},
    it_nut: {name: "Итальянский орех", pic_url: "итальянский орех.jpg"},
    nut: {name: "Орех", pic_url: "орех.jpg"},
    svet_dub: {name: "Светлый дуб", pic_url: "светлый дуб.jpg"},
    gold: {name: "Золотая патина", pic_url: "золотая патина.jpg"},
    merbau: {name: "Мербау", pic_url: "мерабу.jpg"},
    clear: {name: "Прозрачное", pic_url: "прозрачное.jpg"},
    bronze: {name: "Бронзовое", pic_url: "бронзовое.jpg"},
    grey_glass: {name: "Серое", pic_url: "серое.jpg"},
    mat_clear: {name: "Матовое бесцветное", pic_url: "матовое бесцветное.jpg"},
    mat_bronze: {name: "Матовое бронзовое", pic_url: "матовое бронзовое.jpg"},
    mat_grey: {name: "Матовое серое", pic_url: "матовое серое.jpg"},
    black: {name: "Черное", pic_url: "черное.jpg"},
    red: {name: "Красное", pic_url: "красное.jpg"},
    orange: {name: "Оранжевое", pic_url: "оранжевое.jpg"},
    white: {name: "Белое", pic_url: "белое.jpg"},
    dub_kanella: {name: "Дуб канелла", pic_url: "дуб канелла.jpg"},
    dub_alaska: {name: "Дуб аляска", pic_url: "дуб аляска.jpg"},
    dub_sher: {name: "Дуб шервуд", pic_url: "дуб шервуд.jpg"},
    dark_nut: {name: "Темный орех", pic_url: "темный орех.jpg"},
    white_wood: {name: "Белый", pic_url: "белый.jpg"},
    whitened_dub: {name: "Выбеленный дуб", pic_url: "выбеленный дуб.jpg"},
    black_dub: {name: "Черный дуб", pic_url: "черный дуб.jpg"},
    bisk_nut: {name: "Орех бискотто", pic_url: "орех бискотто.jpg"},
    walnut: {name: "Грецкий орех", pic_url: "грецкий орех.jpg"},
    medi: {name: "Меди-акация", pic_url: "меди-акация.jpg"},
    dub_pale: {name: "Дуб пепельный", pic_url: "дуб пепельный.jpg"},
    tanganika: {name: "Танганика", pic_url: "танганика.jpg"},
    dub_shv: {name: "Дуб шварц", pic_url: "дуб шварц.jpg"}
  }

  $scope.reviews = [
    {
      pic: {
        position: "0px 0px", 
        descr: "Жуковы Александр, Надежда и маленькая Антонина / 23.06.2014"
      },
      text: "Мы заказали в Краснодеревщике все двери в квартиру, а так же входную дверь. Интерьер у нас светлый, поэтому мы выбрали выбеленный дуб, который обманчиво кажется марким, а на самом деле очень практичный - Тоня проверяет его на прочность каждый день. Дверями очень довольны!",
      ad: {
        cover_pic: "жуковы/жуковы 1.jpg",
        pics: ["жуковы/жуковы 1.jpg", "жуковы/жуковы 2.jpg", "жуковы/жуковы 4.jpg"],
        text: "Межкомнатные деври Краснодеревщик, серия 3000, модель 33.52, цвет выбеленный дуб.<br>Стоимость 9 комплектов дверей со скидкой 102 006 руб."
      }
    },
    {
      pic: {
        position: "-230px 0px", 
        descr: "Бычковы Александр и Юлия / 07.09.2014"
      },
      text: "Отличный вариант по цене и качеству + подход к работе с клиентами! Не мало важный момент, оплата по банковской карте и частями, пока идет товар. Сделали замеры  и доставили в срок, только сама отделка квартиры затянулась, но дождался  времени установки))) и мастера очень порадовали, особенно Александр!",
      ad: {
        text: "Межкомнатные деври Краснодеревщик, серия 3000, модель 33.52, цвет черный дуб.<br>Стоимость 4 комплектов дверей со скидкой 42 843 руб.",
        cover_pic: "бычковы/IMG_6723.JPG",
        pics: ["бычковы/IMG_6723.JPG", "бычковы/IMG_6720.jpg", "бычковы/IMG_6725.JPG"]
      }
    },
    {
      pic: {
        position: "-460px 0px", 
        descr: "Влащицкие Дмитрий, Светлана и Василий / 19.11.2014"
      },
      text: "В Краснодеревщик обращались 2 раза, и оба раза остались довольны! Двери качественные, монтировали Александр и Сергей. Им особая благодарность, к установке подошли основательно, не спешили, каждую мелочь обговаривали с нами! Двери смотрятся богато! Очень понравились замки на последних дверях (закрываются мягко-не хлопают!). В общем двери классные! Обслуживание отличное! Монтаж качественный! Всем рекомендую!",
      ad: {
        text: "Межкомнатные деври Краснодеревщик, серия 3000, модели 33.24 и 33.23, цвет грецкий орех.<br>Стоимость 12 комплектов дверей со скидкой 130 542 руб.",
        cover_pic: "влащитские/IMG_6696.JPG",
        pics: ["влащитские/IMG_6696.JPG", "влащитские/IMG_6695.JPG", "влащитские/IMG_6689.JPG"]
      }
    },
    {
      pic: {
        position: "-691px 0px", 
        descr: "Олег (отзыв с flam.ru) / 14.01.2015"
      },
      text: "Хочу поблагодарить сотрудников компании Краснодеревщик, заказ оформили давно, но только недавно завершили ремонт и пришло время дверей. Монтажники дверей профессионально произвели установку, за собой убрали мелкий мусор. Качественно выполнили работу. Все очень нравится. Еще обратимся к вам!!!!"
    }
  ]

  $scope.map = { center: { latitude: 56.8212112, longitude: 60.6353681 }, zoom: 13, options: { scrollwheel: false } };

  $scope.checkEmail = function(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  $scope.changeType = function(type){
    $scope.selectedType = type;
  }

  $scope.showHtml = function(html){
    return $sce.trustAsHtml(html);
  }

  $scope.openLeadPopup = function(where, text, button_text){
    if (text==undefined) {text = "Мы перезвоним Вам<br>в ближайшее время"};
    if (button_text==undefined) {button_text="Заказать звонок"};
    $scope.leadPopupText = text;
    $scope.leadPopupButtonText = button_text;
    $scope.currentWhere = where;
    $scope.showLeadPopup = true;
  }

  $scope.changeColor = function(color){
    if (color.pic_url!='') 
      $scope.selectedDoor.selected_cover_img = color.pic_url;
  }

  $scope.openPolitics = function(){
    $scope.showPolitics = true;
  }

  $scope.openInOneClick = function(){
    $scope.showInOneClick = true;
  }

  $scope.closeAllPopups = function(){
    $scope.showDefaultDoorPopup = false;
    $scope.showPaintDoorPopup = false;
    $scope.showLeadPopup = false;
    $scope.showPolitics = false;
    $scope.showInOneClick = false;
    $scope.showThanks = false;
  }

  $scope.makeMontPrice = function(door){
    if (door.price_set){
    num = door.price_set.replace(/\s+/g, '');
      num = parseInt(num) + 2300;
    }else{
      num = 0;
    }
    num = num.toString();
    num = num.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    return num;
  }

  $scope.sendData = function(object, comment, id){
    params = {}
    params['comment'] = comment;
    add_params = $location.search();
    params['name'] = $scope.names[id];
    params['email'] = $scope.emails[id];
    params['phone'] = $scope.phones[id];
    if (params['name']==undefined || params['name'].trim() == "") {
      alert('Вы не ввели имя!');
      return;
    }
    if (params['phone']==undefined || params['phone'].trim() == "") {
      alert('Вы не ввели телефон!');
      return;
    }
    if (params['email']!=undefined && params['email'].trim() != ""){
      if (!$scope.checkEmail(params['email'])) {
        alert('Email введен некорректно!');
        return;
      }
    }
    params['utm_content'] = add_params['utm_content'];
    params['utm_campaign'] = add_params['utm_campaign'];
    params['utm_source'] = add_params['utm_source'];
    params['utm_term'] = add_params['utm_term'];
    params['utm_medium'] = add_params['utm_medium'];
    $http.post("ajax-proxy", params)
    .then(function( msg ) {
      console.log(msg);
      $scope.names = {};
      $scope.phones = {};
      $scope.emails = {};
    });
    $scope.closeAllPopups();
    $scope.showThanks = true;
  }

});