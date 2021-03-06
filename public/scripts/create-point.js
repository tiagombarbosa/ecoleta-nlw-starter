// console.log("Hello")

// fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res){ return res.json() }).then(function(data) { console.log(data) })

// document
//   .querySelector("select[name=uf]")
//   .addEventListener("change", () => {
//     console.log("mudei")
//   })

// linha 18 => .then((res) => { return res.json() })


function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text
  

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option value=''>Selecione a cidade</option>"
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false
    })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)



  
// Itens de coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(let item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target

  // adicionar ou remover uam classe com javascript
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  // verificar se existem itens selecionados, se sim
  // pegar os itens selecionados
  const alreadySelected = selectedItems.findIndex(item => {
    return item == itemId // isso será true ou false
  })

  // se já tiver selecionado
  if (alreadySelected >= 0) {
    // tirar da seleção
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferente = item != itemId
      return itemIsDifferente
    })

    selectedItems = filteredItems
  } else {
    // se não já tiver selecionado, adicionar a seleção
    selectedItems.push(itemId)
  }

  // atualizar o campo escondido com os dados selecionados
  collectedItems.value = selectedItems

  console.log(selectedItems);
  
  
}