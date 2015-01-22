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
  $scope.selectedDoor = {name: ""};
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

  $scope.types = [
    {key: "shpon", title: "Двери с<br> покрытием шпон"},
    {key: "cpl", title: "Двери с пластиковым<br> покрытием CPL"},
    {key: "paint", title: "Двери под<br> покраску"},
    {key: "glass", title: "Стеклянные<br> двери"}
  ];

  $scope.doors = {
    shpon: [
      {type: "Межкомнатная дверь", brand: "Краснодеревщик", brand_city: "г. Челябинск", model: "серия 3000, модель 33.24, стекло Торшон", cover: "натуральный шпон", color: "coffee", sizes_width: "600, 700, 800, 900, 1000 мм.", sizes_height: "2000, 2010 мм.", price_pol: "12 924", price_set: "17 623", set: "коробка, наличники с двух сторон, полотно", colors: [{key: "coffee", pic_url: "33.24 - кофе торшон.jpg"}, {key: "brazil_pear", pic_url: "33.24 бразиль груша.jpg"}], filling: "сотовое", cover_img: "33.24 - кофе торшон.jpg", position: "0px 0px"},
      {type: "Межкомнатная дверь", brand: "Краснодеревщик", brand_city: "г. Челябинск", model: "серия 3000, модель 33.40, стекло Торшон", cover: "натуральный шпон", color: "brazil_pear", sizes_width: "600, 700, 800, 900, 1000 мм.", sizes_height: "2000, 2010 мм.", price_pol: "12 920", price_set: "17 620", set: "коробка, наличники с двух сторон, полотно", colors: [{key: "brazil_pear", pic_url: "33.40.jpg"}, {key: "coffee", pic_url: "33.40 кофе торшон.jpg"}], filling: "сотовое", cover_img: "33.40.jpg", position: "-98px 0px"},
      {type: "Межкомнатная дверь", brand: "Краснодеревщик", brand_city: "г. Челябинск", model: "серия 7000, модель 73.04", cover: "натуральный шпон", color: "milky_dub", sizes_width: "600, 700, 800, 900, 1000 мм.", sizes_height: "2000, 2010 мм.", price_pol: "13 435", price_set: "15 633", set: "коробка, наличники с двух сторон, полотно", colors: [{key: "milky_dub", pic_url: "7004_dub_moloko.jpg"}, {key: "brazil_pear", pic_url: "7304 бразиль груша.jpg"}, {key: "mor_dub", pic_url: "73.04 мореный дуб.jpg"}, {key: "coffee", pic_url: "73.04 кофе сетка.jpg"}], filling: "сотовое", cover_img: "7004_dub_moloko.jpg", position: "-196px 0px"},
      {type: "Межкомнатная дверь", brand: "Свобода", brand_city: "г. Рыбинск", model: "серия Loko, модель 204", cover: "натуральный шпон", color: "milky_dub", sizes_width: "600, 700, 800, 900 мм.", sizes_height: "2000 мм.", price_pol: "16 947", price_set: "28 715", set: "коробка, наличники с двух сторон, петли, полотно", colors: [{key: "white_yas", pic_url: "204 белый ясень.jpg"}, {key: "venge_li", pic_url: "204 венге лайсвуд.jpg"}, {key: "makasar", pic_url: "204 макассар.jpg"}, {key: "greywood", pic_url: "204 грейвуд.jpg"}], filling: "сотовое", cover_img: "204 белый ясень.jpg", position: "-294px 0px"},
      {type: "Межкомнатная дверь", brand: "Свобода", brand_city: "г. Рыбинск", model: "серия Loko, модель 206", cover: "натуральный шпон", color: "greywood", sizes_width: "600, 700, 800, 900 мм.", sizes_height: "2000 мм.", price_pol: "13 182", price_set: "22 120", set: "коробка, наличники с двух сторон, петли, полотно", colors: [{key: "white_yas", pic_url: "206 белый ясень.jpg"}, {key: "venge_li", pic_url: "206 венге лайсвуд.jpg"}, {key: "makasar", pic_url: "206 макасар.jpg"}, {key: "greywood", pic_url: "206 грейвуд.jpg"}], filling: "сотовое", cover_img: "206 грейвуд.jpg", position: "-392px 0px"},
      {type: "Межкомнатная дверь", brand: "Свобода", brand_city: "г. Рыбинск", model: "серия Loko, модель 209", cover: "натуральный шпон", color: "makasar", sizes_width: "600, 700, 800, 900 мм.", sizes_height: "2000 мм.", price_pol: "17 581", price_set: "29 456", set: "коробка, наличники с двух сторон, петли, полотно", colors: [{key: "white_yas", pic_url: "209 белый ясень.jpg"}, {key: "venge_li", pic_url: "209 венге лайсвуд.jpg"},  {key: "makasar", pic_url: "209 макассар.jpg"}, {key: "greywood", pic_url: "209 грейвуд.jpg"}], filling: "сотовое", cover_img: "209 макассар.jpg", position: "-490px 0px"},
      {type: "Межкомнатная дверь", brand: "Свобода", brand_city: "г. Рыбинск", model: "серия Valdo, модель 751", cover: "натуральный шпон", color: "magnolia", sizes_width: "600, 700, 800, 900 мм.", sizes_height: "2000 мм.", price_pol: "13 827", price_set: "17 880", set: "коробка, наличники с двух сторон, полотно", colors: [{key: "magnolia", pic_url: ""}, {key: "it_nut", pic_url: ""}, {key: "nut", pic_url: ""}, {key: "svet_dub", pic_url: ""}, {key: "venge_li", pic_url: ""}], filling: "сотовое", cover_img: "0669.jpg", position: "-588px 0px"},
      {type: "Межкомнатная дверь", brand: "Свобода", brand_city: "г. Рыбинск", model: "серия Valdo, модель 750 ПГ", cover: "натуральный шпон", color: "gold", sizes_width: "600, 700, 800, 900 мм.", sizes_height: "2000 мм.", price_pol: "11 951", price_set: "18 071", set: "коробка, наличники с двух сторон, полотно", colors: [{key: "gold", pic_url: ""}, {key: "it_nut", pic_url: ""}, {key: "nut", pic_url: ""}, {key: "svet_dub", pic_url: ""}, {key: "venge", pic_url: ""}], filling: "сотовое", cover_img: "вальдо 750 пг.jpg", position: "-686px 0px"},
      {type: "Межкомнатная дверь", brand: "Свобода", brand_city: "г. Рыбинск", model: "серия Valdo, модель 750 ПГ", cover: "натуральный шпон", color: "merbau", sizes_width: "600, 700, 800, 900 мм.", sizes_height: "2000 мм.", price_pol: "9 304", price_set: "13 418", set: "коробка, наличники с двух сторон, полотно", colors: [{key: "merbau", pic_url: ""}, {key: "gold", pic_url: ""}, {key: "nut", pic_url: ""}, {key: "svet_dub", pic_url: ""}, {key: "venge", pic_url: ""}], filling: "сотовое", cover_img: "750ПГ.jpg", position: "-784px 0px"}
    ],
    cpl: [
      {type: "Межкомнатная дверь", brand: "Краснодеревщик", brand_city: "г. Челябинск", model: "серия 400, модель 423", color: "dub_kanella", cover: "CPL(экошпон)", color: "dub_kanella", sizes_width: "600, 700, 800, 900, 1000 мм.", sizes_height: "2000, 2010 мм.", price_pol: "6 170", price_set: "9 912", set: "коробка, наличники с двух сторон, полотно, петли, замок", colors: [{key: "dub_kanella", pic_url: "423.jpg"}, {key: "dub_alaska", pic_url: "423_dub_alyaska.jpg"}, {key: "dub_sher", pic_url: "423_dub_servud.jpg"}], filling: "сотовое", cover_img: "423.jpg", position: "0px -210px"},
      {type: "Межкомнатная дверь", brand: "Краснодеревщик", brand_city: "г. Челябинск", model: "серия 2000, модель 20.23", color: "dark_nut", cover: "CPL(экошпон)", color: "dark_nut", sizes_width: "600, 700, 800, 900, 1000 мм.", sizes_height: "2000, 2010 мм.", price_pol: "11 059", price_set: "18 420", set: "коробка, наличники с двух сторон, полотно, петли, замок", colors: [{key: "dark_nut", pic_url: "2023.jpg"}, {key: "white_wood", pic_url: "2023 бел.jpg"}], filling: "царговое", cover_img: "2023.jpg", position: "-98px -210px"},
      {type: "Межкомнатная дверь", brand: "Краснодеревщик", brand_city: "г. Челябинск", model: "серия 3000, модель 33.24, стекло матовое", color: "white", cover: "CPL(экошпон)", sizes_width: "600, 700, 800, 900, 1000 мм.", sizes_height: "2000, 2010 мм.", price_pol: "8 055", price_set: "12 789", set: "коробка, наличники с двух сторон, полотно, петли, замок", colors: [{key: "black_dub", pic_url: "33.24 черный дуб.jpg"}, {key: "dub_sher", pic_url: "33_24_sherwood.jpg"}, {key: "bisk_nut", pic_url: "33_24_oreh_biskotto.jpg"}, {key: "whitened_dub", pic_url: "33_24_vibel_dub.jpg"}, {key: "walnut", pic_url: "33_24_grec_orex.jpg"}], filling: "сотовое", cover_img: "33_24_vibel_dub.jpg", position: "-196px -210px"},
      {type: "Межкомнатная дверь", brand: "Краснодеревщик", brand_city: "г. Челябинск", model: "серия 3000, модель 33.40f, стекло цветное", color: "white", cover: "CPL(экошпон)", sizes_width: "600, 700, 800, 900, 1000 мм.", sizes_height: "2000, 2010 мм.", price_pol: "8 055", price_set: "12 789", set: "коробка, наличники с двух сторон, полотно, петли, замок", colors: [{key: "white_wood", pic_url: "3340.jpg"}], filling: "сотовое", cover_img: "3340.jpg", position: "-294px -210px"},
      {type: "Межкомнатная дверь", brand: "Краснодеревщик", brand_city: "г. Челябинск", model: "серия 3000, модель 33.52", color: "black_dub", cover: "CPL(экошпон)", sizes_width: "600, 700, 800, 900, 1000 мм.", sizes_height: "2000, 2010 мм.", price_pol: "5 854", price_set: "9 610", set: "коробка, наличники с двух сторон, полотно, петли, замок", colors: [{key: "black_dub", pic_url: "3352.jpg"}, {key: "dub_sher", pic_url: "33.52 шервуд со стеклом.jpg"}, {key: "bisk_nut", pic_url: "33.52 орех бискотто со стеклом.jpg"}, {key: "whitened_dub", pic_url: "33.52 выбеленный дуб со стеклом.jpg"}, {key: "walnut", pic_url: "33.52 гр орех со стеклом.jpg"}], filling: "сотовое", cover_img: "3352.jpg", position: "-392px -210px"},
      {type: "Межкомнатная дверь", brand: "Краснодеревщик", brand_city: "г. Челябинск", model: "серия 5000, модель 50.04, стекло вклеенное", color: "whitened_dub", cover: "CPL(экошпон)", sizes_width: "600, 700, 800, 900, 1000 мм.", sizes_height: "2000, 2010 мм.", price_pol: "11 001", price_set: "14 798", set: "коробка, наличники с двух сторон, полотно, петли, замок", colors: [{key: "black_dub", pic_url: "5004 черный дуб.jpg"}, {key: "dub_alaska", pic_url: "50_04_dub_alyaska.jpg"}, {key: "dub_kanella", pic_url: "50_04_dub_kannela.jpg"}, {key: "medi", pic_url: "5004 Медиакация.jpg"}, {key: "walnut", pic_url: "5004 гр орех.jpg"}, {key: "white_wood", pic_url: "50_04_bel.jpg"}], filling: "сотовое", cover_img: "50_04_bel.jpg", position: "-490px -210px"},
      {type: "Межкомнатная дверь", brand: "Краснодеревщик", brand_city: "г. Челябинск", model: "серия 5000, модель 50.66, стекло Лиана", color: "whitened_dub", cover: "CPL(экошпон)", sizes_width: "600, 700, 800, 900, 1000 мм.", sizes_height: "2000, 2010 мм.", price_pol: "6 612", price_set: "10 827", set: "коробка, наличники с двух сторон, полотно, петли, замок", colors: [{key: "black_dub", pic_url: "50.66 ч дуб стекло лиана.jpg"}, {key: "dub_alaska", pic_url: "50_66_dub_alyaska_liana.jpg"}, {key: "dub_kanella", pic_url: "50_66__dub_kannela_liana.jpg"}, {key: "whitened_dub", pic_url: "50.66 выб дуб лиана.jpg"}, {key: "walnut", pic_url: "50_66_grec_orex_liana.jpg"}, {key: "white_wood", pic_url: "50.66 белый лиана.jpg"}], filling: "сотовое", cover_img: "50.66 выб дуб лиана.jpg", position: "-588px -210px"},
      {type: "Межкомнатная дверь", brand: "Краснодеревщик", brand_city: "г. Челябинск", model: "серия 6000, модель 63.23", color: "dub_pale", cover: "CPL(экошпон)", sizes_width: "600, 700, 800, 900, 1000 мм.", sizes_height: "2000, 2010 мм.", price_pol: "5 854", price_set: "9 610", set: "коробка, наличники с двух сторон, полотно, петли, замок", colors: [{key: "dub_shv", pic_url: "6323 dub_sharc.jpg"}, {key: "tanganika", pic_url: "6323 tanganika.jpg"}, {key: "dub_pale", pic_url: "6323.jpg"}, {key: "white_wood", pic_url: "6323 bel.jpg"}], filling: "сотовое", cover_img: "6323.jpg", position: "-686px -210px"},     
      {type: "Межкомнатная дверь", brand: "Краснодеревщик", brand_city: "г. Челябинск", model: "серия 6000, модель 63.40", color: "dub_shv", cover: "CPL(экошпон)", sizes_width: "600, 700, 800, 900, 1000 мм.", sizes_height: "2000, 2010 мм.", price_pol: "5 718", price_set: "9 473", set: "коробка, наличники с двух сторон, полотно, петли, замок", colors: [{key: "dub_shv", pic_url: "6340.jpg"}, {key: "tanganika", pic_url: "6340 tanganika.jpg"}, {key: "dub_pale", pic_url: "6340 dub_pepel.jpg"}, {key: "white_wood", pic_url: "6340 bel.jpg"}], filling: "сотовое", cover_img: "6340.jpg", position: "-784px -210px"}
    ],
    paint: [
      {type: "Межкомнатная дверь", brand: "Vivo-Porte",  brand_city: "г. Светлый", model: "линия  Глория, модель 30.11", cover: "полиуретан или шпон дуба", sizes_width: "600, 700, 800, 900, 1000 мм.", price_set: "10 520", price_mont: "12 820", set: "коробка, наличники с двух сторон, петли, замок, полотно", colors: [{key: "kanaletto", pic_url: "глория 3011 каналетто.jpg"}, {key: "dub_tab", pic_url: "глория 3011 дуб табак.jpg"}, {key: "venge_mok", pic_url: "глория 3011 венге мокка.jpg"}, {key: "greywood", pic_url: "30 глория 30.11.jpg"}, {key: "dub_fine", pic_url: "глория 3011 дуб файнлайн.jpg"}], filling: "каркас из сращенного бруса хвойных пород дерева", descript: "Многообразие вариантов отделок (шпон с открытым порами, шпон под покраску, полиуретановое покрытие)", paint: "Двери серии Глория окрашиваются полиуретановыми красками по шпону дуба в любой цвет таблицы цветов RAL.", cover_img: "глория 3011 каналетто.jpg", inter_img: "", position: "0px -420px"},
      {type: "Межкомнатная дверь", brand: "Vivo-Porte",  brand_city: "г. Светлый", model: "линия  Глория, модель 30.19", cover: "полиуретан или шпон дуба", sizes_width: "600, 700, 800, 900, 1000 мм.", price_set: "12 970", price_mont: "15 270", set: "коробка, наличники с двух сторон, петли, замок, полотно", colors: [{key: "whitened_dub", pic_url: "30 глория 30.19.jpg"}, {key: "dub_tab", pic_url: "глория 3019 дуб табак.jpg"}, {key: "venge_mok", pic_url: "глория 3019 венге мокка.jpg"}, {key: "venge_pokr", pic_url: "глория 3019 венге файнлайн.jpg"}, {key: "dub_fine", pic_url: "глория 3019 дуб файнлайн.jpg"}], filling: "каркас из сращенного бруса хвойных пород дерева", descript: "Многообразие вариантов отделок (шпон с открытым порами, шпон под покраску, полиуретановое покрытие)", paint: "Двери серии Глория окрашиваются полиуретановыми красками по шпону дуба в любой цвет таблицы цветов RAL.", cover_img: "30 глория 30.19.jpg", inter_img: "", position: "-98px -420px"},
      {type: "Межкомнатная дверь", brand: "Vivo-Porte",  brand_city: "г. Светлый", model: "линия  Глория, модель 30.29", cover: "полиуретан или шпон дуба", sizes_width: "600, 700, 800, 900, 1000 мм.", price_set: "11 790", price_mont: "14 090", set: "коробка, наличники с двух сторон, петли, замок, полотно", colors: [{key: "kanaletto", pic_url: "глория 3029 каналетто.jpg"}, {key: "dub_tab", pic_url: "глория 3029 дуб табак.jpg"}, {key: "venge_mok", pic_url: "глория 3029 венге мокка.jpg"}, {key: "venge_pokr", pic_url: "глория 3029 венге файнлайн.jpg"}, {key: "dub_fine", pic_url: "глория 3029 дуб файнлайн.jpg"}], filling: "каркас из сращенного бруса хвойных пород дерева", descript: "Многообразие вариантов отделок (шпон с открытым порами, шпон под покраску, полиуретановое покрытие)", paint: "Двери серии Глория окрашиваются полиуретановыми красками по шпону дуба в любой цвет таблицы цветов RAL.", cover_img: "глория 3029 каналетто.jpg", inter_img: "", position: "-196px -420px"},
      {type: "Межкомнатная дверь", brand: "Vivo-Porte",  brand_city: "г. Светлый", model: "линия  Глория, модель 30.32", cover: "полиуретан или шпон дуба", sizes_width: "600, 700, 800, 900, 1000 мм.", price_set: "13 890", price_mont: "16 190", set: "коробка, наличники с двух сторон, петли, замок, полотно", colors: [{key: "kanaletto", pic_url: "глория 3032 каналетто.jpg"}, {key: "dub_tab", pic_url: "глория 3032 дуб табак.jpg"}, {key: "venge_mok", pic_url: "глория 3032 венге мокка.jpg"}, {key: "venge_pokr", pic_url: "глория 3032 венге файнлайн.jpg"}, {key: "dub_fine", pic_url: "глория 3032 дуб файнлайн.jpg"}], filling: "каркас из сращенного бруса хвойных пород дерева", descript: "Многообразие вариантов отделок (шпон с открытым порами, шпон под покраску, полиуретановое покрытие)", paint: "Двери серии Глория окрашиваются полиуретановыми красками по шпону дуба в любой цвет таблицы цветов RAL.", cover_img: "глория 3032 каналетто.jpg", inter_img: "", position: "-294px -420px"},
      {type: "Межкомнатная дверь", brand: "Vivo-Porte",  brand_city: "г. Светлый", model: "линия  Версаль, модель 15.12", cover: "полиуретан или шпон дуба", sizes_width: "600, 700, 800, 900, 1000 мм.", price_set: "14 280", price_mont: "16 580", set: "коробка, наличники с двух сторон, петли, замок, полотно", colors: [], filling: "каркас из сращенного бруса хвойных пород дерева", descript: "Легкие и прочные двери Версаль достойны дворцов. Уникальные цвета окраски: от теплого до радостно-яркого", paint: "Двери серии Версаль окрашиваются полиуретановыми красками по шпону дуба в любой цвет таблицы цветов RAL с последующим лакированием поверхностей.Окраска по шпону дуба сохраняет текстуру дерева.", cover_img: "версаль 15.12.jpg", inter_img: "", position: "-392px -420px"},
      {type: "Межкомнатная дверь", brand: "Vivo-Porte",  brand_city: "г. Светлый", model: "линия  Версаль, модель 15.19", cover: "полиуретан или шпон дуба", sizes_width: "600, 700, 800, 900, 1000 мм.", price_set: "14 280", price_mont: "16 580", set: "коробка, наличники с двух сторон, петли, замок, полотно", colors: [], filling: "каркас из сращенного бруса хвойных пород дерева", descript: "Легкие и прочные двери Версаль достойны дворцов. Уникальные цвета окраски: от теплого до радостно-яркого", paint: "Двери серии Версаль окрашиваются полиуретановыми красками по шпону дуба в любой цвет таблицы цветов RAL с последующим лакированием поверхностей.Окраска по шпону дуба сохраняет текстуру дерева.", cover_img: "версаль 15.19.jpg", inter_img: "", position: "-490px -420px"},
      {type: "Межкомнатная дверь", brand: "Vivo-Porte",  brand_city: "г. Светлый", model: "линия  Версаль, модель 15.36", cover: "полиуретан или шпон дуба", sizes_width: "600, 700, 800, 900, 1000 мм.", price_set: "15 980", price_mont: "18 280", set: "коробка, наличники с двух сторон, петли, замок, полотно", colors: [], filling: "каркас из сращенного бруса хвойных пород дерева", descript: "Легкие и прочные двери Версаль достойны дворцов. Уникальные цвета окраски: от теплого до радостно-яркого", paint: "Двери серии Версаль окрашиваются полиуретановыми красками по шпону дуба в любой цвет таблицы цветов RAL с последующим лакированием поверхностей.Окраска по шпону дуба сохраняет текстуру дерева.", cover_img: "версаль 15.36.jpg", inter_img: "", position: "-588px -420px"},
      {type: "Межкомнатная дверь", brand: "Vivo-Porte",  brand_city: "г. Светлый", model: "линия  Версаль, модель 15.69", cover: "полиуретан или шпон дуба", sizes_width: "600, 700, 800, 900, 1000 мм.", price_set: "16 805", price_mont: "19 105", set: "коробка, наличники с двух сторон, петли, замок, полотно", colors: [], filling: "каркас из сращенного бруса хвойных пород дерева", descript: "Легкие и прочные двери Версаль достойны дворцов. Уникальные цвета окраски: от теплого до радостно-яркого", paint: "Двери серии Версаль окрашиваются полиуретановыми красками по шпону дуба в любой цвет таблицы цветов RAL с последующим лакированием поверхностей.Окраска по шпону дуба сохраняет текстуру дерева.", cover_img: "версаль 15.69.jpg", inter_img: "", position: "-686px -420px"},
      {type: "Межкомнатная дверь", brand: "Vivo-Porte",  brand_city: "г. Светлый", model: "линия  Версаль, модель 15.75", cover: "полиуретан или шпон дуба", sizes_width: "600, 700, 800, 900, 1000 мм.", price_set: "17 400", price_mont: "19 700", set: "коробка, наличники с двух сторон, петли, замок, полотно", colors: [], filling: "каркас из сращенного бруса хвойных пород дерева", descript: "Легкие и прочные двери Версаль достойны дворцов. Уникальные цвета окраски: от теплого до радостно-яркого", paint: "Двери серии Версаль окрашиваются полиуретановыми красками по шпону дуба в любой цвет таблицы цветов RAL с последующим лакированием поверхностей.Окраска по шпону дуба сохраняет текстуру дерева.", cover_img: "версаль 15.75.jpg", inter_img: "", position: "-784px -420px"},
    ],
    glass: [
      {type: "Стеклянная межкомнатная дверь", brand: "Акма", brand_city: "г. Санкт-Петербург", model: "серия Fantasy, модель Ночь", color: "mat_clear", sizes_width: "любые", price_pol: "10 410", price_set: "24 764", set: "коробка (алюминий или дерево), полотно, петли, ручка", colors: [{key: "clear", pic_url: ""}, {key: "bronze", pic_url: ""}, {key: "grey_glass", pic_url: ""}, {key: "mat_clear", pic_url: ""}, {key: "mat_bronze", pic_url: ""}, {key: "mat_grey", pic_url: ""}], descr: "Стекло с пескоструйным рисунком.<br>Подходит для ванных, душевых и саун.", cover_img: "акма - fantazy ночь.jpg", position: "0px -630px"},
      {type: "Стеклянная межкомнатная дверь", brand: "Акма", brand_city: "г. Санкт-Петербург", model: "серия Florid, модель Пенелопа", color: "mat_clear", sizes_width: "любые", price_pol: "13 804", price_set: "28 158", set: "коробка (алюминий или дерево), полотно, петли, ручка", colors: [{key: "clear", pic_url: ""}, {key: "bronze", pic_url: ""}, {key: "grey_glass", pic_url: ""}, {key: "mat_clear", pic_url: ""}, {key: "mat_bronze", pic_url: ""}, {key: "mat_grey", pic_url: ""}], descr: "Декорирование дверного полотна спечеными цветными стеклами, выполненными по технологии Фьюзинг. Подходит для ванных, душевых и саун.", cover_img: "акма пенелопа.jpg", position: "-98px -630px"},
      {type: "Стеклянная межкомнатная дверь", brand: "Акма", brand_city: "г. Санкт-Петербург", model: "серия Illusion, модель Аврора", color: "mat_clear", sizes_width: "любые", price_pol: "9 804", price_set: "24 158", set: "коробка (алюминий или дерево), полотно, петли, ручка", colors: [{key: "clear", pic_url: ""}, {key: "bronze", pic_url: ""}, {key: "grey_glass", pic_url: ""}, {key: "mat_clear", pic_url: ""}, {key: "mat_bronze", pic_url: ""}, {key: "mat_grey", pic_url: ""}], descr: "Серия ILLUSION представлена различными видами рисунков, которые наносятся на полотно методом гравировки. Подходит для ванных, душевых и саун.", cover_img: "иллюзион - аврора.jpg", position: "-196px -630px"},
      {type: "Стеклянная межкомнатная дверь", brand: "Акма", brand_city: "г. Санкт-Петербург", model: "серия Illusion, модель Диана", color: "mat_clear", sizes_width: "любые", price_pol: "10 894", price_set: "25 248", set: "коробка (алюминий или дерево), полотно, петли, ручка", colors: [{key: "clear", pic_url: ""}, {key: "bronze", pic_url: ""}, {key: "grey_glass", pic_url: ""}, {key: "mat_clear", pic_url: ""}, {key: "mat_bronze", pic_url: ""}, {key: "mat_grey", pic_url: ""}], descr: "Серия ILLUSION представлена различными видами рисунков, которые наносятся на полотно методом гравировки. Подходит для ванных, душевых и саун.", cover_img: "иллюзион - диана.jpg", position: "-294px -630px"},
      {type: "Стеклянная межкомнатная дверь", brand: "Акма", brand_city: "г. Санкт-Петербург", model: "серия Light, модель Light бронза матовая", color: "mat_bronze", sizes_width: "любые", price_pol: "9 842", price_set: "24 169", set: "коробка (алюминий или дерево), полотно, петли, ручка", colors: [{key: "clear", pic_url: ""}, {key: "bronze", pic_url: ""}, {key: "grey_glass", pic_url: ""}, {key: "mat_clear", pic_url: ""}, {key: "mat_bronze", pic_url: ""}, {key: "mat_grey", pic_url: ""}], descr: "Гладкое стекло без декоративных элементов. Элегантные  двери LIGHT впишутся в любой интерьер.<br>Подходит для ванных, душевых и саун.", cover_img: "акма лайт.jpg", position: "-392px -630px"},
      {type: "Стеклянная межкомнатная дверь", brand: "Акма", brand_city: "г. Санкт-Петербург", model: "серия Light, модель Light", color: "mat_clear", sizes_width: "любые", price_pol: "6 874", price_set: "21 228", set: "коробка (алюминий или дерево), полотно, петли, ручка", colors: [{key: "clear", pic_url: ""}, {key: "bronze", pic_url: ""}, {key: "grey_glass", pic_url: ""}, {key: "mat_clear", pic_url: ""}, {key: "mat_bronze", pic_url: ""}, {key: "mat_grey", pic_url: ""}], descr: "Гладкое стекло без декоративных элементов. Элегантные  двери LIGHT впишутся в любой интерьер.<br>Подходит для ванных, душевых и саун.", cover_img: "МАТОВАЯ.jpg", position: "-490px -630px"},
      {type: "Стеклянная межкомнатная дверь", brand: "Акма", brand_city: "г. Санкт-Петербург", model: "серия Triplex, модель Black", color: "black", sizes_width: "любые", price_pol: "14 522", price_set: "28 906", set: "коробка (алюминий или дерево), полотно, петли, ручка", colors: [{key: "black", pic_url: ""}, {key: "red", pic_url: ""}, {key: "orange", pic_url: ""}, {key: "white", pic_url: ""}], descr: "Дверь может быть выполнена в любом цвете по каталогу RAL", cover_img: "акма black.jpg", position: "-588px -630px"},
      {type: "Стеклянная межкомнатная дверь", brand: "Акма", brand_city: "г. Санкт-Петербург", model: "серия Satin, модель Хохлома", color: "mat_clear", sizes_width: "любые", price_pol: "11 290", price_set: "25 644", set: "коробка (алюминий или дерево), полотно, петли, ручка", colors: [{key: "clear", pic_url: ""}, {key: "bronze", pic_url: ""}, {key: "grey_glass", pic_url: ""}, {key: "mat_clear", pic_url: ""}, {key: "mat_bronze", pic_url: ""}, {key: "mat_grey", pic_url: ""}], descr: "Декор выполнен печатью керамическими красками, устойчив к неблагоприятным воздействиям: нагреванию, влажности, солнечному свету.<br>Подходит для ванных, душевых и саун.", cover_img: "акма хохлома.jpg", position: "-686px -630px"},
      {type: "Стеклянная межкомнатная дверь", brand: "Акма", brand_city: "г. Санкт-Петербург", model: "серия Imagination, модель Books", color: "mat_clear", sizes_width: "любые", price_pol: "11 158", price_set: "25 512", set: "коробка (алюминий или дерево), полотно, петли, ручка", colors: [{key: "clear", pic_url: ""}, {key: "bronze", pic_url: ""}, {key: "grey_glass", pic_url: ""}, {key: "mat_clear", pic_url: ""}, {key: "mat_bronze", pic_url: ""}, {key: "mat_grey", pic_url: ""}], descr: "Печать любого изображения с одной или обеих сторон.<br>Подходит для ванных, душевых и саун.", cover_img: "акма books.jpg", position: "-784px -630px"}
    ]
  }

  $scope.colors = {
    milky_dub: {name: "Молочный дуб", pic_url: "молочный дуб.jpg"},
    brazil_pear: {name: "Бразильская груша", pic_url: "бразильская груша.jpg"},
    mor_dub: {name: "Мореный дуб", pic_url: "мореный дуб.jpg"},
    coffee: {name: "Кофе", pic_url: "кофе.jpg"},
    kanaletto: {name: "Каналетто", pic_url: "каналетто.jpg"},
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
        descr: "Жуковы Александр, Надежда<br>и маленькая Антонина"
      },
      text: "Мы заказали в Краснодеревщике все двери в квартиру, а так же входную дверь.<br><br>Интерьер у нас светлый, поэтому мы выбрали выбеленный дуб, который обманчиво кажется марким, а на самом деле очень практичный - Тоня проверяет его на прочность каждый день.<br><br>Дверями очень довольны!",
      ad: {
        cover_pic: "жуковы/жуковы 1.jpg",
        pics: ["жуковы/жуковы 1.jpg", "жуковы/жуковы 2.jpg", "жуковы/жуковы 4.jpg"],
        text: "Межкомнатные деври Краснодеревщик, серия 3000, модель 33.52, цвет выбеленный дуб.<br>Стоимость 9 комплектов дверей со скидкой 102 006 руб."
      }
    },
    {
      pic: {
        position: "-230px 0px", 
        descr: "Бычковы Александр и Юлия"
      },
      text: "Отличный вариант по цене и качеству 3000 серии дверей + подход к работе с клиентами! Не мало важный момент, оплата по банковской карте и частями, пока идет товар.<br><br>Сделали замеры  и доставили в срок, только сама отделка квартиры затянулась, но дождался  времени установки))) и мастера очень порадовали, особенно Александр!",
      ad: {
        text: "Межкомнатные деври Краснодеревщик, серия 3000, модель 33.52, цвет черный дуб.<br>Стоимость 4 комплектов дверей со скидкой 42 843 руб.",
        cover_pic: "бычковы/IMG_6723.JPG",
        pics: ["бычковы/IMG_6723.JPG", "бычковы/IMG_6720.jpg", "бычковы/IMG_6725.JPG"]
      }
    },
    {
      pic: {
        position: "-460px 0px", 
        descr: "Влащицкие Дмитрий, Светлана<br>и Василий"
      },
      text: "В Краснодеревщик обращались 2 раза, и оба раза остались довольны! Двери качественные, монтировали Александр и Сергей. Им особая благодарность, к установке подошли основательно, не спешили, каждую мелочь обговаривали с нами! <br><br>Двери смотрятся богато! Очень понравились замки на последних дверях (закрываются мягко-не хлопают!). В общем двери классные! Обслуживание отличное! Монтаж качественный!<br>Всем рекомендую!",
      ad: {
        text: "Межкомнатные деври Краснодеревщик, серия 3000, модели 33.24 и 33.23, цвет грецкий орех.<br>Стоимость 12 комплектов дверей со скидкой 130 542 руб.",
        cover_pic: "влащитские/IMG_6696.JPG",
        pics: ["влащитские/IMG_6696.JPG", "влащитские/IMG_6695.JPG", "влащитские/IMG_6689.JPG"]
      }
    },
    {
      pic: {
        position: "-691px 0px", 
        descr: "Бизнес-центр «Президент»"
      },
      text: "Бизнес-центр премиум класса «Президент» полностью укомплектован продукцией Краснодеревщик - от межкомнатных дверей в таулеты и офисы до специальных противопожарных дверей.",
      ad: {
        text: "Двери для бизнес-центров и офисных помещений выполняются под<br>заказ, каждый проект рассчитывается индивидуально.",
        cover_pic: "президент/IMG_6710.JPG",
        pics: ["президент/IMG_6710.JPG", "президент/IMG_6713.JPG", "президент/IMG_6714.JPG"]
      }
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

  $scope.openDoorPopup = function(door){
    $scope.selectedDoor = door;
    $scope.selectedDoor.selected_cover_img = $scope.selectedDoor.cover_img
    if ($scope.selectedType=="paint") {
      $scope.showPaintDoorPopup = true;
    }else{
      $scope.showDefaultDoorPopup = true;
    }
  }

  $scope.changeColor = function(color){
    if (color.pic_url!='') 
      $scope.selectedDoor.selected_cover_img = color.pic_url;
  }

  $scope.openPolitics = function(){
    $scope.showPolitics = true;
  }

  $scope.openInOneClick = function(door){
    $scope.showInOneClick = true;
    $scope.selectedDoor = door;
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