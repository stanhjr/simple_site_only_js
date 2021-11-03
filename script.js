function createComments({name, email, body, postId}){
    let divComments = document.createElement('div')
    let nameComments= document.createElement('p')
    let emailComments = document.createElement('p')
    let bodyComments = document.createElement('p')
    divComments.appendChild(nameComments)
    divComments.appendChild(emailComments)
    divComments.appendChild(bodyComments)
    document.getElementById(postId).appendChild(divComments)
    nameComments.innerText = 'Name: ' + name
    emailComments.innerText = 'email: ' + email
    bodyComments.innerText = body
    divComments.className = 'card border-dark mb-3'
    nameComments.className = 'card-header fw-bold'
    emailComments.className = 'card-title px-3'
    bodyComments.className = 'card-text px-3'
}

function createPost({body, title, id}) {
    let divPost = document.createElement('div')
    let titlePost = document.createElement('h3')
    let bodyPost = document.createElement('p')
    let button = document.createElement("button")
    divPost.id = id
    divPost.setAttribute("count", "0")
    button.setAttribute('postID', id)
    button.className = "btn btn-secondary mb-2"
    button.innerText = "SHOW COMMENTS"
    button.addEventListener("click", getComments)
    divPost.appendChild(titlePost)
    divPost.appendChild(bodyPost)
    divPost.appendChild(button)
    divPost.className = "col-3"
    titlePost.className = 'card-header'
    bodyPost.className = 'card-text px-3'
    document.getElementById('app').appendChild(divPost)
    titlePost.innerText = title
    bodyPost.innerText = body
}

function getPOST(e){
    let limit = Number(btn.getAttribute('data-limit'))
    let offset = Number(btn.getAttribute('data-offset'))

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then(json => json.map((item,index)=>{
            (index >= Number(offset) && index < Number(offset + limit)) ? createPost(item) : ''
            btn.setAttribute('data-offset', limit + offset)
        }))
}

function getComments(e){
    let idDiv = this.getAttribute('postID')
    if (document.getElementById(idDiv).getAttribute('count') < '5'){
        let path = 'https://jsonplaceholder.typicode.com/posts/' + idDiv + '/comments'
        fetch(path)
            .then((response) => response.json())
            .then(json => json.map((item)=>{
                    createComments(item)
                    let id = this.getAttribute('postID')
                    let count = + document.getElementById(id).getAttribute("count") + 1
                    count = String(count)
                    document.getElementById(id).setAttribute('count', count)
                })
            )
        this.innerText = 'HIDE COMMENTS'
    }
    else if (document.getElementById(idDiv).getAttribute('count') === '5'){
        let divDom = document.getElementById(idDiv)
        let collectionDiv = divDom.children;

        for (let i=0; i < collectionDiv.length; i++){
            if(collectionDiv[i].tagName === 'DIV'){
                collectionDiv[i].remove()
                i--
            }
        }
        document.getElementById(idDiv).setAttribute('count', '0')
        this.innerText = 'SHOW COMMENTS'
    }
}

let btn = document.getElementById("Get items")
btn.setAttribute('data-offset', '0')
btn.setAttribute('data-limit', '4')
btn.addEventListener("click", getPOST)