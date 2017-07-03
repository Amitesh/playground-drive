import './style.scss'

import {groupBy} from 'lodash/collection'
import people from './data/people'

if (module.hot) {
  module.hot.accept()
}

const managerGroups = groupBy(people, 'manager')

const root = document.querySelector('#root')
root.innerHTML = `<pre>${JSON.stringify(managerGroups, null, 2)}</pre>`

import codeURL from './code.png'

const img = document.createElement('img')
img.src = codeURL
img.style.backgroundColor = "#2B3A42"
img.style.padding = "20px"
img.width = 32
document.body.appendChild(img);


const routes = {
  dashboard: () => {
    System.import('./dashboard').then((dashboard) => {
      dashboard.draw()
    }).catch((err) => {
      console.log("Chunk loading failed")
    })
  }
}

// demo async loading with a timeout
setTimeout(routes.dashboard, 1000)