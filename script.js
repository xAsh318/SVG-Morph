class MorphText {
  constructor(el) {
    /* 
        this.DOM = reference to elememt
        this.DOM.textGroupEl = svg group
        this.filterId = group id

        Gets two text elements

        this.DOM.feBlur = gets svg feGaussianBlur
        this.primitiveValues = set attribure reference?

      */
    this.DOM = {el: el};
    this.DOM.textsGroupEl = this.DOM.el.querySelector('svg > g');
    this.filterId = this.DOM.el.querySelector('svg filter').id;
    
    [this.DOM.text_1, this.DOM.text_2] = this.DOM.textsGroupEl.querySelectorAll('text');
    
    this.DOM.feBlur = document.querySelector(`#${this.filterId} > feGaussianBlur`);
    this.primitiveValues = {stdDeviation: 0};

    this.createTimeline();
    this.initEvents();
  }

  /*
      this.onMouseEnterFn
        - get filter id 
        - plays gsap timeline

      this.onMouseLeaveFn
        - gets filter id
        - reverses gsap timeline

        adds callback function to event listener mouse enter
        adds callback function to event listener mouse leave==
    */
   initEvents() {
    this.onMouseEnterFn = () => {
        this.DOM.textsGroupEl.style.filter = `url(#${this.filterId})`;
        this.tl.play();
        console.log('exitFN',this.DOM.textsGroupEl)
    }
    this.onMouseLeaveFn = () => {
        this.DOM.textsGroupEl.style.filter = `url(#${this.filterId})`;
        this.tl.reverse();
        console.log('exitFN',this.DOM.textsGroupEl)
    }
    this.DOM.el.addEventListener('mouseenter', this.onMouseEnterFn);
    this.DOM.el.addEventListener('mouseleave', this.onMouseLeaveFn);
  }
  /*
      creates paused timeline
        - on the completion of the time line
          - remove the filter
        - after the animaiton is referesed and back ot he starting frame
          - remove the filter
        - a function call on each time an animaition updates (on every frame while the animation is active)
          - sets the attribute value during the animation
    */   
  createTimeline() {
  // init timeline
  this.tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        console.log('complete',this.DOM.textsGroupEl)
          this.DOM.textsGroupEl.style.filter = 'none';
      },
      onReverseComplete: () => {
        console.log('rev complete',this.DOM.textsGroupEl)
          this.DOM.textsGroupEl.style.filter = 'none';
      },
      onUpdate: () => {
        console.log('update',this.DOM.textsGroupEl)
          this.DOM.feBlur.setAttribute('stdDeviation', this.primitiveValues.stdDeviation)
      }
  })


    /*
        - https://greensock.com/forums/topic/18735-is-set-the-same-as-startat/
          - start at is like set, but reall should be fromTo
      */
    .to(this.primitiveValues, { 
        duration: 0.8,
        ease: "none",
        startAt: {stdDeviation: 0},
        stdDeviation: 1
    }, 0)
    .to(this.primitiveValues, { 
        duration: 0.8,
        ease: "none",
        stdDeviation: 0
    })
    
    .to(this.DOM.text_1, { 
        duration: 1.6,
        ease: "none", // Power1.easeInOut
        opacity: 0
    }, 0)
    .to(this.DOM.text_2, { 
        duration: 1.6,
        ease: "none", // Power1.easeInOut
        opacity: 1
    }, 0);
  }
}

class List {
  constructor(el) {
    /*

        this.DOM = reference to element
        this.items = new array
        this.one = find childrend
        this.filter_arr = fill items array (from above)

      */
    this.DOM = {el: el};
    this.items = [];
    // this.one = this.DOM.el.querySelectorAll('.item-link');
    this.one = this.DOM.el.querySelectorAll('.menu__item');
    this.fill_arr = this.one.forEach( item => this.items.push(new MorphText(item)));
  }
}

const menu = new List(document.querySelector('nav.menu'));

console.log(menu);
console.table(menu.items)


let links = document.querySelectorAll('a');
links.forEach(a => {
  a.onclick = (e) => {
    event.preventDefault();
  }
})