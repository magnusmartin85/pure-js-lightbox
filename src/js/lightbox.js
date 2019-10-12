let imgFolderUrl = 'img';

const imgNames = [
    '01.jpg',
    '02.jpg',
    '03.jpg',
    '04.jpg',
    '05.jpg',
    '06.jpg',
    '07.jpg',
    '08.jpg',
    '09.jpg',
];

const imgSource = [
    'Photo by Ian Turnell from Pexels',
    'Photo by Jaymantri from Pexels',
    'Photo by Markus Spiske temporausch.com from Pexels',
    'Photo by James Wheeler from Pexels',
    'Photo by Joyston Judah from Pexels',
    'Photo by Bess Hamiti from Pexels',
    'Photo by Lisa Fotios from Pexels',
    'Photo by KML from Pexels',
    'Photo by Steven Hylands from Pexels'
];

const imgDescriptions = [
    'Body of Water Between Green Leaf Trees',
    'High Angle-photography of Green Forest Trees',
    'Trees Under Blue Sky during Daytime',
    'Lake and Mountain',
    'White and Black Mountain Wallpaper',
    'Multicolored Hot Air Balloon over Calm Sea',
    'Green Trees Under Blue and Orange Sky during Sunset',
    'Aerial Photography of Rock Next to water body',
    'Buildings With Waterfront View'
];

const imgTitles = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
];

if (imgFolderUrl.indexOf('/') !== imgFolderUrl.length + 1) {
    imgFolderUrl = imgFolderUrl + '/';
}

// initial variables
let html = '';
let imgName = '';
const lightboxContainer = $('.lc');

// variables for current img
let currentImg = '';
let currentImgIndex = 0;
let currentImgUrl = '';

// variables for previous img
let prevImgIndex = 0;
let prevImgUrl = '';

// variables for next img
let nextImgIndex = 0;
let nextImgUrl = '';

// variables for caption
let currentCaptionText = '';
let nextDescriptionText = '';
let prevDescriptionText = '';
let imgCount = imgNames.length;


for (let i = 0; i < imgCount; i++) {
    html = html +
        `<div class="row my-3">
        <div class="col-12 col-md-4">
        <div class="ltc">
        <img 
        alt="${imgDescriptions[i]}" 
        class="lto-img" 
        src="${imgFolderUrl}${imgNames[i]}"
        width="400" 
        />
        <div class="lto">
        <div class="lto-title">${imgTitles[i]}</div>
        <div class="lto-description">${imgDescriptions[i]}</div> 
        </div> 
        </div> 
        </div> 
        <div class="col-12 col-md-4"> 
        <div class="ltc"> 
        <img 
        alt="${imgDescriptions[i + 1]}" 
        class="lto-img" 
        src="${imgFolderUrl}${imgNames[i + 1]}" 
        width="400" 
        />
        <div class="lto"> 
        <div class="lto-title">${imgTitles[i + 1]}</div> 
        <div class="lto-description">${imgDescriptions[i + 1]}</div> 
        </div> 
        </div> 
        </div>
        <div class="col-12 col-md-4"> 
        <div class="ltc"> 
        <img 
        alt="${imgDescriptions[i + 2]}"
        class="lto-img" 
        src="${imgFolderUrl}${imgNames[i + 2]}"
        width="400" 
        />
        <div class="lto"> 
        <div class="lto-title">${imgTitles[i + 2]}</div> 
        <div class="lto-description">${imgDescriptions[i + 2]}</div> 
        </div> 
        </div>  
        </div> 
        </div>`;
    i = i + 2;
}
appendLightboxImgs();

// On load
$(document).ready(() => {
    appendLightboxOverlay();
});

// Trigger Lightbox on click
$('.lto, .lto-description, .lto-title')
    .on('click', event => {
        openOverlay(event);
    });

// Handle click on previous img button
$(lightboxContainer).on('click', '.btn-prev', () => {
    prevImgIndex = getPrevImgIndex(currentImgIndex);
    prevDescriptionText = getDescriptionText(prevImgIndex);
    prevImgUrl = getPrevImgUrl(currentImgIndex);
    currentImgIndex = prevImgIndex;
    setImgDescription(prevDescriptionText);
    setImgNumber(prevImgIndex + 1);
    showLightboxImg(prevImgUrl);
});

// Handle click on next img button
$(lightboxContainer).on('click', '.btn-next', () => {
    nextImgIndex = getNextImgIndex(currentImgIndex);
    nextDescriptionText = getDescriptionText(nextImgIndex);
    nextImgUrl = getNextImgUrl(nextImgIndex);
    currentImgIndex = nextImgIndex;
    setImgDescription(nextDescriptionText);
    setImgNumber(nextImgIndex + 1);
    showLightboxImg(nextImgUrl);
});

