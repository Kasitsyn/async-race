export class Article {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
    generateArticle() {
        const articlesWrapper = document.querySelector('.articles-wrapper');
        let template = `
    <article class="article ">
      <header class="article__header">
        <button class="btn article__btn" id="select-btn" data-id=${this.id}>Select</button>
        <button class="btn article__btn" id="remove-btn" data-id=${this.id}>Remove</button>
        <span class="article__title" id="article-title" data-id="${this.id}">${this.name}</span>
      </header>
      <div class="controls">
        <button class="control__btn control__btn--start" id="start-btn" data-id=${this.id}>A</button>
        <button class="control__btn control__btn--break" id="break-btn" data-id=${this.id} disabled="true">B</button>
      </div>
      <div class="racing">  
        <svg id="car-img" class="article__img" data-id="${this.id}" width="100" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title"
          aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path stroke-width="2"
          stroke-linejoin="round" stroke-linecap="round" stroke="#202020" fill=${this.color}
          d="M9.011 41H3s.023-4.814.368-8.32a37.433 37.433 0 0 1 4.369-12.12A3.908 3.908 0 0 1 10.444 19H36.27l8.856 8s10.722 1.5 13.688 1.728c3.454.271 3.176 2.894 3.176 2.894s-.364 3.917-.624 5.841S60.047 41 58.357 41H55m-12 0H21.011m24.131-14.006H4.867"
          data-name="layer2"></path>
          <circle stroke-width="2" stroke-linejoin="round" stroke-linecap="round"
          stroke="#202020" fill="none" r="6" cy="41" cx="15.011" data-name="layer1"></circle>
          <circle stroke-width="2" stroke-linejoin="round" stroke-linecap="round"
          stroke="#202020" fill="none" r="6" cy="40.999" cx="49.002" data-name="layer1"></circle>
        </svg>
        <img class="racing__flag-img" id="flag-img" data-id="${this.id}" src="./src/assets/icons/flag.svg" alt="flag" width="50" height="50">
      </div>
     </article>
    `;
        if (articlesWrapper)
            articlesWrapper.innerHTML += template;
    }
}
