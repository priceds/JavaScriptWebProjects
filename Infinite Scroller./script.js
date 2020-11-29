const imageContainer=document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
const count= 30;
const apikey='NjO0tXbGDbMOJdA6fcH__6cirTQFrmmpOS1F1rmx3Ek';
const apiURL=`https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;





// Check if all images were loaded
function imageloaded()
{
    console.log('image Loaded');
    imagesLoaded++;
    console.log('image loaded');
    if(imagesLoaded===totalImages)
    {
        ready=true;
        loader.hidden=true;
        console.log('ready=',ready);
    }
} 

// Helper Function to  Set Attributes on DOM Elements
function setAttributes(element,attributes)
{
for(const key in attributes)
{

    element.setAttribute(key,attributes[key]);
}
} 





// Create Elements for Links & Photos,  Add to DOM
function displayPhotos()
{
    imagesLoaded=0;
    totalImages= photosArray.length;
    console.log('total images',totalImages);
    photosArray.forEach((photo)=>
    {
    // Create <a> to link to Unsplash 
    const item = document.createElement('a');
    setAttributes(item,{
      href:photo.links.html,
      target:'_blank',
    });
    // item.setAttribute('href',photo.links.html);
    // item.setAttribute('target','_blank');
    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title',photo.alt_description);
    // Put <img>  inside <a> , then put both inside  imageContainer Element
    setAttributes(img,{
       src:photo.urls.regular,
       alt:photo.alt_description,
       title:photo.alt_description,

    });

    //    Event Listener , check when each image is finished loading
     img.addEventListener('load',imageloaded);

    item.appendChild(img);
    imageContainer.appendChild(item);

    })
}

//Get Photos From API
async function getPhotos()
{


    try
    {

    const response = await fetch (apiURL);
    photosArray = await response.json();
    displayPhotos();
    }
    catch(error){}
}


window.addEventListener('scroll',()=>
{

    if(window.innerHeight+window.scrollY>= document.body.offsetHeight-1000&&ready)
    {
       ready=false;
       getPhotos();
     
    }

})




// On Load
getPhotos();