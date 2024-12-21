function ChangeDraw(a) {
    if (a == 0) {
        v = "./pdfs/Info.pdf";
    } else if (a == 1) {
        v = "./pdfs/graph-paper.pdf";
    } else if (a == 2) {
        v = "./pdfs/India-Political-Map.pdf";
    } else if (a == 3) {
        v = "./pdfs/World-Outline-Map.pdf"
    }
    
    document.getElementById("draw").src = v;
}