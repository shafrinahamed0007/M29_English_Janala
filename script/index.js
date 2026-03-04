const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class = "btn">${el}</span>`);
  return htmlElements.join("");
};

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
  manageSpinner(true);
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

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButtons)
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url)
  const res = await fetch(url);
  const details = await res.json();
  // console.log(details);
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  // console.log(word);
  const detailsBox = document.getElementById("detailsContainer");
  detailsBox.innerHTML = ` <div class="">
                        <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines t"></i> ${word.pronunciation})</h2>
                    </div>
                    <div class="">
                        <h2 class="text-xl font-bold"> Meaning</h2>
                        <p class="font-bangla">${word.meaning}</p>
                    </div>
                    <div class="">
                        <h2 class="text-2xl font-bold">Eample</h2>
                        <p class="font-bangla">${word.sentence}</p>
                    </div>
                    <div class="">
                        <h2 class="text-2xl font-bold">Synonym</h2>
                        <div class = "">${createElements(word.synonyms)}</div>
                    </div>
  
  `;
  document.getElementById("my_modal_5").showModal();
};

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
    manageSpinner(false);
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
                    <button onclick = "loadWordDetail(${word.id})" class="btn bg-[#1a9aff10] hover:bg-[#1a9aff80]">
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
  manageSpinner(false);
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("wordContainer").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("wordContainer").classList.remove("hidden");
  }
};

loadLessons();

document.getElementById("btnSearch").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("inputSearch");
  const searchValue = input.value.trim().toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      // console.log(allWords);
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );
      displayLevelWord(filterWords);
    });
});
