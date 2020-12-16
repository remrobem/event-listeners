const grandparent = document.querySelector('.grandparent');
const parent = document.querySelector('.parent');
const children = document.querySelector('.child');

const logIt = (e) => {
  console.log(`${e.type} on ${e.target.className}`);
};

// capture  - occurs before bubble - starts outside and finds any events to capture

grandparent.addEventListener(
  'click',
  (e) => {
    console.log('gp capture');
  },
  { capture: true }
);

parent.addEventListener(
  'click',
  (e) => {
    console.log('parent capture');
  },
  { capture: true }
);

child.addEventListener(
  'click',
  (e) => {
    console.log('child capture');
  },
  { capture: true }
);

// click anywhere on document
document.addEventListener(
  'click',
  (e) => {
    console.log('document capture');
  },
  { capture: true }
);

// bubbling - all the outer/upper events raised when inner event raised

grandparent.addEventListener('click', e => {
    console.log('gp bubble')
})
// 2nd event is possible
grandparent.addEventListener('click', logIt);

// remove eventlistner of a few seconds
setTimeout(() => {
  grandparent.removeEventListener('click', logIt);
}, 4000);

// stop bubbling at parent
parent.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('parent bubble');
});

// only capture event one time
child.addEventListener(
  'click',
  (e) => {
    console.log('child bubble');
  },
  { once: true }
);

// click anywhere on document
document.addEventListener('click', (e) => {
  console.log('document bubble');
});

// events for many elements

const divs = document.querySelectorAll('div');

divs.forEach((element) => {
  element.addEventListener('mouseover', (e) => {
    console.log(`Mouse over ${e.target.className}`);
  });
});

// problem - when this added, no mouseover event
const newDiv = document.createElement('div')
newDiv.style.width = '75vw'
newDiv.style.height = '75vw'
newDiv.style.backgroundColor = 'purple'
document.body.append(newDiv)

// solution is to use an event for doc with function to match

const mousedown = (e) => {
    if (e.target.matches('div')) {
        console.log('Mouse Down')
    }
}

document.addEventListener('mousedown', mousedown)

// or add function for global listeners

const globalEventListener = (type, selector, callback) => {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e)
        }
    } )
}

globalEventListener('mouseup', 'div', e => {
    console.log('Mouse Up')
})
