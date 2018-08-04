import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavParams, NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';

export class VideoSource {
    src: string;
    type: string;
}

@Component({
    selector: 'player',
    templateUrl: 'player.html'
})
export class PlayerComponent implements AfterViewInit {
    @ViewChild('video') videoRef: ElementRef;
    @ViewChild('progressBar') progressBarRef: ElementRef;
    video: HTMLVideoElement;
    progressBar: HTMLInputElement;
    src: string;
    title: string;
    paused = true;
    change = false;

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
        this.change = true;
    }

    endChange(): void {
        console.log('seek length:' + this.video.seekable.length);
        console.log('current:' + this.video.currentTime);
        var time = this.video.duration * (+this.progressBar.value / 100);
        console.log(time);
        this.video.currentTime = time;
        console.log(this.video.currentTime);
        this.change = false;
    }

    seek(): void {
        const value = (100 / this.video.duration) * this.video.currentTime;
        if (!this.change) {
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
}