//  let's discuss----------------------------------------------------------------->
const letsDiscuss = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();

    const postContainer = document.getElementById('post-container')

    data.posts.forEach(post => {
        const div = document.createElement('div');

        const indicatorColorClass = post.isActive ? 'bg-green-500 border-2 border-white' : 'bg-red-500 border-2 border-white';

        div.innerHTML = `
        <div class="card card-side bg-[#F3F3F5] text-font-color p-10">
            <div class="indicator pt-8">
                <span class="indicator-item indicator-center ${indicatorColorClass} badge badge-secondary ml-8 mt-12"></span>
                <img class="grid w-24 h-24 place-items-center rounded-full" src="${post?.image}">
            </div>
            <div class="card-body">
                <!-- category-author -->
                <p class="text-[#12132DCC] font-medium pr-5"># ${post?.category}<span
                        class="pl-4">Author: ${post?.author?.name}</span></p>

                <h2 class="card-title pt-3 pb-4 text-main-color font-bold">${post?.title}</h2>
                <p class="pb-4">${post?.description}</p>

                <hr class="border-dashed border-[#12132D40] p-2">

                <!-- body-footer  -->
                <div class="flex justify-between">
                    <!-- comment-view-time -->
                    <div class="flex gap-8">
                        <div class="flex gap-2 items-center">
                            <ion-icon class="text-2xl" name="reader-outline"></ion-icon>
                            <p>${post?.comment_count}</p>
                        </div>
                        <div class="flex gap-2 items-center">
                            <ion-icon class="text-2xl" name="eye-outline"></ion-icon>
                            <p>${post?.view_count}</p>
                        </div>
                        <div class="flex gap-2 items-center">
                            <ion-icon class="text-2xl" name="time-outline"></ion-icon>
                            <p><span>${post?.posted_time}</span> min</p>
                        </div>
                    </div>

                    <!-- button -->
                    <button id="email-button" onclick="buttonHandler()"><img src="images/email.png" alt=""></button>
                </div>
            </div>
        </div>`;

        postContainer.appendChild(div);

        
    });
}






// latest posts------------------------------------------------------------------->
const latestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();

    const cardContainer = document.getElementById('card-container');

    data.forEach(card => {
        const div = document.createElement('div');
        div.innerHTML = `<div  class="card w-96 bg-base-100 border border-[#12132D26]">
        <figure class="px-6 pt-6">
        <img src="${card.cover_image}" alt="Shoes"
            class="rounded-xl" />
    </figure>
    <div class="card-body text-font-color">
        <!-- date -->
        <div class="flex gap-1 items-center">
            <ion-icon name="calendar-clear-outline"></ion-icon>
            <p>${card?.author?.posted_date || 'No publish date'}</p>
        </div>
        <h2 class="card-title font-extrabold text-main-color py-3">${card?.title}</h2>
        <p>${card?.description}</p>
        <!-- author info -->
        <div class="flex gap-4 pt-4 items-center">
            <img class="w-10 rounded-full" src="${card?.profile_image}" alt="">
            <div>
                <p class="font-bold text-main-color">${card?.author?.name}</p>
                <p>${card?.author?.designation || 'unknown'}</p>
            </div>
        </div>
    </div>
    </div>`
        cardContainer.appendChild(div);
    });
}
letsDiscuss()
latestPosts()