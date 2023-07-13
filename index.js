`use strict`

//Reveal animation
function scrollTrigger(selector){
    let els = document.querySelectorAll(selector)
    els = Array.from(els)
    els.forEach(el => {
        addObserver(el)
    })
}

function addObserver(el, options){
    if(!('IntersectionObserver' in window)) {
        if(options.cb){
            options.cb(el)
        } else{
        entry.target.classList.add('active')
        }
    return
    }
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('active')
                textAnimate(el)
                observer.unobserve(entry.target)
            }
        })
    }, options)
    observer.observe(el)
}

function textAnimate(el){
    const nl = el.querySelectorAll('.step')
    const textElms = Array.from(nl)
    let timeOut = 1000
    let task = (e) => {e.classList.add('step-active')}

    textElms.forEach(e => {
        setTimeout(() => {task(e)}, timeOut) 
        timeOut += 1000
    })
}

scrollTrigger('.scroll-reveal')

// Auto scroll
function scrollOnClick(selector){
    let els = document.querySelectorAll(selector)
    els = Array.from(els)
    els.forEach(el => {
        el.addEventListener("click", () => {
            document.querySelector(el.id).scrollIntoView({ behavior: "smooth"})
        })
    }) 
}
scrollOnClick(".nav-link")

//Instruct user to scroll
function hideScroll(event){
    let el = document.querySelector("#arrow")
    console.log(event.target)
    if (event.target.scrollTop === 0){
        el.classList.add('arrow-pulse')
    } else {
        el.classList.remove('arrow-pulse')
    }

}
document.querySelector(".scroller").addEventListener("scrollend", (event) => {
    hideScroll(event)
})

document.querySelector(".scroller").addEventListener("touchend", (event) => {
    hideScroll(event)
})


// Nav bar
function showNav(){
    document.querySelector("#nav-icon").classList.toggle("nav-visible", false)
    document.querySelector("#nav-links").classList.toggle("nav-visible", true)
}

function hideNav(){
    document.querySelector("#nav-icon").classList.toggle("nav-visible", true)
    document.querySelector("#nav-links").classList.toggle("nav-visible", false)
}

document.querySelector("#nav-tree").addEventListener("mouseover", () => {
    showNav()
})

document.querySelector("#nav-tree").addEventListener("touchstart", () => {
    showNav()
})

document.querySelector("#nav-tree").addEventListener("mouseleave", () => {
    hideNav()
})

//Not compute effient but best solution I could think of
document.querySelector("html").addEventListener("click", (env) => {
    if (env.target.classList.contains("nav-link")){
        hideNav()
    }
})