const SEEK_NEXT_THRESH = 2

class Subtitles {
    constructor() {
        this.el = document.querySelector("#subs-text")
        this.video = document.querySelector("#video")
        this.onlySubsON = true
        this.subtitles = []
        this.parser = new Parser()
        this.nextSeek = -2
    }

    updateSubtitle = () => {
        const currentTime = this.video.currentTime
        const currentSubtitle = this.subtitles.find(subtitle => currentTime >= subtitle.startSeconds && currentTime <= subtitle.endSeconds)
        if (currentSubtitle) {
            // // For Background
            // let lines = currentSubtitle.text.split(/\r?\n/)
            // let height = lines.length
            // let width = lines[0].length
            // if (lines.length > 1) {
            //     for (let i in lines) {
            //         width = Math.max(width, lines[i].length)
            //     }
            // }
            this.latestSub = currentSubtitle
            this.el.textContent = currentSubtitle.text
        } else {
            this.el.textContent = ''
        }
        // SEEK_NEXT_THRESH = 4 seconds
        // if two subs are more than 8 seconds apart.
        // - seek-to '4 seconds before' the next sub
        if (this.onlySubsON) {
            let nextSub = this.subtitles.find(subtitle => currentTime <= subtitle.startSeconds)
            if (!this.latestSub || currentTime - this.latestSub.endSeconds > SEEK_NEXT_THRESH) {
                if (nextSub.startSeconds - currentTime >= SEEK_NEXT_THRESH) {
                    let pNextSeek = nextSub.startSeconds - SEEK_NEXT_THRESH
                    if (this.nextSeek - 1 <= pNextSeek && pNextSeek <= this.nextSeek + 1) {
                        // don't process
                        return
                    }
                    this.nextSeek = pNextSeek
                    this.video.currentTime = this.nextSeek
                }
            }
        }

    }

    loadSubtitle = (data) => {
        this.subtitles = this.parser.fromSrt(data)
        this.latestSub = null
        this.nextSeek = -2
        if (this.subtitles.length === 0) {
            this.video.removeEventListener('timeupdate', this.updateSubtitle)
        } else {
            this.video.addEventListener('timeupdate', this.updateSubtitle)
        }
    }
}

