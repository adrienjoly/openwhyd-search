var profileUrl = 'profile.json' // 'https://openwhyd.org/adrien?format=json'

var searchBox = document.getElementById('search-box')
var searchResults = document.getElementById('search-results')

var trackIndex = {}

fetch(profileUrl, { mode: 'no-cors' })
  .then(function(response) {
    return response.json()
  })
  .then(function(tracks) {
    //console.log('json =>', tracks.map((track) => track.name))
    tracks.forEach((track) => {
      var words = track.name.toLowerCase().split(' ')
      words.forEach((word) => {
        trackIndex[word] = (trackIndex[word] || []).concat([ track ])
      })
    })
    console.log('index:', trackIndex)
  })

searchBox.onchange = function() {
  console.log('query:', searchBox.value)
  var results = trackIndex[searchBox.value]
  results.forEach((result) => {
    var text = document.createTextNode('query: ' + searchBox.value
    + ' => ' + result.name)
    
    var a = document.createElement('a')
    a.href = 'https://openwhyd.org/c/' + result._id
    a.appendChild(text)

    var li = document.createElement('li')
    li.appendChild(a)
    
    searchResults.appendChild(li)
  })
}

/*
var script = document.getElementById('profile-data');
script.onload = function() {
  console.log('loaded', script.innerHTML)
}
script.src = profileUrl
*/
