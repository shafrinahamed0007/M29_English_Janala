const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";

  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const displayLesson = (lessons) => {
  //   1. get the container & Empty
  const levelContainer = document.getElementById("levelContainer");
  levelContainer.innerHTML = "";
  // 2. get into every lessons
  for (let lesson of lessons) {
    //   3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
     <button id="lessonBtn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})"  class = "btn btn-outline btn-primary lesson-btn">
       <i class="fa-solid fa-book-open"></i>
       Lesson - ${lesson.level_no}
       </button>
    
    
    `;
    // 4. append into container
    levelContainer.append(btnDiv);
  }
};


const loadLevelWord = (id) => {
  // console.log(id)
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url)

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); // remove all active class
      const clickBtn = document.getElementById(`lessonBtn-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active"); // actice all active class
      displayLevelWord(data.data);
    });
};

const removeActive = () =>{
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButtons)
  lessonButtons.forEach(btn =>btn.classList.remove("active"))
}


const displayLevelWord = (words) => {
  // console.log(words);
  const wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    
    <div class="text-center col-span-full rounded-xl py-10 bg-sky-100 space-y-6">
    <i class="fa-solid fa-triangle-exclamation text-6xl text-gray-400" ></i>
                <p class="font-bangla font-medium text-xl text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
            </div>
    `;
    return;
  }

  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5">
                <h2 class="font-bold text-xl ">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="my-6 font-semibold">Meaning /Pronounciation</p>
                <p class="font-bangla text-2xl font-semibold">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যায়নি"}"</p>
                <div class="flex justify-between items-center mt-14">
                    <button onclick = "my_modal_5.showModal()" class="btn bg-[#1a9aff10] hover:bg-[#1a9aff80]">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="btn bg-[#1a9aff10] hover:bg-[#1a9aff80]">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>

                </div>
            </div>
    `;
    wordContainer.append(card);
  });
};

loadLessons();
