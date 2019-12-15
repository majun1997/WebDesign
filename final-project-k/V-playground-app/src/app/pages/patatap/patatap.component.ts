import { environment } from './../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef, HostListener, Input, SimpleChanges } from '@angular/core';
import { PaperScope, Project, Path, Point, view } from 'paper';
import { Howl } from 'howler';
import * as paper from 'paper';

@Component({
  selector: 'app-patatap',
  templateUrl: './patatap.component.html',
  styleUrls: ['./patatap.component.scss'],
})
export class PatatapComponent implements OnInit {
  keyData = {};
  oldCirclesLength = 0;
  @Input() circles = [];
  changeFlag = false;
  currentColor;
  serverUrl = environment.serverBaseURL;

  constructor() {

  }

  ngOnInit() {
    paper.setup('myCanvas');
    this.keyData = {
      q: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/bubbles.mp3`]
        }),
        color: '#1abc9c'
      },
      w: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/clay.mp3`]
        }),
        color: '#2ecc71'
      },
      e: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/confetti.mp3`]
        }),
        color: '#3498db'
      },
      r: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/corona.mp3`]
        }),
        color: '#9b59b6'
      },
        t: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/dotted-spiral.mp3`]
        }),
        color: '#34495e'
      },
      y: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/flash-1.mp3`]
        }),
        color: '#16a085'
      },
      u: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/flash-2.mp3`]
        }),
        color: '#27ae60'
      },
      i: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/flash-3.mp3`]
        }),
        color: '#2980b9'
      },
      o: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/glimmer.mp3`]
        }),
        color: '#8e44ad'
      },
      p: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/moon.mp3`]
        }),
        color: '#2c3e50'
      },
      a: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/pinwheel.mp3`]
        }),
        color: '#f1c40f'
      },
      s: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/piston-1.mp3`]
        }),
        color: '#e67e22'
      },
        d: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/piston-2.mp3`]
        }),
        color: '#e74c3c'
      },
      f: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/prism-1.mp3`]
        }),
        color: '#95a5a6'
      },
      g: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/prism-2.mp3`]
        }),
        color: '#f39c12'
      },
      h: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/prism-3.mp3`]
        }),
        color: '#d35400'
      },
      j: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/splits.mp3`]
        }),
        color: '#1abc9c'
      },
      k: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/squiggle.mp3`]
        }),
        color: '#2ecc71'
      },
      l: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/strike.mp3`]
        }),
        color: '#3498db'
      },
      z: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/suspension.mp3`]
        }),
        color: '#9b59b6'
      },
      x: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/timer.mp3`]
        }),
        color: '#34495e'
      },
      c: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/ufo.mp3`]
        }),
        color: '#16a085'
      },
      v: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/veil.mp3`]
        }),
        color: '#27ae60'
      },
      b: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/wipe.mp3`]
        }),
        color: '#2980b9'
      },
      n: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/zig-zag.mp3`]
        }),
        color: '#8e44ad'
      },
      m: {
        sound: new Howl({
          src: [`${this.serverUrl}/sounds/moon.mp3`]
        }),
        color: '#2c3e50'
      }
    };
    paper.view.onFrame = (event) => {
    }
  }

  ngDoCheck(): void {

    if(this.changeFlag){
      console.log('circle changes!');
      var maxPoint = new Point(view.size.width, view.size.height);
      var randomPoint = Point.random();
      var point = new Point(10, 5);
      point.x = maxPoint.x * randomPoint.x;
      point.y = maxPoint.y * randomPoint.y;
      var path = new Path.Circle(point, 500);
      path.fillColor = this.currentColor;

      var paths = [];
      paths.push(path);

      paper.view.onFrame= (event) =>{
        for(var i = 0; i < paths.length; i++){
          paths[i].scale(0.9);
          paths[i].fillColor.hue += 1;
          if(paths[i].area < 1){
            paths[i].remove();
            paths.splice(i, 1);
            console.log(paths);
          }
        }
      }
      this.changeFlag = false;
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(this.keyData[event.key]){

      this.currentColor = this.keyData[event.key].color;
      this.keyData[event.key].sound.play();
      this.changeFlag = true;

    }
  }



}
