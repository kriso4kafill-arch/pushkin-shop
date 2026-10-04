// Данные магазина (формат JSON). Редактируйте значения, не трогая первую строку с window.SHOP_DATA и последнюю с ;
// Поля товара:
//   id          — номер товара (как в таблице/каталоге)
//   name        — название; китайская и русская части разделены переносом строки \n
//   price       — цена в рублях (если цена «от-до» — нижняя граница)
//   priceMax    — верхняя граница цены или null, если цена одна
//   minQty      — столбец «Количество» из таблицы (похоже на минимальную партию), на сайте пока не используется
//   design      — столбец «Дизайн» из таблицы (что можно кастомизировать), на сайте пока не используется
//   image       — номер картинки: images/<image>.jpg|jpeg|png|webp|svg. Если файла нет — показывается images/placeholder.svg
//   recommended — "yes" — показывать в большом слайдере «Рекомендуем», "no" — не показывать
window.SHOP_DATA = {
  "settings": {
    "shopName": "Лавка Института Пушкина",
    "orderEmail": "kriska.fill@yandex.ru",
    "lastOrderNumber": 1000,
    "orderPrefix": "ПИ-",
    "currency": "₽",
    "imagesFolder": "images",
    "priceNote": "Цена варьируется в зависимости от качества и дизайна. Если есть предложения по изменению дизайна, мы готовы их обсудить.",
    "placeholder": "placeholder.svg"
  },
  "products": [
    {
      "id": 1,
      "name": "Блокнот1",
      "price": 420,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO",
      "image": 1,
      "recommended": "no"
    },
    {
      "id": 2,
      "name": "笔记本2\nБлокнот2",
      "price": 680,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO",
      "image": 2,
      "recommended": "no"
    },
    {
      "id": 3,
      "name": "笔记本3\nБлокнот 3",
      "price": 680,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO",
      "image": 3,
      "recommended": "no"
    },
    {
      "id": 4,
      "name": "笔记本4\nБлокнот4",
      "price": 680,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO",
      "image": 4,
      "recommended": "no"
    },
    {
      "id": 5,
      "name": "笔\nРучка",
      "price": 180,
      "priceMax": null,
      "minQty": 300,
      "design": "LOGO",
      "image": 5,
      "recommended": "no"
    },
    {
      "id": 6,
      "name": "一次性纸杯\nСтаканы одноразовые бумажные",
      "price": 20,
      "priceMax": null,
      "minQty": 500,
      "design": "颜色、LOGO（此纸杯是高级铝箔纸杯，并非普通款式）",
      "image": 6,
      "recommended": "no"
    },
    {
      "id": 7,
      "name": "一次性含茶纸杯\nСтаканы одноразовые с заваркой",
      "price": 45,
      "priceMax": null,
      "minQty": 500,
      "design": "颜色、LOGO（可选中国绿茶、红茶、茉莉花茶）(Такая цена, потому что в каждом стакане уже есть заварка )",
      "image": 7,
      "recommended": "no"
    },
    {
      "id": 8,
      "name": "马克杯\nКружка",
      "price": 300,
      "priceMax": 500,
      "minQty": 80,
      "design": "LOGO",
      "image": 8,
      "recommended": "yes"
    },
    {
      "id": 9,
      "name": "茶缸子\nЧайная кружка",
      "price": 530,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO （Можно выбрать любой дизайн）",
      "image": 9,
      "recommended": "no"
    },
    {
      "id": 10,
      "name": "俄式茶杯\nПодстаканник с гранёным стаканом",
      "price": 800,
      "priceMax": null,
      "minQty": 100,
      "design": "LOGO",
      "image": 10,
      "recommended": "no"
    },
    {
      "id": 11,
      "name": "卫衣\nТолстовка",
      "price": 900,
      "priceMax": 1400,
      "minQty": 80,
      "design": "LOGO（颜色可选：白、蓝、黑）",
      "image": 11,
      "recommended": "yes"
    },
    {
      "id": 12,
      "name": "短袖\nФутболка",
      "price": 800,
      "priceMax": 1200,
      "minQty": 80,
      "design": "LOGO（颜色可选：白、蓝、黑）",
      "image": 12,
      "recommended": "yes"
    },
    {
      "id": 13,
      "name": "便签本\nБлокнот с отрывными листами",
      "price": 200,
      "priceMax": null,
      "minQty": 100,
      "design": "LOGO",
      "image": 13,
      "recommended": "no"
    },
    {
      "id": 14,
      "name": "鸭舌帽\nКепка",
      "price": 480,
      "priceMax": 780,
      "minQty": 80,
      "design": "LOGO（颜色可选：白、蓝、黑）",
      "image": 14,
      "recommended": "yes"
    },
    {
      "id": 15,
      "name": "转换器套装圆形\nНабор переходников",
      "price": 500,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO",
      "image": 15,
      "recommended": "no"
    },
    {
      "id": 16,
      "name": "帆布包特殊定制\nКастомный шоппер",
      "price": 950,
      "priceMax": null,
      "minQty": 100,
      "design": "颜色、LOGO",
      "image": 16,
      "recommended": "no"
    },
    {
      "id": 17,
      "name": "纸袋\nБумажный пакет с ручкой",
      "price": 45,
      "priceMax": null,
      "minQty": 500,
      "design": "颜色、LOGO",
      "image": 17,
      "recommended": "no"
    },
    {
      "id": 18,
      "name": "笔袋\nПенал",
      "price": 600,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO",
      "image": 18,
      "recommended": "no"
    },
    {
      "id": 19,
      "name": "护照包\nОбложка на паспорт",
      "price": 900,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO",
      "image": 19,
      "recommended": "no"
    },
    {
      "id": 20,
      "name": "U形枕\nПодушка для шеи",
      "price": 1000,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO",
      "image": 20,
      "recommended": "no"
    },
    {
      "id": 21,
      "name": "会议夹\nПапка-планшет",
      "price": 500,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO",
      "image": 21,
      "recommended": "no"
    },
    {
      "id": 22,
      "name": "文件夹\nПапка с зажимом",
      "price": 580,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO",
      "image": 22,
      "recommended": "no"
    },
    {
      "id": 23,
      "name": "台历\nКалендарь",
      "price": 480,
      "priceMax": null,
      "minQty": 100,
      "design": "颜色、LOGO（单版型100起）",
      "image": 23,
      "recommended": "no"
    },
    {
      "id": 24,
      "name": "手机支架\nДержатель для телефона",
      "price": 460,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO（可选颜色：黑、白）",
      "image": 24,
      "recommended": "no"
    },
    {
      "id": 25,
      "name": "卡套\nБейдж с лентой для пропусков и карт",
      "price": 450,
      "priceMax": null,
      "minQty": 100,
      "design": "LOGO",
      "image": 25,
      "recommended": "no"
    },
    {
      "id": 26,
      "name": "卡夹\nКартхолдер",
      "price": 680,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO",
      "image": 26,
      "recommended": "no"
    },
    {
      "id": 27,
      "name": "拓展坞\nДок станция",
      "price": 1000,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO",
      "image": 27,
      "recommended": "no"
    },
    {
      "id": 28,
      "name": "一拖三USB数据线\nУниверсальный кабель USB 3 в 1",
      "price": 400,
      "priceMax": null,
      "minQty": 100,
      "design": "LOGO（颜色可选：白、蓝、黑、黄、灰）",
      "image": 28,
      "recommended": "no"
    },
    {
      "id": 29,
      "name": "转换器套装长方形\nНабор переходников",
      "price": 480,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO",
      "image": 29,
      "recommended": "no"
    },
    {
      "id": 30,
      "name": "U盘\nФлешка",
      "price": 750,
      "priceMax": null,
      "minQty": 100,
      "design": "LOGO",
      "image": 30,
      "recommended": "no"
    },
    {
      "id": 31,
      "name": "钥匙链\nБрелок для ключей",
      "price": 200,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO、造型",
      "image": 31,
      "recommended": "no"
    },
    {
      "id": 32,
      "name": "定制冰箱贴\nИндивидуальный магнит",
      "price": 680,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO",
      "image": 32,
      "recommended": "no"
    },
    {
      "id": 33,
      "name": "杯垫\nПодстаканник",
      "price": 250,
      "priceMax": null,
      "minQty": 100,
      "design": "颜色、LOGO",
      "image": 33,
      "recommended": "no"
    },
    {
      "id": 34,
      "name": "胸章\nЗначок",
      "price": 480,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO （Можно выбрать любой дизайн）",
      "image": 34,
      "recommended": "no"
    },
    {
      "id": 35,
      "name": "盘子\nСувенирная тарелка",
      "price": 800,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO",
      "image": 35,
      "recommended": "no"
    },
    {
      "id": 36,
      "name": "礼盒套装\nПодарочный набор с мерчем",
      "price": 1700,
      "priceMax": 2000,
      "minQty": 50,
      "design": "可选内容（日历、笔、保温杯、雨伞（非定制）等常规物品）",
      "image": 36,
      "recommended": "no"
    },
    {
      "id": 37,
      "name": "工牌\nБейдж на шею",
      "price": 280,
      "priceMax": null,
      "minQty": 50,
      "design": "",
      "image": 37,
      "recommended": "no"
    },
    {
      "id": 38,
      "name": "文件袋/资料袋\nПапка для документов",
      "price": 480,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO",
      "image": 38,
      "recommended": "no"
    },
    {
      "id": 39,
      "name": "行李箱保护罩\nЧехол для чемодана",
      "price": 800,
      "priceMax": 1500,
      "minQty": 50,
      "design": "颜色、LOGO（根据登机箱和托运箱的尺寸区分价格）",
      "image": 39,
      "recommended": "no"
    },
    {
      "id": 40,
      "name": "保温杯\nТермос",
      "price": 450,
      "priceMax": 680,
      "minQty": 70,
      "design": "LOGO（颜色可选：蓝、红）",
      "image": 40,
      "recommended": "yes"
    },
    {
      "id": 41,
      "name": "雨伞\nЗонт",
      "price": 1300,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO",
      "image": 41,
      "recommended": "no"
    },
    {
      "id": 42,
      "name": "咖啡杯\nКофейная чашка",
      "price": 600,
      "priceMax": null,
      "minQty": 60,
      "design": "LOGO",
      "image": 42,
      "recommended": "no"
    },
    {
      "id": 43,
      "name": "亚克力冰箱贴\nАкриловый магнит",
      "price": 250,
      "priceMax": null,
      "minQty": 200,
      "design": "颜色、LOGO、造型",
      "image": 43,
      "recommended": "no"
    },
    {
      "id": 44,
      "name": "眼罩\nМаска для сна",
      "price": 430,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO",
      "image": 44,
      "recommended": "no"
    },
    {
      "id": 45,
      "name": "定制钥匙链\nИндивидуальный брелок",
      "price": 450,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO",
      "image": 45,
      "recommended": "no"
    },
    {
      "id": 46,
      "name": "橡皮\nЛастик",
      "price": 80,
      "priceMax": null,
      "minQty": 100,
      "design": "LOGO",
      "image": 46,
      "recommended": "no"
    },
    {
      "id": 47,
      "name": "手机壳\nЧехол для телефона",
      "price": 600,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO（定制提供型号）",
      "image": 47,
      "recommended": "no"
    },
    {
      "id": 48,
      "name": "手机气囊支架\nПопсокет",
      "price": 230,
      "priceMax": null,
      "minQty": 100,
      "design": "LOGO、图案",
      "image": 48,
      "recommended": "no"
    },
    {
      "id": 49,
      "name": "鼠标垫\nКоврик для мыши",
      "price": 400,
      "priceMax": null,
      "minQty": 100,
      "design": "颜色、LOGO、图案（单版型100起）",
      "image": 49,
      "recommended": "no"
    },
    {
      "id": 50,
      "name": "化妆镜\nНастольное зеркало",
      "price": 480,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO （Можно выбрать любой дизайн）",
      "image": 50,
      "recommended": "no"
    },
    {
      "id": 51,
      "name": "亚克力立牌\nАкриловая фотоподставка",
      "price": 530,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO",
      "image": 51,
      "recommended": "no"
    },
    {
      "id": 52,
      "name": "活页本\nСменный блок для тетради",
      "price": 460,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO",
      "image": 52,
      "recommended": "no"
    },
    {
      "id": 53,
      "name": "卡包\nКартхолдер",
      "price": 880,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO",
      "image": 53,
      "recommended": "no"
    },
    {
      "id": 54,
      "name": "毕业相册\nВыпускной фотоальбом",
      "price": 1500,
      "priceMax": null,
      "minQty": 80,
      "design": "颜色、LOGO（内容封面可定制） （Можно выбрать любой дизайн под любой запрос ）",
      "image": 54,
      "recommended": "no"
    },
    {
      "id": 55,
      "name": "线圈笔记本\nТетрадь на кольцах",
      "price": 400,
      "priceMax": null,
      "minQty": 50,
      "design": "LOGO",
      "image": 55,
      "recommended": "no"
    },
    {
      "id": 56,
      "name": "明信片\nОткрытка",
      "price": 90,
      "priceMax": null,
      "minQty": 500,
      "design": "颜色、LOGO、文字、图案等",
      "image": 56,
      "recommended": "no"
    },
    {
      "id": 57,
      "name": "帆布包\nШоппер",
      "price": 780,
      "priceMax": null,
      "minQty": 100,
      "design": "颜色、LOGO",
      "image": 57,
      "recommended": "yes"
    },
    {
      "id": 58,
      "name": "遮阳伞\nЗонт солнцезащитный",
      "price": 1000,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO",
      "image": 58,
      "recommended": "no"
    },
    {
      "id": 59,
      "name": "书签\nЗакладка",
      "price": 80,
      "priceMax": 100,
      "minQty": 100,
      "design": "颜色、LOGO",
      "image": 59,
      "recommended": "no"
    },
    {
      "id": 60,
      "name": "毛巾\nПолотенце",
      "price": 400,
      "priceMax": null,
      "minQty": 50,
      "design": "颜色、LOGO",
      "image": 60,
      "recommended": "no"
    }
  ]
};
