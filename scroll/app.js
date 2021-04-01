const key='voyMEPnATd7ohl6NnioWaCQHo7Yqg1jbi6qHIdYKfmo';
const count=30;
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`;
const loader=document.getElementById('loader');
let data;
let imgContainer=document.getElementById('img-container');
let imageLoaded=0;
let ready;
let totalImage;
//loading images after photos reached its limit 
function loadImage(){
    imageLoaded++;
console.log('imageLoaded')
    imageLoaded++;
    if(totalImage===imageLoaded){
        ready=true;
        loader.hidden=true;
        console.log('ready=', ready)
    }
}

//helper function for setAttributes
function setAttributes(element,attributes){
    for(const key in attributes){
       element.setAttribute(key,attributes[key]);
    }
}
//displaying photos 
function displayPhotos(){
    imageLoaded=0;
    totalImage=data.length;
data.forEach((photo)=>{
    const item = document.createElement('a');
   // item.setAttribute('href',photo.links.html);
   // item.setAttribute('target','_blank');
    setAttributes(item,{
        href:photo.links.html,
        target:'_blank'
    })
    const image=document.createElement('img');
   // image.setAttribute('src',photo.urls.regular);
    //image.setAttribute('alt',photo.alt_description);
    //image.setAttribute('title',photo.alt_description);
    setAttributes(image,{
        src:photo.urls.regular,
        alt:photo.alt_description,
        title:photo.alt_description
    })
    image.addEventListener('load',loadImage);
    item.appendChild(image);
    imgContainer.appendChild(item);
})

}
//getting json value from api
async function getPhotos(){
    try{
     const res=await fetch(apiUrl);
     data= await res.json();
     displayPhotos();
    }catch(err){
        console.log(err)
    }
}
//scroll if photos get finished
this.addEventListener('scroll',()=>{
    if(this.innerHeight + this.scrollY >= document.body.offsetHeight-1000 && ready){
      console.log(ready)
        getPhotos();
        ready=false;
    }
})


getPhotos();
