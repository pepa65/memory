// app.js of memory project
document.addEventListener('DOMContentLoaded', () => {
	const collections = ['StarCraft', 'Fast Food', 'Pokemon', 'Marvel']
	const eval = ['Impossible?!', 'Extreme luck!', 'Very lucky!', 'Very good!',
		'Well done!', 'Done OK', 'Not bad', 'Needs focus...', 'Pay attention..!']
	const npairs = 6
	const grid = document.querySelector('.grid')
	const top = document.querySelector('#top')
	const bottom = document.querySelector('#bottom')
	const none = -1
	const gone = 'x.png'

	var i = 0
	topline("Select Memory set:")
	for(name of collections){
		p = document.createElement("p")
		p.textContent = name
		p.setAttribute('data-i', i++)
		p.addEventListener('click', select)
		top.appendChild(p)
	}

	function select(){
		const dir = collections[this.getAttribute('data-i')]
		const game = dir+' Memory'
		for(let i = 0; i < npairs*2; i++){
			var img = document.createElement('img')
			img.setAttribute('data-i', i)
			grid.appendChild(img)
		}
		const imgs = document.querySelectorAll('img')
		const back = dir+'/0.png'
		const images = [dir+'/1.png', dir+'/2.png', dir+'/3.png',
			dir+'/4.png', dir+'/5.png', dir+'/6.png']
		var cards = images.concat(images), one, two, turns, pairs
		start()

		function start(){
			document.removeEventListener('click', start)
			turns = 0, pairs = 0, one = none, two = none
			shuffle(cards)
			topline(game)
			var i = 0
			for(img of imgs){
				img.setAttribute('src', back)
				img.addEventListener('click', flip)
			}
			bottomline('Find matching pairs')
		}

		function flip(){
			if(two > none){return}
			this.removeEventListener('click', flip)
			var i = this.getAttribute('data-i')
			this.setAttribute('src', cards[i])
			if(one == none){one = i; return}
			two = i
			bottomline('(right-click to continue)')
			document.addEventListener('contextmenu', check)
		}

		function check(ev){
			ev.preventDefault()
			document.removeEventListener('contextmenu', check)
			if(cards[one] === cards[two]){
				imgs[one].setAttribute('src', gone)
				imgs[two].setAttribute('src', gone)
				pairs++
				bottomline("That's a match!")
			}else{
				imgs[one].setAttribute('src', back)
				imgs[two].setAttribute('src', back)
				imgs[one].addEventListener('click', flip)
				imgs[two].addEventListener('click', flip)
				bottomline('No, not quite...')
			}
			one = none, two = none
			turns++
			var fails = turns - pairs, msg = pairs+' found'
			if(fails) {msg += ', fails: '+fails}
			topline(msg)
			if(pairs === npairs){
				for(img of imgs){
					img.setAttribute('src', cards[img.getAttribute('data-i')])
				}
				var e = eval[(fails > 8) ? 8 : fails]
				bottomline(e+'<br>(click to play again)')
				document.addEventListener('click', start)
			}
		}
	}
	function shuffle(a){
		for(let i = a.length-1; i > 0; i--){
			const j = Math.floor(Math.random()*(i+1));
			[a[i], a[j]] = [a[j], a[i]]
		}
		return a;
	}
	function topline(msg){
		top.textContent = msg
	}
	function bottomline(msg){
		bottom.innerHTML = msg
	}
})
