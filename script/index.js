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
     <button onclick = "loadLevelWord(${lesson.level_no})"  class = "btn btn-outline btn-primary">
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
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  // console.log(words);
  const wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5">
                <h2 class="font-bold ">${word.word}</h2>
                <p class="my-6">Meaning /Pronounciation</p>
                <p class="font-bangla">"${word.meaning} / ${word.pronunciation}"</p>
            </div>
    `;
    wordContainer.append(card);
  });
};

loadLessons();
