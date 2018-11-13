import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time'
})

export class TimePipe implements PipeTransform {
    transform(time: number) {
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
