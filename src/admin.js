import people from './data/people'

const root = document.querySelector('#root')
root.innerHTML = `<p>There are ${people.length} people.</p>`