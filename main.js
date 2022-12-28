BTS_song="";
Blackpink_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_name = "";
BTS_song = "";
Blackpink_song = "";

function setup(){
    canvas = createCanvas(500,330);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    BTS_song = loadSound("music.mp3");
    Blackpink_song = loadSound("music2.mp3");
}

function draw(){
    image(video,0,0,600,530);
    fill("#ff0000");
    stroke("#ff0000");

    song_name = BTS_song.isPlaying();
    console.log(song_name);

    song_name = Blackpink_song.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Blackpink_song.stop();
        if(song_name == false){
            BTS_song.play();
        }
        else{
            console.log("Song Name: BTS Song");
            document.getElementById("song_id").innerHTML = "Song Name: BTS Song";
        }
    }
    if(scorerightWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        BTS_song.stop();
        if(song_name == false){
            Blackpink_song.play();
        }
        else{
            console.log("Song Name: Blackpink Song");
            document.getElementById("song_id").innerHTML = "Song Name: Blackpink Song";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreleftWrist);
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}