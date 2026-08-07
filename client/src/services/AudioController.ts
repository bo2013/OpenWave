export class AudioController {
    private element: HTMLAudioElement | null = null;

    ref = (element: HTMLAudioElement | null): void => {
        this.element = element;
    };

    currentTime(value?: number) {
        if (!this.element) return 0;

        if (value === undefined)
            return this.element.currentTime;

        this.element.currentTime = value;
    }

    duration() {
        return this.element?.duration ?? 0;
    }

    volume(value?: number) {
        if (!this.element) return 0;

        if (value === undefined)
            return this.element.volume;

        this.element.volume = value;
    }

    muted(value?: boolean | null) {
        if (!this.element) return false;

        if (value === undefined)
            return this.element.muted;

        if (value === null)
            this.element.muted = !this.element.muted;
        else
            this.element.muted = value;

        return this.element.muted;
    }

    playing(value?: boolean | null) {
        if (!this.element) return false;

        if (value === undefined)
            return !this.element.paused;

        if (value === null) {
            if (this.element.paused)
                this.element.play();
            else
                this.element.pause();
        } else if (value) {
            this.element.play();
        } else {
            this.element.pause();
        }

        return !this.element.paused;
    }
}