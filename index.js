function myfunction(){
    let file_input = document.getElementById('file_input');
    let input_img = document.getElementById('img');
    file_input.addEventListener('change',(e)=>{
        input_img.src=URL.createObjectURL(e.target.files[0]);
    });
    input_img.onload = function(){
        let src = cv.imread(input_img);
        cv.imshow('inputCanvas',src);
        document.getElementById('inputCanvas').style.display="block";
        document.getElementById('Resize').disabled=false;
    }
}

function Resize(){
    var height = parseInt(document.getElementById('height').value);
    var width = parseInt(document.getElementById('width').value);
    canvasInput = document.getElementById('inputCanvas');
    if (height && width){
        console.log(height,width);
        let cv = window.cv;
        let src = cv.imread(canvasInput);
        let dst = new cv.Mat();
        let dsize = new cv.Size(height,width);
        cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
        cv.imshow('canvasOutput', dst);
        src.delete(); 
        dst.delete();
        document.getElementById('canvasOutput').style.display='block';
        document.getElementById('download').style.display='block';
    }else{
        window.alert('Please Enter both height and Width')
    }
}

function download(){
    var canvas = document.getElementById("canvasOutput");
    var img    = canvas.toDataURL("image/png");
    var tmpLink = document.createElement( 'a' );  
    tmpLink.download = 'image.png';
    tmpLink.href = img;  
    document.body.appendChild( tmpLink );  
    tmpLink.click();  
    document.body.removeChild( tmpLink );  
}