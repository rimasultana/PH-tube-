const loadCategory = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/categories"
    );
    const data = await res.json();
    displayCategory(data.categories);
  } catch (error) {
    console.error(error);
  }
};
const loadVideos = async (searchText = '') => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
    );
    const data = await res.json();
    dispayVideos(data.videos);
  } catch (error) {
    console.error(error);
  }
};
// time convert
function getTimestring(time) {
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    
    return `${hour} hours, ${minute} minutes, ${remainingSecond} seconds`;
}

const loadCategoryVideos =async (id) =>{
    try {
        const res = await fetch(
          `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
        );
        const data = await res.json();
        dispayVideos(data.category);
      } catch (error) {
        console.error(error);
      }

}

const loadDetails = async (videoId)=>{
    console.log(videoId);
    try {
        const res = await fetch(
          `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
        );
        const data = await res.json();
        displayDetails(data.video);
      } catch (error) {
        console.error(error);
      }
    };

    const displayDetails = (video)=>{
        console.log(video);
        const detailContainer = document.getElementById('modal-content');
        document.getElementById('customModal').showModal();


        detailContainer.innerHTML = `
        <img src= '${video.thumbnail}'/>
        <p>${video.description}</p>
        `
    }



const dispayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML ='';

 
    if(videos.length == 0){
        videoContainer.classList.remove('grid');

        videoContainer.innerHTML = `
        <div class='flex justify-center items-center gap-5 flex-col w-full min-h-[300px] border-red-700 border-2 text-center '>
            <img src='design/icon.png'/>
            <p class='font-bold text-3xl'>Oops!! Sorry, There is no content here</p>
            </div>
        `;
    }else{
        videoContainer.classList.add('grid');
    }

    videos.forEach((video) => {
      console.log(video);
  
      const card = document.createElement("div");
      card.classList = "card card-compact p-2 shadow-xl";
      card.innerHTML = `
         <figure class='h-[200px] relative '>
            <img class='object-cover w-full h-full' src=${video.thumbnail} alt="Thumbnail" />
            ${video.others.posted_date ?. length == 0 ? '' : `<span class='absolute text-white text-xs p-1 rounded-t-sm bg-black rounded-sm right-2 bottom-2'>${getTimestring(video.others.posted_date)}</span>`
}
         </figure>
         <div class="px-0 py-2 flex gap-2">
            <div>
               <img class='w-10 h-10 rounded-full object-cover' src="${
                 video.authors[0].profile_picture
               }" alt="Author Profile"/>
            </div> 
            <div>
               <h2 class='font-bold'>${video.title}</h2>
               <div class='flex items-center gap-2'>
                  <p>${video.authors[0].profile_name}</p>
                  ${
                    video.authors[0].verified
                      ? `<img class='h-6 w-6 object-cover' src='https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png' alt="Verified Icon"/>`
                      : ""
                  }
               </div>
                 <p>${video.others.views ? video.others.views + " views" : ""}</p> 
            </div> 
             <p> <button onclick="loadDetails('${video.video_id}')" class=" btn bg-error text-right">
    details</p>

         </div>
      `;
      videoContainer.append(card);
    });
  };
  

const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("categoris");

  categories.forEach((item) => {
    const buttonContainer = document.createElement("button");
 
    buttonContainer.innerHTML = `
    <button onclick='loadCategoryVideos(${item.category_id})' class="btn">${item.category}</button>
    `;

    categoryContainer.append(buttonContainer);
  });
};


document.getElementById('search-input').addEventListener('keyup', (e) => {
    loadVideos(e.target.value);
})

loadCategory();
loadVideos();


