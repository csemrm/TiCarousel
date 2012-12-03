
var TiCarousel = require('com.obscure.ticarousel'),
    views = [];

/*
for (i=0; i < 20; i++) {
  // NOTE the views provided to the carousel cannot currently use
  // Ti.UI.SIZE or Ti.UI.FILL (or 'auto', for that matter).
  var view = Ti.UI.createImageView({
    height: 320,
    width: 200,
    image: '/images/page.png',
  });
  view.add(Ti.UI.createLabel({
    center: { x: 100, y: 140 },
    font: {
      fontSize: 24
    },
    text: String.format('#%d', i),
    textAlign: 'center',
  }));
  views.push(view);
}
*/

function createImageView(img, name) {
  var result = Ti.UI.createView({
    height: 240,
    width: 240,
    backgroundColor: '#333',
  });

  result.add(Ti.UI.createImageView({
    height: Ti.UI.FILL,
    width: Ti.UI.FILL,
    image: img,
  }));

  result.add(Ti.UI.createLabel({
    bottom: 0,
    left: 0,
    width: 240,
    height: 26,
    text: name,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#ccc',
    opacity: 0.8,
    zIndex: 10,
  }));
  
  // TODO click event to show large version
  
  return result;
}

var views = [
  createImageView('images/01_bruges.jpg', 'Bruges'),
  createImageView('images/02_hawaiian_chieftan.jpg', 'The Hawai\'ian Chieftan'),
  createImageView('images/03_socrates.jpg', 'Socrates'),
  createImageView('images/04_pigeon_point.jpg', 'Pigeon Point Lighthouse'),
  createImageView('images/05_cattle.jpg', 'Dad\'s cattle'),
  createImageView('images/06_belgium_canal.jpg', 'Canal in Belgium'),
  createImageView('images/07_west_cliff.jpg', 'West Cliff Dr.'),
  createImageView('images/08_bike.jpg', 'Swanton Loop peak'),
  createImageView('images/09_pacific_ave.jpg', 'Pacific Ave.'),
  createImageView('images/10_crabe_extra.jpg', 'Crabe Extra'),
  createImageView('images/11_ghent.jpg', 'Ghent'),
];


function createTypePickerView(carousel) {
  var self = Ti.UI.createView({
    bottom: -240,
    height: 240,
    backgroundColor: '#ccc',
    zIndex: 100,
  });
  
  var rows = [
    Ti.UI.createPickerRow({ title: L('type_LINEAR'), type: TiCarousel.CAROUSEL_TYPE_LINEAR }),
    Ti.UI.createPickerRow({ title: L('type_ROTARY'), type: TiCarousel.CAROUSEL_TYPE_ROTARY }),
    Ti.UI.createPickerRow({ title: L('type_INVERTED_ROTARY'), type: TiCarousel.CAROUSEL_TYPE_INVERTED_ROTARY }),
    Ti.UI.createPickerRow({ title: L('type_CYLINDER'), type: TiCarousel.CAROUSEL_TYPE_CYLINDER }),
    Ti.UI.createPickerRow({ title: L('type_INVERTED_CYLINDER'), type: TiCarousel.CAROUSEL_TYPE_INVERTED_CYLINDER }),
    Ti.UI.createPickerRow({ title: L('type_WHEEL'), type: TiCarousel.CAROUSEL_TYPE_WHEEL }),
    Ti.UI.createPickerRow({ title: L('type_INVERTED_WHEEL'), type: TiCarousel.CAROUSEL_TYPE_INVERTED_WHEEL }),
    Ti.UI.createPickerRow({ title: L('type_COVER_FLOW'), type: TiCarousel.CAROUSEL_TYPE_COVER_FLOW }),
    Ti.UI.createPickerRow({ title: L('type_COVER_FLOW2'), type: TiCarousel.CAROUSEL_TYPE_COVER_FLOW2 }),
    Ti.UI.createPickerRow({ title: L('type_TIME_MACHINE'), type: TiCarousel.CAROUSEL_TYPE_TIME_MACHINE }),
    Ti.UI.createPickerRow({ title: L('type_INVERTED_TIME_MACHINE'), type: TiCarousel.CAROUSEL_TYPE_INVERTED_TIME_MACHINE }),
    Ti.UI.createPickerRow({ title: L('type_BUMP'), type: TiCarousel.CAROUSEL_TYPE_BUMP }),
  ];
  
  var picker = Ti.UI.createPicker({
    top: 10
  });
  
  picker.add(rows);
  
  picker.addEventListener('change', function(e) {
    carousel.carouselType = e.row.type;
    self.fireEvent('done', {
      title: e.row.title
    });
  });
  
  self.add(picker);
  return self;
}


function createToolbar(parentView, typeLabel, carousel) {
  var typeButton = Ti.UI.createButton({
    title: L('typeButton_label'),
    style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
  });
  var typePickerView = createTypePickerView(carousel);
  typePickerView.addEventListener('done',function(e) {
    typeLabel.text = e.title;
    typePickerView.animate({
      bottom: typePickerView.bottom,
      duration: 200,
    });
  });
  parentView.add(typePickerView);
  
  typeButton.addEventListener('click', function(e) {
    typePickerView.animate({
      bottom: 0,
      duration: 200,
    });
  });
  
  var wrapButton = Ti.UI.createButton({
    title: L('wrapButton_label_off'),
    style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
  });
  wrapButton.addEventListener('click', function(e) {
    Ti.API.info("wrap is "+carousel.wrap);
    carousel.wrap = !carousel.wrap;
    carousel.reloadData();
    wrapButton.title = carousel.wrap ? L('wrapButton_label_on') : L('wrapButton_label_off');
  });
  
  var flexSpace = Ti.UI.createButton({
    systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
  });
  
  var self = Ti.UI.iOS.createToolbar({
    items: [typeButton, flexSpace, wrapButton],
    bottom: 0,
    borderTop: true,
    borderBottom: false,
  });
  
  return self;
}

function CarouselView() {
  var self = Ti.UI.createView();

  var typeLabel = Ti.UI.createLabel({
    top: 0,
    height: 24,
    text: L('type_LINEAR'),
  });
  self.add(typeLabel);

	var carousel = TiCarousel.createCarouselView({
	  top: 24,
    carouselType: TiCarousel.CAROUSEL_TYPE_LINEAR,
    views: views,
    itemWidth: 250,
    numberOfVisibleItems: 12,
    wrap: false,
	});

  var toolbar = createToolbar(self, typeLabel, carousel);

  self.add(carousel);
  self.add(toolbar);
  	
	return self;
}

module.exports = CarouselView;
