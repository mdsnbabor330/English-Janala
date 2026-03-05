const loadLession=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json())
    .then((json) =>  displayLesson(json.data)); 
};

const lesonWord=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((json)=>{
        removeBtn();
        const clickBtn= document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");displayWord(json.data)});
};

const removeBtn=()=>{
    const lessonButtons = document.querySelectorAll('.lesson-btn');
    lessonButtons.forEach((lesBtn)=> lesBtn.classList.remove("active"));
}

const displayWord= (words)=>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML="";

    if(words.length==0){
        wordContainer.innerHTML=`
        <div class="text-center font-bn p-16 col-span-full space-y-6">
        <img src="./assets/alert-error.png" alt="" class="mx-auto">
          <p class="text-[14px] text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <p class="text-[34px] font-medium">নেক্সট Lesson এ যান</p>
        </div>
        `;
    }
    for(let word of words){
        const wordCard= document.createElement('div');
        wordCard.innerHTML=`
        <div class="card bg-white text-neutral w-96 p-6 h-full">
            <div class="card-body items-center text-center">
                <h2 class="card-title text-[36px]">${word.word?word.word:"শব্দ পাওয়া যায়নি"}</h2>
                <p>Meaning /Pronounciation</p>
                <p class="text-[28px] font-bn font-semibold text-[#4d4d50]"
                // >${word.meaning? word.meaning:"অর্থ পাওয়া যায়নি"}/${word.pronunciation?word.pronunciation:"উচ্চারণ পাওয়া যায়নি"}</p>
                <div class="mt-8">
                <button onclick="my_modal_5.showModal()" class="btn bg-sky-100">
                <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn bg-sky-100">
                <i class="fa-solid fa-volume-high"></i>
                </button>
                </div>
            </div>
        </div>
        `;
        wordContainer.appendChild(wordCard);
    }
}

const displayLesson=(lessons)=>{
    const levelContainer= document.getElementById("level-container");
    levelContainer.innerHTML='';

    for(let lesson of lessons){
        const btnDiv= document.createElement("div");
        btnDiv.innerHTML=`
                <button id="lesson-btn-${lesson.level_no}" onclick="lesonWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i>lesson-${lesson.level_no}</button>
              `;
              levelContainer.appendChild(btnDiv);
            }
    
};
loadLession();
