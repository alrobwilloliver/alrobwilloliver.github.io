
const quiz = function() {
	const url = 'http://hp-api.herokuapp.com/api/characters';
	const data = [];

	function createCards(cur, index) {
		const DOM = document.querySelector('.cards');
			  const card = `<div class="card-category" style="background-image: url(${cur.image}); background-repeat: no-repeat; background-size: 100% 100%;">
				<input type="text" id="${index}">
			  </div>`;
		DOM.insertAdjacentHTML("beforeend", card)
		data.push(cur);
		document.querySelector(".navbar").innerHTML = `0 \/ ${data.length}`;
	}

	const changeInputColor = function() {
		const id = event.currentTarget.id;
		const name = data[id].name;
		if (event.currentTarget.value === name) {
			event.currentTarget.classList.add("input-correct");
		} else {
			event.currentTarget.classList.remove("input-correct");
		}
		checkScore();
	}

	fetch(url).then(data=>{return data.json()}).then(res=>res.forEach(createCards)).then(()=>selectInput());

	function selectInput() {
		for (let i = 0; i < data.length; i++) {
			document.getElementById(`${i}`).addEventListener('keyup', changeInputColor);
		}
	}

	function checkScore() {
		const numOfAns = data.length;
		const correctArr = []
		for (let i = 0; i < numOfAns; i++) {
			if (document.getElementById(`${i}`).classList.contains("input-correct")) {
				correctArr.push(true)
			}
		}
		const score = correctArr.length
		document.querySelector(".navbar").innerHTML = `${score} \/ ${numOfAns}`;
	}
}

quiz();