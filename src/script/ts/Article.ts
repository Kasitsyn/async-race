interface IArticle {
  id: number;
  carsName: string | null;
  carsColor: string | null;
}

export class Article implements IArticle {
  id: number;
  carsName: string | null;
  carsColor: string | null;

  constructor(
    id: number,
    carsName: string | null,
    carsColor: string | null,
  ) {
    this.id = id;
    this.carsName = carsName;
    this.carsColor = carsColor;
  }

  generateArticle() {
    const articlesWrapper = document.querySelector<HTMLDivElement>('.articles-wrapper')

    let template = `
    <article class="article">
      <header class="article__header">
        <button class="btn article__btn" id="select-btn">Select</button>
        <button class="btn article__btn" id="remove-btn">Remove</button>
        <span class="article__title" id="article-title">Tesla</span>
      </header>
      <div class="controls">
        <button class="control__btn control__btn--start" id="start-btn">A</button>
        <button class="control__btn control__btn--break" id="break-btn">B</button>
      </div>
      <div class="racing">  
        <img class="racing__car-img" id="car-img" src="./src/assets/icons/car.svg" alt="car" width="100" height="50" >
        <img class="racing__flag-img" id="flag-img" src="./src/assets/icons/flag.svg" alt="flag" width="50" height="50">
      </div>
     </article>
    `
    if (articlesWrapper) articlesWrapper.innerHTML = template;
    
  }
}