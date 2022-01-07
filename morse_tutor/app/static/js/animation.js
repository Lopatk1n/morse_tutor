const animatedItems = document.querySelectorAll('._animated')
window.addEventListener('scroll', onScroll);
function onScroll() {
    for (let i = 0; i < animatedItems.length; i++) {
        const item = animatedItems[i];
        const itemHeight = item.offsetHeight;
        const itemOffset = offset(item).top;
        const startAt = 2.5;

        let itemPoint = window.innerHeight - itemHeight / startAt;

        if (itemHeight > window.innerHeight) {
            itemPoint = window.innerHeight - window.innerHeight / startAt;
        }
        if ((scrollY > itemOffset - itemPoint) && scrollY < (itemOffset + itemHeight)) {
            item.classList.add('_active');
        } else {
            item.classList.remove('_active');
        }
    }
}
function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
setTimeout(onScroll, 3500)

