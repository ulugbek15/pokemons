//List
const elList = document.querySelector('.cards__wrapper');
const elModalList = document.querySelector('#modal__list')

// Template
const elTemplate = document.querySelector('#template').content;

//Modal
const elOpenModal = document.querySelector('.header__heart-btn');
const elCloseModal = document.querySelector('.modal__close');
const elModal = document.querySelector('.modal');
const elCounter = document.querySelector('.count');

// Form element
const elForm = document.querySelector('.form');
const elType = elForm.querySelector('.form__type');
const elSearch = elForm.querySelector('.form__search');
const elSort = elForm.querySelector('.form__sort');

let result = [];

//Open Modal
elOpenModal.addEventListener('click', () =>{
    elModal.classList.add('modal__active')
})

elCloseModal.addEventListener('click', () =>{
    elModal.classList.remove('modal__active')
})


//Render pokemons
function renderPokemons(arr, element){
    // elCounter.textContent = result.length; 

    element.innerHTML = null;
    
    arr.forEach((item) =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        cloneTemplate.querySelector('.cards__img').src = item.img
        cloneTemplate.querySelector('.cards__title').textContent = item.name
        cloneTemplate.querySelector('.cards__genre').textContent = item.type
        cloneTemplate.querySelector('.cards__weight').textContent = item.weight
        cloneTemplate.querySelector('.cards__age').textContent = item.avg_spawns + 'age'
        let heartBtn = cloneTemplate.querySelector('.cards__heart')
        heartBtn.dataset.id = item.id
        
        heartBtn.addEventListener('click', (e) =>{
            let itemId = e.target.dataset.id
            
            let findPokemon = pokemons.find((pokemon) => pokemon.id == itemId)
            let findIndex = result.findIndex((pokemon) => pokemon.id == itemId)
            
                if(!result.includes(findPokemon)){
                    result.push(findPokemon)
                    heartBtn.classList.add('fas')
                    heartBtn.style.color = 'red'
                }else{
                    result.splice(findIndex, 1)
                    heartBtn.classList.remove('fas')
                    heartBtn.style.color = '#000'
                }
            
            function renderModalPokemons(arr, element){
                element.innerHTML = null;
                elCounter.textContent = result.length; 
                arr.forEach((pokemon) =>{
                    const cloneTemplate = elTemplate.cloneNode(true);
                    
                    cloneTemplate.querySelector('.cards__img').src = pokemon.img
                    cloneTemplate.querySelector('.cards__title').textContent = pokemon.name
                    cloneTemplate.querySelector('.cards__genre').textContent = pokemon.type
                    cloneTemplate.querySelector('.cards__weight').textContent = pokemon.weight
                    cloneTemplate.querySelector('.cards__age').textContent = pokemon.avg_spawns + 'age'
                    let trashBtn = cloneTemplate.querySelector('.cards__heart')
                    trashBtn.dataset.id = pokemon.id

                    trashBtn.className = 'cards__heart fas fa-trash fa-2x'

                    

                    trashBtn.addEventListener('click', (e) =>{
                        const dataId = e.target.dataset.id

                        const findIndex = result.findIndex(pokemon => pokemon.id == dataId)

                        const findIndex1 = result.find(pokemon => pokemon.id == dataId)

                        if(findIndex1.id == findPokemon.id){
                            heartBtn.classList.remove('fas')
                            heartBtn.style.color = '#000'
                        }
                        
                        result.splice(findIndex, 1)

                        renderModalPokemons(result, elModalList)
                    })
    
                    element.appendChild(cloneTemplate)
                })
            }
            renderModalPokemons(result, elModalList)
        })
        
        element.appendChild(cloneTemplate)
    })
}

renderPokemons(pokemons, elList)


//Render types

function renderTypes(arr, element){
    
    let result = [];
    
    arr.forEach((item) =>{
        item.type.forEach((item) =>{
            if(!result.includes(item)){
                result.push(item)
            }
        })
    })
    
    result.forEach((type) =>{
        let newOption = document.createElement('option');
        newOption.textContent = type
        newOption.value = type
        element.appendChild(newOption)
    })
}
renderTypes(pokemons, elType)


elForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    
    const elTypeValue = elType.value.trim() 
    const elSearchValue = elSearch.value.trim() 
    const elSortValue = elSort.value.trim() 
    
    
    const regex = new RegExp(elSearchValue, 'gi')
    
    let filteredPokemons = pokemons.filter((pokemon) => pokemon.name.match(regex))
    
    let foundPokemons = []

    console.log(filteredPokemons)

    
    if(elTypeValue == 'all'){
        foundPokemons = filteredPokemons
    }else{
        foundPokemons = filteredPokemons.filter((pokemon) => pokemon.type.includes(elTypeValue))
    }

    const sortAlph = foundPokemons.sort((a, b) =>{
        if(a.name > b.name){
            return 1
        }else if(a.name < b.name){
            return -1
        }else {
            return 0
        }
    })
    
    if(elSortValue === 'all'){
        foundPokemons = filteredPokemons 
    }else if(elSortValue === 'a_z'){
        foundPokemons = sortAlph
    }else if(elSortValue === 'z_a'){
        foundPokemons = sortAlph.reverse()
    }
    console.log(foundPokemons)

    
    
   
    
    renderPokemons(foundPokemons, elList)
})

