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

    ngAfterViewInit(): void {
        this.video = <HTMLVideoElement>this.videoRef.nativeElement;
        this.progressBar = <HTMLInputElement>this.progressBarRef.nativeElement;
        if (this.autoplay) {
            this.play();
        }
        this.touch(true);
    }

    touch(init?: boolean): void {
        if (!init) {
            this.controlState = this.controlState === 'up' ? 'down' : 'up';
        }

        if (this.controlState === 'up') {
            if (this.slidedownHandle != undefined) {
                clearTimeout(this.slidedownHandle);
            }
            this.slidedownHandle = setTimeout(() => {
                this.touch();
            }, this.autoSlideTime);
        }
    }

    play(): void {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
        this.paused = this.video.paused;
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

    goBack(): void {
        if (this.platform.is("ios") || this.platform.is("android")) {
            this.screenOrientation.unlock();
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            this.statusBar.show();
        }
        this.navCtrl.pop();
    }

    format(time: number): string {
        var h = Math.floor(time / 3600) < 10 ? '0' + Math.floor(time / 3600) : Math.floor(time / 3600);
        var m = Math.floor((time / 60 % 60)) < 10 ? '0' + Math.floor((time / 60 % 60)) : Math.floor((time / 60 % 60));
        var s = Math.floor((time % 60)) < 10 ? '0' + Math.floor((time % 60)) : Math.floor((time % 60));
        return `${h}:${m}:${s}`;
    }
}