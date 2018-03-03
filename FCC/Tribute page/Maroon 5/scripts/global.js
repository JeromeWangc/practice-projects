function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(element,value){
    if(!element.className){
        element.className = value;
    }else{
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

function highlightPage() {
    //basic test
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers = document.getElementsByTagName('header');
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName('nav');
    if (navs.length == 0) return false;
    //get url
    var links = navs[0].getElementsByTagName('a');
    var linkurl;
    for (var i = 0;i < links.length;i++){
        linkurl = links[i].getAttribute('href');
        if (window.location.href.indexOf(linkurl) != -1){
            //find the substring, add a class
            links[i].className = 'here';
            //get the url, give the value to body element
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute('id',linktext);
        }
    }
}

function showSection(id){
    //get all the sections
    var sections = document.getElementsByTagName('section');
    // set the style of display
    for (var i = 0; i < sections.length; i++){
        if (sections[i].getAttribute('id') != id){
            sections[i].style.display = 'none';
        }else{
            sections[i].style.display = 'block';
        }
    }
}

function prepareInternalnav(){
    //basic test
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var articles = document.getElementsByTagName('article');
    if (articles.length == 0) return false;
    var navs = articles[0].getElementsByTagName('nav');
    if (navs.length == 0) return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName('a');
    //hide all the text and bound the event
    for (var i = 0; i < links.length; i++){
        var sectionId = links[i].getAttribute('href').split('#')[1];
        if (!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = 'none';
        links[i].destination = sectionId;
        links[i].onclick = function(){
            showSection(this.destination);
            return false;
        }
    }
}

function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById('placeholder');
    placeholder.setAttribute('src',source);
    if (!document.getElementById('description')) return false;
    if (whichpic.getAttribute('title')) {
        var text = whichpic.getAttribute('title');
    }else {
        var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3){
        description.firstChild.nodeValue = text;
    }
    return false;
}

function prepaerPlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById('imagegallery')) return false;
    var placeholder = document.createElement('img');
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute('src','images/placeholder.jpg');
    placeholder.setAttribute('alt','my image gallery');
    var description = document.createElement('p');
    description.setAttribute('id','description');
    var desctext = document.createTextNode('Choose an image');
    description.appendChild(desctext);
    var gallery = document.getElementById('imagegallery');
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}

function prepaerGallery(){
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById('imagegallery')) return false;
    var gallery = document.getElementById('imagegallery');
    var links = gallery.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++){
        links[i].onclick = function() {
            return showPic(this);
        }
    }
}

function stripeTables() {
    //basic test
    if (!document.getElementsByTagName) return false;
    //get the table element
    var tables = document.getElementsByTagName('table');
    //visite every table
    for (var i = 0; i < tables.length; i++){
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        //compare every row
        for (var j = 0; j < rows.length; j++){
            if(odd == true){
                addClass(rows[j],'odd');
                odd= false;
            }else{
                odd = true
            }
        }
    }
}

function hightlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++){
        rows[i].oldClassName = rows[i].className
        rows[i].onmouseover = function(){
            addClass(this,'highlight')
        };
        rows[i].onmouseout = function(){
            this.className = this.oldClassName
        };
    }
}
window.onload = function(){
    highlightPage();
    prepareInternalnav();
    prepaerPlaceholder();
    prepaerGallery();
    stripeTables();
    hightlightRows();
}