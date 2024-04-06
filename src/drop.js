var dropZone = document.getElementById('dropzone')

function showDropZone() {
    dropZone.style.display = "block"
}
function hideDropZone() {
    dropZone.style.display = "none"
}

function allowDrag(e) {
    if (true) {
        e.preventDefault()
    }
}

function handleDrop(e) {
    e.preventDefault()
    hideDropZone()
    for (const f of e.dataTransfer.files) {
        const filePath = f.path
        loadVideo(filePath)
        const subPath = filePath.substr(0, filePath.lastIndexOf('.')) + '.srt'
        const sub = EL.getFile(subPath)
        if (sub) {
            subs.loadSubtitle(sub)
        } else {
            subs.loadSubtitle('')
        }
        break
    }

}

// 1
window.addEventListener('dragenter', function (e) {
    showDropZone()
})

// 2
dropZone.addEventListener('dragenter', allowDrag)
dropZone.addEventListener('dragover', allowDrag)

// 3
dropZone.addEventListener('dragleave', function (e) {
    console.log('dragleave')
    hideDropZone()
})

// 4
dropZone.addEventListener('drop', handleDrop)