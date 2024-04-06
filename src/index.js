const video = document.querySelector('#video')

const subs = new Subtitles()

const EL = {
    getFile: window.utils.getFile
}

const fileName = (src) => {
    if (!src) return '<unable to show>'
    return src.split(/(\\|\/)/g).pop()
}

function loadVideo(src) {
    video.src = src
    if (src) {
        const title = fileName(src)
        if (title) {
            document.title = 'Video Player - ' + title
        }
        return true
    }
    return false
}