// Close Lightbox
$(lightboxContainer).on('click', '.btn-close', () => {
    $('.lo').hide();
    $('body').removeClass('noscroll');
    clearPathAndIndex();
});

// Keyboard events
$(document).on('keyup', event => {
    switch (event.keyCode) {
        case 27: // esc-key
            return $('.btn-close').click();

        case 37: // left-key
            return $('.btn-prev').click();

        case 39: // right-key
            return $('.btn-next').click();

        default:
            return;
    }
});


// ----------------------------------------------------------
// FUNCTIONS
// ----------------------------------------------------------

function appendLightboxImgs() {
    $('.lightbox').append(html);
}

function appendLightboxOverlay() {
    let html = `<div class="btn-close">
        <span class="bar"></span>
        <span class="bar"></span>
        </div>

        <div class="lo-row">
        <div class="col-2 col-md-2">
        <div class="btn-prev-row">
        <div class="btn-prev">
        <div>
        <span class="bar"></span>
        <span class="bar"></span>
        </div>
        </div>
        </div>
        </div>
        <div class="col-8 col-md-8">
        <div class="loi-row">
        <div class="col-12">
        <img alt=""
        class="lo-img"
        src=""
        />
        </div>

        <div class="col-12">
        <div class="row">
        <div class="col-8">
        <p class="lo-description"></p>
        </div>
        <div class="col-4">
        <p class="lo-img-number"></p>
        </div>
        </div>
        </div>
        </div>
        </div>

        <div class="col-2 col-md-2">
        <div class="btn-next-row">
        <div class="btn-next">
        <div>
        <span class="bar"></span>
        <span class="bar"></span>
        </div>
        </div>
        </div>
        </div>
        </div>
    `;
    $('.lo').append(html);
}

function clearPathAndIndex() {
    currentImgIndex = 0;
    currentImg = '';
    currentImgUrl = '';
}

function getImgName(event) {
    let target = $(event.target);
    if (target.is('.lto-description') || target.is('.lto-title')) {
        let imgUrl = $(event.target)
            .closest('.ltc')
            .find('img')
            .attr('src');
        imgName = getImageNameFromUrl(imgUrl);
    } else {
        let imgUrl = $(event.target)
            .parent()
            .find('img')
            .attr('src');
        imgName = getImageNameFromUrl(imgUrl);

    }
    return imgName;
}

function getImageNameFromUrl(imgUrl) {
    if (imgUrl.toString().indexOf('http') > -1) {
        return imgUrl;
    }
    return imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
}

function getPrevImgIndex(index) {
    if (index === 0) {
        return imgCount - 1;
    } else {
        return index - 1;
    }
}

function getCurrentImgIndex(imgUrl) {
    return $.inArray(imgUrl, imgNames);
}

function getNextImgIndex(index) {
    if (index === (imgCount - 1)) {
        return 0;
    } else {
        return index + 1;
    }
}

function getImgSrc(imgUrl) {
    return imgFolderUrl + '/' + imgUrl;
}

function getImgUrlFromIndex(index) {
    return imgNames[index];
}

function getDescriptionText(currentImgIndex) {
    return imgDescriptions[currentImgIndex];
}

function getPrevImgUrl(imgIndex) {
    if (imgIndex === 0) {
        return imgNames[imgCount - 1];
    } else {
        return imgNames[prevImgIndex];
    }
}

function getNextImgUrl(imgIndex) {
    if (imgIndex === imgCount) {
        return imgNames[0];
    }
    return imgNames[imgIndex];
}

function openOverlay(event) {
    event.preventDefault();
    prepareImgData(event);
    showLightboxImg(currentImgUrl);
    $('.lo').fadeIn();
    $('body').addClass('noscroll');
}

function prepareImgData(event) {
    currentCaptionText = getDescriptionText(currentImgIndex);
    currentImgUrl = getImgName(event);
    currentImgIndex = getCurrentImgIndex(currentImgUrl);
    nextImgIndex = getNextImgIndex(currentImgIndex);
    nextDescriptionText = getDescriptionText(nextImgIndex);
    nextImgUrl = getImgUrlFromIndex(nextImgIndex);
    prevImgIndex = getPrevImgIndex(currentImgIndex);
    prevDescriptionText = getDescriptionText(prevImgIndex);
    prevImgUrl = getImgUrlFromIndex(prevImgIndex);
    setImgDescription(currentCaptionText, currentImgIndex + 1)
}

function setImgDescription(descriptionText) {
    if (typeof descriptionText !== 'undefined') {
        $('.lo-description').text(descriptionText);
    }
}

function setImgNumber(imgNumber) {
    $('.lo-img-text').text(imgNumber + ' / ' + imgCount);
}

function showLightboxImg(imgUrl) {
    $('.lo-img').attr('src', getImgSrc(imgUrl));
}
