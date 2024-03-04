// Let's discuss------------------------------------------------------------------->
const letsDiscuss = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();

    // toggleLoadingSpinner(false);

    const postContainer = document.getElementById('post-container');

    data.posts.forEach(post => {
        const div = document.createElement('div');
        const indicatorColorClass = post.isActive ? 'bg-green-500 border-2 border-white' : 'bg-red-500 border-2 border-white';

        div.innerHTML = `
            <div class="card card-side flex flex-col lg:flex-row bg-[#F3F3F5] items-center lg:items-start text-center lg:text-start text-font-color p-10">
                <div class="indicator pt-8">
                    <span class="indicator-item indicator-center ${indicatorColorClass} badge badge-secondary ml-8 mt-12"></span>
                    <img class="grid w-24 h-24 place-items-center rounded-full" src="${post?.image}">
                </div>
                <div class="card-body">
                    <div class="flex flex-col lg:flex-row gap-2 lg:gap-0">
                    <p class="text-[#12132DCC] font-medium"># ${post?.category}</p>
                    <p>Author: ${post?.author?.name}</p>
                    </div>
                    <h2 class="card-title pt-3 pb-4 text-main-color font-bold">${post?.title}</h2>
                    <p class="pb-4">${post?.description}</p>
                    <hr class="border-dashed border-[#12132D40] p-2">
                    <div class="flex flex-col lg:flex-row justify-between gap-6 lg:gap-0 items-center lg:items-start">
                        <div class="flex gap-8">
                            <div class="flex gap-2 items-center"><ion-icon class="text-2xl" name="reader-outline"></ion-icon><p>${post?.comment_count}</p></div>
                            <div class="flex gap-2 items-center"><ion-icon class="text-2xl" name="eye-outline"></ion-icon><p>${post?.view_count}</p></div>
                            <div class="flex gap-2 items-center"><ion-icon class="text-2xl" name="time-outline"></ion-icon><p>${post?.posted_time}min</p></div>
                        </div>
                        <button class="email-button" onclick="handleEmailButtonClick('${post?.title}', ${post?.view_count})"><img src="images/email.png" alt=""></button>
                    </div>
                </div>
            </div>`;

        postContainer.appendChild(div);
    });
}

const appendedTitles = new Set();

function handleEmailButtonClick(title, viewCount) {
    if (!appendedTitles.has(title)) {
        const appendContainer = document.getElementById('append-container');
        const div = document.createElement('div');
        div.innerHTML = `<div class="flex justify-between gap-4 p-4 bg-white rounded-2xl">
            <h2 class="max-w-80 text-main-color font-semibold ">${title}</h2>
            <div class="flex gap-2 items-center text-font-color">
                <ion-icon class="text-2xl" name="eye-outline"></ion-icon>
                <p>${viewCount}</p>
            </div>
        </div>`

        appendContainer.appendChild(div);
        appendedTitles.add(title);

        updateMarkAsRead();
    }
}

function updateMarkAsRead() {
    const markReadCounter = document.getElementById('mark-read-counter');
    markReadCounter.textContent = Array.from(appendedTitles).length;
}

const markReadHead = document.getElementById('mark-read-head');
const div = document.createElement('div');
div.innerHTML = `<div class="flex justify-between items-center gap-32 pb-12">
<h1 class="text-xl font-bold text-main-color">Title</h1>
<div class="flex gap-2 items-center text-font-color">
    <img src="images/tick.png">
    <p>Mark as read (<span id="mark-read-counter">${appendedTitles.size}</span>)</p>
</div>
</div>`

markReadHead.appendChild(div);



// latest posts------------------------------------------------------------------->
const latestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();

    const cardContainer = document.getElementById('card-container');

    data.forEach(card => {
        const div = document.createElement('div');
        div.innerHTML = `<div class="card lg:w-96 w-80 mx-auto lg:mx-0 bg-base-100 border border-[#12132D26]">
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



// search button------------------------------------------------------------------>
const loadSearch = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    // toggleLoadingSpinner(false);

    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = '';

    data.posts.forEach(post => {
        const div = document.createElement('div');
        const indicatorColorClass = post.isActive ? 'bg-green-500 border-2 border-white' : 'bg-red-500 border-2 border-white';

        div.innerHTML = `
            <div class="card card-side flex flex-col lg:flex-row bg-[#F3F3F5] items-center lg:items-start text-center lg:text-start text-font-color p-10">
                <div class="indicator pt-8">
                    <span class="indicator-item indicator-center ${indicatorColorClass} badge badge-secondary ml-8 mt-12"></span>
                    <img class="grid w-24 h-24 place-items-center rounded-full" src="${post?.image}">
                </div>
                <div class="card-body">
                    <div class="flex flex-col lg:flex-row gap-2 lg:gap-0">
                    <p class="text-[#12132DCC] font-medium"># ${post?.category}</p>
                    <p>Author: ${post?.author?.name}</p>
                    </div>
                    <h2 class="card-title pt-3 pb-4 text-main-color font-bold">${post?.title}</h2>
                    <p class="pb-4">${post?.description}</p>
                    <hr class="border-dashed border-[#12132D40] p-2">
                    <div class="flex flex-col lg:flex-row justify-between gap-6 lg:gap-0 items-center lg:items-start">
                        <div class="flex gap-8">
                            <div class="flex gap-2 items-center"><ion-icon class="text-2xl" name="reader-outline"></ion-icon><p>${post?.comment_count}</p></div>
                            <div class="flex gap-2 items-center"><ion-icon class="text-2xl" name="eye-outline"></ion-icon><p>${post?.view_count}</p></div>
                            <div class="flex gap-2 items-center"><ion-icon class="text-2xl" name="time-outline"></ion-icon><p>${post?.posted_time}min</p></div>
                        </div>
                        <button class="email-button" onclick="handleEmailButtonClick('${post?.title}', ${post?.view_count})"><img src="images/email.png" alt=""></button>
                    </div>
                </div>
            </div>`;

        postContainer.appendChild(div);
    });
    
}


const handleSearch = () => {
    // toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadSearch(searchText);
}


// loading spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadSpinner = document.getElementById('load-spinner');

    if (isLoading) {
        loadSpinner.classList.remove('hidden');
    } else {
        loadSpinner.classList.add('hidden');        
    }
}




// calling function area
letsDiscuss()
latestPosts()