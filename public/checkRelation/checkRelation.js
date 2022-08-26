let checkRelationBtn = document.querySelector("#check-relation")

let CheckPerson1 = document.querySelector('.checkperson1')
let CheckPerson2 = document.querySelector('.checkperson2')

async function addValueToSelect(){
    let data = await fetch('/person')
    let persons = await data.json()
    renderCheck(persons)
}
 addValueToSelect()

function renderCheck(data){
    data.forEach(x => {
        let options = document.createElement('option')     
        options.text = x.name
        options.value = x.name
        CheckPerson1.appendChild(options)
    })
    data.forEach(x => {
        let options = document.createElement('option')     
        options.text = x.name
        options.value = x.name
        CheckPerson2.appendChild(options)
    })   
}

checkRelationBtn.addEventListener('click',()=>{
    let select1 = CheckPerson1.value
    let select2 = CheckPerson2.value
    if(select1 == select2){
        alert('Cannot make yourself friend')
        return
    }
    runFetch(select1,select2)
})

async function runFetch(select1,select2){
    let data = await fetch('/relation')
    let alotofdata = await data.json()
    createGraph(alotofdata,select1,select2)
} 

function createGraph(data,select1,select2){
    let parseForRelation = {}
    for(let node of data){
        parseForRelation[node.name] = node.friend
    }
    function nthConnectionHow(friend1, friend2) {
        let result = [];
        function nthConnectionHowInner(
          friend1,
          friend2,
          path = [friend1],
          visited = {}
          ) {
          if (visited[friend1]) return;
          visited[friend1] = true;
          if (parseForRelation[friend1] instanceof Array) {
            for (let friend of parseForRelation[friend1]) {
              if (friend === friend2) {
                result.push(path.concat(friend2));
              } else {
                nthConnectionHowInner(friend, friend2, path.concat(friend), visited);
              }
            }
          }
        }
        nthConnectionHowInner(friend1, friend2);
        renderRelation(result)
      }
      nthConnectionHow(select1,select2)
}

function renderRelation(data){
    let p = document.createElement('p')
    let container = document.querySelector('.show-relation-container')
    container.style.display = 'block'
    container.innerHTML = ''
    let map = data?.map((e)=>{
        return e.join(" => ") 
    },[])
    for(let i = 0;i<map.length;i++){
        container.innerHTML += `<p class="ext-base font-light leading-relaxed mt-0 mb-4 text-emerald-800">${map[i]}</p>`
    }
}



