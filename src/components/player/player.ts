import { Component, ViewChild, ElementRef, AfterViewInit, trigger, state, style, transition, animate, OnDestroy } from '@angular/core';
import { NavParams, NavController, Platform, Events } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import { VideoDto } from '../../shared/service-proxies/service-proxies';
import { AppSettings } from '../../shared/services/settings.service';

export class VideoSource {
    src: string;
    type: string;
}

@Component({
    selector: 'app-player',
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
export class PlayerComponent implements AfterViewInit, OnDestroy {
    @ViewChild('progressBar') progressBarRef: ElementRef;
    videoContext: any;
    progressBar: HTMLInputElement;
    src: string;
    title: string;
    duration = '00:00:00';
    currentTime = '00:00:00';
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
    video: VideoDto;

    constructor(
        public events: Events,
        public navCtrl: NavController,
        public navParams: NavParams,
        public platform: Platform,
        public screenOrientation: ScreenOrientation,
        public statusBar: StatusBar
    ) {
        this.video = navParams.data.video;
        this.src = `${AppSettings.resServerUrl}/${this.video.url}`
        this.title = this.video.title;
        this.duration = this.format(this.video.duration);
    }

    goBack(): void {
        this.navCtrl.pop();
    }

    ngAfterViewInit(): void {
        if (this.platform.is('cordova')) {
            this.statusBar.hide();
            this.screenOrientation.unlock();
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        }
        this.progressBar = <HTMLInputElement>this.progressBarRef.nativeElement;
        setTimeout(() => {
            this.initPlayer();
        }, 100);
    }

    ngOnDestroy(): void {
        if (this.platform.is('cordova')) {
            this.screenOrientation.unlock();
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            this.statusBar.show();
        }
        const currentTime = this.videoContext.currentTime;
        this.videoContext.pause();
        this.videoContext.reset();
        this.events.publish('videoStopped', currentTime);
    }

    initPlayer(): void {
        const canvas = <any>document.getElementById('canvas');
        if (this.video.frameWidth && this.video.frameHeight) {
            canvas.width = this.video.frameWidth;
            canvas.height = this.video.frameHeight;
        } else {
            canvas.width = 1280;
            canvas.height = 720;
        }

        this.videoContext = new VideoContext(canvas, () => { console.error('Sorry, your browser not support WebGL'); });
        this.videoContext.registerCallback('stalled', () => {
        });
        this.videoContext.registerCallback('update', (e) => {
            if (e == 0) {
                return;
            }
            if (!this.changing) {
                this.currentTime = this.format(this.videoContext.currentTime);
                const value = (100 / this.videoContext.duration) * this.videoContext.currentTime;
                this.progressBar.value = value.toString();
            }
        });
        this.videoContext.registerCallback('ended', () => {
        });
        const videoNode = this.videoContext.video(this.src);
        videoNode.connect(this.videoContext.destination);
        videoNode.startAt(0);
        if (this.autoplay) {
            this.play();
            this.videoContext.currentTime = this.video.currentTime;
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
        if (this.controlState == 'up') {
            this.slidedownHandle = setTimeout(() => {
                this.controlState = 'down';
            }, this.autoSlideTime);
        }
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
        if (passWidth == 0) {
            this.changing = false;
            return;
        }
        this.endChange();
    }

    beginChange(): void {
        this.changing = true;
    }

    endChange(): void {
        const time = this.videoContext.duration * (+this.progressBar.value / 100);
        this.videoContext.currentTime = time;
        this.currentTime = this.format(time);
        this.changing = false;
    }

    play(): void {
        if (this.videoContext.state !== VideoContext.STATE.PLAYING) {
            this.videoContext.play();
            this.paused = false;
        } else {
            this.videoContext.pause();
            this.paused = true;
        }
    }

    format(time: number): string {
        if (time == Infinity) {
            time = 0;
        }
        if (isNaN(time)) {
            time = 0;
        }
        var h = Math.floor(time / 3600) < 10 ? '0' + Math.floor(time / 3600) : Math.floor(time / 3600);
        var m = Math.floor((time / 60 % 60)) < 10 ? '0' + Math.floor((time / 60 % 60)) : Math.floor((time / 60 % 60));
        var s = Math.floor((time % 60)) < 10 ? '0' + Math.floor((time % 60)) : Math.floor((time % 60));
        return `${h}:${m}:${s}`;
    }
}