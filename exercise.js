let myLibrary=[];
let book;
let counter=0;
modifyButtons();
function addbook(title,number,author,read){
    this.title=title;
    this.author=author;
    this.number=number;
    this.read=read;
    this.id=counter;
    counter++;
}
addbook.prototype.info=function(){
    if(book.read == false){
        return String(this.title+" by "+this.author+", "+this.number+" pages, not read yet.");
    }
    else{
        return String(this.title+" by "+this.author+", "+this.number+" pages, already read.");
    }
}
function addBookToLibrary(book){
    myLibrary.push(book);
    showBooks();
}
function showBooks(){
    for(let i=0;i<myLibrary.length;i++){
        console.table(myLibrary[i]);
    }
    console.log("----------------------");
}
function modifyButtons(){
    let add=document.querySelector(".add");
    let cancel=document.querySelector(".cancel");
    let form=document.getElementById("entry");
    let submit=document.getElementById("addBook");
    let book;

    add.addEventListener("click", ()=>{
        add.style.display="none";
        form.style.display="grid";
    });
    cancel.addEventListener("click", ()=>{
        add.style.display="inline";
        form.style.display="none";
        event.preventDefault();
    });
    submit.addEventListener("click",()=>{
        if(form.title.value != false && form.sides.value != false && form.autor.value != false){
            add.style.display="inline";
            form.style.display="none";
            book= new addbook(form.title.value, form.sides.value, form.autor.value, form.read.checked);
            addBookToLibrary(book);
            BookToWindow(book);
            form.title.value="";
            form.sides.value="";
            form.autor.value="";
            form.read.checked=false;
            event.preventDefault();
        }
    });

}
function BookToWindow(book){
    let element=document.createElement("div");
    let library=document.querySelector(".library");
    let rem=document.createElement("div");
    element.setAttribute("id",book.id);
    element.setAttribute("class","book");
    rem.setAttribute("class","delete");
    if(book.read==true){
        element.innerHTML=("<h4>"
                                +book.title
                            +"</h4>From:"
                            +book.author
                            +"<br/>Sides:"
                            +book.number
                            +"<br/>Read:"
                            +"<input type='checkbox' id=0"+book.id+" checked>");}
    else{
        element.innerHTML=("<h4>"
                                +book.title
                            +"</h4>From:"
                            +book.author
                            +"<br/>Sides:"
                            +book.number
                            +"<br/>Read:"
                            +"<input type='checkbox' id=0"+book.id+">");
    }
    rem.innerHTML=("<i class='fa-solid fa-trash'></i>");
    element.appendChild(rem);
    library.appendChild(element);
    rem.addEventListener("click",()=>{
        removeFromLibrary(Number(element.id));
        library.removeChild(element);
    });
    let check=document.getElementById("0"+book.id);
    let help="";
    check.addEventListener("click",()=>{
        help="";
        for(i=1;i<check.id.length;i++){
            help=help+check.id[i];
        }

        changeLibrary(Number(help));
    });

}
function changeLibrary(id){
    for(i=0;i<myLibrary.length;i++){
        if(id==myLibrary[i].id){
            if(myLibrary[i].read==true) myLibrary[i].read=false;
            else if(myLibrary[i].read==false) myLibrary[i].read=true;
        };
    }
    showBooks();
}
function removeFromLibrary(id){
    for(i=0;i<myLibrary.length;i++){
        if(id==myLibrary[i].id) myLibrary.splice(i,1);
    }
    showBooks();
}

