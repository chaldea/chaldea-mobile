import { Component, ViewChild, ElementRef, AfterViewInit, trigger, state, style, transition, animate } from '@angular/core';
import { NavParams, NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';

export class VideoSource {
    src: string;
    type: string;
}

@Component({
    selector: 'player',
    templateUrl: 'player.html',
    animations: [
        trigger('control', [
            state('up', style({ height: '55px', display: 'flex' })),
            state('down', style({ height: '0px', display: 'none' })),
            transition('up => down', animate('300ms ease-in')),
            transition('down => up', animate('300ms ease-out')),
        ]),

        trigger('controlTitle', [
            state('up', style({ height: '30px', display: 'flex' })),
            state('down', style({ height: '0px', display: 'none' })),
            transition('up => down', animate('300ms ease-in')),
            transition('down => up', animate('300ms ease-out')),
        ])
    ]
})
export class PlayerComponent implements AfterViewInit {
    @ViewChild('video') videoRef: ElementRef;
    @ViewChild('progressBar') progressBarRef: ElementRef;
    video: HTMLVideoElement;
    progressBar: HTMLInputElement;
    src: string;
    title: string;
    duration: string;
    currentTime: string;
    paused = true;
    changing = false;
    autoplay = true;
    controlState = 'up';
    slidedownHandle: number;
    autoSlideTime = 5000;
    totalWidth = 0;
    totalPercent = 0.25;
    beginX = 0;
    lastX = 0;
    percentCount = 0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public platform: Platform,
        public screenOrientation: ScreenOrientation,
        public statusBar: StatusBar
    ) {
        this.src = navParams.data["src"];
        this.title = navParams.data["title"];
        if (platform.is("ios") || platform.is("android")) {
            this.statusBar.hide();
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        }
    }

    goBack(): void {
        if (this.platform.is("ios") || this.platform.is("android")) {
            this.screenOrientation.unlock();
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            this.statusBar.show();
        }
        this.navCtrl.pop();
    }

    ngAfterViewInit(): void {
        this.video = <HTMLVideoElement>this.videoRef.nativeElement;
        this.progressBar = <HTMLInputElement>this.progressBarRef.nativeElement;
        if (this.autoplay) {
            this.play();
        }
        this.hideControl();
    }

    showControl(): void {
        this.controlState = 'up';
    }

    hideControl(): void {
        if (this.slidedownHandle != undefined) {
            clearTimeout(this.slidedownHandle);
        }
        this.slidedownHandle = setTimeout(() => {
            this.controlState = 'down';
        }, this.autoSlideTime);
    }

    touchStart($event): void {
        this.showControl();
        this.beginChange();
        const target = <HTMLDivElement>($event.target || $event.srcElement || $event.currentTarget);
        this.totalWidth = target.clientWidth;
        this.beginX = $event.touches ? $event.touches[0].clientX : 0;
        this.lastX = this.beginX;
        this.percentCount = 0;
    }

    touchMove($event): void {
        if (this.slidedownHandle != undefined) {
            clearTimeout(this.slidedownHandle);
        }
        const currentX = $event.touches ? $event.touches[0].clientX : 0;
        const delta = currentX - this.lastX;
        if (delta == 0) return;
        const percent = delta / this.totalWidth * this.totalPercent * 100;
        this.percentCount += percent;
        this.lastX = currentX;
        if (Math.abs(this.percentCount) < 1) {
            return;
        }
        let currentProcess = +this.progressBar.value + this.percentCount;
        this.progressBar.value = (currentProcess > 100 ? currentProcess < 0 ? 0 : 100 : currentProcess).toString();
        this.percentCount = 0;
    }

    touchEnd(): void {
        const passWidth = Math.abs(this.lastX - this.beginX);
        this.hideControl();
        if (passWidth == 0) return;
        this.endChange();
    }

    beginChange(): void {
        this.changing = true;
    }

    endChange(): void {
        const time = this.video.duration * (+this.progressBar.value / 100);
        this.video.currentTime = time;
        this.currentTime = this.format(time);
        this.changing = false;
    }

    play(): void {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
        this.paused = this.video.paused;
    }

    seek(): void {
        if (!this.changing) {
            if (this.duration == undefined) {
                this.duration = this.format(this.video.duration);
            }
            this.currentTime = this.format(this.video.currentTime);
            const value = (100 / this.video.duration) * this.video.currentTime;
            this.progressBar.value = value.toString();
        }
    }

    stopped(): void {
        this.paused = this.video.paused;
    }

    format(time: number): string {
        if (isNaN(time)) {
            time = 0;
        }
        var h = Math.floor(time / 3600) < 10 ? '0' + Math.floor(time / 3600) : Math.floor(time / 3600);
        var m = Math.floor((time / 60 % 60)) < 10 ? '0' + Math.floor((time / 60 % 60)) : Math.floor((time / 60 % 60));
        var s = Math.floor((time % 60)) < 10 ? '0' + Math.floor((time % 60)) : Math.floor((time % 60));
        return `${h}:${m}:${s}`;
    }
}